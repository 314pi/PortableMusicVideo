/*
 *=BEGIN SONGBIRD GPL
 *
 * This file is part of the Songbird web player.
 *
 * Copyright(c) 2005-2012 POTI, Inc.
 * http://www.songbirdnest.com
 *
 * This file may be licensed under the terms of of the
 * GNU General Public License Version 2 (the ``GPL'').
 *
 * Software distributed under the License is distributed
 * on an ``AS IS'' basis, WITHOUT WARRANTY OF ANY KIND, either
 * express or implied. See the GPL for the specific language
 * governing rights and limitations.
 *
 * You should have received a copy of the GPL along with this
 * program. If not, go to http://www.gnu.org/licenses/gpl.html
 * or write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
 *
 *=END SONGBIRD GPL
 */

var EXPORTED_SYMBOLS = [ "DeviceUI" ];

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;

Cu.import("resource://app/jsmodules/sbLibraryUtils.jsm");
Cu.import("resource://app/jsmodules/sbProperties.jsm");
Cu.import("resource://sharing/sbSharingPushMediaRendererListener.jsm");
Cu.import("resource://sharing/Tools.jsm");
Cu.import("resource://sharing/PushTreeView.jsm");
Cu.import("resource://sharing/Sequencer.jsm");
Cu.import("resource://sharing/PushPlayqueueItem.jsm");

var sbISharingPushMediaRenderer = Ci.sbISharingPushMediaRenderer;

// copy of |enum PushCommand| in components/src/push/sbSharingPushCmdQueue.h
var PushCommand = [
    "None",
    "GetPositionInfo",
    "GetMediaInfo",
    "GetTransportInfo",
    "GetMute",
    "GetVolume",
    "ThresholdPriorityUrgent",
    "SetAVTransportURI",
    "SetNextAVTransportURI",
    "Play",
    "Next",
    "Pause",
    "Stop",
    "Seek",
    "SetMute",
    "SetVolume",
    "GetProtocolInfo"
  ];

// delay for background commands before showing the busy box:
const DEVICE_QUERY_BUSY_DELAY = 5000;
// timeout for commands. This is a bit lower than the UPnP timeout to prevent
// timeout errors from the underlying UPnP
const DEVICE_COMMAND_TIMEOUT  = 29900;

// for the notification box
const ERROR_NOTIFICATION_VALUE  = "sharing push notification";
const ERROR_NOTIFICATION_IMAGE  = "chrome://sharing/skin/images/DLNA_error_16x16.png";

const SCRUBBING_SEC = 1000*1000*1000;
const SCRUBBING_MIN_STEP = 5*SCRUBBING_SEC;
const SCRUBBING_MAX_STEP = 30*SCRUBBING_SEC;
const SCRUBBING_DIV = 50;
const SCRUBBING_RES_PREV = -1;
const SCRUBBING_RES_NEXT = -2;
const SCRUBBING_DIR_FWD = 1;
const SCRUBBING_DIR_BCKWD = 2;

/***************************************************************************
 * DeviceUI
 *  manages UI elements belonging to a device
 */

function DeviceUI(window, _messageLoop, device, deviceElementParentNode, _menuItem) {
  var _LOG = generateDeviceLogFunction("__push__1", 5, device);
  var self = this;

  // generates nice error messages for device errors
  var Errors = (function(me){
    var _strbundle = window.document.getElementById("sharing-strings");
    var _strPrefix = "sharing.push.error";
    // this maps some urn:upnp-org:serviceId:AVTransport and
    // urn:upnp-org:serviceId:RenderingControl commands to error string identifyers
    var _mapping = {
      "Play"              : "playseturi",
      "SetAVTransportURI" : "playseturi",
      "Stop"              : "stop",
      "Seek"              : "seek",
      "SetVolume"         : "volume",
      "SetMute"           : "mute"
    };
    // if no mapping exists, use this one:
    var _generic = "generic";
    me.get = function() {
      var args = Array.prototype.slice.call(arguments);
      cmd = args[0];
      var err = {isUiCmd: false, msg: null, cmd: cmd};
      err.isUiCmd = ("undefined" != typeof(_mapping[cmd]));
      var strID = err.isUiCmd
        ? _strPrefix + "." + _mapping[cmd]
        : _strPrefix + "." + _generic;
      try {
        err.msg = _strbundle.getFormattedString(strID, args);
      }
      catch(e){
        err.msg = null;
      }
      if (!err.msg) {
        err.msg = _strbundle.getFormattedString(_strPrefix + "." + _generic, args);
      }
      return err;
    };

    return me;
  })({});

  var _soundboardService = Components.classes["@songbirdnest.com/soundboard;1"]
    .getService(Components.interfaces.sbISoundboard);

  // a special tree view that handles push specific tree attributes like playing
  var _derivedTreeView = null;

  // the last known device state
  var _lastKnownState = device.state;

  // last received error message. Counts how often the error occured and adds
  // this count to the message:
  // "The device did something stupid (3)"
  var _lastErrorMsg = {
    msg: "",
    count: 0,
    clear: function() {
      this.count = 0;
      this.msg = "";
    },
    formatMsg: function(errMsg) {
      if (errMsg != this.msg) {
        this.count = 1;
        this.msg = errMsg;
        return this.msg;
      }
      this.count++;
      return this.msg + " ("+this.count+")";
    }
  };

  // We query the device for the playpositon once ever 2 seconds or so. To have
  // a smoother display we use a timer that fires 10 times per second to update
  // the playposition in between the queries. When some real value is received
  // from the device we simply sync to this value.
  const PLAY_POSITION_TIMER_INTERVAL = 100;
  var _playPositionTimer = null;
  var _playPositionTimerStarted = null;
  var _urgentPlayPositionQueryInProgress = true;

  // the device element (<sb-push-device>)
  var _deviceElement = deviceElementParentNode
    .appendChild(window.document.createElement("sb-push-device"));

  // set the device in <sb-push-device>
  _deviceElement.device = device;
  // the notification box
  var _notificationBox = _deviceElement.notificationBox;

  this.__defineGetter__("deviceElement", function() {
    return _deviceElement;
  });

  this.__defineGetter__("menuItem", function() {
    return _menuItem;
  });

  this.__defineGetter__("sequencer", function() {
    return _sequencer;
  });

  // create the sequencer
  var _sequencer = new Sequencer(window, _messageLoop, _deviceElement.devicePlaylist);

  // called from the Device class to set the media list in use
  this.attachMediaList = function(mediaList) {
    _deviceElement.mediaList = mediaList;
    _derivedTreeView =
      _deviceElement.devicePlaylist.treeView =
        new PushTreeView(_deviceElement.devicePlaylist);
    _sequencer.onMedialistChanged(mediaList);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private functions
  function _onNotificationClose() {
    _lastErrorMsg.clear();
  }

  // timer handler for updating the play position inbetween the notifications
  // from the device
  function _onPlayPositionTimer() {
    var current = (new Date()).getTime();
    // the UI expects nano seconds
    var newPos = (current - _playPositionTimerStarted) * 1000 * 1000;
    _deviceElement.deviceControls
          .setPlayPosition(newPos, device.playDuration);
  }

  // starts the play position timer when the device goes to "playing"
  function _startPlayPositionTimer() {
    if (!_playPositionTimer) {
      _playPositionTimer = window.setInterval(_onPlayPositionTimer,
                                              PLAY_POSITION_TIMER_INTERVAL);
    }
    _playPositionTimerStarted = (new Date()).getTime();
  }

  // stops the play position timer when the device goes to "stop"
  function _stopPlayPositionTimer() {
    if (_playPositionTimer) {
      window.clearInterval(_playPositionTimer);
      _playPositionTimer = null;
    }
  }

  // synchronizes the play position timer when a new update is received from the
  // device
  function _syncPlayPositionTimer(aNewPosition) {
    var current = (new Date()).getTime();
    _playPositionTimerStarted =
            Math.round(current - (aNewPosition / (1000 * 1000)));
  }

  // shows an error in the notification box
  function _showError(errMsg) {
    _LOG("Device-error: " + errMsg);
    var notification = _notificationBox.getNotificationWithValue(ERROR_NOTIFICATION_VALUE);
    if (!notification) {
      var priority = _notificationBox.PRIORITY_WARNING_HIGH;
      var buttons = [];
      var notif = _notificationBox.appendNotification(
        _lastErrorMsg.formatMsg(errMsg),
        ERROR_NOTIFICATION_VALUE,
        ERROR_NOTIFICATION_IMAGE,
        priority, buttons);
    }
    else {
      notification.label = _lastErrorMsg.formatMsg(errMsg);
    }
  }

  // hides the notification box
  function _hideErrorBox() {
    _notificationBox.removeAllNotifications(false);
    _lastErrorMsg.clear();
  }

  //////////////////////////////////////////////////////////////////////////////
  // event- and command handlers
  var _cmdHandlers = {};

  _cmdHandlers.play = function(evt) {
    _sequencer.play();
  }

  _cmdHandlers.playitem = function(evt) {
    _sequencer.playitem();
  }

  _cmdHandlers.stop = function(evt) {
    _sequencer.stop();
  }

  _cmdHandlers.pause = function(evt) {
    _sequencer.pause();
  }

  _cmdHandlers.next = function(evt) {
    _sequencer.next();
  }

  _cmdHandlers.prev = function(evt) {
    _sequencer.prev();
  }

  _cmdHandlers.forward = function(evt) {
    _setNewPosition(device.playPosition, device.playDuration, SCRUBBING_DIR_FWD);
  }

  _cmdHandlers.backward = function(evt) {
    _setNewPosition(device.playPosition, device.playDuration, SCRUBBING_DIR_BCKWD);
  }

  _cmdHandlers.mute = function(evt) {
    device.mute = !device.mute;
  }

  _cmdHandlers.shuffleon = function(evt) {
    _sequencer.shuffle = true;
  }

  _cmdHandlers.shuffleoff = function(evt) {
    _sequencer.shuffle = false;
  }

  _cmdHandlers.repeatnone = function(evt) {
    _sequencer.repeat = REPEAT.NONE;
  }

  _cmdHandlers.repeatall = function(evt) {
    _sequencer.repeat = REPEAT.ALL;
  }

  _cmdHandlers.repeatone = function(evt) {
    _sequencer.repeat = REPEAT.SINGLE;
  }

  _cmdHandlers.artistprofile = function(evt) {
    _showArtistProfile();
  }
  
  function _onDeviceStartedPlaying() {
    _LOG("+++ STARTED playing");
    _setCurrentItemForUI();
    _menuItem.setAttribute("class", "playing");
  }

  function _onDeviceStoppedPlaying() {
    _unsetCurrentItemForUI();
    _menuItem.removeAttribute("class");
    _stopPlayPositionTimer();
  }

  // dispatch a device command
  function _onDeviceCmd(evt) {
    _hideErrorBox();
    var cmd = evt.type;
    if ("function" == typeof(_cmdHandlers[cmd])) {
      try {
        _cmdHandlers[cmd](evt);
      } catch(e) {
        _LOG("DeviceUI: error handling command [" + cmd + "] " + e.toString());
      }
    }
    else {
      _LOG("DeviceUI: unknown command: " + cmd);
    }
  }

  function _onPlaylistItemClicked(evt) {
    var currentItem = _deviceElement.devicePlaylist.mediaListView.selection.currentMediaItem;
	_setAlbumArt(currentItem);
  }
  
  function _setAlbumArt(aMediaItem) {
    if( aMediaItem &&
      _soundboardService &&
      _soundboardService.canEnableArtistProfile(aMediaItem) ) {
      _deviceElement.artistProfileButton.removeAttribute("disabled");
    } else {
      _deviceElement.artistProfileButton.setAttribute("disabled",true);		
    }
    var url = aMediaItem ? aMediaItem.getProperty(SBProperties.primaryImageURL) : null;
    url = url ? url : "chrome://sharing/skin/images/album-art-default.png";
    var XLINK_NS = "http://www.w3.org/1999/xlink";
    _deviceElement.albumArtImage.setAttributeNS(XLINK_NS, "href", url);
    _deviceElement.onResizePlaylistPane();
  }
  
  function _onDeviceCmdTimeout(aCmd, isBackgroundCmd) {
    // clear the command queue in the device
    device.deviceCmdTimeout();
    var strbundle = window.document.getElementById("sharing-strings");
    var msg = strbundle.getString("sharing.push.error.timeout");
    // show error
    _showError(msg);
    // and notify listeners
    _messageLoop.postMessage(self, "deviceCmdTimeout", {cmd:PushCommand[aCmd], isBackgroundCmd:isBackgroundCmd});
  }

  function _setCurrentItemForUI() {
    if (device.state != sbISharingPushMediaRenderer.PLAYING) {
      // set only if state is PLAYING - if not we will set it as soon as
      // state changes to PLAYING
      return;
    }
    var item = _sequencer.currentItem;
    if (item && item.isValid()) {
      // one of our items
      if (_deviceElement) {
        _deviceElement.devicePlaylist.currentPlayingIndex = item.index;
      }
      _setAlbumArt(item.item);
    }
    else {
      // nothing from our server
      // update tree view to show no icon
      _unsetCurrentItemForUI();
    }
  }

  function _unsetCurrentItemForUI() {
    if (_deviceElement) {
      _deviceElement.devicePlaylist.currentPlayingIndex = -1;
    }
    _setAlbumArt(null);
  }

  function _showArtistProfile() {
    var item = _sequencer.currentItem.item; // first ask sequencer
    if (!item) {
      // sequencer doesn't know, ask the medialist view
      item = _deviceElement.devicePlaylist.mediaListView.selection.currentMediaItem;
      
      if (!item) { // isValid() returns false ??
        // nothing anywhere, bail out
        return;
        }
    }
    if( _soundboardService ) {
      _soundboardService.showArtistProfile(item);
    }
  }

  function _installListeners() {
    // message loop
    _messageLoop.subscribe(_msgLoopListener);
    // listener for the device itself
    device.addListener(_deviceListener);

    // command listeners
    for (var i in _cmdHandlers) {
      _deviceElement.addEventListener(
          i, _onDeviceCmd, false);
    }

    _deviceElement.addEventListener(
            "clickitem", _onPlaylistItemClicked, false);
  
  }

  function _removeListeners() {
    // listener for the device itself
    device.removeListener(_deviceListener);
    if (_deviceElement) {
      // command listeners
      for (var i in _cmdHandlers) {
        _deviceElement.removeEventListener(
            i, _onDeviceCmd, false);
      }

      _deviceElement.removeEventListener(
              "clickitem", _onPlaylistItemClicked, false);    
    }

    // message loop
    _messageLoop.unsubscribe(_msgLoopListener);
  }

  //////////////////////////////////////////////////////////////////////////////
  // publics

  // remove a device from the UI, remove the listener from the device, cleanup
  this.finalize = function() {
    _stopPlayPositionTimer();
    _removeListeners();
    _sequencer.finalize();
    if (_derivedTreeView) {
      _derivedTreeView._finalize();
    }
    // remove UI elements
    if (_menuItem) {
      var menu = this.menuItem.parentNode.parentNode;
      menu.removeItemAt(menu.getIndexOfItem(_menuItem));
      _menuItem = null;
    }
    if (_deviceElement) {
      _deviceElement.destroy();
      _deviceElement.parentNode.removeChild(_deviceElement);
      _deviceElement = null;
    }
  };

  // show / hide the main UI element
  this.show = function(bShow) {
    this.deviceElement.hidden = !bShow;
  }

  //////////////////////////////////////////////////////////////////////////////
  // listeners

  // a listener updating UI elements
  var _deviceListener = new sbSharingPushMediaRendererListener();

  _deviceListener.onDeviceStateReceived = function( aNewState ) {
    if (_lastKnownState == aNewState) {
      return;
    }
    _lastKnownState = aNewState;
    switch(aNewState) {
      case sbISharingPushMediaRenderer.PLAYING:
        _onDeviceStartedPlaying();
        break;
      case sbISharingPushMediaRenderer.PAUSED:
        _stopPlayPositionTimer();
        break;
      case sbISharingPushMediaRenderer.STOPPED:
        _onDeviceStoppedPlaying();
        break;
    }
  };

  _deviceListener.onPlayPositionReceived = function( aNewPosition ) {
    // It showed up that some devices supply a playposition, but the value is
    // always 0. That's why we start the timer here instead of when the device
    // starts playing - and only if aNewPosition != 0.
    _urgentPlayPositionQueryInProgress = false;
    if (aNewPosition && (device.state == sbISharingPushMediaRenderer.PLAYING)
        && !_playPositionTimer ) {
      _startPlayPositionTimer();
    }
    _syncPlayPositionTimer(aNewPosition);
  };

  _deviceListener.onCommandSent = function( aCmd, isBackgroundCmd) {
    if (isBackgroundCmd) {
      // for background commands show the busy box 5 seconds after the command
      // was issued
      _deviceElement.deviceControls.deviceBusyBox.start([
        {timeout: DEVICE_QUERY_BUSY_DELAY, visible: false}
        ,{timeout: DEVICE_COMMAND_TIMEOUT - DEVICE_QUERY_BUSY_DELAY, callback: function() {
            _onDeviceCmdTimeout(aCmd, isBackgroundCmd);
        }}
      ]);
    }
    else {
      // for foreground commands show the busy box immediately
      _deviceElement.deviceControls.deviceBusyBox.start([
        {timeout: DEVICE_COMMAND_TIMEOUT, callback: function() {
            _onDeviceCmdTimeout(aCmd, isBackgroundCmd);
        }}
      ]);
    }
  };

  _deviceListener.onCommandResponseReceived = function(aCmdQueueSize) {
    if (aCmdQueueSize > 1) {
      // if there are still pending commands don't hide the busy box to prevent
      // flickering
      // NOTE: the current command is NOT yet removed from the queue, so a size
      // of 1 means there are no commands pending!
      return;
    }
    _deviceElement.deviceControls.deviceBusyBox.stop();
    _messageLoop.sendMessage(self, "cmdQueueEmpty");
  };

  _deviceListener.onDeviceCmdError = function(aCmd) {
    var err = Errors.get(aCmd);
    _messageLoop.sendMessage(self, "deviceCmdError", err);
    if (!err.isUiCmd) {
      // let timeout happen for non-user-invoked commands
      return;
    }
    _showError(err.msg);
    if ("Play" == aCmd) {
      // simply play next item
      _sequencer.next();
    }
  };

  // listen for messages
  var _msgLoopListener = {
    on_currentItemChanged: function(msg) {
      _setCurrentItemForUI();
    },
    on_prevItemChanged: function(msg) {
      // NOT IMPLEMENTED: Enable/Disable device control buttons
      return;
      _deviceElement.deviceControls.backButton.disabled =
        !msg.sender.prev.isPlayable(device);
    },
    on_nextItemChanged: function(msg) {
      // NOT IMPLEMENTED: Enable/Disable device control buttons
      return;
      _deviceElement.deviceControls.forwardButton.disabled =
        !msg.sender.next.isPlayable(device);
    },
    on_listUpdated: function(msg) {
      // NOT IMPLEMENTED: Enable/Disable device control buttons
      return;
      // when something in the playlist changes - reflect this to the UI by
      // enabling / disabling some buttons.
      // As long as the device is playing we can't disable the play button,
      // the user would not be able to call stop (via the context menu)
      _deviceElement.deviceControls.playPauseButton.disabled =
        !(msg.sender.playable || isInAPlayState(device));

      _deviceElement.deviceControls.backButton.disabled =
        !msg.sender.prev.isPlayable(device);

      _deviceElement.deviceControls.forwardButton.disabled =
        !msg.sender.next.isPlayable(device);
    }
  };

  // NOT IMPLEMENTED: Enable/Disable device control buttons
  // before we have playable items disable prev and next buttons
/*
  _deviceElement.deviceControls.backButton.disabled = true;
  _deviceElement.deviceControls.forwardButton.disabled = true;
*/
  _installListeners();

  //////////////////////////////////////////////////////////////////////////////
  // aux functions 

  // returns forward or backward step length
  // based of track length 
  function _getStepLength(trackLength)
  {
    var stepLength = trackLength / SCRUBBING_DIV;

    if( stepLength < SCRUBBING_MIN_STEP ) {
      stepLength = SCRUBBING_MIN_STEP;
    }

    if( stepLength > SCRUBBING_MAX_STEP ) {
      stepLength = SCRUBBING_MAX_STEP;
    }

    return stepLength;
  }

  // returns step length in case that computed position
  // does not exceed the track length
  // otherwise returns SCRUBBING_RES_NEXT which means
  // that sequencer should go to next track
  function _getStepLengthFwd(trackPosition, trackLength)
  {
    var stepLength = _getStepLength(trackLength);

    if( trackPosition + stepLength > trackLength ) {
      stepLength = SCRUBBING_RES_NEXT;
    }

    return stepLength;
  }

  // returns step length in case that computed position
  // is not less then zero
  // otherwise returns SCRUBBING_RES_PREV which means
  // that sequencer should go to prev track
  function _getStepLengthBckwd(trackPosition, trackLength) {
    var stepLength = _getStepLength(trackPosition, trackLength);

    if( trackPosition < stepLength ) {
      stepLength = SCRUBBING_RES_PREV;
    }

    return stepLength;
  }

  // set new track position based on current trackPosition,
  // trackLength and direction
  // in case that new position is greater than trackLength
  // it moves on next track
  // in case that new position is less than zero
  // it moves to previous track
  function _setNewPosition(trackPosition, trackLength, direction) {

    if(!device.hasCapability(Components.interfaces.sbISharingPushMediaRenderer.CAP_TIME_SCRUBBING)) {
      return;
    }

    if( device.state != sbISharingPushMediaRenderer.PLAYING ) {
      return;
    }

    if( _urgentPlayPositionQueryInProgress ) {
      return;
    }

    var newPlayPos = -1;
    var stepLength = -1;

    if( direction == SCRUBBING_DIR_FWD ) {

      stepLength = _getStepLengthFwd(trackPosition, trackLength);
      if(stepLength == SCRUBBING_RES_NEXT) {
        _urgentPlayPositionQueryInProgress = false;
        _sequencer.next();
        return;
      }
      else {
        newPlayPos = trackPosition + stepLength;
      }
    }
    else {
      stepLength = _getStepLengthBckwd(trackPosition, trackLength);
      if(stepLength == SCRUBBING_RES_PREV) {
        _urgentPlayPositionQueryInProgress = false;
        _sequencer.prev();
        return;
      }
      else {
        newPlayPos = trackPosition - stepLength;
      }
    }

    _LOG(">>>>> LENGTH (" + _NanoToSec(trackLength) + "s), DIR (" + _GetDirName(direction) + "), STEP(" + _NanoToSec(stepLength) + "s), POS (" + _NanoToSec(trackPosition) + "s), NEW_POS (" + _NanoToSec(newPlayPos) + "s)" );
    _urgentPlayPositionQueryInProgress = true;
    device.playPosition = newPlayPos;
  }

  // converts nanoseconds to seconds
  function _NanoToSec(nano) {
    return nano / SCRUBBING_SEC;
  }

  // returns name of direction
  function _GetDirName(dir) {
    if(dir == SCRUBBING_DIR_FWD) {
      return "forward";
    }
    else {
      return "backward";
    }
  }
}

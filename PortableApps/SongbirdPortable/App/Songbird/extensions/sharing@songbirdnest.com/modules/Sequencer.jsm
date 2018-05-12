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

var EXPORTED_SYMBOLS = [ "REPEAT", "Sequencer" ];

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;

Cu.import("resource://sharing/sbSharingPushMediaRendererListener.jsm");
Cu.import("resource://sharing/Tools.jsm");
Cu.import("resource://app/jsmodules/sbLibraryUtils.jsm");
Cu.import("resource://app/jsmodules/sbProperties.jsm");
Cu.import("resource://app/jsmodules/DebugUtils.jsm");
Cu.import("resource://sharing/PushPlayqueue.jsm");

const sbISharingPushMediaRenderer = Ci.sbISharingPushMediaRenderer;
const I_INVALID = -1;

var REPEAT = {
  get NONE()    {return 0;},
  get SINGLE()  {return 1;},
  get ALL()     {return 2;}
}

const LIST_MODIFIED_TIMEOUT_1 = 90;

var window = null;

/***************************************************************************
 * Sequencer
 */

function Sequencer(_window, _messageLoop, _devicePlaylist) {
  window = _window;
  var _LOG = generateDeviceLogFunction("__push__", 5, _devicePlaylist.device);

  //////////////////////////////////////////////////////////////////////////////
  // Public members
  this.__defineGetter__("currentItem", function() {
    return _pushPlayQueue.current;
  });

  this.__defineGetter__("nextItem", function() {
    return _pushPlayQueue.next;
  });

  this.__defineGetter__("shuffle", function() {
    return _pushPlayQueue.shuffle;
  });

  this.__defineSetter__("shuffle", function(val) {
    _pushPlayQueue.shuffle = val;
  });

  this.__defineGetter__("repeat", function() {
    return _repeat;
  });

  this.__defineSetter__("repeat", function(val) {
    val = parseInt(val);
    switch(val) {
      case REPEAT.NONE:
      case REPEAT.SINGLE:
      case REPEAT.ALL:
        _repeat = val;
        _pushPlayQueue.repeat = (REPEAT.ALL == _repeat);
        var nextItem = _pushPlayQueue.next;
        if (REPEAT.SINGLE == _repeat) {
          // in single repeat mode the next item should be invalid
          nextItem = new PushPlayqueueItem();
        }
        try {
          if (nextItem.isValid()) {
            _device.setNextItem(nextItem.item, nextItem.uid);
          }
          else {
            _device.setNextItem(null, "");
          }
        }
        catch(e) {
          _LOG("SQ: SET NEXT ERROR: " + e.toString());
        }
        break;
    }
  });

  //////////////////////////////////////////////////////////////////////////////
  // Private members
  var self = this;
  var _device = _devicePlaylist.device;
  var _lastKnownState = sbISharingPushMediaRenderer.NOMEDIA;

  var _repeat = REPEAT.NONE;
  var _stopRequested = false;

  var _pushPlayQueue = new PushPlayqueue(_device, _messageLoop, null);
  var _itemForPlay = new PushPlayqueueItem();

  //////////////////////////////////////////////////////////////////////////////
  // listeners

  // listen on the device
  var _deviceListener = new sbSharingPushMediaRendererListener();

  _deviceListener.onDeviceStateReceived = function( aNewState ) {
    if (_lastKnownState == aNewState) {
      // no change, ignore
      return;
    }
    switch(aNewState) {
      case sbISharingPushMediaRenderer.STOPPED:
        // in case we are in REPEAT.SINGLE mode we play the current item again
        // - manually, because of device workarounds we can't set the next item
        //   the same as the current item.
        if (!_stopRequested
            && (_lastKnownState == sbISharingPushMediaRenderer.PLAYING)
            && (REPEAT.SINGLE == _repeat)
            && _pushPlayQueue.current.isValid()) {
          self.play();
        }
        _stopRequested = false;
        break;
    }
    _lastKnownState = aNewState;
  };

  // listen for messages
  var _msgLoopListener = {
    on_currentItemChanged: function(msg) {
      if (!msg.data.new.cur && isInAPlayState(_device)) {
        // current item no longer available
        self.stop();
      }
    },
    on_prevItemChanged: function(msg) {
    },
    on_nextItemChanged: function(msg) {
      var nextItem = _pushPlayQueue.next;
      if (REPEAT.SINGLE == _repeat) {
        nextItem = new PushPlayqueueItem();
        return;
      }
      try {
        if (nextItem.isValid()) {
          _device.setNextItem(nextItem.item, nextItem.uid);
        }
        else {
          _device.setNextItem(null, "");
        }
      }
      catch(e) {
        _LOG("SQ: SET NEXT ERROR: " + e.toString());
      }
    }
  };

  //////////////////////////////////////////////////////////////////////////////
  // Private functions

  // set current item
  function _setDeviceCurrentItem(aSequencerItem, bStartPlay) {
    var stopped = !isInAPlayState(_device);
    self.stop();
    if ( aSequencerItem.equals(self.currentItem) && !stopped && bStartPlay ) {
      // not changed, not stopped - start play immediately
      _startPlay();
      return;
    }
    try {
      if (aSequencerItem.isValid()) {
        _device.setCurrentItem(aSequencerItem.item, aSequencerItem.uid);
      }
      else {
        _device.setCurrentItem(null, "");
        bStartPlay = false;
      }
    }
    catch(e) {
      _LOG("SQ: ERROR executing setCurrentItem: " + e.toString());
    }
    if (bStartPlay) {
      _startPlay();
    }
  }

  function _startPlay() {
    try {
      _device.play();
    } catch(e) {
      _LOG("SQ: ERROR executing play: " + e.toString());
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  this.play = function() {
    if (!_itemForPlay.isValid()) {
      // no item for playing selected..
      if (_pushPlayQueue.current.isValid()) {
        // .. but have current item: this seems to be a pause-resume.
        _startPlay();
        return;
      }
      // ... and no current item - detect one
      _itemForPlay = _pushPlayQueue.detectItemForPlay();
    }

    if (!_itemForPlay.isValid()) {
      // still nothing to play
      return;
    }
    _setDeviceCurrentItem(_itemForPlay, true);
    _itemForPlay.reset();
  };

  this.playitem = function() {
    // called to play the selected item in the playlist. used by context menu
    // and playlist
    _itemForPlay = _pushPlayQueue.detectItemForPlay(true,true);
    this.play();
  };

  this.stop = function() {
    _stopRequested = true;
    try {
      _device.stop();
    } catch(e) {
      _LOG("SQ: ERROR executing stop: " + e.toString());
    };
  };

  this.pause = function() {
    try {
      _device.pause();
    } catch(e) {
      _LOG("SQ: ERROR executing pause: " + e.toString());
      return false;
    };
    return true;
  };

  this.next = function() {
    if (!isInAPlayState(_device)) {
      return;
    }
    _itemForPlay.copy(_pushPlayQueue.next);
    if (_itemForPlay.isValid()) {
      this.play();
    }
  };

  this.prev = function() {
    if (!isInAPlayState(_device)) {
      return;
    }
    _itemForPlay.copy(_pushPlayQueue.prev);
    if (_itemForPlay.isValid()) {
      this.play();
    }
  };

  this.finalize = function() {
    _messageLoop.unsubscribe(_msgLoopListener);
    _device.removeListener(_deviceListener);
    _pushPlayQueue.finalize();
  };

  this.onMedialistChanged = function() {
    var mediaListView = _devicePlaylist.mediaListView;
    _pushPlayQueue.mediaListView = mediaListView;

/* ONLY IF USING SEPARATE LIBRARY - see components\src\push\sbPushControllerService.js
    // detect and remove items no longer available in the main library BEFORE we
    // attach the listeners
    var mainLibrary = LibraryUtils.mainLibrary;
    var length = mediaListView.length;
    for(var i = 0; i < length; i++) {
      try {
        var item = mediaListView.getItemByIndex(i);
        var originalGUID = item.
            getProperty(SBProperties.originItemGuid);
        mainLibrary.getItemByGuid(originalGUID);
      }
      catch(e) {
        // remove item
        mediaListView.mediaList.remove(item);
      }
    }
*/
  };

  //////////////////////////////////////////////////////////////////////////////
  // initialization

  _messageLoop.subscribe(_msgLoopListener);

  _device.addListener(_deviceListener);
}


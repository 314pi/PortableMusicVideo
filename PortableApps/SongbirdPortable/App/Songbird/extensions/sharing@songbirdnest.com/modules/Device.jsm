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

var EXPORTED_SYMBOLS = [ "Device" ];

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;

Cu.import("resource://sharing/DeviceUI.jsm");
Cu.import("resource://app/jsmodules/sbProperties.jsm");
Cu.import("resource://sharing/Tools.jsm");
Cu.import("resource://sharing/MessageLoop.jsm");

// Generate a msg name for device related messages.
// The name will be "Device" + valueName + eventName, where valueName
// will have a capitalized first letter.
// So if valueName is "state" and eventName is "Changed"
// msg name will be "DeviceStateChanged".
function generateMessageName(valueName, eventName) {
  return "Device" + valueName.charAt(0).toUpperCase() +
                    valueName.slice(1) + eventName;
}

// query device info variables every .. ms:
const QUERY_DEVICE_INFO_INTERVAL  = 2000;

// media item property "device id": stores the uuid of the device this playlist
// belongs to
const SB_PROPERTY_DEVICEID  = "http://songbirdnest.com/data/1.0#push_device_id";

// map of device command names and the query functions on the device
var deviceVariableQueryFunc = {
  GetTransportInfo: "queryDeviceState",
  GetVolume:        "querySoundVolume",
  GetMute:          "queryMuteState",
  GetPositionInfo:  "queryPlayPosition",
  GetMediaInfo:     "queryCurrentItem"
};

/***************************************************************************
 * Device
 *  acts like a kind of controller for the device
 *  responsible for querying device values
 */

function Device(window, pushController, _device,
                deviceElementParentNode, menuItem) {
  var _LOG = generateDeviceLogFunction("__push__1", 5, _device);
  var self = this;

  // timestamp for the next device values query
  var _nextQuery = 0;
  // the timer for these queries
  var _deviceQueryTimer = null;
  // array of device query commands
  var _deviceVariableQuerys = [];

  // the device specific message loop
  var _messageLoop = new MessageLoop(window);

  // the UI
  var _ui = new DeviceUI(window,
                _messageLoop, _device, deviceElementParentNode, menuItem);

  this.__defineGetter__("ui", function() {
    return _ui;
  });

  this.__defineGetter__("device", function() {
    return _device;
  });

  // query device variables like volume, mute state etc
  function _queryDevice() {
    if (_deviceQueryTimer) {
      window.clearTimeout(_deviceQueryTimer);
      _deviceQueryTimer = null;
    }
    for (var i = 0; i < _deviceVariableQuerys.length; i++) {
      try {
        var cmd = _deviceVariableQuerys[i];
        var funcName = deviceVariableQueryFunc[cmd];
        _device[funcName]();
      }
      catch(e) {}
    }
    _nextQuery = (new Date()).getTime() + QUERY_DEVICE_INFO_INTERVAL;
  }

  // schedule the next device query or do immediately if one is already
  // scheduled
  function _scheduleDeviceQuery() {
    var now = (new Date()).getTime();
    if (now > _nextQuery) {
      // query immediately
      _queryDevice();
      return;
    }
    if (_deviceQueryTimer) {
      // already scheduled
      return;
    }
    // postpone for later
    var to = _nextQuery - now + 1;
    _deviceQueryTimer = window.setTimeout(_queryDevice, to);
  }

  // listens for device specific messages
  var _msgLoopListener = {
    on_cmdQueueEmpty: function(msg) {
      // done with all queries, schedule next update
      _scheduleDeviceQuery();
    },
    on_deviceCmdTimeout: function(msg) {
      // a timeout happened, show error and schedule next update
      this.on_deviceCmdError(msg);
      _scheduleDeviceQuery();
    },
    on_deviceCmdError: function(msg) {
      // an error happened, move the query that caused the error to the end of
      // the queue so that it does not block further queries
      var cmd = msg.data.cmd;
      if ("undefined" != typeof(deviceVariableQueryFunc[cmd])) {
        for (var i = 0; i < _deviceVariableQuerys.length; i++) {
          if (_deviceVariableQuerys[i] == cmd) {
            // push this funciton to the end of _deviceVariableQuerys
            _deviceVariableQuerys.push(_deviceVariableQuerys.splice(i,1));
            break;
          }
        }
      }
    }
  };

  // Receives the response for a device variable query. Notifies all interested
  // receivers via a message.
  function _onDeviceValueReceived(valueName, device, newValue) {
    try {
      if (("undefined" != typeof(device[valueName])) && (device[valueName] != newValue)) {
        // notify everybody
        pushController.msgLoop.sendMessage(self,
          generateMessageName(valueName, "Changed"), {
            device: device,
            oldValue: device[valueName],
            newValue: newValue
          }
        );
      }
    } catch(e) {}
  }

  // cleanup everything
  this.finalize = function() {
    _messageLoop.unsubscribe(_msgLoopListener);
    _ui.finalize();
  };

  // get or create a playlist for the device
  var mediaList = null;
  try {
    // get the playlist
    mediaList = pushController.library
          .getItemsByProperty(SB_PROPERTY_DEVICEID, _device.uuid)
          .queryElementAt(0, Ci.sbIMediaList);
  } catch(e) {
    // does not exist yet, create one
    mediaList = pushController.library.createMediaList("simple");
    mediaList.setProperty(SB_PROPERTY_DEVICEID, _device.uuid);
    // setup default columns for treeview
    var columnSpec = "";
    columnSpec += SBProperties.ordinal + " 42 a ";
    columnSpec += SBProperties.trackName + " 100 ";
    columnSpec += SBProperties.artistName + " 58";
    mediaList.setProperty(SBProperties.columnSpec, columnSpec);
  }
  mediaList.setProperty(SBProperties.hidden, "1");
  // Update name in case device.friendlyName changed. Since the playlist does
  // not show up to the user (for now) there is no danger of overwriting a user
  // given name.
  mediaList.name = _device.friendlyName;
  _ui.attachMediaList(mediaList);

  // subscribe to events. UI handles responses to device queries and maps them
  // to a unified method
  _ui.deviceElement.onvaluereceived = _onDeviceValueReceived;

  // create the device query array. This array will be iterated when a scheduled
  // device query is triggered and all the related values will be queried from
  // the device.
  for(var cmd in deviceVariableQueryFunc) {
    _deviceVariableQuerys.push(cmd);
  }

  // subscribe to the message loop
  _messageLoop.subscribe(_msgLoopListener);
  // and schedule first query
  _scheduleDeviceQuery();
}


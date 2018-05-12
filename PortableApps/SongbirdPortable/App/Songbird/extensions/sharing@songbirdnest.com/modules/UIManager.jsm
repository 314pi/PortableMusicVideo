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

var EXPORTED_SYMBOLS = [ "UIManager" ];

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;

Cu.import("resource://app/jsmodules/DebugUtils.jsm");
Cu.import("resource://app/jsmodules/sbLibraryUtils.jsm");

var _LOG = DebugUtils.generateLogFunction("__push__", 5);

/*****************************************************************************
 * UI manager
 *
 * Handles the push controller devices and their UIs
 */
function UIManager(pushController) {
  Cu.import("resource://sharing/Device.jsm");

  ////////////////////////////////////////////////////////////////////////////
  // UI manager constants
  const PUSH_MENU           = "sharing-push-device-menu";
  const PUSH_MENU_ITEM0     = "sharing-push-device-menu-item-computer";
  const PUSH_DEVICE_MENU    = "sharing-push-header-box";
  const PUSH_DEVICE_STACK   = "sharing-push-device-stack";

  const PQ_HEADERBOX        = "playqueue-header-box";
  const PQ_PLAYLISTBOX      = "playqueue-playlist-box";

  // Refresh device list: Show the spinner for n more ms after a device was
  // found. We can't know when we have all devices, so we assume that within
  // this timeout all available devices should have reported online.
  const REFRESH_SPINNER_TIMEOUT = 3000;

  var self = this;

  ////////////////////////////////////////////////////////////////////////////
  // UI manager private attributes

  // stores the DOM element holding the play queue
  var _playListQueueElement = null;
  // holds all device UIs
  var _deviceUIs = {};
  // the uuid of the currently selected device
  var _selectedDeviceID = null;
  // timer for refreshing the device list
  var _refreshTimer = 0;

  ////////////////////////////////////////////////////////////////////////////
  // UI manager private methods

  // Show or hide the whole push controller related UI.
  // When our UI is shown the playqueue UI is hidden and vice versa.
  function _showDeviceUI(bShow) {
    if (bShow) {
      // only if there is really, really a device..
      if (_selectedDeviceID && _deviceUIs[_selectedDeviceID]) {
        // ..hide playqueue elements..
        _hide(_playListQueueElement);
        _hide(_get(PQ_HEADERBOX));
        // ..and show device and the device stack
        _get(PUSH_DEVICE_STACK).style.visibility = "visible";
        _deviceUIs[_selectedDeviceID].ui.show(true);
      }
    }
    else {
      // hide device stack..
      _get(PUSH_DEVICE_STACK).style.visibility = "collapse";
      // ..and show playqueue elements
      _show(_playListQueueElement);
      _show(_get(PQ_HEADERBOX));
      var menu = self.getMenu();
      // .. set selected to "Computer"..
      menu.selectedItem = self.getMenuPQItem();
    }
  }

  // callback for the menu dropdown
  function _onMenuSelectionChanged() {
    // send message "device unselected"
    pushController.msgLoop.sendMessage(self, "DeviceUnSelected");
    // get the device for the selected item
    var deviceID = self.getMenu().selectedItem.value;
    var device = (_deviceUIs[deviceID])
      ? _deviceUIs[deviceID].device
      : null;
    // and send message about the new device (which can be null in case the
    // playqueue was selected)
    pushController.msgLoop.sendMessage(self, "DeviceSelected", device);
  }

  // Callback from the device list refresh timer. This timer hits
  // REFRESH_SPINNER_TIMEOUT ms after the last device was found.
  function _onRefreshTimer() {
    _refreshTimer = 0;
    // stop the spinner
    _get("sharing-push-refresh-button").setAttribute(
      "image", "chrome://sharing/skin/images/icon-busy0.png");
  }

  // Start the spinner icon and set the timer for stopping the spinner icon.
  // If bSetAlways is false the timer is set only if it was already running
  // before.
  function _setStartRefresh(bSetAlways) {
    if (_refreshTimer) {
      pushController.window.clearTimeout(_refreshTimer);
    }
    if (bSetAlways || _refreshTimer) {
      if (!_refreshTimer) {
        // if no timer was running start the spinner icon
        _get("sharing-push-refresh-button").setAttribute(
          "image", "chrome://sharing/skin/images/icon-busy.png");
      }
      _refreshTimer = pushController.window.setTimeout(_onRefreshTimer,
        REFRESH_SPINNER_TIMEOUT);
    }
  }

  // some DOM helper
  function _get(id) {
    return pushController.window.document.getElementById(id);
  }

  function _show(item) {
    try {
      item.removeAttribute("hidden");
    }
    catch(e) {_LOG("ERROR in _show(..): " + e.toString());};
  }

  function _hide(item) {
    try {
      item.setAttribute("hidden", true);
    }
    catch(e) {_LOG("ERROR in _hide(..): " + e.toString());};
  }

  ////////////////////////////////////////////////////////////////////////////
  // UI manager public methods

  // returns the menu dropdown
  self.getMenu = function() {
    return _get(PUSH_MENU);
  };

  // returns the menu item for a given device ID
  // @return: object with DOM element and index in the dropdown:
  // {item: item, index: n}
  self.getMenuItem = function(aDeviceID) {
    var menu = self.getMenu();
    var m = menu.itemCount;
    for(var n = 0; n < m; n++) {
      var item = menu.getItemAtIndex(n);
      if (item.value == aDeviceID) {
        return {item: item, index: n};
      }
    }
    return {item: null, index: -1};
  };

  // returns the "Computer" menu item (DOM element)
  self.getMenuPQItem = function() {
    return _get(PUSH_MENU_ITEM0);
  };

  // cleanup
  self.finalize = function() {
    self.getMenu()
      .removeEventListener("select", _onMenuSelectionChanged, false);
    pushController.msgLoop.unsubscribe(self);
    _selectedDeviceID = null;
    _deviceUIs = null;
    _playListQueueElement = null;
  };

  ////////////////////////////////////////////////////////////////////////////
  // UI manager msg handlers
  self.on_SharingStarted = function(msg) {
    // show the device menu
    _show(_get(PUSH_DEVICE_MENU));
  }

  self.on_SharingStopped = function(msg) {
    // hide the the device UI..
    _showDeviceUI(false);
    // ..and device menu..
    _hide(_get(PUSH_DEVICE_MENU));
    // ..and remove all devices from the list and from the menu
    for(var i in _deviceUIs) {
      _deviceUIs[i].finalize();
    }

    // select "Computer"
    self.getMenu().selectedItem = self.getMenuPQItem();

    // reset data
    _deviceUIs = {};
    _selectedDeviceID = null;
  }

  function _insertMenuSorted(deviceName, deviceID) {
    var menu = self.getMenu();
    // get first item after computer and separator
    for (var i = 2; i < menu.itemCount; i++) {
      var itemLbl = menu.getItemAtIndex(i).label;
      if (deviceName.localeCompare(itemLbl) <= 0) {
        return menu.insertItemAt(i, deviceName, deviceID);
      }
    }
    return menu.appendItem(deviceName, deviceID);
  }

  self.on_DeviceFound = function(msg) {
    var deviceID = msg.data.uuid;
    var deviceName = msg.data.friendlyName;
    _LOG("DeviceFound: \"" + deviceName + "\"");
    var item = self.getMenuItem(deviceID);
    if (!item.item) {
      // Don't have a menu item for this device. Create one and add to the
      // dropdown.
      item.item = _insertMenuSorted(deviceName, deviceID);
    }
    else {
      // Have a menu item already. Just update the label..
      item.item.label = deviceName;
      // ..and the styles.
//        item.item.removeAttribute("class");
    }
    try {
      // create the device UI if not done yet
      if (!_deviceUIs[deviceID]) {
        // create object containing the UI and store in internal map
        _deviceUIs[deviceID] =
          new Device(pushController.window, pushController, msg.data,
                                         _get(PUSH_DEVICE_STACK), item.item);
      }
      // and restart the timer in case it was running (it was running if this
      // call is the result of a device list refresh)
      _setStartRefresh(false);
    }
    catch(e) {
      _LOG("ERROR adding device: " + e.toString());
      item.item.label = "ERROR " + deviceName;
      //pushController.msgLoop.postMessage(self, "DeviceLost", msg.data);
    }
  }

  self.on_DeviceLost = function(msg) {
    var deviceID = msg.data.uuid;
    _LOG("DeviceLost: \"" + msg.data.friendlyName + "\"");
    if (_selectedDeviceID == deviceID) {
      // the device which is gone was the currently selected device
      _selectedDeviceID = null;
      // so select the "Computer" item
      self.getMenu().selectedItem = self.getMenuPQItem();
    }
    // remove item from the list and from the menu
    if (_deviceUIs[deviceID]) {
      _deviceUIs[deviceID].finalize();
      delete _deviceUIs[deviceID];
    }
  };

  self.on_DeviceSelected = function(msg) {
    if (msg.data) {
      _selectedDeviceID = msg.data.uuid;
      // show push controller UI
      _showDeviceUI(true);
    }
    else {
      // selected device is the "Computer",
      // hide device UI
      _showDeviceUI(false);
    }
  };

  self.on_DeviceUnSelected = function(msg) {
    // hide UI for device
    if (_selectedDeviceID && _deviceUIs[_selectedDeviceID]) {
      _deviceUIs[_selectedDeviceID].ui.show(false);
    }
    // set selected device to null
    _selectedDeviceID = null;
  };

  self.on_BeforeRefreshDeviceList = function(msg) {
    // start the spinner icon and the timer
    _setStartRefresh(true);
    // switch UI back to "Computer"
    _showDeviceUI(false);
  };

  // initializer
  (function() {
    _playListQueueElement = _get(PQ_PLAYLISTBOX).parentNode;

    // initialize the devices dropdown..
    var menu = self.getMenu();
    // .. set selected to "Computer"..
    menu.selectedItem = self.getMenuPQItem();
    // .. and add a listener for select-event
    menu.addEventListener("select", _onMenuSelectionChanged, false);

    // subscribe to message loop
    pushController.msgLoop.subscribe(self);

    var sharingI = Ci.sbISharingServiceXPCOM;
    if (sharingI.STATUS_UP == Cc["@songbirdnest.com/sharing-service-xpcom;1"]
      .getService(sharingI).status) {
      // if the sharing add-on is already active, show UI
      pushController.msgLoop.postMessage(self, "SharingStarted");
    }
  })();
}

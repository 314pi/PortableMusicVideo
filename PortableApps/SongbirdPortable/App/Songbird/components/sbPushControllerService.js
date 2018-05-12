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

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://app/jsmodules/DebugUtils.jsm");
Cu.import("resource://app/jsmodules/sbLibraryUtils.jsm");

var _LOG = DebugUtils.generateLogFunction("__push__1", 5);

/**
 * sbPushControllerService
 *
 * This is the main implementation of the push controller. It is implemented
 * as a service so that it can easily accessed from everwhere - means, mainly
 * from the xbl.
 */
function sbPushControllerService() {
  // Imports. Sharing imports have to be here because when this component is
  // loaded sharing is not yet. This means the imports would fail.
  Cu.import("resource://sharing/MessageLoop.jsm");
  Cu.import("resource://sharing/UIManager.jsm");
  Cu.import("resource://sharing/Tools.jsm");

  // observer message for sharing service
  const SB_SHARING_SERVICE_STATUS_CHANGED =
        "songbird-sharing-service-status-changed";

  // library related constants
  const SB_SHARING_PUSH_LIBRARY           = "push.sharing@songbirdnest.com";
  const SB_SHARING_PUSH_LIBRARY_GUID_PREF = "extensions.sharing.push.library";

  var sbISharingPushMediaRenderer =
    Ci.sbISharingPushMediaRenderer;

  var self = this;

  //////////////////////////////////////////////////////////////////////////////
  // sbPushControllerService contained objects

  /*****************************************************************************
   * observer for sharing events
   * This observer will translate sharing server events (on, off) and events
   * from the push network into messages that get broadcasted to all attached
   * receivers via the message loop.
   */
  var _sharingObserver = (function(me) {

    // observe push network events
    me.onDeviceFound = function(aDevice) {
       _msgLoop.postMessage(me, "DeviceFound", aDevice);
    };

    me.onDeviceLost = function(aDevice) {
      _msgLoop.postMessage(me, "DeviceLost", aDevice);
    };

    me.handleSharingStarted = function() {
      // add a listener to push network events
      Cc["@songbirdnest.com/sharing-service-xpcom;1"]
        .getService(Ci.sbISharingServiceXPCOM)
        .pushNetwork.addListener(me);
      // and notify other listeners
      _msgLoop.postMessage(me, "SharingStarted");
      // Also we should refresh the list of known devices. It may happen (e.g.
      // when the playqueue was not up yet) that we were not up while the
      // sharing addon already found devices. Let's add these devices now.
      _msgLoop.postMessage(me, "RefreshDeviceList", true);
    };

    me.handleSharingStopped = function() {
      // The pushNetwork is already gone when we recieve this event, so this
      // call will throw. But call anyway, this might change in future.
      try{
        // remove listener to network events
        Cc["@songbirdnest.com/sharing-service-xpcom;1"]
          .getService(Ci.sbISharingServiceXPCOM)
          .pushNetwork.removeListener(me);
      }
      catch(e) {}
      // notify other listeners
      _msgLoop.postMessage(me, "SharingStopped");
    };

    // observe sharing-start and sharing-stop
    me.observe = function(subject, topic, data) {
      var msg = JSON.parse(data);
      _LOG("Sharing State JSON:"+data);
      if ("on" == msg.state) {
        me.handleSharingStarted();
      }
      else if ("off" == msg.state) {
        me.handleSharingStopped();
      }
    };

    me.initialize = function() {
      Cc["@mozilla.org/observer-service;1"]
        .getService(Ci.nsIObserverService)
        .addObserver(me, SB_SHARING_SERVICE_STATUS_CHANGED, false);
      var sharingService = Cc["@songbirdnest.com/sharing-service-xpcom;1"]
        .getService(Ci.sbISharingServiceXPCOM);
      if (sharingService.status == Ci.sbISharingServiceXPCOM.STATUS_UP) {
        // in case sharing is already up do things normally done in observe()
        me.handleSharingStarted();
      }
    };

    me.finalize = function() {
      Cc["@mozilla.org/observer-service;1"]
        .getService(Ci.nsIObserverService)
        .removeObserver(me, SB_SHARING_SERVICE_STATUS_CHANGED);
    };

    return me;
  })({});

  //////////////////////////////////////////////////////////////////////////////
  // sbPushControllerService private attributes
  var _window = null;
  var _msgLoop = null;
  var _library = null;
  var _ui = null;

  //////////////////////////////////////////////////////////////////////////////
  // sbPushControllerService public attributes declared in
  // sbIPushControllerService.idl
  self.__defineGetter__("window", function() {
    return _window;
  });

  self.__defineGetter__("msgLoop", function() {
    return _msgLoop;
  });

  self.__defineGetter__("library", function() {
    return _library;
  });

  self.__defineGetter__("ui", function() {
    return _ui;
  });

  ////////////////////////////////////////////////////////////////////////////
  // sbPushControllerService msg handlers
  self.on_RefreshDeviceList = function(msg) {
    self.refreshDeviceList(msg.data);
  }

  //////////////////////////////////////////////////////////////////////////////
  // sbPushControllerService public methods declared in
  // sbIPushControllerService.idl
  self.init = function(w) {
    _LOG("CONTROLLER: init");
    _window = w;

    _msgLoop = new MessageLoop(_window);

    ////////////////////////////////////////////////////////////////////////////
    // SEPARATE LIBRARY:
    // The following code uses a separate library for storing the device
    // playlists.
    // get or create the library for push
    // ! IMPORTANT !
    // If you use a separate library you have to enable the commented code
    // labled with ONLY IF USING SEPARATE LIBRARY
/*
    var libraryManager = Cc["@songbirdnest.com/Songbird/library/Manager;1"]
                        .getService(Ci.sbILibraryManager);

    var prefBranch = Cc["@mozilla.org/preferences-service;1"]
                        .getService(Ci.nsIPrefBranch);
    var libraryGUID = prefBranch.getCharPref(SB_SHARING_PUSH_LIBRARY_GUID_PREF);

    if (libraryGUID) {
      try {
        _library = libraryManager.getLibrary(libraryGUID);
      } catch(e) {_LOG(" ---> E: " + e.toString());_library = null;}
    }
    if (!_library) {
      _library = createLibrary(SB_SHARING_PUSH_LIBRARY);
      libraryManager.registerLibrary(_library, true);
      libraryGUID = _library.guid;
      // save GUID to prefs
      prefBranch.setCharPref(SB_SHARING_PUSH_LIBRARY_GUID_PREF, libraryGUID);
    }
*/
    // END SEPARATE LIBRARY:
    /////////////////////////////////

    /////////////////////////////////
    // SONGBIRD LIBRARY:
    // The following code uses the SongBird main library for storing the device
    // playlists.
    _library = Cc["@songbirdnest.com/Songbird/library/Manager;1"]
               .getService(Ci.sbILibraryManager).mainLibrary;
    // END SONGBIRD LIBRARY:
    /////////////////////////////////

    // initialize UI
    _ui = new UIManager(self);

    // setup listeners
    //    sharing addon
    //    and push network events
    _sharingObserver.initialize();

    // subscribe to message loop
    _msgLoop.subscribe(self);
  }

  self.finalize = function() {
    // unsubscribe to message loop
    _msgLoop.unsubscribe(self);

    // finalize observer
    _sharingObserver.finalize();

    // and UI
    _ui.finalize();

    // and cleanup private members
    _window = null;
    _msgLoop = null;
    _library = null;
    _ui = null;
  };

  self.refreshDeviceList = function(aKnownAddOnly) {
    _msgLoop.sendMessage(self, "BeforeRefreshDeviceList");
    Cc["@songbirdnest.com/sharing-service-xpcom;1"]
      .getService(Ci.sbISharingServiceXPCOM)
      .pushNetwork.refresh(aKnownAddOnly);
  };
}

//////////////////////////////////////////////////////////////////////////////
// registration
sbPushControllerService.prototype = {
  classDescription: "DLNA push controller service",
  classID:          Components.ID("{F7994E5F-CCFD-4c7f-92E4-3F4E35AA282B}"),
  contractID:       "@songbirdnest.com/sbPushControllerService;1",
  QueryInterface: XPCOMUtils
                  .generateQI([Components.interfaces.sbIPushControllerService])
};

var NSGetModule = XPCOMUtils.generateNSGetModule([sbPushControllerService]);

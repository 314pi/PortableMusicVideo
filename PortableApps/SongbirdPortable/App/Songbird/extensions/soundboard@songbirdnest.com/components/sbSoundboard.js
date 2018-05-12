/*
 *
 *=BEGIN SONGBIRD LICENSE
 *
 * Copyright(c) 2005-2012 POTI, Inc.
 * http://www.songbirdnest.com
 *
 * For information about the licensing and copyright of this Add-On please
 * contact POTI, Inc. at customer@songbirdnest.com.
 *
 *=END SONGBIRD LICENSE
 *
 */

//@line 16 "/e/builds/nightly/release/sb_win32bot03_release/build/extras/extensions/soundboard/components/src/sbSoundboard.js.in"

// Constants for convience
if (typeof(Cc) == 'undefined')
  var Cc = Components.classes;
if (typeof(Ci) == 'undefined')
  var Ci = Components.interfaces;
if (typeof(Cu) == 'undefined')
  var Cu = Components.utils;
if (typeof(Cr) == 'undefined')
  var Cr = Components.results;

// Imports to help with some common tasks
Cu.import('resource://app/jsmodules/sbProperties.jsm');
Cu.import('resource://app/jsmodules/sbLibraryUtils.jsm');
Cu.import('resource://gre/modules/XPCOMUtils.jsm');
Cu.import('resource://app/jsmodules/StringUtils.jsm');

// FUEL makes us happier...
var Application = Components.classes["@mozilla.org/fuel/application;1"]
    .getService(Components.interfaces.fuelIApplication);

// Some prefs to use
const SOUNDBOARD_PREF_CONFIGURED = 'extensions.soundboard.configured';
const SOUNDBOARD_PREF_HOMEURI = 'extensions.soundboard.home';
const SOUNDBOARD_DEFAULT_HOMEURI = 'http://www.songbird.me';
const SOUNDBOARD_PREF_ARTISTPATH = 'extensions.soundboard.artist';
const SOUNDBOARD_DEFAULT_ARTISTPATH = '/#artist/';
const SOUNDBOARD_PREF_DISCOVERPATH = 'extensions.soundboard.discover';
const SOUNDBOARD_DEFAULT_DISCOVERPATH = '/#discover/stream/search/';

// What's my GUID
const SOUNDBOARD_EXTENSION_GUID = 'soundboard@songbirdnest.com';
// Node IDs for the service pane
const SOUNDBOARD_NODE_SERVICES = 'SB:Services';
const SOUNDBOARD_NODE_SOUNDBOARD = 'SB:Soundboard';
// Where's our stringbundle?
const SOUNDBOARD_STRINGBUNDLE = 'chrome://soundboard/locale/soundboard.properties';
// Where's that store?
const SOUNDBOARD_STORE_URL = 'http://soundboard.songbirdnest.com';
const SOUNDBOARD_START_PATH = "/";
const SOUNDBOARD_SERVICE_ICON = "chrome://soundboard/skin/servicepane-icon.png";
// What's the service pane's namespace
const SOUNDBOARD_SERVICEPANE_NS = 'http://songbirdnest.com/rdf/servicepane#'

function sbSoundboard() { }
sbSoundboard.prototype = {
  // XPCOM stuff
  className: 'sbSoundboard',
  classDescription: 'Songbird.me Service Pane Node',
  classID: Components.ID('{91ad8e8f-f355-4d0b-9e8a-f90bd4fbe7cd}'),
  contractID: '@songbirdnest.com/soundboard;1',
  QueryInterface: XPCOMUtils.generateQI([Ci.sbISoundboard, Ci.nsIObserver]),

  // Observer stuff
  _observerTopics: [
    'quit-application-granted', // the application is shutting down
    'em-action-requested',      // the extension manager is doing something
    'songbird-main-window-presented' // app is done starting up the ui
  ],
  _observerService: null,

  // Should I stay or should I go now?
  _uninstall: false,

  // Handy services
  _permissionManager: null,
  _servicePaneService: null,
  _ioService: null,

  // What whitelists do we do?
  _permissions: ['rapi.playback_control', 'rapi.playback_read', 
      'rapi.library_read', 'rapi.library_write'],
}

sbSoundboard.prototype.initialize = 
function sbSoundboard_initialize() {
  // here's some service we may well use later...
  this._permissionManager = Cc["@mozilla.org/permissionmanager;1"]
    .getService(Ci.nsIPermissionManager);
  this._ioService = Cc['@mozilla.org/network/io-service;1']
    .getService(Ci.nsIIOService);

  // Listen to a bunch of observer topics
  for (let i=0; i<this._observerTopics.length; i++) {
    this._observerService.addObserver(this, this._observerTopics[i], false);
  }
}
// nsIObserver
sbSoundboard.prototype.observe =
function sbSoundboard_observe(subject, topic, data) {
  if (topic == 'app-startup') {
    this._observerService = Cc['@mozilla.org/observer-service;1']
        .getService(Ci.nsIObserverService);
    this._observerService.addObserver(this, 'profile-after-change', false);
  } else if (topic == 'profile-after-change') {
    this._observerService.removeObserver(this, 'profile-after-change', false);
    this.initialize();
  } else if (topic == 'quit-application-granted') {
    // the application is shutting down
    this._observerService.removeObserver(this, 'em-action-requested', false);
    this._observerService.removeObserver(this, 'quit-application-granted', false);
    if (this._uninstall) {
      this.uninstall();
      this._uninstall = false;
    }

    // Remove event listener
    var sbWindow = Cc["@mozilla.org/appshell/window-mediator;1"]
                     .getService(Ci.nsIWindowMediator)
                     .getMostRecentWindow("Songbird:Main").window;
    sbWindow.removeEventListener("ShowCurrentTrack", this.onShowCurrentTrack, true);
  } else if (topic == 'em-action-requested') {
    // the extension manager is doing something
    subject.QueryInterface(Components.interfaces.nsIUpdateItem);
    if (subject.id != SOUNDBOARD_EXTENSION_GUID) {
      // if they're talking about someone else, we don't care
      return;
    }
    if (data == 'item-uninstalled' || data == 'item-disabled') {
      this._uninstall = true;
    } else if (data == 'item-cancel-action') {
      this._uninstall = false;
    }
  } else if (topic == 'songbird-main-window-presented') {
    this._observerService.removeObserver(this, 'songbird-main-window-presented', false);
    // Run this everytime since it involves servicepane node initialization
    this.install();
  }
}

sbSoundboard.prototype.onShowCurrentTrack =
function sbSoundboard_onShowCurrentTrack(aEvent) {
  var mediacoreManager = Cc['@songbirdnest.com/Songbird/Mediacore/Manager;1']
                           .getService(Ci.sbIMediacoreManager);
  var item = mediacoreManager.sequencer.currentItem;

  // Don't load the hidden medialist for the soundboard store if this file
  // is a preview from the soundboard store.
  if (item.contentSrc.host.indexOf("soundboard.com") != -1) {
    aEvent.preventDefault();
    aEvent.stopPropagation();
  }
}

sbSoundboard.prototype.createSoundboardURI =
function sbSoundboard_createSoundboardURI(aPath) {
  var home = Application.prefs.getValue(SOUNDBOARD_PREF_HOMEURI, SOUNDBOARD_DEFAULT_HOMEURI);
  var ioService = Cc['@mozilla.org/network/io-service;1']
                  .getService(Ci.nsIIOService);
  home = ioService.newURI(home, null, null);
  var uri = ioService.newURI(aPath, null, home);
  return uri;
}

// install soundboard music store integration
sbSoundboard.prototype.install =
function sbSoundboard_install() {
  this._servicePaneService = Cc['@songbirdnest.com/servicepane/service;1']
    .getService(Ci.sbIServicePaneService);
  
  // install ourselves into the service pane
  try {
    // find the store node
    var servicesNode = this._servicePaneService.getNode(SOUNDBOARD_NODE_SERVICES);
    if (!servicesNode) {
      servicesNode = this._servicePaneService.createNode();
      servicesNode.id = SOUNDBOARD_NODE_SERVICES;
      servicesNode.className = 'folder services';
      servicesNode.editable = false;
      servicesNode.name = SBString("servicesource.services");
      servicesNode.setAttributeNS(SOUNDBOARD_SERVICEPANE_NS, 'Weight', 1);
      this._servicePaneService.root.appendChild(servicesNode);
    } else {
      servicesNode.hidden = false;
    }

    // create soundboard node
    var myNode = this._servicePaneService.createNode();
    myNode.id = SOUNDBOARD_NODE_SOUNDBOARD;
    myNode.url = this.createSoundboardURI(SOUNDBOARD_START_PATH).spec;
    myNode.image = SOUNDBOARD_SERVICE_ICON;
    myNode.className = 'soundboard history';
    myNode.name = "Songbird.me";
    myNode.stringbundle = SOUNDBOARD_STRINGBUNDLE;
    myNode.setAttributeNS(SOUNDBOARD_SERVICEPANE_NS, "addonID", "soundboard@songbirdnest.com");
    servicesNode.appendChild(myNode);

    // Create a event listener to prevent soundboard URL's from being clickable
    // in the faceplate. See bug 22337.
    var sbWindow = Cc["@mozilla.org/appshell/window-mediator;1"]
                     .getService(Ci.nsIWindowMediator)
                     .getMostRecentWindow("Songbird:Main").window;
    sbWindow.addEventListener("ShowCurrentTrack", this.onShowCurrentTrack, true);
  } catch (e) {
    Cu.reportError(e);
  }

  // add whitelist entries
  try {
    var scope = this.createSoundboardURI("/");
    for (var i = 0; i < this._permissions.length; i++) {
      if (!this._permissionManager.testExactPermission(scope, 
            this._permissions[i])) {
        this._permissionManager.add(scope, this._permissions[i], 
            Ci.nsIPermissionManager.ALLOW_ACTION);
      }
    }
  } catch (e) {
    Cu.reportError(e);
  }

  Application.prefs.setValue(SOUNDBOARD_PREF_CONFIGURED, true);
}

// uninstall soundboard music store integration
sbSoundboard.prototype.uninstall =
function sbSoundboard_uninstall() {
  // remove whitelist entries
  try {
    var scope = this.createSoundboardURI("/");
    for (var i = 0; i < this._permissions.length; i++) {
      if (this._permissionManager.testExactPermission(scope, 
            this._permissions[i])) {
        this._permissionManager.remove(scope.host, this._permissions[i]);
      }
    }
  } catch (e) {
    Cu.reportError(e);
  }
  Application.prefs.setValue(SOUNDBOARD_PREF_CONFIGURED, false);
}

sbSoundboard.prototype.acquireArtistName =
function sbSoundboard_acquireArtistName(aMediaItem) {
  var artist = aMediaItem.getProperty(SBProperties.artistName);
  if( !artist || (artist == "") ) {
    return null;
  }
  // empiric hack to improve hit ratio for direct SOUNDBOARD_PREF_ARTISTPATH 
  // convert to lowercase, remove all whitespaces
  // artist = artist.toLowerCase().replace(/\s/gi,"");
  return encodeURIComponent(artist);

}

sbSoundboard.prototype.canEnableArtistProfile =
function sbSoundboard_canEnableArtistProfile(aMediaItem) {
  return !!this.acquireArtistName(aMediaItem);
}

sbSoundboard.prototype.showArtistProfile =
function sbSoundboard_showArtistProfile(aMediaItem) {
  var artistName = this.acquireArtistName(aMediaItem);
  if (!artistName) {
    return;
  }
  var mainWin =
  	Components.classes['@mozilla.org/appshell/window-mediator;1']
	.getService(Components.interfaces.nsIWindowMediator)
	.getMostRecentWindow('Songbird:Main');
  if (!mainWin) {
    return;
  }
  if (!mainWin.gBrowser) {
    return;
  }
  
  var discoverPath = Application.prefs.getValue(
    SOUNDBOARD_PREF_DISCOVERPATH,
    SOUNDBOARD_DEFAULT_DISCOVERPATH);
  var artistUri = this.createSoundboardURI(discoverPath + artistName);
  mainWin.gBrowser.loadOneTab(artistUri.spec);
}

// XPCOM NSGetModule implementation
function NSGetModule(compMgr, fileSpec) {
  return XPCOMUtils.generateModule([sbSoundboard],
  function(aCompMgr, aFileSpec, aLocation) {
    XPCOMUtils.categoryManager.addCategoryEntry('app-startup',
      sbSoundboard.prototype.classDescription,
      sbSoundboard.prototype.contractID, true, true);
  });
}

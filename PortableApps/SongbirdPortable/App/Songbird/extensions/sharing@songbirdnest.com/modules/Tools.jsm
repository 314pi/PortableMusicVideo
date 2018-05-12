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

var EXPORTED_SYMBOLS = [ "createLibrary", "getItemTitle", "getItemTitleAt", "isInAPlayState", "generateDeviceLogFunction" ];

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;

Cu.import("resource://app/jsmodules/sbProperties.jsm");
Cu.import("resource://app/jsmodules/DebugUtils.jsm");

const sbISharingPushMediaRenderer = Ci.sbISharingPushMediaRenderer;

function createLibrary(databaseGuid) {

  if (typeof(init) == "undefined") {
    init = true;
  }

  var directory = directory = Cc["@mozilla.org/file/directory_service;1"].
                getService(Ci.nsIProperties).
                get("ProfD", Ci.nsIFile);
  directory.append("db");

  var file = directory.clone();
  file.append(databaseGuid + ".db");

  var libraryFactory =
    Cc["@songbirdnest.com/Songbird/Library/LocalDatabase/LibraryFactory;1"]
      .getService(Ci.sbILibraryFactory);
  var hashBag = Cc["@mozilla.org/hash-property-bag;1"].
                createInstance(Ci.nsIWritablePropertyBag2);
  hashBag.setPropertyAsInterface("databaseFile", file);
  return libraryFactory.createLibrary(hashBag);
}

// return trackname of a media item
function getItemTitle(item) {
  if (!item) {
    return "NULL";
  }
  try {
    return item.getProperty(SBProperties.trackName);
  } catch(e) {}
  return "---";
}

// return track name for a media item in a media list view (i is the position)
function getItemTitleAt(mediaListView, i) {
  var item = null;
  try {
    item = mediaListView.getItemByIndex(i);
  } catch(e) {item = null;}
  return getItemTitle(item);
}

function isInAPlayState(device) {
  try {
    return ( (sbISharingPushMediaRenderer.PAUSED      == device.state)
          || (sbISharingPushMediaRenderer.PLAYING     == device.state)
          || (sbISharingPushMediaRenderer.TRANSITION  == device.state) );
  } catch(e) {}
  return false;
}

function generateDeviceLogFunction(module, level, dv) {
  let doLog = false;
  if (logDevices) {
    for each (let entry in logDevices.split(/,/)) {
      if (dv.uuid == entry) {
        doLog = true;
        break;
      }
    }
  }
  else {
    doLog = true;
  }
  if (!doLog) {
    return function(msg) {};
  }

  var _LOG = DebugUtils.generateLogFunction(module, level);
  var dn = "??";
  try {
    dn = dv.friendlyName;
    if (dn.length < 20) {
      dn += "                    ";
    }
    dn = dn.substr(0, 20);
  } catch(e) {}
  return function(msg) {
    _LOG("[" + dn + "]: " + msg);
  };
}

var logDevices = Cc["@mozilla.org/process/environment;1"]
                .createInstance(Ci.nsIEnvironment)
                .get("NSPR_LOG_DEVICES");



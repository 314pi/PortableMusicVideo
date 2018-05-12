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

Cu.import("resource://app/jsmodules/DebugUtils.jsm");
Cu.import("resource://app/jsmodules/sbProperties.jsm");

var _LOG = DebugUtils.generateLogFunction("__push__1", 5);

/*******************************************************************************
 * M A I N
 */

// ONLOAD: initialize sbPushControllerService
function sharingPushControllerOverlay_OnLoad() {
  _LOG("ONLOAD");
  window.removeEventListener("load", sharingPushControllerOverlay_OnLoad,
    false);
  window.addEventListener("unload", sharingPushControllerOverlay_OnUnLoad,
    false);

  Cc["@songbirdnest.com/sbPushControllerService;1"]
    .getService(Ci.sbIPushControllerService)
    .init(window);

}

// ONUNLOAD: cleanup sbPushControllerService
function sharingPushControllerOverlay_OnUnLoad() {
  _LOG("ONUNLOAD");
  window.removeEventListener("unload", sharingPushControllerOverlay_OnUnLoad,
    false);

  Cc["@songbirdnest.com/sbPushControllerService;1"]
    .getService(Ci.sbIPushControllerService)
    .finalize();
}

// oncommand-handler for refresh-button
function sharingPushControllerOverlay_refreshDeviceList() {
  Cc["@songbirdnest.com/sbPushControllerService;1"]
    .getService(Ci.sbIPushControllerService)
    .refreshDeviceList(false);
}

// bootstrap
window.addEventListener("load", sharingPushControllerOverlay_OnLoad, false);


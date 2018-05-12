/*
//
// BEGIN SONGBIRD GPL
//
// This file is part of the Songbird web player.
//
// Copyright(c) 2005-2008 POTI, Inc.
// http://songbirdnest.com
//
// This file may be licensed under the terms of of the
// GNU General Public License Version 2 (the "GPL").
//
// Software distributed under the License is distributed
// on an "AS IS" basis, WITHOUT WARRANTY OF ANY KIND, either
// express or implied. See the GPL for the specific language
// governing rights and limitations.
//
// You should have received a copy of the GPL along with this
// program. If not, go to http://www.gnu.org/licenses/gpl.html
// or write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
//
// END SONGBIRD GPL
//
*/

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;

const DESCRIPTION = "sbAboutGStreamer";
const CID         = "ea82983c-4e22-43e0-8942-ae5f31d3671a";
const CONTRACTID  = "@mozilla.org/network/protocol/about;1?what=gstreamer";

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function sbAboutGStreamer() {
}
sbAboutGStreamer.prototype = {
  classDescription: DESCRIPTION,
  classID:          Components.ID(CID),
  contractID:       CONTRACTID,

  newChannel: function(uri) {
    var ioService = Cc["@mozilla.org/network/io-service;1"]
                      .getService(Ci.nsIIOService);
    var childURI = ioService.newURI("chrome://songbird/content/gstreamer/about.xhtml",
                                    null, null);
    var channel = ioService.newChannelFromURI(childURI);
    channel.originalURI = uri;

    return channel;
  },

  getURIFlags: function(uri) {
    return Ci.nsIAboutModule.ALLOW_SCRIPT;
  },

  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule])
}

var NSGetModule = XPCOMUtils.generateNSGetModule([sbAboutGStreamer]);

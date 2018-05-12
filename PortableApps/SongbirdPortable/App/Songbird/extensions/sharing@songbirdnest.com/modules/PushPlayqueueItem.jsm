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

var EXPORTED_SYMBOLS = [ "PushPlayqueueItem" ];

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;

Cu.import("resource://sharing/Tools.jsm");
Cu.import("resource://app/jsmodules/sbProperties.jsm");
Cu.import("resource://app/jsmodules/DebugUtils.jsm");

const sbISharingPushMediaRenderer = Ci.sbISharingPushMediaRenderer;
const I_INVALID = -1;

/***************************************************************************
 * PushPlayqueueItem
 */
function PushPlayqueueItem(aItemIndex, mediaListView) {
  aItemIndex = parseInt(aItemIndex);
  this.index = (isNaN(aItemIndex))
    ? I_INVALID
    : aItemIndex;
  if ( (I_INVALID != this.index) && ("undefined" != typeof mediaListView) ) {
    this.validateItemFromIndex(mediaListView);
  }
}

// export constants as properties
PushPlayqueueItem.__defineGetter__("I_INVALID", function() { return I_INVALID; });
PushPlayqueueItem.__defineGetter__("NA",  function() { return  0; });
PushPlayqueueItem.__defineGetter__("NO",  function() { return -1; });
PushPlayqueueItem.__defineGetter__("YES", function() { return  1; });
// BYPASS CHECK FOR PLAYABILITY
// change this to a default value
PushPlayqueueItem.__defineGetter__("DEFAULT", function() { return PushPlayqueueItem.NO; });

PushPlayqueueItem.prototype.index     = I_INVALID;
PushPlayqueueItem.prototype.uid       = null;
PushPlayqueueItem.prototype.item      = null;
PushPlayqueueItem.prototype._canPlay  = PushPlayqueueItem.DEFAULT;

// Gets the UID and the meda item from the medialist by this.index.
// If this fails (e.g. because index is I_INVALID) reset all internal data
// and make item invalid.
PushPlayqueueItem.prototype.validateItemFromIndex = function(mediaListView) {
  try {
    this.uid = mediaListView.getViewItemUIDForIndex(this.index);
    this.item = mediaListView.getItemByIndex(this.index);
  }
  catch(e) {
    this.reset();
  }
  return this.isValid();
};

// Gets the index and the meda item from the medialist by this.uid.
// If this fails (e.g. because item was not found) reset all internal data
// and make item invalid.
PushPlayqueueItem.prototype.validateItemFromUID = function(mediaListView) {
  try {
    this.index = mediaListView.getIndexForViewItemUID(this.uid);
    this.item = mediaListView.getItemByIndex(this.index);
  }
  catch(e) {
    this.reset();
  }
  return this.isValid();
};

// reset to invalid
PushPlayqueueItem.prototype.reset = function() {
  this.index    = I_INVALID;
  this.uid      = null;
  this.item     = null;
  this._canPlay = PushPlayqueueItem.DEFAULT;
  // allows |return aItem.reset()|
  return this;
};

// copy item
PushPlayqueueItem.prototype.copy = function(from) {
  try {
    this.index    = from.index;
    this.uid      = from.uid;
    this.item     = from.item;
    this._canPlay = from._canPlay;
  }
  catch(e) {
    this.reset();
  }
  // allows |return aItem.copy()|
  return this;
}

// compare two items. val can be the UID or a PushPlayqueueItem
PushPlayqueueItem.prototype.equals = function(val) {
  return (val && "object" == typeof val)
    ? (this.uid == val.uid)
    : (this.uid == val);
}

// return true if index is valid
PushPlayqueueItem.prototype.isValid = function() {
  return (I_INVALID != this.index);
}

// update playability flag from device capabilities
PushPlayqueueItem.prototype.isPlayable = function(device) {
  return (PushPlayqueueItem.YES == this.detectCanPlay(device));
}

// update playability flag from device capabilities
PushPlayqueueItem.prototype.detectCanPlay = function(device) {
  try {
    if (!this.item || !device) {
      return this._canPlay;
    }
    this._canPlay = (device.canPlay(this.item))
      ? PushPlayqueueItem.YES
      : PushPlayqueueItem.NO;
  }
  catch(e) {
    this._canPlay = PushPlayqueueItem.NA;
  }
  return this._canPlay;
}

PushPlayqueueItem.prototype.toString = function() {
  return "[" + this.index + ": " + getItemTitle(this.item) + " (" + this.uid +")]";
}

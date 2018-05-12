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

var EXPORTED_SYMBOLS = [ "PushTreeView" ];

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

const sbISharingPushMediaRenderer = Ci.sbISharingPushMediaRenderer;


/***************************************************************************
 * PushTreeView
 *  The main purpose of this class is to provide a 'can't play' style and a
 *  'playing' icon for the currently playing track in a devices playlist.
 *  The original playlist treeview is tightly bound to the SongBird media
 *  sequencer and has no method to set the currently playing track manually.
 *  That's why we overwrite the original class (only the nsITreeView methods)
 *  and forward all calls to the original implementation.
 *  Only getCellProperties() and getRowProperties() have own implementations
 *  to provide the 'playing' icon.
 */

function PushTreeView(devicePlaylist) {
  this._LOG = generateDeviceLogFunction("__push__", 5, devicePlaylist.device);

  this.devicePlaylist = devicePlaylist;
  this.originalTreeView = this.devicePlaylist.treeView;
  this._currentItemUID = "";
  this._showCurrentTrack = false;

  var self = this;
  this._deviceListener = new sbSharingPushMediaRendererListener();

  this._deviceListener.onDeviceStateReceived = function( aNewState ) {
    self._onDeviceStateReceived(aNewState);
  };

  this._deviceListener.onCurrentItemReceived = function(item, uid) {
    if (uid == self._currentItemUID) {
      // not changed, ignore
      return;
    }
    var previousIndex = self._getCurrentPlayingIndex();
    self._currentItemUID = uid;
    var currentIndex = self._getCurrentPlayingIndex();
    if (-1 != previousIndex) {
      self.devicePlaylist.tree.treeBoxObject.invalidateRow(previousIndex);
    }
    if (-1 != currentIndex) {
      self.devicePlaylist.tree.treeBoxObject.invalidateRow(currentIndex);
    }
  };

  this._deviceListener.onPlayableMediaFilterReceived = function() {
    self.devicePlaylist.tree.treeBoxObject.invalidate();
  };

  this.devicePlaylist.device.addListener(this._deviceListener);
}

PushTreeView.prototype.QueryInterface = function(iid) {
  if (iid.equals(Ci.nsISupports))
  {
    return this;
  }
  if (iid.equals(Ci.nsITreeView))
  {
    return this;
  }
  return this.originalTreeView.QueryInterface(iid);
}

PushTreeView.prototype._setAdditionalPushProperties = function(rowIndex, properties) {
  var item = this.devicePlaylist.mediaListView.getItemByIndex(rowIndex);
  try {
    var canPlay = this.devicePlaylist.device.canPlay(item);
    if (!canPlay) {
      var atom = Cc["@mozilla.org/atom-service;1"]
          .getService(Ci.nsIAtomService)
          .getAtom("cantplay");
      properties.AppendElement(atom);
    }
  }
  catch(e) {}

  if ( (rowIndex == this._getCurrentPlayingIndex()) && this._showCurrentTrack)
  {
    var atom = Cc["@mozilla.org/atom-service;1"]
        .getService(Ci.nsIAtomService)
        .getAtom("playing");
    properties.AppendElement(atom);
  }
}

PushTreeView.prototype._finalize = function() {
  try {
    this.devicePlaylist.device.removeListener(this._deviceListener);
  } catch(e) {}
}

PushTreeView.prototype._onDeviceStateReceived = function(aNewState) {
  var showCurrentTrack = false;
  switch(aNewState) {
    case sbISharingPushMediaRenderer.PLAYING:
    case sbISharingPushMediaRenderer.PAUSED:
      showCurrentTrack = true;
      break;
  }
  if (this._showCurrentTrack != showCurrentTrack) {
    this._showCurrentTrack = showCurrentTrack;
    var currentIndex = this._getCurrentPlayingIndex();
    if (-1 != currentIndex) {
      this.devicePlaylist.tree.treeBoxObject.invalidateRow(currentIndex);
    }
  }
}

PushTreeView.prototype._getCurrentPlayingIndex = function() {
  try {
    return (this._currentItemUID)
      ? this.devicePlaylist.mediaListView
        .getIndexForViewItemUID(this._currentItemUID)
      : -1;
  }
  catch(e) {
    return -1;
  }
}

PushTreeView.prototype.getCellProperties = function(row, col, properties) {
  this.originalTreeView.getCellProperties(row, col, properties);
  this._setAdditionalPushProperties(row, properties);
};

PushTreeView.prototype.getRowProperties = function(index, properties) {
  this.originalTreeView.getRowProperties(index, properties);
  this._setAdditionalPushProperties(index, properties);
};

PushTreeView.prototype.__defineGetter__("rowCount", function()
  {return this.originalTreeView.rowCount;});

PushTreeView.prototype.__defineGetter__("selection", function()
  {return this.originalTreeView.selection;});

PushTreeView.prototype.canDrop = function(index, orientation, dataTransfer)
  {return this.originalTreeView.canDrop(index, orientation, dataTransfer);};

PushTreeView.prototype.canDropBeforeAfter = function(index, before)
  {return this.originalTreeView.canDropBeforeAfter(index, before);};

PushTreeView.prototype.canDropOn = function(index)
  {return this.originalTreeView.canDropOn(index);};

PushTreeView.prototype.cycleCell = function(row, col)
  {return this.originalTreeView.cycleCell(row, col);};

PushTreeView.prototype.cycleHeader = function(col)
  {return this.originalTreeView.cycleHeader(col);};

PushTreeView.prototype.drop = function(row, orientation, dataTransfer)
  {return this.originalTreeView.drop(row, orientation, dataTransfer);};

PushTreeView.prototype.getCellText = function(row, col)
  {return this.originalTreeView.getCellText(row, col);};

PushTreeView.prototype.getCellValue = function(row, col)
  {return this.originalTreeView.getCellValue(row, col);};

PushTreeView.prototype.getColumnProperties = function(col, properties)
  {return this.originalTreeView.getColumnProperties(col, properties);};

PushTreeView.prototype.getImageSrc = function(row, col)
  {return this.originalTreeView.getImageSrc(row, col);};

PushTreeView.prototype.getLevel = function(index)
  {return this.originalTreeView.getLevel(index);};

PushTreeView.prototype.getParentIndex = function(rowIndex)
  {return this.originalTreeView.getParentIndex(rowIndex);};

PushTreeView.prototype.getProgressMode = function(row, col)
  {return this.originalTreeView.getProgressMode(row, col);};

PushTreeView.prototype.hasNextSibling = function(rowIndex, afterIndex)
  {return this.originalTreeView.hasNextSibling(rowIndex, afterIndex);};

PushTreeView.prototype.isContainer = function(index)
  {return this.originalTreeView.isContainer(index);};

PushTreeView.prototype.isContainerEmpty = function(index)
  {return this.originalTreeView.isContainerEmpty(index);};

PushTreeView.prototype.isContainerOpen = function(index)
  {return this.originalTreeView.isContainerOpen(index);};

PushTreeView.prototype.isEditable = function(row, col)
  {return this.originalTreeView.isEditable(row, col);};

PushTreeView.prototype.isSelectable = function(row, col)
  {return this.originalTreeView.isSelectable(row, col);};

PushTreeView.prototype.isSeparator = function(index)
  {return this.originalTreeView.isSeparator(index);};

PushTreeView.prototype.isSorted = function()
  {return this.originalTreeView.isSorted();};

PushTreeView.prototype.performAction = function(action)
  {return this.originalTreeView.performAction(action);};

PushTreeView.prototype.performActionOnCell = function(action, row, col)
  {return this.originalTreeView.performActionOnCell(action, row, col);};

PushTreeView.prototype.performActionOnRow = function(action, row)
  {return this.originalTreeView.performActionOnRow(action, row);};

PushTreeView.prototype.selectionChanged = function()
  {return this.originalTreeView.selectionChanged();};

PushTreeView.prototype.setCellText = function(row, col, value)
  {return this.originalTreeView.setCellText(row, col, value);};

PushTreeView.prototype.setCellValue = function(row, col, value)
  {return this.originalTreeView.setCellValue();};

PushTreeView.prototype.setTree = function(tree)
  {return this.originalTreeView.setTree(tree);};

PushTreeView.prototype.toggleOpenState = function(index)
  {return this.originalTreeView.toggleOpenState(index);};

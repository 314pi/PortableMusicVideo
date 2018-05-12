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

var EXPORTED_SYMBOLS = [ "PushPlayqueueItem", "PushPlayqueue" ];

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
Cu.import("resource://sharing/PushPlayqueueItem.jsm");

const sbISharingPushMediaRenderer = Ci.sbISharingPushMediaRenderer;

/***************************************************************************
 * PushPlayqueue: the acutal playqueue for a device.
 * Keeps track of changes to the underlying mediaList(view) and the main
 * library.
 * Detects the previous and next items of the current item.
 * Receives the current item from the device.
 * Manages repeat and shuffle.
 */

function PushPlayqueue(aDevice, _messageLoop, aMediaListView) {
  //////////////////////////////////////////////////////////////////////////////
  // Private members
  var _LOG = generateDeviceLogFunction("__push__1", 5, aDevice);

  // the actual list
  var _data = {
    _byIndex: [],
    _byUID: {},
    _byGUID: {},
    clear: function() {
      this._byIndex = [];
      this._byUID = {};
      this._byGUID = {};
    },
    push: function(aPpqItem) {
      if ("undefined" == typeof(this._byGUID[aPpqItem.item.guid])) {
        this._byGUID[aPpqItem.item.guid] = [];
      }
      this._byGUID[aPpqItem.item.guid].push(aPpqItem);
      this._byUID[aPpqItem.uid] = aPpqItem;
      return this._byIndex.push(aPpqItem);
    },
    get: function(aIndex) {
      return this._byIndex[aIndex];
    },
    getByUID: function(aUID) {
      return this._byUID[aUID] || null;
    },
    getByGUID: function(aGUID) {
      return this._byGUID[aGUID] || null;
    }
  };
  // number of playable items
  var _playable = 0;
  var _mediaFilterReceived = false;

  // prev, current and next items
  var _currentItem  = new PushPlayqueueItem();
  var _prevItem     = new PushPlayqueueItem();
  var _nextItem     = new PushPlayqueueItem();

  var _device = null;
  var _mediaListView = null;

  // listeners
  var _mediaListListener      = null;
  var _mediaListViewListener  = null;
/* ONLY IF USING SEPARATE LIBRARY - see components\src\push\sbPushControllerService.js
  var _mainLibraryListener    = null;
*/
  var _deviceListener         = null;

  var _repeat = false;
  // array shuffledindex => originalindex
  var _shuffle = null;
  // array originalindex => shuffledindex
  var _shuffleRev = null;
  // flag to supress updates - used by listeners for batch processing
  var _noUpdate = false;

  var self = this;

  // Used when changing prev, current, next. Detects if the items really got
  // changed posts messages for changes.
  function ItemChangeTracker() {
    var _old = {
      prev  : _prevItem.uid,
      cur   : _currentItem.uid,
      next  : _nextItem.uid
    };

    this.fireChanges = function(reason) {
      reason = reason || "";
      var _new = {
        prev  : _prevItem.uid,
        cur   : _currentItem.uid,
        next  : _nextItem.uid
      };
      var changes = {
        reason: reason,
        old: _old,
        new: _new
      };
      if (_old.prev != _new.prev) {
        _messageLoop.postMessage(self, "prevItemChanged", changes);
      }
      if (_old.cur != _new.cur) {
        _messageLoop.postMessage(self, "currentItemChanged", changes);
      }
      if (_old.next != _new.next) {
        _messageLoop.postMessage(self, "nextItemChanged", changes);
      }
    }
  }

  function _shuffleIndex(aIndex) {
    if (_shuffleRev) {
      return _shuffleRev[aIndex];
    }
    else {
      return aIndex;
    }
  }

  function _unshuffleIndex(aIndex) {
    if (_shuffle) {
      return _shuffle[aIndex];
    }
    else {
      return aIndex;
    }
  }

  // detect previous or next item for a given item
  function _getCheekItem(aPushPlayQueueItem, aGetPrev) {
    var step = (aGetPrev) ? -1 : 1;
    var cheekItem = new PushPlayqueueItem();
    if (!aPushPlayQueueItem || !aPushPlayQueueItem.isValid()) {
      return cheekItem;
    }

    var indexSfl = _shuffleIndex(aPushPlayQueueItem.index);

    var length = _data._byIndex.length;
    for(var n = 0; n < length-1; n++) {
      indexSfl += step;

      if (!_repeat && ((indexSfl >= length) || (indexSfl < 0))) {
        // end of list reached, return invalid item
        return cheekItem.reset();
      }
      // calculate proper array index and check if item is ok
      indexSfl = (length + indexSfl) % length;
      cheekItem.index = _unshuffleIndex(indexSfl);
      cheekItem.validateItemFromIndex(_mediaListView);
      if (cheekItem.isPlayable(_device)) {
        return cheekItem;
      }
    }
    // checked all items, but none is found. return invalid item
    return cheekItem.reset();
  }

  function _updatePrevNext() {
    _prevItem = _getCheekItem(_currentItem, true);
    _nextItem = _getCheekItem(_currentItem, false);
  }

  // remove all data and reset items
  function _clear(aDontNotify) {
    var itemState = (aDontNotify) ? null : new ItemChangeTracker();
    _data.clear();
    _playable = 0;
    _currentItem.reset();
    _prevItem.reset();
    _nextItem.reset();
    if (itemState) {
      itemState.fireChanges("clear");
    }
    if (!aDontNotify) {
      _messageLoop.postMessage(self, "listUpdated");
    }
  }

  function _shuffleItems() {
    _shuffle = [];
    _shuffleRev = [];
    var ar = [];
    var length = _data._byIndex.length;
    for(var i = 0; i < length; i++) {
      ar.push(_data.get(i));
    }
    while(length) {
      i = Math.floor(Math.random() * length);
      var item = ar.splice(i, 1)[0];
      //item.indexSfl = _shuffle.length;
      _shuffleRev[item.index] = _shuffle.length;
      _shuffle.push(item.index);
      length--;
    }
  }

  function _updateCompleteList(aDontNotify) {
    var itemState = (aDontNotify) ? null : new ItemChangeTracker();
    var currentUID = _currentItem.uid;
    var oldData = _data._byIndex;
    _clear(true);

    if (_mediaListView) {
      var length = _mediaListView.length;
      for(var i = 0; i < length; i++) {
        var item = new PushPlayqueueItem(i, _mediaListView);
        if (item.isPlayable(_device)) {
          _playable++;
        }
        _data.push(item);
      }
    }

    if (_shuffle) {
      // update the shuffled indices. new items get appended.
      var shfl = _shuffle;
      var shflRev = _shuffleRev;
      _shuffle = [];
      _shuffleRev = [];
      var length = shfl.length;
      // update old items with current shuffled indices
      for(var i = 0; i < length; i++) {
        var item = _data.getByUID(oldData[shfl[i]].uid);
        if (item) {
          _shuffleRev[item.index] = i;
          _shuffle[i] = item.index;
        }
      }

      length = _data._byIndex.length;
      for(var i = 0; i < length; i++) {
        var item = _data.get(i);
        if ("undefined" == typeof(_shuffleRev[item.index])) {
          _shuffleRev[item.index] = _shuffle.length;
          _shuffle.push(item.index);
        }
      }
    }

    // restore current. this will also update prev and next
    _setCurrentItem("refresh", currentUID, true);
    if (itemState) {
      itemState.fireChanges("refresh");
    }
    if (!aDontNotify) {
      _messageLoop.postMessage(self, "listUpdated");
    }
    self.dump();
  }

  function _setCurrentItem(reason, aVal, aDontNotify) {
    var item = new PushPlayqueueItem();
    item.uid = aVal;
    item.validateItemFromUID(_mediaListView);

    var itemState = (aDontNotify) ? null : new ItemChangeTracker();
    // set and update prev and next
    _currentItem = item;
    _updatePrevNext();
    if (itemState) {
      itemState.fireChanges(reason);
    }
    return _currentItem;
  }

  //////////////////////////////////////////////////////////////////////////////
  // listeners we apply

  // listen for changes to the playlist view (sort changes)
  _mediaListViewListener = {
    onFilterChanged: function (aChangedView) {
    },

    onSearchChanged: function (aChangedView) {
    },

    onSortChanged: function (aChangedView) {
      if (!_noUpdate) {
        _updateCompleteList();
      }
    }
  };

  // listen for changes to the playlist (items added, removed, moved)
  _mediaListListener = {
    onItemAdded: function (aMediaList, aMediaItem, aIndex) {
    },

    onAfterItemRemoved: function (aMediaList, aMediaItem, aIndex) {
    },

    onItemUpdated: function (aMediaList, aMediaItem, aProperties) {
      // BYPASS CHECK FOR PLAYABILITY:
      // return false;
      if (!_mediaFilterReceived) {
        // no filters from the device, so no reason to do something
        return false;
      }
      var items = _data.getByGUID(aMediaItem.guid);
      if (!items) {
        // none of our items
        return false;
      }
      var length = aProperties.length;
      for(var i = 0; i < length; i++) {
        try {
          var prop = aProperties.getPropertyAt(i);
          if ( ("http://songbirdnest.com/data/1.0#dlna_profile_id" == prop.id)
            || ("http://songbirdnest.com/data/1.0#dlna_mimetype" == prop.id) ) {
            var profileID = aMediaItem.getProperty("http://songbirdnest.com/data/1.0#dlna_profile_id");
            var mimeType = aMediaItem.getProperty("http://songbirdnest.com/data/1.0#dlna_mimetype");
            if (profileID && mimeType) {
              // now we can detect playability. detect from first item, set to
              // all, since all <items> are the same physical sbIMediaItem
              var isPlayable = items[0].isPlayable(_device);
              for(var n = 1; n < items.length; n++) {
                items[n]._canPlay = isPlayable;
              }
              // this might have changed prev and next item, so update
              _updatePrevNext();
              return false;
            }
          }
        } catch(e) {}
      }
      return false;
    },

    onListCleared: function (aMediaList, aExcludeLists) {
      if (!_noUpdate) {
          _clear();
      }
    },

    onBatchEnd: function (aMediaList) {
      if (!_noUpdate) {
        _updateCompleteList();
      }
    }
  };

/* ONLY IF USING SEPARATE LIBRARY - see components\src\push\sbPushControllerService.js
NOTE: this is not implemented correctly yet
  // listen for changes to the main library (items removed)
  _mainLibraryListener = {
    onAfterItemRemoved: function (aMediaList, aMediaItem, aIndex) {
      _LOG("################ LIBRARY ITEM REMOVED ################");
      _noUpdate = true;
      try {
        var items = _mediaListView.mediaList.getItemsByProperty(
            SBProperties.originItemGuid, aMediaItem.guid);
        for(var i = 0; i < items.length; i++) {
          var item = items.queryElementAt(i, Ci.sbIMediaItem);
          if (item) {
            _mediaListView.mediaList.remove(item);
          }
        }
      }
      catch(e) {}
      _noUpdate = false;
      _updateCompleteList();
    }
  };
*/
  // listen on the device
  _deviceListener = new sbSharingPushMediaRendererListener();
  _deviceListener.onCurrentItemReceived = function(item, uid) {
_LOG("CURRENT ITEM received: " + item + "::[" + uid + "]");
    if (!item) {
      // if item is null this is clearly none of our items. if uid is ok and can
      // be found in our list, but item is null it is most probably an item from
      // a previous songbird run and is not valid for us any more.
      _setCurrentItem("received", "");
      return;
    }
    // set current. this will also update prev and next
    _setCurrentItem("received", uid);
  };

  _deviceListener.onPlayableMediaFilterReceived = function() {
    if (_mediaFilterReceived) {
      return;
    }
    _mediaFilterReceived = true;
    _playable = 0;
    for(var i = 0; i < _data._byIndex.length; i++) {
      if (_data.get(i).isPlayable(_device)) {
        _playable++;
      }
    }
    _messageLoop.postMessage(self, "playableMediaFilterReceived");
  };

  //////////////////////////////////////////////////////////////////////////////
  // Public members
  this.detectItemForPlay = function(aOnlySelected,aDirectSelection) {
    // detect an item for play.
    if (!_mediaListView) {
      // no medialistview, no items
      return new PushPlayqueueItem();
    }
    var selection = _mediaListView.selection;
    var currentItemIndex = 0;

    // if we have a selection use first item from the selection
    if (selection.count) {
      currentItemIndex = selection.currentIndex;
    }
    else if (aOnlySelected) {
      // otherwise, if only selected items are allowed, return empty item
      return new PushPlayqueueItem();
    }
    // otherwise: use first item

    var itemForPlay = new PushPlayqueueItem();    
    if(!aDirectSelection) {
      currentItemIndex = _unshuffleIndex(currentItemIndex);
    }
    itemForPlay.copy(_data.get(currentItemIndex));
    if (!itemForPlay.isPlayable(_device)) {
      // can't be played, get the next item in the list
      itemForPlay = _getCheekItem(itemForPlay, false);
    }
    return itemForPlay;
  };

  this.item = function(uid) {
    var item = new PushPlayqueueItem();
    item.uid = uid;
    item.validateItemFromUID(_mediaListView);
    return item;
  };

  this.__defineGetter__("device",function() {
    return _device;
  });

  this.__defineSetter__("device",function(aVal) {
    if (_device) {
      try {_device.removeListener(_deviceListener);}
      catch(e) {}
    }

    try {
      //var check = aVal.QueryInterface(Ci.sbISharingPushMediaRenderer);
      _device = aVal;
      _device.addListener(_deviceListener);
    }
    catch(e) {
      _device = null;
    }
    return _device;
  });

  this.__defineGetter__("mediaListView",function() {
    return _mediaListView;
  });

  this.__defineSetter__("mediaListView",function(aVal) {
    // remove current media list and media list view listeners
    if (_mediaListView) {
      if (_mediaListView.mediaList) {
        try {_mediaListView.mediaList.removeListener(_mediaListListener);}
        catch(e) {}
      }
      try {_mediaListView.removeListener(_mediaListViewListener);}
      catch(e) {}
    }

    // remove current main library listener
/* ONLY IF USING SEPARATE LIBRARY - see components\src\push\sbPushControllerService.js
    try {LibraryUtils.mainLibrary.removeListener(_mainLibraryListener);}
    catch(e) {}
*/
    // clear all data
    _clear(true);

    // check argument
    try {
      var check = aVal.QueryInterface(Ci.sbIMediaListView);
      _mediaListView = aVal;
    }
    catch(e) {
      _mediaListView = null;
    }
    if (!_mediaListView) {
      return null;
    }

    // update data
    _updateCompleteList();

    // attach listeners
    if (_mediaListView) {
      if (_mediaListView.mediaList) {
        _mediaListView.mediaList.addListener(
          _mediaListListener,
          false,
            Ci.sbIMediaList.LISTENER_FLAGS_ITEMMOVED
          | Ci.sbIMediaList.LISTENER_FLAGS_ITEMUPDATED
          | Ci.sbIMediaList.LISTENER_FLAGS_ITEMADDED
          | Ci.sbIMediaList.LISTENER_FLAGS_AFTERITEMREMOVED
          | Ci.sbIMediaList.LISTENER_FLAGS_LISTCLEARED
          | Ci.sbIMediaList.LISTENER_FLAGS_BATCHEND);
      }
      _mediaListView.addListener(_mediaListViewListener);
    }
/* ONLY IF USING SEPARATE LIBRARY - see components\src\push\sbPushControllerService.js
    LibraryUtils.mainLibrary.addListener(
      _mainLibraryListener,
      false,
      Ci.sbIMediaList.LISTENER_FLAGS_AFTERITEMREMOVED);
*/
  });

  this.__defineGetter__("playable",function() {
    return _playable;
  });

  this.__defineGetter__("repeat",function() {
    return _repeat;
  });

  this.__defineSetter__("repeat",function(aVal) {
    aVal = !!aVal;
    if (aVal == _repeat) {
      return _repeat;
    }
    _repeat = aVal;
    var itemState = new ItemChangeTracker();
    // update prev and next
    _updatePrevNext();
    itemState.fireChanges("repeat");
    return _repeat;
  });

  this.__defineGetter__("shuffle",function() {
    return !!_shuffle;
  });

  this.__defineSetter__("shuffle",function(aVal) {
    if (!aVal) {
      _shuffle = _shuffleRev = null;
    }
    else {
      _shuffleItems();
    }
    _updatePrevNext();
    return !!_shuffle;
  });

  this.__defineGetter__("current",function() {
    return _currentItem;
  });

  this.__defineGetter__("prev",function() {
    return _prevItem;
  });

  this.__defineGetter__("next",function() {
    return _nextItem;
  });

  this.dump = function(_l) {
    _l = _l || _LOG;
    _l("------------------- PushPlayqueue -------------------");
    for(var i = 0; i < _data._byIndex.length; i++) {
      var item = _data.get(_unshuffleIndex(i));
      _l(item);
    }
    _l("-----------------------------------------------------");
    _l("  <-- PREV: " + _prevItem);
    _l("      CURR: " + _currentItem);
    _l("  --> NEXT: " + _nextItem);
    _l("------------------- PushPlayqueue -------------------");
  };

  this.finalize = function() {
    this.mediaListView = null;
    this.device = null;
  };

  //////////////////////////////////////////////////////////////////////////////
  // initialization
  this.device = aDevice;
  this.mediaListView = aMediaListView;

  if (!_device) {
    var error = "PushPlayqueue: you have to supply a valid sbISharingPushMediaRenderer as aDevice to the constructor";
    throw error;
  }

}


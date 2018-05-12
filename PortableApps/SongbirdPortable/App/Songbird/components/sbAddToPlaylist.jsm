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

Components.utils.import("resource://app/jsmodules/sbProperties.jsm");
Components.utils.import("resource://app/jsmodules/DropHelper.jsm");
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

const Ci = Components.interfaces;
const Cc = Components.classes;
const Cr = Components.results;

const ADDTOPLAYLIST_MENU_TYPE      = "submenu";
const ADDTOPLAYLIST_MENU_ID        = "library_cmd_addtoplaylist";
const ADDTOPLAYLIST_MENU_NAME      = "&command.addtoplaylist";
const ADDTOPLAYLIST_MENU_TOOLTIP   = "&command.tooltip.addtoplaylist";
const ADDTOPLAYLIST_MENU_KEY       = "&command.shortcut.key.addtoplaylist";
const ADDTOPLAYLIST_MENU_KEYCODE   = "&command.shortcut.keycode.addtoplaylist";
const ADDTOPLAYLIST_MENU_MODIFIERS = "&command.shortcut.modifiers.addtoplaylist";
const DOWNLOADTOPLAYLIST_MENU_NAME      = "&command.downloadtoplaylist";
const DOWNLOADTOPLAYLIST_MENU_TOOLTIP   = "&command.tooltip.downloadtoplaylist";
const DOWNLOADTOPLAYLIST_MENU_KEY       = "&command.shortcut.key.downloadtoplaylist";
const DOWNLOADTOPLAYLIST_MENU_KEYCODE   = "&command.shortcut.keycode.downloadtoplaylist";
const DOWNLOADTOPLAYLIST_MENU_MODIFIERS = "&command.shortcut.modifiers.downloadtoplaylist";


const ADDTOPLAYLIST_COMMAND_ID = "library_cmd_addtoplaylist:";
const ADDTOPLAYLIST_NEWPLAYLIST_COMMAND_ID = "library_cmd_addtoplaylist_createnew";

EXPORTED_SYMBOLS = [ "addToPlaylistHelper",
                     "SBPlaylistCommand_AddToPlaylist",
                     "SBPlaylistCommand_DownloadToPlaylist" ];

/**
 * \brief Creates a new unwrapper helper object which ensures
 *        downloadStatusTarget is always set when adding items
 *        to another library or playlist on a device.
 * \param aSelection An sbIMediaListViewSelection.selectedMediaItems enumerator
 * \return A new unwrapper helper object.
 */
function createUnwrapper(aSelection) {
  var unwrapper = Cc["@songbirdnest.com/Songbird/Library/EnumeratorWrapper;1"]
                    .createInstance(Ci.sbIMediaListEnumeratorWrapper);
  unwrapper.initialize(aSelection);

  return unwrapper;
}

// ----------------------------------------------------------------------------
// The "Add to playlist" dynamic command object
// ----------------------------------------------------------------------------
var SBPlaylistCommand_AddToPlaylist =
{
  m_Context: {
    m_Playlist: null,
    m_Window: null
  },

  m_addToPlaylist: null,

  m_root_commands :
  {
    m_Types: new Array
    (
      ADDTOPLAYLIST_MENU_TYPE
    ),

    m_Ids: new Array
    (
      ADDTOPLAYLIST_MENU_ID
    ),

    m_Names: new Array
    (
      ADDTOPLAYLIST_MENU_NAME
    ),

    m_Tooltips: new Array
    (
      ADDTOPLAYLIST_MENU_TOOLTIP
    ),

    m_Keys: new Array
    (
      ADDTOPLAYLIST_MENU_KEY
    ),

    m_Keycodes: new Array
    (
      ADDTOPLAYLIST_MENU_KEYCODE
    ),

    m_Enableds: new Array
    (
      true
    ),

    m_Modifiers: new Array
    (
      ADDTOPLAYLIST_MENU_MODIFIERS
    ),

    m_PlaylistCommands: new Array
    (
      null
    )
  },

  _getMenu: function(aSubMenu)
  {
    var cmds;

    cmds = this.m_addToPlaylist.handleGetMenu(aSubMenu);
    if (cmds) return cmds;

    switch (aSubMenu) {
      default:
        cmds = this.m_root_commands;
        break;
    }
    return cmds;
  },

  getVisible: function( aHost )
  {
    return true;
  },

  getNumCommands: function( aSubMenu, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    return cmds.m_Ids.length;
  },

  getCommandId: function( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_Ids.length ) return "";
    return cmds.m_Ids[ aIndex ];
  },

  getCommandType: function( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_Ids.length ) return "";
    return cmds.m_Types[ aIndex ];
  },

  getCommandText: function( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_Names.length ) return "";
    return cmds.m_Names[ aIndex ];
  },

  getCommandFlex: function( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( cmds.m_Types[ aIndex ] == "separator" ) return 1;
    return 0;
  },

  getCommandToolTipText: function( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_Tooltips.length ) return "";
    return cmds.m_Tooltips[ aIndex ];
  },

  getCommandValue: function( aSubMenu, aIndex, aHost )
  {
  },

  instantiateCustomCommand: function( aDocument, aId, aHost )
  {
    return null;
  },

  refreshCustomCommand: function( aElement, aId, aHost )
  {
  },

  getCommandVisible: function( aSubMenu, aIndex, aHost )
  {
    return true;
  },

  getCommandFlag: function( aSubmenu, aIndex, aHost )
  {
    return false;
  },

  getCommandChoiceItem: function( aChoiceMenu, aHost )
  {
    return "";
  },

  getCommandEnabled: function( aSubMenu, aIndex, aHost )
  {
    if (this.m_Context.m_Playlist.mediaListView.selection.count == 0)
      return false;
    var cmds = this._getMenu(aSubMenu);
    return (aIndex in cmds.m_Enableds) && cmds.m_Enableds[ aIndex ];
  },

  getCommandShortcutModifiers: function ( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_Modifiers.length ) return "";
    return cmds.m_Modifiers[ aIndex ];
  },

  getCommandShortcutKey: function ( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_Keys.length ) return "";
    return cmds.m_Keys[ aIndex ];
  },

  getCommandShortcutKeycode: function ( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_Keycodes.length ) return "";
    return cmds.m_Keycodes[ aIndex ];
  },

  getCommandShortcutLocal: function ( aSubMenu, aIndex, aHost )
  {
    return true;
  },

  getCommandSubObject: function ( aSubMenu, aIndex, aHost )
  {
    var cmds = this._getMenu(aSubMenu);
    if ( aIndex >= cmds.m_PlaylistCommands.length ) return null;
    return cmds.m_PlaylistCommands[ aIndex ];
  },

  onCommand: function( aSubMenu, aIndex, aHost, id, value )
  {
    if ( id )
    {
      // ADDTOPLAYLIST
      if (this.m_addToPlaylist.handleCommand(id)) return;

      // ...
    }
  },

  // The object registered with the sbIPlaylistCommandsManager interface acts
  // as a template for instances bound to specific playlist elements

  dupObject: function (obj) {
    var r = {};
    for ( var i in obj )
    {
      r[ i ] = obj[ i ];
    }
    return r;
  },

  duplicate: function()
  {
    var obj = this.dupObject(this);
    obj.m_Context = this.dupObject(this.m_Context);
    return obj;
  },

  initCommands: function(aHost) {
    if (!this.m_addToPlaylist) {
      this.m_addToPlaylist = new addToPlaylistHelper();
      this.m_addToPlaylist.init(this);
    }
  },

  shutdownCommands: function() {
    if (!this.m_addToPlaylist) {
      dump("this.m_addToPlaylist is null in SBPlaylistCommand_AddToPlaylist ?!!\n");
      return;
    }
    this.m_addToPlaylist.shutdown();
    this.m_addToPlaylist = null;
    this.m_Context = null;
  },

  setContext: function( context )
  {
    var playlist = context.playlist;
    var window = context.window;

    // Ah.  Sometimes, things are being secure.

    if ( playlist && playlist.wrappedJSObject )
      playlist = playlist.wrappedJSObject;

    if ( window && window.wrappedJSObject )
      window = window.wrappedJSObject;

    this.m_Context.m_Playlist = playlist;
    this.m_Context.m_Window = window;
  },

  QueryInterface : function(aIID)
  {
    if (!aIID.equals(Components.interfaces.sbIPlaylistCommands) &&
        !aIID.equals(Components.interfaces.nsISupportsWeakReference) &&
        !aIID.equals(Components.interfaces.nsISupports))
    {
      throw Components.results.NS_ERROR_NO_INTERFACE;
    }

    return this;
  }
}; // SBPlaylistCommand_AddToPlaylist declaration

// Same object, different display text.
var SBPlaylistCommand_DownloadToPlaylist = SBPlaylistCommand_AddToPlaylist.duplicate();
SBPlaylistCommand_DownloadToPlaylist.m_root_commands = {
  m_Types: new Array
  (
    ADDTOPLAYLIST_MENU_TYPE
  ),

  m_Ids: new Array
  (
    ADDTOPLAYLIST_MENU_ID
  ),

  m_Names: new Array
  (
    DOWNLOADTOPLAYLIST_MENU_NAME
  ),

  m_Tooltips: new Array
  (
    DOWNLOADTOPLAYLIST_MENU_TOOLTIP
  ),

  m_Keys: new Array
  (
    DOWNLOADTOPLAYLIST_MENU_KEY
  ),

  m_Keycodes: new Array
  (
    DOWNLOADTOPLAYLIST_MENU_KEYCODE
  ),

  m_Enableds: new Array
  (
    true
  ),

  m_Modifiers: new Array
  (
    DOWNLOADTOPLAYLIST_MENU_MODIFIERS
  ),

  m_PlaylistCommands: new Array
  (
    null
  )
};


function addToPlaylistHelper() {
}

addToPlaylistHelper.prototype.constructor = addToPlaylistHelper;

addToPlaylistHelper.prototype = {
  m_listofplaylists: null,
  m_commands: null,
  m_reglist: null,
  m_libraryManager: null,

  LOG: function(str) {
    var consoleService = Components.classes['@mozilla.org/consoleservice;1']
                            .getService(Components.interfaces.nsIConsoleService);
    consoleService.logStringMessage(str);
  },
  init: function(aCommands) {
    this.m_libraryManager = Components.classes["@songbirdnest.com/Songbird/library/Manager;1"]
                            .getService(Components.interfaces.sbILibraryManager);
    this.m_libraryManager.addListener(this);
    this.m_commands = aCommands;
    this.makeListOfPlaylists();
  },

  shutdown: function() {
    this.m_libraryManager.removeListener(this);
    this.removeLibraryListeners();
    this.m_libraryManager = null;
  },

  removeLibraryListeners: function() {
    if (this.m_reglist) {
      for (var i in this.m_reglist) {
        this.m_reglist[i].removeListener(this);
      }
    }
    this.m_reglist = new Array();
  },

  makeListOfPlaylists: function( ) {
    // remove previous listeners
    this.removeLibraryListeners();

    // todo: make this smarter :(
    var typearray = new Array('simple');

    this.m_listofplaylists = {};
    this.m_listofplaylists.m_Types = new Array();
    this.m_listofplaylists.m_Ids = new Array();
    this.m_listofplaylists.m_Names = new Array();
    this.m_listofplaylists.m_Tooltips = new Array();
    this.m_listofplaylists.m_Enableds = new Array();
    this.m_listofplaylists.m_Modifiers = new Array();
    this.m_listofplaylists.m_Keys = new Array();
    this.m_listofplaylists.m_Keycodes = new Array();
    this.m_listofplaylists.m_PlaylistCommands = new Array();

    var libs = this.m_libraryManager.getLibraries();
    while (libs.hasMoreElements()) {
      var library = libs.getNext().QueryInterface(
        Components.interfaces.sbILibrary);
      library.addListener(this, false);
      this.m_reglist.push(library);
      this.makePlaylistsForLibrary(library, typearray);
    }

    if (this.m_listofplaylists.m_Types.length == 0) {
      this.m_listofplaylists.m_Types.push("action");
      this.m_listofplaylists.m_Ids.push("noplaylist");
      this.m_listofplaylists.m_Names.push("&command.addtoplaylist.noexistingplaylist");
      this.m_listofplaylists.m_Tooltips.push("&command.tooltip.addtoplaylist.noexistingplaylist");
      this.m_listofplaylists.m_Enableds.push(false);
      this.m_listofplaylists.m_Modifiers.push("");
      this.m_listofplaylists.m_Keys.push("");
      this.m_listofplaylists.m_Keycodes.push("");
      this.m_listofplaylists.m_PlaylistCommands.push(null);
    }

    this.m_listofplaylists.m_Types.push("separator");
    this.m_listofplaylists.m_Ids.push("separator");
    this.m_listofplaylists.m_Names.push("separator");
    this.m_listofplaylists.m_Tooltips.push("separator");
    this.m_listofplaylists.m_Enableds.push(true);
    this.m_listofplaylists.m_Modifiers.push("");
    this.m_listofplaylists.m_Keys.push("");
    this.m_listofplaylists.m_Keycodes.push("");
    this.m_listofplaylists.m_PlaylistCommands.push(null);

    this.m_listofplaylists.m_Types.push("action");
    this.m_listofplaylists.m_Ids.push(ADDTOPLAYLIST_NEWPLAYLIST_COMMAND_ID);
    this.m_listofplaylists.m_Names.push("&command.addtoplaylist.createnew");
    this.m_listofplaylists.m_Tooltips.push("&command.addtoplaylist.createnew");
    this.m_listofplaylists.m_Enableds.push(true);
    this.m_listofplaylists.m_Modifiers.push("");
    this.m_listofplaylists.m_Keys.push("");
    this.m_listofplaylists.m_Keycodes.push("");
    this.m_listofplaylists.m_PlaylistCommands.push(null);
  },

  makePlaylistsForLibrary: function(aLibrary, typearray) {
    this._makingList = true;
    var listener = {
      obj: this,
      items: [],
      _downloadListGUID: null,
      onEnumerationBegin: function() {
        var ddh =
          Components.classes["@songbirdnest.com/Songbird/DownloadDeviceHelper;1"]
                    .getService(Components.interfaces.sbIDownloadDeviceHelper);
        var downloadMediaList = ddh.getDownloadMediaList();
        if (downloadMediaList)
          this._downloadListGUID = downloadMediaList.guid;

        this._libraryServicePane =
          Components.classes['@songbirdnest.com/servicepane/library;1']
          .getService(Components.interfaces.sbILibraryServicePaneService);
      },
      onEnumerationEnd: function() { },
      onEnumeratedItem: function(list, item) {
        var hidden = item.getProperty("http://songbirdnest.com/data/1.0#hidden");
        if (hidden == "1") {
          return Components.interfaces.sbIMediaListEnumerationListener.CONTINUE;
        }
        var goodtype = false;
        for (var i in typearray) {
          if (typearray[i] == item.type) {
            goodtype = true;
            break;
          }
        }
        if (!goodtype) {
          return Components.interfaces.sbIMediaListEnumerationListener.CONTINUE;
        }

        // XXXsteve Prevent the download playlist from appearing in the list.
        // this should be fixable once we close bug 4017 and have a way to
        // interrogate the policy on each playlist to see if it should be
        // put in this menu
        if (item.guid == this._downloadListGUID) {
          return Components.interfaces.sbIMediaListEnumerationListener.CONTINUE;
        }

        // XXXlone also prevent playlists that do not have a corresponding node in
        // the service pane from appearing (or those whose node, or parent nodes are
        // hidden). This filters out remote playlists, as well as 'utility' extension
        // playlists. This should be a fairly good test for discriminating which
        // playlists are useful as sento targets, since it mirror the user's ability
        // to drag and drop to them. Eventually this should be fixed by testing the
        // policy on the playlist once we close bug 4017.
        function isHidden(node) {
          while (node) {
            if (node.hidden) return true;
            node = node.parentNode;
          }
          return false;
        }
        var node = this._libraryServicePane.getNodeForLibraryResource(item);
        if (!node || isHidden(node)) {
          return Components.interfaces.sbIMediaListEnumerationListener.CONTINUE;
        }

        this.obj.m_listofplaylists.m_Types.push("action");
        this.obj.m_listofplaylists.m_Ids.push(ADDTOPLAYLIST_COMMAND_ID + item.library.guid + ";" + item.guid);
        this.obj.m_listofplaylists.m_Names.push(item.name ? item.name : "Unnamed Playlist");
        this.obj.m_listofplaylists.m_Tooltips.push(item.name ? item.name : "Unnamed Playlist");
        this.obj.m_listofplaylists.m_Enableds.push(item.userEditable);
        this.obj.m_listofplaylists.m_Modifiers.push("");
        this.obj.m_listofplaylists.m_Keys.push("");
        this.obj.m_listofplaylists.m_Keycodes.push("");
        this.obj.m_listofplaylists.m_PlaylistCommands.push(null);

        return Components.interfaces.sbIMediaListEnumerationListener.CONTINUE;
      }
    };

    try {

      // Enumerate all lists in this library
      aLibrary.enumerateItemsByProperty("http://songbirdnest.com/data/1.0#isList", "1",
                                        listener );
    } catch (e) {
      // this may happen if a playlist was leaked, and is still there
      // in the aether refreshing its commands, ignore failure, this list
      // will never show up anymore anyway
    }
    this._makingList = false;
  },

  handleGetMenu: function(aSubMenu) {
    if (this.m_listofplaylists == null) {
      // handleGetMenu called before makeListOfPlaylists, this would cause infinite recursion :
      // the command object would not find the menu either, would return null to getMenu which
      // corresponds to the root menu, and it'd recurse infinitly.
      throw Components.results.NS_ERROR_FAILURE;
    }
    if (aSubMenu == ADDTOPLAYLIST_MENU_ID) return this.m_listofplaylists;
    return null;
  },

  handleCommand: function(id) {
    try {
      var context = this.m_commands.m_Context;
      if (id == ADDTOPLAYLIST_NEWPLAYLIST_COMMAND_ID) {
        var newMediaList = context.m_Window.makeNewPlaylist("simple");
        this.addToPlaylist(newMediaList.library.guid, newMediaList.guid, context.m_Playlist);
        return true;
      }
      var addtoplstr = ADDTOPLAYLIST_COMMAND_ID;
      if ( id.slice(0, addtoplstr.length) == addtoplstr) {
        var r = id.slice(addtoplstr.length);
        var guids = r.split(';');
        if (guids.length >= 2) {
          var libraryguid = guids[0];
          var playlistguid = guids[1];

          this.addToPlaylist(libraryguid, playlistguid, context.m_Playlist);

          return true;
        }
      }
    } catch (e) {
      Components.utils.reportError(e);
    }
    return false;
  },

  addToPlaylist: function(libraryguid, playlistguid, sourceplaylist) {
    var library = this.m_libraryManager.getLibrary(libraryguid);
    var medialist;
    if (libraryguid == playlistguid)
      medialist = library;
    else
      medialist = library.getMediaItem(playlistguid);

    if (medialist) {

      var oldLength = medialist.length;
      var selection = sourceplaylist.mediaListView.selection.selectedIndexedMediaItems;

      // Create an enumerator that wraps the enumerator we were handed since
      // the enumerator we get hands back sbIIndexedMediaItem, not just plain
      // 'ol sbIMediaItems
      var unwrapper = createUnwrapper(selection);

      var asyncListener = {
        onProgress: function(aItemsProcessed, aComplete) {
          DNDUtils.reportAddedTracks(aItemsProcessed,
                                     0, /* no duplicate reporting */
                                     0, /* no unsupported reporting */
                                     medialist.name);
        },
        onItemAdded: function(aMediaItem) {},
        onComplete: function() {},
        QueryInterface: XPCOMUtils.generateQI([Ci.sbIMediaListAsyncListener])
      }

      medialist.addMediaItems(unwrapper, asyncListener, true);
    }
  },

  //-----------------------------------------------------------------------------
  _inbatch       : false,
  _deferredevent : false,
  _makingList    : false,

  refreshCommands: function() {

    // Bug fixers beware! This code gets called very frequently and can have
    // difficult-to-debug side effects. Proceed with caution.

    var self = this;
    function ensureRefreshExists() {
      // Explicitly return true or false. Otherwise, JS will complain to the
      // error console if any of the checks finds an undefined property.
      return (self.m_commands &&
              self.m_commands.m_Context &&
              self.m_commands.m_Context.m_Playlist &&
              self.m_commands.m_Context.m_Playlist.refreshCommands) ?
              true : false;
    }

    /* We need to ensure that the context and playlist have been initialized
     * and are ready to display commands before calling refreshCommands.
     *
     * It is possible for an event handler to fire before the binding
     * is created or after it is destroyed, so it is possible for this to
     * be triggered before m_Playlist is fully instantiated or after pieces
     * of it have gone away.  Thus, we need to also check that refreshCommands
     * is present to ensure the playlist binding is in a good state. */

    if (ensureRefreshExists()) {
      this.makeListOfPlaylists();
      // Check again, as the playlist binding can be destroyed during the
      // previous function call.
      if (ensureRefreshExists()) {
        this.m_commands.m_Context.m_Playlist.refreshCommands();
      }
    }
  },

  onUpdateEvent: function(item) {
    if (this._makingList) return;
    if (item instanceof Components.interfaces.sbIMediaList) {
      if (this._inbatch) {
        // if we are in a batch, remember that we saw a playlist event in it
        this._deferredevent = true;
      } else {
        // if we're not in a batch, proceed with refreshing the commands
        this.refreshCommands();
      }
    }
  },

  QueryInterface: function QueryInterface(iid) {
    if (!iid.equals(Components.interfaces.sbIMediaListListener) &&
        !iid.equals(Components.interfaces.sbILibraryManagerListener) &&
        !iid.equals(Components.interfaces.nsISupports))
      throw Components.results.NS_ERROR_NO_INTERFACE;
    return this;
  },

  onItemAdded: function onItemAdded(list, item, index) {
    // If we are in a batch, ignore future notifications
    if (!this._inbatch) {
      this.onUpdateEvent(item);
    }
    return true;
  },

  onBeforeItemRemoved: function onBeforeItemRemoved(list, item, index) {
    return true;
  },

  onAfterItemRemoved: function onAfterItemRemoved(list, item, index) {
    // If we are in a batch, ignore future notifications
    if (!this._inbatch) {
      this.onUpdateEvent(item);
    }
    return true;
  },

  onItemUpdated: function onItemUpdated(list, item, properties) {
    // If we are in a batch, ignore future notifications
    if (!this._inbatch) {
      this.onUpdateEvent(item);
    }
    return true;
  },

  onItemMoved: function onItemMoved(list, fromIndex, toIndex) {
    // XXXsteve Do we need to do anything here?
    return true;
  },

  onBeforeListCleared: function onBeforeListCleared(list, excludeLists) {
    return true;
  },

  onListCleared: function onListCleared(list, excludeLists) {
    // If we are in a batch, ignore future notifications
    if (!this._inbatch) {
      this.onUpdateEvent(list);
    }
    return true;
  },

  onBatchBegin: function onBatchBegin(list) {
    // start deferring the events
    this._inbatch = true;
    this._deferredevent = false;
  },

  onBatchEnd: function onBatchEnd(list) {
    // stop deferring the events
    this._inbatch = false;
    // if an event was deferred, handle it
    if (this._deferredevent) {
      // since we're no longer in a batch, this does call refreshCommands
      this.onUpdateEvent(list);
    }
    this._deferredevent = false;
  },

  onLibraryRegistered: function onLibraryRegistered(library) {
    this.onUpdateEvent(library);
  },

  onLibraryUnregistered: function onLibraryUnregistered(library) {
    this.onUpdateEvent(library);
  }

};

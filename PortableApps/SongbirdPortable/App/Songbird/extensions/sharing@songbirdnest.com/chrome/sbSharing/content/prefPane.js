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

if (typeof(Cc) === "undefined") {
  var Cc = Components.classes;
}
if (typeof(Ci) === "undefined") {
  var Ci = Components.interfaces;
}

if (typeof(sharingDMS) === "undefined") {
 var sharingDMS = {};
}

if (typeof(sharingDMS.prefs) === "undefined") {
 sharingDMS.prefs = {};
}
Cu.import("resource://app/jsmodules/StringUtils.jsm");

/**
 * @NOTE Image support:
 * The preference for the folder to stream images from
 * is empty by default which is ok since the folder watching
 * is also disabled by default.
 **/

// sharing prefs object
sharingDMS.prefs = (function (my) {

  // value of notification box
  const NOTIFICATION_VALUE    = "sharing-images-watch-folder-error";
  // ID of notification box
  const NOTIFICATIONBOX_ID    = "sharing-images-notification-box";
  // ID of the folder preference
  const PREFERENCE_FOLDER_ID  = "sharing-pref-dms-images-folderlocation";
  // ID of the <filefield>
  const FILEFIELD_ID          = "sharing-images-folderlocation-filefield";
  // ID of the <checkbox>
  const CHECHBOX_ID           = "sharing-images-folderlocation-checkbox";
  // ID of the browse <button>
  const BROWSEBUTTON_ID       = "sharing-images-folderlocation-chooseFolderButton";
  // ID of the stringbungle
  const STRINGBUNGLE_ID       = "sharing-dms-preferences";

  /**
   * PicsFolder class.
   **/
  function PicsFolder() {
    var _type = PicsFolder.FOLDERTYPE_NONE;
    var _error = PicsFolder.ERROR_NONE;
    var _folder = null;

    this.__defineGetter__("type", function() {
      return _type;
    });

    this.__defineGetter__("error", function() {
      return _error;
    });

    this.__defineGetter__("folder", function() {
      return _folder;
    });

    this.__defineGetter__("path", function() {
      return (_folder)
        ? _folder.path
        : "";
    });

    this.__defineGetter__("leafName", function() {
      return (_folder)
        ? _folder.leafName
        : "";
    });

    /**
     * expects aFolder to be a nsILocalFile
     **/
    this.__defineSetter__("folder", function(aFolder) {
      _folder = aFolder;
      _error = PicsFolder.ERROR_NONE;
      _type = PicsFolder.FOLDERTYPE_NONE;

      // have a folder at all?
      if (null == _folder) {
        _error = PicsFolder.ERROR_NO_FOLDER;
        return;
      }

      // default pics folder?
      var defaultPicsFolder = PicsFolder.getDefaultPicturesFolder();
      // defaultPicsFolder might be null, means OS does not have a
      // default pics folder. In this case the following comparision
      // falls through to FOLDERTYPE_CUSTOM.
      if (defaultPicsFolder && _folder.equals(defaultPicsFolder)) {
        _type = PicsFolder.FOLDERTYPE_DEFAULT;
        return;
      }

      // another folder, check if exists and is a directory
      _type = PicsFolder.FOLDERTYPE_CUSTOM;
      if (!_folder.exists()) {
        _error = PicsFolder.ERROR_FOLDER_MISSING;
        return;
      }
      if (!_folder.isDirectory()) {
        _error = PicsFolder.ERROR_NOT_A_FOLDER;
      }
    });

  }

  // foldertypes:
  PicsFolder.FOLDERTYPE_NONE    = 0;  // no folder
  PicsFolder.FOLDERTYPE_DEFAULT = 1;  // OS' default pictures folder
  PicsFolder.FOLDERTYPE_CUSTOM  = 2;  // user specified folder other than OS' default

  // errors
  PicsFolder.ERROR_NONE           = 0; // no error
  PicsFolder.ERROR_NO_FOLDER      = 1; // the folder is null
  PicsFolder.ERROR_FOLDER_MISSING = 2; // the folder specified could not be found
  PicsFolder.ERROR_NOT_A_FOLDER   = 3; // the folder is not a folder (is a file)

  /**
   * Return the OS' default pictures folder if any.
   * If OS does not provide a default folder
   * return null.
   **/
  PicsFolder.getDefaultPicturesFolder = function() {
    var fileLocator = Cc["@mozilla.org/file/directory_service;1"]
                        .getService(Ci.nsIProperties);
    try {
      var picturesDir = fileLocator.get("Pics", Ci.nsILocalFile);
      if (!picturesDir) {
        return null;
      }
      // check if file exists and is a directory
      return (picturesDir.exists() && picturesDir.isDirectory())
        ? picturesDir
        : null;
    }
    catch(e) {
      // This happens when "Pics" is not known by the directory service.
    }
    return null;
  };

  var _currentPicsFolder = new PicsFolder();

  /**
   * Returns currently selected folder
   *
   * If a folder is set in the preferences
   * return that folder.
   *
   * If no folder is set in the preferences
   * return OS' default folder.
   **/
  function _getCurrentPicturesFolder() {
    var picturesDirPref = document.getElementById(PREFERENCE_FOLDER_ID);
    return (picturesDirPref.value)
      ? picturesDirPref.value
      : PicsFolder.getDefaultPicturesFolder();
  }

  /**
   * Format error message depending on aFolder.error.
   *
   * Uses the default Songbird error messages from
   * locales/locale/??/songbird/songbird.properties
   **/
  function _formatErrorMessage(aFolder)
  {
    switch(aFolder.error)
    {
      case PicsFolder.ERROR_FOLDER_MISSING:
        return SBFormattedString("prefs.watch_folder.error.not_exist", [aFolder.path]);
      case PicsFolder.ERROR_NOT_A_FOLDER:
        return SBFormattedString("prefs.watch_folder.error.not_directory", [aFolder.path]);
      default:
        // no special handling: ERROR_NO_FOLDER, ERROR_NONE
        break;
    }
    return "";
  }

  /**
   * Clears error notification box
   **/
  function _removeErrorNotifications()
  {
    var oldNotif, notifBox = document.getElementById(NOTIFICATIONBOX_ID);

    while ((oldNotif = notifBox.getNotificationWithValue(NOTIFICATION_VALUE))) {
      notifBox.removeNotification(oldNotif);
    }
  }

  /**
   * Shows error notification box
   **/
  function _showErrorNotification(aMsg)
  {
    var notifBox = document.getElementById(NOTIFICATIONBOX_ID);

    // show the notification, hiding any other ones of this class
    _removeErrorNotifications();
    notifBox.appendNotification(aMsg, NOTIFICATION_VALUE, null,
                                notifBox.PRIORITY_CRITICAL_LOW, []);
  }

  /**
   * Set the label and icon of the <filefield>
   * depending on folder type and error.
   *
   * If _currentPicsFolder is FOLDERTYPE_DEFAULT set the label to
   * the leaf name ("Pictures").
   *
   * If _currentPicsFolder is FOLDERTYPE_CUSTOM set the label to
   * the full path.
   *
   * If _currentPicsFolder has an error show notification with error.
   **/
  function _updateUI() {
    var folderLocation = document.getElementById(FILEFIELD_ID);

    // enable / disable inputs
    var picturesEnabledCheckboxChecked = document.getElementById(CHECHBOX_ID).checked;
    document.getElementById(FILEFIELD_ID).disabled = !picturesEnabledCheckboxChecked;
    document.getElementById(BROWSEBUTTON_ID).disabled = !picturesEnabledCheckboxChecked;

    // cleanup any older error notifications
    _removeErrorNotifications();

    // if there is an error show notification
    if (PicsFolder.ERROR_NONE != _currentPicsFolder.error) {
      var msg = _formatErrorMessage(_currentPicsFolder);
      if (msg) {
        _showErrorNotification(msg);
      }
      folderLocation.label = _currentPicsFolder.path;
      folderLocation.image = "";
      return;
    }

    // otherwise show nice label and icon
    var label = "";
    switch(_currentPicsFolder.type) {
      case PicsFolder.FOLDERTYPE_DEFAULT:
        // use leafname
        label = _currentPicsFolder.leafName;
        break;
      case PicsFolder.FOLDERTYPE_CUSTOM:
        // use full path
        label = _currentPicsFolder.path;
        break;
      default:
        break;
    }
    folderLocation.label = label;

    // the icon
    var ios = Cc["@mozilla.org/network/io-service;1"]
                .getService(Ci.nsIIOService);
    var fph = ios.getProtocolHandler("file")
                .QueryInterface(Ci.nsIFileProtocolHandler);

    folderLocation.image = "moz-icon://" + fph.getURLSpecFromFile(_currentPicsFolder.folder) + "?size=16";
  }

  /**
   * command handler for picking a folder
   **/
  my.chooseImageFolder = function() {
    // init the folder picker
    var fp = Cc["@mozilla.org/filepicker;1"]
                .createInstance(Ci.nsIFilePicker);
    var sharingStrings = document.getElementById(STRINGBUNGLE_ID);
    var title = sharingStrings.getString("sharing.folder.choose.title");

    fp.init(window, title, Ci.nsIFilePicker.modeGetFolder);
    fp.appendFilters(Ci.nsIFilePicker.filterAll);

    var picturesDir = _getCurrentPicturesFolder();

    // First try to open what's currently configured
    if (picturesDir && picturesDir.exists()) {
      fp.displayDirectory = picturesDir;
    }
    else {
      var fileLoc = Cc["@mozilla.org/file/directory_service;1"]
                      .getService(Ci.nsIProperties);
      fp.displayDirectory = fileLoc.get("Desk", Ci.nsILocalFile);
    }

    if (fp.show() == Ci.nsIFilePicker.returnOK) {
      _currentPicsFolder.folder = fp.file.QueryInterface(Ci.nsILocalFile);
      _updateUI();

      if (PicsFolder.ERROR_NONE != _currentPicsFolder.error) {
        return;
      }

      // no error, so update the pref
      var picturesDirPref = document.getElementById(PREFERENCE_FOLDER_ID);
      picturesDirPref.value = _currentPicsFolder.folder;
    }
  };

  my.onToggleFolderWatching = function(evnt) {
    // Update the folder pref also. By default it is empty, but we always
    // want to have a value there.
    // The folder watching is off by default, so starting with an empty
    // value is ok, but as soon as the prefs window is used the first
    // time we like to have a value.
    var picturesDirPref = document.getElementById(PREFERENCE_FOLDER_ID);
    picturesDirPref.value = _currentPicsFolder.folder;
    _updateUI();
    return true;
  };


  /**
   * onsyncfrompreference
   **/
  my.syncFromPref = function() {
    // set selected folder
    _currentPicsFolder.folder = _getCurrentPicturesFolder();
    _updateUI();
    return undefined;
  };

  return my;
})(sharingDMS.prefs);


/*
 *
 *=BEGIN SONGBIRD LICENSE
 *
 * Copyright(c) 2005-2011 POTI, Inc.
 * http://www.songbirdnest.com
 *
 * For information about the licensing and copyright of this Add-On please
 * contact POTI, Inc. at customer@songbirdnest.com.
 *
 *=END SONGBIRD LICENSE
 *
 */


if (typeof(Cc) === "undefined") {
  var Cc = Components.classes;
}
if (typeof(Cu) === "undefined") {
  var Cu = Components.utils;
}
if (typeof(Ci) === "undefined") {
  var Ci = Components.interfaces;
}


if (typeof sharingDMS === "undefined") {
  var sharingDMS = {};
}


// Sharing add-on JS namespace
sharingDMS = (function (my) {

  my.options = {
    openPreferences: function() {
      var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"].
                          getService(Ci.nsIWindowMediator);
      var window = windowMediator.getMostRecentWindow("Songbird:Main");
      window.SBOpenPreferences("sharingPrefsPanel");
      // Hide the popup panel. Otherwise it keeps the mouse capture
      // and behaves like it would be on top of the prefs window.
      var controlPanel = document.getElementById("sharing-control-panel");
      if (controlPanel) {
        controlPanel.hidePopup();
      }
      // when called from DMS popup control panel, prefs window does not get focus
      // calling focus() on the prefwindow does not work, the following blur does
      window.blur();
    }
  };

  return my;

})(sharingDMS);


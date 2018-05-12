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

if (typeof sharingDMS === "undefined") {
  var sharingDMS = {};
}
if (typeof sharingDMS.iconPopup === "undefined") {
  sharingDMS.iconPopup = {};
}

// Sharing add-on JS namespace
sharingDMS.iconPopup = (function (my) {

  var _buttonOn = null;
  var _buttonOff = null;
  var _stateOn = false; // initial value
  
  function switchButtonGroupState() {
    // Active state is checked but disabled
    // Inactive state is unchecked and enabled
    _buttonOn.checked = _stateOn;
    _buttonOn.disabled = _stateOn;
    _buttonOff.checked = !_stateOn;
    _buttonOff.disabled = !_stateOn;  
  }
  
  function switchToDisabledState() {
    // both buttons unchecked and disabled
    _buttonOn.disabled = true;
    _buttonOn.checked = false;
    _buttonOff.disabled = true;  
    _buttonOff.checked = false;
  }
    
  my.Observer = function() {  
    _buttonOn = document.getElementById("sharing-control-on");    
    _buttonOff = document.getElementById("sharing-control-off");
      var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                              .getService(Components.interfaces.nsIPrefBranch);
    _stateOn = prefManager.getBoolPref("extensions.sharing.dms.enabled");
    switchButtonGroupState(); // initial setting
  };
  
  my.Observer.prototype = {
    /**
     * Called when the sharing service status changes.
     */
    observe: function(subject, topic, data) {
      var msg = JSON.parse(data);      
      switch(msg.state) {
        case "on":
          _stateOn = true;
          switchButtonGroupState();
          break;
        case "off":
          _stateOn = false;
          switchButtonGroupState();
          break;
        default:
          // not necessary to handle busy/endbusy and error states
          // because popup accessibility for on-off transition is independent
          break;
      }
    },

    destroy: function() {
      var os = Cc["@mozilla.org/observer-service;1"].getService(
        Ci.nsIObserverService);
      os.removeObserver(this, SB_SHARING_SERVICE_STATUS_CHANGED);

    },
    
    startObserving: function() {
      var os = Cc["@mozilla.org/observer-service;1"].getService(
        Ci.nsIObserverService);
      os.addObserver(this, SB_SHARING_SERVICE_STATUS_CHANGED, false);
    }
  };
  
  my.controller = {
    /**
     * command handlers for server icon popup window
     */  
    onCommandOn: function() {
      if( _buttonOn.disabled ) {
        return;  // prevent handling disabled button
      }
      // disable transitions until confirmed via observer state change
      switchToDisabledState();
      var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                              .getService(Components.interfaces.nsIPrefBranch);
      prefManager.setBoolPref("extensions.sharing.dms.enabled",true);
    },
    onCommandOff: function() {
      if( _buttonOff.disabled ) {
        return;  // prevent handling disabled button
      }
      // disable transitions until confirmed via observer state change
      switchToDisabledState();
      var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                              .getService(Components.interfaces.nsIPrefBranch);
      prefManager.setBoolPref("extensions.sharing.dms.enabled",false);
    }
  };
  return my;
  
})(sharingDMS.iconPopup);

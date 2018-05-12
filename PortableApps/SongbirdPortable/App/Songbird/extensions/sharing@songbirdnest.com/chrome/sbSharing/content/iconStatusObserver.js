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

if (typeof(Cc) == "undefined")
  var Cc = Components.classes;
if (typeof(Ci) == "undefined")
  var Ci = Components.interfaces;
if (typeof(Cr) == "undefined")
  var Cr = Components.results;
if (typeof(Cu) == "undefined")
  var Cu = Components.utils;


var SB_SHARING_SERVICE_STATUS_CHANGED = "songbird-sharing-service-status-changed";

if (typeof sharingDMS === "undefined") {
  var sharingDMS = {};
}
if (typeof sharingDMS.icon === "undefined") {
  sharingDMS.icon = {};
}


// Sharing add-on JS namespace
sharingDMS.icon = (function (my) {

  function log(msg) {
    dump("SHARING DMS LOG: " + msg + "\n");
  }

  /**
   * Sends a global SB_SHARING_SERVICE_STATUS_CHANGED notification.
   * Used to invoke the "enderror" notification (we have to invoke it
   * from the JS GUI code as it is caused by user dismissing the error).
   */
  function sendNotification(msg) {
    var observerService = Cc["@mozilla.org/observer-service;1"].getService(
      Ci.nsIObserverService);
    observerService.notifyObservers(null, SB_SHARING_SERVICE_STATUS_CHANGED, msg);
  }

  /**
   * A base class for our GUI Finite State Machines. Knows how to call
   * the event handler for any event received (event is ignored by the
   * FSM if it does not implement the requested handler).
   */
  var genericFSM = {
    /**
     * Dispatches the state change event to the FSM
     * handler ("lexical dispatch").
     */
    receiveEvent: function(event) {
      var handler = this["handle_" + event.state.toLowerCase()];
      if (typeof handler === "undefined") {
        return;
      } else {
        handler.call(this, event);
      }
    },

    updateGUI: function(event) {
      throw "genericFSM -> 'updateGUI' method must be implemented " +
        "in the derived class";
    }
  };


  /**
   * FSM for handling the error state.
   */
  function ErrorFSM() {
    this._pendingErrors = [];
    this._isErrorActive = false;
    this._iconErrorListener = null;
    this._errorStrings = document.getElementById("sharing-strings");


    this.handle_error = function(event) {
      if (this._isErrorActive) {
        // Error is active. I must cache all the following incoming errors
        // until user dismisses the current error.
        this._pendingErrors.push(event);
      } else {
        this._isErrorActive = true;
      }
    };


    this.handle_enderror = function() {
      this._isErrorActive = false;
      if (this._pendingErrors.length > 0) {
        // We have some errors to invoke.
        var jsonErrorEvent = this._pendingErrors.shift();
        log("ErrorFSM -> handle_enderror -> invoking pending error: " + JSON.stringify(jsonErrorEvent));
        my.statusObserver.observe(
          null, SB_SHARING_SERVICE_STATUS_CHANGED,
          JSON.stringify(jsonErrorEvent));
      }
    };


    this.updateGUI = function(event) {
      if ( ! this._isErrorActive) {
        // There's no error to display. Return false to let the updateGUI event propagate.
        return false;
      }

      if (this._pendingErrors.length > 0) {
         // Ignore update GUI request when we have pending errors. We're displaying
         // an error already, so return true to prevent the request from propagating.
        return true;
      }

      if (event.state !== "error") {
        // Prevent all FSMs with less priority from updating the GUI (because
        // an error is currently displayed).
        return true;
      }

      // Set the error icon.
      var icon = document.getElementById("sharing_statusIcon");
      var path = "chrome://sharing/skin/images/";
      icon.setAttribute("src", path + "DLNA_error_16x16.png");

      // Set up the icon click listener.
      var self = this;
      this._iconErrorListener = function() {
        icon.removeEventListener("click", arguments.callee, false);
        self._iconErrorListener = null;
        sendNotification('{"state": "enderror"}');
      };
      icon.addEventListener("click", this._iconErrorListener, false);

      this._showNotification(event);

      // Return true to stop updateGUI propagation.
      return true;
    };


    /**
     * Displays the songbird notification at the top of the browser window.
     * The code is a bit ugly at the top, because we're localizing the
     * descriptions.
     */
    this._showNotification = function(msg) {
      // Set the details popup contents (i.e., recommended user action).
      var descrText = "";
      if (msg.errorUserActionResString) {
        try {
          descrText = this._errorStrings.getString(msg.errorUserActionResString);
        } catch (e) {
          log("Sharing add-on -> StatusObserver -> unknown error user action " +
            "resource string: '" + msg.errorUserActionResString + "'. Did you " +
            "forget to add it to locale?");
          descrText = this._errorStrings.getString("userAction.generic");
        }
      }

      // Set the notification label (error "name")
      var notifLabel;
      try {
        notifLabel = this._errorStrings.getString(msg.errorDescriptionResString);
      } catch (e) {
        log("Sharing add-on -> StatusObserver -> unknown error description " +
          "resource string: '" + msg.errorDescriptionResString + "'. Did you " +
          "forget to add it to locale?");
        notifLabel = this._errorStrings.getString("description.generic");
      }

      // Do the other stuff that you do when you want to show a notification.
      var browser = gBrowser.selectedBrowser;
      var notificationBox = browser.parentNode;
      var priority = notificationBox.PRIORITY_WARNING_HIGH;

      // create final message to show
      var msgToShow = notifLabel;
      if (descrText) {
        msgToShow += " " + descrText;
      }

      var buttons = [];

      // Show the notification (ugh, finally!).
      var notif = notificationBox.appendNotification(
        msgToShow, "sharing addon notification",
        "chrome://sharing/skin/images/DLNA_error_16x16.png",
        priority, buttons);

      // Create a special "notification closed" event (so that we can catch
      // it and react when the notification closes).
      var evt = document.createEvent('Event');
      evt.initEvent('sharingErrorNotificationClosed', true, true);
      notif.closeEvent = evt;

      var self = this;
      notif.addEventListener("sharingErrorNotificationClosed", function() {
        // Do the same things as if the user clicked the error icon.
        if (self._iconErrorListener) {
          self._iconErrorListener();
        }
        notif.removeListener(
          "sharingErrorNotificationClosed", arguments.callee, false);
        return true;
      }, false);
    };
  }
  ErrorFSM.prototype = genericFSM;


  /**
   * FSM for handling the busy state.
   */
  function BusyFSM() {
    this._isBusy = false;

    this.handle_busy = function() {
      this._isBusy = true;
    };

    this.handle_endbusy = function() {
      this._isBusy = false;
    };

    this.updateGUI = function(event) {
      if (this._isBusy) {
        var icon = document.getElementById("sharing_statusIcon");
        icon.setAttribute(
          "src", "chrome://songbird/skin/service-pane/icon-busy.png");
        return true;
      } else {
        // Let the update GUI request propagate (we're don't want to handle it).
        return false;
      }
    };
  }
  BusyFSM.prototype = genericFSM;

  /**
   * FSM for handling the server on/off state.
   */
  function ServerFSM() {
    this.iconFilename = "DLNA_off_16x16.png";

    this.handle_on = function() {
      this.iconFilename = "DLNA_on_16x16.png";
    };

    this.handle_off = function() {
      this.iconFilename = "DLNA_off_16x16.png";
    };

    this.updateGUI = function(event) {
      var icon = document.getElementById("sharing_statusIcon");
      var path = "chrome://sharing/skin/images/";
      icon.setAttribute("src", path + this.iconFilename);
      return true;
    };
  }
  ServerFSM.prototype = genericFSM;


  /**
   * Listens for DMS status change notifications.
   *
   * In case there is an error, shows a dismissible notifications and an
   * error icon in the status bar. Until the error is dismissed, all
   * following status changes are observed (and handled by the respective FSM),
   * but not reflected in the UI.
   *
   * SB_SHARING_SERVICE_STATUS_CHANGED message format:
   *
   * {
   *   "state": text,
   *   "errorDescriptionResString": text,
   *   "errorUserActionResString": text
   * }
   *
   * where errorDescription and errorUserAction are only required for error states
   * (and they default to very generic and vague messages).
   *
   * Recognized messages:
   *   "on": shows 'active' icon
   *   "off": shows 'inactive' icon
   *   "busy": shows a spinning icon
   *   "endbusy": returns to the last observed on/off state.
   *   "error": shows an error icon and a notification bar.
   *   "enderror": dismisses the error
   *
   * Background info:
   *   We use three FSMs to handle the state, in this order:
   *     ErrorFSM, BusyFSM, ServerFSM.
   *   Every time we receive a status changed event, we:
   *    1) notify all the FSMs (and they refelect it in their internal states
   *       or ignore the event if they're not interested in it).
   *    2) send a "updateGUI" request to all the FSMs propagating from the top one
   *       to the bottom one (ErrorFSM -> BusyFSM -> ServerFSM). If any of the
   *       FSMs handles the updateGUI event, it cancels the propagation (so if we
   *       update GUI in the error FSM, we don't propagate the event down to the
   *       other FSMs).
   *
   */

  my.statusObserver = {
    _FSMStack: null,

    observe: function(subject, topic, data) {
      log("Sharing add-on -> StatusObserver -> observed: " + data + "\n");

      var msg = JSON.parse(data);

      var fsm, i;
      for (i = 0; i < this._FSMStack.length; ++i) {
        fsm = this._FSMStack[i];
        fsm.receiveEvent(msg);
      }
      for (i = 0; i < this._FSMStack.length; ++i) {
        fsm = this._FSMStack[i];
        var shouldStopDrawEventPropagation = fsm.updateGUI(msg);
        if (shouldStopDrawEventPropagation) {
          break;
        }
      }

      // push controller: show sidebar when sharing is started
      if ("on" == msg.state) {
        var displayPaneManager = Cc["@songbirdnest.com/Songbird/DisplayPane/Manager;1"]
                                 .getService(Ci.sbIDisplayPaneManager);
        displayPaneManager.showPane("chrome://songbird/content/xul/playQueue.xul");
      }

    },


    destroy: function() {
      var os = Cc["@mozilla.org/observer-service;1"].getService(
        Ci.nsIObserverService);
      os.removeObserver(this, SB_SHARING_SERVICE_STATUS_CHANGED);
    },


    startObserving: function() {
      this._FSMStack = [
        new ErrorFSM(),
        new BusyFSM(),
        new ServerFSM()
      ];

      var os = Cc["@mozilla.org/observer-service;1"].getService(
        Ci.nsIObserverService);
      os.addObserver(this, SB_SHARING_SERVICE_STATUS_CHANGED, false);
    },

  };

  return my;

})(sharingDMS.icon);


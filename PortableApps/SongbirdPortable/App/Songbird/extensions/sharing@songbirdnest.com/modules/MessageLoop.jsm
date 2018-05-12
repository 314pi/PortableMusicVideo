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

 var EXPORTED_SYMBOLS = [ "MessageLoop" ];

/**
 * MessageLoop
 *
 * A message loop that takes messages and send them synchronously or
 * asynchronously to subscribers.
 * -----------------------------------------------------------------------------
 * Public methods:
 *  sendMessage(sender, msgName, msgData):
 *    Sends a message synchronously.
 *    @params: sender:  Sender of the message. Can be used by receivers
 *                      to check if they should react on the message.
 *             msgName: The message name (or ID) used to identify the message.
 *             msgData: Data for the message. Can be anything.
 *    @return: The message created and sent.
 *
 *  postMessage(sender, msgName, msgData):
 *    Sends a message asynchronously. Params are the same like in sendMessage.
 *
 *  subscribe(receiver):
 *    Subscribe a receiver to the message loop.
 *    To identify a certain receiver the message loop adds a property to the
 *    receiver, so the receiver has to be an expando object.
 *
 *  unsubscribe(receiver):
 *    Unsubscribe a receiver previously added with subscribe. Uses the added
 *    property to identify the receiver.
 *
 *  reset():
 *    Clears all properties of the MessageLoop (receivers, queue etc). After
 *    this call the MessageLoop is in the state of a newly created object.
 * -----------------------------------------------------------------------------
 * Objects:
 *  _Message:
 *    Implements a message.
 *    Properties:
 *      name      string  readonly  The name of the message as given in msgName
 *                                  for sendMessage(..) or postMessage(..).
 *      data      any     readonly  Data for the message.
 *      sender    any     readonly  The sender of the message.
 *      canceled  boolean readonly  Was the message canceled? Can be set via
 *                                  cancel().
 *                                  When a message is canceled no further
 *                                  processing happens - all later receivers
 *                                  will NOT get notified anymore.
 *      result    any               Free variable that can be used to pass
 *                                  results between receivers or to the caller
 *                                  in case of synchronous call.
 */

Components.utils.import("resource://app/jsmodules/DebugUtils.jsm");

var _LOCALLOG = DebugUtils.generateLogFunction("PushMessageLoop", 5);
var _LOG = _LOCALLOG;

function MessageLoop(_window) {

  // the message queue
  var _msgQueue = [];
  // the list of receivers
  var _msgReceivers = {};
  // next ID for a receiver
  var _nextID = 1;
  // timer for asynchronous messages
  var _timer = null;
  // the name of the ID attribute attached to receivers
  var _rcvrIdAtr = "__msgRcvID" + Date.now();

  var _this = this;

  // a message
  function _Message(_sender, _name, _data) {
    // _sender;
    // _name;
    // _data;
    var _canceled = false;
    this.result = {};

    this.__defineGetter__("name", function() {
      return _name;
    });

    this.__defineGetter__("data", function() {
      return _data;
    });

    this.__defineGetter__("sender", function() {
      return _sender;
    });

    this.__defineGetter__("canceled", function() {
      return _canceled;
    });

    this.cancel = function() {
      _canceled = true;
    };

  };

  function new_Message(sender, msgName, msgData) {
    msgName = "" + msgName;
    if (!msgName) {
      return null;
    }
    msgData = msgData || null;
    return new _Message(sender, msgName, msgData);
  }

  function _processMessage(msg) {
    var methodName = "on_" + msg.name;
    for(var i in _msgReceivers) {
      var receiver = _msgReceivers[i];
      if (receiver[methodName]) {
        try {
          receiver[methodName](msg);
          if (msg.canceled) {
            break;
          }
        }
        catch(e) {
          _LOG("ERROR sending message [" + msg.name +
               "] to reciever [" + i + "]: " + e.toString());
        }
      }
    }
  }

  function _runLoop() {
    while(_msgQueue.length) {
      var msg = _msgQueue.shift();
      _processMessage(msg);
    }
  }

  this.__defineSetter__("_LOG", function(aLog) {
    _LOG = aLog || _LOCALLOG;
  });

  this.sendMessage = function(sender, msgName, msgData) {
    var msg = new_Message(sender, msgName, msgData);
    if (!msg) {
      return null;
    }
    _processMessage(msg);
    return msg;
  };

  this.postMessage = function(sender, msgName, msgData) {
    var msg = new_Message(sender, msgName, msgData);
    if (!msg) {
      return false;
    }
    _msgQueue.push(msg);
    if (!_timer) {
      _timer = _window.setTimeout(function() {
        _timer = null;_runLoop.call(_this);
      }, 1);
    }
    return true;
  };

  this.subscribe = function(receiver) {
    if (receiver[_rcvrIdAtr]) {
      return false;
    }
    receiver[_rcvrIdAtr] = _nextID;
    if (!receiver[_rcvrIdAtr]) {
      return false;
    }
    _msgReceivers[_nextID] = receiver;
    _nextID++;
    return true;
  };

  this.unsubscribe = function(receiver) {
    if (!receiver[_rcvrIdAtr]) {
      return false;
    }
    if (!_msgReceivers[receiver[_rcvrIdAtr]]) {
      return false;
    }
    delete _msgReceivers[receiver[_rcvrIdAtr]];
    return true;
  };

  this.reset = function() {
    _window.clearTimeout(_timer);
    _msgQueue = [];
    _msgReceivers = {};
    _nextID = 1;
    _timer = null;
    _rcvrIdAtr = "__msgRcvID" + Date.now();
  };
}


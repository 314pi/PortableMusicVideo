/*
 *=BEGIN SONGBIRD GPL
 *
 * This file is part of the Songbird web player.
 *
 * Copyright(c) 2005-2009 POTI, Inc.
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

/**
 * \file sbDataRemote.js
 * \brief Implementation of the interface sbIDataRemote
 * This implementation of sbIDataRemote uses the mozilla pref system as a
 *   backend for storing key-value pairs.
 * \sa sbIDataRemote.idl  sbIDataRemote.js
 */

// Enable this to log number of active dataremotes for each key
var DEBUG_DATAREMOTES = false;

var Cr = Components.results;
var Ci = Components.interfaces;
var Cc = Components.classes;

// This object should not be instantiated by user code.  Instead, use 
// the original contract id "@songbirdnest.com/Songbird/DataRemote;1"
// which will give a wrapper around this object.  See sbPIDataRemote2
// and sbDataRemoteWrapper for details.
const SONGBIRD_DATAREMOTE_CONTRACTID = null;
const SONGBIRD_DATAREMOTE_CLASSNAME = "Songbird Data Remote Instance";
const SONGBIRD_DATAREMOTE_CID = Components.ID("{e0990420-e9c0-11dd-ba2f-0800200c9a66}");
const SONGBIRD_DATAREMOTE_IID = Ci.sbPIDataRemote2;

function DataRemote() {
  // Nothing here...
}

// Define the prototype block before adding to the prototype object or the
//   additions will get blown away (at least the setters/getters were).
DataRemote.prototype = {
  _initialized: false,     // has init been called
  _observing: false,       // are we hooked up to the pref branch as a listener
  _prefBranch: null,       // the pref branch associated with the root
  _root: null,             // the root used to retrieve the pref branch
  _key: null,              // the section of the branch we care about ("Domain")
  _boundObserver: null,    // the object observing the change
  _boundElement: null,     // the element containing the linked prop/attr.
  _boundProperty: null,    // the property linked to the data (of boundElement)
  _boundAttribute: null,   // the attribute linked to the data (of boundElement)
  _isBool: false,          // Is the data a yes/no true/false chunk of data?
  _isNot: false,           // Is the linked data state opposite of target data?
  _evalString: "",         // a string of js to evaluate when the data changes

  init: function(aKey, aRoot) {
    // Only allow initialization once per object
    if (this._initialized)
      throw Cr.NS_ERROR_UNEXPECTED;
      
    // Set the strings
    if (!aRoot) {
      // The prefapi hashes fully qualified prefs, so using a simple root does not
      //   hurt us. Callbacks are in a (BIG) linked-list (ew), which sucks. Having
      //   a shorter root saves some strncmp() time.
      this._root = "songbird.";
      this._key = aKey;
    } else {
      // If a root is specified use that.
      this._root = aRoot;
      this._key = aKey;
    }

    // get the prefbranch for our root from the pref service
    var prefsService = Cc["@mozilla.org/preferences-service;1"]
                       .getService(Ci.nsIPrefService);
    this._prefBranch = prefsService.getBranch(this._root)
                  .QueryInterface(Ci.nsIPrefBranch2);
    if (!this._prefBranch)
      throw Cr.NS_ERROR_FAILURE;

    this._initialized = true;
  },

  // only needs to be called if we have bound an attribute, property or observer
  unbind: function() {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;
    if (this._prefBranch && this._observing)
      this._prefBranch.removeObserver( this._key, this );

    // clear the decks
    this._observing = false;
    this._boundObserver = null;
    this._boundAttribute = null;
    this._boundProperty = null;
    this._boundElement = null;
  },
      
  bindObserver: function(aObserver, aSuppressFirst) {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    // Clear and reinsert ourselves as an observer.
    if ( this._observing )
      this._prefBranch.removeObserver(this._key, this);

    this._prefBranch.addObserver(this._key, this, true);
    this._observing = true;

    // Now we are linked to an nsIObserver object
    this._boundObserver = aObserver;
    this._boundElement = null;
    this._boundProperty = null;
    this._boundAttribute = null;
    this._isBool = false;
    this._isNot = false;
    this._evalString = "";
    
    // If the caller wants to be notified, fire on attachment
    if (!aSuppressFirst)
      this.observe(null, null, this._key);
  },
  
  bindRemoteObserver: function(aRemoteObserver, aSuppressFirst) {
    this.bindObserver(aRemoteObserver, aSuppressFirst);
  },
     
  bindProperty: function(aElement, aProperty, aIsBool, aIsNot, aEvalString) {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    if (!aIsBool)
      aIsBool = false;
    if (!aIsNot)
      aIsNot = false;
    if (!aEvalString)
      aEvalString = "";

    // Clear and reinsert ourselves as an observer.
    if ( this._observing )
      this._prefBranch.removeObserver(this._key, this);

    this._prefBranch.addObserver(this._key, this, true);
    this._observing = true;

    // Now we are linked to property on an element
    this._boundObserver = null;
    this._boundElement = aElement;
    this._boundProperty = aProperty;
    this._boundAttribute = null;
    this._isBool = aIsBool;
    this._isNot = aIsNot;
    this._evalString = aEvalString;
    
    // Set the value once
    this.observe(null, null, this._key);
  },
        
  bindAttribute: function(aElement, aAttribute, aIsBool, aIsNot, aEvalString) {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    if (!aIsBool)
      aIsBool = false;
    if (!aIsNot)
      aIsNot = false;
    if (!aEvalString)
      aEvalString = "";

    // Clear and reinsert ourselves as an observer.
    if ( this._observing )
      this._prefBranch.removeObserver(this._key, this);

    this._prefBranch.addObserver(this._key, this, true);
    this._observing = true;

    // Now we are linked to an attribute on an element
    this._boundObserver = null;
    this._boundElement = aElement;
    this._boundProperty = null;
    this._boundAttribute = aAttribute;
    this._isBool = aIsBool;
    this._isNot = aIsNot;
    this._evalString = aEvalString;
    
    // Set the value once
    this.observe(null, null, this._key);
  },

  deleteBranch: function() {
    this._prefBranch.deleteBranch(this._key);
  },


  // Original attribute getter/setters

  get stringValue() {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    return this._getValue();
  },

  set stringValue(aStringValue) {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    // Make sure there is a string object to pass.
    if (aStringValue == null)
      aStringValue = "";
    this._setValue(aStringValue);
  },

  get boolValue() {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    return (this._makeIntValue(this._getValue()) != 0);
  },

  set boolValue(aBoolValue) {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    // convert the bool to a numeric string for easy getBoolValue calls.
    aBoolValue = aBoolValue ? "1" : "0";
    this._setValue(aBoolValue);
  },

  get intValue() {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    return this._makeIntValue(this._getValue());
  },

  set intValue(aIntValue) {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;

    this._setValue(aIntValue + "");
  },


  // Newer method getter/setters, used to work around
  // BMO 304048. See sbIDataRemote for details.
  // These are temporary and internal, but in general
  // this entire implementation should go away.
  getAsString: function() {
    return this.stringValue;
  },

  setAsString: function(aStringValue) {
    this.stringValue = aStringValue;
  },

  setAsBool: function(aBoolValue) {
    this.boolValue = aBoolValue;
  },

  getAsBool: function(aBoolValue) {
    return this.boolValue;
  },

  getAsInt: function() {
    return this.intValue;
  },

  setAsInt: function(aIntValue) {
    this.intValue = aIntValue;
  },

  // internal helper function - all setters ultimately call this
  _setValue: function(aValueStr) {
    // assume we are being called after the init check in another method.

    // Make a unicode string, assign the value, set it into the preferences.
    var sString = Cc["@mozilla.org/supports-string;1"]
                            .createInstance(Ci.nsISupportsString);
    sString.data = aValueStr;
    this._prefBranch.setComplexValue(this._key,
                                Ci.nsISupportsString,
                                sString);
  },

  // internal helper function - all getters ultimately call this
  _getValue: function() {
    // assume we are being called after the init check in another method.

    var retval = "";
    try {
      var prefValue = this._prefBranch.getComplexValue(this._key, Ci.nsISupportsString);
      if (prefValue != "") {
        retval = prefValue.data;
      }
    } catch (err) {
      // when the pref does not exist in the branch the pref system returns an
      //   error code which changes to an exception. We do not want to throw
      //   here but return an empty string.
    }
    return retval;
  },
      
  // internal function for converting to an integer.
  _makeIntValue: function(aValueStr) {
    var retval = 0;
    if (aValueStr && aValueStr.length)
      retval = parseInt(aValueStr);
    return retval;
  },

  // observe - Called when someone updates the remote data
  // aSubject: The prefbranch object
  // aTopic:   NS_PREFBRANCH_PREFCHANGE_TOPIC_ID
  // aData:    the domain (key)
  observe: function(aSubject, aTopic, aData) {
    if (!this._initialized)
      throw Cr.NS_ERROR_NOT_INITIALIZED;
    
    // Early bail conditions
    if (aData != this._key)
      return;
    
    // Get the value as a string - this must be called value to not break
    //    evalStrings that do an eval of the value.
    var value = this._getValue();
    
    // Run the optional evaluation
    if (this._evalString.length)
      value = eval(this._evalString);
    
    // Handle boolean and not states
    if (this._isBool) {
      // If we were not a bool, make us one (_evalString could change value)
      if (typeof(value) != "boolean") {
        if (value == "true")
          value = true;
        else if (value == "false")
          value = false;
        else
          value = (this._makeIntValue(value) != 0);
      }
      // reverse ourself if neccessary
      if (this._isNot)
        value = !value;
    }

    // Handle callback states
    if (this._boundObserver) {
      try {
        // check if we're dealing with a remote api observer instead of a
        // normal application level data remote observer.
        if (this._boundObserver instanceof Ci.sbIRemoteObserver) {
          // pass useful information to the observer.
          this._boundObserver.observe( this._key, value );
        }
        else {
          // pass useful information to the observer.
          this._boundObserver.observe( this, this._key, value );
        }
      }
      catch (err) {
        dump("ERROR! Could not call boundObserver.observe(). Key = " + this._key + "\n" + err + "\n");
      }
    }
    else if (this._boundElement && this._boundProperty) {
      // Set the property of the callback object
      this._boundElement[this._boundProperty] = value;
    }
    else if (this._boundElement && this._boundAttribute) {
      // Set the attribute of the callback object
      var valStr = value;
      // If bool-type, convert to string.
      if (this._isBool) {
        if (value)
          valStr = "true";
        else
          valStr = "false";
      }
      try {
        this._boundElement.setAttribute(this._boundAttribute, valStr);
      }
      catch (err) {
        dump("ERROR! Could not setAttribute in sbDataRemote.js\n " + err + "\n");
      }
    }
  },

  // nsIClassInfo
  getInterfaces: function( count ) {
     var ifaces = [ SONGBIRD_DATAREMOTE_IID,
                    Ci.nsIClassInfo,
                    Ci.nsIObserver,
                    Ci.nsISecurityCheckedComponent,
                    Ci.sbISecurityAggregator,
                    Ci.nsISupportsWeakReference ];
      count.value = ifaces.length;
      return ifaces;
  },
 
  get classDescription() {
      return SONGBIRD_DATAREMOTE_CLASSNAME;
  },

  get contractID() {
      return SONGBIRD_DATAREMOTE_CONTRACTID;
  },

  get classID() {
      return SONGBIRD_DATAREMOTE_CID;
  },

  getHelperForLanguage: function( language ) { return null; },

  implementationLanguage: Ci.nsIProgrammingLanguage.JAVASCRIPT,

  // needs to be DOM_OBJECT to allow remoteAPI to access it.
  flags: Ci.nsIClassInfo.DOM_OBJECT,

  // nsISecurityCheckedComponent -- implemented by the security mixin
  _securityMixin: null,
  _initializedSCC: false,
  _publicWProps: [ ],
  _publicRProps: [ "classinfo:classDescription",
                   "classinfo:contractID",
                   "classinfo:classID",
                   "classinfo:implementationLanguage",
                   "classinfo:flags" ],
  _publicMethods: [ "internal:bindAttribute",
                    "internal:deleteBranch",
                    "internal:bindObserver",
                    "internal:bindProperty",
                    "internal:setAsString",
                    "internal:getAsString",
                    "internal:setAsInt",
                    "internal:getAsInt",
                    "internal:setAsBool",
                    "internal:getAsBool",
                    "internal:unbind",
                    "internal:init" ],
  _publicInterfaces: [ Ci.nsISupports,
                       Ci.nsIClassInfo,
                       Ci.nsIObserver,
                       Ci.nsISecurityCheckedComponent,
                       SONGBIRD_DATAREMOTE_IID ],

  _initSCC: function() {
    this._securityMixin = Cc["@songbirdnest.com/remoteapi/security-mixin;1"]
                         .createInstance(Ci.nsISecurityCheckedComponent);

    // initialize the security mixin with the cleared methods and props
    this._securityMixin
             .init(this, this._publicInterfaces, this._publicInterfaces.length,
                         this._publicMethods, this._publicMethods.length,
                         this._publicRProps, this._publicRProps.length,
                         this._publicWProps, this._publicWProps.length,
                         false);

    this._initializedSCC = true;
  },

  canCreateWrapper: function(iid) {
    if (! this._initializedSCC)
      this._initSCC();
    return this._securityMixin.canCreateWrapper(iid);
  },
  canCallMethod: function(iid, methodName) {
    if (! this._initializedSCC)
      this._initSCC();
    return this._securityMixin.canCallMethod(iid, methodName);
  },
  canGetProperty: function(iid, propertyName) {
    if (! this._initializedSCC)
      this._initSCC();
    return this._securityMixin.canGetProperty(iid, propertyName);
  },
  canSetProperty: function(iid, propertyName) {
    if (! this._initializedSCC)
      this._initSCC();
    return this._securityMixin.canSetProperty(iid, propertyName);
  },

  // nsISupports
  QueryInterface: function(iid) {
    if (!iid.equals(SONGBIRD_DATAREMOTE_IID) &&
        !iid.equals(Ci.nsIClassInfo) && 
        !iid.equals(Ci.nsIObserver) && 
        !iid.equals(Ci.nsISecurityCheckedComponent) &&
        !iid.equals(Ci.sbISecurityAggregator) &&
        !iid.equals(Ci.nsISupportsWeakReference) &&
        !iid.equals(Ci.nsISupports)) {
      throw Cr.NS_ERROR_NO_INTERFACE;
    }
    return this;
  }
}; // DataRemote.prototype

// be specific
DataRemote.prototype.constructor = DataRemote;


/**
 * ----------------------------------------------------------------------------
 * Debug Wrapper.  Subclasses and replaces DateRemote to keep 
 * track of how many dataremotes are alive, and for which keys.
 * Enable DEBUG_DATAREMOTES to track down leaks.
 * ----------------------------------------------------------------------------
 */

if (DEBUG_DATAREMOTES) {
  var RealDataRemote = DataRemote;
  function DataRemote() {
    dump("DEBUG_DATAREMOTE: NEW DATAREMOTE\n");	  
  }
  DataRemote.prototype = {
    __proto__: RealDataRemote.prototype,
    _activeDataremotes: {}, // Shared by all instances

    // Overload some methods with debug logging

    unbind: function() {
      if (this._observing) {
    	  this._activeDataremotes[this._key]--;
        dump("DEBUG_DATAREMOTE: UNBIND " + this._key + ". Remaining:\n");	  
    	  for (var key in this._activeDataremotes) {
    	    dump("DEBUG_DATAREMOTE:\t" + key + "\t\t\t" +
    	         this._activeDataremotes[key] + "\n");
    	  }
      }
      // Call original unbind
      this.__proto__.__proto__.unbind.call(this);
    },

    _logBind: function() {
      dump("DEBUG_DATAREMOTE: BIND " + this._key + "\n");
      if (!(this._key in this._activeDataremotes)) {
        this._activeDataremotes[this._key] = 0;
      }
      this._activeDataremotes[this._key]++;
    },

    bindObserver: function() {
      this.__proto__.__proto__.bindObserver.apply(this, arguments);
      this._logBind();
    },

    bindProperty: function() {
      this.__proto__.__proto__.bindProperty.apply(this, arguments);
      this._logBind();    
    },

    bindAttribute: function() {
      this.__proto__.__proto__.bindAttribute.apply(this, arguments);
      this._logBind();
    }
  } 
  DataRemote.prototype.constructor = DataRemote;
}


/**
 * ----------------------------------------------------------------------------
 * Registration for XPCOM
 * ----------------------------------------------------------------------------
 */

const gDataRemoteModule = {
  registerSelf: function(compMgr, fileSpec, location, type) {
    compMgr = compMgr.QueryInterface(Ci.nsIComponentRegistrar);
    compMgr.registerFactoryLocation(SONGBIRD_DATAREMOTE_CID,
                                    SONGBIRD_DATAREMOTE_CLASSNAME,
                                    SONGBIRD_DATAREMOTE_CONTRACTID,
                                    fileSpec,
                                    location,
                                    type);
  },

  unregisterSelf : function (compMgr, location, type) {
    compMgr.QueryInterface(Ci.nsIComponentRegistrar);
    compMgr.unregisterFactoryLocation(SONGBIRD_DATAREMOTE_CID, location);
  },

  getClassObject : function (compMgr, cid, iid) {
    if (!cid.equals(SONGBIRD_DATAREMOTE_CID))
      throw Cr.NS_ERROR_NO_INTERFACE;

    if (!iid.equals(Ci.nsIFactory))
      throw Cr.NS_ERROR_NOT_IMPLEMENTED;

    return this.mFactory;
  },

  mFactory : {
    createInstance : function (outer, iid) {
      if (outer != null)
        throw Cr.NS_ERROR_NO_AGGREGATION;
      
      return (new DataRemote()).QueryInterface(iid);
    }
  },

  canUnload: function(compMgr) { 
    return true; 
  },

  QueryInterface : function (iid) {
    if ( !iid.equals(Ci.nsIModule) ||
         !iid.equals(Ci.nsISupports) )
      throw Cr.NS_ERROR_NO_INTERFACE;
    return this;
  }

}; // gDataRemoteModule

function NSGetModule(compMgr, fileSpec) {
  return gDataRemoteModule;
} // NSGetModule


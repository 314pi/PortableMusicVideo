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

//
// sbIPlaylistReaderListener Object
//
const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;

const SONGBIRD_PLAYLISTREADERLISTENER_CONTRACTID = "@songbirdnest.com/Songbird/PlaylistReaderListener;1";
const SONGBIRD_PLAYLISTREADERLISTENER_CLASSNAME = "Songbird Playlist Reader Listener"
const SONGBIRD_PLAYLISTREADERLISTENER_IID = Components.interfaces.sbIPlaylistReaderListener;
const SONGBIRD_PLAYLISTREADERLISTENER_CID = Components.ID("{b4fac7ab-7d23-47c5-98e0-7e59266e2a28}");

function CPlaylistReaderListener()
{
}

CPlaylistReaderListener.prototype.constructor = CPlaylistReaderListener;

CPlaylistReaderListener.prototype =
{
  originalURI: null,
  destinationURI: null,
  addDistinctOnly: false,
  playWhenLoaded: false,
  mediaMimetypesOnly: false,
  observer: null,
  state: "",

  onLocationChange: function(aWebProgress, aRequest, aLocation)
  {
  },

  onProgressChange: function(aWebProgress, aRequest, curSelfProgress, maxSelfProgress, curTotalProgress, maxTotalProgress)
  {
  },

  onSecurityChange: function(aWebProgress, aRequest, aStateFlags)
  {
  },

  onStateChange: function(aWebProgress, aRequest, aStateFlags, aStatus)
  {
    if (aStateFlags & 16 /*this.STATE_STOP*/)
    {
      // mark ourself as finished so the PlaylistReaderManager can remove us.
      this.state = "STATE_STOP";

      var playlistReaderMngr = Cc["@songbirdnest.com/Songbird/PlaylistReaderManager;1"]
                                 .getService(Ci.sbIPlaylistReaderManager);
      var mm = Cc["@songbirdnest.com/Songbird/Mediacore/Manager;1"]
                 .getService(Ci.sbIMediacoreManager);

      var strContentType = "";
      var aChannel = aRequest.QueryInterface(Components.interfaces.nsIChannel);
      if (aChannel)
      {
        try
        {
          strContentType = aChannel.contentType;
        }
        catch (err) {
          Components.utils.reportError(err);
        } // Grrrr.
      }
      playlistReaderMngr.originalURI = this.originalURI;
      try {
        playlistReaderMngr.loadPlaylist(this.destinationURI,
                                        this.mediaList, strContentType,
                                        this.addDistinctOnly,
                                        null);
        if (this.playWhenLoaded)
        {
          var view = this.mediaList.createView();
          mm.sequencer.playView(view, 0);
        }
        if (this.observer)
        {
          this.observer.observe(this.mediaList, "success", "");
        }
      }
      catch(e)
      {
        if (this.observer)
          this.observer.observe(null, "error: could not create playlist", "");
        Components.utils.reportError(e);
      }
      finally
      {
        playlistReaderMngr.originalURI = null;
      }
    }
  },

  onStatusChange: function(aWebProgress, aRequest, aStateFlags, strStateMessage)
  {
  },

  QueryInterface: function(aIID)
  {
    if (!aIID.equals(Components.interfaces.sbIPlaylistReaderListener) &&
        !aIID.equals(Components.interfaces.nsIWebProgressListener) &&
        !aIID.equals(Components.interfaces.nsISupportsWeakReference) &&
        !aIID.equals(Components.interfaces.nsISupports))
    {
      throw Components.results.NS_ERROR_NO_INTERFACE;
    }

    return this;
  }
};

/**
 * \class sbPlaylistReaderListenerModule
 * \brief
 */
var sbPlaylistReaderListenerModule =
{
  registerSelf: function(compMgr, fileSpec, location, type)
  {
      compMgr = compMgr.QueryInterface(Components.interfaces.nsIComponentRegistrar);
      compMgr.registerFactoryLocation(SONGBIRD_PLAYLISTREADERLISTENER_CID,
                                      SONGBIRD_PLAYLISTREADERLISTENER_CLASSNAME,
                                      SONGBIRD_PLAYLISTREADERLISTENER_CONTRACTID,
                                      fileSpec,
                                      location,
                                      type);
  },

  getClassObject: function(compMgr, cid, iid)
  {
      if (!cid.equals(SONGBIRD_PLAYLISTREADERLISTENER_CID))
          throw Components.results.NS_ERROR_NO_INTERFACE;

      if (!iid.equals(Components.interfaces.nsIFactory))
          throw Components.results.NS_ERROR_NOT_IMPLEMENTED;

      return sbPlaylistReaderListenerFactory;
  },

  canUnload: function(compMgr)
  {
    return true;
  }
};

/**
 * \class sbPlaylistReaderListenerFactory
 * \brief
 */
var sbPlaylistReaderListenerFactory =
{
    createInstance: function(outer, iid)
    {
        if (outer != null)
            throw Components.results.NS_ERROR_NO_AGGREGATION;

        if (!iid.equals(SONGBIRD_PLAYLISTREADERLISTENER_IID) &&
            !iid.equals(Components.interfaces.nsIWebProgressListener) &&
            !iid.equals(Components.interfaces.nsISupportsWeakReference) &&
            !iid.equals(Components.interfaces.nsISupports))
            throw Components.results.NS_ERROR_INVALID_ARG;

        return (new CPlaylistReaderListener()).QueryInterface(iid);
    }
}; //sbPlaylistReaderListenerFactory

/**
 * \function NSGetModule
 * \brief
 */
function NSGetModule(comMgr, fileSpec)
{
  return sbPlaylistReaderListenerModule;
} //NSGetModule


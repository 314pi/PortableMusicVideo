/**
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
 
/**
 * \file sbFeedPlaylistHandler.js
 */
function sbFeedPlaylistHandler() {
  this._originalURI = null;
}

// sbIPlaylistReader
sbFeedPlaylistHandler.prototype.__defineGetter__("originalURI",
function()
{
  return this._originalURI;
});

sbFeedPlaylistHandler.prototype.__defineSetter__("originalURI",
function(value)
{
  this._originalURI = value;
});

sbFeedPlaylistHandler.prototype.read =
function(aFile, aMediaList, aReplace)
{
  var istream = Cc["@mozilla.org/network/file-input-stream;1"]
                  .createInstance(Ci.nsIFileInputStream);
  istream.init(aFile, PR_RDONLY, PR_FLAGS_DEFAULT, 0);

  var parser = Cc["@mozilla.org/feed-processor;1"]
                 .createInstance(Ci.nsIFeedProcessor);

  var typeSniffer = Cc["@songbirdnest.com/Songbird/Mediacore/TypeSniffer;1"]
                      .createInstance(Ci.sbIMediacoreTypeSniffer);
  var toAdd = [];
  parser.listener = {
    handleResult: function(result) {

      var feed = result.doc.QueryInterface(Ci.nsIFeed);
      for (var i = 0; i < feed.items.length; ++i) {
        var entry = feed.items.queryElementAt(i, Ci.nsIFeedEntry);
        var uri = SB_ResolveURI(entry.link.spec);
        if (typeSniffer.isValidMediaURL(uri)) {
          var item = { uri: entry.link, properties: {} };
          /* all items coming in through the feed reader are podcasts */
          item.properties[SBProperties.contentType] = "podcast";
          toAdd.push(item);
        }
        else {
          this.addEnclosure(entry);
        }
      }
    },

    addEnclosure: function(aEntry)
    {
      var enclosureList = aEntry.fields.getPropertyAsInterface("enclosure", Ci.nsIArray);
      if (!enclosureList)
        return false;
      var enclosure = enclosureList.queryElementAt(0, Ci.nsIPropertyBag2);

      var url = enclosure.getPropertyAsAString("url");
      if (!url)
        return false;

      var resolvedURI = SB_ResolveURI(url);
      if (!resolvedURI)
        return false;
        
      var type = enclosure.getPropertyAsAString("type");
      if (!type)
        if (!typeSniffer.isValidMediaURL(resolvedURI))
            return false;

      var item = { uri: resolvedURI, properties: {} };
      /* all items coming in through the feed reader are podcasts */
      item.properties[SBProperties.contentType] = "podcast";
      toAdd.push(item);

      return true;
    }
  };

  parser.parseFromStream(istream, this._originalURI);

  // Prevent the closure from leaking
  parser.listener = null;

  SB_AddItems(toAdd, aMediaList, aReplace);
}

sbFeedPlaylistHandler.prototype.vote =
function(aURL)
{
  return 10000;
}

sbFeedPlaylistHandler.prototype.name =
function()
{
  return "Songbird Atom/RSS Reader";
}

sbFeedPlaylistHandler.prototype.description =
function()
{
  return "Loads Atom/RSS playlists from remote and local locations.";
}

sbFeedPlaylistHandler.prototype.supportedMIMETypes =
function(aMIMECount)
{
  var mimeTypes = ["application/rss+xml", "application/atom+xml"];
  aMIMECount.value = mimeTypes.length;
  return mimeTypes;
}

sbFeedPlaylistHandler.prototype.supportedFileExtensions =
function(aExtCount)
{
  var exts = ["atom", "rss"];
  aExtCount.value = exts.length;
  return exts;
}

sbFeedPlaylistHandler.prototype.QueryInterface =
function(iid)
{
  if (!iid.equals(Ci.sbIPlaylistReader) &&
      !iid.equals(Ci.nsISupports))
    throw Cr.NS_ERROR_NO_INTERFACE;
  return this;
}


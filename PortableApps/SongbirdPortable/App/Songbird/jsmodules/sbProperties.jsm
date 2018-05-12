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

/**
 * Property constants for use with the Songbird property system. Import into a
 * JS file or component using:
 *
 *   'Components.utils.import("resource://app/jsmodules/sbProperties.jsm");'
 *
 */

EXPORTED_SYMBOLS = ["SBProperties"];

var SBProperties = {

  _base: "http://songbirdnest.com/data/1.0#",

  get base() { return this._base; },

  get storageGUID             () { return this._base + "storageGUID"; },
  get created                 () { return this._base + "created"; },
  get updated                 () { return this._base + "updated"; },
  get contentURL              () { return this._base + "contentURL"; },
  get contentType             () { return this._base + "contentType"; },
  get contentLength           () { return this._base + "contentLength"; },
  get hash                    () { return this._base + "hash"; },
  get metadataHashIdentity    () { return this._base + "metadataHashIdentity"; },
  get trackName               () { return this._base + "trackName"; },
  get albumName               () { return this._base + "albumName"; },
  get artistName              () { return this._base + "artistName"; },
  get trackType               () { return this._base + "trackType"; },
  get duration                () { return this._base + "duration"; },
  get genre                   () { return this._base + "genre"; },
  get trackNumber             () { return this._base + "trackNumber"; },
  get year                    () { return this._base + "year"; },
  get discNumber              () { return this._base + "discNumber"; },
  get totalDiscs              () { return this._base + "totalDiscs"; },
  get totalTracks             () { return this._base + "totalTracks"; },
  get isPartOfCompilation     () { return this._base + "isPartOfCompilation"; },
  get producerName            () { return this._base + "producerName"; },
  get composerName            () { return this._base + "composerName"; },
  get conductorName           () { return this._base + "conductorName"; },
  get lyricistName            () { return this._base + "lyricistName"; },
  get lyrics                  () { return this._base + "lyrics"; },
  get recordLabelName         () { return this._base + "recordLabelName"; },
  get primaryImageURL         () { return this._base + "primaryImageURL"; },
  get lastPlayTime            () { return this._base + "lastPlayTime"; },
  get playCount               () { return this._base + "playCount"; },
  get lastPlayPosition        () { return this._base + "lastPlayPosition"; },
  get lastSkipTime            () { return this._base + "lastSkipTime"; },
  get skipCount               () { return this._base + "skipCount"; },
  get rating                  () { return this._base + "rating"; },
  get bitRate                 () { return this._base + "bitRate"; },
  get channels                () { return this._base + "channels"; },
  get sampleRate              () { return this._base + "sampleRate"; },
  get bpm                     () { return this._base + "bpm"; },
  get key                     () { return this._base + "key"; },
  get language                () { return this._base + "language"; },
  get comment                 () { return this._base + "comment"; },
  get copyright               () { return this._base + "copyright"; },
  get copyrightURL            () { return this._base + "copyrightURL"; },
  get subtitle                () { return this._base + "subtitle"; },
  get metadataUUID            () { return this._base + "metadataUUID"; },
  get softwareVendor          () { return this._base + "softwareVendor"; },
  get originURL               () { return this._base + "originURL"; },
  get originPage              () { return this._base + "originPage"; },
  get originPageImage         () { return this._base + "originPageImage"; },
  get originPageTitle         () { return this._base + "originPageTitle"; },
  get originLibraryGuid       () { return this._base + "originLibraryGuid"; },
  get originItemGuid          () { return this._base + "originItemGuid"; },
  get GUID                    () { return this._base + "GUID"; },
  get hidden                  () { return this._base + "hidden"; },
  get isList                  () { return this._base + "isList"; },
  get listType                () { return this._base + "listType"; },
  get isReadOnly              () { return this._base + "isReadOnly"; },
  get isContentReadOnly       () { return this._base + "isContentReadOnly"; },
  get ordinal                 () { return this._base + "ordinal"; },
  get mediaListName           () { return this._base + "mediaListName"; },
  get columnSpec              () { return this._base + "columnSpec"; },
  get defaultColumnSpec       () { return this._base + "defaultColumnSpec"; },
  get customType              () { return this._base + "customType"; },
  get destination             () { return this._base + "destination"; },
  get downloadButton          () { return this._base + "downloadButton"; },
  get downloadStatusTarget    () { return this._base + "downloadStatusTarget"; },
  get downloadDetails         () { return this._base + "downloadDetails"; },
  get isSortable              () { return this._base + "isSortable"; },
  get rapiScopeURL            () { return this._base + "rapiScopeURL"; },
  get rapiSiteID              () { return this._base + "rapiSiteID"; },
  get enableAutoDownload      () { return this._base + "enableAutoDownload"; },
  get transferPolicy          () { return this._base + "transferPolicy"; },
  get defaultMediaPageURL     () { return this._base + "defaultMediaPageURL"; },
  get onlyCustomMediaPages    () { return this._base + "onlyCustomMediaPages"; },
  get availability            () { return this._base + "availability"; },
  get albumArtistName         () { return this._base + "albumArtistName"; },
  get outerGUID               () { return this._base + "outerGUID"; },
  get albumDetailImage        () { return this._base + "albumDetailImage"; },
  get artistDetailImage       () { return this._base + "artistDetailImage"; },
  get albumDetailUrl          () { return this._base + "albumDetailUrl"; },
  get artistDetailUrl         () { return this._base + "artistDetailUrl"; },
  get excludeFromHistory      () { return this._base + "excludeFromHistory"; },
  get disableDownload         () { return this._base + "disableDownload"; },
  get isSubscription          () { return this._base + "isSubscription"; },
  get cdRipStatus             () { return this._base + "cdRipStatus"; },
  get cdDiscHash              () { return this._base + "cdDiscHash"; },
  get shouldRip               () { return this._base + "shouldRip"; },
  get isDRMProtected          () { return this._base + "isDRMProtected"; },
  get dontWriteMetadata       () { return this._base + "dontWriteMetadata"; },
  get importType              () { return this._base + "importType"; },
  get deviceId                () { return this._base + "deviceId"; },
  get playCount_AtLastSync    () { return this._base + "playCount_AtLastSync"; },
  get skipCount_AtLastSync    () { return this._base + "skipCount_AtLastSync"; },
  get lastSyncTime            () { return this._base + "lastSyncTime"; },
  get originIsInMainLibrary   () { return this._base + "originIsInMainLibrary"; },
  get smartMediaListState     () { return this._base + "smartMediaListState"; },
  get createdFirstRunSmartPlaylists() { return this._base + "createdFirstRunSmartPlaylists"; },
  get downloadMediaListGUID   () { return this._base + "downloadMediaListGUID"; },
  get playQueueMediaListGUID  () { return this._base + "playQueueMediaListGUID"; },
  get deviceLibraryGuid       () { return this._base + "deviceLibraryGuid"; },
  get iTunesGUID              () { return this._base + "iTunesGUID"; },
  get keywords                () { return this._base + "keywords"; },
  get description             () { return this._base + "description"; },
  get showName                () { return this._base + "showName"; },
  get episodeNumber           () { return this._base + "episodeNumber"; },
  get seasonNumber            () { return this._base + "seasonNumber"; },
  get playlistURL             () { return this._base + "playlistURL"; },
  get attemptedRemoteArtFetch () { return this._base + "attemptedRemoteArtFetch"; },

  /**
   * Create a property array from a js object such as [[id,value], ..] or {id:value}.
   * Pass strict=true to ensure that all property values are valid.
   */
  createArray: function(properties, strict) {
    var propertyArray =
      Components.classes["@songbirdnest.com/Songbird/Properties/MutablePropertyArray;1"]
                .createInstance(Components.interfaces.sbIMutablePropertyArray);
    if (arguments.length > 1) {
      propertyArray.strict = arguments[1];
    }
    if (properties) {
      this.addToArray(properties, propertyArray);
    }
    return propertyArray;
  },
  
  /**
   * Add properties (as [[id,value], ..] or {id:value})
   * to the given property array
   */
  addToArray: function(properties, propertyArray) {
    if (properties) {
      // If properties are passed as an array, assume [[id,value], ..]
      if (properties.length !== undefined) {
        properties.forEach(function(e) {
          if (e.length == 2) {
            propertyArray.appendProperty(e[0], e[1]);
          }
        });
      // Otherwise assume an object with {id:value}
      } else {
        for (var prop in properties) {
          propertyArray.appendProperty(prop, properties[prop]);
        }
      }
    }
  },
  
  /**
   * Convert the given property array into a javascript map like {id:value}
   */
  arrayToJSObject: function(propArray) {
    var enumerator = propArray.enumerate();
    var property;
    var propMap = {};
    while (enumerator.hasMoreElements()) {
      property = enumerator.getNext().QueryInterface(Components.interfaces.sbIProperty);
      propMap[property.id] = property.value;
    }
    return propMap;
  }
}

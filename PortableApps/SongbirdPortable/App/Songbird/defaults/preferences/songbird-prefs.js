//@line 2 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"
// Songbird Default Prefs.
pref("toolkit.defaultChromeFeatures", "chrome,modal=no,toolbar=no,popup=no,titlebar=no");

// This is only used by the MAC version
pref("browser.chromeURL", "chrome://songbird/content/xul/macCmdLineFwd.xul");

// Prevent xulrunner from launching multiple instances of Songbird.
pref("toolkit.singletonWindowType", "Songbird:Main");

pref("general.useragent.extra.songbird", "Songbird/2.2.0 (20130204082828)");
pref("songbird.buildNumber", "2453");

// Default feather settings:
// @see sbFeathersManager.js for more information about each pref
pref("general.skins.selectedSkin", "pinkmartini");
pref("songbird.feathers.default_skin_internalname", "pinkmartini");
pref("songbird.feathers.default_feather_id", "pinkmartini@songbirdnest.com");
pref("songbird.feathers.default_main_layout", "chrome://pinkmartini/content/xul/mainplayer.xul");
pref("songbird.feathers.default_secondary_layout", "chrome://pinkmartini/content/xul/miniplayer.xul");

pref("accessibility.typeaheadfind", false);
pref("accessibility.typeaheadfind.timeout", 5000);
pref("accessibility.typeaheadfind.flashBar", 1);
pref("accessibility.typeaheadfind.linksonly", false);

// Dump the current ram footprint when minimized.
pref("config.trim_on_minimize", true);

// Scan for some extra plugins.
pref("plugin.scan.SunJRE", "1.3");
pref("plugin.scan.Acrobat", "5.0");
pref("plugin.scan.Quicktime", "5.0");
pref("plugin.scan.WindowsMediaPlayer", "7.0");

// Password Manager
pref("signon.rememberSignons", true);
pref("signon.expireMasterPassword", false);
pref("signon.SignonFileName", "signons.txt");

pref("browser.shell.checkDefaultBrowser", false);

pref("browser.formfill.enable", true);

pref("browser.search.update", false);
pref("browser.search.update.log", false);
pref("browser.search.updateinterval", 6);

pref("browser.sessionhistory.max_total_viewers", 0);
pref("browser.sessionhistory.max_entries", 50);

pref("browser.xul.error_pages.enabled", true);

// Download manager prefs
pref("browser.download.useDownloadDir", true);
     // 0-desktop  1-download  2-pref("browser.download.dir")
pref("browser.download.folderList", 0);
pref("browser.download.manager.showAlertOnComplete", false);
pref("browser.download.manager.showAlertInterval", 2000);
     // when downloads are removed from list 0-completion 1-shutdown 2-never
pref("browser.download.manager.retention", 3);
     // these two control whether the manager shows up, both must be true
pref("browser.download.manager.showWhenStarting", true);
pref("browser.download.manager.useWindow", true);
     // duh
pref("browser.download.manager.closeWhenDone", false);
     // how long to wait before showing dm
pref("browser.download.manager.openDelay", 0);
pref("browser.download.manager.focusWhenStarting", false);
     // flashes this many times when opened - in theory
pref("browser.download.manager.flashCount", 2);
pref("browser.download.manager.displayedHistoryDays", 7);
pref("browser.download.manager.addToRecentDocs", true);
//pref("privacy.item.downloads",  true);
pref("browser.download.show_plugins_in_list", true);
pref("browser.download.hide_plugins_without_extensions", true);

// Default to always downloading without prompting.
pref("songbird.download.music.alwaysPrompt", false);

pref("browser.link.open_external", 3);
pref("browser.link.open_newwindow", 3);
pref("browser.link.open_newwindow.restriction", 0);
//pref("browser.tabs.loadInBackground", true);
pref('browser.tabs.enabled', true);
pref("browser.tabs.loadDivertedInBackground", false);

// set the default device transcoding/transfer ratio.
pref("device.transcoding.transfer.ratio", 1);

//
// Advanced DOM JavaScript preferences
//
pref("dom.disable_window_move_resize", true);
pref("dom.disable_window_flip", true);
pref("dom.event.contextualmenu.enabled", false);
pref("dom.disable_window_open_feature.status", true);
pref("dom.disable_window_status_change", true);

// Default columns for the web playlist
pref("songbird.webplaylist.columnspec",  "http://songbirdnest.com/data/1.0#ordinal 28 a http://songbirdnest.com/data/1.0#trackName 280 http://songbirdnest.com/data/1.0#duration 38 http://songbirdnest.com/data/1.0#artistName 169 http://songbirdnest.com/data/1.0#albumName 159 http://songbirdnest.com/data/1.0#downloadButton 83");

// Dynamic Skin Switching
pref("extensions.dss.enabled", false);

// Non-dynamic switch pending after next restart
pref("extensions.dss.switchPending", false);

pref("general.autoScroll", true);
pref("general.smoothScroll", false);

// this will automatically enable inline spellchecking (if it is available) for
// editable elements in HTML
// 0 = spellcheck nothing
// 1 = check multi-line controls [default]
// 2 = check multi/single line controls
pref("layout.spellcheckDefault", 1);

pref("network.protocol-handler.external.mailto", true);
pref("network.protocol-handler.external.news", true);
pref("network.protocol-handler.external.snews", true);
pref("network.protocol-handler.external.nntp", true);

// Don't warn when opening external http urls
// This is to allow for launching _blank targeted links in the default browser
pref("network.protocol-handler.warn-external.http", false);
pref("network.protocol-handler.warn-external.https", false);

pref("network.proxy.share_proxy_settings",  false);

pref("plugin.default_plugin_disabled", true);
pref("security.warn_entering_secure.show_once", true);
pref("security.warn_leaving_secure.show_once", true);


// Prefer a window size that can handle 1024px-ish websites
// If this pref turns out to be bigger than the screen
// the window size will fall back to that specified by css
pref("songbird.window.frame_outer.w", "1157");
pref("songbird.window.frame_outer.h", "718");

// Whether or not app updates are enabled
pref("app.update.enabled", true);

// This preference turns on app.update.mode and allows automatic download and
// install to take place. We use a separate boolean toggle for this to make
// the UI easier to construct.
pref("app.update.auto", true);

// Defines how the Application Update Service notifies the user about updates:
//
// AUM Set to:        Minor Releases:     Major Releases:
// 0                  download no prompt  download no prompt
// 1                  download no prompt  download no prompt if no incompatibilities
// 2                  download no prompt  prompt
//
// See chart in nsUpdateService.js.in for more details
//
pref("app.update.mode", 1);

// If set to true, the Update Service will present no UI for any event.
pref("app.update.silent", false);

// Update service URL - see branding prefs
// pref("app.update.url", ****);

// URL user can browse to manually if for some reason all update installation
// attempts fail.  - see branding prefs
// pref("app.update.url.manual", ****);

// A default value for the "More information about this update" link
// supplied in the "An update is available" page of the update wizard.
// - see branding prefs
// pref("app.update.url.details", ****);

// User-settable override to app.update.url for testing purposes.
//pref("app.update.url.override", "");

// Interval: Time between checks for a new version (in seconds)
//           default=1 day
pref("app.update.interval", 86400);

// Interval: Time before prompting the user to download a new version that
//           is available (in seconds) default=1 day
pref("app.update.nagTimer.download", 86400);

// Interval: Time before prompting the user to restart to install the latest
//           download (in seconds) default=30 minutes
pref("app.update.nagTimer.restart", 1800);

// Interval: When all registered timers should be checked (in milliseconds)
//           default=5 seconds
pref("app.update.timer", 600000);

// Whether or not we show a dialog box informing the user that the update was
// successfully applied. This is off in Firefox by default since we show a
// upgrade start page instead! Other apps may wish to show this UI, and supply
// a whatsNewURL field in their brand.properties that contains a link to a page
// which tells users what's new in this new update.
pref("app.update.showInstalledUI", false);

// 0 = suppress prompting for incompatibilities if there are updates available
//     to newer versions of installed addons that resolve them.
// 1 = suppress prompting for incompatibilities only if there are VersionInfo
//     updates available to installed addons that resolve them, not newer
//     versions.
pref("app.update.incompatible.mode", 0);

// Symmetric (can be overridden by individual extensions) update preferences.
// e.g.
//  extensions.{GUID}.update.enabled
//  extensions.{GUID}.update.url
//  extensions.{GUID}.update.interval
//  .. etc ..
//
pref("extensions.update.enabled", true);
// - see branding prefs
// pref("extensions.update.url", ****);
pref("extensions.update.interval", 86400);  // Check for updates to Extensions and
                                            // Feathers every day
// Non-symmetric (not shared by extensions) extension-specific [update] preferences
// - see branding prefs
// pref("extensions.getMoreExtensionsURL", ****);
// pref("extensions.getMoreThemesURL", ****);

pref("extensions.blocklist.enabled", true);
pref("extensions.blocklist.interval", 86400);
// see branding prefs
// pref("extensions.blocklist.url", ****);
// pref("extensions.blocklist.detailsURL", ****);
pref("extensions.ignoreMTimeChanges", false);

// We whitelist addons and translate - see branding prefs
// pref("xpinstall.whitelist.add", ****);
// pref("xpinstall.whitelist.add.0", ****);

// We may want to whitelist addons.mozilla.org in the future.
//pref("xpinstall.whitelist.add.1", "addons.mozilla.org");

pref("songbird.recommended_addons.update.enabled", true);
// Interval: Time in seconds between checks for a new add-on bundle.
//           default=1 day
pref("songbird.recommended_addons.update.interval", 86400);

//@line 143 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"

//@line 147 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"

//@line 149 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"
pref("browser.preferences.instantApply", false);
//@line 153 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"

//@line 157 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"
pref("browser.preferences.animateFadeIn", false);
//@line 159 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"

// Backspace and Shift+Backspace behavior
// Should do nothing on Linux, and go Back/Forward on Mac OSX and Windows
// 0 goes Back/Forward
// 2 and other values, nothing
//@line 171 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"
pref("browser.backspace_action", 0);
//@line 173 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"

// Enable the web playlist.
// Extracts A tags and add browser context menu.
// Note that this pref is reset to "1" on every app start.
pref("songbird.webplaylist.enabled", "1");

// for tabbrowsing
pref("browser.chrome.site_icons", true);
pref("browser.chrome.favicons", true);
pref("browser.tabs.loadInBackground", false);
pref("browser.chrome.site_icons", true);
pref("browser.chrome.favicons", true);
pref("browser.chrome.image_icons.max_size", 1024);
pref("browser.tabs.forceHide", false);
pref("browser.tabs.warnOnClose", false);
pref("browser.tabs.autoHide", true);
pref("browser.tabs.selectOwnerOnClose", true);


// Override the window XPInstall opens on extension install
pref("xpinstall.dialog.progress.type.chrome", "Browser:Preferences");
pref("xpinstall.dialog.progress.type.skin", "Browser:Preferences");

pref("xpinstall.dialog.progress.chrome", "chrome://browser/content/preferences/preferences.xul");
pref("xpinstall.dialog.progress.skin", "chrome://browser/content/preferences/preferences.xul");

//
// Search Preferences
//

pref("songbird.livesearch.enabled",           true);

// pointer to the default engine name
pref("browser.search.defaultenginename",      "chrome://branding/locale/brand.properties");

// disable logging for the search service by default
pref("browser.search.log", false);

// Ordering of Search Engines in the Engine list.
pref("browser.search.order.1",                "chrome://branding/locale/brand.properties");
pref("browser.search.order.2",                "chrome://branding/locale/brand.properties");
pref("browser.search.order.3",                "chrome://branding/locale/brand.properties");
pref("browser.search.order.4",                "chrome://branding/locale/brand.properties");
pref("browser.search.order.5",                "chrome://branding/locale/brand.properties");

// search bar results always open in a new tab
pref("browser.search.openintab", false);

// send ping to the server to update
pref("browser.search.update", true);

// disable logging for the search service update system by default
pref("browser.search.update.log", false);

// Check whether we need to perform engine updates every 6 hours
pref("browser.search.updateinterval", 6);

// enable search suggestions by default
pref("browser.search.suggest.enabled", true);


//@line 237 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"
pref("browser.urlbar.clickSelectsAll", true);
//@line 239 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"

//
// RemoteAPI prefs
//

// allow access to playback control/read remote api by default
pref("songbird.rapi.playback_control_disable", false);
pref("songbird.rapi.playback_read_disable", false);
pref("songbird.rapi.library_read_disable", true);
pref("songbird.rapi.library_write_disable", true);

// by default notify about everything
pref("songbird.rapi.playback_control_notify", true);
pref("songbird.rapi.playback_read_notify", true);
pref("songbird.rapi.library_read_notify", true);
pref("songbird.rapi.library_write_notify", true);

// Songbird default urls
pref("songbird.url.addons", "http://addons.songbirdnest.com/");
pref("songbird.url.addons.displaypanes", "http://addons.songbirdnest.com/tag/displaypane");
pref("songbird.url.addons.feathers", "http://addons.songbirdnest.com/tag/feathers");
pref("songbird.url.addons.mediaviews", "http://addons.songbirdnest.com/tag/mediaview");
pref("browser.startup.homepage", "http://birdhouse.songbirdnest.com/");
pref("songbird.url.firstrunpage", "http://birdhouse.songbirdnest.com/firstrun/");
pref("songbird.url.bugzilla", "http://bugzilla.songbirdnest.com/");
pref("songbird.url.metrics", "http://metrics.songbirdnest.com/post/");
pref("songbird.url.support", "http://songbirdnest.com/support/");
pref("songbird.url.keyboard", "about:keyboard-help");
pref("songbird.url.support.quicktime", "http://wiki.songbirdnest.com/Developer/Articles/Media_Cores/Setting_Up_QuickTime");
pref("songbird.url.support.corefailure", "http://wiki.songbirdnest.com/Developer/Articles/Media_Cores/Core_Wrapper_Failure");

//
// Media Core prefs
//

// Value is in milliseconds
pref("songbird.mediacore.output.buffertime", 2000);

// Value is in kilobytes
pref("songbird.mediacore.streaming.buffersize", 128);

pref("songbird.mediacore.normalization.enabled", true);

// Prefer album gain over track gain. Valid values are 'album' and 'track'.
pref("songbird.mediacore.normalization.preferredGain", "album");

// Playback History
pref("songbird.mediacore.playback.history.enabled", true);

pref("songbird.mediascan.enableVideoImporting", true);

// Whether to automatically restart video playback at the last stopped position
pref("songbird.mediacore.resumePlaybackPosition", true);

//
// Metadata prefs
//
pref("songbird.metadata.enableWriting", true);
pref("songbird.metadata.promptOnWrite", false);
pref("songbird.metadata.ratings.enableWriting", false);
pref("songbird.trackeditor.enableAdvancedTab", false);

//
// Sanitize prefs
//
pref("privacy.sanitize.promptOnSanitize", true);
pref("privacy.sanitize.sanitizeOnShutdown", false);
pref("privacy.sanitize.didShutdownSanitize", false);
pref("privacy.item.mediaHistory", true);
pref("privacy.item.history", true);
pref("privacy.item.formdata", true);
pref("privacy.item.passwords", true);
pref("privacy.item.downloads", true);
pref("privacy.item.cookies", true);
pref("privacy.item.cache", true);
pref("privacy.item.sessions", true);

// Prevent popups by default
pref("privacy.popups.firstTime",            true);
pref("privacy.popups.showBrowserMessage",   true);
pref("dom.disable_open_during_load",        true);

// Disable drag image for linux, see
// http://bugzilla.songbirdnest.com/show_bug.cgi?id=5537
// https://bugzilla.mozilla.org/show_bug.cgi?id=376238
//@line 329 "/e/builds/nightly/release/sb_win32bot03_release/build/app/preferences/songbird-prefs.js.in"



//
// Places support
//

// import bookmarks.html into Places bookmarks
pref("browser.places.importBookmarksHTML", true);

// if false, will add the "Smart Bookmarks" folder to the personal toolbar
pref("browser.places.createdSmartBookmarks", false);

// the (maximum) number of the recent visits to sample
// when calculating frecency
pref("places.frecency.numVisits", 10);

// Number of records to update frecency for when idle.
pref("places.frecency.numCalcOnIdle", 50);

// Number of records to update frecency for when migrating from
// a pre-frecency build.
pref("places.frecency.numCalcOnMigrate", 50);

// Perform frecency recalculation after this amount of idle, repeating.
// A value of zero disables updating of frecency on idle.
// Default is 1 minute (60000ms).
pref("places.frecency.updateIdleTime", 60000);

// buckets (in days) for frecency calculation
pref("places.frecency.firstBucketCutoff", 4);
pref("places.frecency.secondBucketCutoff", 14);
pref("places.frecency.thirdBucketCutoff", 31);
pref("places.frecency.fourthBucketCutoff", 90);

// weights for buckets for frecency calculations
pref("places.frecency.firstBucketWeight", 100);
pref("places.frecency.secondBucketWeight", 70);
pref("places.frecency.thirdBucketWeight", 50);
pref("places.frecency.fourthBucketWeight", 30);
pref("places.frecency.defaultBucketWeight", 10);

// bonus (in percent) for visit transition types for frecency calculations
pref("places.frecency.embedVisitBonus", 0);
pref("places.frecency.linkVisitBonus", 120);
pref("places.frecency.typedVisitBonus", 200);
pref("places.frecency.bookmarkVisitBonus", 140);
pref("places.frecency.downloadVisitBonus", 0);
pref("places.frecency.permRedirectVisitBonus", 0);
pref("places.frecency.tempRedirectVisitBonus", 0);
pref("places.frecency.defaultVisitBonus", 0);

// bonus (in percent) for place types for frecency calculations
pref("places.frecency.unvisitedBookmarkBonus", 140);
pref("places.frecency.unvisitedTypedBonus", 200);

pref("browser.urlbar.autoFill", false);
pref("browser.urlbar.matchOnlyTyped", false);

// the maximum number of results to show in autocomplete when doing richResults
pref("browser.urlbar.maxRichResults", 25);
// Size of "chunks" affects the number of places to process between each search
// timeout (ms). Too big and the UI will be unresponsive; too small and we'll
// be waiting on the timeout too often without many results.
pref("browser.urlbar.search.chunkSize", 1000);
pref("browser.urlbar.search.timeout", 50);

pref("browser.dictionaries.download.url", "https://%LOCALE%.add-ons.mozilla.com/%LOCALE%/firefox/%VERSION%/dictionaries/");

// Default the player controls to the top
pref("songbird.playercontrol.location", "top");

// Default the service pane location for hovering.
pref("songbird.splitter.servicepane_splitter.before.width", "178");

//
// Library importer prefs
//
pref("songbird.library_importer.unsupported_media_alert.enabled", true);

//
// Album art preferences
//
// Maximum size of images in bytes that we accept.
pref("songbird.albumart.maxsize", 16777216);
// Scanning preferences
pref("songbird.albumart.scanner.interval", 10);
pref("songbird.albumart.scanner.timeout", 10000);
pref("songbird.albumart.autofetch.disabled", true);
// Fetcher preferences
pref("songbird.albumart.file.extensions", "jpg,jpeg,png,gif,bmp");
pref("songbird.albumart.file.base_names", "cover,folder");
// Enable writing artwork to meta data by default
pref("songbird.metadata.artwork.enableWriting", true);
// Setup default priorities and enable/disable fetchers
pref("songbird.albumart.file.enabled", false);
pref("songbird.albumart.file.priority", -1);
pref("songbird.albumart.metadata.enabled", true);
pref("songbird.albumart.metadata.priority", 0);

// Show the 'rescan metadata' playlist command ?
pref("songbird.commands.enableRescanItem", false);

// Show secondary properties in playlist column pickers ?
pref("songbird.columnpicker.allowSecondaryProperties", false);

// If showing secondary properties, also show unlocalized ones ?
pref("songbird.columnpicker.allowUnlocalizedSecondaryProperties", false);

// video can be disabled in gstreamer (but is on by default)
pref("songbird.mediacore.gstreamer.disablevideo", false);

// playlist double click speed
pref("songbird.playlist.doubleclickspeed", 500);


// Prefs used to control database memory usage.  
//
// All prefs require a restart to take effect, and pageSize
// can only be changed before databases have been created.
//
// See http://www.sqlite.org/malloc.html for details
// 
// Also note that page cache and page size can be specified on a 
// per db basis with keys like
//  songbird.dbengine.main@library.songbirdnest.com.cacheSize
// This is the database GUID, not the filename (note no .db)

pref("songbird.dbengine.pageSize", 16384);
// Number of pages
pref("songbird.dbengine.cacheSize", 100);
// Number of pages to pre-allocate (avoids fragmentation)
//pref("songbird.dbengine.preAllocCacheSize", 500);  
// Number of scratch slots to use (should be roughly the 
// number of db query threads)
//pref("songbird.dbengine.preAllocScratchSize", 5);
// An upper limit (in bytes) on the amount of memory
// sqlite should try to use
//pref("songbird.dbengine.softHeapLimit", 0);

// Override settings for the web library
//pref("songbird.dbengine.web@library.songbirdnest.com.pageSize", 1024);
//pref("songbird.dbengine.web@library.songbirdnest.com.cacheSize", 160);

//
// Manage Files Preferences
//

pref("songbird.media_management.library.enabled", false);
// songbird.media_management.library.format.dir has no default due to platform-
// specific directory separator character
pref("songbird.media_management.library.format.file", "http://songbirdnest.com/data/1.0#trackNumber,%20-%20,http://songbirdnest.com/data/1.0#trackName");
pref("songbird.media_management.library.copy", true);
pref("songbird.media_management.library.move", true);
pref("songbird.media_management.library.delete", true);
pref("songbird.media_management.library.rename", true);
// pad track numbers by default.
pref("songbird.media_management.library.pad_track_num", true);

pref("songbird.library_exporter.start_agent", true);

// CD Rip default prefs:
pref("songbird.cdrip.oncomplete.autoeject", false);
pref("songbird.cdrip.oncomplete.notifysound", false);

// First run Media Library loading
pref("songbird.firstrun.load_ml_in_background", true);

// Information Panel default settings
pref("songbird.infoPanel.interval", 50);
pref("songbird.infoPanel.steps", 4);

// Filtered extensions warning dialog
pref("songbird.mediaimport.warn_filtered_exts", true);

//
// Firmware Support Preferences
//
pref("songbird.firmware.update.defaultInterval", 604800); // every 7 days

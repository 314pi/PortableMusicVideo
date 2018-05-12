/* branding preferences */
//@line 3 "/e/builds/nightly/release/sb_win32bot03_release/build/branding/songbird-zzz-branding.js.in"

pref("app.update.url", "https://updates.songbirdnest.com/update/3/Songbird/%VERSION%/20130204082828/%BUILD_TARGET%/en-US/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/update.xml");
pref("app.update.url.manual", "http://getsongbird.com/");
pref("app.update.url.details", "http://www.songbirdnest.com/releasenotes/");

pref("extensions.update.url", "https://addon-files.songbirdnest.com/updates/3/Songbird/%VERSION%/20130204082828/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/%ITEM_VERSION%/%ITEM_ID%/update.rdf");
pref("extensions.getMoreExtensionsURL", "http://addons.songbirdnest.com/");
pref("extensions.getMoreThemesURL", "http://addons.songbirdnest.com/tag/feathers");

pref("extensions.blocklist.url", "https://addon-files.songbirdnest.com/blocklist/3/Songbird/%VERSION%/20130204082828/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/blocklist.xml");
pref("extensions.blocklist.detailsURL", "https://addon-files.songbirdnest.com/blocklist/3/Songbird/%VERSION%/");

pref("xpinstall.whitelist.add", "addons.songbirdnest.com");
pref("xpinstall.whitelist.add.0", "translate.songbirdnest.com");

// Remote API whitelist. Syntax: domain=permission
pref("songbird.rapi.whitelist.add", "birdhouse.songbirdnest.com=library_write");

// urls that connect to hummingbird
pref("songbird.url.bookmarks", "https://bookmarks.songbirdnest.com/3/Songbird/%VERSION%/20130204082828/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/bookmarks.xml");
pref("songbird.url.firstrun", "https://firstrun.songbirdnest.com/bundles/3/Songbird/%VERSION%/20130204082828/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/firstrun.xml");
pref("songbird.url.locales", "https://locales.songbirdnest.com/bundles/3/Songbird/%VERSION%/20130204082828/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/locales.xml");

pref("breakpad.reportURL", "http://crashreports.songbirdnest.com/report/index/");

// Search engines URL
pref("browser.search.searchEnginesURL",      "http://addons.songbirdnest.com/tag/search");

// Songbird default urls
pref("songbird.url.addons", "http://addons.songbirdnest.com/");
pref("songbird.url.addons.displaypanes", "http://addons.songbirdnest.com/tag/displaypane");
pref("songbird.url.addons.feathers", "http://addons.songbirdnest.com/tag/feathers");
pref("songbird.url.addons.mediaviews", "http://addons.songbirdnest.com/tag/mediaview");
pref("browser.startup.homepage", "http://birdhouse.songbirdnest.com/");
pref("songbird.url.homepage", "http://www.getsongbird.com/");
pref("songbird.url.bugzilla", "http://bugzilla.songbirdnest.com/");
pref("songbird.url.metrics", "http://metrics.songbirdnest.com/post/");
pref("songbird.url.subscribe", "http://getsongbird.us1.list-manage2.com/subscribe/post");
pref("songbird.url.support", "http://songbirdnest.com/support/");
pref("songbird.url.support.quicktime", "http://wiki.songbirdnest.com/Developer/Articles/Media_Cores/Setting_Up_QuickTime");
pref("songbird.url.support.corefailure", "http://wiki.songbirdnest.com/Developer/Articles/Media_Cores/Core_Wrapper_Failure");
pref("songbird.url.support.inaccessiblelibrary", "https://wiki.songbirdnest.com/Getting_Started_with_Songbird/08_First_Aid_(HELP!)/Inaccessible_Library");
pref("songbird.url.codec_not_found", "http://wiki.songbirdnest.com/Docs/Video_Codec_Support");

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

  var control = null;


  /**
   * Carries out any JS stuff that needs to be done to display the GUI properly.
   */
  function initDisplaying() {
    var containerElem = document.getElementById("sharing-statusbar-container");

    var separatorElem = containerElem.querySelector(".sharing-statusbar-separator");
    var thereAreAnyIconsToTheRightOfMe = !!containerElem.nextSibling;

    if ( ! thereAreAnyIconsToTheRightOfMe) {
      // We don't want to show any separator when there's no other icon to the right.
      separatorElem.setAttribute("hidden", "true");
    }
  }


  function onLoad(event) {
    dump("sharingDMS -> onLoad\n");

    sharingDMS.icon.statusObserver.startObserving();

    control = new sharingDMS.iconPopup.Observer();
    control.startObserving();

    initDisplaying();
    window.removeEventListener("load", onLoad, false);
  };


  function onUnload(event) {
    dump("sharingDMS -> onUnload\n");
    sharingDMS.icon.statusObserver.destroy();
    control.destroy();
  };

  window.addEventListener("load", onLoad, false);
  window.addEventListener("unload", onUnload, false);


  return my;

})(sharingDMS);



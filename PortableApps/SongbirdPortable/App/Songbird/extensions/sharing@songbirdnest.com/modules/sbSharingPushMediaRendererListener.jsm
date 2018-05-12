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

var EXPORTED_SYMBOLS = [ "sbSharingPushMediaRendererListener" ];

/***************************************************************************
 * sbSharingPushMediaRendererListener
 *  stock implementation of sbISharingPushMediaRendererListener
 *    override the methods in which you are interested
 */

function sbSharingPushMediaRendererListener() {
}

sbSharingPushMediaRendererListener.prototype = {
  onDeviceCmdError: function(aCmd) {},
  onDeviceStateReceived: function(aNewState) {},
  onSoundVolumeReceived: function(aNewVolume) {},
  onMuteStateReceived: function(aMuted) {},
  onPlayPositionReceived: function(aNewPlayPosition) {},
  onPlayableMediaFilterReceived: function() {},
  onCurrentItemReceived: function(item, uid) {},
  onCommandSent: function(aCmd, isBackgroundCmd) {},
  onCommandResponseReceived: function(aCmdQueueSize) {},
  onPlayableMediaFilterReceived: function() {}
}

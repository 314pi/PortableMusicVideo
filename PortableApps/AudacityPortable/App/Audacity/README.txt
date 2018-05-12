Audacity(R): free, open source, cross-platform audio software for 
multi-track recording and editing: https://www.audacityteam.org/ . 

User suppport is provided on Audacity Forum:
https://forum.audacityteam.org/ .

We welcome feedback on Audacity, suggestions for new or improved features, 
and bug reports. Please visit https://forum.audacityteam.org/viewforum.php?f=25 .

Audacity is copyright (c) 1999-2018 by Audacity Team. This copyright 
notice applies to all documents in the Audacity source code archive, 
except as otherwise noted (mostly in the lib-src subdirectories). 
"Audacity" is a registered trademark of Dominic Mazzoni. 

The Audacity documentation is licensed under the Creative Commons
Attribution 3.0 license: https://creativecommons.org/licenses/by/3.0/legalcode .

Compilation instructions for Audacity are provided in the source code:
* Windows: win\compile.txt
* macOS: mac/Build.txt
* GNU/Linux: INSTALL . 

You can ask for help with compilation problems at:
https://forum.audacityteam.org/viewforum.php?f=19 .

If you want to suggest some simple text change in our code, please submit a 
pull request on https://github.com/audacity/audacity/pulls . It's usually 
best to discuss functional code changes with us first on audacity-devel: 
https://lists.sourceforge.net/lists/listinfo/audacity-devel . 

Version 2.2.2

Contents of this README:

1.  Licensing
2.  Changes since version 2.2.1
3.  Known Issues at Release
4.  Source Code, Libraries and Additional Copyright Information

--------------------------------------------------------------------------------

1. Licensing

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version. The program source code is also freely
available as per Section 4 of this README.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public
License for more details.

You should have received a copy of the GNU General Public License
along with this program (in a file called LICENSE.txt); if not, go
to https://www.gnu.org/licenses/old-licenses/gpl-2.0.html or write to

  Free Software Foundation, Inc.
  59 Temple Place - Suite 330
  Boston, MA 02111-1307 USA


-------------------------------------------------------------------------------

2. Changes since version 2.2.1: 

Improvements

    * Dropout detection
      Dropout detection is controlled from a setting in Recording Preferences 
      called "Detect dropouts".
      When this setting is "on" (default setting) Audacity will detect dropouts 
      (brief gaps in the recording) and will insert zeroes into the recording 
      to keep the other good parts synchronized. These silent spans will make 
      the dropouts more obvious, but keep the duration of the recording correct.
      When recording stops, a Warning message box alerts the user and a label track, 
      called "Dropouts", is added showing the lost parts, labeled with consecutive numbers.
    * Improved horizontal zooming
      For this release we have improved the way zooming using your mouse wheel 
      works and provided a new Zoom Toggle function. 
    * Improved vertical zooming
      We have added a context menu to the vertical scale to control vertical zooming
      Previous vertical zooming methods (left-click in the vertical ruler, left-drag
      in the vertical ruler) remain available by selecting "Advanced Vertical Zooming"
      in Track Behaviors Preferences.
    * "Extra" menu
      The "Ext-Bar" and "Ext-Command" menus have been consolidated into the "Extra" menu.
    * Theme tweaks
      The appearance and/or contrast of a few icons has been improved.
    * Easier access to changing key bindings for shortcuts
      For menu commands that are enabled (not grayed-out) if you hold the Shift key 
      and click on the sub-menu item, instead of executing the command the Keyboard 
      Preferences pop open at the chosen command. You can then change that (or any 
      other) shortcut binding. 
    * Language selection in Preferences
      Interface Preferences has been upgraded so when selecting languages the proper
      spelling of these languages is shown with accented and special characters. 

Bug Fixes
   * Multiple use of "Save As" to the existing open project can result in data 
     corruption/loss
   * Crash undoing during record, using Discard button of History window
   * Exporting audio in compressed formats to device with insufficient space produces
     inconsistent/truncated results
   * In Export Multiple, Cancel does not remove the file that is in progress when 
     Cancel is chosen
   * Unicode page encodings fixed ( ͡° ͜ʖ ͡°)
   * Crash using SBSMS pitch change at low sample rate
   * (Mac) Equalization: "Telephone" curve displays a flat line, no sound on Preview
   * Toolbars: open undocked if previously not shown, unless Reset Toolbars first
   * Analysis effects that create labels should give focus to label track
   * Control value may be out of range when using FloatingPointValidator
   * Analysis effects produce false indication that a label is open for editing
   * Import Uncompressed File Dialog Incorrect Reference to Menu Item
   * Wave Color not grayed out in TCP dropdown menu when in Spectrogram view
   * Hover indication on note track channel toggle appears on all tracks (when 
     they rerender)
   * Installer has old logo for 2.2.1 and 2.2.0 
   
 See also: https://wiki.audacityteam.org/wiki/Release_Notes_2.2.2
 and: https://wiki.audacityteam.org/wiki/New_features_in_Audacity_2.2.2

-------------------------------------------------------------------------------

3. Known Issues in 2.2.2:

For known issues at release of 2.2.2 please see:
  https://wiki.audacityteam.org/wiki/Release_Notes_2.2.2/Issues 

Please also check:
  https://wiki.audacityteam.org/wiki/Known_Issues
for details of any issues that have been identified after release of
this version.


-------------------------------------------------------------------------------

4.  Source Code, Libraries and Additional Copyright Information

Source code to this program is always available; for more information visit
our web site at:

  https://www.audacityteam.org/download/source

Audacity is built upon other free libraries; some of these libraries may have
come with Audacity in the lib-src directory.  Others you are expected to install
first if you want Audacity to have certain capabilities.  Most of these libraries
are not distributed under the terms of the GPL, but rather some other free,
GPL-compatible license.  Specifically:

  expat: BSD-like license.
    Provides XML parsing.  Included with Audacity.

  FFmpeg: GPL or LGPL (according to how you obtain/configure it)
    Provides decoding/encoding of additional formats. Optional separate
    download.

  libid3tag: GPL
    Reads/writes ID3 tags in MP3 files.  Optional
    separate download as part of libmad.

  libflac: Xiph.Org BSD-like licence (the parts we use)
    Decodes and Encodes Free Lossless Audio Codec files. Optional separate
    download.

  libmad: GPL
    Decodes MP3 files.  Optional separate download.

  libnyquist: BSD-like license.
    Functional language for manipulating audio; available
    within Audacity for effects processing.

  libogg: BSD-like license.
    Optional separate download, along with libvorbis.

  libsndfile: LGPL
    Reads and writes uncompressed PCM audio files.
    Included with Audacity.

  libsoxr: LGPL
    The SoX Resampler library performs one-dimensional sample-rate conversion.

  libvamp: new-style BSD
    Plug-in interface and support library for audio analysis plug-ins.
    Included with Audacity.

  libvorbis: BSD-like license.
    Decodes and encodes Ogg Vorbis files.  Optional
    separate download.

  lv2: a merging of the lilv (ISC license), lv2 (LGPL), msinttypes, serd (ISC), 
    sord, sratom, and suil libraries to support LV2 plug-ins. 

  portsmf: BSD-like license.
    library for reading and writing midi files. Included with Audacity

  sbsms: GPL v2
    Pitch and tempo changing library. Included in Audacity

  SoundTouch: LGPL
    Changes tempo without changing pitch and vice versa.
    Included in audacity

  Twolame: LGPL
    Encodes MPEG I layer 2 audio (used in DVDs and Radio). Optional separate
    download.

  wxWidgets: wxWindows license (based on LGPL)
    Cross-platform GUI library - must be downloaded and
    compiled separately.


For more information, see the documentation inside each library's
source code directory.

--------------------------------------------------------------------------------
Additional copyright information:
--------------------------------------------------------------------------------

Nyquist

Copyright (c) 2000-2002, by Roger B. Dannenberg
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.

Redistributions of source code must retain the copyright notice, the
list of conditions, and the disclaimer, all three of which appear below under
"COPYRIGHT AND LICENSE INFORMATION FOR XLISP."

Redistributions in binary form must reproduce the above copyright notice, this
list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.

Redistributions in binary form must reproduce the copyright notice, the
list of conditions, and the disclaimer, all three of which appear below under
"COPYRIGHT AND LICENSE INFORMATION FOR XLISP," in the documentation
and/or other materials provided with the distribution.

Neither the name of Roger B. Dannenberg, Carnegie Mellon University, nor the
names of any contributors may be used to endorse or promote products derived
from this software without specific prior written permission.

COPYRIGHT AND LICENSE INFORMATION FOR XLISP (part of Nyquist):

Copyright (c) 1984-2002, by David Michael Betz
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this
list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.

Neither the name of David Michael Betz nor the names of any contributors may be
used to endorse or promote products derived from this software without specific
prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER AND
CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

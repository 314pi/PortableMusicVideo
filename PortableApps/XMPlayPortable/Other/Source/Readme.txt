XMPlay Portable Launcher
========================
Website: http://portableapps.com/apps/music_video/xmplay_portable

This software is OSI Certified Open Source Software.
OSI Certified is a certification mark of the Open Source Initiative.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.

LICENSE
=======
This package and its launcher are released under the GPL. The launcher is the 
PortableApps.com Launcher, available with full source and documentation from 
http://portableapps.com/development.

The base application's source code (if applicable) is available from the 
portable app's homepage.

ABOUT XMPLAY PORTABLE
=====================
The XMPlay Portable Launcher allows you to run XMPlay from a removable drive 
whose letter changes as you move it to another computer. The application can be 
entirely self-contained on the drive and then used on any Windows computer.

INSTALLATION / DIRECTORY STRUCTURE
==================================
By default, the program expects the following directory structure:

-\ <--- Directory with XMPlayPortable.exe
	+\App\
		+\XMPlay\
	+\Data\
		+\settings\
		+\xmplay\

XMPLAYPORTABLE.INI CONFIGURATION
================================
The XMPlay Portable Launcher will look for an INI file called XMPlayPortable.ini 
in the same directory as XMPlayPortable.exe (copy from Other\Source). The INI 
file is formatted as follows:

AdditionalParameters=
DisableSplashScreen=false
RunLocally=false

The AdditionalParameters entry allows you to pass additional commandline 
parameter entries to xmplay.exe. Whatever you enter here will be appended to the 
call to xmplay.exe.

The DisableSplashScreen entry allows you to run the XMPlay Portable Launcher 
without the splash screen showing up. The default is false.

The RunLocally entry allows you to set XMPlay Portable to run from the local 
machine's temp directory. This can be useful for instances where you'd like to 
run XMPlay Portable from a CD or when you're working on a machine that may have 
spyware or viruses and you'd like to keep your device set to read-only mode. The 
only caveat is, of course, that any changes you make that session aren't saved 
back to your device. When done running, the local temp directories used by 
XMPlay Portable are removed.

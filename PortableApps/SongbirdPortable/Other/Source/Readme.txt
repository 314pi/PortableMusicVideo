Songbird Portable Launcher
==========================
Copyright 2004-2009 John T. Haller
Copyright 2007-2009 Michael Secord

Website: http://PortableApps.com/SongbirdPortable

This software is OSI Certified Open Source Software.
OSI Certified is a certification mark of the Open Source Initiative.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

ABOUT SONGBIRD PORTABLE
=======================
The Songbird Portable Launcher allows you to run Songbird from a removable drive whose
letter changes as you move it to another computer.  The application can be entirely self-
contained on the drive and then used on any Windows computer.


LICENSE
=======
This code is released under the GPL.  The full code is included with this package as
SongbirdPortable.nsi.


INSTALLATION / DIRECTORY STRUCTURE
==================================
By default, the program expects one of these directory structures:

-\ <--- Directory with SongbirdPortable.exe
	+\App\
		+\AppInfo\
		+\DefaultData\
		+\Songbird\
		+\SQLite\
	+\Data\
		+\settings\


It can be used in other directory configurations by including the SongbirdPortable.ini
file in the same directory as SongbirdPortable.exe and configuring it as details in the
INI file section below.


SONGBIRDPORTABLE.INI CONFIGURATION
==================================
The Songbird Portable Launcher will look for an ini file called SongbirdPortable.ini
within its directory.  If you are happy with the default options, it is not necessary,
though.  There is an example INI included with this package to get you started.  The
INI file is formatted as follows:

[SongbirdPortable]
SongbirdDirectory=App\Songbird
SQLiteDirectory=App\SQLite
ProfileDirectory=Data\profile
SettingsDirectory=Data\settings
SongbirdExecutable=Songbird.exe
AdditionalParameters=
DisableSplashScreen=false
AllowMultipleInstances=false
DisableIntelligentStart=false
SkipCompregFix=false
RunLocally=false

The SongbirdDirectory, SQLiteDirectory, ProfileDrectory and SettingsDirectory entries
should be set to the *relative* path to the directories containing Songbird.exe, your
profile, your plugins, etc. from the current directory.  All must be a subdirectory
(or multiple subdirectories) of the directory containing SongbirdPortable.exe.  The
default entries for these are described in the installation section above.

The SongbirdExecutable entry allows you to set the Songbird Portable Launcher to use
an alternate EXE call to launch Songbird.  This is helpful if you are using a machine
that is set to deny Songbird.exe from running.  You'll need to rename the Songbird.exe
file and then enter the name you gave it on the SongbirdExecutable= line of the INI.

The AdditionalParameters entry allows you to pass additional commandline parameter
entries to Songbird.exe.  Whatever you enter here will be appended to the call to
Songbird.exe.

The DisableSplashScreen entry allows you to run the Songbird Portable Launcher without the
splash screen showing up.  The default is false.

The AllowMultipleInstances entry will allow Songbird Portable to run alongside your
regular local copy of Songbird if you set it to true (lowercase).  The default is false.

The DisableIntelligentStart entry allows you to to have Songbird Portable run its chrome
and component registry fixes on every start.  Normally, it tracks when you've moved to a
new path (switching PCs for instance) and only processes the chrome and component
registry when you do.  By skipping it when the path is the same, Songbird Portable starts
up faster.  But, if you copy a profile into Songbird Portable between sessions (it handles
a copy in on first run automatically), it won't know to process these.  This usually
happens if you copy a profile into Songbird Portable from your local PC on a regular basis
with a sync utility that doesn't work with Songbird Portable (like Portable Apps Sync
does).  Setting this to true causes Songbird Portable to process each on every start.

The SkipCompregFix entry allows you to set Songbird Portable not to adjust the component
registry (compreg.dat) for certain extension compatibility on launch.  It is useful if
you are only using Songbird Portable on computers you control and are able to have the
drive letter set the same each time or if you are not using extensions which make use of
the component registry (like Forecast Fox or the Mozilla Calendar) as Songbird Portable
will launch more quickly.  Set it to true (lowercase) to skip chrome.rdf processing.  The
default is false.

The RunLocally entry allows you to set Songbird Portable to copy your profile, plugins and
Songbird binaries to the local machine's temp directory.  This can be useful for instances
where you'd like to run Songbird Portable from a CD (aka Songbird Portable Live) or when
you're working on a machine that may have spyware or viruses and you'd like to keep your
device set to read-only mode.  The only caveat is, of course, that any changes you make
that session (cookies, bookmarks, etc) aren't saved back to your device.  When done
running, the local temp directories used by Songbird Portable are removed. RunLocally does
not currently work with AllowMultipleInstances as it cannot track which version of
Songbird is running.


PROGRAM HISTORY / ABOUT THE AUTHOR
==================================
This launcher grew from the work of John T. Haller on his Firefox Portable and Thunderbird 
Portable Launchers.  Some of the ideas arose from discussions relating to Firefox Portable &
Thunderbird Portable in the mozillaZine forums.
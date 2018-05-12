MuseScore Portable Launcher
============================
Copyright 2004-2018 John T. Haller
Copyright 2008-2018 Bart.S

Website: http://PortableApps.com/MuseScorePortable

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


ABOUT MUSESCORE PORTABLE
=========================
The MuseScore Portable Launcher allows you to run MuseScore from a removable drive whose 
letter changes as you move it to another computer. The program can be entirely self-
contained on the drive and then used on any Windows computer.


LICENSE
========
This code is released under the GPL. The source is included with this package as 
MuseScorePortable.nsi.


INSTALLATION / DIRECTORY STRUCTURE
===================================
By default, the program expects the following directory structure:

-\ <--- Directory with MuseScorePortable.exe
	+\App\
		+\MuseScore\
	+\Data\
		+\settings\

It can be used in other directory configurations by including the MuseScorePortable.ini 
file in the same directory as MuseScorePortable.exe and configuring it as details in the 
INI file section below.


MUSESCOREPORTABLE.INI CONFIGURATION
====================================
The MuseScore Portable Launcher will look for an ini file called MuseScorePortable.ini 
within its directory (see the Installation/Directory Structure section above for more 
details). If you are happy with the default options, it is not necessary, though. The 
INI file is formatted as follows:

[MuseScorePortable]
MuseScoreDirectory=App\MuseScore
SettingsDirectory=Data\settings
MuseScoreExecutable=MuseScore.exe
AdditionalParameters=
DisableSplashScreen=false


The MuseScoreDirectory and SettingsDirectory entries should be set to the *relative* path to the 
appropriate directories from the current directory. They must be a subdirectory (or multiple 
subdirectories) of the directory containing MuseScorePortable.exe. The default entries for these are 
described in the installation section above.

The MuseScoreExecutable entry allows you to set the MuseScore Portable Launcher to use an alternate EXE 
call to launch MuseScore. This is helpful if you are using a machine that is set to deny MuseScore.exe 
from running. You'll need to rename the MuseScore.exe file and then enter the name you gave it on 
the MuseScoreExecutable= line of the INI.

The AdditionalParameters entry allows you to pass additional commandline parameter entries to 
MuseScore.exe. Whatever you enter here will be appended to the call to MuseScore.exe.

The DisableSplashScreen entry allows you to run the MuseScore Portable Launcher without the 
splash screen showing up. The default is false.

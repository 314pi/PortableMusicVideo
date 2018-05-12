/******************************************************************************/
/*                                                                            */
/*  AutoDrum4.2 - read me first                            (C)2002-2016 kuzu  */
/*                                                                            */
/******************************************************************************/

Thank you for downloading AutoDrum4.2. This file includes basic information 
and basic notice. Please read this file first. For detail, please see 
AutoDrum_en.pdf in docs folder.


### features ###

"AutoDrum 4.2" is free, open source automatic drum performance software.
This software will helps you to compose music or practice your instrument.
You can use 13 preset rhythm patterns and also use your original patterns made
by your MIDI sequencer. The tempo can be changed at any time, and the tempo 
can also slave to external machine. The Mixer enables you to adjust the velocity
of each instrument or mute each instrument. Additionally, synchro start and
synchro stop function enables you to start and stop drum performance with 
playing your MIDI keyboard if it is connected. 

### Requirement ###

 * OS            : Microsoft Windows XP/Vista/7/8.1/10
 * CPU           : About Core2Duo
 * Memory        : About 2GB
 * Hard disk     : about 10MB
 * Monitor       : A full color display whose area is 640 * 480 pixel or larger.
 * MIDI module   : Hardware MIDI module or software MIDI module (VSTi is impossible).
 * MIDI keyboard : Hardware MIDI keyboard (option).
 * others        : Sound environment (Amplifier, loudspeakers, or headphones).
 

### Contents ###

AutoDrum4.2
|-license.txt           Lisence Text
|-AutoDrum.exe          Application [essential]
|-AutoDrum.exe.manifest Manifest file (text)
|-AutoDrum.ini          Configuration file (text) [Essetial]
|-AutoDrum.mak          C/C++ make file
|-AutoDrum.sln          Visual Studio 2008 Standard Edition SP1 solution file
|-AutoDrum.vcproj       Visual Studio 2008 Standard Edition SP1 project file
|-AutoDrumEnu.dll       English resouce DLL [Essetial]
|-AutoDrumJpn.dll       Japanese resouce DLL [Essetial]
|-AutoDrumChs.dll       Chinese resouce DLL [Essetial]
|-MIDIIO.dll            MIDI Message Input / Output library DLL [Essetial]
|-MIDIData.dll          MIDI Data creating and editing library DLL [Essetial]
|-MIDIClock.dll         MIDI Clock measurement library DLL [Essetial]
|-MIDIStatus.dll        MIDI module status keeping library DLL [Essetial]
|-readme.txt            Read me first (Japanese)
|-readme_en.txt         Read me first (English)
|-src                   C/C++ source files, header files, resouce script foleder
| |-AutoDrum.c          C source file
| |-AutoDrum.rc         C/C++ resource file (language common)
| |-resouce.h           C/C++ resource header file
| !-winver.h            Windows version header file
|-res                   Resouce folder (bitmaps, icons, cursors and so on).
| !-AutoDrum.ico        AutoDrum main icon
|-AutoDrumRes           AutoDrum Language Resource folder
| |-AutoDrumEnu.rc      AutoDrum Resource script for English.
| |-AutoDrumJpn.rc      AutoDrum Resource script for Japanese.
| |-AutoDrumChs.rc      AutoDrum Resource script for Chinese.
| |-AutoDrumRes.rc      AutoDrum Resource script for common
| |-AutoDrumRes.mak     AutoDrum Resource make file
| |-AutoDrumRes.sln     Visual Studio 2008 Standard Edition SP1 solution file
| !-AutoDrumRes.vcproj  Visual Studio 2008 Standard Edition SP1 project file

|-docs                  Documentations folder
| |-AutoDrum.odt        User manual (OpenOffice) (Japanese)
| |-AutoDrum.pdf        User manual (PDF) (Japanese)
| |-AutoDrum_en.odt     User manual (OpenOffice) (English)
| |-AutoDrum_en.pdf     User manual (PDF) (English)
| |-AutoDrum_ch.odt     User manual (OpenOffice) (Chinese)
| !-AutoDrum_ch.pdf     User manual (PDF) (Chinese)
|-patch                 Patch MIDI data folder [essential]
| |-001_Standard.mid    
| |-002_Standard2.mid   
| |-009_Room.mid        
| |-017_Power.mid       
| |-025_Electronic.mid  
| |-026_TR808.mid       
| |-033_Jazz.mid        
| |-041_Brush.mid       
| !-049_Orchestral.mid  
!-pattern               Pattern MIDI data folder [essential]
  |-8beat_01.mid        
  |-8beat_02.mid        
  |-16beat_01.mid       
  |-16beat_02.mid       
  |-Disco_01.mid        
  |-Disco_02.mid        
  |-March_01.mid        
  |-March_02.mid        
  |-March_03.mid        
  |-Swing_01.mid        
  |-Tango_01.mid        
  |-Waltz_01.mid        
  !-Waltz_02.mid        

  !NOTE!  Windows's default setup will be configured not to show dll extensition 
  files in the "explorer" or "my computer". In that case, switch on "Show all 
  folders and files" in the "View" tab of the options dialog of the "explorer" or 
  "my computer", whose dialog may be opened from the "Tool" - "Options..." menu. 
  Also Switch off "Hide extension" in the same tab.



### How to install and execute ###

This software has no installer. You may install by following step.

(1) Please extract "AutoDrum4.2.zip" on your hard disk.

  !WARNING!  If you forget to extract, AutoDrum will not be executed.
  !WARNING!  You should not put the program in c:\program files,
  c:\program files(x86), or c:\windows folder. It is blocked to
  write configuration file (*.ini) by Windows's security.

(2) Please double click "AutoDrum.exe" on "explorer" or "my computer"
  and MIDITester main window will be opend.
  
  !WARNING!  You should execute AutoDrum on your local computer.
  Execution from network computer will cause some trouble.

(3) First you must select MIDI In device, MIDI Out device, 
  to fit your using MIDI device from "MIDI Device..." menu of AutoDrum.
  Default configuration is "(None)" for MIDI In Device, and "MIDI Mapper"
  for MIDI Out Device.

  !WARNING!  If you select "(None)" as MIDI Out device, nothing will be sound.

### How to change language ###

AutoDrum is made in Japan, therefore default GUI language is Japanese.
You may select English language, there is two way to change language. 
(1) is from GUI, (2) is form text editor.

(1) Push "Language..." button and select language in the dialog, 
  and restart MIDITester. If it seems to be character corruption, press [Alt]+[L], 
  and you may open the dialog.

(2) Open "AutoDrum.ini" in your text editor, change "UserInterface=Japanese" into
  "UserInterface=English", and execute AutoDrum.


### How to uninstall ###

This software has no uninstaller. You may uninstall by following step.

(1) Delete "AutoDrum4.2" folder on "explorer" or "my computer".



### License ###

(1) This software is released under the terms of GNU LGPL (Lesser General Public 
  License).

(2) This software is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

(3) This software links following Dinamic Link Library (DLL).
 * AutoDrumJpn.dll      (c)2016 kuzu / OpenMIDIProject  License = GNU LGPL
 * AutoDrumEnu.dll      (c)2016 kuzu / OpenMIDIProject  License = GNU LGPL
 * AutoDrumChs.dll      (c)2016 kuzu / OpenMIDIProject  License = GNU LGPL
 * MIDIIO.dll           (c)2016 kuzu / OpenMIDIProject  License = GNU LGPL
 * MIDIData.dll         (c)2016 kuzu / OpenMIDIProject  License = GNU LGPL
 * MIDIClock.dll        (c)2014 kuzu / OpenMIDIProject  License = GNU LGPL
 * MIDIStatus.dll       (c)2014 kuzu / OpenMIDIProject  License = GNU LGPL

  !Warning! If you lost dll, AutoDrum may not be executed.


### History ###

2003/08/11 AutoDrum1.0 Release.
 * Non-Free, closed source "AutoDrum1.0" is released with many bug.

2006/08/07 AutoDrum1.1 Unrelease
 * MIDIClockLibrary is used and the source code is modified.
 * MISIStatusLibarary is used and the source code is modified.
 * Change CloseHandle into FindClose for NTDLL.dll of WindowsXP.
 * Other some bug is fixed.

2007/06/06 AutoDrum1.2 Release.
 * Becomes free and open souce, released under the terms of GNU LGPL.
 * MIDIDataInfoDlg.dll is not used and the source code is modified.
 * MIDIDeviceDlg.dll is not used and the source code is modified.
 * Other some bug is fixed.

2008/01/02 AutoDrum1.3 Release
 * A bug that the main window becomes white color in WindowsXP is fixed.
 * AutoDrum.exe.manifest is added to fit the theme of WindowsXP.
 * When loading SMPTE Base MIDIData, it becomes to stop safelly.
 * This MIDIData's Property Dialog becomes to show more detail information.
 * MIDIIO.dll is updated.
 * MIDIData.dll is updated.
 * MIDIClock.dll is updated.
 * MIDIStatus.dll is updated.
 * Arrange variable and function name in the source code.

2008/03/31 AutoDrum1.4 Release
 * MIDIIO.dll is updated.
 * MIDIData.dll is updated.
 * MIDIClock.dll is updated.
 * MIDIStatus.dll is updated.
 * Add MIN,MAX,CLIP macro in the source code.

2009/07/05 AutoDrum1.5 Release
 * A bug that note off is not sended when playing is fixed.
 * MIDIIO.dll is updated.
 * MIDIData.dll is updated.
 * MIDIClock.dll is updated.
 * MIDIStatus.dll is updated.
 * Implement slave mode by SMPTE/MTC.
 * Implement enable to send MIDI sync signal.

2012/01/22 AutoDrum1.6 Release
 * Language dialog is added.
 * Implement English language version (GUI / documentation).
 * MIDIData.dll is updated.
 * Whole source code is refactoringed.
 * A bug that there is no EndDialog of the main dialog is fixed.

2012/03/04 AutoDrum1.7 Release.
 * A whole source code is refactoringed.
 * MIDIIOLibrary is updated to 0.7.
 * MIDIDataLibrary is updated to 2.6.

2014/12/28 AutoDrum4.0 Release.
 * Correspond to Unicode.
 * Develop environment becomes new VisualC++ 2008 Standard Edition SP1 from old VisualC++ 4.0.
 * In the Language dialog, default text encoding becomes selectable.
 * UserInterface font is modified.
   * UserInterface=Japanese : MS P Gothic -> MS UI Gothic
   * UserInterface=English : MS Sans Serif -> Microsoft Sans Serif
 * User Interface correspond to WindowsXP/Vista/7/8.1 's theme.
 * MIDIIOLibrary is updated to 1.0.
 * MIDIDataLibrary is updated to 3.1.
 * MIDIClockLibrary is updated to 1.0.
 * MIDIStatusLibarary is updated to 0.9.

2015/05/04 AutoDrum4.1 Release.
 * Windows10 Insider Preview 10074 compliant.
 * Standard MIDI File(*.mid)'s reading ability is enhanced.
 * Implement Chinese language version (GUI / documentation).
 * MIDIDataLibrary is updated to 3.2.

2016/06/26 AutoDrum4.2 Release.
 * Windows10 compliant.
 * "0-Windows Control Panel ANSI Code Page" is added as default text encoding.
 * MIDIIOLibrary is updated to 1.1.
 * MIDIDataLibrary is updated to 3.4.
 
### Contact ###

Mail to (temporary) :  ee65051@yahoo.co.jp
Project home page :  http://openmidiproject.osdn.jp/index.html

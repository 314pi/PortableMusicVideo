*                                                                              *
* Note: This readme file isn't updated any longer. Please use the HTML help    *
*       instead.                                                               *
*                                                                              *

cdrtfe 1.3pre2 - cdrtools Frontend
==================================

Introduction
------------
cdrtfe is a Win32 frontend for some functions of Jörg Schillings cdrtools.
With VCDImager VideoCDs can be created. Furthermore, cdrtfe supports the basic
funcions of the Mode2CDMaker which makes it possible to create CDs that can
contain about 13% more data as usual (Mode 2 Form 2: 738 MiByte instead of
650 MiByte, 795 MiByte instead of 700 MiByte). [1]

Copyright (c) 2004-2007 Oliver Valencia
Copyright (c) 2002-2004 Oliver Valencia, Oliver Kutsche

cdrtfe is free software (GNU General Public License).


System requirements
-------------------
* IBM compatible PC
* Windows 9x/ME/2000/XP (tested with Win95, Win98SE, Win2000, WinXP)
* only for Win9x/ME: working ASPI Layer (e.g. Adaptec ASPI 4.60)

necessary programs/tools:
* cdrtools (cdrecord.exe, mkisofs.exe; optional: cdda2wav.exe, readcd.exe)
* cygwin1.dll
* sh.exe (under Win9x for on the fly writing)

optional programs/tools:
* Mode2CDMaker
* Mode2/Form2 File Extractor (m2f2extract.exe), dat2file.exe, d2fgui.exe
* rrenc/rrdec
* VCDImager
* madplay
* lame
* oggdec
* oggenc
* flac
* cdrdao

To run cdrtfe you need the cdrtools, at least the files cdrecord.exe and
mkisofs.exe. Since cdrtfe 1.1 both cdrtools versions (cygwin and Mingw) are
supported, however, at the moment cdrtfe cannot write CDs on-the-fly with the
Mingw version under Win9x, ME.

If the cygwin version of the cdrtools is used, the file sh.exe is needed to burn
CDs on the fly under Win9x, ME. With Win2k and WinXP this is not necessary,
however, if sh.exe is found in the cdrtfe directory, it will be used (only with
the cygwin version of the cdrtools).
sh.exe is not part of the win32 binary packages. It can be downloaded separately
(see below).

cdrtfe has been tested with cdrdao version 1.1.5 and 1.1.7. cdrdao needs the
file cygwin1.dll.

The Mode2CDMaker version has to be at least 1.5.1, older version are not
supported. dat2file.exe should be abailable, too. The additional error
protection needs rrenc.

To create VideoCDs the VCDImager is needed, which requires the file cygwin1.dll.

MP3 files can be used as source files for Audio CDs, if madplay (0.15.2) is
available. To use files in the ogg format oggdec is needed, for files in the
FLAC format flac.

The encoding of CD tracks into mp3, Ogg Vorbis or FLAC format is only possible,
if the respective program (lame, oggenc, flac) is available.

If the cygwin version of the cdrtools is used, the file cygwin1.dll is needed.
The file cygwin1.dll can either be together with the cdrtools and cdrtfe in one
directory or somewhere else in the searchpath.


Installation
------------
Download and execute the setup file. Follow the instructions.

or

Download the current cdrtfe version from the download page.

Download all necessary and the desired optional programs and tools:
  cdrtools, cygwin1.dll, Mode2CDMaker, rrenc/rrdec, VCDImager, madplay, lame,
  oggdec, oggenc, flac, sh.exe, cdrdao, Mode2Form2 File Extractor

Extract all archives into a folder.

Start cdrtfe by double clicking the file cdrtfe.exe.

If you want to write DVDs, you need a DVD capable version of cdrecord. Read
readme_dvd_en.txt for more information.


Notes for users of previous versions
------------------------------------
With cdrtfe version 1.0 some changes have been introduced which may affect users
of previous versions (0.8 - 0.9.2):

* The format of the project files (*.cfp and *.cfp.files) has been changed.
  Project files created with cdrtfe 0.8 to 0.9.2 cannot be used with cdrtfe 1.0
  (and above) any longer.

* As settings are now saved to an ini file, cdrtfe 1.0 will ignore settings of
  an older version which are saved to the registry. This applies to the
  additional commandline options, too.
  These settings should be deleted before using cdrtfe 1.0: dialog 'Settings',
  section 'Save settings', button 'delete' and section 'additional commandline
  options', button 'delete lists'.

* The information needed to use the ShellExtension are now saved at another
  location in the registry.
  Before the ShellExtensions can be used with cdrtfe 1.0, they have to be de-
  activated with the old program: dialog 'Settings', section 'ShellExtensions',
  button 'deactivate'. Then the old cdrtfeShlEx.dll has to be replaced with the
  newer version 1.0.0.1 (included with the zip-archive).
  Now the ShellExtensions can be regsitered again using cdrtfe 1.0 (dialog
  'Settings').


Language
--------
The file cdrtfe_lang.ini allows to select the language used by cdrtfe. The
default setting is English. When cdrtfe_lang.ini is missing the default
language is German. You can add any language you wish. See cdrtfe_lang.ini for
more information.

Beginning with cdrtfe 1.1pre2 the language can be changed during runtime (menu
'Extras') provided that the file cdrtfe_lang.ini is present and contains at
least two language profiles.

Since cdrtfe 1.2 the currently selected language is saved to the cdrtfe.ini. So,
on a multi user system (like WinXP), each user can specify his preferred
language.


Usage
-----
It is quite simple to use cdrtfe. Just add files or folders to the file list,
adjust the settings, select the writer and click the 'Start'-Button. Then a CD
will be written according to the settings of the actual tab sheet.

You can add files or folders by using the buttons, the context menu or by drag
and drop. It is also possible to use cdrtfe with commandline options (see
below).


Project files
-------------
cdrtfe's current status can be saved in project files: Open the menu 'Project',
select the entry 'Save project' and enter a name for the project file. All
settings (including all selected files and folders) will be saved.

The settings will be written to the file <name>.cfp. The files you have added
to a CD or XCD project (including the directory structure) and the audio and
video tracks selected in the Audio CD and VideoCD project will be saved to the
file <name>.cfp.files. If no files have been added, <name>.cfp.files will not
be created.

With 'Load project' from the project menu you can load project files into
cdrtfe. There is also a commandline option to do the same.

Hint: As the storage is file orientated cdrtfe cannot detect changes within the
      source files. New files, for example, will not be added automatically to
      the project.
      cdrtfe can only detect when a source file listed in <name>.cfp.files is
      missing. In this case an error message will be displayed.

Settings loaded from a project file override settings which have been loaded
during the start of cdrtfe.

With version 1.0 the file format has changed. So project files created with
older versions of cdrtfe cannot be used any longer.

Beginning with version 1.1 it is possible to load and save the file lists
seperately from the settings.

The entry 'Defaults' loads the default settings from the file cdrtfe.ini without
changing the file lists.

The entry 'Clear all' load the default settings and clears all file lists.


General hints
-------------
* Hints, messages or the output from the commandline programs are displayed in
  the memo in the lower part of the main window. There is a small button at the
  lower right corner of the memo which opens a bigger window for the output.
  Right-click the button to open a context menu which offers to clear the output
  window or to save the output.

* A right click on the drive selection combobox opens a context menu which
  allows to open or close the selected drive.

* If no CD writer is found, you still can create images with cdrtfe.

* If the writing speed is not set, cdrecord will write with the highest speed
  possible. If the speed is set to 0, the lowest possible writing speed will
  be used.

* After the selected action has been startet, a button 'Abort!' will appear
  which stops the execution of the commandline program. Attention: This only
  makes sense during the 10 second countdown before the writing process starts.
  If mkisofs, Mode2CDMaker or cdda2wav have already written some data to the
  disk, these files will not be deleted automatically, wenn you stop the
  execution by clicking 'Abort!'.

* The function 'Show capacity' (tab sheet 'CD-Infos') does not work correctly in
  all cases and should not be used with normal CD-ROM drives. Otherwise totally
  wrong values could be the result.

* Further information regarding the DVD support in the file readme_dvd_en.txt.

* cdrtfe needs write access to the program folder or the user directory to write
  temporary files (file lists, ...). This is the reason that it cannot be run
  from a read only medium (e.g. CD). With cdrtfe 1.1pre5 it is now possible to
  add the entry 'AskForTempDir=1' to the cdrtfe.ini, section [General]. Then the
  program will ask for a folder in which it will write the temporary files.

* Unless specified otherwise, cdrtfe will use %TEMP%\image.iso as default for
  image files and %TEMP%\ as temporary folder for wave files.

* When cdrtfe runs the commandline tools the taskbar entry displays the progress
  of the current action (if possible):

    [I: x%]    Image creation.
               mkisofs     : progress of image creation
               Mode2CDMaker: progress of each file being processed

    [Ty: x%]   cdrecord: progress of writing track number y

    [Blanking] cdrecord: blanking a disc

    [Fixating] cdrecord: fixating a disc

    [V: x/y]   cdrtfe: Verification: x of y files processed

    [D: x/y]   cdrtfe: Scanning for duplicate files

    [X: x/y]   cdrtfe: Creating XCD info file

    [active]   other tasks being performed

* F12 causes the cdrtfe main window to stay on top of all windows.


Portable mode
-------------
When started for the first time under Win NT/2k/XP cdrtfe creates a folder
'cdrtfe' in the directory of the current user. Settings (cdrtfe.ini, see below)
and some temporary files are stored here.

cdrtfe can be forced to save all settings and temporary file in its own program
folder. To achieve this there are two possibilites:

  - Run cdrtfe with the commandline option /portable.

  - Create the file cdrtfe.ini in the program folder of cdrtfe with at least the
    followinf lines:

      [General]
      PortableMode=1

Of course this only works, if the the current user has write access to the
cdrtfe program folder.

Under Win9x/ME these settings have no effect.


cdrtfe - Settings
-----------------
* Tab sheet 'cdrtfe': general settings for cdrtfe

  - Use ShellExtensions
    When activated files and folders can directly be sent from the explorer to
    cdrtfe using the context menu. The ShellExtensions are designed for a use
    under Win9x (see section 'ShellExtensions').
    Under Win2k and XP the same function can be achieved by using shortcut links
    in the 'Send to'-Menu. The ShellExtension can be (de-)activated with
    administrator privileges only.

  - Confirmation
    The confirmation dialogs before the writing process begins can be de-
    activated. In this case the CD will be written immediately without further
    confirmation when the 'Start'-Button is clicked.
    This also apllies to the confirmation dialogs when deleting files or folders
    from a project.

  - Save settings
    The current settings can be set as default by clicking the button 'Save' in
    the dialog 'Settings', 'Save Settings'. The current status of cdrtfe will
    then be saved to the file cdrtfe.ini The button 'Delete' will remove these
    information again.

    If the file cdrtfe.ini is found during the start of the program the settings
    will be loaded automatically.

    Under Win9x the file cdrtfe.ini is created in the program folder of cdrtfe.
    Under Win2k/XP it will be created in one of the following folders:
    1. Documents and Settings\<user>\Local Settings\Application Data\cdrtfe
    2. Documents and Settings\<user>\Application Data\cdrtfe
    3. Documents and Settings\All Users\Application Data\cdrtfe
    4. <program folder of cdrtfe>
    When starting cdrtfe the first cdrtfe.ini that is found will be loaded. The
    folders are searched in above order.

    Unlike previous versions cdrtfe 1.0 now saves the additional commadline
    options, too. File lists will not be saved.

    When loading a project file those settings will override the settings from
    the registry.

    cdrtfe ignores registry settings of previous versions (0.8 - 0.9.2).

  - temporary files
    When creating an Audio CD from MP3 files these files have to be converted
    into wave files. These temporary files are saved to the folder specified
    here. After the CD has been written they will be deleted automatically.

* Tab sheet 'cdrecord': settings for cdrecord and mkisofs

  - More detailed output
    This option causes cdrecord to give a more detailed output.

  - Use burnfree
    This activates the buffer underrun protection, if available.

  - Simulation Driver
    With this option cdrecord uses a driver which only simulates a CD writer.
    This is useful for timing tests at any speed.

  - Set size of FIFO buffer
    Set the size of the buffer that is used by cdrecord when writing otf. The
    buffer should have at least the size of the CD writer's internal buffer. The
    maximum size should be half of the physical memory of the computer.

  - additional commandline options
    It is possible to specify additional options for cdrecord and mkisofs which
    are not directly supported by cdrtfe.

* Tab sheet 'cdrecord (2)': more settings for cdrecord

  - Writing speed
    Since version 2.01a33 cdrecord checks the maximum DMA speed of the system
    and sets a maximum writing speed which allows writing without buffer
    underruns.

    This option allows to set the writing speed up to the maximum DMA speed.

  - Eject
    Select this option to eject the CD/DVD automatically after the writing
    process has finished.

* Tab sheet 'cdrdao': settings for cdrdao

  - CUE images
    With cdrecord version 2.01a24 (or newer), CUE/BIN images will be written
    with cdrecord by default. With this option cdrtfe can be forced to use
    cdrdao instead.

  - cdrdao driver
    If cdrdao cannot find a driver for the CD writer, you can force cdrdao to
    use either the driver 'generic-mmc' or 'generic-mmc-raw'.

* Tab sheet 'Audio CD': settings for audio CDs

  - Automatic CD Text entry:
    When adding audio files to a project the cd text entries for title and
    performer (dialog 'Tracks') are set automatically.

    * Use tags
      If available the ID tags from the file are used.

    * Use file names
      The information for title and performer are derived from the file name.
      The following formats are supported:

        <No> - <performer> - <title>.*
        <No> - <title> - <performer>.*
        <No> <performer> - <title>.*
        <No> <title> - <performer>.*

      If a name contains a track number it will be ignored. If the name does not
      match one of the formats, the whole name is used as title.

    The file names are always used for wave files (*.wav).


Configuration files
-------------------
There are three configuration files for cdrtfe.

* cdrtfe.ini

  This file does not exist unless the user creates it (dialog 'Settings', see
  above).

* cdrtfe_lang.ini

  This file contains the available translations. For more information see
  cdrtfe_lang.ini.

* cdrtfe_tools.ini

  Normally, this file isn't needed. It allows to change the names and paths of
  the commandline tools used by cdrtfe. See the file itself for more
  information.


RSCSI, remote drives, drive letters
-----------------------------------
To enable cdrtfe to find remote drives the file cdrtfe.ini has to edited. If it
does not exist it can be created in dialog 'Settings'.

The section [Drives] has the following entries:

   [Drives]
   UseRSCSI=0
   Host=rscsi@pc.domain.invalid
   RemoteDrives=r,s,t
   LocalDrives=y,x

With 'UseRSCSI=1' cdrtfe will search for remote drives, with 'UseRSCSI=0' it
will search for local drives. Using remote and local drives together isn't
implemented yet.

To verify the data after the burning cdrtfe needs acces to the drives using a
drive letter. For this reason a windows drive letter has to be assinged to the
remote drive.

The entries 'RemoteDrives' and 'LocalDrives' tell cdrtfe which letters it should
use for the drives. The letters are assigned in order of the SCSI IDs.

If there are more drives than letters, the last drives won't be accessible for
cdrtfe and the CDs cannot be verified.
In the case of local drives cdrtfe will try to find the right drive letter on
its own.

'LocalDrives' only has effect, if 'UseRSCSI' is set to 0.


Auto Erase
----------
To activate the function go to the settings dialog, tab sheet 'cdrecord (2)'.
Currently it is available for all projects with medium check (DataCD, Audio CD,
DVD Video).

When a fixated CD-RW or DVD-RW is detected cdrtfe asks the user, if the disc
should be erased automatically. 'OK' continues and adds 'blank=fast' to the
cdrecord commandline in order to erase the disc before writing.

With older drives that do not support profiles it is impossible to differentiate
between fixated CD-Rs and CD-RWs, so cdrtfe asks in both cases. However, no harm
is done as cdrecord aborts with an error, if you try to erase a CD-R. With newer
drives, like DVD recorders, this problem does not occur.

The auto erase funtion is only triggered when a fixated disc is inserted and not
when there's not enough space left on a unfixated multisession disc.


Automatic speed detection
-------------------------
cdrtfe 1.2 (and above) tries to adjust the list of available speeds each time
when a disc is inserted into a drive.

By default this function is disabled. In order to activate it, just add the
following line to your cdrtfe.ini, section [General]: DetectSpeeds=1

There are some requirements and limitaions:

* The Windows device change notification has to be enabled for the CD drive(s).

* Only new drives (MMC-2 compatible and above?) give a complete list of write
  speeds. Older drives just report the maximum write speed. In this case the old
  speed list is used (from 1x to the maximum speed of the drive).

* cdrecord does not return a list of available read speeds, just the maximum. So
  the old speed list is used (from 1x to the maximum read speed).

* The speed detection is not supported for remote drives using RSCSI.

* Activating the speed detection slows down the start of cdrtfe (for each drive
  'cdrecord -prcap' and 'cdrecord -checkdrive' are called).

* For the same reason it takes some time to recognize the speeds after a disc is
  inserted.

* As cdrtfe does not know about the drive letters assigned to the CD drives, it
  checks every single drive when a disc is inserted (if you have more than one
  CD drives). This is another reason why the detection works slowly. To speed it
  up, set the entry 'LocalDrives' in the section [Drives] in the cdrtfe.ini. So
  cdrtfe only needs to check the drive in which the disc was inserted. For more
  information on 'LocalDrives' see 'RSCSI, remote drives, drive letters'.

* Using this function may result in wrong write speeds when loading existing
  project files. A speed list update in one task affects the speed settings of
  other tasks, too.


Data CD
-------
* directory structure

  With this version of cdrtfe you can create any directory structure you want.
  You can add existing folders or create new ones. Folders can be added, moved
  or deleted. Files can be added, renamed, moved or deleted.

  Beginning with cdrtfe 1.1 empty folders will be written to the CD, too.

* CD options

  - CD/writing mode
    With this dialog the writing mode (track at once, disk at once, raw) and the
    cd type (single/multisession) can be selected. When writing a multisession
    CD there's the possibility to import the previous sessions.

  - ISO image
    CDs can be written directly (on the fly) or by using an image. When using
    the latter method, a name and a folder for the image file are required. You
    have the possibility to create an image without writing it to the medium or
    to prevent the deletion of the image after it has been written to cd.

* filesystem options

  This dialog allows the selection of the filesystem (ISO, Joliet, Rock Ridge,
  UDF) to be used. Settings for bootable CDs are possible, too.

* filesystem check

  According to the actual settings cdrtfe can detect too long file and folder
  names and directories which are nested too deep. In these cases a dialog will
  be displayed in which you can rename those files and folders. In addtion
  cdrtfe will show some hints that can help to minimize the number of names to
  be corrected.

  'Ok' will leave the names as they are, but newly added files and folders will
  be checked.

  'Ignore' disables the filesystem check for all files until the user explicitly
  enables it again (by klicking the button in the group box 'filesystem').

  If too long file names are not corrected by the user, mkisofs will try to
  shorten them. In this case problems (e.g. same name for different files) will
  cause mkisofs to stop and show an error message.

* very long file names

  There are several possibilites to use file names that are longer than usual.

  The joliet specification allows names up to 64 characters. The mkisofs option
  '-joliet-long' makes the use of names up to 103 characters possible. This
  violates the specification but seems to work on most systems. Use with
  caution.

  A filesystem according to the standard ISO9660:1999 allows names up to 207
  characters. To create such a filesystem, use the option 'ISO Level 4'
  (cdrtools 2.01a01 and newer).
  When using ISO9660:1999 and Rock Ridge Extensions the maximum number of
  characters is reduced to 197.
  If the Joliet Extensions are enabled, a windows system can only access the
  joliet file names (64 or 103 characters).

  With cdrtools 2.01a09 or later you can specify the output chracter set for the
  ISO9660:1999 filesystem. You should choose a character set that is available
  on the system on which the CD will be used. On Win9x, for example, this is
  mostly cp850 or 437. With the choice of an suitable character set you can use
  special characters within the ISO file names.

  Bootable ISO9660:1999 CDs can be created with cdrtools version 2.01a16 or
  later.

  To use very long file names the option 'Use UDF file system' can be activated.
  This allows even more than 207 (up to 247?) characters.

* Verify

  Choosing the option 'Verify' will cause cdrtfe to compare the files which have
  been written to a CD with the souce files (bitwise comparison). Errors will be
  displayed in the output window.
  Before the comparison starts the drive will reload the CD. If this fails for
  some reasons (e.g. with a notebook drive), the program asks whether you want
  to reload the CD manually or whether you want to cancel the verification.

  You can also start the comparison manually by selecting the 'Start
  Verification' from the context menu of the option 'Verify'. This is only
  possible if files have been added to the project 'Data CD'.

  At the moment it is possible that the reload fails (message: 'Could not find
  CD, file check terminated!'). In this case try to reload the CD and start the
  verification manually.
  When a file name has been shortened automatically by mkisofs cdrtfe does not
  check this file. In such a case the program will falsely give the error
  message that the file could not be found.

* link duplicate files

  The option 'find and link duplicate files' (dialog 'filesystem') causes cdrtfe
  to compare all source files with each other before writing the CD. If the
  program finds identical files, each of them will be written only once to the
  CD. Every additional occurrence will be linked to the first file. So duplicate
  files won't waste much place on the CD.

  Unlike the program "Duplicate File Linker" (dfl.exe) cdrtfe does not alter the
  source files.

  Important! If this Option is chosen mkisofs will be called with the option
             -cache-inodes. According to the man page this does not work
             correctly under Win32/cygwin, so that problems may occur when many
             different files (>5000) are to be processed. In this case the
             result may be files with the wrong contents.

             Therefore, CDs or images which have been created using this option
             should be verified in any case.

             However, after a test with almost 13.000 files with over 6.000
             duplicates no errors occurred.

             This problem does not occur with newer versions (e.g. 1.5.14) of
             the cygwin1.dll (tested with > 120.000 files).

  When using the Mingw version of mkisofs (mkisofs 2.01-bootcd.ru) this option
  does not work.
  Instead, the option -duplicates-once can be added to mkisofs as additional
  commandline option (dialog 'Settings', tabsheet 'cdrecord'). In this case the
  option 'find and link duplicate files' has to be unselected.

* Data DVD

  Provided a DVD capable version of cdrecord is available it is possible to
  create Data DVDs.


Audio CD
--------
The only files that can be written as Audio CD are wave files in the PCM format
with 44.1 kHz, 16 bit, stereo. If the respective programs (madplay, oggdec,
flac) are available, files in MP3, Ogg and FLAC format can be used, too. They
will be converted into wave files.

* Audio CD options ('Options')

  - Close CD
    When not closing an Audio CD, it is possible to add more audio tracks later
    on. Mostly such a CD can only be played in the CD writer until it is closed.
    You can close a CD either by using the function 'Fixate CD' or by adding
    audio tracks with activated option 'Close CD'.

  - CD Plus/Multisession
    With cdrtfe a CD Plus (Enhanced CD, CD extra) can be created. This is a
    multi session CD with audio tracks in the first session and data tracks in
    the following sessions. A CD plus is created in two steps:
      o First, create an audio CD with the options 'Multisession' and 'Close
        CD'.
      o After the audio session has been written to the CD, you can add a data
        session. The option 'Multisession' has to be activated and the option
        'Import previous sessions' has to be deactivated.

  - Info files
    If the option 'Use info files' is activated, cdrecord will use the inf-files
    which have been created by cdda2wav during the extraction of audio tracks.

  - Write CD text
    If this option is choosen, CD text information will be written, if they are
    available. CD text information can be entered in the dialog 'Track
    properties' (Button 'Tracks'). Alternatively information from the inf-files
    can be used. In this case the option 'Use info files' has to be activated.

* Track properties ('Tracks')

  - CD Text
    Here you can enter CD text information. For the whole CD and for each track
    you can name title and performer.

    At the moment cdrtfe only offers the possibility to enter these information.
    But if the project is saved, more data can be added by editing the project
    file (*.cfp.files): songwriter, composer, arranger and a message. In the
    project file the data format is
    <Title>|<Performer>|<Songwriter>|<Composer>|<Arranger>|<Message>

    Each string has to be shorter than 160 characters. If the whole CD text
    information is too big, cdrtfe will give an error message.

    CD text data from this dialog overrides information from inf-files.

  - Pause between tracks
    Here you can set the length of the pause between two tracks. The length can
    be entered in seconds or sectors (1 second = 75 sectors).

    These settings will not be applied, if the option 'Use info-files' is
    activated.

* Mixed Mode CD

  cdrtfe does not suppport the creation of a mixed mode CD (a data track
  followed by audio tracks). With cdrecord you can create such as CD with:
  cdrecord -v dev=... cdimage.iso -audio track1.wav ...

* m3u playlists

  Currently, only absolute file paths are supported. So, if your playlist
  contains relative paths, they will be ignored. The playlist can be added to
  the audio CD project in the same ways like sound files (open file dialog,
  drag'n'drop, commandline).


XCD (Mode2/Form2)
-----------------
* directory structure

  With this version of cdrtfe you can create any directory structure you want.
  But in contrast to a data CD, it is not possible to change file names because
  the Mode2CDMaker does not support this function.
  For this reason cdrtfe does not check the length of file names.

* file names

  The Mode2CDMaker normally tries to keep the file names as they are.

  By choosing the appropriate option you can force conformity according to ISO
  Level 1 (8.3 format and upper case) or Level 2 (up to 31 characters, upper
  case). In both cases illegal characters (according to ISO9660) will be
  replaced with '_'.

  If the source files have very long file names, unexpected results or errors
  are possible.

* Form1/2 files

  Files from the file list (upper list) will be written in the format Mode2/
  Form1. A direct access (e.g. with the Windows Explorer) is possible.

  Files from the movie list (lower list) will be written as Mode2/Form2 files,
  which means that they can only be read by using dat2file.exe or (if it is a
  playable file) with a suitable filter driver.

  It ist possible to add any file you want to the movie list by using the button
  'Add Movie'. Of course, these files can only be read with dat2file.exe as they
  will be written as Mode2/Fom2 files.

  Files can be moved from one list to the other (drag-and-drop).

  Files with the extension .avi will be added to the movie list automatically.

* Info file

  With the option 'create info file' the file xcd.crc will be created in the
  root directory of the CD which contains the original file size and a CRC32
  checksum of every Mode2/Form2 file. Using this information the program Mode2/
  Form2 File Extractor (m2f2extract.exe, see cdrtfe.sourceforge.net) can extract
  the files with their original file size without the padding zero bytes.
  At the moment this only works if a XCD is created with an unrestricted ISO
  file system.

* Single track image

  A restriction of the Mode2/Form2 CDs is the minimal file size of 340,5 KiByte
  (exactly 348.601 Bytes) for each Form2 file. Another problem is the lack of
  efficiency when writing a lot of small files, because one track is created for
  each file.

  Both problems can be avoided with the option 'Single track image'. All Mode2/
  Form2 files will be written into a single track and there is no need for an
  ISO bridge track (higher capacity). Files can be smaller than 340,5 KiByte.

  As a disadvantage of this method these single track XCDs cannot be read under
  Linux. At the moment there is no software that supports this kind of CDs.

* Verify

  Choosing the option 'Verify' will cause cdrtfe to compare the files which have
  been written to a CD with the souce files (bitwise comparison).

* Important!

  The higher capacity of a XCD (13% more data than usually) reduces the error
  correction capability.

  If the Form2 source files are not an exact multiple of 2324 bytes, padding
  zeroes will be added at the end. This can make a file unusable.

* Error protection with rrenc/rrdec

  To avoid the disadvantage of the limited error correction the program rrenc
  can create redundancy data which can be used by rrdec to recover defective
  sectors.

  To use this additional protection select the option 'Enable error correction'.
  'Sectors' specifies the number of sectors (1 sector = 2324 byte) used to store
  the redundancy data. The capacity for user data is reduced correspondingly.

  The redundancy data is stored in the folder _rec_ on the CD, together with
  rrenc.exe and rrdec.exe. To extract the protected files rrdec is called from
  the MS DOS Commandline:

    z:\_rec_\rrdec -@ z:\_rec_\protect.rrt -t n:\cd -w -v -e dat -s z:\

  In the example z: is the CD drive with the protected XCD, n:\cd is the target
  folder to copy the files to and dat is the extension of the Form2 files.


DAE (Digital Audio Extraction)
------------------------------
To grab audio tracks with cdda2wav, first click the button 'Read TOC'. The
tracks of the CD in the drive will be displayed. Then select the tracks, specify
the output directory and click 'Start'.

* DAE options, tab sheet 'DAE':

  - File names
    o File name prefix:
      The file names for the tracks are created by appending the track number to
      the prefix.

      Example :   Prefix:   track
                  Names :   track_01.wav, track_02.wav, ...

    o Names from CD info:
      The file names are created by using the specified pattern. The pattern is
      a string in which the following placeholders can occur:
        %N    Track number
        %T    Title
        %P    Performer

      The values for title and performer are retrieved from the CD text
      information (if available) or by accessing the freedb. CD text information
      override those from the freedb.

      Example :   Pattern:  %N %P - %T
                  Names  :  01 Angelo Branduardi - Si può fare.wav
                            02 Angelo Brnaduardi - Il viaggiatore.wav

      If no information can be retrieved for title and performer, the file names
      will be Track 01.wav, Track 02.wav, ...

  - Options
    o Separate file for each track
      Save every track in a separate file (*.wav). Without this option
      successive tracks will be written in one file.

    o Lib Paranoia
      If you like to grab tracks from a scratched or damaged CD, you should try
      this option for better results.

    o No info files
      The selected tracks will be extractd without creating info files.

  - Format
    the target format can be speecified here.

* DAE options, tab sheet 'freedb':

  - Get freedb information
    Information (Title and Performer) will be retrieves unless the CD contains
    CD text information.

* DAE options, tab sheet 'Encoding':

  - Add tags (title and peformner)
    With this option activated track information (if available) will be saved to
    the compressed file.

  - FLAC
    Compression settings:         0 (fast) ... 8 (best)

  - Ogg Vorbis
    Quality settings:             0 (low) ... 10 (high)

  - mp3 (Lame presets)
    insane                        320 kBit/s CBR (constant bitrate)
    medium, standard, extreme     VBR (variable bitrate)
    80 ... 320                    ABR (average bitrate)

  - user defined
    This offers the possibility to specify an external programm and the desired
    options for compression. Any encoder can be used as long as the program can
    take input from Stdin.

    You can also use this to give cdrtfe a special command line for lame.

    Enter the path and name of the program in the field 'Cmd.:' and the options
    in the fiels 'Opt.:'. The file name extension is specified by adding |.ext
    to the option string. Then select 'userdef' as compression mode on the tab
    sheet 'DAE', 'Format'.

    There are three placeholders for the option string:
      %F - output file name of the encoded file
      %T - Title
      %P - Performer/Artist

    Example:
      Cmd.: i:\burn\lame.exe
      Opt.: -b 160 -h --add-id3v2  --tt "%T" --ta "%P" - %F|.mp3


CD Image
--------
* Create image:

  You can create an image of an CD with readcd. Just specify the name of the
  image an click 'Start'.

  - No abort when an uncorrectable Error occurs
    The reading process will continue, even if an uncorrectable error is found
    in the data stream

  - Disable error recovery of drive
    The drive ignores read errors in data sectors that are a result of
    uncorrectable ECC/EDC errors.

  - Clone Mode
    Makes an exact copy including the subchannel data. Such an image must be
    written with the options 'Clone Mode' and 'Raw Mode (raw96r)'.

  - Range:
    Specify a sector range that will be read. The range is specified by the
    starting sector number and the ending sector number. The end sector will not
    be read.

* Write image

  With cdrtfe both ISO and CUE images can be written, the latter only if the
  program cdrdao was found in the cdrtfe directory or cdrecord 2.01a24 (or
  newer) ist used.

  When writing an ISO image with the option 'overburn' the option 'disk at once'
  ('Settings') usually needs to be selected.

  When writing an Image that has been created with the readcd clone mode, the
  options 'Clone mode' and 'RAW mode (raw96r)' have to be activated.


(S)VideoCD
----------
Video or SuperVideo CDs can be created from MPEG1-/MPEG2 video files. Available
formats are VideoCD 1.1, VideoCD 2.0 und SuperVideoCD 1.0.

* source file requirements

  - VideoCD:
    - 352 x 240, 29.97 Hz, NTSC
    - 352 x 240, 23.976 Hz, FILM
    - 352 x 288, 25 Hz, PAL, (not supported by VideoCD 1.1)
    - audio: MPEG-1 layer II, 224 kBits/s CBR, 1 stereo or 2 mono audio channels

  - SuperVideoCD:
    - 480 x 480, 29.97 Hz, NTSC
    - 480 x 576, 25 Hz, PAL
    - audio: MPEG-1 layer II, 32 - 384 kBits/s bit-rate, 2 stereo or 4 mono
      channels, or 1 extended MPEG-1/2 multichannel (5+1) surround sound

  At the moment cdrtfe cannot check, if the selected video tracks comply with
  the requirements. Sometimes the duration of a mpeg file my be displayed
  incorrectly.


DVD Video
---------
A Video DVD can be created from a source directory provided that a DVD capable
version of cdrecord is available. This only works if the DVD Video file names
include upper case characters only. The source folder must contain a subfolder
VIDEO_TS.
A double click into the field 'Label' sets the label to the last part of the
source path: 'd:\videos\My Video' -> 'My Video'.


Fixate CD
---------
This function is needed to write a TOC on a CD which has not been closed.
To fixate a CD insert the CD into the drive, select the drive and click the
button 'Fixate CD'.


cygwin1.dll
-----------
The cygwin1.dll version 1.3.18 to 1.3.22 seems to cause crashes on some systems
under Win2k and WinXP when using pipes (writing CDs on the fly) or cdda2wav with
the option -paranoia.

This problem does not occur any longer with cygwin1.dll version 1.5.3 or later.

The version 1.5.17 causes problems when using the ASPI layer.


Commandline options
-------------------
cdrtfe can be started with the following commandline options:
cdrtfe [/data|/audio|/xcd|/vcd] <file 1> ... <file n> [/load <project>]
       [/execute [/log|/minimize|/exit [/hide]]] [/nocheck] [/portable]

cdrtfe <file 1> ... <file n>:
       The files will be added to the file list of the current tab sheet.

cdrtfe /data <file 1> ... <file n>:
       The tab sheet 'Data CD' is set as current tab sheet and the files (or
       folders) will be added.

cdrtfe /audio <file 1> ... <file n>:
       The tab sheet 'Audio CD' is set as current tab sheet and the files will
       be added. Only valid wave files (PCM, 44.1 kHz, 16 bit, stereo) are
       accepted.

cdrtfe /xcd <file 1> ... <file n>:
       The tab sheet 'XCD' is set as current tab sheet and the files (folders)
       will be added to the file list (Form1). Files with extension .avi are
       added to the movie list (Form2).

cdrtfe /vcd <datei 1> ... <datei n>:
       The tab sheet '(S)VideoCD' is set as current tab sheet and the files will
       be added.

cdrtfe /load <project>
       Load the project file <project> on start up. The option /load is only
       allowed when the first instance of cdrtfe is started. Otherwise it will
       be ignored. By multiple occurences only the last one will be taken into
       account.

cdrtfe ... /execute
       After all other options (/data, /audio, /xcd, /vcd and /load) have been
       analyzed the writing process will be started without further
       confirmation.

cdrtfe ... /exit
       Close cdrtfe after the writing process has ended. This option can only
       be used together with /execute.

cdrtfe ... /log
       Save the output of the commandline programs into a logfile. If a project
       file has been loaded, the logfile has the name <project>.cfp.log and can
       be found in the directory where the project files is located. Otherwise
       the logfile will be written to cdrtfe.log in the cdrtfe directory. In
       both cases old logfiles will be overwritten.
       This option can only be used together with /execute.

cdrtfe ... /minimize
       This option minimizes the main window of cdrtfe and can only be used
       together with /execute.

cdrtfe ... /hide
       cdrtfe is run invisible (no program window, no entry in the taskbar). Can
       only be used together with /execute and /exit.

cdrtfe ... /nocheck
       Do not check the filesystem for too lang file names or directories which
       are nested too deep. mkisofs will try to shorten too long names auto-
       matically.

cdrtfe ... /portable
       Start cdrtfe in portable mode.

The options /data, /audio, /xcd and /vcd remains valid until another option from
this group occurs. The last option in the commandline determines the current tab
sheet.
The options /minimize and /hide can not be combined. In this case both will be
ignored.

Of course /execute starts a writing process according to the current tab sheet,
without regard to settings of the other tab sheets.

The different commandline options can be mixed in almost any way:

cdrtfe /audio intro.wav /data readme.txt /load project.cfp file2.txt
       /xcd a.avi /data file3.txt /execute

       loads the project file project.cfp, adds to the tab sheet 'Audio CD' the
       file intro.wav and to the tab sheet 'Data CD' the files readme.txt,
       file2.txt and file3.txt. To the tab sheet 'XCD' the file a.avi is added
       to the movie list. Then the 'Data CD' is set as current tab sheet and
       the writing process starts.

Shortcut links to cdrtfe which use these options can be added to 'Send to'-menu
of the Windows Explorer. This gives you an easy way to add files to a project.
Just select the files in the explorer and send them to cdrtfe. Unfortunately
this works only with Win2k or WinXP.


cdrtfe ShellExtensions
----------------------
As the 'Send to'-function under Win9x is broken (options are ignored, file names
are handed over in the 8.3 format) the cdrtfe ShellExtensions offer another easy
way to submit the files to cdrtfe. To use this function file cdrtfeShlEx.dll
has to be in the cdrtfe directory.

The ShellExtenions can be (de)activated in the dialog 'Settings'.

After the registration of cdrtfeShlEx.dll there is a new submenu in the context
menue for files and folders which is named 'cdrtfe' and has the entries
'cdrtfe', 'cdrtfe /data', 'cdrtfe /audio' and 'cdrtfe /xcd'. These commands work
exactly in the same way as the corresponding commandline options.

If cdrtfeShlEx.dll is missing, the corresponding buttons from 'Settings' dialog
are disabled and the options /register and /unregister are ignored.


Hint:    Unfortunately these ShellExtensions have still a bug. When activated
         they disfigure the explorer's file menu by adding a new submenu every
         time the file menu is opened.
         Deactivating the ShellExtensions stops the occurence of this bug. Even
         though the bug just seems to be a cosmetic problem hints on how to fix
         the problem (especially under Delphi 3) are welcome.


Icons/Glyphs
------------
Beginning with cdrtfe 1.2 the bitmaps for the speed buttons and treeview icons
can easily be replaced. See readme.txt in the folder 'icons'.


Known bugs
----------
* Verify: Sometimes cdrtfe has problems to reload the just written CD.

* Verify: If mkisofs has shortened too long file names or replaced illegal
  characters on its own, these files won't be found during the verification,
  even if they are written correctly to the CD.

* ShellExtension: A bug in cdrtfeShlEx.dll disfigures the explorer's file menu
  by the time.


Links
-----
Wiki of dchlb (German):    http://www.dchlb.de

cdrecord source files:     ftp://ftp.berlios.de/pub/cdrecord/alpha/

Mode2CDMaker:              http://webs.ono.com/de_xt/

VCDImager:                 http://www.vcdimager.org

cdrdao:                    http://cdrdao.sourceforge.net/

Win32 Binaries:            http://www.geoshock.com/cdrtools
                           http://www.sbox.tugraz.at/home/t/tplank

Win32 Binaries, DVD Patch: http://smithii.com/?q=node/view/9

Mingw32 Binaries:          http://cdrtools.bootcd.ru/

Download of sh.exe:        ftp://ftp.berlios.de/pub/cdrecord/alpha/win32/sh.exe


License
-------
This program is free software. For more information see license.txt.


Disclaimer
----------
NO WARRANTY.
This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.

The author's liability shall not include any claim for or right to recover any
damages, including but not limited to loss of profit, data, or use of the
software or special incidental or consequential damages, even if the author has
been specifically advised of the possibility of such damages.


Credits
-------
Parts of the XCD Error Protection support by Oleg S. Rudyk aka Elic.

Ogg Vorbis support by Jared Breland (jbreland@legroom.net).

W32waves.pas - Unit for accessing Windows PCM wave file information -
by Ulli Conrad.

atl_oggvorbis.pas: Audio Tools Library, Class TOggVorbis - for extracting
information from Ogg Vorbis file header. Copyright (c) 2001 by Jurgen Faul.

cl_apeinfo.pas - Unit for extracting Monkey's Audio file information - is
based on Monkey.pas from the Audio Tools Library 2.3 (Copyright (c) 2000-
2002 by Jurgen Faul, 2003-2005 by The MAC Team).

cl_peheader.pas - Unit for accessing Windows PE file information - is based
on pe.pas by K. Karthik.

f_wininfo.pas is partly based on WinFuncs.pas by Simon Reinhardt.

f_cdtext.pas is partly based on cdtext.c and cdtext.h by J. Schilling.

TDropFileTarget - Drag and Drop of files into an application - from Drag and
Drop Component Suite. © 1997-2005 Angus Johnson & Anders Melander.

JCL portions are licensed from Project JEDI, the source code can be obtained
from http://jcl.sourceforge.net/

cdrtfe 1.2 icons/glyphs are based on the Silk Icon set 1.3 by Mark James and the
Winstripe FF classic theme by Stephen Horlander and Kevin Gerich. Additional
icons by Rob van Ruremonde.

The setup file has been created with Inno Setup 5.1.6 by Jordan Russell.


Contact
-------
cdrtfe Homepage:         http://cdrtfe.sourceforge.net/
                         http://sourceforge.net/projects/cdrtfe
eMail          :         kerberos002@arcor.de
                         Please use the tag [cdrtfe] in the subject. Otherwise
                         the eMail would not get through the spam filter.

[1] 1 MiByte = 1024 KiByte = 1024*1024 Byte
    1 MByte  = 1000 kByte  = 1000*1000 Byte
    see: http://physics.nist.gov/cuu/Units/binary.html
         http://physics.nist.gov/cuu/Units/prefixes.html

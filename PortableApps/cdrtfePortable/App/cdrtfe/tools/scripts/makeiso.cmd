@echo off
set MAKEISO_VERSION=2.1
rem Author: Jim Michaels ^<jmichae3@yahoo.com^>
rem Abstract: makeiso.cmd - batch file wrapper to simplify calling
rem            mkisofs.exe
rem Create Date:  ?,? 2008
rem Current Date: Oct 10, 2009
rem
rem Copyright 2009 Jim Michaels
rem
rem    This program is free software: you can redistribute it and/or modify
rem    it under the terms of the GNU General Public License as published by
rem    the Free Software Foundation, either version 3 of the License, or
rem    (at your option) any later version.
rem
rem    This program is distributed in the hope that it will be useful,
rem    but WITHOUT ANY WARRANTY; without even the implied warranty of
rem    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
rem    GNU General Public License for more details.
rem
rem    You should have received a copy of the GNU General Public License
rem    along with this program.  If not, see ^<http://www.gnu.org/licenses/^>.

set _preparer=Joe Toe Palooka nobody@nowhere.com
set _publisher=http://www.nowhere.com
rem handle no arguments as request for help
if "%1"=="" goto helpmi
rem handle helpmi switch
if "%1"=="-?" goto helpmi
if "%1"=="-h" goto helpmi
if "%1"=="-H" goto helpmi
if "%1"=="-HELP" goto helpmi
if "%1"=="-Help" goto helpmi
if "%1"=="-help" goto helpmi
if "%1"=="--?" goto helpmi
if "%1"=="--h" goto helpmi
if "%1"=="--H" goto helpmi
if "%1"=="--HELP" goto helpmi
if "%1"=="--Help" goto helpmi
if "%1"=="--help" goto helpmi
if "%1"=="/?" goto helpmi
if "%1"=="/h" goto helpmi
if "%1"=="/H" goto helpmi
if "%1"=="/HELP" goto helpmi
if "%1"=="/Help" goto helpmi
if "%1"=="/help" goto helpmi
rem handle version switch
if "%1"=="-v" goto versionmi
if "%1"=="-V" goto versionmi
if "%1"=="-VERSION" goto versionmi
if "%1"=="-Version" goto versionmi
if "%1"=="-version" goto versionmi
if "%1"=="--v" goto versionmi
if "%1"=="--V" goto versionmi
if "%1"=="--VERSION" goto versionmi
if "%1"=="--Version" goto versionmi
if "%1"=="--version" goto versionmi
if "%1"=="/v" goto versionmi
if "%1"=="/V" goto versionmi
if "%1"=="/VERSION" goto versionmi
if "%1"=="/Version" goto versionmi
if "%1"=="/version" goto versionmi
rem handle empty arguments
if "%2"=="" goto helpmi
set _isofile=%1
set _basedir=%2
set _multisession=
set _appid=
set _volid=
echo 3=%3
echo 4=%4

if "%5"=="--multiborder" set _multisession=-graft-points
if "%5"=="--Multiborder" set _multisession=-graft-points
if "%5"=="--MultiBorder" set _multisession=-graft-points
if "%5"=="--MULTIBORDER" set _multisession=-graft-points
if "%5"=="--multisession" set _multisession=-graft-points
if "%5"=="--Multisession" set _multisession=-graft-points
if "%5"=="--MultiSession" set _multisession=-graft-points
if "%5"=="--MULTISESSION" set _multisession=-graft-points
if "%5"=="--MULTI" set _multisession=-graft-points
if "%5"=="--Multi" set _multisession=-graft-points
if "%5"=="--multi" set _multisession=-graft-points
if "%5"=="-multiborder" set _multisession=-graft-points
if "%5"=="-Multiborder" set _multisession=-graft-points
if "%5"=="-MultiBorder" set _multisession=-graft-points
if "%5"=="-MULTIBORDER" set _multisession=-graft-points
if "%5"=="-multisession" set _multisession=-graft-points
if "%5"=="-Multisession" set _multisession=-graft-points
if "%5"=="-MultiSession" set _multisession=-graft-points
if "%5"=="-MULTISESSION" set _multisession=-graft-points
if "%5"=="-MULTI" set _multisession=-graft-points
if "%5"=="-Multi" set _multisession=-graft-points
if "%5"=="-multi" set _multisession=-graft-points
if "%5"=="/multiborder" set _multisession=-graft-points
if "%5"=="/Multiborder" set _multisession=-graft-points
if "%5"=="/MultiBorder" set _multisession=-graft-points
if "%5"=="/MULTIBORDER" set _multisession=-graft-points
if "%5"=="/multisession" set _multisession=-graft-points
if "%5"=="/Multisession" set _multisession=-graft-points
if "%5"=="/Multisession" set _multisession=-graft-points
if "%5"=="/MULTISESSION" set _multisession=-graft-points
if "%5"=="/MULTI" set _multisession=-graft-points
if "%5"=="/Multi" set _multisession=-graft-points
if "%5"=="/multi" set _multisession=-graft-points
if "%5"=="multisession" set _multisession=-graft-points
if "%5"=="Multisession" set _multisession=-graft-points
if "%5"=="Multisession" set _multisession=-graft-points
if "%5"=="MULTISESSION" set _multisession=-graft-points
if "%5"=="MULTI" set _multisession=-graft-points
if "%5"=="Multi" set _multisession=-graft-points
if "%5"=="multi" set _multisession=-graft-points
if "%5"=="-graft-points" set _multisession=-graft-points
rem -print-size
rem -joliet
rem -joliet-long=103 character filenames
rem -graft-points=multisession
rem -rational-rock is the rock-ridge filesystem.
rem -iso-level 3 causes files over 4GiB in size to be handled correctly.
rem -allow-multidot
rem -allow-leading-dots
rem -_publisher PUB
rem -volid VOLID
rem -preparer PREP
rem -appid APPID
if .%3.==.. goto skip3mi
set _volid=-volid %3
echo volid=%_volid%
:skip3mi
if .%4.==.. goto skip4mi
set _appid=-appid %4
echo appid=%_appid%
:skip4mi
set params=-iso-level 3 -rational-rock -joliet-long -allow-multidot -allow-leading-dots %_multisession%
rem
rem set params=-eltorito-boot isolinux/isolinux.bin -no-emul-boot -boot-load-size 4 -boot-info-table -N
REM support Joliet (MS Windows (R) long filename support) filesystem
REM support RockRidge filenames as well
REM rename boot.catalog to _$ and hide it.
REM set params=%params% -c boot.catalog -hide boot.catalog -hide-joliet boot.catalog
rem set params=%params% -c _$ -hide-joliet _$ -hide _$
if exist %_isofile% del %_isofile%
if exist %_isofile% GOTO errRO
goto skipcrt
set MKISOFSRC=mkisofs.rc
if exist %MKISOFSRC% goto skipcrt
echo PREP="%_preparer%">%MKISOFSRC%
echo PUBL="%_publisher%">>%MKISOFSRC%
echo APPI=%4>>%MKISOFSRC%
echo VOLI=%3>>%MKISOFSRC%
:skipcrt
set msg=Creating ISO %_isofile% out of directory %_basedir%
echo %msg%
if "%OS%"=="Windows_NT" title %msg%
rem "MKISOFS.EXE" -o %_isofile% %params% -volid %3 -appid %4 -preparer "%_preparer%" -publisher "%_publisher%" -root %_basedir% %_basedir%
@echo on
"MKISOFS.EXE" -o %_isofile% %params% %_volid% %_appid% -preparer "%_preparer%" -publisher "%_publisher%" %_basedir%
@echo off
goto endmi

:helpmi
@echo. makeiso - batch file wrapper for mkisofs.exe, uses most common switches.
@echo. usage:
@echo.     makeiso c:\somepath\isofilename.iso c:\rootdir ["volume label" ["application desc" [ [[-[-]]multi[session^|border]] ]]]
@echo.
@echo. multi or multisession or -multiborder makes the ISO image multiborder (multisession).
@echo. For use in batch file, do CALL makeiso isofilename.iso c:\rootdir "volume label" "application desc" multisession
@echo. If you want mkisofs help,
@echo. "C:\Program Files\cdrtfe\tools\cdrtools\MKISOFS.EXE" --help
@echo. or go to http://cdrecord.berlios.de/private/man/cdrecord/mkisofs.8.html
@echo. multiborder can only be specified if all parameters are specified.
@echo. edit this batch file to customize _preparer and _publisher variables.
@echo.
@echo. This batch file Copyright 2008,2009 Jim Michaels. Under GPL3 license.
goto endmi

:versionmi
@echo. makeiso batch file Version %MAKEISO_VERSION%
goto endmi


:errRO
echo. -----error: iso file is readonly!
goto endmi

:endmi

@echo off
set ScriptDir=%cd%
cd ..
set ToolDir=%cd%\
set CdrtoolsDir=%ToolDir%\cdrtools
set CygwinDir=%ToolDir%\cygwin
set PATH=%ScriptDir%;%CdrtoolsDir%;%CygwinDir%;%PATH%

echo Path is temporarily set to make cdrtools (and cygwin related DLLs) available:
echo.
echo   cdrecord          cdda2wav
echo   mkisofs           isoinfo
echo   readcd
echo.
echo Other available commands:
echo.
echo   makeiso (by Jim Michaels)
echo.
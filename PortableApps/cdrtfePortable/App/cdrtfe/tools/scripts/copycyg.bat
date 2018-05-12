@echo off
set cygpath=%1\tools\cygwin
set cdrtpath=%1\tools\cdrtools
set scriptpath=%1\tools\scripts\
copy %cygpath%\*.dll %cdrtpath%
copy %scriptpath%\makeiso.cmd %cdrtpath%


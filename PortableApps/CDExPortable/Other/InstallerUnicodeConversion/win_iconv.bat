@echo off
"%1\Other\InstallerUnicodeConversion\win_iconv.exe" -f WINDOWS-1252 -t UTF-16LE "%1\Data\settings\CDEx.ini" >> "%1\Data\settings\CDEx.ini-converted"
"%1\Other\InstallerUnicodeConversion\win_iconv.exe" -f WINDOWS-1252 -t UTF-16LE "%1\Data\settings\Default.prf.ini" >> "%1\Data\settings\Default.prf.ini-converted"
cls
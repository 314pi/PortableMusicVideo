*                                                                              *
* Hinweis: Diese readme-Datei wird nicht mehr aktualisiert. Bitte die HTML-    *
*          Hilfe verwenden.                                                    *
*                                                                              *

cdrtfe 1.3pre2 - cdrtools Frontend
==================================

Einleitung
----------
cdrtfe ist ein Win32 Frontend f�r einige Funktionen von J�rg Schillings
cdrtools. Es k�nnen VideoCDs mit VCDImager erstellt werden. cdrtfe unterst�tzt
au�erdem grundlegende Funktionen des Mode2CDMakers, um CDs zu erzeugen, die
etwa 13% mehr Daten aufnehmen als �blicherweise (Mode 2 Form 2: 738 MiByte
statt 650 MiByte, 795 MiByte statt 700 MiByte). [1]

Copyright (c) 2004-2007 Oliver Valencia
Copyright (c) 2002-2004 Oliver Valencia, Oliver Kutsche

cdrtfe ist freie Software (GNU General Public License).


Systemvoraussetzungen
---------------------
* IBM-kompatibler PC
* Windows 9x/ME/2000/XP (getestet unter Win95, Win98SE, Win2000, WinXP)
* nur f�r Win9x/ME: funktionierender ASPI Layer (z.B. Adaptec ASPI 4.60)

ben�tigte Programme/Tools:
* cdrtools (cdrecord.exe, mkisofs.exe; optional: cdda2wav.exe, readcd.exe)
* cygwin1.dll
* sh.exe (unter Win9x zum On-the-fly-Schreiben)

optionale Programme/Tools:
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

Um cdrtfe zu verwenden, sind die cdrtools erforderlich, zumindest die Dateien
cdrecord.exe und mkisofs.exe. Ab cdrtfe 1.1 kann neben der cygwin-Version der
cdrtools auch die Mingw-Version verwendet werden, jedoch kann cdrtfe zur Zeit
mit der Mingw-Version unter Win9x, ME keine CDs on-the-fly schreiben.

Wird die cygwin-Version der cdrtools verwendet, ist zum on-the-fly-Brennen unter
Win9x, ME zus�tzlich noch die Datei sh.exe n�tig. Bei Win2k und WinXP ist dies
nicht mehr erforderlich, wenn sich sh.exe jedoch im Programmverzeichnis von
cdrtfe befindet, wird sie verwendet (nur mit cygwin-Version der cdrtools).
sh.exe ist nicht in den Win32-Binary-Paketen enthalten. Sie kann aber separat
heruntergeladen werden (s.u.).

cdrtfe wurde mit cdrdao in der Version 1.1.5 und 1.1.7 getestet. cdrdao ben�tigt
die Datei cygwin1.dll.

Mode2CDMaker mu� mindestens in der Version 1.5.1 vorliegen, �ltere Versionen
werden nicht unterst�tzt. dat2file.exe sollte ebenfalls vorhanden sein. Die zu-
s�tzliche Fehlerkorrektur ben�tigt rrenc.

Um VideoCDs zu erstellen ist der VCDImager n�tig, der ebenfalls die Datei
cygwin1.dll voraussetzt.

MP3-Dateien k�nnen nur dann als Quelldateien f�r Audio-CDs verwendet werden,
wenn madplay (0.15.2) vorhanden ist. F�r Dateien im Ogg-Format ist oggdec
erforderlich, f�r Dateien im FLAC-Format flac.

Das Enkodieren von CD-Tracks in die Formate mp3, Ogg Vorbis und FLAC ist nur
m�glich, wenn die entsprechenden Programme (lame, oggenc und flac) vorhanden
sind.

Au�erdem wird noch die Datei cygwin1.dll ben�tigt, wenn die cygwin-Version der
cdrtools eingesetzt wird. Die Datei cygwin1.dll kann sich entweder zusammen mit
den cdrtools und cdrtfe in einem Verzeichnis befinden oder an beliebiger Stelle
im Suchpfad.


Installation
------------
Laden Sie die Installationsdatei herunter, f�hren Sie sie aus und folgen Sie den
Anweisungen.

oder

Laden Sie die aktuelle cdrtfe-Version von der Download-Seite herunter.

Laden Sie ben�tigten und die gew�nschten optionalen Programme und Tools
herunter:
  cdrtools, cygwin1.dll, Mode2CDMaker, rrenc/rrdec, VCDImager, madplay, lame,
  oggdec, oggenc, flac, sh.exe, cdrdao, Mode2Form2 File Extractor

Entpacken Sie die heruntergeladenen Archive in ein beliebiges Verzeichnis.

Starten Sie cdrtfe per Doppelklick auf die Datei cdrtfe.exe.

Wenn cdrtfe zum Schreiben von DVDs verwendet werden soll, ben�tigen Sie eine
DVD-f�hige Version von cdrecord. F�r weitere Informationen lesen Sie bitte
readme_dvd_de.txt.


Hinweise f�r Nutzer fr�herer Versionen
--------------------------------------
Mit cdrtfe ab Version 1.0 ergeben sich einige �nderungen f�r Nutzer fr�herer
Versionen (0.8 - 0.9.2):

* Das Format der Projekt-Dateien (*.cfp und *.cfp.files) wurde ver�ndert. Mit
  cdrtfe 0.8 bis 0.9.2 erstellte Projekt-Dateien k�nnen nicht mit cdrtfe 1.0
  (oder neuer) verwendet werden.

* In der Registry abgelegte Einstellungen einer �lteren Version werden von
  cdrtfe 1.0 nicht ber�cksichtigt, da Einstellungen jetzt in einer Ini-Datei
  gespeichert werden. Dies gilt auch f�r die zus�tzlichen Kommandozeilen-
  optionen.
  Diese Einstellungen sollten vor Verwendung von cdrtfe 1.0 aus der Registry
  gel�scht werden: Dialog 'Einstellungen', Bereich 'Einstellungen speichern',
  Schaltfl�che 'l�schen' sowie Bereich 'zus�tzliche Kommandozeilenoptionen',
  Schaltfl�che 'Listen l�schen'.

* Die Informationen zur Benutzung der ShellExtensions werden nun an anderer
  Stelle in der Registry gespeichert.
  Bevor die ShellExtensions mit cdrtfe 1.0 verwendet werden k�nnen, m�ssen sie
  mit dem alten cdrtfe deaktiviert werden: Hierzu im Dialog 'Einstellungen',
  Bereich 'ShellExtensions' die Schaltfl�che 'deaktivieren' klicken. Danach mu�
  die alte cdrtfeShlEx.dll durch die neuere Version 1.0.0.1 (im zip-Archiv ent-
  halten) ersetzt werden.
  Nun k�nnen die ShellExtensions im Dialog 'Einstellungen' von cdrtfe 1.0 wieder
  aktiviert werden.


Sprache
-------
Die Datei cdrtfe_lang.ini erm�glicht die Auswahl der in cdrtfe verwendeten
Sprache. Die Voreinstellung in cdrtfe_lang.ini ist Englisch. Fehlt die Datei
cdrtfe_lang.ini ist Deutsch die voreingestellte Sprache. Es k�nnen auch be-
liebige weitere Sprachen hinzugef�gt werden. N�here Informationen dazu finden
sich in cdrtfe_lang.ini.

Ab cdrtfe 1.1pre2 kann auch zur Laufzeit eine andere Sprache gew�hlt werden
(Men� 'Extras'), vorausgesetzt, die Datei cdrtfe_lang.ini ist vorhanden und ent-
h�lt mindestens zwei Sprachprofile.

Ab cdrtfe 1.2 wird die aktuell gew�hlte Sprache in der cdrtfe.ini gespeichert.
Somit k�nnen auf Mehrbenutzer-Systemen (wie WinXP) die Nutzer individuell die
bevorzugte Sprache einstellen.


Bedienung
---------
Die Bedienung der Benutzeroberfl�che ist sehr einfach. Einfach Dateien oder Ver-
zeichnisse zur Dateiliste hinzuf�gen, die Einstellungen anpassen, den Brenner
aussuchen und den 'Start'-Knopf dr�cken. Es wird dann eine CD gem�� der aktuell
aktiven Registerkarte gebrannt.

Das Hinzuf�gen der Dateien und Verzeichnissen kann entweder �ber die Schalt-
fl�chen, durch das Kontextmen� oder per Drag and Drop erfolgen. Au�erdem ist es
m�glich, cdrtfe �ber Kommandozeilenoptionen zu steuern (s.u.).


Projekt-Dateien
---------------
Der aktuelle Zustand von cdrtfe kann in Projekt-Dateien gespeichert werden. Dazu
im Hauptfenster das Men� 'Projekt', dort den Eintrag 'Projekt speichern' aus-
w�hlen und einen Dateinamen f�r die Projekt-Datei angeben. Es werden dann alle
Einstellungen (inkl. aller Dateilisten) gespeichert.

Die Einstellungen werden in der Datei <name>.cfp gespeichert. Die unter 'Daten-
CD' und 'XCD' erstellten Verzeichnisstrukturen und die Namen der hinzugef�gten
Dateien sowie die unter 'Audio-CD' und 'VideoCD' ausgew�hlten Audio- und Video-
Tracks werden in der Datei <name>.cfp.files gespeichert. Wurden keinerlei
Dateien oder Verzeichnisse hinzugef�gt, wird <name>.cfp.files nicht erstellt.

�ber den Eintrag 'Projekt laden' k�nnen diese Projekt-Dateien wieder eingelesen
werden. Au�erdem ist das Laden �ber eine Kommandozeilenoption m�glich.

Hinweis: Da die Speicherung dateiorientiert erfolgt, kann cdrtfe beim Laden der
         Projekt-Datei eventuelle �nderungen im Datenbestand der Quelldateien
         nicht erkennen. So werden beispielsweise neue Dateien nicht automatisch
         in die entsprechenden Verzeichnisse auf der CD �bernommen.
         cdrtfe kann lediglich erkennen, da� eine im Projekt eingetragene Datei
         nicht mehr vorhanden ist. In diesem Fall wird eine Meldung ausgegeben.

Die in den Projekt-Dateien gespeicherten Einstellungen haben Vorrang gegen�ber
allen evtl. beim Programmstart geladenen Werten.

Mit der Version 1.0 hat sich das Format der Projekt-Dateien ge�ndert, d.h. die
mit �lteren Versionen erzeugten Dateien k�nnen nicht weiter verwendet werden.

Ab Version 1.1 k�nnen nun auch die Dateilisten unabh�ngig von den �brigen Ein-
stellungen geladen und gespeichert werden.

Der Eintrag 'Standardeinstellungen' l�dt die Standardeinstellungen aus der Datei
cdrtfe.ini ohne die Dateilisten zu ver�ndern.

Der Eintrag 'Alles zur�cksetzen' l�dt die Standardeinstellungen und l�scht alle
Dateilisten.


allgemeine Hinweise
-------------------
* cdrtfe zeigt Hinweise oder die Ausgaben der aufgerufenen Programme im unteren
  Bereich des Hauptfensters an. In der rechten unteren Ecke dieses Bereiches
  (dort, wo die Scroll-Balken aneinandersto�en) befindet sich eine kleine
  Schaltfl�che, die ein gr��eres Fenster f�r die Ausgabe �ffnet.
  Ein Rechts-Klick auf diese Schaltfl�che �ffnet ein Kontextmen�. Hier�ber
  k�nnen das Fenster geleert oder die Ausgaben gespeichert werden.

* Ein Rechtsklick auf die Laufwerksauswahl �ffnet ein Kontextmen�, welches das
  �ffnen und Schlie�en des ausgew�hlten Laufwerks erlaubt.

* Sollte kein CD-Brenner gefunden werden, so ist es dennoch m�glich, mit cdrtfe
  Images anzulegen.

* Wenn die Angabe zur Brenngeschwindigkeit fehlt, wird mit der h�chstm�glichen
  Geschwindigkeit gearbeitet. Die Angabe Brenngeschwindigkeit=0 bewirkt die
  geringste Schreibgeschwindigkeit, die mit Brenner und Rohling m�glich ist.

* Nachdem die gew�hlte Aktion gestartet wurde, erscheint im Hauptfenster die
  Schaltfl�che 'Abbrechen!'. Damit kann die Ausf�hrung des Vorgangs abgebrochen
  werden. Achtung: Ein solcher Abbruch macht nur Sinn _vor_ dem Beginn des
  eigentlichen Schreibvorgangs, also w�hrend des 10-Sekunden-Countdowns.
  Sollten mkisofs, Mode2CDMaker oder cdda2wav bereits Daten auf die Festplatte
  geschrieben haben, so werden diese nach einem erzwungenem Abbruch nicht auto-
  matisch gel�scht.

* Die Funktion 'Kapazit�t anzeigen' (Registerkarte 'CD-Info') arbeitet noch
  nicht in allen F�llen korrekt und sollte nicht mit herk�mmlichen CD-Laufwerken
  angewendet werden, da sonst m�glicherweise v�llig falsche Werte angezeigt
  werden.

* N�heres bez�glich der DVD-Unterst�tzung in der Datei readme_dvd_de.txt.

* cdrtfe ben�tigt Schreibzugriff auf das Programmverzeichnis oder das User-
  Verzeichnis (s.u.), um tempor�re Dateien (Dateilisten, ...) anzulegen. Daher
  kann es normalerweise nicht von einem Medium ohne Schreibrechte (z.B. CD) ge-
  startet werden. Ab cdrtfe 1.1pre5 ist es aber m�glich, in der cdrtfe.ini,
  Sektion [General], den Eintrag 'AskForTempDir=1' zu setzen. Dann fragt cdrtfe
  beim Start nach einem Verzeichnis f�r die tempor�ren Daten.

* Sofern nicht anders angegeben, verwendet cdrtfe als Voreinstellung f�r Image-
  Dateien den Pfad %TEMP%\image.iso und %TEMP%\ f�r den Ordner f�r tempor�re
  Wave-Dateien.

* Wenn cdrtfe die Kommandozeilenprogramme ausf�hrt, zeigt der Taskbar-Eintrag
  den jeweiligen Fortschritt der Aktion an (sofern m�glich).

    [I: x%]    Image erstellen.
               mkisofs     : Fortschritt der Image-Erstellung
               Mode2CDMaker: Fortschritt der aktuellen Datei

    [Ty: x%]   cdrecord: Forschritt beim Schreiben von Track y

    [Blanking] cdrecord: Disk l�schen

    [Fixating] cdrecord: Disk fixieren

    [V: x/y]   cdrtfe: Vergleich: x von y Dateien beendet

    [D: x/y]   cdrtfe: Suche nach Dateiduplikaten

    [X: x/y]   cdrtfe: Erstellen der XCD-Info-Datei

    [active]   andere Aktionen

* Mit der Taste F12 wird das cdrtfe-Hauptfenster dauerhaft in den Vordergrund
  gesetzt (Stay-on-top).


Portabler Modus
---------------
Unter Win NT/2k/XP erstellt cdrtfe beim ersten Start einen Ordner 'cdrtfe' im
Verzeichnis des aktuellen Benutzers. Hier werden Einstellungen (cdrtfe.ini,
s.u.) und einige tempor�re Dateien gespeichert.

cdrtfe kann gezwungen werden, alle Einstellungen und tempor�ren Dateien im
eigenen Programmordner anzulegen. Um dies zu erreichen gibt es zwei M�glich-
keiten:

  - cdrtfe mit der Kommandozeilenoption /portable starten .

  - Im Programmordner von cdrtfe eine Datei cdrtfe.ini erzeugen, die mindestens
    folgende Zeilen enth�lt:
    
      [General]
      PortableMode=1

Dies funktioniert nat�rlich nur, wenn der aktuelle Benutzer Schreibzugriff auf
das cdrtfe-Programmverzeichnis hat.

Unter Win9x/Me haben diese Einstellungen keinerlei Auswirkungen.


cdrtfe - Einstellungen
----------------------
* Registerkarte 'cdrtfe': allgemeine Einstellung zu cdrtfe

  - ShellExtensions verwenden
    Wenn diese Option ausgew�hlt ist, k�nnen Dateien und Ordner direkt aus dem
    Explorer heraus �ber den Men�punkt 'cdrtfe' an cdrtfe gesendet werden. Die
    ShellExtensions sind f�r die Verwendung unter Win9x gedacht (siehe Abschnitt
    'ShellExtensions').
    Unter Win2k und XP kann die selbe Funktion mit einer Verkn�fung zu cdrtfe im
    'Senden an'-Men� erreicht werden. Die (De-)Aktivierung der ShellExtensions
    ist unter Win NT/2k/XP nur mit Administrator-Rechten m�glich.

  - Best�tigung
    Die Sicherheitsabfragen vor dem eigentlichen Start des Brennvorgangs k�nnen
    abgeschaltet werden. Der Vorgang beginnt dann unmittelbar nach dem Klick auf
    die Schaltfl�che 'Start'. Es erfolgt keine weitere Nachfrage!
    Dies gilt ebenfalls f�r die Sicherheitsabfragen beim Entfernen von Dateien
    und Ordnern aus einem Projekt.

  - Einstellungen speichern
    Die aktuellen Einstellungen von cdrtfe k�nnen auch als Standard festgelegt
    werden. Dazu im Dialog 'Einstellungen' in der Rubrik 'Einstellungen
    speichern' auf 'speichern' klicken. Der Zustand von cdrtfe wird dann in der
    Datei cdrtfe.ini abgelegt. Der Button 'l�schen' entfernt entfernt diese
    Datei wieder.

    Sofern beim Start die Datei cdrtfe.ini gefunden wird, werden die Standard-
    Einstellungen automatisch geladen.

    Unter Win9x wird die Datei cdrtfe.ini im Programmverzeichnis von cdrtfe an-
    gelegt. Unter Win2k/XP in einem der folgenden Verzeichnisse:
    1. Dokumente und Einstellungen\<user>\Lokale Einstellungen\Anwendungsdaten\
       cdrtfe
    2. Dokumente und Einstellungen\<user>\Anwendungsdaten\cdrtfe
    3. Dokumente und Einstellungen\Alle user\Anwenungsdaten\cdrtfe
    4. <Programmverzeichnis von cdrtfe>
    Beim Laden wird die erste cdrtfe.ini verwendet, die gefunden wird. Die
    Verzeichnisse werden in der oben genannten Reihenfolge durchsucht.

    Beim Speichern der Standard-Einstellungen werden im Gegensatz zu fr�heren
    Programmversionen nun auch die Einstellungen f�r zus�tzliche Kommandozeilen-
    optionen (s.u.) ber�cksichtigt.
    Eventuell zu einem Projekt hinzugef�gte Dateien jedoch nicht.

    Sollte zus�tzlich auch eine Projekt-Datei geladen werden, so haben die dort
    festgelegten Einstellungen Vorrang.

    cdrtfe wertet Registry-Eintr�ge von fr�heren Versionen (0.8 - 0.9.2) nicht
    aus.

  - tempor�re Dateien
    Wenn eine Audio-CD aus MP3-Dateien erstellt werden soll, m�ssen diese zu-
    n�chst in Wave-Dateien konvertiert werden. Diese tempor�ren Dateien werden
    in dem hier angegebenen Verzeichnis gespeichert und nach Abschlu� des
    Schreibvorgangs automatisch wieder gel�scht.

* Registerkarte 'cdrecord': Einstelungen f�r cdrecord und mkisofs

  - ausf�hrlichere Ausgabe
    Diese Option f�hrt zu einer detailierteren Ausgabe von cdrecord.

  - Burnfree verwenden
    Dies aktivert bei einem Brennen den Puffer-Leerlaufschutz, sofern vorhanden.

  - Simulationstreiber verwenden
    Wenn diese Option aktiviert ist, verwendet cdrecord einen Treiber, der einen
    Brenner nur simuliert. Damit k�nnen beispielsweise Timing-Tests bei be-
    liebigen Geschwindigkeiten gemacht werden.

  - Gr��e des FIFO-Puffers festlegen
    Hiermit kann die Gr��e des von cdrecord beim otf-Schreiben verwendeten
    Puffers bestimmt werden. Der Puffer sollte mindestens so gro� sein wie der
    des Brenners und maximal etwa halb so gro� wie der verf�gbare Hauptspeicher.

  - zus�tzliche Kommandozeilenoptionen
    Es ist m�glich, f�r cdrecord und mkisofs Optionen anzugeben, die nicht
    direkt von cdrtfe unterst�tzt werden. cdrtfe merkt sich die eingegebenen
    Optionen und bietet sie zu Wiederauswahl in einer Liste an.

    Diese zus�tzlichen Optionen f�r mkisofs finden nur beim Erstellen einer
    Daten-CD Anwendung. Die Optionen f�r cdrecord auch bei Audio-CDs und beim
    Brennen von ISO-Images.

* Registerkarte 'cdrecord (2)': weitere Einstellungen f�r cdrecord

  - Schreibgeschwindigkeit
    Seit Version 2.01a33 pr�ft cdrecord die maximale DMA-Geschwindigkeit des
    Systems und legt eine maximale Schreibgeschwindigkeit fest, die ein sicheres
    Schreiben ohne einen Pufferleerlauf erm�glicht.

    Diese Option erlaubt es, die Schreibgeschwindigkeit bis zur maximalen DMA-
    Geschwindigkeit heraufzusetzten.

  - Eject
    Diese Option ist zu w�hlen, wenn die CD/DVD nach einem Schreibvorgang auto-
    matisch ausgeworfen werden soll.

* Registerkarte 'cdrdao': Einstellungen f�r cdrdao

  - CUE-Images
    Wenn cdrecord Version 2.01a24 (oder neuer) vorliegt, werden CUE-/BIN-Images
    standardm��ig mit cdrecord geschrieben. Mit dieser Option kann cdrtfe ge-
    zwungen werden, stattdessen cdrdao daf�r zu verwenden.

  - cdrdao-Treiber
    Sollte cdrdao keinen geeigneten Treiber f�r den CD-Brenner finden k�nnen, so
    wird im Ausgabefenster eine Fehlermeldung angezeigt, die empfiehlt, die
    Treiber 'generic-mmc' bzw. 'generic-mmc-raw' auszuprobieren. Um cdrdao zu
    zwingen, einen dieser Treiber zu verwenden, kann im Dialog 'Einstellungen'
    die entsprechende Option gew�hlt werden.

* Registerkarte 'Audio-CD': Einstellungen f�r Audio-CDs

  - CD-Text:
    Beim Hinzuf�gen von Audiodateien zum Projekt werden die CD-Text-Eintr�ge
    (Dialog 'Tracks') f�r Titel und Interpret automatisch ausgef�llt.

    * Tags verwenden
      F�r die Informationen werden, sofern sie vorhanden sind, die in den
      Dateien gespeicherten ID-Tags verwendet.

    * Dateinamen verwenden
      Die Informationen f�r Titel und Interpret werden aus den Dateinamen er-
      mittelt. Folgenden Formate werden erkannt:

        <Nr> - <Interpret> - <Titel>.*
        <Nr> - <Titel> - <Interpret>.*
        <Nr> <Interpret> - <Titel>.*
        <Nr> <Titel> - <Interpret>.*

      Falls vorhanden werden Tracknummern immer entfernt. Entspricht der Name
      keiner dieser Formate, wird der gesamte Name als Titel verwendet.

    Bei Wave-Dateien (*.wav) werden die Informationen immer aus den Dateinamen
    ermittelt.


Konfigurationsdateien
---------------------
Es gibt drei Konfigurationsdateien f�r cdrtfe:

* cdrtfe.ini

  Diese Datei existiert beim ersten Start noch nicht und kann �ber den Dialog
  'Einstellungen' angelegt werden (siehe oben).

* cdrtfe_lang.ini

  Diese Datei enth�lt die f�r cdrtfe verf�gbaren �bersetzungen. In der Datei
  finden sich weitere Informationen.

* cdrtfe_tools.ini

  Diese Datei wird im allgemeinen nicht ben�tigt. Sie erm�glicht es, die Namen
  und auch den Pfad der von cdrtfe verwendeten Kommandozeilenprogramme zu ver-
  �ndern. Weitere Informationen in der Datei cdrtfe_tools.ini.


RSCSI, entfernte Laufwerke, Laufwerksbuchstaben
-----------------------------------------------
Damit cdrtfe Remote-Laufwerke findet, ist ein Eingriff in die cdrtfe.ini n�tig.
Falls diese Datei noch nicht existiert, kann sie im Dialog 'Einstellungen' ange-
legt werden.

In der Sektion [Drives] gibt es folgende Eintr�ge:

   [Drives]
   UseRSCSI=0
   Host=rscsi@pc.domain.invalid
   RemoteDrives=r,s,t
   LocalDrives=y,x

Mit 'UseRSCSI=1' sucht cdrtfe nach Remote-Laufwerken, mit 'UseRSCSI=0' nach
lokalen Laufwerken. Entfernte und lokale Laufwerke zusammen zu benutzen, ist
noch nicht implementiert.

Um nach dem Brennvorgang die geschriebenen Daten zu verifizieren, ben�tigt
cdrtfe Zugriff auf den Brenner �ber einen Laufwerksbuchstaben, daher m�ssen
den entfernten Laufwerken Windows-Laufwerksbuchstaben zugewiesen werden.

�ber die Eintr�ge 'RemoteDrives' und 'LocalDrives' wird cdrtfe mitgeteilt,
welche Laufwerksbuchstaben es f�r die entferten bzw. lokalen Laufwerken
verwenden soll. Die Buchstaben werden in der Reihenfolge der SCSI-IDs den
Laufwerken zugeordnet.

Sollten mehr Laufwerke vorhanden sein als Buchstaben, so wird den letzen Lauf-
werken eben kein Buchstabe zugeordnet, handelt es sich um Remote-Laufwerke,
k�nnen dann die CDs nicht verifiziert werden.
Bei lokalen Laufwerken versucht cdrtfe - wie bisher - das richtige Laufwerk
selbstst�ndig zu finden.

'LocalDrives' wird nur ber�cksichtigt, wenn 'UseRSCSI' auf 0 gesetzt ist.


Automatisches L�schen
---------------------
Diese Funktion kann im Dialog 'Einstellungen', Registerkarte 'cdrecord (2)'
aktiviert werden. Sie ist verf�gbar f�r alle Projekte, bei denen der Rohling vor
dem Schreibvorgang �berpr�ft wird (Daten-CD, Audio-CD, DVD-Video).

Wenn eine fixierte CD-RW oder DVD-RW erkannt wird, fragt cdrtfe beim Nutzer
nach, ob die Disk automatisch gel�scht werden soll. 'Ok' f�gt der cdrecord-
Kommandozeile 'blank=fast' an, um den Rohling vor dem Schreiben zu l�schen.

Mit �lteren Laufwerken, die keine Profile unterst�tzen, ist es unm�glich,
zwischen fixierten CD-Rs und CD-RWs zu unterscheiden. Also fragt cdrtfe in
beiden F�llen nach. Es wird jedoch kein Schaden angerichtet, wenn man versucht,
eine CD-R zu l�schen, da cdrecord mit einer Fehlermeldung abbricht. Mit neueren
Laufwerken, wie DVD-Brennern, tritt dieses Problem nicht auf.

Die Funktion zum automatischen L�schen wird nur ausgel�st, wenn eine fixierte
Disk eingelegt ist, und nicht, wenn auf einer unfixierten Multisession-CD nicht
gen�gend Platz vorhanden ist.


Automatische Erkennung der Geschwingkeiten
------------------------------------------
cdrtfe 1.2 (und neuer) versucht, die Listen mit den verf�gbaren Geschwindig-
keiten jedes Mal anzupassen, wenn eine Disk in ein Laufwerk eingelegt wird.

Standardm��ig ist diese Funktion abgeschaltet. Um sie zu aktivieren, ist die
Zeile 'DetectSpeeds=1' in der Sektion [General] der cdrtfe.ini einzuf�gen.

Es gibt einige Voraussetzungen und Einschr�nkungen:

* Die Windows-Funktion 'Benachrichtigung beim Wechsel' mu� f�r die CD-Laufwerke
  eingeschaltet sein.

* Nur neuere Laufwerke (MMC-2-kompatibel und neuer?) geben eine komplette Liste
  der Schreibgeschwindigkeiten heraus. �ltere Ger�te melden nur die maximale
  Schreibgeschwindigkeit. In diesem Fall verwendet cdrtfe die alte Liste (von 1x
  bis zur maximalen Geschwindigkeit).

* cdrecord gibt nur die maximale Lesegeschwindigkeit zur�ck, keine Liste mit den
  verf�gbaren Geschwindigkeiten. Somit wird die alte Liste verwendet (von 1x bis
  zur maximalen Lesegeschwindigkeit).

* Die automatische Geschwindigkeitserkennung ist f�r entfernte Laufwerke via
  RSCSI nicht verf�gbar.

* Das Verwenden dieser Funktion verlangsamt den Start von cdrtfe (f�r jedes
  Laufwerk wird 'cdrecord -prcap' und 'cdrecord -checkdrive' aufgerufen).

* Aus dem gleichen Grund dauert es einige Zeit, die Geschwindigkeiten zu er-
  kennen, nachdem eine Disk eingelegt wurde.

* Da cdrtfe die Zurodnung der Laufwerksbuchstaben zu den CD-Laufwerken nicht
  kennt, wird jedes einzelne Laufwerk gepr�ft, wenn eine Disk eingelegt wurde
  (sofern mehrere CD-Laufwerke vorhanden sind). Ein weiterer Grund, warum die
  Erkennung relativ langsam erfolgt. Um diesen Vorgang zu beschleunigen, sollte
  der Eintrag 'LocalDrives' in der Sektion [Drives] in der cdrtfe.ini gesetzt
  werden. Dann ist es cdrtfe m�glich, nur das betroffenen Laufwerk abzufragen.
  Mehr Infos zu 'LocalDrives' unter 'RSCSI, entfernte Laufwerke, Laufwerksbuch-
  staben'.

* Wird diese Funktion verwendet, kann es passieren, da� beim Laden existierender
  Projekt-Dateien falsche Geschwindigkeiten ausgew�hlt werden. Eine Aktuali-
  sierung der Listen in einem Projekt kann die Einstellunge eines anderen
  Projekts beeinflussen.


Daten-CD
--------
* Ordnerstruktur

  Mit dieser Version von cdrtfe ist es m�glich, beliebige Verzeichnisstrukturen
  zu erstellen. Es k�nnen bestehende Ordner hinzugef�gt oder neue Ordner er-
  stellt werden. Ordner k�nnen umbenannt, verschoben und entfernt werden.
  Dateien k�nnen an beliebigen Stellen hinzugef�gt, umbenannt, verschoben und
  entfernt werden.

  Ab cdrtfe 1.1 werden auch leere Ordner auf die CD geschrieben.

* CD-Optionen

  - CD/Schreibmodus
    Mit diesem Dialog wird der Schreibmodus (track-at-once, disk-at-once, raw)
    und die Art der CD (single- oder multisession) festgelegt. Bei einer Multi-
    session-CD besteht die M�glichkeit, vorherige Sessions zu importieren.

  - ISO-Image
    CDs k�nnen entweder direkt (on-the-fly) oder �ber ein Image geschrieben
    werden. Wird letztere Methode verwendet, mu� ein Name und ein Verzeichnis
    f�r die Image-Datei angegeben werden. Es besteht auch die M�glichkeit, nur
    ein Image zu erzeugen oder zu verhindern, da� das Imge nach dem Schreibvor-
    gang gel�scht wird.

* Dateisystem-Optionen

  Dieser Dialog erm�glicht die Auswahl des Dateisystems (ISO, Joliet, Rock
  Ridge, UDF). Auch Einstellungen f�r Boot-CDs sind m�glich.

* Dateisystem�berpr�fung

  Entsprechend den aktuellen Einstellungen zum Dateisystem erkennt cdrtfe zu
  lange Datei- und Verzeichnisnamen, sowie zu tiefe Verzeichnisebenen. Im
  daraufhin angezeigten Fenster k�nnen die Dateien passend umbenannt werden,
  au�erdem werden Hinweise zu m�glichen Optionen gegeben, die die Anzahl der zu
  korrigierenden Namen minimieren k�nnten.

  Mit der Schaltfl�che 'Ok' werden die noch nicht korrigierten Dateinamen so be-
  lassen, wie sie sind. Neue Dateien und Ordner werden jedoch weiterhin �ber-
  pr�ft.

  'Ignorieren' schaltet die �berpr�fung ganz ab, bis sie wieder explizit vom
  Nutzer ausgel�st wird. Durch den Button im Bereich 'Dateisystem' kann diese
  �berpr�fung jederzeit durchgef�hrt werden. Es werden dann alle Dateien und
  Verzeichnisse mit zu langen Namen angezeigt.

  Werden zu lange Dateinamen nicht vom Nutzer korrigiert, versucht mkisofs, die
  Namen entsprechend der maximal m�glichen Anzahl von Zeichen zu k�rzen. Sollten
  hierbei jedoch Namensgleichheiten oder andere Probleme auftreten, so bricht
  mkisofs mit einer Fehlermeldung ab.

* �berlange Dateinamen

  Es gibt mehrere M�glichkeiten, �berlange Dateinamen zu benutzen.

  Die Joliet-Spezifikation sieht Dateinamen mit einer L�nge von bis zu 64
  Zeichen vor. Mit der mkisofs-Option '-joliet-long' k�nnen jedoch bis zu 103
  Zeichen verwendet werden, was eine Verletzung der Spezifikation darstellt.
  Daher ist diese Option mit Vorsicht einzusetzten, obwohl sie in den meisten
  F�llen zum gew�nschten Ergebnis f�hrt.

  Unter Verwendung eines Dateisystems nach dem Standard ISO9660:1999 sind Datei-
  namen mit einer L�nge von bis zu 207 Zeichen erlaubt. Hierf�r ist die mkisofs-
  Option 'ISO Level 4' zu aktivieren. Sie ist erst ab der cdrtools-Version
  2.01a01 vorhanden.
  Bei der gleichzeitigen Verwendung der Rock-Ridge-Extensions verringert sich
  die Anzahl der Zeichen auf 197.
  Werden auch die Joliet-Extensions verwendet, so sind unter Windows nur die
  Dateinamen des Joliet-Dateisystems sichtbar (64 bzw. 103 Zeichen).

  Die zus�tzliche Angabe des Ausgabe-Zeichensatzes f�r das ISO9660:1999-Datei-
  system ist erst ab Version 2.01a09 m�glich.
  Als Zeichensatz sollte nach M�glichkeit ein Zeichensatz gew�hlt werden, der
  auf dem System vorhanden ist, auf welchem die CD genutzt werden wird. Bei
  Win9x ist dies in der Regel cp437 oder cp850. Durch die Wahl eines geeigneten
  Zeichensatzes k�nnen auch bei den ISO-Dateinamen Sonderzeichen, wie z.B. Um-
  laute, verwendet werden.

  Bootf�hige ISO9660:1999-CDs k�nnen erst ab cdrtools Version 2.01a16 erstellt
  werden.

  Um sehr lange Dateinamen zu verwenden kann auch die Option 'UDF-Dateisystem
  verwenden' aktivert werden. Damit sind dann sogar mehr als 207 (bis zu 247?)
  Zeichen f�r Dateinamen m�glich.

* Verify

  Durch Ausw�hlen der Option 'Verify' wird cdrtfe veranla�t, nach dem Brenn-
  vorgang die auf die CD geschriebenen Dateien mit den Quelldateien bitweise zu
  vergleichen. Sollten sich dabei Unterschiede ergeben, wird dies im Ausgabe-
  fenster an gezeigt.
  Vor dem Vergleich wird ein Reload durchgef�hrt, d.h. die CD wird ausgeworfen
  und gleich darauf wieder eingelesen. Sollte dies nicht m�glich sein (z.B. bei
  einem Notebook-Laufwerk), bietet cdrtfe die Auswahl, die CD manuell wieder
  einzulegen und den Vergleich zu starten oder den Vergleich abzubrechen.

  Es ist auch m�glich, nachtr�glich noch einen Vergleich der Dateien durchzu-
  f�hren. Dazu kann im Kontextmen� der Option 'Verify' der Punkt 'Vergleich
  starten' gew�hlt werden. Diese Option ist nur verf�gbar, wenn die Register-
  karte 'Daten-CD' angezeigt wird und Dateien in das Projekt eingef�gt wurden.

  Momentan kann es beim Einlesen des Inhaltsverzeichnisses der CD zu Problemen
  kommen (Meldung: Konnte CD nicht finden, Vergleich abgebrochen!). In diesem
  Falle kann es helfen, die CD nochmals neu ins Laufwerk einzulegen und den
  Vergleich manuell zu starten.
  Au�erdem werden beim Verify Dateien nicht ber�cksichtigt, deren Namen durch
  mkisofs automatisch gek�rzt wurden. In einem solchen Falle meldet cdrtfe
  f�lschlicherweise, da� die betreffende Datei nicht gefunden wurde.

* Identische Dateien verlinken

  Die Option 'identische Dateien finden und verlinken' (Dialog 'Dateisystem')
  veranla�t cdrtfe dazu, vor dem eigentlichen Brennvorgang alle Quelldateien
  miteinander zu vergleichen. Findet das Programm dabei identische Dateien, so
  werden diese jeweils nur einmal auf die CD geschrieben. Bei jedem weiteren
  Vorkommen wird auf die erste Datei verwiesen. So k�nnen Dateiduplikate platz-
  sparend untergebracht werden.

  Anders als das Programm "Duplicate File Linker" (dfl.exe) ver�ndert cdrtfe die
  Quelldateien nicht.

  Wichtig!   Wenn diese Option gew�hlt ist, wird mkisofs mit der Option
             -cache-inodes aufgerufen. Laut man-Page von mkisofs funktioniert
             dies unter Win32/cygwin nicht zuverl�ssig, so da� es bei vielen
             unterschiedlichen Dateien (>5000) zu Problemen kommen kann. In
             diesem Fall, w�ren Dateien mit falschem Inhalt das Ergebnis.

             Daher sollten CDs oder Images, die mit dieser Option erstellt
             wurden, unbedingt �berpr�ft werden.

             Bei einem Test mit fast 13.000 Dateien, von denen mehr als 6.000
             Duplikate waren, gab es jedoch keinerlei Fehler.

             Dieses Problem tritt nicht mehr bei neueren Versionen (z.B. 1.5.14)
             der cygwin1.dll auf (mit > 120.000 Dateien getestet).

  Wird die Mingw-Version von mkisofs verwendet (genauer: mkisofs 2.01-bootcd.ru)
  funktioniert diese Option nicht.
  Um trotzdem Dateiduplikate zu ber�cksichtigen, kann stattdessen f�r mkisofs
  -duplicates-once als zus�tzliche Kommandozeilenoption angegeben werden
  (Dialog 'Einstellungen', Registerkarte 'cdrecord'). Die Option 'identische
  Dateien suchen und verlinken' darf dann nicht ausgw�hlt sein.

* Daten-DVD

  Vorausgesetzt, es ist eine DVD-f�hige Version von cdrecord vorhanden, ist es
  auch m�glich, Daten-DVDs zuschreiben.


Audio-CD
--------
Es k�nnen nur Audio-Daten geschrieben werden, die als Wave-Datei im PCM-Format
mit 44.1 kHz, 16 Bit, stereo vorliegen. Wenn die entsprechenden Programme
(madplay, oggdec, flac) vorhanden sind, k�nnen auch Dateien im MP3-, Ogg- und
FLAC-Format verwendet werden; sie werden dann vorher ins Wave-Format umge-
wandelt.

* Audio-CD-Optionen ('Optionen')

  - CD abschlie�en
    Wenn eine Audio-CD nicht abgeschlossen wird, ist es m�glich, sp�ter noch
    weitere Audio-Tracks anzuf�gen. Allerdings ist eine solche CD meist nur im
    CD-Brenner abspielbar, bis sie abgeschlossen wurde. Dies kann entweder durch
    die Funktion 'CD fixieren' geschehen oder indem weitere Audio-Tracks bei
    aktivierter Option 'CD abschlie�en' hinzugef�gt werden.

  - CD-Plus/Multisession
    cdrtfe erm�glicht das Erstellen einer CD-Plus (auch Enhanced CD, CD-Extra).
    Dies ist eine Multisession-CD, deren erste Session Audio-Tracks enth�lt und
    alle weiteren Sessions Daten. Das Erstellen einer CD-Plus erfolgt in zwei
    Schritten:
      o Hierzu wird zun�chst eine Audio-CD erstellt (Registerkarte 'Audio-CD'),
        wobei die Optionen 'Multisession' und 'CD abschlie�en' aktiviert sein
        m�ssen.
      o Nach diesem ersten Brennvorgang kann dann eine Datensession angef�gt
        werden (Registerkarte 'Daten-CD'). Dabei mu� die Option 'Multisession'
        aktiviert und die Option 'vorhandene Sessions importieren' deaktiviert
        sein.

  - Info-Dateien
    Wird die Option 'Info-Dateien verwenden' aktiviert, so verwendet cdrecord
    beim Brennen die inf-Dateien, die cdda2wav beim Extrahieren von Audio-Tracks
    erzeugt.

  - CD-Text schreiben
    Wird diese Option verwendet, werden - so vorhanden - CD-Text-Informationen
    auf die CD geschrieben. CD-Text-Daten k�nnen im Dialog 'Track-Eigenschaften'
    (Schaltfl�che 'Tracks')eingegeben werden. Alternativ k�nnen die Daten aus
    den inf-Dateien verwendet werden. In diesem Falle mu� auch die Option 'Info-
    Dateien verwenden' aktiviert sein.

* Track-Eigenschaften ('Tracks')

  - CD-Text
    Hier k�nnen die CD-Text-Informationen eingegeben werden. F�r die gesamte CD
    sowie f�r jeden einzelnen Track k�nnen Titel und Interpret angegeben werden.

    Momentan erm�glicht cdrtfe nur die Eingabe dieser Informationen. Wenn jedoch
    das Projekt gespeichert wird, k�nnen durch manuelles Editieren der Projekt-
    Datei (*.cfp.files) noch folgende Daten hinzugef�gt werden: Texter,
    Komponist, Arrangeur und eine Nachricht. In der Projekt-Datei haben die
    Daten folgendes Format:
    <Title>|<Performer>|<Songwriter>|<Composer>|<Arranger>|<Message>

    Jede einzelne Zeichenkette (z.B. Titel) mu� k�rzer als 160 Zeichen sein.
    Sollten insgesamt zu viele Daten eingegeben worder sein, gibt cdrtfe eine
    Fehler meldung aus.

    CD-Text-Daten aus diesem Dialog haben Vorrang vor Informationen aus den
    inf-Dateien.

  - Pausen zwischen den Tracks
    Hier kann festgelegt werden, wie gro� die Pausen zwischen den einzelnen
    Tracks sein sollen. Die Angabe erfolgt in Sekunden oder Sektoren, wobei
    1 Sekunde 75 Sektoren entspricht.

    Diese Einstellungen werden nicht angewendet, wenn die Option 'Info-Dateien
    verwenden' aktiviert ist.

* Mixed Mode CD

  cdrtfe unterst�tzt das Erstellen einer Mixed Mode CD (ein Daten-Track gefolgt
  von Audio-Tracks) nicht. Mit cdrecord erzeugt man eine solche CD mit:
  cdrecord -v dev=... cdimage.iso -audio track1.wav ...

* m3u-Playlisten

  Zur Zeit sind nur absolute Dateipfade m�glich. Wenn die Playlist also relative
  Pfandangaben enth�lt, werden diese ignoriert. Eine Playlist kann zum Audio-CD-
  Projekt wie eine Sounddatei hinzugef�gt werden (Datei-Dialog, Drag-and-Drop,
  Kommandozeile).


XCD (Mode2/Form2)
-----------------
* Ordnerstruktur

  Wie bei einer Daten-CD kann auch bei XCDs eine beliebige Verzeichnisstruktur
  erstellt werden. Es ist lediglich nicht m�glich, den Dateien auf der CD einen
  abweichenden Namen zu geben, da der Mode2CDMaker dies zur Zeit nicht unter-
  st�tzt.
  Aus diesem Grunde nimmt cdrtfe hierbei auch keine �berpr�fung auf zu lange
  Dateinamen vor.

* Dateinamen

  Standardm��ig versucht der Mode2CDMaker, die Dateinamen so beizubehalten, wie
  sie vorgefunden werden. Dies gilt sowohl f�r die L�nge, als auch f�r die Gro�-
  und Kleinschreibung.

  Durch Ausw�hlen der entsprechenden Option kann aber f�r die Dateinamen Kon-
  formit�t nach ISO-Level 1 (u.a. Gro�buchstaben und 8.3-Format) oder 2 (bis zu
  31 Gro�buchstaben) erzwungen werden. In beiden F�llen werden nach ISO9660
  nicht erlaubte Zeichen durch '_' ersetzt.

  Wenn die Quelldateien sehr lange Dateinamen haben, sind unter Umst�nden un-
  erwartete Ergebnisse oder Fehlermeldungen des Mode2CDMakers m�glich.

* Form1/2-Daten

  Dateien aus der Dateiliste (obere Liste) werden im Format Mode2/Form1 ge-
  schrieben, d.h. sie sind direkt (z.B. aus dem Explorer heraus) lesbar.

  Dateien aus der Movie-Liste werden als Mode2/Form2-Daten geschrieben, d.h. sie
  k�nnen nur unter Verwendung von dat2file.exe genutzt werden. Alternativ k�nnen
  sie mit Hilfe eines geeigneten Filter-Treibers direkt wiedergegeben werden,
  sofern es sich um abspielbare Dateien handelt.

  Es ist m�glich, �ber die Schaltf�che 'Movie hinzuf�gen' auch beliebige Dateien
  zur Movie-Liste hinzuzuf�gen, die dann ebenfalls als Mode2/Form2-Daten ge-
  schrieben werden. Diese Dateien k�nnen dann nat�rlich nur mittels dat2file.exe
  ausgelesen werden.

  Dateien k�nnen per Drag-and-Drop von einer Liste in die andere verschoben
  werden.

  Dateien mit der Endung .avi werden automatisch der Movie-Liste hinzugef�gt.

* Info-Datei

  Wenn die Option 'Info-Datei erzeugen' gew�hlt ist, wird im Hauptverzeichnis
  der CD die Datei xcd.crc erstellt, die f�r alle Form2/Mode2-Dateien die ur-
  spr�ngliche Dateigr��e und eine CRC32-Pr�fsumme enth�lt. Mit Hilfe dieser
  Informationen kann das Programm Mode2/Form2 File Extractor (m2f2extract.exe,
  zu finden auf cdrtfe.sourceforge.net) die Dateien in ihrer urspr�nglichen
  L�nge ohne die hinzugef�gten Null-Bytes extrahieren.
  Momentan funktioniert dies nur, wenn die XCD mit einem uneingeschr�nkten ISO-
  Dateisystem erstellt wird.

* Single-Track-Image

  Eine Einschr�nkung der Mode2/Form2-CDs ist die minimale Gr��e von ca.
  340,5 KiByte (genau: 348.601 Byte) f�r jede Datei, die als Mode2/Form2-Datei
  geschrieben werden soll. Au�erdem leidet die Effizienz, wenn viele relativ
  kleine Dateien geschrieben werden sollen, da f�r jede einzelne Mode2/Form2-
  Datei ein separater Track angelegt wird.

  Beide Probleme lassen sich durch die Aktivierung der Option 'Single-Track-
  Image' umgehen. Damit ist es m�glich, Dateien mit weniger als 340,5 KiByte im
  Mode2/Form2-Format zu schreiben. Au�erdem steht insgesamt mehr Platz zur Ver-
  f�gung, da alle Dateien in einem einzelnen Track abgelegt werden und auch kein
  'ISO-Bridge'-Track ben�tigt wird.

  Als Nachteil dieser Methode ist es nicht m�glich, diese aus einem Single-
  Track-Image erzeugten XCDs unter Linux zu lesen, da dies zur Zeit von keiner
  Software unterst�tzt wird.

* Verify

  Durch Ausw�hlen der Option 'Verify' wird cdrtfe veranla�t, nach dem Brennvor-
  gang die auf die CD geschriebenen Dateien mit den Quelldateien bitweise zu
  vergleichen. Sollten sich dabei Unterschiede ergeben, wird dies im Ausgabe-
  fenster an gezeigt.

* Wichtig!

  Die Vergr��erung der Kapazit�t einer CD um ca. 13% geht zu Lasten der Fehler-
  korrektur.

  An Dateien, deren urspr�ngliche L�nge in Bytes kein Vielfaches von 2324 ist,
  werden entsprechend viele Null-Bytes angeh�ngt. Dadurch kann eine Datei evtl.
  unbrauchbar werden.

* Fehlerkorrektur mit rrenc/rrdec

  Um den Nachteil der eingeschr�nkten Fehlerkorrektur zu umgehen, k�nnen mit dem
  Programm rrenc Redundanz-Daten erzeugt werden, mit deren Hilfe das Programm
  rrdec fehlerhafte Sektoren wiederherstellen kann.

  Um diesen zus�tzlichen Schutz zu verwenden kann die Option 'Fehlerkorrektur
  erm�glichen' gew�hlt werden. 'Sektoren' gibt an, wieviele Sektoren (1 Sektor =
  2324 Bytes) zur Speicherung der Redundant-Daten verwendet werden sollen. Ent-
  sprechend verringert sich die f�r Nutzdaten zur Verf�gungs stehende Kapazit�t.

  Die Redundanzdaten werden auf der CD im Verzeichnis _rec_ abgelegt, zusammen
  mit rrenc.exe und rrdec.exe. Um die gesch�tzten Daten zu extrahieren wird
  rrdec aus der MS-DOS-Eingabeaufforderung heraus aufgerufen:

    z:\_rec_\rrdec -@ z:\_rec_\protect.rrt -t n:\cd -w -v -e dat -s z:\

  Hierbei ist z: das CD-Laufwerk mit der gesch�tzten XCD, n:\cd der Ordner,
  in den die Dateien von der CD kopiert werden und dat die Endung der Form2-
  Dateien.


DAE (Auslesen von Audio-CDs)
----------------------------
Zum Auslesen von Audio-Track mittels cdda2wav zun�chst durch Klicken der Schalt-
fl�che 'Toc einlesen' das Inhaltverzeichnis einlesen. Dann die gw�nschten Tracks
ausw�hlen, ein Verzeichnis angeben und auf 'Start' klicken.

* DAE-Optionen, Registerkarte 'DAE':

  - Dateinamen
    o Pr�fix f�r die Dateinamen:
      Die Dateinamen f�r die Tracks werden erzeugt, indem an das Pr�fix die
      Tracknummer angeh�ngt wird.

      Beispiel:   Pr�fix:   track
                  Namen :   track_01.wav, track_02.wav, ...

    o Namen aus CD-Infos:
      Die Dateinamen werden aus dem angegebenen Schema erzeugt. Das Schema ist
      eine Zeichenkette, in der folgende Platzhalter vorkommen k�nnen:
        %N    Tracknummer
        %T    Titel
        %P    Interpret

      Die Angaben f�r Titel und Interpret stammen aus den CD-Text-Infos (sofern
      vorhanden) oder von einer Freedb-Abfrage, wobei CD-Text-Infos Vorrang
      haben.

      Beispiel:   Schema:   %N %P - %T
                  Namen :   01 Angelo Branduardi - Si pu� fare.wav
                            02 Angelo Brnaduardi - Il viaggiatore.wav

      Wenn die Angaben zu Titel und Interpret fehlen, werden Dateinamen der Form
      Track 01.wav, Track 02.wav, ... erzeugt.

  - Optionen
    o separate Datei f�r jeden Track
      Ist diese Option ausgew�hlt, so wird jeder einzelne Audio-Track in einer
      separaten Datei (*.wav) gespeichert. Ohne diese Option werden direkt auf-
      einanderfolgende Tracks in eine Datei geschrieben.

    o Lib Paranoia
      Wenn eine zerkratzte oder besch�digte CD ausgelesen werden soll, empfiehlt
      es sich, die Option 'Lib Paranoia verwenden' zu aktivieren.

    o keine Info-Dateien erzeugen
      Es werden nur die ausgew�hlten Audio-Tracks ausgelesen, wobei keine Info-
      Dateien angelegt werden, die beispielsweise CD-Text-Informationen ent-
      halten.

  - Format:
    Hier kann festgelegt werden, in welchem Format die Tracks gespeichert werden
    sollen.

* DAE-Optionen, Registerkarte 'freedb':

  - Freedb-Informationen abrufen
    Ist diese Option gew�hlt, werden die Informationen (Titel und Interpret) aus
    der Freedb verwendet, sofern die CD keine CD-Text-Informationen enth�lt.

* DAE-Optionenm Registerkarte 'Encoding':

  - Tags (Titel und Interpret) hinzuf�gen
    Ist diese Option aktiviert, werden Trackinformationen (sofern vorhanden) in
    der komprimierten Datei gespeichert.

  - FLAC
    Einstellung f�r die Kompression: 0 (schnell) ... 8 (stark)

  - Ogg Vorbis
    Einstellung f�r die Qualit�t: 0 (niedrig) ... 10 (hoch)

  - mp3 (Lame presets)
    insane                        320 kBit/s CBR (konstante Bitrate)
    medium, standard, extreme     VBR (variable Bitrate)
    80 ... 320                    ABR (durchschnittlich Bitrate)

  - benutzerdefiniert
    Dies erm�glicht die Angabe eines externen Programmes und der gew�nschten
    Optionen f�r die Kompression. Jeder Encoder kann verwendet werden, solange
    das Programm den Input �ber Stdin entgegennehmen kann.

    Dies kann auch daf�r verwendet werden, cdrtfe eine spezielle Kommandozeile
    f�r lame zu geben.

    In das Feld 'Cmd.:' wird der Pfad zum Programm eingegeben, in das Feld
    'Opt.:' die Optionen. Die Dateiendung der komprimierten Dateien wird fest-
    gelegt, indem man an den Optionsstring |.ext anf�gt. Die Einstellungen
    werden benutzt, wenn 'benutzerdef.' als Kompressionsart auf der Register-
    karte 'DAE', 'Format' ausgew�hlt wird.

    Es gibt drei Platzhalter f�r den Optionsstring:
      %F - Dateiname der komprimierten Datei
      %T - Titel
      %P - Interpret

    Beispiel:
      Cmd.: i:\burn\lame.exe
      Opt.: -b 160 -h --add-id3v2  --tt "%T" --ta "%P" - %F|.mp3


CD-Image
--------
* Image erstellen:

  Es k�nnen Images von CDs mit readcd erstellt werden. Daf�r einfach den Namen
  des Images angeben und auf 'Start' klicken.

  - kein Abbruch bei unkorrigierbaren Fehlern
    Das Auslesen wird fortgesetzt, auch wenn nicht korrigierbare Fehler im
    Datenstrom festgestellt werden.

  - Fehlerkorrektur des Laufwerks abschalten
    Veranla�t das Laufwerk, Lesefehler in Datensektoren zu ignorieren, die durch
    unkorrigierte ECC/EDC-Fehler entstehen. 

  - Klon-Modus
    Fertig eine exakte Kopie mit allenm Subchannel-Daten an. Ein solches Image
    mu� unter Verwenung der Optionen 'Klon-Modus' und 'RAW-Modus (raw96r)' ge-
    schrieben werden.

  - Bereich:
    Nur die angegebenen Sektoren werden ausgelesen, wobei der der Endsektor
    nicht gelesen wird.

* Image schreiben

  Es k�nnen ISO- und CUE-Images geschrieben werden, letztere nur, wenn entweder
  das Programm cdrdao vorhanden ist oder cdrecord in der Version 2.01a24 (oder
  neuer) vorliegt.
  
  Wird ein ISO-Image unter Verwendung der Option '�berbrennen' geschrieben, so
  mu� in der Regel die Option 'disk at once' ('Einstellungen') aktiviert werden.

  Wird ein Image geschrieben, das mit der readcd-Option 'Klon-Modus' erstellt
  wurde, so m�ssen die Optionen 'Klon-Mous' und 'RAW-Modus (raw96r)'
  aktiviert werden.


(S)VideoCD
----------
Aus MPEG1-/MPEG2-Video-Dateien k�nnen Video- bzw SVideo-CDs erstellt werden. Es
stehen die Formate VideoCD 1.1, VideoCD 2.0 und SuperVideoCD 1.0 zur Verf�gung.

* Voraussetzungen f�r die Quelldateien:

  - Video-CD:
    - 352 x 240, 29.97 Hz, NTSC
    - 352 x 240, 23.976 Hz, FILM
    - 352 x 288, 25 Hz, PAL, (nicht mit VideoCD 1.1)
    - Audio: MPEG-1 layer II, 224 kBits/s CBR, 1 Stereo- oder 2-Mono-Kan�le

  - SuperVideo-CD:
    - 480 x 480, 29.97 Hz, NTSC
    - 480 x 576, 25 Hz, PAL
    - Audio: MPEG-1 layer II, 32 - 384 kBits/s, 2 Stereo- oder 4 Mono-Kan�le
      oder MPEG-1/2 Multikanal-Surround-Sound (5+1)

  cdrtfe kann momentan nicht �berpr�fen, ob die ausgw�hlten Video-Tracks den
  Anforderungen entsprechen. Es kann in Einzelf�llen passieren, da� die Laufzeit
  einer MPEG-Datei falsch angezeigt wird.


DVD Video
---------
Nach Angabe des Quellverzeichnisses wird eine Video-DVD geschrieben, vorausge-
setzt, es ist eine DVD-f�hige cdrecord-Version vorhanden. Dies funktioniert nur,
wenn die Dateinamen ausschlie�lich aus Gro�buchstaben bestehen. Das Quellver-
zeichnis mu� einen Unterordner VIDEO_TS enthalten.
Ein Doppelklick in das Feld 'Bezeichnung' �bernimmt den letzten Teil des Quell-
Verzeichnisses als Namen: d:\videos\My Video' -> 'My Video'.


CD fixieren
-----------
Diese Funktion wird ben�tigt, um eine (aus welchen Gr�nden auch immer) nicht ab-
geschlossene CD mit einer TOC zu versehen.
Um eine CD zu fixieren, die CD in das Laufwerk einlegen, das Laufwerk ausw�hlen
und die Schaltfl�che 'CD fixieren' klicken.


Hinweise zur cygwin1.dll
------------------------
Die cygwin1.dll in den Versionen 1.3.18 bis 1.3.22 scheint auf manchen Systemen
unter Win2k bzw. WinXP Totalabst�rze zu verursachen, wenn beispielsweise CDs
unter Verwendung von Pipes on-the-fly gebrannt werden oder cdda2wav mit der
Option -paranoia aufgerufen wird.

Dieses Problem tritt mit der cygwin1.dll ab der Version 1.5.3 nicht mehr auf.

Sollte es, aus welchen Gr�nden auch immer, unumg�nglich sein, die cygwin1.dll in
einer der fehlerhaften Versionen zu verwenden, so kann entweder auf die Optionen
on-the-fly und -paranoia verzichtet oder eine gepatchte Version der cdrtools
eingesetzt werden.

Hartmut Welpmann hat einen Patch entwickelt, mit dem dieser cygwin-Bug umgangen
werden kann, so da� die cdrtools auch mit den cygwin1.dll-Versionen 1.3.18 bis
1.3.22 funktionieren.

N�here Informationen zu dem cygwin-Bug und dem Patch gibt es in der Newsgroup
de.comp.hardware.laufwerke.brenner im Thread beginnend mit der Message-ID:
<1s34bv0uqrbgatettbheuf7j68kfa0j7s2@4ax.com>.

Die Version 1.5.17 bereitet Probleme beim Zugriff auf dem ASPI-Layer.


Kommandozeilenoptionen
----------------------
cdrtfe kann mit folgenden Optionen gestartet werden:
cdrtfe [/data|/audio|/xcd|/vcd] <datei 1> ... <datei n> [/load <projekt>]
       [/execute [/log|/minimize|/exit [/hide]]] [/nocheck] [/portable]

cdrtfe <datei 1> ... <datei n>:
       Die Dateien werden in die Dateiliste der aktuellen Registerkarte ein-
       gef�gt. Auf der Registerkarte 'Daten-CD' k�nnen jede Art von Dateien
       oder auch Verzeichnisse eingef�gt werden. Bei 'Audio-CD' ausschlie�lich
       Wave-Dateien im PCM-Format, 44.1 kHz, 16 Bit, stereo. Bei 'XCD' werden
       Dateien mit der Endung .avi in die Movie-Liste eingef�gt, alle anderen
       in die Dateiliste.

cdrtfe /data <datei 1> ... <datei n>:
       Die Registerkarte 'Daten-CD' wird zur aktuellen Registerkarte, die
       Dateien (oder auch Verzeichnisse) werden hier eingef�gt.

cdrtfe /audio <datei 1> ... <datei n>:
       Die Registerkarte 'Audio-CD' wird zur aktuellen Registerkarte, in die
       die Dateien eingef�gt werden. Es werden nur g�ltige Wave-Dateien (PCM,
       44.1 kHz, 16 Bit, stereo) angenommen, andere Dateien werden ignoriert.

cdrtfe /xcd <datei 1> ... <datei n>:
       Die Registerkarte 'XCD' wird zur aktuellen Registerkarte, die Dateien
       (oder auch Verzeichnisse) werden in die Dateiliste (Form 1) eingef�gt.
       Dateien mit der Endung .avi werden der Movie-Liste (Form 2) hinzugef�gt.

cdrtfe /vcd <datei 1> ... <datei n>:
       Die Registerkarte '(S)VideoCD' wird zur aktuellen Registerkarte, in die
       die Video-Tracks eingef�gt werden.

cdrtfe /load <projekt>
       Beim Start von cdrtfe wird die Projekt-Datei <projekt> geladen. Die Ver-
       wendung der Option /load ist nur zul�ssig, wenn die erste Instanz von
       cdrtfe gestartet wird. Ansonsten wird sie ignoriert.
       Bei mehrfachem Vorkommen wird die zuletzt angegebene Datei geladen.

cdrtfe ... /execute
       Nachdem alle anderen Optionen (/data, /audio, /xcd, /vcd und /load) aus-
       gewertet wurden, wird der Brennvorgang automatisch _ohne_ Nachfrage ge-
       startet. Das funktioniert mit Daten-CDs, Audio-CDs, XCDs und beim
       Schnell-L�schen von CD-RWs.

cdrtfe ... /exit
       Nach Abschlu� des automatisch gestarteten Brennvorgangs wird cdrtfe be-
       endet. Die Option /exit ist nur zusammen mit der Option /execute zu-
       l�ssig. Ohne diese wird sie einfach ignoriert.

cdrtfe ... /log
       Nach Abschlu� des per /execute gestarteten Brennvorgangs werden die Aus-
       gaben der Konsolenprogramme in eine Datei geschrieben. Sollte vorher eine
       Projekt-Datei geladen worden sein, hei�t das Log-File <name>.cfp.log und
       befindet sich im Verzeichnis der Projekt-Datei. Wurde keine Projekt-Datei
       geladen, findet sich das Log-File im Verzeichnis von cdrtfe.exe unter dem
       Namen cdrtfe.log. In beiden F�llen werden bereits vorhandene Dateien
       �berschrieben.
       Die Option /log ist nur zusammen mit der Option /execute zul�ssig. Ohne
       diese wird sie ignoriert.

cdrtfe ... /minimize
       Diese Option minimiert das Hauptfenster von cdrtfe und ist nur zusammen
       mit der Option /execute zul�ssig.

cdrtfe ... /hide
       cdrtfe wird unsichtbar ausgef�hrt (kein Programmfenster, kein Eintrag in
       der Taskbar). Nur zusammen mit /execute und /exit.

cdrtfe ... /nocheck
       Schaltet die �berpr�fung auf zu lange Dateinamen und zu tief liegende
       Ordner ab. Werden zu lange Dateinamen nicht vom Nutzer korrigiert, ver-
       sucht mkisofs die Namen entsprechend der maximal m�glichen Anzahl von
       Zeichen zu k�rzen. Sollten hierbei jedoch Namensgleichheiten oder andere
       Probleme auftreten, so bricht mkisofs mit einer Fehlermeldung ab.
       /nocheck erm�glicht - sofern es beim automatischen K�rzen keine Fehler
       gibt - einen automatischen Lauf von cdrtfe, der keine Nutzereingaben er-
       fordert.

cdrtfe ... /portable
       cdrtfe im Portable-Modus starten.

Die Optionen /data, /audio, /xcd und /vcd gelten bis zum Auftreten einer der
jeweils anderen Optionen aus dieser Gruppe. Die zuletzt in der Kommandozeile
vorkommende Option legt die aktive Registerkarte fest.
Allerdings wird nat�rlich nur der Inhalt aktiven Registerkarte auf CD gebrannt,
wenn der 'Start'-Button gedr�ckt oder /execute ausgef�hrt wird.
Die Optionen /minimize und /hide k�nnen nicht kombiniert werden. In diesem Fall
werden beide ignoriert.

Die verschiedenen Kommandozeilenoptionen k�nnen auch nahezu beliebig miteinander
gemischt werden:

cdrtfe /audio intro.wav /data readme.txt /load projekt.cfp datei2.txt
       /xcd a.avi /data datei3.txt /execute

       l�dt zun�chst die Projektdatei projekt.cfp und f�gt dann auf der
       Registerkarte 'Audio-CD' die Datei intro.wav ein und auf der Register-
       karte 'Daten-CD' die Dateien readme.txt, datei2.txt und datei3.txt. In
       die Movie-Liste unter 'XCD' wird a.avi eingef�gt. Zuletzt wird die
       Registerkarte 'Daten-CD' aktiviert und der Brennvorgang startet.

Unter Verwendung dieser Aufrufoptionen k�nnen beispielsweise im 'Senden an'-
Men� von Windows Verkn�pfungen angelegt werden, die die Auswahl der auf CD zu
brennenden Dateien vereinfachen, indem man im Explorer die Dateien ausw�hlen und
mittels 'Senden an' an cdrtfe �bergeben kann. Leider funktioniert dies erst
unter Win2k und WinXP korrekt.


cdrtfe-ShellExtensions
----------------------
Da die 'Senden an'-Funktion von Win9x leider defekt ist (in der Verkn�pfung an-
gegebene Optionen werden ignoriert, Dateinamen werden im 8.3-Format �bergeben),
gibt es auch die M�glichkeit, cdrtfe mit Hilfe von ShellExtensions mit Dateien
zu versorgen. Daf�r wird die Datei cdrtfeShlEx.dll ben�tigt, die sich im selben
Verzeichnis wie cdrtfe.exe befinden mu�.

Die ShellExtensions k�nnen aus dem Dialog 'Einstellungen' heraus aktiviert oder
deaktiviert werden.

Nachdem cdrtfeShlEx.dll beim System registriert wurde, gibt es im Kontextmen�
von Dateien und Verzeichnissen das Untermen� 'cdrtfe' mit den Eintr�gen
'cdrtfe', 'cdrtfe /data', 'cdrtfe /audio' und 'cdrtfe /xcd'. Die Funktionsweise
dieser Men�punkte entspricht dem, was unter 'Kommandozeilenoptionen' gesagt
wurde.

Sollte cdrtfeShlEx.dll fehlen, sind die entsprechenden Schaltfl�chen unter
'Einstellungen' deaktiviert und die Kommandozeilenoption /register wird einfach
ignoriert.

Achtung: Leider haben diese ShellExtensions noch einen Bug. Wenn sie aktiviert
         sind, verunstalten sie, wenn Dateien ausgew�hlt sind, mit der Zeit das
         Datei-Men� des Explorers, indem bei jedem �ffnen dieses Men�s ein neuer
         Eintrag f�r cdrtfe hinzugef�gt wird.
         Das Schlie�en und erneute �ffnen des Explorers l��t die Auswirkungen
         dieses Bugs kurzzeitig verschwinden. Werden die ShellExtensions deakti-
         viert, verh�lt sich das Datei-Men� auch wieder normal. Dies scheint
         allerdings nur ein kosmetisches Problem zu sein. Dennoch sind Hinweise,
         wie man dieses Problem l�sen kann (besonders unter Delphi 3) sehr will-
         kommen.


Icons/Grafiken
--------------
Ab cdrtfe 1.2 k�nnen die Grafiken f�r die Speedbuttons und Treeview-Icons be-
liebig ver�ndert werden. N�here Informationen dazu in der Datei readme.txt im
Verzeichnis 'icons'


bekannte Fehler
---------------
* Verify: Manchmal gibt es Probleme, die gerade geschriebene CD einzulesen.

* Verify: Sollte mkisofs selbst�ndig zu lange Dateinamen gek�rzt oder illegale
  Zeichen ersetzt haben, so wird diese Datei beim Vergleich nicht gefunden, auch
  wenn sie korrekt auf die CD geschrieben wurde.
  
* ShellExtension: Ein Fehler in cdrtfeShlEx.dll verunstaltet mit der Zeit das
  Datei-Men� des Explorers.


Links
-----
Wiki von dchlb:            http://www.dchlb.de

Quelltexte von cdrecord:   ftp://ftp.berlios.de/pub/cdrecord/alpha/

Mode2CDMaker:              http://webs.ono.com/de_xt/

VCDImager:                 http://www.vcdimager.org

cdrdao:                    http://cdrdao.sourceforge.net/

Win32-Binaries:            http://www.geoshock.com/cdrtools
                           http://www.sbox.tugraz.at/home/t/tplank

Win32-Binaries, DVD-Patch: http://smithii.com/?q=node/view/9

Mingw32-Binaries:          http://cdrtools.bootcd.ru/

Download von sh.exe:       ftp://ftp.berlios.de/pub/cdrecord/alpha/win32/sh.exe


Lizenz
------
Dieses Programm ist freie Software. F�r weitere Informationen siehe license.txt.


Gew�hrleistungsbeschr�nkung
---------------------------
Die Ver�ffentlichung dieses Programms erfolgt in der Hoffnung, da� es Ihnen von
Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite
Garantie der MARKTREIFE oder der VERWENDBARKEIT F�R EINEN BESTIMMTEN ZWECK.

Unter keinen Umst�nden ist der Autor haftbar f�r jedwede Folgesch�den (uneinge-
schr�nkt eingeschlossen sind Sch�den aus entgangenem Gewinn, Betriebsunter-
brechung, Verlust von Informationen oder Daten oder aus anderem finanziellen
Verlust), die aufgrund der Benutzung dieser Software entstehen. Dies gilt auch
dann, wenn der Autor von der M�glichkeit eines solchen Schadens unterrichtet
worden ist.


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
Drop Component Suite. � 1997-2005 Angus Johnson & Anders Melander.

JCL portions are licensed from Project JEDI, the source code can be obtained
from http://jcl.sourceforge.net/

cdrtfe 1.2 icons/glyphs are based on the Silk Icon set 1.3 by Mark James and the
Winstripe FF classic theme by Stephen Horlander and Kevin Gerich. Additional
icons by Rob van Ruremonde.

Das Installationsprogramm wurde erstellt mit Inno Setup 5.1.6 von Jordan Russell.


Kontakt
-------
cdrtfe Homepage:         http://cdrtfe.sourceforge.net/
                         http://sourceforge.net/projects/cdrtfe
eMail          :         kerberos002@arcor.de
                         Bitte im Betreff das Tag [cdrtfe] verwenden, damit die
                         eMail den Spam-Filter passieren kann.

[1] 1 MiByte = 1024 KiByte = 1024*1024 Byte
    1 MByte  = 1000 kByte  = 1000*1000 Byte
    siehe: http://physics.nist.gov/cuu/Units/binary.html
           http://physics.nist.gov/cuu/Units/prefixes.html

cdrtfe 1.3: DVD-Unterst�tzung
=============================

Es ist m�glich, mit cdrtfe Daten-DVDs und Video-DVDs zu schreiben. Hierf�r ist
eine DVD-f�hige Version von cdrecord n�tig:

  - cdrecord ab Version 2.01.01a09:
    Dieses cdrecord ist im cdrtfe-Setup-Programm (ab cdrtfe 1.2pre2) enthalten.

Es sollte also nicht mehr n�tig sein, auf eine der folgenden M�glichkeiten zu-
r�ckzugreifen:

  - wodim aus dem cdrkit-Project:
    http://cdrkit.org

  - cdrecord mit DVD-Patch:
    z.B.: http://smithii.com/?q=node/view/9
    siehe auch: cdrtfe-Homepage, Sektion 'Tools'


Einschr�nkungen:
----------------

  * Es sind noch keine Multisession-/Multiborder-DVDs m�glich.

  * Bei der Verwendung von cdrecord mit DVD-Patch finden keine �berpr�fungen des
    Mediums statt.

  * Falls die Erkennung von DVD-Rohlingen �berhaupt nicht funktionieren sollte
    und auch kein Auswahl-Dialog erscheint, kann die Erkennung ganz abgeschaltet
    werden. Daf�r ist in die cdrtfe.ini folgendes einzutragen:

      [Hacks]
      DisableDVDCheck=1

    In diesem Fall kann cdrtfe jedoch nicht auf eine zu geringe Speicherkapazit�t
    hinweisen.


!  Vor der Nutzung dieser Funktion sollten Tests mit einem wiederbescheibbaren !
!  Medium durchgef�hrt werden!                                                 !


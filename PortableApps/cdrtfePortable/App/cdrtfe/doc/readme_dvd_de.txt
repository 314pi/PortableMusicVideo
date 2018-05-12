cdrtfe 1.3: DVD-Unterstützung
=============================

Es ist möglich, mit cdrtfe Daten-DVDs und Video-DVDs zu schreiben. Hierfür ist
eine DVD-fähige Version von cdrecord nötig:

  - cdrecord ab Version 2.01.01a09:
    Dieses cdrecord ist im cdrtfe-Setup-Programm (ab cdrtfe 1.2pre2) enthalten.

Es sollte also nicht mehr nötig sein, auf eine der folgenden Möglichkeiten zu-
rückzugreifen:

  - wodim aus dem cdrkit-Project:
    http://cdrkit.org

  - cdrecord mit DVD-Patch:
    z.B.: http://smithii.com/?q=node/view/9
    siehe auch: cdrtfe-Homepage, Sektion 'Tools'


Einschränkungen:
----------------

  * Es sind noch keine Multisession-/Multiborder-DVDs möglich.

  * Bei der Verwendung von cdrecord mit DVD-Patch finden keine Überprüfungen des
    Mediums statt.

  * Falls die Erkennung von DVD-Rohlingen überhaupt nicht funktionieren sollte
    und auch kein Auswahl-Dialog erscheint, kann die Erkennung ganz abgeschaltet
    werden. Dafür ist in die cdrtfe.ini folgendes einzutragen:

      [Hacks]
      DisableDVDCheck=1

    In diesem Fall kann cdrtfe jedoch nicht auf eine zu geringe Speicherkapazität
    hinweisen.


!  Vor der Nutzung dieser Funktion sollten Tests mit einem wiederbescheibbaren !
!  Medium durchgeführt werden!                                                 !


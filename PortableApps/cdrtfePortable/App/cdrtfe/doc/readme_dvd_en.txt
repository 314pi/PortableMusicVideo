cdrtfe 1.3: DVD support
=======================

It is possible to write data DVDs or Video DVDs with cdrtfe. In order to do so a
DVD capable version of cdrecord is needed:

  - cdrecord 2.01.01a09 and above
    This cdrecord is included in the cdrtfe setup program (cdrtfe 1.2pre2 and
    above).

It shouldn't be necessary any longer to use one of the following possibilities:

  - wodim from the cdrkit project
    http://cdrkit.org

  - cdrecord with DVD patch:
    e.g.: http://smithii.com/?q=node/view/9
    or: cdrtfe homepage, section 'Tools'


Restrictions:
-------------

  * Multisession/Multiborder DVDs are not yet possible.

  * When using cdrecord with DVD-Patch no checks will be performed.

  * If cdrtfe fails to determine the medium type and no selection
    dialog is displayed, the medium check can be disabled. Add the
    following lines to the cdrtfe.ini:

      [Hacks]
      DisableDVDCheck=1

    In this case cdrtfe does not warn, if the capacity is not sufficient.


! It is strongly recommended to make tests with a rewritable medium first      !
! before using this function!                                                  !




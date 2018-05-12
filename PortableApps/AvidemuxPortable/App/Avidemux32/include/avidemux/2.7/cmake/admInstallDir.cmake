        MESSAGE(STATUS "CMAKE_INSTALL_PREFIX: ${CMAKE_INSTALL_PREFIX}")
        MESSAGE(STATUS "AVIDEMUX_INSTALL_DIR: ${AVIDEMUX_INSTALL_DIR}")

IF(WIN32)
        IF(NOT AVIDEMUX_INSTALL_DIR )
                MESSAGE(FATAL_ERROR "Please define AVIDEMUX_INSTALL_DIR using -DAVIDEMUX_INSTALL_DIR=foobar")
        ENDIF(NOT AVIDEMUX_INSTALL_DIR )

        SET(AVIDEMUX_BIN_DIR ${AVIDEMUX_INSTALL_DIR})
        SET(AVIDEMUX_LIB_DIR ${AVIDEMUX_INSTALL_DIR})
        SET(AVIDEMUX_RELATIVE_LIB_DIR "")
ELSE(WIN32)
# Unix
        IF(NOT AVIDEMUX_INSTALL_DIR )
                SET(AVIDEMUX_INSTALL_DIR "/usr/local")
                MESSAGE(STATUS "No install dir provided, using /usr/local")
        ENDIF(NOT AVIDEMUX_INSTALL_DIR )
        SET(AVIDEMUX_BIN_DIR ${AVIDEMUX_INSTALL_DIR}/bin)
        IF(CMAKE_C_IMPLICIT_LINK_DIRECTORIES MATCHES "\\/lib64([; ]|$)")
                SET(AVIDEMUX_RELATIVE_LIB_DIR lib64)
        ELSEIF(CMAKE_C_IMPLICIT_LINK_DIRECTORIES MATCHES "\\/lib32([; ]|$)")
                SET(AVIDEMUX_RELATIVE_LIB_DIR lib32)
        ELSE(CMAKE_C_IMPLICIT_LINK_DIRECTORIES MATCHES "\\/lib64([; ]|$)")
                SET(AVIDEMUX_RELATIVE_LIB_DIR lib)
        ENDIF(CMAKE_C_IMPLICIT_LINK_DIRECTORIES MATCHES "\\/lib64([; ]|$)")
        SET(AVIDEMUX_LIB_DIR ${AVIDEMUX_INSTALL_DIR}/${AVIDEMUX_RELATIVE_LIB_DIR})
ENDIF(WIN32)
SET(AVIDEMUX_INCLUDE_DIR ${AVIDEMUX_INSTALL_DIR}/include)
#
IF(NOT FAKEROOT)
	SET(AVIDEMUX_FAKEROOT "")
else(NOT FAKEROOT)
	SET(AVIDEMUX_FAKEROOT "${FAKEROOT}/")
endif(NOT FAKEROOT)
SET(AVIDEMUX_SEARCH_INCLUDE_DIR ${AVIDEMUX_FAKEROOT}${AVIDEMUX_INCLUDE_DIR})
SET(AVIDEMUX_SEARCH_LIB_DIR     ${AVIDEMUX_FAKEROOT}${AVIDEMUX_LIB_DIR})
#
MESSAGE(STATUS "FAKEROOT                   : ${AVIDEMUX_FAKEROOT}")
MESSAGE(STATUS "AVIDEMUX_BIN_DIR           : ${AVIDEMUX_BIN_DIR}")
MESSAGE(STATUS "AVIDEMUX_LIB_DIR           : ${AVIDEMUX_LIB_DIR}")
MESSAGE(STATUS "AVIDEMUX_INCLUDE_DIR       : ${AVIDEMUX_INCLUDE_DIR}")
MESSAGE(STATUS "AVIDEMUX_SEARCH_INCLUDE_DIR: ${AVIDEMUX_SEARCH_INCLUDE_DIR}")
MESSAGE(STATUS "AVIDEMUX_SEARCH_LIB_DIR    : ${AVIDEMUX_SEARCH_LIB_DIR}")
#
# MACRO TO INSTALL REGULAR LIBS
#
MACRO(ADM_INSTALL_LIB lib)
        INSTALL(TARGETS ${lib} RUNTIME 
                DESTINATION ${AVIDEMUX_BIN_DIR}          COMPONENT runtime
                LIBRARY DESTINATION ${AVIDEMUX_LIB_DIR}  COMPONENT runtime
                ARCHIVE DESTINATION ${AVIDEMUX_LIB_DIR}  COMPONENT dev
                )
ENDMACRO(ADM_INSTALL_LIB )

MACRO (ADM_INSTALL_LIB_FILES files)
        INSTALL(FILES ${files} 
                        DESTINATION ${AVIDEMUX_LIB_DIR}
                        PERMISSIONS WORLD_READ WORLD_EXECUTE OWNER_WRITE OWNER_READ OWNER_EXECUTE
                        COMPONENT  runtime
                )
ENDMACRO (ADM_INSTALL_LIB_FILES)

#
# MACRO TO INSTALL REGULAR BIN
#
MACRO(ADM_INSTALL_BIN lib)
        INSTALL(TARGETS ${lib} RUNTIME 
                DESTINATION ${AVIDEMUX_BIN_DIR}  COMPONENT runtime
                LIBRARY DESTINATION ${AVIDEMUX_LIB_DIR}  COMPONENT runtime
                ARCHIVE DESTINATION ${AVIDEMUX_LIB_DIR} COMPONENT runtime
                )
ENDMACRO(ADM_INSTALL_BIN )
#
# Macro to install include folder
#
MACRO(ADM_INSTALL_INCLUDE_FOLDER folder targetName)
        INSTALL(DIRECTORY ${folder} 
                DESTINATION ${AVIDEMUX_INCLUDE_DIR}/avidemux/${AVIDEMUX_MAJOR_MINOR}/${targetName}
                COMPONENT dev
                FILES_MATCHING PATTERN "*.h*" 
                               PATTERN  "*.asm"
                )
ENDMACRO(ADM_INSTALL_INCLUDE_FOLDER )
##
#
# Macro to install include folder
#
MACRO(ADM_INSTALL_QT_INCLUDE_FOLDER folder targetName)
        INSTALL(DIRECTORY ${folder} 
                DESTINATION ${AVIDEMUX_INCLUDE_DIR}/avidemux/${AVIDEMUX_MAJOR_MINOR}/${QT_EXTENSION}/${targetName}
                COMPONENT dev
                FILES_MATCHING PATTERN "*.h*"
                )
ENDMACRO(ADM_INSTALL_QT_INCLUDE_FOLDER )
##
#
# Macro to install cmake folder
#
MACRO(ADM_INSTALL_CMAKE_FOLDER folder targetName)
        INSTALL(DIRECTORY ${folder} 
                DESTINATION ${AVIDEMUX_INCLUDE_DIR}/avidemux/${AVIDEMUX_MAJOR_MINOR}/${targetName}
                COMPONENT dev
                FILES_MATCHING PATTERN "*.cmake*"
                )
ENDMACRO(ADM_INSTALL_CMAKE_FOLDER )
#
#
# Macro to install cmake folder
#
MACRO(ADM_INSTALL_CMAKE_HELPER_FOLDER folder targetName)
        INSTALL(DIRECTORY ${folder} 
                DESTINATION ${AVIDEMUX_INCLUDE_DIR}/avidemux/${AVIDEMUX_MAJOR_MINOR}/cmake/${targetName}
                COMPONENT dev
                FILES_MATCHING PATTERN "*.c*"
                )
ENDMACRO(ADM_INSTALL_CMAKE_HELPER_FOLDER )
#
# Macro to install include folder
#
MACRO(ADM_INSTALL_APP_HEADER folder )
        INSTALL(FILE ${folder} ${ARGN} 
                DESTINATION ${AVIDEMUX_INCLUDE_DIR}/avidemux/${AVIDEMUX_MAJOR_MINOR}/ADM_app
                COMPONENT dev
                )
ENDMACRO(ADM_INSTALL_APP_HEADER folder)
#

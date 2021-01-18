# ebzbusinessapp
App for the Learning Management System of the EBZ Business School based on the Moodle mobile app. This repo contains the source code for this app.

# Source Code Documentation (German)

## 1. Allgemeine Hinweise

Die zugrundeliegende Version der Moodle Mobile App für den aktuellen Quellcodestand im Master-Branch ist die 3.6.0 

Sämtliche Änderungen, die notwendig waren, um diese 3.6.0-Version der Moodle Mobile App in die aktuelle Version der EBZ-Businessschool-App 
zu überführen, sind hier beschrieben - und außerdem innerhlab des Codes mithilfe von "Quellcode-Kommentar-Markierungen" kenntlich gemacht worden. 
Eine geänderte/modifizierte Quellcodesequenz wurde dabei jeweils mit 

// MTA - start (Anfang der Sequenz)

< Angepasste / Hinzugefügte Sequenz >

// MTA - end (Ende der Sequenz)

markiert.

Die zwecks Einrichtung der Entwicklungsumgebung erforderlichen Schritte wurden gemäß der folgenden Anleitung durchgeführt: 

https://docs.moodle.org/dev/Setting_up_your_development_environment_for_Moodle_Mobile_2

HINWEIS: Die benötigte npm-Version 11 - die zum Release-Zeitpunkt der EBZ-Business-App (April 2019) noch über den in der obigen Schritt-für-Schritt-Anleitung
beschriebnen Standard-Weg installiert werden konnte, muss aktuell evtl. über einen anderen Weg bezogen werden. Probeweise könnte man evtl. hier fündig werden:
https://nodejs.dev/learn/install-an-older-version-of-an-npm-package . Ein zweiter möglicher Lösungsansatz wäre, für eine neuere npm-Version nach geeigneten 
Zusatzmodulen zu suchen. (Wenn man bspw. unter Linux entwickelt, existiert dort das vielversprechende Zusatzpaket 'nodejs-legacy', mit dem man es probieren könnte.)
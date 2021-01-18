# ebzbusinessapp
App for the Learning Management System of the EBZ Business School based on the Moodle mobile app. This repo contains the source code for this app.

# Source Code Documentation (German)

## Allgemeine Hinweise

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


## Modul: addon/calendar:
Da die Kalender-Funktion für die EBZ-Businessschool-App nicht vorgesehen war, und stattdessen durch eine Funktion ersetzt werden sollte, mit deren 
Hilfe einem Studenten seine aktuellen Prüfungsergebnisse angezeigt werden sollten, bot es sich (aufgrund der vorhandenen Original-Quellcodestruktur) am besten an, 
hierfür das nicht länger benötigte Kalender-Modul zu modifizieren. Dabei waren die folgenden Quellcodemodifikationen erforderlich:

### addon/calendar/providers/mainmenu-handler.ts
Per 'import'-Anweisung muss hier zunächst eine Vielzahl weiterer Komponenten eingeführt werden. Dazu gehören in erster Linie Komponenten, 
die dem Kursmodul ('core/course') und dem Bewertungsmodul ('core/grades') zugewiesen. Das auf diese Weise erweiterte Kalendermodul ist dadruch
in der Lage, mit den beiden anderen Modulen zu interagieren. Im Rahmen dieser Interaktion besteht die Rolle der 'mainmenu-handler.js' lediglich
darin, ein passendes Icon in der Navigationsleiste (am unteren Display-Rand) zu rendern und die korrekte Verlinkung (die zuvor auf eine Kalender-Ansicht
gesetzt war) nun auf eine Bewertungsübersicht umzuleiten, die beim Antippen des Icons geöffnet wird. Dieser Verlinkungsmechanismus wird von der 
(stark "abgespeckten") Klasse 'AddonCalendarMainMenuHandler' bereitgestellt und auf der Startseite der App verfügbar gemacht. Die 'getDisplayData'-Funktion
sorgt hierbei für das Einblenden des dazugehörigen Icons.
Wichtige Randbemerkung: an diversen Stellen im Code sind noch die alten Bezeichner vorhanden, was natürlich ausgesprochen ungünstig ist und gegen keine Form
von (absolut berechtigter) Kritik verteidigt werden kann. So ist auch hier der Bezeichner 

title: 'addon.calendar.calendar' 

selbstversändlich etwas fehl am Platze, weil er nicht mehr das Kalender-Icon referenziert, sondern das neue Icon für Notenübersicht. Eine konsistente
und problemadäquate Umbenennung von Bezeichnern, die über den kompletten Quellcode verstreut waren, ist vor dem offiziellen Release-Datum nicht mehr gelungen.
(Es gab andere Probleme, die - weil sie technischer Natur waren - absoluten Vorrang hatten und vor dem GoLive-Termin unbedingt gelöst werden mussten.)

### addon/calendar/calendar.module.ts
Sämtliche Komponenten mit der Endung ".module.ts" fungieren innerhalb der EBZ-Businessschool-App (wie auch der ihr zugrundeliegenden Moodle Mobile App)
gewissermaßen als einheitliche, "app-interne" Schnittstellen. Eine ".module.ts"-Komponente teilt der App beim Setup gewissermaßen mit, 
was sie ihr einerseits an Funktionalität anzubieten hat und was sie andererseits von der App benötigt, um selbst korrekt funktionieren zu können.
Sowohl die Komponenten (genauer: TS-Klassen bzw. - zur Laufzeit - Objekte dieser Klassen), die bestimmte Funktionalität nach außen hin anbieten 
(provider- und handler-Klassen), als auch Komponenten, die Funktionalität nach außen hin an andere Komponenten delegieren (delegate-Klassen) werden über einen
großen Konstruktor schließlich zu einem Gesamtmodul zusammengefasst. Die Parameterliste dieses Konstruktors besteht in erster Linie aus eben diesen
delegate- bzw. provider-Objekten (aber auch einigen weiteren Zustatzkomponenten, bspw. eventuell benötigten Helper-Klassen oder Manager-Klassen).

## Modul: addon/examenrol:
Dieses Modul ist komplett neu hinzuprogrammiert worden. Dessen Hauptfunktion besteht darin, den Studenten eine Prüfungsanmeldung über die 
EBZ-Businessschool-App zu ermöglichen. Die Prüfungsanmeldung wird von der App registriert und in Echtzeit an den eLearning-Server (Moodle) der
EBZ Business School weitergeleitet. Der Moodle-Server nimmt daraufhin die automatische Benachrichtigung des Prüfungsamtes über die 
vorgenommene Prüfungsanmeldung vor, ohne dass die App hier nochmal separat aktiv werden muss. D.h. die Aufgabe der App beschränkt sich hier 
darin, lediglich einen bestimmten (und hierfür geeigneten) Webservice des Moodle-Servers aufzurufen, über den dann auch der Datenaustausch erfolgt.
Sobad die App die für eine Prüfungsanmeldung relevanten Daten an den Webservice des Moodle-Servers weitergereicht hat, gibt sie damit ab auch 
die Kontrolle über diese Daten vollständig an den Moodle-Server ab. (Allerdings informiert der Moodle-Server die App zumindest über einen entsprechenden Status-Code
darüber, ob die serverseitige Registrierung erfolgreich verlief oder nicht.)
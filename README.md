# Beschreibung

Dieses Mini-Projekt soll dir und deinen Freunden ermöglichen, einfach TOP10 mit eigenen Fragen zu spielen. Deiner und eurer Kreativität sind dabei keine Grenzen gesetzt. Die App soll das Spiel nicht vollständig ersetzen, ihr braucht trotzdem noch:

1. Die Shit Marker
2. Die Karten 1 - 10
3. Freunde

Design-technisch ist alles in einem trashigen 2000er Look gehalten. Nice! 

![alt text](https://github.com//MrIwan/top10/blob/main/ressourcen/Screenshot.png?raw=true)

## Der Ablauf am Abend

Der perfekte Top10-Abend mit dieser App funktioniert folgendermaßen: 

1. Treffen um 18 Uhr
2. 90 min gemeinsam kochen und alle dürfen mit ihren Handys einfach Fragen hinzufügen
   - Dafür auf `http://<ip-addr>:8089`
   - Unter allen Fragen findet ihr einen Button, um neue Fragen hinzuzufügen
3. Ganz viel TOP10 spielen
   - Dafür unter `http://<ip-addr>:8089` auf "Spiel spielen" drücken. Danach erscheint ein Dialog, wo man zunächst eine von 4 zufällig gezogenen Fragen auswählen kann. Danach sollen die Antworten in der Gruppe gesammelt werden, das passiert alles analog und anschließend kann zum Hauptmenü zurückgekehrt oder neue Fragen gezogen werden.

## Voraussetzungen

Natürlich muss einer von euch im Netzwerk diesen Service hier ausführen. Installiert dafür Docker und Docker Compose, clont euch dieses Repository und startet dann den Service mit:

```bash
docker compose up -d
```

## Disclaimer

Es ist nicht dafür gedacht exposed oder über das Internet zugänglich gemacht zu werden.


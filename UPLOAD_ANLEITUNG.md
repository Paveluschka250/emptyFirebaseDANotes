# Anleitung: Projekt mit FileZilla hochladen

## Schritt 1: Projekt für Produktion bauen

Öffne ein Terminal im Projektordner und führe folgenden Befehl aus:

```bash
npm run build
```

Dies erstellt einen optimierten Build im Ordner `dist/full-firebase-danotes/browser/`.

## Schritt 2: FileZilla öffnen und Server verbinden

1. Öffne FileZilla
2. Verbinde dich mit deinem FTP-Server:
   - Host: (deine FTP-Adresse)
   - Benutzername: (dein FTP-Benutzername)
   - Passwort: (dein FTP-Passwort)
   - Port: (meistens 21 oder 22)

## Schritt 3: Was hochladen?

**✅ HOCHLADEN:** Nur den **INHALT** aus dem Ordner `dist/full-firebase-danotes/browser/`

**❌ NICHT hochladen:**
- `node_modules/` Ordner (zu groß, wird nicht benötigt)
- `src/` Ordner (Quellcode wird nicht benötigt)
- `package.json`, `angular.json`, etc. (Entwicklungsdateien)
- `.git/` Ordner (falls vorhanden)
- Den gesamten `dist/` Ordner selbst - nur der INHALT von `browser/`

## Schritt 4: Dateien hochladen

1. Im **rechten Fenster** (Remote-Server): Navigiere zum Zielverzeichnis (meist `public_html/`, `www/` oder `htdocs/`)
2. Im **linken Fenster** (Lokaler Computer): Navigiere zu: `C:\Users\pgros\Desktop\projects\danotes\dist\full-firebase-danotes\browser\`
3. **Wähle ALLE Dateien und Ordner** im linken Fenster aus (Strg+A) - das sollte sein:
   - `index.html`
   - `favicon.ico`
   - `.htaccess` (für Routing)
   - `assets/` Ordner
   - JavaScript-Dateien (`.js`)
   - CSS-Dateien (`.css`)
   - `3rdpartylicenses.txt`
4. **Ziehe sie ins rechte Fenster** oder klicke auf "Hochladen"

## Schritt 5: Prüfen

Nach dem Upload solltest du folgende Dateien auf dem Server sehen:
- `index.html`
- `favicon.ico` oder `favicon.png`
- `assets/` Ordner
- JavaScript-Dateien (`.js`)
- CSS-Dateien (`.css`)

## Wichtig:

✅ Eine `.htaccess` Datei wurde bereits im Build-Ordner hinzugefügt. Diese ist wichtig für das Routing der Angular-App.

**Falls die Seite nach dem Upload nicht korrekt lädt:**
- Prüfe, ob `.htaccess` hochgeladen wurde (manchmal werden Dateien mit Punkt am Anfang versteckt)
- Kontaktiere deinen Hosting-Provider, ob `mod_rewrite` aktiviert ist
- Stelle sicher, dass alle Dateien im richtigen Verzeichnis sind (meist `public_html/`)


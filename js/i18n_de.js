var i18n_de = {

'_code': 'de',
'_name': 'Deutsch (Deutschland)',


'experimental': ' (experimentell)',
'Event Sheet': 'Spielbericht',
'Automatic': 'Automatisch',
'Court': 'Feld',
'Select Court': 'Feld auswählen',
'Score Sheet': 'Schiedsrichterzettel',
'Statistics': 'Spiel-Statistiken',
'dialog-left': 'Spieler auf der linken Seite',
'dialog-server': 'Aufschläger',
'dialog-receiver': 'Rückschläger',
'Call referee': 'Referee rufen',
'Are you retiring?': 'Werden Sie aufgeben?',
'import link': 'Aus Datei importieren ...',
'send export': 'Export senden',
'select pick': 'Auswählen',
'back': 'Zurück',

'fullscreen:go': 'Vollbildmodus',
'fullscreen:no': 'Normalbildmodus',
'timer:restart': 'Stoppuhr neu starten',

'court:left': 'links',
'court:right': 'rechts',
'court:referee': 'Änderungen werden nicht übertragen',

'postmatch:label': '(Dieses Spiel wurde bereits beendet)',
'postmatch:leave': 'Spiel verlassen',

'mdesc:finished': 'Abgeschlossen',
'mdesc:interval': 'Pause',
'mdesc:selected': 'Aufruf&Wahl',
'mdesc:toss': 'Wahl wird eingegeben',
'mdesc:warmup': 'Einspielen',
'mdesc:incomplete': 'Erwarte Mannschaftsaufstellung',
'mdesc:blocked': 'Warte auf Spieler ({matches})',
'mdesc:waiting': 'Aufruf nicht vor {time}',
'mdesc:selectable': 'Aufruf jetzt möglich',

'report problem': 'Problem/Anregung melden',
'report:test': 'Diagnose-Funktion testen',
'report:subject': 'Problem mit bup',
'report:body': 'Das Schiedsrichter-Panel hat folgendes Problem:\n\n\n\n\nTechnische Informationen:\nVersion: {bup_version}\nSprache: {lang}\nWebbrowser: {ua}\nURL: {url}\nGröße: {size} ({screen})\nEinstellungen: {settings}\nLetzer Fehler: {last_error}\n',

'network:error': 'Fehler bei der Netzwerk-Übertragung',
'network:error:unconfigured': 'Keine Netzwerk-Anbindung konfiguriert! (Einzel-Demo-Modus statt #bldemo?)',
'network:Matches': 'Spiele',
'network:restart match': 'Spiel bei 0-0 neu starten',
'network:resume match': 'Spiel bei {score} fortsetzen',
'network:in progress': 'Das Spiel {match} wurde bereits angefangen',
'network:match finished': 'Das Spiel {match} ist bereits beendet ({score})!',
'network:fetching courts': 'Hole Spielfeld-Liste ...',

'editevent:link': 'Wettkampf bearbeiten',
'editevent:back': 'Zurück',
'editevent:add manual m': 'Anderer Spieler ..',
'editevent:add manual f': 'Andere Spielerin ..',
'editevent:enter player name': 'Spieler-Name:',
'editevent|backup players': 'E',
'editevent|present players': 'A',
'editevent|add backup player': 'Ersatzspieler hinzufügen ...',
'editevent|add present player': 'Anwesende hinzufügen ...',

'setupsheet:header|m': 'Herren',
'setupsheet:header|f': 'Damen',
'setupsheet:header:backup': 'E',
'setupsheet:header:present': 'A',
'setupsheet:add': 'Hinzufügen',
'setupsheet:link': 'Aufstellung',
'setupsheet:cancel': 'Abbrechen',
'setupsheet:save': 'Speichern',
'setupsheet:new player|m': 'Anderer Spieler ..',
'setupsheet:new player|f': 'Andere Spielerin ..',
'setupsheet:enter player name': 'Spieler-Name:',
'setupsheet:pdf': 'PDF',
'setupsheet:print': 'Drucken',
'setupsheet:setup|0': 'Aufstellung der Heim-Mannschaft',
'setupsheet:setup|1': 'Aufstellung der Gast-Mannschaft',
'setupsheet:teamster': 'Mannschaftsführer',
'setupsheet:signature': 'Unterschrift',
'setupsheet:longlabel:backup': 'Ersatz',
'setupsheet:longlabel:present': 'Anwesend',
'setupsheet:filename': 'Aufstellungszettel {event_name}.pdf',
'setupsheet:confirm cancel': 'Änderungen an der Aufstellung verwerfen?',

'button:undo': 'Rückgängig',
'button:settings': 'Konfiguration',
'button:exception': 'Situation',
'button:shuttle': 'Federball +1',
'button:redo': 'Wiederholen',
'button:Unsuspend': 'Spiel fortsetzen',
'button:Resume after injury': 'Spiel fortsetzen',

'onmyright.team': 'Meine Damen und Herren:\nZu meiner Rechten,\n{right_team},\nund zu meiner Linken,\n{left_team}.\n{serving_team}{serving_str}.\n\n{score}.\nBitte spielen.',
'onmyleft.team': 'Meine Damen und Herren:\nZu meiner Linken,\n{left_team},\nund zu meiner Rechten,\n{right_team}.\n{serving_team}{serving_str}.\n\n{score}.\nBitte spielen.',
'onmyright': 'Meine Damen und Herren:\nZu meiner Rechten,\n{right_team},\nund zu meiner Linken,\n{left_team}.\n{server}{receiver_str}.\n\n{score}.\nBitte spielen.',
'onmyright.serves': ' schlägt auf',
'onmyright.serveto': ' schlägt auf zu {receiver}',
'onmyright.serve.to': ' zu ',
'onmyright.team.doubles': '{p1} und {p2}',
'onmyright.representedby': ', vertreten durch ',
'score.all': 'beide',
'score.service_over': 'Aufschlagwechsel. ',
'Interval': 'Pause.',
'20secs': 'Spielfeld {court_id}, 20 Sekunden.\nSpielfeld {court_id}, 20 Sekunden.',
'20secs:nocourt': '20 Sekunden. 20 Sekunden.',
'change_ends': ' Bitte die Spielfeldseiten wechseln.',
'game point': 'Satzpunkt',
'match point': 'Spielpunkt',
'gamescore|0-0': '',
'gamescore|1-0': '',
'gamescore|1-1': '; einen Satz beide',
'gamescore|2-0': '. {games_leader_name} führt mit 2:0 Sätzen',
'gamescore|2-1': '. {games_leader_name} führt mit 2:1 Sätzen',
'gamescore|2-2': '; zwei Sätze beide',
'gamescore|doubles|0-0': '',
'gamescore|doubles|1-0': '',
'gamescore|doubles|1-1': '; einen Satz beide',
'gamescore|doubles|2-0': '. {games_leader_name} führen mit 2:0 Sätzen',
'gamescore|doubles|2-1': '. {games_leader_name} führen mit 2:1 Sätzen',
'gamescore|doubles|2-2': '; zwei Sätze beide',
'wonby.winner': ' wurde gewonnen von {winner_name} mit {winner_score}-{loser_score}',
'wonby|1': 'Der erste Satz',
'wonby|2': 'Der zweite Satz',
'wonby|3': 'Der dritte Satz',
'wonby|4': 'Der vierte Satz',
'wonby.match': 'Das Spiel wurde gewonnen von {winner_name} mit {score_str}',
'wonby.walkover': '(Walkover zugunsten von {winner_name}.\n{loser_name} waren nicht anwesend.)',
'wonby.and': ' und ',
'game(won)': 'Satz',
'match suspended': 'Das Spiel ist unterbrochen',
'ready to unsuspend': 'Sind Sie spielbereit?\n',
'ready to play': 'Spielbereit.',

'demo:team1': '1. BC Beuel',
'demo:player1.1': 'Max Weißkirchen',
'demo:player1.2': 'Hannah Pohl',
'demo:team2': '1.BC Sbr.-Bischmisheim',
'demo:player2.1': 'Marvin Seidel',
'demo:player2.2': 'Isabel Herttrich',
'demo:match_name': 'GD',
'demo:event_name': 'BCB - BCB (Demo)',
'demo:tournament_name': 'Demo',

'loveall_play': '.\nBitte spielen.',
'loveall_game|0': '',
'loveall_game|1': 'Zweiter Satz. ',
'loveall_game|2': 'Dritter Satz. ',
'loveall_game|3': 'Vierter Satz. ',
'loveall_game|final': 'Entscheidungssatz. ',

'postinterval.play': '{score}. Bitte spielen.',

'card.yellow': '{player_name}, Verwarnung wegen unsportlichen Verhaltens.\n',
'card.red': '{player_name}, Fehler wegen unsportlichen Verhaltens.\n',
'card.red.interval': '{player_name}, Fehler wegen unsportlichen Verhaltens.\n',
'card.black': '{player_name}, disqualifiziert wegen unsportlichen Verhaltens.\n',
'card.retired': '{player_name} gibt auf.\n',
'card.play': '. Bitte spielen.',

'scoredisplay:Service Over': 'Aufschlagwechsel',
'scoredisplay:Game Point': 'Satzpunkt',
'scoredisplay:Match Point': 'Spielpunkt',
'scoredisplay:Interval': 'Pause',
'scoredisplay:Change Ends': 'Seiten wechseln',
'scoredisplay:Game': 'Satz',

'button:Cancel': 'Abbrechen',

'bup.update_available': 'Eine neue Version des Schiedsrichter-Panels ist verfügbar.',
'bup.update_now': 'Jetzt aktualisieren',
'bup.update_later': 'Später',
'bup.updating': 'Aktualisiere ...',
'bup.updated.version': 'Version',

'settings:Back to Match': 'Zurück zum Spiel',
'settings:Current Match': 'Aktuelles Spiel',
'settings:Edit Manually': 'Manuell Bearbeiten',
'settings:Abort Manual Edit': 'Manuelles Bearbeiten abbrechen',
'settings:Matches': 'Spiele',
'settings:Event Scoresheets': 'Schiedsrichterzettel',
'settings:Custom match details': 'Spiel manuell eintragen ...',
'settings:Network statistics': 'Netzwerkstatistiken',
'settings:Order link': 'Reihenfolge',
'settings:Export link': 'Exportieren',
'settings:New match': 'Neues Spiel',
'settings:Singles': 'Einzel',
'settings:Doubles': 'Doppel',
'settings:team1-placeholder': 'z.B. 1. BC Bischmisheim 1',
'settings:team2-placeholder': 'z.B. 1. BV Mülheim 1',
'settings:match_name-placeholder': 'z.B. HE1 oder Halbfinale',
'settings:event_name-placeholder': 'z.B. BCB vs BVM oder HD-A',
'settings:tournament_name-placeholder': 'z.B. 1. Bundesliga 2017/2018',
'settings:match_name-label': 'Spiel',
'settings:event-label': 'Event',
'settings:tournament_name-label': 'Turnier',
'settings:team_competition': 'Mannschaftswettbewerb',
'settings:Start Match': 'Spiel starten',
'settings:Resume Match': 'Spiel fortführen',
'settings:loadmatch_none': 'Keine gespeicherten Spiele vorhanden!',
'settings:Import Event': 'Wettkampf importieren',
'settings:import from URL': 'Von turnier.de importieren',
'settings:import_url-placeholder': 'https://www.turnier.de/...',
'settings:counting': 'Zählweise',
'settings:counting|3x21': 'BWF (3x21)',
'settings:counting|2x21+11': '2x21, 3. Satz bis 11',
'settings:counting|5x11_15': 'BWF 2016 Experiment Option 1 (5x11 bis max. 15)',
'settings:counting|5x11_15^90': 'Bundesliga 2017 (5x11 bis max. 15, 90s Pause)',
'settings:counting|5x11/3': 'BWF 2016 Experiment Option 2 (5x11, Verlängerung bis 13)',
'settings:counting|5x11_11': 'UAE (5x11 ohne Verlängerung)',
'settings:counting|3x15_18': 'Verkürzt (3x15 bis max. 18)',
'settings:counting|1x21': 'Bundesliga Goldener Satz (1x21)',
'settings:counting|1x11_15': 'Bundesliga Goldener Satz Experiment (1x11 bis max. 15)',

'settings:warmup': 'Spielfeld\u00ADgewöhnungszeit',
'settings:warmup:bwf-2016': 'BWF ab 2016 (90s)',
'settings:warmup:legacy': '120s (Deutschland)',
'settings:warmup:none': 'Sofort beginnen',

'settings:Settings': 'Einstellungen',
'settings:Court Description': 'Feld:',
'settings:Court Description.placeholder': 'z.B. rechts',
'settings:Court Number': 'Nummer',
'settings:Select Court': 'Feld:',
'settings:Umpire': 'Schiedsrichter',
'settings:Service judge': 'Aufschlagrichter',
'settings:Language': 'Sprache',
'settings:editmode doubleclick': 'Manuelles Bearbeiten mit Doppelklick auf Feld',
'settings:Show Pronunciation': 'Ansagen anzeigen',
'settings:Negative Timers': 'Stoppuhr läuft bis zum nächsten Punkt (auch negative Werte anzeigen)',
'settings:Shuttle Counter': 'Federballzähler anzeigen',
'settings:Request Fullscreen on Startup': 'Vollbildmodus beim Start anfragen',
'settings:Go Fullscreen': 'Vollbildmodus',
'settings:Leave Fullscreen': 'Vollbildmodus verlassen',
'settings:Button Block Timeout': 'Doppel-Touch-Sperre (ms)',
'settings:Network Timeout': 'Netzwerk-Timeout (ms)',
'settings:Network Repeat Interval': 'Netzwerk-Wiederholungszeit (ms)',
'settings:wakelock:label': 'Bildschirm anlassen:',
'settings:wakelock:display': 'Nur im Anzeigemodus',
'settings:wakelock:always': 'immer',
'settings:wakelock:never': 'niemals',
'settings:click_mode': 'Touch-Erkennung',
'settings:click_mode:auto': 'Automatisch',
'settings:click_mode:touchstart': 'Schnell',
'settings:click_mode:touchend': 'Langsam',
'settings:click_mode:click': 'Nativ',
'settings:refmode:client:status': 'Referee:',
'settings:refmode:client:node_name': 'Geräte-Name:',
'settings:refmode:ws_url': 'Hub-URL:',
'settings:refmode:redirected': 'Lokaler Hub: ',
'settings:refmode:service judges': 'Wettkampf mit Aufschlagrichtern',

'settings:mode:label': 'Modus:',
'settings:mode:umpire': 'Schiedsrichter',
'settings:mode:display': 'Anzeigetafel',
'settings:mode:referee': 'Referee',

'exceptions:yellow-card-title': 'Gelbe Karte',
'exceptions:yellow-card': 'Verwarnung',
'exceptions:red-card-title': 'Rote Karte',
'exceptions:red-card': 'Fehlerwarnung',
'exceptions:black-card-title': 'Disqualifikation',
'exceptions:black-card': 'Disqualifiziert',
'exceptions:referee-title': 'Referee',
'exceptions:referee': 'Referee',
'exceptions:suspension-title': 'Unterbrechung',
'exceptions:suspension': 'Unterbrechung',
'exceptions:injury-title': 'Verletzung',
'exceptions:injury': 'Verletzung',
'exceptions:retired-title': 'Aufgabe',
'exceptions:retired': 'Aufgabe',
'exceptions:correction-title': 'Korrektur',
'exceptions:correction': 'Vertauschung\nAufschlagfeld',
'exceptions:overrule-title': 'Overrule',
'exceptions:overrule': 'Korrektur\nLinienrichter',
'exceptions:walkover': 'Walkover',
'exceptions:walkover-title': 'Spieler nicht erschienen',

'exceptions:dialog:correction': 'Vertauschung Aufschlagfeld',
'exceptions:dialog:yellow-card': 'Verwarnung (gelbe Karte)',
'exceptions:dialog:red-card': 'Fehlerwarnung (rote Karte)',
'exceptions:dialog:injury': 'Verletzung',
'exceptions:dialog:retired': 'Aufgegeben',
'exceptions:dialog:black-card': 'Disqualifiziert (schwarze Karte)',
'exceptions:dialog:walkover': 'Walkover',

'mark|overrule': 'O',
'mark|referee': 'R',
'mark|suspension': 'U',
'mark|correction': 'C',
'mark|yellow-card': 'W',
'mark|red-card': 'F',
'mark|injury': 'V',
'mark|retired': 'A',
'mark|disqualified': 'Disqualifiziert',
'mark|walkover': 'Walkover',

'scoresheet:Match': 'Spiel:',
'scoresheet:Date': 'Datum:',
'scoresheet:Court': 'Feld:',
'scoresheet:Umpire': 'Schiedsrichter:',
'scoresheet:Referee': 'Referee:',
'scoresheet:Service judge': 'Aufschlagrichter:',
'scoresheet:Begin': 'Beginn:',
'scoresheet:End': 'Ende:',
'scoresheet:Duration': 'Dauer:',
'scoresheet:Shuttles': 'Federbälle:',
'scoresheet:points': 'Satzergebnis',
'scoresheet:button:print': 'Ausdrucken',
'scoresheet:button:pdf': 'PDF',
'scoresheet:button:note': 'Notiz hinzufügen',
'scoresheet:button:back': 'Zurück',
'scoresheet:note:placeholder': 'Notiz hier eingeben ...',
'scoresheet:server': 'A',
'scoresheet:receiver': 'R',
'scoresheet:Empty Scoresheet': 'Schiedsrichterzettel',
'scoresheet:[Event Scoresheet Filename]': 'Schiedsrichterzettel {event_name}',

'eventsheet:draw': 'Unentschieden',
'eventsheet:Generate': '{sheetname} generieren',
'eventsheet:back': 'Zurück',
'eventsheet:download empty': 'Leeres Formular',
'eventsheet|backup_players': 'Ersatzspieler {team_name}:',
'eventsheet|present_players': 'Anwesende {team_name}:',

'eventsheet:umpires': 'Schiedsrichter:',
'eventsheet:location': 'Austragungsstätte:',
'eventsheet:matchday': 'Spieltag:',
'eventsheet:starttime': 'Startzeit:',
'eventsheet:backup_players_str': 'Vorhergesehene Ersatzspieler:',
'eventsheet:notes': 'Besondere Vorkommnisse:',
'eventsheet:protest': 'Protest:',
'eventsheet:spectators': 'Zuschauer:',
'eventsheet:referee': 'Referee:',

'eventsheet:label|1BL-2016': 'Excel-Spielbericht',
'eventsheet:label|2BLN-2016': 'Excel-Spielbericht',
'eventsheet:label|2BLS-2016': 'Excel-Spielbericht',
'eventsheet:label|1BL-2017_pdf': 'PDF-Spielbericht',
'eventsheet:label|2BLN-2017_pdf': 'PDF-Spielbericht',
'eventsheet:label|2BLS-2017_pdf': 'PDF-Spielbericht',
'eventsheet:label|1BL-2015': 'Spielbericht (2015)',
'eventsheet:label|2BLN-2015': 'Spielbericht (2015)',
'eventsheet:label|2BLS-2015': 'Spielbericht (2015)',
'eventsheet:label|teamlist-1BL-2016': 'Mannschaftsunterlagen',
'eventsheet:label|teamlist-2BLN-2016': 'Mannschaftsunterlagen',
'eventsheet:label|teamlist-2BLS-2016': 'Mannschaftsunterlagen',
'eventsheet:label|buli2017-minsr': 'Mindestanforderungen Schiedsrichter',
'eventsheet:label|buli2017-minv': 'Mindestanforderungen Verein',
'eventsheet:label|BL-ballsorten-2016': 'Zugelassene Bälle',
'eventsheet:label|DBV-Satzungen-2016': 'Regeln DBV 2016/2017',
'eventsheet:label|DBV-Satzungen-2017': 'Regeln DBV 2017/2018',
'eventsheet:label|RLW-2016': 'Spielbericht',
'eventsheet:label|RLN-2016': 'Spielbericht',
'eventsheet:label|RLN-Satzungen': 'Satzungen und Ordnungen',
'eventsheet:label|RLM-2016': 'Spielbericht',
'eventsheet:label|RLM-SpO': 'Spielordnung',
'eventsheet:label|team-1BL-2015': 'Mannschaftsaufstellung (2015)',
'eventsheet:label|team-2BL-2015': 'Mannschaftsaufstellung (2015)',
'eventsheet:label|NRW-2016': 'Spielbericht',
'eventsheet:label|NRW-Satzungen': 'Satzungen und Ordnungen BLV NRW',
'eventsheet:label|NLA-2017': 'Resultatblatt',
'eventsheet:label|OBL-2017': 'Spielbericht',
'eventsheet:label|receipt': 'Schiedsrichter-Quittung',
'eventsheet:label|int': 'Spielbericht',

'stats:game': '{number}. Satz',
'stats:match': 'Spiel',
'stats:back': 'Zurück',
'stats:serves': 'Aufschläge {player_name}',
'stats|points': 'Punkte',
'stats|points_lr': 'Punkte links/rechts',
'stats|shuttles': 'Federbälle',
'stats|duration': 'Dauer',
'stats|avg_rally_length': '⌀ Ballwechsel-Länge',
'stats|longest_rally': 'Längster Ballwechsel',
'stats|longest rally (game)': ' ({score})',
'stats|longest rally (match)': ' ({score} im {game}. Satz)',
'stats|longest_series': 'Längste Punkteserie',
'stats|largest_lead': 'Größte Führung',
'stats|lost_service_percent': '% Aufschlag-Verlust',

'netstats:No stats available': 'Noch keine Netzwerkkommunikation',
'stats|<25ms': 'Latenz <25ms',
'stats|<100ms': 'Latenz <100ms',
'stats|<250ms': 'Latenz <250ms',
'stats|<500ms': 'Latenz <500ms',
'stats|<2s': 'Latenz <2s',
'stats|<8s': 'Latenz <8s',
'stats|>8s': 'Latenz >8s',
'stats|latency_avg_str': '⌀ Latenz',
'stats|moving_avg_str': '⌀-Tendenz',
'stats|failed_net_count': 'Verlust',
'stats|failed_srv_count': 'Server-Fehler',
'stats|success_net_count': '# Erfolg',
'stats|last_str': 'Letzer Wert',

'pressdesc|pick_side': 'Seitenwahl',
'pressdesc|state:pick_side': '{left_team} links,\n{right_team} rechts',
'pressdesc|state:pick_server': '{player}',
'pressdesc|state:pick_receiver': '{player}',
'pressdesc|state:injury': '{player} verletzt',
'pressdesc|undo': 'Rückgängig',
'pressdesc|redo': 'Wiederholen',
'pressdesc|pick_server': 'Aufschläger',
'pressdesc|pick_receiver': 'Rückschläger',
'pressdesc|timer_restart': 'Stoppuhr Reset',
'pressdesc|correction': 'Vertauschung Aufschlagfeld',
'pressdesc|state:correction': 'Korrekt: {left_player} links,\n{right_player} rechts',
'pressdesc|injury': 'Verletzung',
'pressdesc|overrule': 'Overrule Linienrichter',
'pressdesc|suspension': 'Unterbrechung',
'pressdesc|resume': 'Spielfortsetzung',
'pressdesc|injury-resume': 'Spiel wird fortgesetzt',
'pressdesc|score:left': 'Punkt links',
'pressdesc|score:right': 'Punkt rechts',
'pressdesc|love-all': '0 beide',
'pressdesc|shuttle': 'Ball ausgegeben',
'pressdesc|state:shuttle': '{count} Bälle',
'pressdesc|editmode_change-ends': 'Manuelle Korrektur: Seitenwechsel',
'pressdesc|state:editmode_change-ends': '{left_team} links,\n{right_team} rechts',
'pressdesc|editmode_change-serve': 'Manuelle Korrektur: Aufschlagsrecht',
'pressdesc|state:editmode_change-serve': '{player} schlägt auf',
'pressdesc|editmode_switch-sides': 'Manuelle Korrektur: Position',
'pressdesc|state:editmode_switch-sides': '{left_player} links,\n{right_player} rechts',
'pressdesc|editmode_set-finished_games': 'Manuelle Korrektur: Spielstand',
'pressdesc|editmode_set-score': 'Manuelle Korrektur: Spielstand',
'pressdesc|yellow-card': 'Gelbe Karte',
'pressdesc|state:yellow-card': '{player} verwarnt',
'pressdesc|red-card': 'Rote Karte',
'pressdesc|state:red-card': 'Fehlerwarnung {player}, {score_str}',
'pressdesc|referee': 'Referee',
'pressdesc|note': 'Notiz',
'pressdesc|postgame-confirm': 'Satz-Bestätigung',
'pressdesc|postmatch-confirm': 'Spiel-Bestätigung',
'pressdesc|postinterval-confirm': 'Ende der Pause',
'pressdesc|retired': '{player} gibt auf',
'pressdesc|state:retired': '{winner} gewinnt {score_str}',
'pressdesc|disqualified': 'Schwarze Karte {player}.',
'pressdesc|state:disqualified': '{winner} gewinnt {score_str}',
'pressdesc|court_id': 'Feld {court_id}\n',
'pressdesc|umpire_name': 'Schiedsrichter: {umpire_name}\n',
'pressdesc|service_judge_name': 'Aufschlagrichter: {service_judge_name}\n',

'order:header': 'Spielreihenfolge',
'order:back': '< Zurück',
'order:optimize': 'Optimieren',
'order:reset': 'Zurücksetzen',
'order:print': 'Drucken',
'order:change': 'Ändern',
'order:ignore match': 'Spiel herausnehmen',
'order:add:placeholder': '1. Spieler, z.B. Marc Zwiebler',
'order:add:placeholder2': '2. Spieler, z.B. Raphael Beck / Carla Nelte',
'order:add:match': 'Spiel hinzufügen',
'order:add:invalid': 'Anzahl der Spieler muss auf beiden Seiten gleich sein. Spieler-Namen werden durch einen Slash(/) getrennt.',
'order:add:discipline': 'Disziplin',
'order:rm:prompt': 'Spiel {match_name} wirklich löschen?',
'order:import matches': 'Importieren',
'order:import:error': 'Import fehlgeschlagen: {msg}',
'order:import:placeholder': 'https://www.turnier.de/sport/matches.aspx?...',

'staticnet:switch back message': 'Sicherungskopie des Wettkampfs geladen. Änderungen werden nicht übertragen! ',
'staticnet:switch back button': 'Wechseln zu {service}',
'staticnet:error': 'Download-Fehler (Code: {code})',
'staticnet:service_name': 'Netzwerk-Demo',

'importexport:invalid JSON': 'Ungültiges JSON: {msg}',
'importexport:not an export file': 'Diese Datei ist keine bup-export-Datei!',
'importexport:export sent': 'Danke! Export verschickt.',

'weekday|0': 'So',
'weekday|1': 'Mo',
'weekday|2': 'Di',
'weekday|3': 'Mi',
'weekday|4': 'Do',
'weekday|5': 'Fr',
'weekday|6': 'Sa',

'displaymode:style': 'Ansicht:',
'displaymode|top+list': 'Aktuell/Liste',
'displaymode|oncourt': 'Feld-Punktzahl',
'displaymode|international': 'International',
'displaymode|teamcourt': 'Mannschaftskampf',
'displaymode|2court': '2 Felder',
'displaymode|andre': 'André',
'displaymode|tim': 'Tim',
'displaymode|greyish': 'Gräulich',
'displaymode|tournament_overview': 'Turnier-Übersicht',
'displaymode|castall': 'Cast',
'displaymode|onlyplayers': 'Nur Spieler',
'displaymode|onlyscore': 'Nur Spielstand',
'displaymode|clubplayers': 'Verein + Spieler',
'displaymode|clubplayerslr': 'Verein + Spieler (links / rechts)',
'displaymode|teamscore': 'Siegerfoto',
'displaymode|stripes': 'Streifen',
'displaymode:court_id': 'Court:',
'displaymode:court_id:loading': 'lade ...',
'displaymode:reverse_order': 'Umgekehrte Felder-Reihenfolge',
'displaymode:no courts': 'Keine Court-Informationen verfügbar!',
'displaymode:scale': 'Größen-Skalierung:',
'displaymode:colors': 'Farben:',
'displaymode:use team colors': 'Verwende Team-Farben',
'displaymode:show_pause': 'Zeige verbleibende Pausenzeit',
'displaymode:hide settings': 'Verbergen',

'liveaw:lost connection': 'Verbindung wird wiederhergestellt ...',

'refmode:lost connection': 'Verbindung wird wiederhergestellt ...',
'refmode:status|disabled': 'Deaktiviert',
'refmode:status|enabled': 'Aktiviert',
'refmode:status|connected to hub': 'Verbunden zu Hub...',
'refmode:status|welcomed': 'Verbunden zu Hub',
'refmode:status|client.connected': 'Verbunden zu {fp}',
'refmode:status|referee.connected': 'Verbunden zu {all_str}',
'refmode:status|referee.registered': 'Beim Hub registriert',
'refmode:keygen failed': 'Schlüssel konnte nicht erzeugt werden: {message}',
'refmode:generating key': 'Generiere Schlüssel ...',
'refmode:client:no_referees': 'Keine Referees verbunden',
'refmode:client:no_more_referees': 'Alle verbundenen Referees sind bereits authentifiziert.',
'refmode:client:select_referee': 'Mit Referee verbinden ...',
'refmode:client:no_select_referee': 'Anzeige verbergen',
'refmode:client:paired': 'Authentifizierte Referees:',
'refmode:client:paired:none': 'Keine Referees authentifiziert.',
'refmode:referee:paired:none': 'Keine Tablets verbunden.\n\nVerbinde ein Tablet:\n1. Option "Referee" in den Einstellungen aktivieren.\n2. Auf Button "Mit Referee verbinden" klicken.\n3. {ref_fp} auswählen.',
'refmode:referee:subscribe': 'Live',
'refmode:referee:refresh': 'Aktualisieren',
'refmode:referee:kill': 'Trennen',
'refmode:referee:kill prompt': 'Referee-Anbindung von {client} deaktivieren?',
'refmode:referee:push:activate': 'Push-Modus aktivieren',
'refmode:referee:push:deactivate': 'Push-Modus beenden',
'refmode:referee:battery': 'Batterie: ',
'refmode:referee:battery:na': 'Keine Informationen',
'refmode:referee:battery:charging': 'Lädt ({percent}%{duration})',
'refmode:referee:battery:discharging': '{percent}%{duration} verbleibend',
'refmode:referee:set': 'Ändern',
'refmode:referee:cancel': 'Abbrechen',
'refmode:referee:edit': 'Bearbeiten',
'refmode:referee:umpire_name': 'Schiedsrichter: ',
'refmode:referee:service_judge_name': 'Aufschlagrichter: ',
'refmode:referee:swap TOs': 'Tauschen',
'refmode:referee:court': 'Feld: ',
'refmode:referee:match': 'Spiel: ',
'refmode:referee:back from settings': 'Zurück zur Referee-Übersicht',
'refmode:referee:no event': 'Kein Wettkampf ausgewählt',
'refmode:referee:no event matches': 'Keine Spielinformationen',
'refmode:referee:no matches': 'Keine Spiele - verbinde mindestens ein Tablet.',
'refmode:referee:different_event': 'Anderer Wettkampf: {event_name}',
'refmode:referee:updated_event': 'Neuerer Stand ({time})',
'refmode:referee:espouse event': 'Übernehmen',
'refmode:referee:change match': 'Ändern',
'refmode:referee:change court': 'Ändern',
'refmode:referee:change display style': 'Ändern',
'refmode:referee:outdated bup': 'Veraltete bup-Version: {bup_version}',
'refmode:referee:generating key': 'Generiere Referee-Schlüssel ...',
'refmode:referee:forwards clock': 'Die Uhr des Tablets geht um {diff} Minuten vor!',
'refmode:referee:backwards clock': 'Die Uhr des Tablets geht um {diff} Minuten nach!',

'urlimport:error': 'Import fehlgeschlagen: {msg}',
'urlimport:staticnet_message': 'Importierter Wettkampf',

'editmode:fix_time': 'Zeit fixieren',

'dads:label': 'Werbung:',
'dads:configure': 'Konfigurieren',
'dads|none': 'keine',
'dads|always': 'aktiv',
'dads|periodic': 'periodisch',
'dads|until': 'Endzeit',
'dads|intervals': 'In Spielpausen (in Arbeit)',
'dads|inbetween': 'Zwischen Spielen',
'dads:heading': 'Werbung konfigurieren',
'dads:mode': 'Modus:',
'dads:add image': 'Bild hinzufügen',
'dads:add image url': 'Bild-URL hinzufügen',
'dads:add video file url': 'Video-Datei-URL hinzufügen',
'dads:add rg': 'Ankündigungstext hinzufügen',
'dads:back': 'Zurück',
'dads:quota': 'Werbung konnte nicht gespeichert werden: Nicht genügend Speicherplatz auf diesem Browser verfügbar. Verwenden Sie URLs statt Bilder direkt einzubetten.',
'dads|wait': 'Wartezeit (s):',
'dads|interval': 'Wechsel-Interval (s):',
'dads|dtime': 'Anzeige-Dauer (s):',
'dads|atime': 'Werbe-Dauer (s):',
'dads:utime': 'Zeit:',
'dads:active': 'Aktiv',

'urlexport:link': 'Auf {domain} eintragen',
'urlexport:user': 'Benutzername auf {domain}:',
'urlexport:password': 'Passwort:',
'urlexport:prepare': 'Eintrag vorbereiten',
'urlexport:preparing': 'Daten werden geladen ...',
'urlexport:submitting': 'Übertrage ...',
'urlexport:http-error': 'Übertragungs-Fehler (Code: {code})',
'urlexport:winner_code:0': 'Läuft',
'urlexport:winner_code:retired': 'Aufgabe durch {team_name}',
'urlexport:submit': 'Eintragen',
'urlexport:success': 'Erfolgreich übertragen',
'urlexport:url': 'URL:',
'urlexport:submit url': 'Weiter',

'receipt:base': 'Einsatz:',
'receipt:date': 'Datum:',
'receipt:distance': 'Entfernung:',
'receipt:header': 'Quittung',
'receipt:total': 'Erhalten:',
'receipt:travelcosts': 'Reisekosten:',
'receipt:umpire': 'Schiedsrichter:',
};

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = i18n_de;
}
/*/@DEV*/
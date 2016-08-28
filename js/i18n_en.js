var i18n_en = {

'_code': 'en',
'_name': 'English',

'Automatic': 'Automatic',
'Court': 'Court',
'Select Court': 'Select Court',
'Score Sheet': 'Score Sheet',
'Statistics': 'Stats',
'dialog-left': 'Left court side',
'dialog-server': 'Server',
'dialog-receiver': 'Receiver',
'[Call referee!]': '[Call referee!]',
'Are you retiring?': 'Are you retiring?',
'import link': 'Import event ...',
'send export': 'send export file',

'fullscreen:go': 'Go fullscreen',
'fullscreen:no': 'Normal screen',
'timer:restart': 'Restart timer',

'court:left': 'left',
'court:right': 'right',
'court:referee': 'Changes will not be transmitted',

'postmatch:label': '(This match is over)',
'postmatch:leave': 'Leave match',

'report problem': 'Report problem/suggestion',
'report:test': 'Test diagnostics',
'report:subject': 'Problem with bup',
'report:body': 'I encountered the following problem with the umpire panel:\n\n\n\n\nTechnical Information:\nVersion: {bup_version}\nLanguage: {lang}\nWeb browser: {ua}\nURL: {url}\Window size: {size} ({screen})\nSettings: {settings}\nError object: {last_error}\n',

'network:error': 'Network transmission error',
'network:error:unconfigured': 'Network connection not configured',
'network:Matches': 'Matches',
'network:restart match': 'Restart match at 0-0',
'network:resume match': 'Resume match at {score}',
'network:in progress': 'Match {match} has already been started',
'network:match finished': 'Match {match} already finished ({score})!',

'editevent:link': 'Edit event',
'editevent:back': 'Back',
'editevent:add manual m': 'Other player (m) ..',
'editevent:add manual f': 'Other player (f) ..',
'editevent:enter player name': 'player name:',
'editevent:backup players': 'backup players',
'editevent:add backup player': 'Add backup player ...',

'button:undo': 'Undo',
'button:settings': 'Configuration',
'button:exception': 'Situation',
'button:shuttle': 'Shuttle Counter +1',
'button:redo': 'Redo',
'button:Unsuspend': 'Resume Play',
'button:Resume after injury': 'Resume Play',

'onmyleft.home_team': 'Ladies and Gentlemen:\nOn my right, {away_team},\nand on my left, {home_team}.\n{serving_team} to serve{serving_str}.\n{score}.\nPlay.',
'onmyleft.away_team': 'Ladies and Gentlemen:\nOn my left, {away_team},\nand on my right, {home_team}.\n{serving_team} to serve{serving_str}.\n{score}.\nPlay.',
'onmyleft': 'Ladies and Gentlemen:\nOn my right, {right_team},\nand on my left, {left_team}.\n{server} to serve{receiver_str}.\n{score}.\nPlay.',
'onmyleft.serveto': ' to {receiver}',
'onmyleft.team.doubles': '{p1} and {p2}',
'onmyleft.representedby': ', represented by ',
'onmyleft.serve.to': ' to ',
'score.all': 'all',
'score.service_over': 'Service over. ',
'Interval': 'Interval',
'change_ends': '; change ends',
'game point': 'game point',
'match point': 'match point',
'gamescore.0-0': '',
'gamescore.1-0': '',
'gamescore.1-1': '; One game all',
'gamescore.2-0': '. {games_leader_name} leads two games to love',
'gamescore.2-1': '. {games_leader_name} leads two games to one',
'gamescore.2-2': '; Two games all',
'gamescore.doubles.0-0': '',
'gamescore.doubles.1-0': '',
'gamescore.doubles.1-1': '; One game all',
'gamescore.doubles.2-0': '. {games_leader_name} lead two games to love',
'gamescore.doubles.2-1': '. {games_leader_name} lead two games to one',
'gamescore.doubles.2-2': '; Two games all',
'wonby.1': 'First game won by {winner_name} {winner_score}-{loser_score}',
'wonby.2': 'Second game won by {winner_name} {winner_score}-{loser_score}',
'wonby.3': 'Third game won by {winner_name} {winner_score}-{loser_score}',
'wonby.4': 'Fourth game won by {winner_name} {winner_score}-{loser_score}',
'wonby.match': 'Match won by {winner_name} {score_str}',
'wonby.and': ' and ',
'game(won)': 'Game',
'match suspended': 'Play is suspended',
'ready to unsuspend': 'Are you ready?\n',

'demo:team1': 'Denmark',
'demo:player1.1': 'Joachim Fischer Nielsen',
'demo:player1.2': 'Christinna Pedersen',
'demo:team2': 'China',
'demo:player2.1': 'Zhang Nan',
'demo:player2.2': 'Zhao Yunlei',
'demo:match_name': 'Finals',
'demo:event_name': 'MX',
'demo:tournament_name': 'Demo',

'servedemo:team1': 'Team A',
'servedemo:player1.1': 'Alice',
'servedemo:player1.2': 'Alex',
'servedemo:team2': 'Team B',
'servedemo:player2.1': 'Bob',
'servedemo:player2.2': 'Bella',
'servedemo:match_name': 'serve demo',
'servedemo:event_name': 'serve demo',
'servedemo:tournament_name': 'Demo',

'loveall_play': 'Bitte spielen.',
'loveall_play.0': '{score}; play',
'loveall_play.1': 'Second game; {score}; play',
'loveall_play.2': 'Third game; {score}; play',
'loveall_play.3': 'Fourth game; {score}; play',
'loveall_play.final': 'Final game; {score}; play',
'loveall_play.0.mark': 'Love all.\n{mark_str}{score}. Play.',
'loveall_play.1.mark': 'Second game; love all.\n{mark_str}{score}. Play.',
'loveall_play.2.mark': 'Third game; love all.\n{mark_str}{score}. Play.',
'loveall_play.3.mark': 'Fourth game; love all.\n{mark_str}{score}. Play.',
'loveall_play.final.mark': 'Final game; love all.\n{mark_str}{score}. Play.',


'card.yellow': '{player_name}, warning for misconduct.\n',
'card.red': '{player_name}, fault for misconduct.\n',
'card.red.interval': '{player_name}, faulted.\n',
'card.black': '{player_name}, disqualified for misconduct.\n',
'card.retired': '{player_name} retired.\n',
'card.play': '. Play.',

'scoredisplay:Service Over': 'Service Over',
'scoredisplay:Game Point': 'Game Point',
'scoredisplay:Match Point': 'Match Point',
'scoredisplay:Interval': 'Interval',
'scoredisplay:Change Ends': 'Change Ends',
'scoredisplay:Game': 'Game',

'button:Cancel': 'Cancel',

'bup.update_available': 'A new version of the umpire panel is now available.',
'bup.update_now': 'Update now',
'bup.update_later': 'Later',
'bup.updating': 'Updating ...',
'bup.updated.version': 'Version',

'settings:Back to Match': 'Back to match',
'settings:Current Match': 'Current match',
'settings:Edit Manually': 'Manual edit',
'settings:Abort Manual Edit': 'Cancel manual editing',
'settings:Matches': 'Matches',
'settings:Event Scoresheets': 'scoresheets',
'settings:Custom match details': 'custom match details ...',
'settings:Network statistics': 'network statistics',
'settings:Order link': 'match order',
'settings:Export link': 'Export',
'settings:New match': 'Create match',
'settings:Singles': 'Singles',
'settings:Doubles': 'Doubles',
'settings:team1-placeholder': 'e.g. Denmark',
'settings:team2-placeholder': 'e.g. China',
'settings:match_name-placeholder': 'e.g. MS',
'settings:event_name-placeholder': 'e.g. Finals',
'settings:tournament_name-placeholder': 'e.g. All-England 2016',
'settings:match_name-label': 'Match',
'settings:event-label': 'Event',
'settings:tournament_name-label': 'Tourn.',
'settings:team_competition': 'Team competition',
'settings:Start Match': 'Start match',
'settings:Resume Match': 'Resume match',
'settings:loadmatch_none': 'No stored matches',
'settings:counting': 'Scoring:',
'settings:counting:3x21': 'BWF (3x21)',
'settings:counting:2x21+11': '2x21, 3rd game until 11',
'settings:counting:5x11_15': 'BWF 2016 Experiment Option 1 (5x11 until max. 15)',
'settings:counting:5x11/3': 'BWF 2016 Experiment Option 2 (5x11 with 3 point challenge)',
'settings:counting:1x21': 'One Game (1x21)',
'settings:counting:1x11_15': 'One Game 2016 Experiment Option 1 (1x11 until max. 15)',


'settings:Settings': 'Settings',
'settings:Court Description': 'Court:',
'settings:Court Description.placeholder': 'e.g. right',
'settings:Court Number': 'Number',
'settings:Select Court': 'Court:',
'settings:Umpire': 'Umpire',
'settings:Service judge': 'Service judge',
'settings:Language': 'Language',
'settings:Store Completed Games': 'Store completed games',
'settings:editmode doubleclick': 'Enter manual edit mode by touching court twice',
'settings:Show Pronounciation': 'Show announcements',
'settings:Negative Timers': 'Timers go into negative',
'settings:Shuttle Counter': 'Show shuttle counter',
'settings:Request Fullscreen on Startup': 'Request fullscreen on startup',
'settings:Go Fullscreen': 'Go fullscreen',
'settings:Leave Fullscreen': 'Leave Fullscreen',
'settings:Button Block Timeout': 'Double press protection (ms)',
'settings:Network Timeout': 'Network timeout (ms)',
'settings:Network Repeat Interval': 'Network repeat interval (ms)',

'settings:mode:label': 'Mode:',
'settings:mode:umpire': 'Umpire',
'settings:mode:display': 'Display (experimental)',

'exceptions:yellow-card-title': 'Yellow card',
'exceptions:yellow-card': 'Warning',
'exceptions:red-card-title': 'Red card',
'exceptions:red-card': 'Fault',
'exceptions:black-card-title': 'Disqualification',
'exceptions:black-card': 'Disqualified',
'exceptions:referee-title': 'Referee',
'exceptions:referee': 'Referee',
'exceptions:suspension-title': 'Suspension',
'exceptions:suspension': 'Suspension',
'exceptions:injury-title': 'Injury',
'exceptions:injury': 'Injury',
'exceptions:retired-title': 'A player resigns',
'exceptions:retired': 'Retired',
'exceptions:correction-title': 'Correction',
'exceptions:correction': 'Correction',
'exceptions:overrule-title': 'Overrule',
'exceptions:overrule': 'Overrule\nline judge',

'exceptions:dialog:correction': 'service court correction',
'exceptions:dialog:red-card': 'fault for misconduct (red card)',
'exceptions:dialog:yellow-card': 'warning for misconduct (yellow card)',
'exceptions:dialog:injury': 'injury',
'exceptions:dialog:retired': 'retired',
'exceptions:dialog:black-card': 'disqualified (black card)',

'mark:overrule': 'O',
'mark:referee': 'R',
'mark:suspension': 'S',
'mark:correction': 'C',
'mark:yellow-card': 'W',
'mark:red-card': 'F',
'mark:injury': 'I',
'mark:retired': 'Retired',
'mark:disqualified': 'Disqualified',

'scoresheet:Match': 'Match:',
'scoresheet:Date': 'Date:',
'scoresheet:Court': 'Court:',
'scoresheet:Umpire': 'Umpire:',
'scoresheet:Referee': 'Referee:',
'scoresheet:Service judge': 'Service judge:',
'scoresheet:Begin': 'Begin:',
'scoresheet:End': 'End:',
'scoresheet:Duration': 'Duration:',
'scoresheet:Shuttles': 'Shuttles:',
'scoresheet:points': 'Score',
'scoresheet:button:print': 'Print',
'scoresheet:button:pdf': 'PDF',
'scoresheet:button:note': 'Add note',
'scoresheet:button:back': 'Back',
'scoresheet:note:placeholder': 'Enter note here ...',
'scoresheet:server': 'S',
'scoresheet:receiver': 'R',
'scoresheet:Empty Scoresheet': 'Scoresheet',
'scoresheet:[Event Scoresheet Filename]': 'Scoresheets {event_name}',

'eventsheet:draw': 'Draw',
'eventsheet:Generate': 'Generate {sheetname}',
'eventsheet:Umpires': 'Umpires:',
'eventsheet:Location': 'Location:',
'eventsheet:Matchday': 'Match day:',
'eventsheet:Start Time': 'Start time:',
'eventsheet:Backup Players': 'Backup players:',
'eventsheet:Notes': 'Notes:',
'eventsheet:Protest': 'Protest:',
'eventsheet:back': 'Back',
'eventsheet:Event Sheet': 'Event Report',
'eventsheet:download empty': 'Download empty form',
'eventsheet:Teamster home': 'Home teamster:',
'eventsheet:Teamster away': 'Away teamster:',

'eventsheet:label:1BL-2015': '(German Bundesliga) result report sheet (2015)',
'eventsheet:label:2BLN-2015': '(German 2. Bundesliga North) result report sheet (2015)',
'eventsheet:label:2BLS-2015': '(German 2. Bundesliga South) result report sheet (2015)',
'eventsheet:label:1BL-2016': '(German Bundesliga) result report sheet (2016)',
'eventsheet:label:2BLN-2016': '(German 2. Bundesliga North) result report sheet (2016)',
'eventsheet:label:2BLS-2016': '(German 2. Bundesliga South) result report sheet (2016)',
'eventsheet:label:RLW': '(German Regionalliga West) result report sheet',
'eventsheet:label:RLN': '(German Regionalliga North) result report sheet',
'eventsheet:label:team-1BL-2015': '(German Bundesliga) team selection sheet (2015)',
'eventsheet:label:team-2BL-2015': '(German 2. Bundesliga) team selection sheet (2015)',

'stats:game': 'Game {number}',
'stats:match': 'Match',
'stats:back': 'Back',
'stats:points': 'Points',
'stats:points_lr': 'Points left/right',
'stats:shuttles': 'Shuttles',
'stats:duration': 'Duration',
'stats:avg_rally_length': '⌀ Rally length',
'stats:longest_rally': 'Longest rally',
'stats:serves': '#Serves {player_name}',
'stats:longest rally (game)': ' ({score})',
'stats:longest rally (match)': ' (game {game} at {score})',

'netstats:No stats available': 'No network communication yet',
'stats:<25ms': 'latency <25ms',
'stats:<100ms': 'latency <100ms',
'stats:<250ms': 'latency <250ms',
'stats:<500ms': 'latency <500ms',
'stats:<2s': 'latency <2s',
'stats:<8s': 'latency <8s',
'stats:>8s': 'latency >8s',
'stats:latency_avg_str': '⌀ latency',
'stats:failed_net_count': 'request loss',
'stats:failed_srv_count': 'server errors',
'stats:success_net_count': '# successful',

'pressdesc:pick_side': 'choice of ends',
'pressdesc:state:pick_side': 'left: {left_team},\nright: {right_team}',
'pressdesc:state:pick_server': '{player}',
'pressdesc:state:pick_receiver': '{player}',
'pressdesc:state:injury': '{player} injured',
'pressdesc:undo': 'undo',
'pressdesc:redo': 'redo',
'pressdesc:pick_server': 'pick server',
'pressdesc:pick_receiver': 'pick receiver',
'pressdesc:timer_restart': 'reset stop watch',
'pressdesc:correction': 'service court correction',
'pressdesc:state:correction': 'correct: {left_player} left,\n{right_player} right',
'pressdesc:injury': 'injury',
'pressdesc:overrule': 'overrule line judge',
'pressdesc:suspension': 'match suspended',
'pressdesc:resume': 'resume match',
'pressdesc:injury-resume': 'resume match',
'pressdesc:score:left': 'score left',
'pressdesc:score:right': 'score right',
'pressdesc:love-all': 'Love all',
'pressdesc:shuttle': '+1 shuttles',
'pressdesc:state:shuttle': '{count} shuttles',
'pressdesc:editmode_change-ends': 'manual edit: change ends',
'pressdesc:state:editmode_change-ends': '{left_team} left,\n{right_team} right',
'pressdesc:editmode_change-serve': 'manual edit: serving team',
'pressdesc:state:editmode_change-serve': '{player} to serve',
'pressdesc:editmode_switch-sides': 'manual edit: position',
'pressdesc:state:editmode_switch-sides': '{left_player} left,\n{right_player} right',
'pressdesc:editmode_set-finished_games': 'manual edit: score',
'pressdesc:editmode_set-score': 'manual edit: score',
'pressdesc:yellow-card': 'yellow card',
'pressdesc:state:yellow-card': '{player} warned',
'pressdesc:red-card': 'red card',
'pressdesc:state:red-card': 'faulted {player}, {score_str}',
'pressdesc:referee': 'referee',
'pressdesc:note': 'note',
'pressdesc:postgame-confirm': 'game confirmation',
'pressdesc:postmatch-confirm': 'match confirmation',
'pressdesc:retired': '{player} retired',
'pressdesc:state:retired': '{winner} wins {score_str}',
'pressdesc:disqualified': 'black card {player}',
'pressdesc:state:disqualified': '{winner} wins {score_str}',

'order:header': 'Match order',
'order:back': 'Back',
'order:optimize': 'Optimize',
'order:reset': 'Reset',
'order:ignore match': 'ignore match',

'staticnet:switch back message': 'Imported event. Changes here will not be transmitted! ',
'staticnet:switch back button': 'Switch to live {service}',
'staticnet:error': 'Download error ({code})',
'staticnet:service_name': 'network demo',

'importexport:invalid JSON': 'Invalid JSON: {msg}',
'importexport:not an export file': 'This file is not a bup-export file!',

'weekday:0': 'Sun',
'weekday:1': 'Mon',
'weekday:2': 'Tue',
'weekday:3': 'Wed',
'weekday:4': 'Thu',
'weekday:5': 'Fri',
'weekday:6': 'Sat',

'displaymode:style': 'style:',
'displaymode:top+list': 'current/list',
'displaymode:oncourt': 'court score',
'displaymode:court_id': 'court:',
'displaymode:court_id:loading': 'loading ...',

'liveaw:lost connection': 'Reconnecting ...',
};

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	module.exports = i18n_en;
}
/*/@DEV*/
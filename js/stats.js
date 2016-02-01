var stats = (function() {
'use strict';

var _INTERESTING_TYPES = ['love-all', 'postgame-confirm', 'postmatch-confirm', 'suspension', 'resume'];
var HEIGHT = 125;
var TOP_PADDING = 15;
var BOTTOM_PADDING = 5;
var XAXIS_Y = HEIGHT - 1;
var GRAPH_HEIGHT = HEIGHT - TOP_PADDING - BOTTOM_PADDING;
var GRAPH_BOTTOM = HEIGHT - BOTTOM_PADDING;
var WIDTH = 300;
var LEFT_PADDING = 5;
var RIGHT_PADDING = 5;
var GRAPH_WIDTH = WIDTH - LEFT_PADDING - RIGHT_PADDING;

var CARD_PADDING = 1;
var CARD_HEIGHT = 5;
var CARD_WIDTH = CARD_HEIGHT * 22 / 29;
var CARD_RADIUS = CARD_HEIGHT / 11;
var TEXT_WIDTH = 4;
var TEXT_HEIGHT = 6;

function calc_max_score(gpoints) {
	var max_score = 1;
	for (var i = 0;i < gpoints.length;i++) {
		var gp = gpoints[i];
		max_score = Math.max(max_score, Math.max(gp.score[0], gp.score[1]));
	}
	return max_score;
}

function _find_best(start_y, relevant_marks, mark_height, direction) {
	var marks_sorted = relevant_marks.slice();
	marks_sorted.sort(function(m1, m2) {
		return direction * (m1.y - m2.y);
	});

	var res = start_y + direction * CARD_PADDING;
	for (var i = 0;i < marks_sorted.length;i++) {
		var rm = marks_sorted[i];
		if (direction > 0) {
			if (res + mark_height + CARD_PADDING <= rm.y - rm.height / 2) {
				break;
			}
		} else {
			if (res - mark_height - CARD_PADDING >= rm.y + rm.height / 2) {
				break;
			}
		}
		res = rm.y + direction * (rm.height / 2 + CARD_PADDING);
	}
	return res + direction * mark_height / 2;
}

function _calc_mark_y(marks, gpoints, gpoints_index, mark_width, mark_height) {
	var gp = gpoints[gpoints_index];

	var left_x = gp.x - mark_width / 2 - CARD_PADDING;
	var right_x = gp.x + mark_width / 2 + CARD_PADDING;
	var relevant_marks = marks.filter(function(m) {
		return m.maxx > left_x;
	});

	// Add marks for all points on the lines
	var i;
	var igp;
	var prevgp;
	var team;
	for (i = gpoints_index;i >= 1;i--) {
		igp = gpoints[i];
		prevgp = gpoints[i - 1];
		if (igp.draw_line) {
			for (team = 0;team < 2;team++) {
				relevant_marks.push({
					y: ((igp.ys[team] + prevgp.ys[team]) / 2),
					height: Math.abs(igp.ys[team] - prevgp.ys[team]),
				});
			}
		}
		if (igp.x < left_x) {
			break;
		}
	}
	for (i = gpoints_index + 1;i < gpoints.length;i++) {
		igp = gpoints[i];
		if (igp.x > right_x) {
			break;
		}
		prevgp = gpoints[i - 1];
		if (! igp.draw_line) {
			continue;
		}
		for (team = 0;team < 2;team++) {
			relevant_marks.push({
				y: ((igp.ys[team] + prevgp.ys[team]) / 2),
				height: Math.abs(igp.ys[team] - prevgp.ys[team]),
			});
		}
	}

	var mark_y = (
		(gp.press.team_id !== undefined) ?
		gp.ys[gp.press.team_id] :
		((gp.ys[0] + gp.ys[1]) / 2));

	var top_option = _find_best(mark_y, relevant_marks, mark_height, -1);
	var bottom_option = _find_best(mark_y, relevant_marks, mark_height, 1);

	if (bottom_option + mark_height / 2 > HEIGHT) {
		mark_y = top_option;
	} else if (top_option - mark_height / 2 < 0) {
		mark_y = bottom_option;
	} else if (Math.abs(mark_y - bottom_option) < Math.abs(mark_y - top_option)) {
		mark_y = bottom_option;
	} else {
		mark_y = top_option;
	}

	marks.push({
		maxx: gp.x + mark_width / 2,
		y: mark_y,
		height: mark_height,
	});
	return mark_y;
}


function draw_graph(s, container, gpoints, max_score) {
	// No let
	var line_y;
	var bottom_y;
	var mark_y;

	var connectors = utils.svg_el(container, 'g', {});

	var marks = [];
	var max_normalized = gpoints[gpoints.length - 1].normalized;
	for (var i = 0;i < gpoints.length;i++) {
		var igp = gpoints[i];
		igp.x = LEFT_PADDING + igp.normalized * GRAPH_WIDTH / max_normalized;
		igp.ys = [
			GRAPH_BOTTOM - igp.score[0] * GRAPH_HEIGHT / max_score,
			GRAPH_BOTTOM - igp.score[1] * GRAPH_HEIGHT / max_score,
		];
	}

	var x = [LEFT_PADDING, LEFT_PADDING];
	var y = [GRAPH_BOTTOM, GRAPH_BOTTOM];
	var gpoints_index;
	for (gpoints_index = 1;gpoints_index < gpoints.length;gpoints_index++) {
		var gp = gpoints[gpoints_index];
		var gpx = gp.x;
		var gpys = gp.ys;
		var press = gp.press;

		switch (press.type) {
		case 'suspension':
		case 'overrule':
		case 'referee':
		case 'correction':
		case 'injury':
		case 'retired':
			var css_class = 'stats_graph_mark' + ((press.team_id !== undefined) ? ' team' + press.team_id : '');
			var str = calc.press_char(s, press);
			var do_rotate = (str.length > 3);
			var width = do_rotate ? TEXT_HEIGHT : (TEXT_WIDTH * str.length);
			var height = do_rotate ? (TEXT_WIDTH * str.length) : TEXT_HEIGHT;
			mark_y = _calc_mark_y(marks, gpoints, gpoints_index, width, height);
			var attrib = {
				x: gpx,
				y: mark_y,
				'class': css_class,
			};
			if (do_rotate) {
				attrib.transform = 'rotate(-90 ' + attrib.x + ' ' + attrib.y + ')';
			}

			utils.svg_el(container, 'text', attrib, str);

			if (press.team_id !== undefined) {
				line_y = gpys[press.team_id];
				bottom_y = mark_y + ((mark_y > line_y) ? -1 : 1) * height / 2;

				utils.svg_el(connectors, 'line', {
					x1: gpx,
					x2: gpx,
					y1: gpys[press.team_id],
					y2: bottom_y,
					'class': ('stats_graph_connector team' + press.team_id),
				});
			}
			break;
		case 'yellow-card':
		case 'red-card':
		case 'disqualified':
			mark_y = _calc_mark_y(marks, gpoints, gpoints_index, CARD_WIDTH, CARD_HEIGHT);
			utils.svg_el(container, 'rect', {
				x: (gpx - CARD_WIDTH / 2),
				y: (mark_y - CARD_HEIGHT / 2),
				rx: CARD_RADIUS,
				ry: CARD_RADIUS,
				width: CARD_WIDTH,
				height: CARD_HEIGHT,
				'class': 'stats_graph_' + press.type,
			});

			line_y = gpys[press.team_id];
			bottom_y = mark_y + ((mark_y > line_y) ? -1 : 1) * height / 2;

			utils.svg_el(connectors, 'line', {
				x1: gpx,
				x2: gpx,
				y1: gpys[press.team_id],
				y2: bottom_y,
				'class': ('stats_graph_connector team' + press.team_id),
			});
			break;
		}

		for (var team = 0;team < 2;team++) {
			var gpy = gpys[team];

			if (gp.draw_line) {
				if (x[team] !== gpx) {
					utils.svg_el(container, 'line', {
						x1: x[team],
						x2: gpx,
						y1: y[team],
						y2: y[team],
						'class': 'team' + team,
					});
				}
				if (y[team] !== gpy) {
					utils.svg_el(container, 'line', {
						x1: gpx,
						x2: gpx,
						y1: y[team],
						y2: gpy,
						'class': 'team' + team,
					});
				}
			}

			x[team] = gpx;
			y[team] = gpy;
		}
	}
}

function normalize_gpoints(all_gpoints) {
	var prev_gp = all_gpoints[0];
	prev_gp.normalized = 0;
	var gpoints = [prev_gp];
	for (var i = 1;i < all_gpoints.length;i++) {
		var gp = all_gpoints[i];
		if (
				utils.deep_equal(gp.score, prev_gp.score) &&
				(prev_gp.game === gp.game) &&
				!gp.interesting &&
				(!gp.press || (calc.SPECIAL_PRESSES.indexOf(gp.press.type) < 0))) {
			continue;
		}
		gpoints.push(gp);

		var duration = gp.timestamp - prev_gp.timestamp;
		if (gp.game !== prev_gp.game) {
			gp.draw_line = false;
			duration = Math.min(duration, 200000);
		} else {
			gp.draw_line = (i > 0);
			duration = Math.min(duration, 300000);
		}
		duration = Math.max(3000, duration);
		
		gp.normalized = prev_gp.normalized + duration;
		prev_gp = gp;
	}
	return gpoints;
}

function render_graph(svg, s, all_gpoints) {
	// Legend
	var max_width = 0;
	for (var team = 0;team < 2;team++) {
		var player_names = s.setup.teams[team].players[0].name;
		if (s.setup.is_doubles) {
			player_names += ' / ' + s.setup.teams[team].players[1].name;
		}

		var text = svg.querySelector('.legend_team' + team);
		utils.text(text, player_names);
		var bb = text.getBBox();
		max_width = Math.max(bb.width, max_width);
	}
	svg.querySelector('.legend_background').setAttribute('width', max_width + 2);

	var lines = svg.querySelector('.stats_graph_lines');
	utils.empty(lines);

	if (all_gpoints.length === 0) {
		return;
	}

	var gpoints = normalize_gpoints(all_gpoints);
	var max_score = calc_max_score(gpoints);

	// Gray grid
	var grid = svg.querySelector('.stats_graph_grid');
	utils.empty(grid);
	for (var i = 0;i <= max_score;i++) {
		var grid_y = GRAPH_BOTTOM - i * GRAPH_HEIGHT / max_score;
		utils.svg_el(grid, 'line', {
			x1: LEFT_PADDING,
			x2: (WIDTH - RIGHT_PADDING),
			y1: grid_y,
			y2: grid_y,
			'class': ((i === 0) || (i === 11) || (i == 21)) ? 'important' : '',
		});
	}

	// Y axis labels
	for (i = 0;i <= max_score;i++) {
		utils.svg_el(grid, 'text', {
			x: LEFT_PADDING,
			y: GRAPH_BOTTOM - i * GRAPH_HEIGHT / max_score,
			'text-anchor': 'end',
			'alignment-baseline': 'middle',
			'class': 'axis_score_label',
		}, i);
		utils.svg_el(grid, 'text', {
			x: WIDTH,
			y: GRAPH_BOTTOM - i * GRAPH_HEIGHT / max_score,
			'text-anchor': 'end',
			'alignment-baseline': 'middle',
			'class': 'axis_score_label',
		}, i);
	}

	// Times on the x axis
	var last_x = -999;
	var max_normalized = gpoints[gpoints.length - 1].normalized;
	gpoints.forEach(function(gp) {
		if (!gp.interesting) {
			return;
		}

		var gpx = LEFT_PADDING + gp.normalized * GRAPH_WIDTH / max_normalized;
		if (last_x + 10 > gpx) {
			// Overlap, leave out time
			return;
		}
		last_x = gpx;
		utils.svg_el(grid, 'text', {
			x: gpx,
			y: XAXIS_Y,
			'text-anchor': 'middle',
			'alignment-baseline': 'baseline',
			'class': 'xaxis_label',
		},
		utils.time_str(gp.timestamp));
	});

	// Main diagram
	draw_graph(s, lines, gpoints, max_score);
}

function calc_stats(s) {
	var all_games = s.match.finished_games.slice();
	all_games.push(s.game);

	var cols = all_games.map(function(game, i) {
		return {
			label: s._('stats:game').replace('{number}', (i+1)),
			points: game.score.join('-'),
			shuttles: 0,
			points_lr_ar: [0, 0],
			rally_lengths: [],
			serves: s.setup.is_doubles ? [[0, 0], [0, 0]] : [[0], [0]],
		};
	});

	var points_sum = [0, 0];
	all_games.forEach(function(game) {
		points_sum[0] += game.score[0];
		points_sum[1] += game.score[1];
	});
	var mstats = {
		label: s._('stats:match'),
		points: points_sum.join('-'),
		shuttles: s.match.shuttle_count,
		points_lr_ar: [0, 0],
		rally_lengths: [],
		serves: s.setup.is_doubles ? [[0, 0], [0, 0]] : [[0], [0]],
	};
	cols.push(mstats);

	var gpoints = [];
	var scopy = {
		initialized: s.initialized,
		settings: s.settings,
		lang: s.lang,
		_: s._,
	};
	calc.init_state(scopy, s.setup, s.presses);
	calc.undo(scopy);
	var presses = scopy.flattened_presses;
	calc.init_state(scopy, s.setup);
	calc.init_calc(scopy);

	for (var i = 0;i < presses.length;i++) {
		if (presses[i].timestamp) {
			gpoints.push({
				score: [0, 0],
				timestamp: presses[i].timestamp,
				game: 0,
				interesting: true,
			});
			break;
		}
	}
	presses.forEach(function(p, i) {
		var current_game_idx = scopy.match.finished_games.length;
		var current_game = cols[current_game_idx];

		switch (p.type) {
		case 'shuttle':
			current_game.shuttles++;
			break;
		case 'love-all':
			current_game.start_ts = p.timestamp;
			if (! mstats.start_ts) {
				mstats.start_ts = p.timestamp;
			}
			current_game.rally_start = p.timestamp;
			break;
		case 'injury-resume':
			current_game.rally_start = p.timestamp;
			break;
		case 'score':
			var server_team_id = scopy.game.team1_serving ? 0 : 1;

			current_game.points_lr_ar[p.side == 'left' ? 0 : 1]++;
			mstats.points_lr_ar[p.side == 'left' ? 0 : 1]++;
			if (!scopy.game.interval && current_game.rally_start) {
				var rally_length = p.timestamp - current_game.rally_start;
				current_game.rally_lengths.push(rally_length);
				mstats.rally_lengths.push(rally_length);

				var score = scopy.game.score;
				var score_str = score[server_team_id] + '-' + score[1 - server_team_id];
				if ((!current_game.longest_rally_length) || (rally_length > current_game.longest_rally_length)) {
					current_game.longest_rally_length = rally_length;
					current_game.longest_rally_desc = (
						utils.duration_secs(0, rally_length) +
						s._('stats:longest rally (game)').replace('{score}', score_str)
					);
				}
				if ((!mstats.longest_rally_length) || (rally_length > mstats.longest_rally_length)) {
					mstats.longest_rally_length = rally_length;
					mstats.longest_rally_desc = (
						utils.duration_secs(0, rally_length) +
						s._('stats:longest rally (match)').replace('{score}', score_str).replace('{game}', (current_game_idx + 1))
					);
				}
			}

			var server_player_id = 0;
			if (scopy.setup.is_doubles) {
				// Find out which of the players served
				var game = scopy.game;
				server_player_id = (game.teams_player1_even[server_team_id] == (game.score[server_team_id] % 2 === 0)) ? 0 : 1;
			}
			current_game.serves[server_team_id][server_player_id]++;
			mstats.serves[server_team_id][server_player_id]++;
			break;
		}
		current_game.last_ts = p.timestamp;
		mstats.last_ts = p.timestamp;

		calc.calc_press(scopy, p);

		if (p.timestamp) {
			var interesting = ((i === presses.length - 1) || (_INTERESTING_TYPES.indexOf(p.type) >= 0));

			gpoints.push({
				timestamp: p.timestamp,
				score: scopy.game.score.slice(),
				game: scopy.match.finished_games.length,
				interesting: interesting,
				press: p,
			});
		}

		switch (p.type) {
		case 'love-all':
		case 'score':
			current_game.rally_start = p.timestamp;
			break;
		}
	});

	cols.forEach(function(col) {
		if (col.last_ts && col.start_ts) {
			col.duration = utils.duration_secs(col.start_ts, col.last_ts);
		}
		col.points_lr = col.points_lr_ar.join('/');
		if (col.rally_lengths.length > 0) {
			col.avg_rally_length = utils.duration_secs(
				0, utils.sum(col.rally_lengths) / col.rally_lengths.length
			);
			col.longest_rally = utils.duration_secs(
				0, col.longest_rally_length
			);
		}

		col.serves.forEach(function(players, team_id) {
			players.forEach(function(player_serves, player_id) {
				col['serves_' + team_id + '_' + player_id] = player_serves;
			});
		});
	});

	var server_keys = (
		s.setup.is_doubles ?
		['serves_0_0', 'serves_0_1', 'serves_1_0', 'serves_1_1'] :
		['serves_0_0', 'serves_1_0']
	);
	var teams = s.setup.teams;
	var serve_labels = {
		serves_0_0: teams[0].players[0].name,
		serves_1_0: teams[1].players[0].name,
	};
	if (s.setup.is_doubles) {
		serve_labels.serves_0_1 = teams[0].players[1].name;
		serve_labels.serves_1_1 = teams[1].players[1].name;
	}
	var labels = {};
	for (var k in serve_labels) {
		labels[k] = s._('stats:serves').replace('{player_name}', serve_labels[k]);
	}

	var keys = [].concat(
		['points', 'points_lr'],
		server_keys,
		((!s.settings || s.settings.shuttle_counter) ? ['shuttles'] : []),
		['duration', 'avg_rally_length', 'longest_rally']
	);

	return {
		cols: cols,
		keys: keys,
		labels: labels,
		gpoints: gpoints,
	};
}

function render_table($table, stats) {
	var thead_tr = $table.find('thead>tr');
	thead_tr.children('th:not(:first-child)').remove();
	stats.cols.forEach(function(st) {
		var th = $('<th>');
		th.text(st.label);
		thead_tr.append(th);
	});

	var tbody = $table.find('tbody');
	tbody.empty();

	stats.keys.forEach(function(k) {
		var tr = $('<tr>');
		var th = $('<th>');
		tr.append(th);
		var label = stats.labels[k];
		if (!label) {
			label = state._('stats:' + k);
		}
		th.text(label);

		stats.cols.forEach(function(st) {
			var td = $('<td>');
			if (k === 'longest_rally') {
				td.attr('title', st.longest_rally_desc);
			}
			tr.append(td);
			td.text(st[k]);
		});

		tbody.append(tr);
	});
}

function show() {
	if (state.ui.stats_visible) {
		return;
	}
	uiu.esc_stack_push(hide);

	state.ui.stats_visible = true;
	control.set_current(state);	
	$('.stats_layout').show();

	var match_name = '';
	if (state.setup.match_name) {
		match_name += '(' + state.setup.match_name + ') ';
	}
	if (state.setup.is_doubles) {
		match_name += state.setup.teams[0].players[0].name + ' / ' + state.setup.teams[0].players[1].name + ' - ' + state.setup.teams[1].players[0].name + ' / ' + state.setup.teams[1].players[1].name;
	} else {
		match_name += state.setup.teams[0].players[0].name + ' - ' + state.setup.teams[1].players[0].name;
	}
	$('.stats_match_name').text(match_name);

	var stats = calc_stats(state);
	var table = $('.stats_table');
	render_table(table, stats);
	render_graph(document.querySelector('.stats_graph'), state, stats.gpoints);
}

function hide() {
	if (! state.ui.stats_visible) {
		return;
	}

	uiu.esc_stack_pop();
	$('.stats_layout').hide();
	state.ui.stats_visible = false;
	control.set_current(state);	
}


function ui_init() {
	$('.postmatch_stats_button').on('click', show);
	$('.stats_layout').on('click', function(e) {
		if (e.target === this) {
			hide();
		}
	});
	$('.stats_back').on('click', function(e) {
		e.preventDefault();
		hide();
		return false;
	});
}

return {
	hide: hide,
	show: show,
	ui_init: ui_init,
	render_table: render_table,
	// testing only
	calc_stats: calc_stats,
	calc_max_score: calc_max_score,
	draw_graph: draw_graph,
	normalize_gpoints: normalize_gpoints,
	HEIGHT: HEIGHT,
	LEFT_PADDING: LEFT_PADDING,
	RIGHT_PADDING: RIGHT_PADDING,
	WIDTH: WIDTH,
	CARD_PADDING: CARD_PADDING,
	TEXT_WIDTH: TEXT_WIDTH,
	TEXT_HEIGHT: TEXT_HEIGHT,
	CARD_HEIGHT: CARD_HEIGHT,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var calc = require('./calc');
	var utils = require('./utils');
	var control = require('./control');
	var uiu = require('./uiu');

	module.exports = stats;
}
/*/@DEV*/
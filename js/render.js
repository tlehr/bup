'use strict';

var render = (function() {

function _score_display_init(s) {
	$('#score_table').empty();

	var ann_tr = $('<tr class="score_announcements">');
	var ann_td = $('<td colspan="2"></td>');
	ann_tr.append(ann_td);
	$('#score_table').attr('data-game-count', s.match.max_games);
	$('#score_table').append(ann_tr);

	for (var game_index = 0;game_index < s.match.max_games;game_index++) {
		var tr = $('<tr>');
		tr.attr('id', 'score_game_' + game_index);
		$('#score_table').append(tr);

		var left = $('<td class="score score_left">');
		var left_input = $('<input type="number" size="2" min="0" max="30" class="editmode_score default-invisible" value="0">');
		left_input.attr({
			'data-game-index': game_index,
			'data-team-side': 'left',
		});
		left_input.on('input', editmode_change_score);
		left.append(left_input);
		var left_text = $('<span>');
		left.append(left_text);
		tr.append(left);

		var right = $('<td class="score score_right">');
		var right_input = $('<input type="number" size="2" min="0" max="30" class="editmode_score default-invisible" value="0">');
		right_input.attr({
			'data-game-index': game_index,
			'data-team-side': 'right',
		});
		right_input.on('input', editmode_change_score);
		right.append(right_input);
		var right_text = $('<span>');
		right.append(right_text);
		tr.append(right);
	}
}

function _score_display_set_game(s, game, game_index, is_current) {
	function _val(field, v) {
		if (field.val() != v) {
			field.val(v);
		}
	}

	var editmode_active = $('#game').hasClass('editmode');
	var tr = $('#score_game_' + game_index);

	if (!game) {
		utils.set_class(tr, 'score_future-game');
	} else if (is_current) {
		utils.set_class(tr, 'score_current-game');
	} else {
		utils.set_class(tr, 'score_finished-game');
	}

	var left = tr.children('.score_left');
	var left_input = left.children('input');
	left.attr('class', 'score score_left');
	if (game) {
		if (! game.started && !game.finished) {
			left.addClass('score_empty');
		}
		if (game.finished) {
			if (game.team1_won == s.game.team1_left) {
				left.addClass('score_won');
			}
		} else if ((game.team1_serving !== null) && (game.team1_serving == s.game.team1_left)) { 
			left.addClass('score_serving');
		}

		var left_text = left.children('span');
		var points = game.score[s.game.team1_left ? 0 : 1];
		_val(left_input, points);
		left_text.text(points);
		if (editmode_active) {
			utils.visible(left_input, true);
		}
	}

	var right = tr.children('.score_right');
	var right_input = right.children('input');
	right.attr('class', 'score score_right');
	if (game) {
		if (! game.started && !game.finished) {
			right.addClass('score_empty');
		}
		if (game.finished) {
			if (game.team1_won != s.game.team1_left) {
				right.addClass('score_won');
			}
		} else if ((game.team1_serving !== null) && (game.team1_serving != s.game.team1_left)) {
			right.addClass('score_serving');
		}

		var right_text = right.children('span');
		var points = game.score[s.game.team1_left ? 1 : 0];
		_val(right_input, points);
		right_text.text(points);
		if (editmode_active) {
			utils.visible(right_input, true);
		}
	}

	if (is_current) {
		var ann_tr = $('tr.score_announcements');
		ann_tr.insertBefore(tr);
		var ann_td = ann_tr.children('td');
		ann_td.empty();
		var _add_ann = function (text) {
			var ann_span = $('<span class="score_announcement">')
			ann_span.text(text);
			ann_td.append(ann_span);
		}
		if (s.game.service_over) {
			_add_ann('Aufschlagwechsel');
		}
		if (s.game.gamepoint) {
			_add_ann('Satzpunkt');
		}
		if (s.game.matchpoint) {
			_add_ann('Spielpunkt');
		}
		if (s.game.interval) {
			_add_ann('Pause');
		}
		if (s.game.change_sides) {
			_add_ann('Seiten wechseln');
		}
		if (s.game.game) {
			_add_ann('Satz');
		}
		if (s.match.marks.length > 0) {
			s.match.marks.forEach(function(e_press) {
				_add_ann(e_press.char);
			});
		}
		// Rendering fix for empty cells not being rendered correctly
		if (ann_td.children().length == 0) {
			ann_td.text('\xA0');
		}
	}
}

function render_score_display(s) {
	if (parseInt($('#score_table').attr('data-game-count'), 10) != s.match.max_games) {
		_score_display_init(s);
	}
	for (var i = 0;i < s.match.max_games;i++) {
		if (i < s.match.finished_games.length) {
			_score_display_set_game(s, s.match.finished_games[i], i, false);
		} else if (i == s.match.finished_games.length) {
			_score_display_set_game(s, s.game, i, true);
		} else {
			_score_display_set_game(s, null, i, false);
		}
	}
}

function ui_court_str() {
	var court_str = '';
	if (settings.court_id) {
		court_str = 'Feld ' + settings.court_id;
	}
	if (settings.court_description) {
		if (court_str) {
			court_str += '(' + settings.court_description + ')';
		} else {
			court_str += 'Feld ' + settings.court_description;
		}
	}
	$('#court_court_str>span').text(court_str);
}

function ui_render(s) {
	var dialog_active = false;  // Is there anything to pick in the bottom?

	function _court_show_player(key) {
		var p = s.court['player_' + key];
		$('#court_' + key + '>span').text(p === null ? '' : p.name);
	}
	_court_show_player('left_odd');
	_court_show_player('left_even');
	_court_show_player('right_even');
	_court_show_player('right_odd');


	if (s.setup.team_competition && (s.game.team1_left !== null)) {
		$('#court_left_team, #court_right_team').show();
		var left_index = s.game.team1_left ? 0 : 1;
		$('#court_left_team>span').text(s.setup.teams[left_index].name);
		$('#court_right_team>span').text(s.setup.teams[1 - left_index].name);
	} else {
		$('#court_left_team, #court_right_team').hide();
	}

	$('#court_match_name>span').text(s.setup.match_name ? s.setup.match_name : '');
	ui_court_str();

	$('#shuttle_counter_value').text(s.match.shuttle_count);

	if (s.court.left_serving === null) {
		$('#court_arrow').hide();
	} else {
		$('#court_arrow').show();
		var transform_css = ('scale(' +
			(s.court.left_serving ? '-1' : '1') + ',' +
			(s.court.serving_downwards ? '1' : '-1') + ')'
		);
		$('#court_arrow,.editmode_arrow').css({
			'transform': transform_css,
			'-ms-transform': transform_css,
			'-webkit-transform': transform_css,
		});
	}

	if (s.match.announce_pregame) {
		dialog_active = true;
		$('#love-all-dialog').show();
		$('#love-all').text(settings.show_pronounciation ? pronounciation.pronounce(s) : pronounciation.loveall_announcement(s));
	} else {
		$('#love-all-dialog').hide();
	}

	if (s.match.finished) {
		dialog_active = true;
		$('#postmatch-confirm-dialog').show();
		$('#postmatch-confirm').text(settings.show_pronounciation ? pronounciation.pronounce(s) : pronounciation.postgame_announcement(s));
		$('.postmatch_options').show();
	} else {
		$('#postmatch-confirm-dialog').hide();
		$('.postmatch_options').hide();
	}
	if (!s.match.finished && s.game.finished) {
		dialog_active = true;
		$('#postgame-confirm-dialog').show();
		$('#postgame-confirm').text(settings.show_pronounciation ? pronounciation.pronounce(s) : pronounciation.postgame_announcement(s));
	} else {
		$('#postgame-confirm-dialog').hide();
	}

	var score_enabled = s.game.started && !s.game.finished;
	var buttons = $('#left_score,#right_score');
	if (score_enabled) {
		buttons.removeAttr('disabled');
		buttons.removeClass('half-invisible');
	} else {
		buttons.attr('disabled', 'disabled');
		buttons.addClass('half-invisible');
	}

	var undo = $('#button_undo');
	if (s.undo_possible) {
		undo.removeAttr('disabled');
		undo.removeClass('half-invisible');
	} else {
		undo.attr('disabled', 'disabled');
		undo.addClass('half-invisible');
	}

	var redo = $('#button_redo');
	if (s.redo_possible) {
		redo.removeAttr('disabled');
		redo.removeClass('nearly-invisible');
	} else {
		redo.attr('disabled', 'disabled');
		redo.addClass('nearly-invisible');
	}

	if (s.timer) {
		ui_set_timer(s.timer);
	} else {
		ui_remove_timer();
	}

	render_score_display(s);

	$('#pick_side').hide();
	$('#pick_server').hide();
	$('#pick_receiver').hide();
	if (!s.match.finished) {
		if (s.game.start_team1_left === null) {
			dialog_active = true;
			ui_show_picker($('#pick_side'));

			$('#pick_side_team1').text(calc_teamtext_internal(s, 0));
			$('#pick_side_team2').text(calc_teamtext_internal(s, 1));
		} else if (s.game.start_server_player_id === null) {
			$('#pick_server button').remove();

			var team_indices = (s.game.start_server_team_id === null) ? [0, 1] : [s.game.start_server_team_id];
			team_indices.forEach(function(ti) {
				var namefunc = null;
				if (s.setup.team_competition && (team_indices.length > 1)) {
					if (s.setup.is_doubles) {
						namefunc = function(player) {
							return player.name + ' [' + s.setup.teams[ti].name + ']'
						};
					} else {
						namefunc = function(player) {
							return s.setup.teams[ti].name + ' (' + player.name + ')'
						};
					}
				}

				_ui_add_player_pick(s, $('#pick_server'), 'pick_server', ti, 0, null, namefunc);
				if (s.setup.is_doubles) {
					_ui_add_player_pick(s, $('#pick_server'), 'pick_server', ti, 1, null, namefunc);
				}
			});

			dialog_active = true;
			ui_show_picker($('#pick_server'));
		} else if (s.game.start_receiver_player_id === null) {
			$('#pick_receiver button').remove();
			dialog_active = true;
			var team_id = (s.game.start_server_team_id == 1) ? 0 : 1;
			_ui_add_player_pick(s, $('#pick_receiver'), 'pick_receiver', team_id, 0);
			_ui_add_player_pick(s, $('#pick_receiver'), 'pick_receiver', team_id, 1);
			ui_show_picker($('#pick_receiver'));
		}
	}

	if (settings.show_pronounciation && !dialog_active) {
		var pronounciation_text = pronounciation.pronounce(s);
		if (pronounciation_text) {
			$('#pronounciation>span').text(pronounciation_text);
			$('#pronounciation').show();
		} else {
			$('#pronounciation').hide();
		}
	} else {
		$('#pronounciation').hide();
	}
}

return {
	ui_render: ui_render,
	ui_court_str: ui_court_str,
}

})();

if (typeof module !== 'undefined') {
	module.exports = render;
}

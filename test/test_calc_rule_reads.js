'use strict';
/* global describe, it */

const assert = require('assert');
const { bup, state_after, press_score, SINGLES_SETUP } = require('./tutils');
const calc = bup.calc;
const copy = value => JSON.parse(JSON.stringify(value));
const freeze = value => {
	if (value && typeof value === 'object') {
		Object.values(value).forEach(freeze);
		Object.freeze(value);
	}
	return value;
};
const initial = () => [
	{ type: 'pick_side', team1_left: true, timestamp: 1000 },
	{ type: 'pick_server', team_id: 0, player_id: 0, timestamp: 2000 },
	{ type: 'love-all', timestamp: 3000 },
];
const result = state => copy({ score: calc.netscore(state), game: state.game, match: state.match, timer: state.timer, metadata: { start: state.metadata.start, end: state.metadata.end, updated: state.metadata.updated } });

describe('Reading scoring rules during point calculation', function() {
	it('recalculates a long history without copying complete rules for each rally', function() {
		const setup = copy(SINGLES_SETUP), presses = initial();
		press_score(presses, 21, 19);
		presses.push({ type: 'postgame-confirm', timestamp: 100000 }, { type: 'love-all', timestamp: 101000 });
		press_score(presses, 21, 19);
		presses.push({ type: 'postgame-confirm', timestamp: 200000 }, { type: 'love-all', timestamp: 201000 });
		press_score(presses, 10, 9);
		const original = copy(setup), deepCopy = bup.utils.deep_copy;
		let ruleCopies = 0;
		bup.utils.deep_copy = function(value) {
			if (value && value.numSets && value.set_points && value.last_set_points) ruleCopies++;
			return deepCopy(value);
		};
		let state;
		try { state = state_after(presses, freeze(setup)); }
		finally { bup.utils.deep_copy = deepCopy; }
		assert.deepStrictEqual(calc.netscore(state), [[21, 19], [19, 21], [10, 9]]);
		assert.deepStrictEqual(setup, original);
		assert(ruleCopies <= 1, 'Rule copies must not grow with history length: ' + ruleCopies);
	});

	it('keeps full rules equivalent to legacy counting, including interval timers and undo', function() {
		for (const counting of ['3x21', '1x21', '2x21+11', '3x15_18', '5x11_11', '5x11_15']) {
			const setup = Object.assign(copy(SINGLES_SETUP), { counting, scoring_format: calc.scoring_format_from_counting(counting) });
			const legacy = copy(setup);delete legacy.scoring_format;
			const presses = initial();press_score(presses, 11, 7);
			for (const history of [presses, [...presses, { type: 'undo', timestamp: 22000 }]]) {
				assert.deepStrictEqual(result(state_after(history, freeze(setup))), result(state_after(history, legacy)), counting);
			}
		}
	});

	it('preserves all score boundaries of complete and legacy formats', function() {
		for (const counting of ['3x21', '1x21', '2x21+11', '5x11_15', '5x11_15^90', '5x11_15~NLA', '1x11_15', '5x11/3', '3x15_18', '5x11_11']) {
			const setup = freeze({ counting, scoring_format: calc.scoring_format_from_counting(counting) });
			for (const game of [0, calc.max_game_count(setup) - 1]) {
				for (let home = 0; home <= 31; home++) for (let away = 0; away <= 31; away++) {
					assert.strictEqual(calc.game_winner(setup, game, home, away), calc.game_winner(counting, game, home, away), counting + ': ' + game + ' / ' + home + ':' + away);
				}
			}
		}
	});

	it('reads edits to the same rules object on the very next calculation', function() {
		const setup = copy(SINGLES_SETUP), before = copy(setup);
		assert.strictEqual(calc.max_game_count(setup), 3);
		assert.strictEqual(calc.game_winner(setup, 0, 11, 6), 'inprogress');
		Object.assign(setup.scoring_format, calc.scoring_format_from_counting('5x11_11'));
		assert.strictEqual(calc.max_game_count(setup), 5);
		assert.strictEqual(calc.game_winner(setup, 0, 11, 6), 'left');
		assert.strictEqual(calc.max_game_count(before), 3);
	});

	it('retains fallback for partial formats without filling or changing their source', function() {
		for (const scoring_format of [{ numSets: 5 }, { set_points: { end_points: 7, max_points: 9 } }]) {
			const setup = freeze({ counting: '3x21', scoring_format }), original = copy(setup);
			assert.strictEqual(calc.max_game_count(setup), scoring_format.numSets || 3);
			assert.strictEqual(calc.game_winner(setup, 0, scoring_format.set_points ? 7 : 21, 3), 'left');
			assert.deepStrictEqual(setup, original);
		}
		assert.throws(() => calc.max_game_count({ counting: 'unknown', scoring_format: {} }), /Invalid counting scheme/);
	});

	it('keeps publicly created formats independent and editable', function() {
		const first = calc.scoring_format_from_counting('3x21'), second = calc.scoring_format_from_counting('3x21');
		first.set_points.end_points = 7;
		assert.strictEqual(second.set_points.end_points, 21);
		assert.strictEqual(calc.scoring_format_from_counting('3x21').set_points.end_points, 21);
	});
});

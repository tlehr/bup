/* global describe, it */
'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

function fixture() {
 var records = new Map();
 var context = { localStorage: {
  setItem: function(key, value) { records.set(key, value); },
  getItem: function(key) { return records.get(key); },
 } };
 vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/match_storage.js'), 'utf8'), context);
 return { records: records, storage: context.match_storage };
}

describe('Local histories with remarks after match completion', function() {
 it('removes the completion marker for local corrections while retaining all later remarks', function() {
  var f = fixture();
  var point = {type: 'score', side: 'left', timestamp: 1};
  var notes = [{type: 'note', val: 'BUP remark'}, {type: 'note', val: 'Later tournament remark', source: 'tournament-control'}];
  var presses = [point, {type: 'postmatch-confirm', timestamp: 2}].concat(notes);
  var before = JSON.stringify(presses);
  f.storage.store({metadata: {id: 'one'}, setup: {}, presses: presses});
  assert.deepStrictEqual(JSON.parse(f.records.get('bup_match_one')).presses, [point].concat(notes));
  assert.strictEqual(JSON.stringify(presses), before);
  assert.strictEqual(f.storage.load_match('one').presses.length, 3);
 });
 it('retains all events for an unfinished match with remarks', function() {
  var f = fixture();
  var presses = [{type: 'score', side: 'left'}, {type: 'note', val: 'BUP remark'}];
  f.storage.store({metadata: {id: 'one'}, setup: {}, presses: presses});
  assert.deepStrictEqual(JSON.parse(f.records.get('bup_match_one')).presses, presses);
 });
 it('leaves undo and redo histories unchanged', function() {
  var f = fixture();
  var presses = [{type: 'postmatch-confirm'}, {type: 'note', val: 'Later remark'}, {type: 'undo'}];
  f.storage.store({metadata: {id: 'one'}, setup: {}, presses: presses});
  assert.deepStrictEqual(JSON.parse(f.records.get('bup_match_one')).presses, presses);
 });
 it('stores an empty history without dereferencing a missing final event', function() {
  var f = fixture();
  f.storage.store({metadata: {id: 'one'}, setup: {}, presses: []});
  assert.deepStrictEqual(JSON.parse(f.records.get('bup_match_one')).presses, []);
 });
 it('retains the confirmed result and end time when a note follows match completion', function() {
  var tutils = require('./tutils');
  var started = tutils.state_at([[21, 14], [21, 15]], tutils.SINGLES_SETUP);
  var presses = started.presses.map(function(press, index) { return Object.assign({}, press, {timestamp: 100 + index}); }).concat([{type: 'postmatch-confirm', timestamp: 1001}]);
  var before = tutils.state_after(presses, tutils.SINGLES_SETUP);
  var after = tutils.state_after(presses.concat([{type: 'note', val: 'Later remark', timestamp: 5000}]), tutils.SINGLES_SETUP);
  assert.strictEqual(before.match.finish_confirmed, true);
  assert.strictEqual(after.match.finish_confirmed, true);
  assert.deepStrictEqual(after.match.game_score, before.match.game_score);
  assert.deepStrictEqual(after.match.finished_games.map(function(game) { return game.score; }), before.match.finished_games.map(function(game) { return game.score; }));
  assert(before.metadata.end > 0);
  assert.strictEqual(after.metadata.end, before.metadata.end);
 });

});

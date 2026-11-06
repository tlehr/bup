'use strict';

const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const calc = require('../js/calc');

function finishedChecker() {
 const errors = [], source = fs.readFileSync(require.resolve('../js/network'), 'utf8').split('/*@DEV*/')[0];
 // Expose the private pure predicate only in the VM, without changing the
 // application's public API or replacing any of its calculation logic.
 const context = {calc, report_problem:{silent_error:message => errors.push(message)}};
 vm.runInNewContext(source.replace('return {\n\tcalc_team0_left:', 'return {\n test_finished: _match_finished,\n\tcalc_team0_left:'), context);
 return {finished:context.network.test_finished, errors};
}

describe('Network match completion labels', function() {
 it('does not recalculate incomplete legacy court summaries on every refresh', function() {
  const check = finishedChecker(), match = {setup:{match_id:'legacy-picker'}, network_score:[[21, 15], [21, 17]]};
  for (let i = 0; i < 100; i++) assert.strictEqual(check.finished(match), false);
  assert.deepStrictEqual(check.errors, []);
 });
 it('recognizes explicit finish information even without a scoring format', function() {
  const check = finishedChecker();
  for (const match of [{end_ts:123}, {end_timestamp:123}, {team1_won:false}, {setup:{state:'finished'}}]) {
   assert.strictEqual(check.finished(match), true);
  }
  assert.deepStrictEqual(check.errors, []);
 });
 it('handles missing matches and empty scores without calculation errors', function() {
  const check = finishedChecker();
  for (const match of [null, {}, {setup:{}, network_score:[]}, {network_score:[[1, 0]]}]) assert.strictEqual(check.finished(match), false);
  assert.deepStrictEqual(check.errors, []);
 });
 it('still distinguishes completed and unfinished standard matches', function() {
  const check = finishedChecker(), setup = {counting:'3x21'};
  assert.strictEqual(check.finished({setup, network_score:[[21, 15], [21, 17]]}), true);
  assert.strictEqual(check.finished({setup, network_score:[[21, 15], [7, 8]]}), false);
  assert.deepStrictEqual(check.errors, []);
 });
 it('uses the actual custom format when no named counting scheme exists', function() {
  const check = finishedChecker(), setup = {scoring_format:{numSets:1, set_points:{end_points:9, max_points:9}}};
  assert.strictEqual(check.finished({setup, network_score:[[9, 4]]}), true);
  assert.strictEqual(check.finished({setup, network_score:[[8, 4]]}), false);
  assert.deepStrictEqual(check.errors, []);
 });
 it('continues to report an explicitly invalid counting scheme', function() {
  const check = finishedChecker();
  assert.strictEqual(check.finished({setup:{counting:'invalid-test'}, network_score:[[1, 0]]}), false);
  assert.strictEqual(check.errors.length, 1);
  assert(check.errors[0].includes('Invalid counting scheme invalid-test'));
 });
 it('preserves scoring and finish metadata while converting a court picker into a network event', function() {
  const source = fs.readFileSync(require.resolve('../js/btsh'), 'utf8');
  const converter = source.match(/function _v2_picker_state_to_event\(msg\) \{[\s\S]*?\n\t\}/)[0];
  const match = {id:'picker',status:'finished',end_ts:123,team1_won:false,network_score:[[9, 4]],setup:{scoring_format:{numSets:1,set_points:{end_points:9,max_points:9}}}};
  const event = vm.runInNewContext('(' + converter + ')(message)', {message:{courts:[{court_id:'court-1',match}]}});
  assert.strictEqual(event.matches[0].setup.state, 'finished');
  assert.strictEqual(event.matches[0].end_ts, 123);
  assert.strictEqual(event.matches[0].team1_won, false);
  assert.strictEqual(event.matches[0].setup.scoring_format.numSets, 1);
  assert.strictEqual(finishedChecker().finished(event.matches[0]), true);
 });
});

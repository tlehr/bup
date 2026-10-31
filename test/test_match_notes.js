'use strict';
const assert = require('assert');
const {bup, SINGLES_SETUP, state_after, _describe, _it} = require('./tutils');

_describe('Versioned tournament-control remarks', () => {
 const start = [{type:'pick_side',team1_left:true,timestamp:100},{type:'love-all',timestamp:200},
  {type:'score',side:'left',timestamp:300}];
 const note = {type:'note',val:'Original remark',source:'tournament-control',note_id:'one',timestamp:1000,score:[[1,0]]};
 _it('keeps rally undo and redo independent of remote remarks and their arrival time', () => {
  const presses = [...start,note,{type:'undo',timestamp:400}];
  const undone = state_after(presses,SINGLES_SETUP);
  assert.deepStrictEqual(undone.game.score,[0,0]);assert.strictEqual(undone.redo_possible,true);
  assert.strictEqual(undone.metadata.updated,400);assert.strictEqual(bup.calc.duration(undone),100);
  assert.strictEqual(bup.calc.note_history(presses)[0].val,note.val);
  const redone = state_after([...presses,Object.assign({},note,{note_id:'two'}),{type:'redo',timestamp:500}],SINGLES_SETUP);
  assert.deepStrictEqual(redone.game.score,[1,0]);assert.strictEqual(bup.calc.note_history(redone.presses).length,2);
 });
 _it('renders the current wording once while retaining all original version metadata', () => {
  const corrected = Object.assign({},note,{val:'Revised remark',note_id:'revision',note_target:'id:one',timestamp:2000,score:[[2,0]]});
  const presses = [...start,note,corrected], before = JSON.stringify(presses),state = state_after(presses,SINGLES_SETUP);
  const history = bup.calc.note_history(presses);
  assert.strictEqual(history.length,1);
  assert.deepStrictEqual(history[0].versions.map(version=>[version.val,version.timestamp,version.score]),[
   ['Original remark',1000,[[1,0]]],['Revised remark',2000,[[2,0]]],
  ]);
  assert.deepStrictEqual(bup.scoresheet.parse_match(state,35).filter(cell=>cell.type==='note').map(cell=>cell.val),['Revised remark']);
  assert.strictEqual(JSON.stringify(presses),before);
  assert.deepStrictEqual(state.game.score,[1,0]);assert.strictEqual(bup.calc.duration(state),200);
 });
 _it('keeps references to legacy BUP notes stable across remote additions and marker removal', () => {
  const legacy = {type:'note',val:'From BUP',timestamp:50};
  const key = bup.calc.note_history([...start,{type:'postmatch-confirm'},legacy])[0].key;
  assert.strictEqual(bup.calc.note_history([note,...start,legacy])[0].key,key);
  const correction = Object.assign({},note,{note_id:'revision',note_target:key,val:'Revised BUP remark'});
  const entries = bup.calc.note_history([...start,legacy,correction]);
  assert.deepStrictEqual(entries[0].versions.map(version=>version.val),['From BUP','Revised BUP remark']);
 });
 _it('retains the original BUP version when the tablet later omits that original note', () => {
  const correction=Object.assign({},note,{note_id:'revision',note_target:'bup:50:0',val:'Revised BUP remark',
   note_origin:{key:'bup:50:0',val:'Original BUP text',timestamp:50,score:[[0,0]]}});
  const entries=bup.calc.note_history([...start,correction]);
  assert.deepStrictEqual(entries[0].versions.map(version=>version.val),['Original BUP text','Revised BUP remark']);
  assert.strictEqual(entries[0].key,'bup:50:0');
 });
 _it('prefixes tournament-control and referee wording in the native report', () => {
  const presses=[...start,note,Object.assign({},note,{note_id:'two',val:'Schedule decision',note_role:'tournament_control'}),
   Object.assign({},note,{note_id:'three',val:'Referee decision',note_role:'referee'})];
  const rendered=bup.scoresheet.parse_match(state_after(presses,SINGLES_SETUP),35).filter(cell=>cell.type==='note').map(cell=>cell.val);
  assert.deepStrictEqual(rendered,['Original remark','Turnierleitung: Schedule decision','Referee: Referee decision']);
 });
 _it('omits deleted remarks from the report while retaining versions through rally undo', () => {
  const deletion=Object.assign({},note,{note_id:'deleted',note_target:'id:one',note_deleted:true,timestamp:2000,score:[[2,0]]});
  const presses=[...start,note,deletion,{type:'undo',timestamp:400}],state=state_after(presses,SINGLES_SETUP);
  assert.deepStrictEqual(bup.scoresheet.parse_match(state,35).filter(cell=>cell.type==='note'),[]);
  assert.strictEqual(bup.calc.note_history(presses)[0].deleted,true);
  assert.strictEqual(bup.calc.note_history(presses)[0].versions.length,2);
  assert.deepStrictEqual(state.game.score,[0,0]);assert.strictEqual(state.metadata.updated,400);
 });
});

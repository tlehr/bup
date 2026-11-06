'use strict';

const assert = require('assert'), fs = require('fs'), vm = require('vm');

function element(tag) {
 const node = {tag, attrs:{}, style:{}, children:[], parentNode:null,
  setAttribute(name, value) {this.attrs[name] = value;},
  getAttribute(name) {return this.attrs[name];},
  appendChild(child) {child.parentNode = this;this.children.push(child);},
  removeChild(child) {this.children.splice(this.children.indexOf(child), 1);child.parentNode = null;},
  querySelector(selector) {return this.children.find(child => child.tag === selector) || null;},
 };
 return node;
}
const copy = value => JSON.parse(JSON.stringify(value));

describe('BTS input surfaces', function() {
 it('preserves self check-in in locally stored settings', function() {
  const context = {window:{localStorage:{getItem:() => JSON.stringify({tablet_mode:'self_check_in'})}},
   utils:{deep_copy:copy, obj_update:Object.assign}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/settings'), 'utf8').split('/*@DEV*/')[0], context);
  assert.strictEqual(context.settings.load().tablet_mode, 'self_check_in');
 });

 function client() {
  const document = {body:element('body'), createElement:element,
   getElementById(id) {return this.body.children.find(child => child.id === id) || null;},
   querySelector:() => null, querySelectorAll:() => []};
  const sockets = [], rendered = [];
  const context = {
   window:{location:{protocol:'http:', hostname:'bts.test', port:'4433', search:'', hash:''}},
   document, URLSearchParams, navigator:{}, setTimeout:() => 0, clearTimeout() {},
   state:{settings:{devicemode:'umpire', tablet_mode:'umpire'}, ui:{}},
   utils:{deep_copy:copy, obj_update:Object.assign}, network:{errstate() {}},
   settings:{default_settings:{}, update() {}, on_mode_change() {}, load:() => ({}),
    hide_displaymode() {}, hide() {}, get_mode:s => s.settings.devicemode},
   uiu:{show_qs() {}, addClass_qs() {}},
   displaymode:{render_v2_display_state(s, msg) {
    rendered.push({state:s, message:msg, overlay:document.getElementById('bts_registration_check_overlay')});
    return true;
   }},
   WebSocket:class {constructor() {this.readyState = 1;sockets.push(this);}},
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/btsh'), 'utf8').split('/*@DEV*/')[0], context);
  const instance = context.btsh('http://bts.test:4433/', 'cup 1');
  instance.subscribe(context.state, () => {});
  assert.strictEqual(sockets.length, 1);
  const receive = message => sockets[0].onmessage({data:JSON.stringify(message)});
  const update = mode => receive({type:'change', ctype:'settings-update', val:{devicemode:'umpire', tablet_mode:mode}});
  return {context, document, update, receive, rendered, sockets};
 }
 it('opens the existing self-check-in page when the assigned profile selects it', function() {
  const c = client();c.update('self_check_in');
  assert.strictEqual(c.context.state.settings.tablet_mode, 'self_check_in');
  const frame = c.document.getElementById('bts_registration_check_overlay').querySelector('iframe');
  assert.strictEqual(frame.getAttribute('src'), '/admin/t/cup%201/self_check_in');
  assert.strictEqual(frame.getAttribute('title'), 'Selbst-Check-in');
 });
 it('switches between registration and self check-in without duplicating the hosted page', function() {
  const c = client();c.update('registration_check');
  const overlay = c.document.getElementById('bts_registration_check_overlay'), frame = overlay.querySelector('iframe');
  assert.strictEqual(frame.getAttribute('src'), '/admin/t/cup%201/registration_check');
  c.update('self_check_in');
  assert.strictEqual(c.document.getElementById('bts_registration_check_overlay'), overlay);
  assert.strictEqual(overlay.querySelector('iframe'), frame);
  assert.strictEqual(frame.getAttribute('src'), '/admin/t/cup%201/self_check_in');
  c.update('registration_check');
  assert.strictEqual(frame.getAttribute('src'), '/admin/t/cup%201/registration_check');
  assert.strictEqual(frame.getAttribute('title'), 'Anmeldung');
  assert.strictEqual(c.document.body.children.length, 1);
 });

 const displayMessages = [
  {type:'display_state', court:{id:'court-1', label:'1'}, match:null},
  {type:'display_multi_state', selected_court_id:'__multi__', court_states:[{court:{id:'court-1', label:'1'}, match:null}]},
  {type:'court_picker_state', courts:[{court_id:'court-1', court_num:'1'}]},
 ];
 ['registration_check', 'self_check_in'].forEach(mode => {
  displayMessages.forEach(payload => {
   it('switches directly from ' + mode + ' to ' + payload.type + ' and back', function() {
    const c = client();c.update(mode);
    const overlay = c.document.getElementById('bts_registration_check_overlay');
    assert(overlay);
    const unrelatedFrame = element('iframe');
    c.document.body.appendChild(unrelatedFrame);
    const message = Object.assign({client_mode:'display', display:{client_id:'screen-1'},
     display_settings:{style:'topcourts', d_c0:'#aabbcc'}}, payload);

    c.receive(message);
    assert.strictEqual(c.document.getElementById('bts_registration_check_overlay'), null);
    assert.strictEqual(c.context.state.settings.devicemode, 'display');
    assert.strictEqual(c.context.state.settings.displaymode_style, 'topcourts');
    assert.strictEqual(c.context.state.settings.d_c0, '#aabbcc');
    assert.strictEqual(c.context.state.ui.displaymode_visible, true);
    assert.strictEqual(c.rendered.length, 1);
    assert.strictEqual(c.rendered[0].message.type, payload.type);
    assert.strictEqual(c.rendered[0].overlay, null, 'the hosted page must be gone before rendering');
    assert.strictEqual(unrelatedFrame.parentNode, c.document.body);

    c.receive(message);
    assert.strictEqual(c.rendered.length, 2);
    c.update(mode);
    const newOverlay = c.document.getElementById('bts_registration_check_overlay');
    assert(newOverlay);
    assert.notStrictEqual(newOverlay, overlay);
    assert.strictEqual(newOverlay.querySelector('iframe').getAttribute('src'), '/admin/t/cup%201/' + mode);
    assert.strictEqual(c.context.state.settings.devicemode, 'umpire');
    c.update(mode);
    assert.strictEqual(c.document.getElementById('bts_registration_check_overlay'), newOverlay);
    assert.strictEqual(c.document.body.children.length, 2);
    assert.strictEqual(c.sockets.length, 1, 'profile changes must keep the connection');
   });
  });
  it('still switches from ' + mode + ' to the scoring tablet', function() {
   const c = client();c.update(mode);c.update('umpire');
   assert.strictEqual(c.document.getElementById('bts_registration_check_overlay'), null);
   assert.strictEqual(c.context.state.settings.tablet_mode, 'umpire');
   assert.strictEqual(c.rendered.length, 0);
  });
 });
});

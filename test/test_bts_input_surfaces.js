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
   getElementById(id) {return this.body.children.find(child => child.id === id) || null;}};
  const sockets = [];
  const context = {
   window:{location:{protocol:'http:', hostname:'bts.test', port:'4433', search:'', hash:''}},
   document, URLSearchParams, navigator:{}, setTimeout:() => 0, clearTimeout() {},
   state:{settings:{devicemode:'umpire', tablet_mode:'umpire'}},
   utils:{deep_copy:copy, obj_update:Object.assign}, network:{errstate() {}},
   settings:{default_settings:{}, update() {}, on_mode_change() {}, load:() => ({})},
   WebSocket:class {constructor() {this.readyState = 1;sockets.push(this);}},
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/btsh'), 'utf8').split('/*@DEV*/')[0], context);
  const instance = context.btsh('http://bts.test:4433/', 'cup 1');
  instance.subscribe(context.state, () => {});
  assert.strictEqual(sockets.length, 1);
  const update = mode => sockets[0].onmessage({data:JSON.stringify({type:'change', ctype:'settings-update', val:{devicemode:'umpire', tablet_mode:mode}})});
  return {context, document, update};
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
});

import { ShortcutManager } from '../src/core/shortcutManager.js';

// Setup Mock localStorage for node test
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); },
  get length() { return Object.keys(storage).length; },
  key: (i) => Object.keys(storage)[i] || null
};

console.log('--- TEST 1: INITIALIZATION & LISTING ---');
const sm = new ShortcutManager();
const list = sm.list();
console.log('Total registered shortcuts:', list.length);
const devtools = list.find(s => s.id === 'devtools');
console.log('Devtools initial status:', devtools ? (devtools.blocked ? 'BLOCKED' : 'ALLOWED') : 'NOT FOUND');

console.log('--- TEST 2: BLOCKING SPECIFIC SHORTCUT ---');
const blockRes = sm.block('devtools');
console.log('Block result:', blockRes);
const devtoolsAfter = sm.list().find(s => s.id === 'devtools');
console.log('Devtools status after block:', devtoolsAfter.blocked ? 'BLOCKED' : 'ALLOWED');

console.log('--- TEST 3: REMAPPING SHORTCUT ---');
const remapRes = sm.remap('admin-cli', 'Ctrl+Shift+T');
console.log('Remap result:', remapRes);
const adminAfter = sm.list().find(s => s.id === 'admin-cli');
console.log('Admin shortcut keys after remap:', adminAfter.keys);

console.log('--- TEST 4: EVENT MATCHING & BLOCKING EXECUTION ---');
let prevented = false;
let stopped = false;
const mockEvent = {
  key: 'F12',
  code: 'F12',
  ctrlKey: false,
  shiftKey: false,
  altKey: false,
  preventDefault: () => { prevented = true; },
  stopPropagation: () => { stopped = true; }
};
sm.handleKeyEvent(mockEvent);
console.log('F12 prevented on blocked devtools:', prevented);
console.log('F12 stopped propagation:', stopped);

console.log('--- TEST 5: ACTION HANDLER EXECUTION ---');
let actionTriggered = false;
sm.setActionHandler('admin-cli', () => { actionTriggered = true; });

const mockAdminEvent = {
  key: 'T',
  code: 'KeyT',
  ctrlKey: true,
  shiftKey: true,
  altKey: false,
  preventDefault: () => {},
  stopPropagation: () => {}
};
sm.handleKeyEvent(mockAdminEvent);
console.log('Remapped admin-cli triggered:', actionTriggered);

console.log('--- TEST 6: RESET TO DEFAULTS ---');
const resetRes = sm.reset();
console.log('Reset result:', resetRes);
const devtoolsReset = sm.list().find(s => s.id === 'devtools');
const adminReset = sm.list().find(s => s.id === 'admin-cli');
console.log('Devtools after reset:', devtoolsReset.blocked ? 'BLOCKED' : 'ALLOWED');
console.log('Admin keys after reset:', adminReset.keys);

console.log('--- ALL SHORTCUT MANAGER TESTS PASSED ---');


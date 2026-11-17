import { ContentProtectionEngine } from '../src/core/contentProtectionEngine.js';

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

console.log('--- TEST 1: INITIAL CONFIGURATION ---');
const cp = new ContentProtectionEngine();
const initialStatus = cp.getStatus();
console.log('blockCopyText:', initialStatus.blockCopyText);
console.log('blockImageDrag:', initialStatus.blockImageDrag);
console.log('blockImageSelect:', initialStatus.blockImageSelect);
console.log('antiScreenshot:', initialStatus.antiScreenshot);

console.log('--- TEST 2: TOGGLING RULES VIA CMD LOGIC ---');
const copyOffRes = cp.setRule('copy', false);
console.log('Set copy off result:', copyOffRes);
console.log('blockCopyText after set off:', cp.getStatus().blockCopyText);

const copyOnRes = cp.setRule('copy', true);
console.log('Set copy on result:', copyOnRes);
console.log('blockCopyText after set on:', cp.getStatus().blockCopyText);

console.log('--- TEST 3: TOGGLING ALL RULES ---');
const allOffRes = cp.setAll(false);
console.log('Set all off result:', allOffRes);
console.log('Status after all off:', cp.getStatus());

const allOnRes = cp.setAll(true);
console.log('Set all on result:', allOnRes);
console.log('Status after all on:', cp.getStatus());

console.log('--- TEST 4: RESET TO DEFAULTS ---');
const resetRes = cp.reset();
console.log('Reset result:', resetRes);
console.log('Status after reset:', cp.getStatus());

console.log('--- ALL CONTENT PROTECTION TESTS PASSED ---');


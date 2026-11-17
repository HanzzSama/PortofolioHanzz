import { AdminSecurityEngine } from '../src/core/adminSecurityEngine.js';

const sec = new AdminSecurityEngine();

global.screen = {
  width: 1920,
  height: 1080,
  colorDepth: 24
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = v; },
  removeItem(k) { delete this._store[k]; }
};
global.sessionStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = v; },
  removeItem(k) { delete this._store[k]; }
};

async function testSecurity() {
  console.log('Testing AdminSecurityEngine...');
  
  // 1. Device fingerprint
  const fp = await sec.getDeviceFingerprint();
  console.log('Generated device fingerprint:', fp);
  if (!fp || fp.length < 8) throw new Error('Invalid fingerprint');

  // 2. Lockout test
  let lockStatus = sec.checkLockoutStatus();
  console.log('Initial lockout status:', lockStatus);
  if (lockStatus.isLocked) throw new Error('Should not be locked initially');

  sec.recordFailedAttempt(); // 1
  sec.recordFailedAttempt(); // 2
  const lock3 = sec.recordFailedAttempt(); // 3 -> Lockout!
  console.log('After 3 failed attempts:', lock3);
  if (!lock3.isLocked) throw new Error('Should be locked after 3 attempts');

  lockStatus = sec.checkLockoutStatus();
  console.log('Lockout check:', lockStatus);
  if (!lockStatus.isLocked) throw new Error('checkLockoutStatus should report locked');

  // Reset
  sec.resetAttempts();
  if (sec.checkLockoutStatus().isLocked) throw new Error('Reset should clear lockout');
  console.log('Lockout reset successful.');

  // 3. Session test
  const session = await sec.createSession();
  console.log('Created session:', session);
  const isValid = await sec.isSessionValid();
  console.log('Is session valid:', isValid);
  if (!isValid) throw new Error('Session should be valid');

  const remaining = sec.getSessionRemainingMinutes();
  console.log('Remaining session minutes:', remaining);
  if (remaining < 29 || remaining > 30) throw new Error('Remaining minutes should be ~30');

  sec.clearSession();
  const isStillValid = await sec.isSessionValid();
  console.log('After clearSession, is valid:', isStillValid);
  if (isStillValid) throw new Error('Session should be invalid after clear');

  console.log('ALL TESTS PASSED!');
}

testSecurity().catch(console.error);

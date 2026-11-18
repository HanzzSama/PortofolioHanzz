/**
 * Test Split QR-Code Flow & Admin Authentication Verification
 */
import { AdminSecurityEngine } from '../src/core/adminSecurityEngine.js';
import { QrScannerEngine, QrMatrixEncoder } from '../src/core/qrScannerEngine.js';
import { AdminAuthModal } from '../src/core/adminAuthModal.js';

// Setup Mock DOM Environment
const mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

global.window = {
  location: { origin: 'http://localhost:5173', pathname: '/index.html' },
  addEventListener: () => {},
  removeEventListener: () => {}
};

class MockElement {
  constructor(tag, id = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = '';
    this.classList = {
      _classes: new Set(),
      add: (...c) => c.forEach(x => this.classList._classes.add(x)),
      remove: (...c) => c.forEach(x => this.classList._classes.delete(x)),
      contains: (c) => this.classList._classes.has(c)
    };
    this.style = {};
    this.attributes = {};
    this.children = [];
    this.innerHTML = '';
    this.value = '';
    this.disabled = false;
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  addEventListener(event, handler) {}
  querySelector(sel) { return null; }
  querySelectorAll(sel) { return []; }
  appendChild(child) { this.children.push(child); }
  focus() {}
}

const elementRegistry = new Map();
global.document = {
  body: new MockElement('body'),
  createElement: (tag) => new MockElement(tag),
  getElementById: (id) => {
    if (!elementRegistry.has(id)) {
      elementRegistry.set(id, new MockElement('div', id));
    }
    return elementRegistry.get(id);
  },
  addEventListener: () => {}
};

async function runTests() {
  console.log('--- STARTING VERIFICATION TESTS ---');
  let passed = 0;
  let total = 0;

  function assert(condition, testName) {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
    }
  }

  // TEST 1: Default Root Password Verification
  const sec = new AdminSecurityEngine();
  const isDefaultValid = await sec.verifyRootPassword('RootUser=0');
  assert(isDefaultValid === true, 'Default root password "RootUser=0" validates successfully');

  const isWrongInvalid = await sec.verifyRootPassword('WrongPassword123');
  assert(isWrongInvalid === false, 'Incorrect password correctly rejected');

  // TEST 2: Password Updating & Hashing
  const updateResult = await sec.updateRootPassword('NewSecureRoot#2026', 'RootUser=0');
  assert(updateResult.success === true, 'Root password update succeeds with correct old password');

  const isNewValid = await sec.verifyRootPassword('NewSecureRoot#2026');
  assert(isNewValid === true, 'New root password verifies successfully');

  // Reset password back
  await sec.resetRootPassword();
  const isResetValid = await sec.verifyRootPassword('RootUser=0');
  assert(isResetValid === true, 'Password reset restores default "RootUser=0"');

  // TEST 3: ISO/IEC QR Matrix Generation
  const qrEngine = new QrScannerEngine();
  const testUrl = 'http://localhost:5173/admin-verify.html?session=test-sess-123&token=test-tok-456';
  const qrSvg = qrEngine.generateQrSvg(testUrl, 168);
  assert(qrSvg.includes('<svg') && qrSvg.includes('<rect') && qrSvg.includes('viewBox="0 0 168 168"'), 'ISO QR SVG renders valid XML with quiet zone');

  // TEST 4: Modal Initialization & Default QR Tab
  let successCalled = false;
  const modal = new AdminAuthModal(sec, () => { successCalled = true; });

  assert(modal.activeTab === 'qr', 'Active tab defaults to "qr"');
  assert(typeof modal.renderDefaultQrCode === 'function', 'renderDefaultQrCode method exists');

  // TEST 5: Render Default QR and Verify Portal URL
  modal.renderDefaultQrCode();
  assert(modal.activeQrSessionId !== null, 'activeQrSessionId generated on default render');
  assert(modal.activeQrToken !== null, 'activeQrToken generated on default render');
  
  const portalUrl = modal.getVerificationPortalUrl();
  assert(portalUrl.includes('admin-verify.html') && portalUrl.includes('session=') && portalUrl.includes('token='), 'Verification portal URL correctly formatted');

  // TEST 6: Direct Desktop Password Authentication
  const pwdInput = document.getElementById('auth-qr-password-input');
  pwdInput.value = 'RootUser=0';
  await modal.attemptVerifyQr();
  assert(successCalled === true, 'Direct desktop verification with root password opens session');

  // TEST 7: Mobile Approval Broadcast Synchronization
  successCalled = false;
  await modal.handleMobileApprovalSuccess({ sessionId: modal.activeQrSessionId, token: modal.activeQrToken });
  await new Promise(resolve => setTimeout(resolve, 400));
  assert(successCalled === true, 'Mobile approval successfully completes authentication and calls onSuccess');

  console.log(`\nResults: ${passed}/${total} tests passed.`);
  if (passed === total) {
    console.log('ALL TESTS PASSED SUCCESSFULLY!');
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});

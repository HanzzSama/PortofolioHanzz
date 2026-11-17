/**
 * ADMIN SHORTCUT TRIGGER & ORCHESTRATOR
 * Global shortcut listener: ALT + CTRL + SHIFT + C
 * Coordinates AdminSecurityEngine, AdminAuthModal, and AdminTerminalEngine
 */

import { AdminSecurityEngine } from './adminSecurityEngine.js';
import { AdminAuthModal } from './adminAuthModal.js';
import { AdminTerminalEngine } from './adminTerminalEngine.js';
import { shortcutManager } from './shortcutManager.js';

export class AdminShortcutTrigger {
  constructor(appRef = null) {
    this.app = appRef;
    this.security = new AdminSecurityEngine();
    this.terminal = new AdminTerminalEngine(this.app, this.security);
    this.authModal = new AdminAuthModal(this.security, () => {
      this.terminal.open();
    });
    this.lastTriggerTime = 0;

    this.bindShortcut();
  }

  bindShortcut() {
    shortcutManager.setActionHandler('admin-cli', async () => {
      await this.handleTrigger();
    });
  }

  async handleTrigger() {
    const now = Date.now();
    if (this.lastTriggerTime && now - this.lastTriggerTime < 350) {
      return;
    }
    this.lastTriggerTime = now;

    // 1. If terminal is already open, toggle close
    if (this.terminal && this.terminal.isOpen) {
      this.terminal.close();
      return;
    }

    // 2. If auth modal is already open, close it
    if (this.authModal && this.authModal.isOpen()) {
      this.authModal.close();
      return;
    }

    // 3. Check if active admin session is still valid on this device
    try {
      const isValid = await this.security.isSessionValid();
      if (isValid) {
        if (this.terminal) this.terminal.open();
      } else {
        if (this.authModal) this.authModal.open();
      }
    } catch (err) {
      console.warn('Gagal memeriksa status sesi admin, membuka modal verifikasi:', err);
      if (this.authModal) this.authModal.open();
    }
  }

  // Programmatic launch helper (e.g. from context menu)
  async openAdminPrompt() {
    try {
      const isValid = await this.security.isSessionValid();
      if (isValid) {
        if (this.terminal && !this.terminal.isOpen) {
          this.terminal.open();
        }
      } else {
        if (this.authModal && !this.authModal.isOpen()) {
          this.authModal.open();
        }
      }
    } catch (err) {
      if (this.authModal && !this.authModal.isOpen()) {
        this.authModal.open();
      }
    }
  }
}


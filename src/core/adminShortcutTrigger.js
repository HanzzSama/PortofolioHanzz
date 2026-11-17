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

    this.bindShortcut();
  }

  bindShortcut() {
    shortcutManager.setActionHandler('admin-cli', async () => {
      await this.handleTrigger();
    });

    window.addEventListener('keydown', async (e) => {
      const isAlt = e.altKey;
      const isCtrl = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;
      const isKeyC = e.code === 'KeyC' || (e.key && e.key.toLowerCase() === 'c');

      if (isAlt && isCtrl && isShift && isKeyC) {
        const adminItem = shortcutManager.shortcuts.find(s => s.id === 'admin-cli');
        if (adminItem && !adminItem.keys.some(k => k.toLowerCase().includes('alt+ctrl+shift+c') || k.toLowerCase().includes('ctrl+alt+shift+c'))) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        await this.handleTrigger();
      }
    }, true);
  }

  async handleTrigger() {
    // 1. If terminal is already open, toggle close
    if (this.terminal.isOpen) {
      this.terminal.close();
      return;
    }

    // 2. If auth modal is already open, close it
    if (this.authModal.isOpen()) {
      this.authModal.close();
      return;
    }

    // 3. Check if active admin session is still valid on this device
    const isValid = await this.security.isSessionValid();
    if (isValid) {
      this.terminal.open();
    } else {
      this.authModal.open();
    }
  }

  // Programmatic launch helper
  async openAdminPrompt() {
    await this.handleTrigger();
  }
}


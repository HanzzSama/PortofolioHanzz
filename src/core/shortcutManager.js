/**
 * SHORTCUT MANAGER & KEYBOARD ACCESS CONTROLLER
 * Manages default browser key combinations, action blocking, remapping, and admin actions.
 * Identity: Haidar Rifky Andrianno // HanzzSama 2026
 */

export class ShortcutManager {
  constructor() {
    this.STORAGE_KEY = 'hanzz_shortcuts_config';
    this.actionHandlers = new Map();
    this.testCallback = null;
    this.isListening = false;

    this.defaultShortcuts = [
      {
        id: 'devtools',
        name: 'Developer Tools',
        keys: ['F12', 'Ctrl+Shift+I', 'Ctrl+Shift+J', 'Ctrl+Shift+C'],
        category: 'browser',
        blocked: false,
        description: 'Membuka konsol dan inspeksi elemen peramban'
      },
      {
        id: 'refresh',
        name: 'Muat Ulang Halaman',
        keys: ['F5', 'Ctrl+R', 'Ctrl+Shift+R'],
        category: 'browser',
        blocked: false,
        description: 'Memuat ulang seluruh dokumen halaman web'
      },
      {
        id: 'view-source',
        name: 'Lihat Kode Sumber',
        keys: ['Ctrl+U'],
        category: 'browser',
        blocked: false,
        description: 'Membuka tampilan kode sumber HTML peramban'
      },
      {
        id: 'save-page',
        name: 'Simpan Halaman',
        keys: ['Ctrl+S'],
        category: 'browser',
        blocked: false,
        description: 'Menyimpan halaman web ke cakram lokal'
      },
      {
        id: 'print-page',
        name: 'Cetak Dokumen',
        keys: ['Ctrl+P'],
        category: 'browser',
        blocked: false,
        description: 'Membuka dialog pencetakan dokumen peramban'
      },
      {
        id: 'fullscreen',
        name: 'Layar Penuh',
        keys: ['F11'],
        category: 'browser',
        blocked: false,
        description: 'Beralih ke mode tampilan layar penuh peramban'
      },
      {
        id: 'find-page',
        name: 'Pencarian Teks',
        keys: ['Ctrl+F', 'F3'],
        category: 'browser',
        blocked: false,
        description: 'Membuka bilah pencarian teks bawaan peramban'
      },
      {
        id: 'nav-back',
        name: 'Navigasi Riwayat Mundur',
        keys: ['Alt+ArrowLeft'],
        category: 'browser',
        blocked: false,
        description: 'Kembali ke halaman sebelumnya pada riwayat peramban'
      },
      {
        id: 'nav-forward',
        name: 'Navigasi Riwayat Maju',
        keys: ['Alt+ArrowRight'],
        category: 'browser',
        blocked: false,
        description: 'Maju ke halaman berikutnya pada riwayat peramban'
      },
      {
        id: 'admin-cli',
        name: 'Command Prompt Admin',
        keys: ['Alt+Ctrl+Shift+C'],
        category: 'admin',
        blocked: false,
        description: 'Membuka jendela konsol administrasi portofolio'
      },
      {
        id: 'xray-hud',
        name: 'HUD X-Ray Telemetri',
        keys: ['KeyX'],
        category: 'system',
        blocked: false,
        description: 'Menampilkan HUD telemetri performa dan hardware'
      }
    ];

    this.shortcuts = this.loadConfig();
    this.init();
  }

  isAvailable() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  loadConfig() {
    if (!this.isAvailable()) {
      return JSON.parse(JSON.stringify(this.defaultShortcuts));
    }
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(this.defaultShortcuts));
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) return JSON.parse(JSON.stringify(this.defaultShortcuts));

      // Merge saved configurations with defaults to ensure complete schema
      return this.defaultShortcuts.map((def) => {
        const found = saved.find((s) => s.id === def.id);
        if (!found) return def;
        return {
          ...def,
          keys: Array.isArray(found.keys) && found.keys.length > 0 ? found.keys : def.keys,
          blocked: Boolean(found.blocked)
        };
      });
    } catch (_) {
      return JSON.parse(JSON.stringify(this.defaultShortcuts));
    }
  }

  saveConfig() {
    if (!this.isAvailable()) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.shortcuts));
    } catch (e) {
      console.warn('Gagal menyimpan konfigurasi pintasan tombol:', e);
    }
  }

  init() {
    if (typeof window === 'undefined' || this.isListening) return;
    this.isListening = true;

    window.addEventListener(
      'keydown',
      (e) => {
        this.handleKeyEvent(e);
      },
      true
    );
  }

  handleKeyEvent(e) {
    if (e.repeat) return;

    // If interactive test callback is active, forward the key detection
    if (typeof this.testCallback === 'function') {
      const comboName = this.formatEventToCombo(e);
      this.testCallback(comboName, e);
    }

    // Do not trigger actions if user is typing in standard text inputs (unless admin shortcut)
    const isInput = e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName);

    for (const item of this.shortcuts) {
      const matches = item.keys.some((k) => this.matchesEvent(k, e));
      if (!matches) continue;

      // 1. If blocked, prevent default browser action immediately
      if (item.blocked) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') {
          e.stopImmediatePropagation();
        }
        return;
      }

      // 2. If item has custom action handler, execute it
      if (this.actionHandlers.has(item.id)) {
        // Allow admin-cli even when focused on some elements, but block single-key HUD when in input
        if (isInput && item.category !== 'admin') {
          continue;
        }
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') {
          e.stopImmediatePropagation();
        }
        const handler = this.actionHandlers.get(item.id);
        try {
          handler(e);
        } catch (err) {
          console.error(`Gagal menjalankan handler untuk pintasan ${item.id}:`, err);
        }
        return;
      }
    }
  }

  parseComboString(str) {
    const parts = str.toLowerCase().split('+').map((s) => s.trim()).filter(Boolean);
    const ctrl = parts.includes('ctrl') || parts.includes('control');
    const alt = parts.includes('alt');
    const shift = parts.includes('shift');
    const meta = parts.includes('meta') || parts.includes('cmd') || parts.includes('win');
    const rawKeys = parts.filter((p) => !['ctrl', 'control', 'alt', 'shift', 'meta', 'cmd', 'win'].includes(p));
    const key = rawKeys[0] || '';
    return { ctrl, alt, shift, meta, key };
  }

  matchesEvent(comboStr, e) {
    const combo = this.parseComboString(comboStr);
    const eCtrl = Boolean(e.ctrlKey || e.metaKey);
    const eAlt = Boolean(e.altKey);
    const eShift = Boolean(e.shiftKey);
    const eKey = (e.key || '').toLowerCase();
    const eCode = (e.code || '').toLowerCase().replace('key', '');

    if (combo.ctrl !== eCtrl) return false;
    if (combo.alt !== eAlt) return false;
    if (combo.shift !== eShift) return false;

    const targetKey = combo.key.toLowerCase().replace('key', '');
    if (targetKey === eKey || targetKey === eCode) return true;

    // Handle special function keys and arrows
    if (targetKey === 'f12' && (eKey === 'f12' || e.code === 'F12')) return true;
    if (targetKey === 'f5' && (eKey === 'f5' || e.code === 'F5')) return true;
    if (targetKey === 'f11' && (eKey === 'f11' || e.code === 'F11')) return true;
    if (targetKey === 'f3' && (eKey === 'f3' || e.code === 'F3')) return true;
    if ((targetKey === 'arrowleft' || targetKey === 'left') && (eKey === 'arrowleft' || e.code === 'ArrowLeft')) return true;
    if ((targetKey === 'arrowright' || targetKey === 'right') && (eKey === 'arrowright' || e.code === 'ArrowRight')) return true;

    return false;
  }

  formatEventToCombo(e) {
    const parts = [];
    if (e.ctrlKey) parts.push('Ctrl');
    if (e.altKey) parts.push('Alt');
    if (e.shiftKey) parts.push('Shift');
    if (e.metaKey) parts.push('Meta');

    let keyName = e.key;
    if (e.code && e.code.startsWith('Key')) {
      keyName = e.code.replace('Key', '');
    } else if (e.code && e.code.startsWith('Digit')) {
      keyName = e.code.replace('Digit', '');
    } else if (e.code) {
      keyName = e.code;
    }

    if (!['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) {
      parts.push(keyName);
    }

    return parts.join('+');
  }

  list() {
    return JSON.parse(JSON.stringify(this.shortcuts));
  }

  block(id) {
    if (id === 'all') {
      this.shortcuts.forEach((s) => {
        if (s.category === 'browser') s.blocked = true;
      });
      this.saveConfig();
      return { success: true, message: 'Seluruh pintasan bawaan peramban berhasil diblokir' };
    }

    const item = this.shortcuts.find((s) => s.id.toLowerCase() === id.toLowerCase());
    if (!item) {
      return { success: false, message: `Pintasan dengan ID "${id}" tidak ditemukan` };
    }

    item.blocked = true;
    this.saveConfig();
    return { success: true, message: `Pintasan "${item.name}" (${item.keys.join(', ')}) berhasil diblokir` };
  }

  unblock(id) {
    if (id === 'all') {
      this.shortcuts.forEach((s) => {
        if (s.category === 'browser') s.blocked = false;
      });
      this.saveConfig();
      return { success: true, message: 'Seluruh blokir pintasan bawaan peramban berhasil dibuka' };
    }

    const item = this.shortcuts.find((s) => s.id.toLowerCase() === id.toLowerCase());
    if (!item) {
      return { success: false, message: `Pintasan dengan ID "${id}" tidak ditemukan` };
    }

    item.blocked = false;
    this.saveConfig();
    return { success: true, message: `Pintasan "${item.name}" berhasil diizinkan kembali` };
  }

  remap(id, newCombo) {
    const item = this.shortcuts.find((s) => s.id.toLowerCase() === id.toLowerCase());
    if (!item) {
      return { success: false, message: `Pintasan dengan ID "${id}" tidak ditemukan` };
    }

    if (!newCombo || typeof newCombo !== 'string') {
      return { success: false, message: 'Format kombinasi tombol baru tidak valid' };
    }

    const cleaned = newCombo.trim();
    item.keys = [cleaned];
    this.saveConfig();
    return { success: true, message: `Pintasan "${item.name}" berhasil dipetakan ke: ${cleaned}` };
  }

  reset() {
    this.shortcuts = JSON.parse(JSON.stringify(this.defaultShortcuts));
    this.saveConfig();
    return { success: true, message: 'Seluruh konfigurasi pintasan berhasil dipulihkan ke setelan bawaan' };
  }

  setActionHandler(id, handler) {
    if (typeof handler === 'function') {
      this.actionHandlers.set(id, handler);
    } else {
      this.actionHandlers.delete(id);
    }
  }

  setTestCallback(callback) {
    this.testCallback = callback;
  }
}

export const shortcutManager = new ShortcutManager();


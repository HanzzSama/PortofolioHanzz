/**
 * CONTENT PROTECTION & SECURITY SHIELD ENGINE
 * Defends portfolio assets, images, text, and media against unauthorized extraction.
 * Features: Image drag/select block, Copy/Paste block with reading selection preserved,
 * Anti-screenshot flash shield, and Print media deterrence.
 * Identity: Haidar Rifky Andrianno // HanzzSama 2026
 */

export class ContentProtectionEngine {
  constructor() {
    this.STORAGE_KEY = 'hanzz_content_protection_config';
    this.shieldEl = null;
    this.toastEl = null;
    this.toastTimeout = null;

    this.defaultConfig = {
      blockImageSelect: true,
      blockImageDrag: true,
      blockCopyText: true,
      blockPasteText: true,
      antiScreenshot: true,
      blockPrint: true
    };

    this.config = this.loadConfig();
    this.initDOM();
    this.applyStyles();
    this.bindEvents();
  }

  isAvailable() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  loadConfig() {
    if (!this.isAvailable()) {
      return { ...this.defaultConfig };
    }
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return { ...this.defaultConfig };
      const parsed = JSON.parse(raw);
      return { ...this.defaultConfig, ...parsed };
    } catch (_) {
      return { ...this.defaultConfig };
    }
  }

  saveConfig() {
    if (!this.isAvailable()) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
    } catch (e) {
      console.warn('Gagal menyimpan konfigurasi proteksi konten:', e);
    }
  }

  initDOM() {
    if (typeof document === 'undefined') return;

    // 1. Screenshot flash shield element
    if (!document.getElementById('security-shield-flash')) {
      const shield = document.createElement('div');
      shield.id = 'security-shield-flash';
      shield.style.cssText = `
        position: fixed;
        inset: 0;
        background: #000;
        z-index: 999999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.08s ease;
      `;
      document.body.appendChild(shield);
      this.shieldEl = shield;
    }

    // 2. Security Toast Pill element
    if (!document.getElementById('security-guard-toast')) {
      const toast = document.createElement('div');
      toast.id = 'security-guard-toast';
      toast.className = 'security-guard-toast font-mono';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #141815;
        border: 1px solid rgba(184, 115, 87, 0.4);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
        color: #F4F3EF;
        padding: 0.65rem 1.25rem;
        border-radius: 6px;
        font-size: 0.76rem;
        letter-spacing: 0.03em;
        z-index: 999998;
        opacity: 0;
        pointer-events: none;
        transition: transform 0.24s cubic-bezier(0.2, 0, 0, 1), opacity 0.24s cubic-bezier(0.2, 0, 0, 1);
        display: flex;
        align-items: center;
        gap: 0.65rem;
      `;
      document.body.appendChild(toast);
      this.toastEl = toast;
    }
  }

  applyStyles() {
    if (typeof document === 'undefined') return;

    let styleEl = document.getElementById('content-protection-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'content-protection-styles';
      document.head.appendChild(styleEl);
    }

    const rules = [];

    // Image drag & selection protection
    if (this.config.blockImageSelect || this.config.blockImageDrag) {
      rules.push(`
        img, svg, picture, .project-preview-img, [data-protected-media] {
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-user-drag: none !important;
        }
      `);
    }

    // Print protection
    if (this.config.blockPrint) {
      rules.push(`
        @media print {
          html, body {
            display: none !important;
            visibility: hidden !important;
          }
        }
      `);
    }

    styleEl.textContent = rules.join('\n');
  }

  bindEvents() {
    if (typeof document === 'undefined') return;

    // 1. Block Copy Event while keeping visual selection enabled
    document.addEventListener('copy', (e) => {
      if (!this.config.blockCopyText) return;

      // Allow copying inside Admin Terminal or Auth Modal
      if (e.target && e.target.closest('#admin-terminal-window, #admin-auth-modal')) {
        return;
      }

      e.preventDefault();
      const copyright = 'Konten portofolio dilindungi hak cipta © 2026 Haidar Rifky Andrianno (HanzzSama).';
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', copyright);
      }
      this.showSecurityToast('Penyalinan teks dicegat. Konten dilindungi hak cipta.');
    });

    // 2. Block Cut Event
    document.addEventListener('cut', (e) => {
      if (!this.config.blockCopyText) return;
      if (e.target && e.target.closest('#admin-terminal-window, #admin-auth-modal, input, textarea')) {
        return;
      }

      e.preventDefault();
      this.showSecurityToast('Pemotongan teks dicegat.');
    });

    // 3. Block Paste Event (allowed in terminal and OTP inputs)
    document.addEventListener('paste', (e) => {
      if (!this.config.blockPasteText) return;
      if (e.target && e.target.closest('.otp-digit-input, #terminal-cli-input, #admin-terminal-window, #admin-auth-modal')) {
        return;
      }

      e.preventDefault();
      this.showSecurityToast('Penempelan teks dibatasi pada area ini.');
    });

    // 4. Block Dragstart on images and media
    document.addEventListener('dragstart', (e) => {
      if (!this.config.blockImageDrag) return;
      if (e.target && (e.target.tagName === 'IMG' || e.target.closest?.('img, svg, picture, .project-preview-img'))) {
        e.preventDefault();
      }
    });

    // 5. Anti-Screenshot detection
    window.addEventListener(
      'keydown',
      (e) => {
        if (!this.config.antiScreenshot) return;

        const isPrintScreen = e.key === 'PrintScreen' || e.code === 'PrintScreen';
        const isWinShiftS = (e.metaKey || e.ctrlKey) && e.shiftKey && (e.key.toLowerCase() === 's' || e.code === 'KeyS');

        if (isPrintScreen || isWinShiftS) {
          this.triggerScreenshotShield();
          if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('').catch(() => {});
          }
          this.showSecurityToast('Tangkapan layar sistem dicegat demi keamanan aset.');
        }
      },
      true
    );
  }

  triggerScreenshotShield() {
    if (!this.shieldEl) return;
    this.shieldEl.style.opacity = '1';
    setTimeout(() => {
      if (this.shieldEl) {
        this.shieldEl.style.opacity = '0';
      }
    }, 380);
  }

  showSecurityToast(message) {
    if (!this.toastEl) return;
    this.toastEl.innerHTML = `
      <span style="color: #B87357; font-weight: bold;">[GUARD]</span>
      <span>${message}</span>
    `;
    this.toastEl.style.opacity = '1';
    this.toastEl.style.transform = 'translateX(-50%) translateY(0)';

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      if (this.toastEl) {
        this.toastEl.style.opacity = '0';
        this.toastEl.style.transform = 'translateX(-50%) translateY(20px)';
      }
    }, 2400);
  }

  getStatus() {
    return { ...this.config };
  }

  setRule(rule, enabled) {
    const validRules = {
      image: ['blockImageSelect', 'blockImageDrag'],
      copy: ['blockCopyText'],
      paste: ['blockPasteText'],
      screen: ['antiScreenshot'],
      screenshot: ['antiScreenshot'],
      print: ['blockPrint']
    };

    const targetKeys = validRules[rule.toLowerCase()];
    if (!targetKeys) {
      return { success: false, message: `Fitur proteksi "${rule}" tidak dikenali.` };
    }

    targetKeys.forEach((key) => {
      this.config[key] = Boolean(enabled);
    });

    this.saveConfig();
    this.applyStyles();
    return {
      success: true,
      message: `Proteksi [${rule}] berhasil ${enabled ? 'DIAKTIFKAN' : 'DINONAKTIFKAN'}.`
    };
  }

  setAll(enabled) {
    const val = Boolean(enabled);
    Object.keys(this.config).forEach((k) => {
      this.config[k] = val;
    });
    this.saveConfig();
    this.applyStyles();
    return {
      success: true,
      message: `Seluruh proteksi konten portofolio berhasil ${enabled ? 'DIAKTIFKAN' : 'DINONAKTIFKAN'}.`
    };
  }

  reset() {
    this.config = { ...this.defaultConfig };
    this.saveConfig();
    this.applyStyles();
    return {
      success: true,
      message: 'Seluruh konfigurasi proteksi konten berhasil dipulihkan ke setelan bawaan.'
    };
  }
}

export const contentProtection = new ContentProtectionEngine();


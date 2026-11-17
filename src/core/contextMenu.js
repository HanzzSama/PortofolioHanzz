/**
 * ARCHITECTURAL CONTEXT MENU ENGINE
 * Minimalist Biophilic Context Menu & Geodesic Telemetry Controls
 * Identity: Haidar Rifky Andrianno // HanzzSama 2026
 */

import { hapticAudio } from './hapticAudioEngine.js';

export class ContextMenuEngine {
  constructor(appRef = null) {
    this.app = appRef;
    this.menuEl = null;
    this.toastEl = null;
    this.isOpen = false;
    this.initialScrollY = 0;

    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    // 1. Context Menu Container
    const menu = document.createElement('div');
    menu.id = 'architectural-context-menu';
    menu.className = 'architectural-context-menu';
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('role', 'menu');

    menu.innerHTML = `
      <div class="context-menu-header">
        <div class="context-menu-title-wrap">
          <span class="context-menu-status-dot"></span>
          <span class="context-menu-title font-mono">SYS.MENU // CONTEXT</span>
        </div>
        <span class="context-menu-coord font-mono">07°00'S</span>
      </div>

      <div class="context-menu-section-title font-mono">01 // Telemetry and system</div>
      <div class="context-menu-items">
        <button class="context-menu-item" data-action="xray" role="menuitem" data-cursor-target>
          <span class="menu-item-text">Buka Telemetri X-Ray</span>
          <span class="menu-item-badge font-mono">[X]</span>
        </button>
        <button class="context-menu-item" data-action="theme" role="menuitem" data-cursor-target>
          <span class="menu-item-text">Ganti Tema Biosphere</span>
          <span class="menu-item-badge font-mono" id="context-theme-label">THEME</span>
        </button>
        <button class="context-menu-item" data-action="audio" role="menuitem" data-cursor-target>
          <span class="menu-item-text">Konsol Audio DSP</span>
          <span class="menu-item-badge font-mono">[432Hz]</span>
        </button>
      </div>

      <div class="context-menu-divider"></div>

      <div class="context-menu-section-title font-mono">02 // Fast navigation</div>
      <div class="context-menu-items">
        <button class="context-menu-item" data-action="nav" data-target="#welcome" role="menuitem" data-cursor-target>
          <span class="menu-item-index font-mono">01</span>
          <span class="menu-item-text">Beranda (Welcome)</span>
        </button>
        <button class="context-menu-item" data-action="nav" data-target="#about" role="menuitem" data-cursor-target>
          <span class="menu-item-index font-mono">02</span>
          <span class="menu-item-text">Tentang &amp; Manifesto</span>
        </button>
        <button class="context-menu-item" data-action="nav" data-target="#skills" role="menuitem" data-cursor-target>
          <span class="menu-item-index font-mono">03</span>
          <span class="menu-item-text">Taksonomi Keahlian</span>
        </button>
        <button class="context-menu-item" data-action="nav" data-target="#projects" role="menuitem" data-cursor-target>
          <span class="menu-item-index font-mono">04</span>
          <span class="menu-item-text">Arsip Proyek</span>
        </button>
        <button class="context-menu-item" data-action="nav" data-target="#github" role="menuitem" data-cursor-target>
          <span class="menu-item-index font-mono">05</span>
          <span class="menu-item-text">Repositori GitHub</span>
        </button>
        <button class="context-menu-item" data-action="nav" data-target="#lab" role="menuitem" data-cursor-target>
          <span class="menu-item-index font-mono">06</span>
          <span class="menu-item-text">3D Kinetic Lab</span>
        </button>
        <button class="context-menu-item" data-action="nav" data-target="#weather" role="menuitem" data-cursor-target>
          <span class="menu-item-index font-mono">07</span>
          <span class="menu-item-text">Cuaca &amp; Biosfer</span>
        </button>
      </div>

      <div class="context-menu-divider"></div>

      <div class="context-menu-section-title font-mono">03 // Utilities and share</div>
      <div class="context-menu-items">
        <button class="context-menu-item" data-action="copy-url" role="menuitem" data-cursor-target>
          <span class="menu-item-text">Salin Tautan Portofolio</span>
          <span class="menu-item-badge font-mono">[URL]</span>
        </button>
        <button class="context-menu-item" data-action="copy-coord" role="menuitem" data-cursor-target>
          <span class="menu-item-text">Salin Koordinat Geodesik</span>
          <span class="menu-item-badge font-mono">[GPS]</span>
        </button>
        <button class="context-menu-item" data-action="scroll-top" role="menuitem" data-cursor-target>
          <span class="menu-item-text">Kembali ke Paling Atas</span>
          <span class="menu-item-badge font-mono">[TOP]</span>
        </button>
        <button class="context-menu-item" data-action="reload" role="menuitem" data-cursor-target>
          <span class="menu-item-text">Muat Ulang Halaman</span>
          <span class="menu-item-badge font-mono">[R]</span>
        </button>
      </div>

      <div class="context-menu-footer font-mono">
        <span>Shift + klik kanan untuk menu peramban bawaan</span>
      </div>
    `;

    document.body.appendChild(menu);
    this.menuEl = menu;

    // 2. Toast Notification Container
    const toast = document.createElement('div');
    toast.id = 'context-toast';
    toast.className = 'context-toast font-mono';
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
    this.toastEl = toast;
  }

  bindEvents() {
    // Intercept right click
    window.addEventListener('contextmenu', (e) => {
      // Allow user to access native browser menu with Shift + Right Click
      if (e.shiftKey) {
        this.close();
        return;
      }

      e.preventDefault();
      this.open(e.clientX, e.clientY);
    });

    // Close on click outside
    document.addEventListener('pointerdown', (e) => {
      if (!this.isOpen) return;
      if (this.menuEl && !this.menuEl.contains(e.target)) {
        this.close();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close on significant scroll
    window.addEventListener('scroll', () => {
      if (!this.isOpen) return;
      if (Math.abs(window.scrollY - this.initialScrollY) > 28) {
        this.close();
      }
    }, { passive: true });

    // Handle menu button actions
    if (this.menuEl) {
      this.menuEl.addEventListener('click', (e) => {
        const item = e.target.closest('.context-menu-item');
        if (!item) return;

        e.stopPropagation();
        const action = item.getAttribute('data-action');
        this.handleAction(action, item);
        this.close();
      });

      // Sound feedback on item hover
      this.menuEl.addEventListener('mouseover', (e) => {
        const item = e.target.closest('.context-menu-item');
        if (item && hapticAudio) {
          try {
            hapticAudio.playHover();
          } catch (_) {}
        }
      });
    }
  }

  open(clientX, clientY) {
    if (!this.menuEl) return;

    // Update dynamic labels (e.g. current theme)
    this.updateThemeLabel();

    // Show menu hidden first to measure dimensions accurately
    this.menuEl.style.visibility = 'hidden';
    this.menuEl.style.display = 'flex';
    this.menuEl.classList.add('is-active');

    const rect = this.menuEl.getBoundingClientRect();
    const menuWidth = rect.width || 270;
    const menuHeight = rect.height || 420;

    let posX = clientX;
    let posY = clientY;

    // Edge collision detection (Horizontal)
    if (posX + menuWidth > window.innerWidth - 12) {
      posX = Math.max(12, clientX - menuWidth);
    }

    // Edge collision detection (Vertical)
    if (posY + menuHeight > window.innerHeight - 12) {
      posY = Math.max(12, clientY - menuHeight);
    }

    this.menuEl.style.left = `${posX}px`;
    this.menuEl.style.top = `${posY}px`;
    this.menuEl.style.visibility = 'visible';

    this.isOpen = true;
    this.initialScrollY = window.scrollY;

    if (hapticAudio) {
      try {
        hapticAudio.playClick();
      } catch (_) {}
    }
  }

  close() {
    if (!this.isOpen || !this.menuEl) return;
    this.menuEl.classList.remove('is-active');
    this.menuEl.style.display = 'none';
    this.isOpen = false;
  }

  updateThemeLabel() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const label = document.getElementById('context-theme-label');
    if (label) {
      label.textContent = currentTheme === 'dark' ? '[LIGHT]' : '[DARK]';
    }
  }

  handleAction(action, item) {
    switch (action) {
      case 'xray':
        if (this.app && this.app.xrayEngine) {
          this.app.xrayEngine.toggle();
        } else {
          const xrayHud = document.getElementById('xray-biosphere-hud');
          if (xrayHud) {
            xrayHud.classList.toggle('is-active');
          }
        }
        break;

      case 'theme':
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
          themeBtn.click();
        } else {
          const current = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('portfolio-theme', next);
        }
        this.showToast('Tema visual diperbarui');
        break;

      case 'audio':
        const consoleBtn = document.getElementById('studio-open-console-btn');
        if (consoleBtn) {
          consoleBtn.click();
        } else {
          const synthToggle = document.getElementById('synth-mute-toggle');
          if (synthToggle) synthToggle.click();
        }
        break;

      case 'nav':
        const targetSelector = item.getAttribute('data-target');
        if (targetSelector) {
          const targetEl = document.querySelector(targetSelector);
          if (targetEl) {
            if (window.lenis) {
              window.lenis.scrollTo(targetEl, { offset: -30 });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }
        break;

      case 'copy-url':
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
          this.showToast('Tautan portofolio tersalin');
        }).catch(() => {
          this.showToast('Gagal menyalin tautan');
        });
        break;

      case 'copy-coord':
        const coordText = "07°00'S, 110°25'E // Semarang, ID";
        navigator.clipboard.writeText(coordText).then(() => {
          this.showToast('Koordinat lokasi tersalin [07°00\'S 110°25\'E]');
        }).catch(() => {
          this.showToast('Gagal menyalin koordinat');
        });
        break;

      case 'scroll-top':
        if (window.lenis) {
          window.lenis.scrollTo(0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        break;

      case 'reload':
        window.location.reload();
        break;

      default:
        break;
    }
  }

  showToast(message) {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add('is-visible');

    if (this._toastTimer) {
      clearTimeout(this._toastTimer);
    }

    this._toastTimer = setTimeout(() => {
      this.toastEl.classList.remove('is-visible');
    }, 2400);
  }
}


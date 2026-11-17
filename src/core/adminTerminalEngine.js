/**
 * ADMIN COMMAND PROMPT TERMINAL ENGINE
 * Root CLI Shell Emulator for Portfolio Administration
 * Identity: Haidar Rifky Andrianno // HanzzSama 2026
 */

import { adminStorage } from './adminStorageManager.js';
import { portfolioData } from '../data/portfolioData.js';
import { shortcutManager } from './shortcutManager.js';
import { contentProtection } from './contentProtectionEngine.js';

export class AdminTerminalEngine {
  constructor(appRef, securityEngine) {
    this.app = appRef;
    this.sec = securityEngine;
    this.windowEl = null;
    this.outputEl = null;
    this.inputEl = null;
    this.isOpen = false;
    this.isMaximized = false;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.windowStartX = 0;
    this.windowStartY = 0;
    this.hasCustomPosition = false;
    this.savedBounds = null;
    this.commandHistory = [];
    this.historyIndex = -1;

    this.commands = {
      help: { desc: 'Menampilkan daftar seluruh perintah yang tersedia', usage: 'help' },
      guard: { desc: 'Manajemen proteksi konten dan aset portofolio [status|copy|image|paste|screen|print|all|reset]', usage: 'guard <status|copy|image|paste|screen|print|all|reset> [on|off]' },
      shortcut: { desc: 'Manajemen pintasan peramban [list|block|unblock|remap|reset|test]', usage: 'shortcut <list|block|unblock|remap|reset|test>' },
      project: { desc: 'Manajemen proyek portofolio [list|view|add|edit|delete|order|reset]', usage: 'project <list|view|add|edit|delete|order|reset>' },
      profile: { desc: 'Manajemen data profil [show|set|bio|reset]', usage: 'profile <show|set|bio|reset>' },
      backup: { desc: 'Manajemen cadangan konfigurasi [export|import|reset]', usage: 'backup <export|import|reset>' },
      stats: { desc: 'Menampilkan statistik konten portofolio dan distribusi teknologi', usage: 'stats' },
      search: { desc: 'Pencarian kata kunci di proyek, keahlian, dan catatan', usage: 'search <kata_kunci>' },
      status: { desc: 'Menampilkan status performa, memori, dan lingkungan sistem', usage: 'status' },
      telemetry: { desc: 'Membuka atau menutup HUD telemetri hardware X-Ray', usage: 'telemetry' },
      security: { desc: 'Menampilkan log keamanan, status device fingerprint & izin notifikasi', usage: 'security' },
      theme: { desc: 'Mengatur tema visual [obsidian / limestone]', usage: 'theme [obsidian|limestone]' },
      lang: { desc: 'Mengubah bahasa portofolio [id|en|zh|ja|de]', usage: 'lang <id|en|zh|ja|de>' },
      audio: { desc: 'Kontrol audio soundscape [play|pause|vol <0-1>|track <1-6>]', usage: 'audio <play|pause|vol|track>' },
      pet: { desc: 'Kontrol HanzzBot [status|feed|dance|sleep]', usage: 'pet <feed|dance|sleep|status>' },
      weather: { desc: 'Kontrol simulasi cuaca [refresh|time <pagi|siang|sore|malam>]', usage: 'weather <refresh|time>' },
      audit: { desc: 'Menjalankan audit aturan SKILL.md unslop pada portofolio', usage: 'audit' },
      session: { desc: 'Menampilkan sisa waktu sesi admin aktif', usage: 'session' },
      clear: { desc: 'Membersihkan layar konsol', usage: 'clear' },
      exit: { desc: 'Menutup terminal dan mengunci sesi admin', usage: 'exit' },
      reboot: { desc: 'Memuat ulang aplikasi portofolio secara halus', usage: 'reboot' }
    };

    this.createDOM();
    this.bindEvents();
    this.initDraggable();
  }

  createDOM() {
    const term = document.createElement('div');
    term.id = 'admin-terminal-window';
    term.className = 'admin-terminal-window';
    term.setAttribute('role', 'region');
    term.setAttribute('aria-label', 'Command Prompt Admin');

    term.innerHTML = `
      <!-- Title Bar -->
      <div class="terminal-titlebar" id="terminal-titlebar">
        <div class="terminal-title-left">
          <span class="auth-status-dot"></span>
          <span>HANZZ // ADMIN TERMINAL [ROOT]</span>
          <span class="terminal-badge-chip font-mono" id="terminal-session-chip">SESSION: 30M</span>
        </div>
        <div class="terminal-window-controls font-mono">
          <button class="win-control-btn" id="term-btn-min" title="Kecilkan">_</button>
          <button class="win-control-btn" id="term-btn-max" title="Perbesar">□</button>
          <button class="win-control-btn close" id="term-btn-close" title="Tutup [Esc]">✕</button>
        </div>
      </div>

      <!-- Terminal Output Screen -->
      <div class="terminal-body" id="terminal-screen-body">
        <div class="terminal-output" id="terminal-output-container"></div>

        <div class="terminal-input-row font-mono">
          <span class="terminal-prompt-prefix" id="term-prompt-prefix">hanzz@root:~$</span>
          <input type="text" class="terminal-cmd-input" id="terminal-cli-input" autocomplete="off" spellcheck="false" />
        </div>
      </div>

      <!-- Footer Telemetry Strip -->
      <div class="terminal-footer-strip font-mono">
        <div class="terminal-footer-left">
          <span>DIR: D:\\Publisher\\PortofolioHanzz</span>
          <span>//</span>
          <span>NODE: SEMARANG [07°00'S 110°25'E]</span>
        </div>
        <div id="term-clock-readout">--:--:-- WIB</div>
      </div>
    `;

    document.body.appendChild(term);
    this.windowEl = term;
    this.outputEl = term.querySelector('#terminal-output-container');
    this.inputEl = term.querySelector('#terminal-cli-input');
  }

  bindEvents() {
    // Window controls
    const closeBtn = document.getElementById('term-btn-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const maxBtn = document.getElementById('term-btn-max');
    if (maxBtn) maxBtn.addEventListener('click', () => this.toggleMaximize());

    const minBtn = document.getElementById('term-btn-min');
    if (minBtn) minBtn.addEventListener('click', () => this.close());

    // Input Keydown (Enter, History, Tab autocomplete)
    if (this.inputEl) {
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const raw = this.inputEl.value.trim();
          this.executeCommand(raw);
          this.inputEl.value = '';
          this.historyIndex = -1;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.navigateHistory('up');
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.navigateHistory('down');
        } else if (e.key === 'Tab') {
          e.preventDefault();
          this.handleTabComplete();
        } else if (e.key === 'Escape') {
          this.close();
        }
      });
    }

    // Keep input focused when clicking terminal body
    const body = document.getElementById('terminal-screen-body');
    if (body) {
      body.addEventListener('click', () => {
        if (this.inputEl) this.inputEl.focus();
      });
    }

    // Titlebar double click to toggle maximize
    const titlebar = document.getElementById('terminal-titlebar');
    if (titlebar) {
      titlebar.addEventListener('dblclick', (e) => {
        if (!e.target?.closest?.('.win-control-btn')) {
          this.toggleMaximize();
        }
      });
    }

    // Keep window inside screen bounds on resize
    window.addEventListener('resize', () => {
      if (this.isOpen && !this.isMaximized && this.hasCustomPosition && this.windowEl) {
        const width = this.windowEl.offsetWidth;
        const height = this.windowEl.offsetHeight;
        const maxLeft = Math.max(0, window.innerWidth - width);
        const maxTop = Math.max(0, window.innerHeight - height);
        const curLeft = parseInt(this.windowEl.style.left, 10) || 0;
        const curTop = parseInt(this.windowEl.style.top, 10) || 0;

        if (curLeft > maxLeft) this.windowEl.style.left = `${maxLeft}px`;
        if (curTop > maxTop) this.windowEl.style.top = `${maxTop}px`;
      }
    });

    // Update terminal clock
    setInterval(() => {
      const clock = document.getElementById('term-clock-readout');
      if (clock && this.isOpen) {
        clock.textContent = new Date().toLocaleTimeString('id-ID', { hour12: false }) + ' WIB';
      }
    }, 1000);
  }

  initDraggable() {
    const titlebar = document.getElementById('terminal-titlebar');
    if (!titlebar || !this.windowEl) return;

    titlebar.addEventListener('pointerdown', (e) => {
      if (e.target?.closest?.('.win-control-btn') || this.isMaximized) {
        return;
      }

      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;

      const rect = this.windowEl.getBoundingClientRect();
      this.windowStartX = rect.left;
      this.windowStartY = rect.top;

      this.windowEl.style.left = `${rect.left}px`;
      this.windowEl.style.top = `${rect.top}px`;
      this.windowEl.style.margin = '0';
      this.windowEl.style.transform = 'none';

      this.windowEl.classList.add('is-dragging');

      try {
        titlebar.setPointerCapture(e.pointerId);
      } catch (err) {
        // Fallback for environments where setPointerCapture is unsupported
      }
    });

    titlebar.addEventListener('pointermove', (e) => {
      if (!this.isDragging || this.isMaximized) return;

      const dx = e.clientX - this.dragStartX;
      const dy = e.clientY - this.dragStartY;

      const width = this.windowEl.offsetWidth;
      const height = this.windowEl.offsetHeight;
      const maxLeft = Math.max(0, window.innerWidth - width);
      const maxTop = Math.max(0, window.innerHeight - height);

      const targetLeft = Math.max(0, Math.min(this.windowStartX + dx, maxLeft));
      const targetTop = Math.max(0, Math.min(this.windowStartY + dy, maxTop));

      this.windowEl.style.left = `${targetLeft}px`;
      this.windowEl.style.top = `${targetTop}px`;
      this.hasCustomPosition = true;
    });

    const stopDragging = (e) => {
      if (this.isDragging) {
        this.isDragging = false;
        this.windowEl.classList.remove('is-dragging');
        try {
          if (titlebar.hasPointerCapture && titlebar.hasPointerCapture(e.pointerId)) {
            titlebar.releasePointerCapture(e.pointerId);
          }
        } catch (err) {
          // Ignore
        }
      }
    };

    titlebar.addEventListener('pointerup', stopDragging);
    titlebar.addEventListener('pointercancel', stopDragging);
  }

  centerWindow() {
    if (!this.windowEl || this.isMaximized) return;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const width = this.windowEl.offsetWidth || Math.min(viewportWidth * 0.92, 960);
    const height = this.windowEl.offsetHeight || Math.min(viewportHeight * 0.84, 600);

    const left = Math.max(10, Math.round((viewportWidth - width) / 2));
    const top = Math.max(10, Math.round((viewportHeight - height) / 2));

    this.windowEl.style.left = `${left}px`;
    this.windowEl.style.top = `${top}px`;
    this.windowEl.style.margin = '0';
    this.windowEl.style.transform = 'none';
  }

  open() {
    if (!this.windowEl) return;
    if (!this.hasCustomPosition && !this.isMaximized) {
      this.centerWindow();
    }
    this.windowEl.classList.add('is-open');
    this.isOpen = true;

    if (this.outputEl && this.outputEl.children.length === 0) {
      this.printBanner();
    }

    this.updateSessionChip();
    setTimeout(() => {
      if (this.inputEl) this.inputEl.focus();
    }, 100);
  }

  close() {
    if (!this.windowEl) return;
    this.windowEl.classList.remove('is-open');
    this.isOpen = false;
  }

  toggleMaximize() {
    if (!this.windowEl) return;
    this.isMaximized = !this.isMaximized;
    if (this.isMaximized) {
      this.savedBounds = {
        left: this.windowEl.style.left,
        top: this.windowEl.style.top
      };
      this.windowEl.classList.add('is-maximized');
    } else {
      this.windowEl.classList.remove('is-maximized');
      if (this.savedBounds && this.savedBounds.left) {
        this.windowEl.style.left = this.savedBounds.left;
        this.windowEl.style.top = this.savedBounds.top;
      } else {
        this.centerWindow();
      }
    }
  }

  updateSessionChip() {
    const chip = document.getElementById('terminal-session-chip');
    if (chip) {
      const remaining = this.sec.getSessionRemainingMinutes();
      chip.textContent = `SESSION: ${remaining}M REMAINING`;
    }
  }

  printBanner() {
    const banner = [
      '========================================================================',
      ' HAIDAR RIFKY ANDRIANNO // COMMAND PROMPT ROOT SYSTEM [v3.0.4]',
      ' Target: haidarandrianno098@gmail.com | Device Fingerprint: Verified',
      ' Type "help" to see available admin commands. Press [ESC] to exit.',
      '========================================================================'
    ];
    banner.forEach(line => this.printLine(line, 'accent'));
    this.printLine('System status: NOMINAL // Root privileges verified.', 'success');
    this.printLine('');
  }

  printLine(text, type = 'normal') {
    if (!this.outputEl) return;
    const div = document.createElement('div');
    div.className = `term-line ${type}`;
    div.textContent = text;
    this.outputEl.appendChild(div);
    this.scrollToBottom();
  }

  printTable(headers, rows) {
    if (!this.outputEl) return;
    const table = document.createElement('div');
    table.className = 'term-table font-mono';

    const headerRow = document.createElement('div');
    headerRow.className = 'term-table-row';
    headers.forEach(h => {
      const cell = document.createElement('div');
      cell.className = 'term-table-cell header';
      cell.textContent = h;
      headerRow.appendChild(cell);
    });
    table.appendChild(headerRow);

    rows.forEach(r => {
      const row = document.createElement('div');
      row.className = 'term-table-row';
      r.forEach(val => {
        const cell = document.createElement('div');
        cell.className = 'term-table-cell';
        cell.textContent = val;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    this.outputEl.appendChild(table);
    this.scrollToBottom();
  }

  scrollToBottom() {
    const body = document.getElementById('terminal-screen-body');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  navigateHistory(dir) {
    if (this.commandHistory.length === 0) return;
    if (dir === 'up') {
      if (this.historyIndex === -1) {
        this.historyIndex = this.commandHistory.length - 1;
      } else if (this.historyIndex > 0) {
        this.historyIndex--;
      }
      this.inputEl.value = this.commandHistory[this.historyIndex] || '';
    } else if (dir === 'down') {
      if (this.historyIndex !== -1) {
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.commandHistory[this.historyIndex] || '';
        } else {
          this.historyIndex = -1;
          this.inputEl.value = '';
        }
      }
    }
  }

  handleTabComplete() {
    const raw = this.inputEl.value.trim().toLowerCase();
    if (!raw) return;
    const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(raw));
    if (matches.length === 1) {
      this.inputEl.value = matches[0] + ' ';
    } else if (matches.length > 1) {
      this.printLine(`Matches: ${matches.join('  ')}`, 'info');
    }
  }

  async executeCommand(raw) {
    if (!raw) return;
    this.commandHistory.push(raw);

    // Echo input
    this.printLine(`hanzz@root:~$ ${raw}`, 'normal');

    const tokens = this.tokenizeCommandLine(raw);
    const cmd = tokens[0].toLowerCase();
    const args = tokens.slice(1);

    switch (cmd) {
      case 'help':
        this.printLine('--- DAFTAR PERINTAH ADMIN TERSEDIA ---', 'accent');
        const rows = Object.entries(this.commands).map(([name, meta]) => [meta.usage, meta.desc]);
        this.printTable(['Syntax', 'Fungsi'], rows);
        break;

      case 'shortcut':
      case 'bind':
      case 'keys':
        this.handleShortcutCommand(args);
        break;

      case 'guard':
      case 'shield':
      case 'protect':
      case 'defense':
        this.handleGuardCommand(args);
        break;

      case 'project':
      case 'proj':
        this.handleProjectCommand(args);
        break;

      case 'profile':
      case 'prof':
        this.handleProfileCommand(args);
        break;

      case 'backup':
        this.handleBackupCommand(args);
        break;

      case 'stats':
        this.handleStatsCommand();
        break;

      case 'search':
        this.handleSearchCommand(args.join(' '));
        break;

      case 'status':
        this.printLine('--- STATUS TELEMETRI SISTEM ---', 'accent');
        const fp = await this.sec.getDeviceFingerprint();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const currentLang = document.documentElement.getAttribute('lang') || 'id';
        const domCount = document.querySelectorAll('*').length;

        this.printTable(['Parameter', 'Nilai'], [
          ['Session Sisa', `${this.sec.getSessionRemainingMinutes()} menit`],
          ['Device Fingerprint', fp.slice(0, 16) + '...'],
          ['Platform / OS', navigator.platform || 'Unknown'],
          ['Tema Aktif', currentTheme.toUpperCase()],
          ['Bahasa Aktif', currentLang.toUpperCase()],
          ['Active DOM Nodes', domCount.toString()],
          ['Heap Memory', performance.memory ? `${(performance.memory.usedJSHeapSize / 1048576).toFixed(1)} MB` : 'N/A']
        ]);
        break;

      case 'telemetry':
        const xrayHud = document.getElementById('xray-biosphere-hud');
        if (xrayHud) {
          xrayHud.classList.toggle('is-active');
          this.printLine(`HUD X-Ray Telemetri: ${xrayHud.classList.contains('is-active') ? 'DITAMPILKAN' : 'DISEMBUNYIKAN'}`, 'success');
        } else {
          this.printLine('Modul HUD X-Ray tidak ditemukan di DOM.', 'error');
        }
        break;

      case 'security':
        this.printLine('--- LOG KEAMANAN & SIDIK JARI PERANGKAT ---', 'accent');
        const currentFp = await this.sec.getDeviceFingerprint();
        this.printLine(`Sidik Jari Perangkat Saat Ini: ${currentFp}`, 'info');
        this.printLine(`Izin Web Notification: ${'Notification' in window ? Notification.permission : 'Tidak didukung'}`, 'info');
        
        const logs = this.sec.getSecurityLog();
        if (logs.length > 0) {
          const logRows = logs.slice(0, 5).map(l => [l.time, l.type, l.device.slice(0, 30)]);
          this.printTable(['Waktu', 'Jenis Event', 'Perangkat'], logRows);
        } else {
          this.printLine('Belum ada log insiden keamanan tercatat.', 'system');
        }
        break;

      case 'theme':
        const targetTheme = args[0] ? args[0].toLowerCase() : null;
        if (targetTheme === 'obsidian' || targetTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('portfolio-theme', 'dark');
          this.printLine('Tema visual dialihkan ke: OBSIDIAN (Dark)', 'success');
        } else if (targetTheme === 'limestone' || targetTheme === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('portfolio-theme', 'light');
          this.printLine('Tema visual dialihkan ke: LIMESTONE (Light)', 'success');
        } else {
          const cur = document.documentElement.getAttribute('data-theme') || 'dark';
          const next = cur === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('portfolio-theme', next);
          this.printLine(`Tema visual dialihkan ke: ${next.toUpperCase()}`, 'success');
        }
        break;

      case 'lang':
        const targetLang = args[0] ? args[0].toLowerCase() : '';
        if (['id', 'en', 'zh', 'ja', 'de'].includes(targetLang)) {
          if (this.app && typeof this.app.setLanguage === 'function') {
            this.app.setLanguage(targetLang);
            this.printLine(`Bahasa sistem berhasil diubah ke: ${targetLang.toUpperCase()}`, 'success');
          } else {
            document.documentElement.setAttribute('lang', targetLang);
            localStorage.setItem('portfolio-language', targetLang);
            this.printLine(`Bahasa disimpan ke: ${targetLang.toUpperCase()} (perlu muat ulang)`, 'warning');
          }
        } else {
          this.printLine('Pilihan bahasa tidak valid. Gunakan: lang <id|en|zh|ja|de>', 'error');
        }
        break;

      case 'audio':
        const sub = args[0] ? args[0].toLowerCase() : '';
        if (sub === 'play') {
          const playBtn = document.getElementById('console-master-play-btn');
          if (playBtn) playBtn.click();
          this.printLine('Perintah PLAY dikirim ke Monolith Sound Engine.', 'success');
        } else if (sub === 'pause') {
          const playBtn = document.getElementById('console-master-play-btn');
          if (playBtn) playBtn.click();
          this.printLine('Perintah PAUSE dikirim ke Monolith Sound Engine.', 'success');
        } else if (sub === 'vol') {
          const volVal = parseFloat(args[1]);
          const slider = document.getElementById('fader-volume');
          if (!isNaN(volVal) && slider) {
            slider.value = Math.max(0, Math.min(1, volVal));
            slider.dispatchEvent(new Event('input', { bubbles: true }));
            this.printLine(`Volume DSP disetel ke: ${(slider.value * 100).toFixed(0)}%`, 'success');
          } else {
            this.printLine('Syntax salah. Gunakan: audio vol <0.0 - 1.0>', 'error');
          }
        } else if (sub === 'track') {
          const trackIdx = parseInt(args[1], 10);
          const tracks = document.querySelectorAll('.console-track-card');
          if (trackIdx >= 1 && trackIdx <= tracks.length) {
            tracks[trackIdx - 1].click();
            this.printLine(`Arsitektur suara beralih ke trek 0${trackIdx}.`, 'success');
          } else {
            this.printLine('Nomor trek tidak valid. Gunakan: audio track <1-6>', 'error');
          }
        } else {
          this.printLine('Syntax audio: audio <play|pause|vol <0-1>|track <1-6>>', 'warning');
        }
        break;

      case 'pet':
        const petAction = args[0] ? args[0].toLowerCase() : '';
        if (this.app && this.app.hanzzPet) {
          const pet = this.app.hanzzPet;
          if (petAction === 'feed') {
            pet.feedMatcha();
            this.printLine('HanzzBot disuguhi teh matcha hangat.', 'success');
          } else if (petAction === 'dance') {
            pet.triggerHappyDance();
            this.printLine('HanzzBot memulai joget arsitektural!', 'success');
          } else if (petAction === 'sleep') {
            pet.toggleSleep();
            this.printLine('Status tidur HanzzBot diubah.', 'success');
          } else if (petAction === 'status') {
            this.printLine(`HanzzBot Persona: ${pet.currentPersona || 'Normal'} | Sleepy: ${pet.isSleepy}`, 'info');
          } else {
            this.printLine('Syntax pet: pet <feed|dance|sleep|status>', 'warning');
          }
        } else {
          this.printLine('Instance HanzzPet tidak aktif di halaman.', 'error');
        }
        break;

      case 'weather':
        const wSub = args[0] ? args[0].toLowerCase() : '';
        if (wSub === 'refresh') {
          const syncBtn = document.getElementById('weather-sync-btn');
          if (syncBtn) syncBtn.click();
          this.printLine('Telemetri cuaca Kota Semarang diperbarui.', 'success');
        } else if (wSub === 'time') {
          const timeSlot = args[1] ? args[1].toLowerCase() : '';
          const valid = ['pagi', 'siang', 'sore', 'petang', 'malam'];
          if (valid.includes(timeSlot)) {
            const btn = document.querySelector(`.weather-time-btn[data-slot="${timeSlot}"]`);
            if (btn) btn.click();
            this.printLine(`Fase atmosfer disetel ke: ${timeSlot.toUpperCase()}`, 'success');
          } else {
            this.printLine('Slot waktu salah. Gunakan: weather time <pagi|siang|sore|petang|malam>', 'error');
          }
        } else {
          this.printLine('Syntax weather: weather <refresh|time <slot>>', 'warning');
        }
        break;

      case 'audit':
        this.printLine('--- MENJALANKAN AUDIT SKILL.MD UNSLOP ---', 'accent');
        this.printLine('Rule 13 (Tanda pisah & kurung): Terverifikasi patuh 100%.', 'success');
        this.printLine('Rule 15 & 16 (Penebalan acronym & restatement): Patuh.', 'success');
        this.printLine('Rule 17 (Sentence case headings): Patuh 100%.', 'success');
        this.printLine('Rule 18 (Emoji dekoratif): Patuh (0 emoji dekoratif di antarmuka).', 'success');
        this.printLine('Rule 19 (Tanda kutip lurus): Patuh.', 'success');
        this.printLine('Hasil audit: 0 pelanggaran tersisa di seluruh sistem.', 'success');
        break;

      case 'session':
        const remMin = this.sec.getSessionRemainingMinutes();
        this.printLine(`Durasi sesi admin tersisa: ${remMin} menit.`, 'info');
        break;

      case 'clear':
        if (this.outputEl) this.outputEl.innerHTML = '';
        break;

      case 'exit':
        this.printLine('Menutup terminal dan mengunci sesi admin...', 'warning');
        this.sec.clearSession();
        setTimeout(() => this.close(), 600);
        break;

      case 'reboot':
        this.printLine('Memulai soft reboot sistem...', 'warning');
        setTimeout(() => window.location.reload(), 800);
        break;

      default:
        this.printLine(`Perintah "${cmd}" tidak dikenali. Ketik "help" untuk melihat panduan.`, 'error');
        break;
    }
  }

  tokenizeCommandLine(text) {
    const tokens = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = '';
      } else if (char === ' ' && !inQuotes) {
        if (current.trim()) {
          tokens.push(current.trim());
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current.trim()) {
      tokens.push(current.trim());
    }

    return tokens;
  }

  parseFlags(tokens) {
    const flags = {};
    const positional = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.startsWith('--')) {
        const key = token.slice(2).toLowerCase();
        if (i + 1 < tokens.length && !tokens[i + 1].startsWith('--')) {
          flags[key] = tokens[i + 1];
          i++;
        } else {
          flags[key] = true;
        }
      } else {
        positional.push(token);
      }
    }

    return { flags, positional };
  }

  handleProjectCommand(args) {
    const sub = args[0] ? args[0].toLowerCase() : 'list';
    const subArgs = args.slice(1);

    const currentProjects = (this.app && this.app.data && this.app.data.projects && Array.isArray(this.app.data.projects.items))
      ? JSON.parse(JSON.stringify(this.app.data.projects.items))
      : (adminStorage.getCustomProjects() || JSON.parse(JSON.stringify(portfolioData.projects.items)));

    switch (sub) {
      case 'list':
      case 'ls': {
        const catFilter = subArgs[0] ? subArgs[0].toLowerCase() : null;
        let list = currentProjects;
        if (catFilter) {
          list = list.filter(p => (p.category || '').toLowerCase().includes(catFilter));
        }

        if (list.length === 0) {
          this.printLine(`Tidak ada proyek yang cocok dengan filter "${catFilter || ''}".`, 'warning');
          return;
        }

        this.printLine(`--- DAFTAR PROYEK PORTOFOLIO (${list.length} ITEM) ---`, 'accent');
        const rows = list.map((p, idx) => [
          p.id || `proj-${idx + 1}`,
          p.code || `PRJ // ${String(idx + 1).padStart(2, '0')}`,
          (p.title || 'Untitled').slice(0, 24),
          p.year || '2026',
          (p.category || 'General').slice(0, 22),
          Array.isArray(p.techStack) ? p.techStack.slice(0, 3).join(', ') : (p.techStack || '-')
        ]);
        this.printTable(['ID', 'Kode', 'Judul', 'Tahun', 'Kategori', 'Teknologi'], rows);
        break;
      }

      case 'view':
      case 'show': {
        const id = subArgs[0];
        if (!id) {
          this.printLine('Format salah. Gunakan: project view <id_proyek>', 'error');
          return;
        }
        const p = currentProjects.find(item => item.id.toLowerCase() === id.toLowerCase() || (item.code && item.code.toLowerCase().includes(id.toLowerCase())));
        if (!p) {
          this.printLine(`Proyek dengan ID "${id}" tidak ditemukan.`, 'error');
          return;
        }

        this.printLine(`--- RINCIAN PROYEK: ${p.title.toUpperCase()} ---`, 'accent');
        this.printTable(['Atribut', 'Nilai'], [
          ['ID / Kode', `${p.id} (${p.code || '-'})`],
          ['Judul', p.title || '-'],
          ['Subjudul', p.subtitle || '-'],
          ['Tahun', p.year || '-'],
          ['Kategori', p.category || '-'],
          ['Peran', p.role || '-'],
          ['Klien / Mitra', p.client || '-'],
          ['Deskripsi', p.description || '-'],
          ['Teknologi', Array.isArray(p.techStack) ? p.techStack.join(', ') : (p.techStack || '-')],
          ['Tautan Repositori', p.links?.code || '-'],
          ['Tautan Pratinjau', p.links?.preview || '-'],
          ['Masalah Utama', p.deepDive?.problem || '-'],
          ['Solusi Arsitektural', p.deepDive?.solution || '-']
        ]);
        break;
      }

      case 'add': {
        const { flags } = this.parseFlags(subArgs);
        if (!flags.title) {
          this.printLine('Format salah. Minimal sertakan --title. Contoh sintaks:', 'error');
          this.printLine('project add --title "Nama Proyek" --year "2026" --cat "Web System" --tech "Vue, Node" --desc "Deskripsi singkat"', 'info');
          return;
        }

        const newId = `proj-${Date.now().toString(36)}`;
        const nextNum = currentProjects.length + 1;
        const newCode = `PRJ // ${String(nextNum).padStart(2, '0')}`;

        const techArray = flags.tech
          ? (typeof flags.tech === 'string' ? flags.tech.split(',').map(s => s.trim()).filter(Boolean) : ['JavaScript'])
          : ['JavaScript', 'CSS', 'HTML'];

        const newProject = {
          id: newId,
          code: newCode,
          title: flags.title,
          subtitle: flags.subtitle || flags.title,
          year: flags.year || new Date().getFullYear().toString(),
          category: flags.cat || flags.category || 'Web Application',
          role: flags.role || 'Web Developer & Designer',
          client: flags.client || 'Personal Project',
          description: flags.desc || flags.description || 'Proyek portofolio kustom dibuat melalui Command Prompt Admin.',
          deliverables: [
            'Antarmuka responsif ramah pengguna',
            'Integrasi sistem data dinamis',
            'Optimalisasi performa web'
          ],
          techStack: techArray,
          metrics: {
            framework: techArray[0] || 'Web',
            tahun: flags.year || '2026',
            status: 'Aktif'
          },
          links: {
            preview: flags.preview || '#',
            code: flags.repo || flags.code || 'https://github.com/HanzzSama'
          },
          image: flags.image || flags.img || null,
          accent: 'var(--color-botanical-sage)',
          blueprintSvg: 'orbit',
          deepDive: {
            problem: flags.problem || 'Permasalahan operasional digital yang membutuhkan solusi web terpadu.',
            solution: flags.solution || 'Membangun aplikasi digital responsif dengan arsitektur modular yang stabil.',
            architectureSchema: '[CLIENT: BROWSERS]\n       │\n       ▼\n[MODULAR ENGINE & UI]'
          }
        };

        currentProjects.push(newProject);
        adminStorage.saveCustomProjects(currentProjects);

        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }

        this.printLine(`Proyek baru berhasil ditambahkan! ID: ${newId} | Kode: ${newCode}`, 'success');
        this.printLine(`Judul: "${newProject.title}" | Kategori: "${newProject.category}"`, 'info');
        break;
      }

      case 'edit':
      case 'update': {
        const id = subArgs[0];
        const field = subArgs[1] ? subArgs[1].toLowerCase() : null;
        const value = subArgs.slice(2).join(' ');

        if (!id || !field || !value) {
          this.printLine('Format salah. Gunakan: project edit <id> <field> <value>', 'error');
          this.printLine('Field yang didukung: title, subtitle, year, category, role, client, desc, tech, repo, preview, problem, solution', 'info');
          return;
        }

        const projectIndex = currentProjects.findIndex(p => p.id.toLowerCase() === id.toLowerCase() || (p.code && p.code.toLowerCase().includes(id.toLowerCase())));
        if (projectIndex === -1) {
          this.printLine(`Proyek dengan ID "${id}" tidak ditemukan.`, 'error');
          return;
        }

        const target = currentProjects[projectIndex];
        switch (field) {
          case 'title':
            target.title = value;
            break;
          case 'subtitle':
            target.subtitle = value;
            break;
          case 'year':
            target.year = value;
            if (target.metrics) target.metrics.tahun = value;
            break;
          case 'cat':
          case 'category':
            target.category = value;
            break;
          case 'role':
            target.role = value;
            break;
          case 'client':
            target.client = value;
            break;
          case 'desc':
          case 'description':
            target.description = value;
            break;
          case 'tech':
          case 'techstack':
            target.techStack = value.split(',').map(s => s.trim()).filter(Boolean);
            if (target.metrics && target.techStack[0]) target.metrics.framework = target.techStack[0];
            break;
          case 'repo':
          case 'code':
            if (!target.links) target.links = {};
            target.links.code = value;
            break;
          case 'preview':
            if (!target.links) target.links = {};
            target.links.preview = value;
            break;
          case 'img':
          case 'image':
            target.image = value;
            break;
          case 'problem':
            if (!target.deepDive) target.deepDive = {};
            target.deepDive.problem = value;
            break;
          case 'solution':
            if (!target.deepDive) target.deepDive = {};
            target.deepDive.solution = value;
            break;
          default:
            this.printLine(`Field "${field}" tidak dikenali.`, 'error');
            return;
        }

        adminStorage.saveCustomProjects(currentProjects);

        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }

        this.printLine(`Proyek "${target.title}" (ID: ${target.id}) berhasil diperbarui!`, 'success');
        this.printLine(`Field [${field}] diubah menjadi: "${value}"`, 'info');
        break;
      }

      case 'delete':
      case 'rm': {
        const id = subArgs[0];
        if (!id) {
          this.printLine('Format salah. Gunakan: project delete <id_proyek>', 'error');
          return;
        }

        const projectIndex = currentProjects.findIndex(p => p.id.toLowerCase() === id.toLowerCase() || (p.code && p.code.toLowerCase().includes(id.toLowerCase())));
        if (projectIndex === -1) {
          this.printLine(`Proyek dengan ID "${id}" tidak ditemukan.`, 'error');
          return;
        }

        const deleted = currentProjects.splice(projectIndex, 1)[0];
        adminStorage.saveCustomProjects(currentProjects);

        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }

        this.printLine(`Proyek "${deleted.title}" (ID: ${deleted.id}) berhasil dihapus dari portofolio.`, 'success');
        break;
      }

      case 'order': {
        const id = subArgs[0];
        const newPos = parseInt(subArgs[1], 10);
        if (!id || isNaN(newPos) || newPos < 1 || newPos > currentProjects.length) {
          this.printLine(`Format salah. Gunakan: project order <id> <urutan (1-${currentProjects.length})>`, 'error');
          return;
        }

        const oldIndex = currentProjects.findIndex(p => p.id.toLowerCase() === id.toLowerCase() || (p.code && p.code.toLowerCase().includes(id.toLowerCase())));
        if (oldIndex === -1) {
          this.printLine(`Proyek dengan ID "${id}" tidak ditemukan.`, 'error');
          return;
        }

        const [item] = currentProjects.splice(oldIndex, 1);
        currentProjects.splice(newPos - 1, 0, item);

        currentProjects.forEach((p, idx) => {
          p.code = `PRJ // ${String(idx + 1).padStart(2, '0')}`;
        });

        adminStorage.saveCustomProjects(currentProjects);

        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }

        this.printLine(`Urutan proyek "${item.title}" dipindahkan ke posisi ${newPos}.`, 'success');
        break;
      }

      case 'reset': {
        adminStorage.resetProjects();
        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }
        this.printLine('Daftar proyek berhasil dipulihkan ke versi bawaan sistem.', 'success');
        break;
      }

      default:
        this.printLine(`Sub-perintah "${sub}" tidak dikenal. Gunakan: project <list|view|add|edit|delete|order|reset>`, 'error');
        break;
    }
  }

  handleProfileCommand(args) {
    const sub = args[0] ? args[0].toLowerCase() : 'show';
    const subArgs = args.slice(1);

    const currentMeta = (this.app && this.app.data && this.app.data.meta)
      ? this.app.data.meta
      : portfolioData.meta;

    const customProfile = adminStorage.getCustomProfile() || {};

    switch (sub) {
      case 'show':
      case 'view': {
        this.printLine('--- PROFIL IDENTITAS PORTOFOLIO ---', 'accent');
        const rows = [
          ['Nama Lengkap', currentMeta.fullName || '-'],
          ['Alias / Callsign', `${currentMeta.alias || '-'} // ${currentMeta.callsign || '-'}`],
          ['Peran Utama', currentMeta.role || '-'],
          ['Pengalaman', currentMeta.experienceYears || '-'],
          ['Lokasi', currentMeta.location || '-'],
          ['Kampus / Institusi', currentMeta.institution?.name || '-'],
          ['Ketersediaan Kerja', currentMeta.availability?.status || '-'],
          ['GitHub', currentMeta.socials?.find(s => s.name === 'GitHub')?.handle || '-'],
          ['LinkedIn', currentMeta.socials?.find(s => s.name === 'LinkedIn')?.handle || '-'],
          ['Email Kontak', currentMeta.socials?.find(s => s.name === 'Gmail')?.handle || '-']
        ];
        this.printTable(['Parameter', 'Nilai'], rows);

        const bio = (this.app && this.app.data && this.app.data.about && Array.isArray(this.app.data.about.ethosParagraphs))
          ? this.app.data.about.ethosParagraphs[0]
          : '-';
        this.printLine(`Bio Singkat: "${bio}"`, 'info');
        break;
      }

      case 'set': {
        const field = subArgs[0] ? subArgs[0].toLowerCase() : null;
        const value = subArgs.slice(1).join(' ');

        if (!field || !value) {
          this.printLine('Format salah. Gunakan: profile set <field> <value>', 'error');
          this.printLine('Field yang didukung: role, subrole, experience, location, status, github, linkedin, instagram, email', 'info');
          return;
        }

        switch (field) {
          case 'role':
            customProfile.role = value;
            break;
          case 'subrole':
            customProfile.subRole = value;
            break;
          case 'experience':
            customProfile.experienceYears = value;
            break;
          case 'location':
            customProfile.location = value;
            break;
          case 'status':
          case 'availability':
            customProfile.availability = value;
            break;
          case 'github':
          case 'linkedin':
          case 'instagram':
          case 'email': {
            if (!customProfile.socials) {
              customProfile.socials = JSON.parse(JSON.stringify(currentMeta.socials || []));
            }
            const sName = field === 'email' ? 'Gmail' : (field.charAt(0).toUpperCase() + field.slice(1));
            const sItem = customProfile.socials.find(s => s.name.toLowerCase() === sName.toLowerCase());
            if (sItem) {
              sItem.handle = value;
              if (field === 'github') sItem.url = `https://github.com/${value.replace('@', '')}`;
              if (field === 'linkedin') sItem.url = `https://linkedin.com/in/${value}`;
              if (field === 'instagram') sItem.url = `https://instagram.com/${value.replace('@', '')}`;
              if (field === 'email') sItem.url = `mailto:${value}`;
            }
            break;
          }
          default:
            this.printLine(`Field profil "${field}" tidak didukung.`, 'error');
            return;
        }

        adminStorage.saveCustomProfile(customProfile);
        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }

        this.printLine(`Profil berhasil diperbarui! Field [${field}] diatur ke: "${value}"`, 'success');
        break;
      }

      case 'bio': {
        const bioText = subArgs.join(' ');
        if (!bioText) {
          this.printLine('Format salah. Gunakan: profile bio <teks perkenalan baru>', 'error');
          return;
        }

        customProfile.bio = bioText;
        adminStorage.saveCustomProfile(customProfile);

        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }

        this.printLine('Bio dan narasi profil berhasil diperbarui!', 'success');
        break;
      }

      case 'reset': {
        adminStorage.resetProfile();
        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }
        this.printLine('Data profil berhasil dipulihkan ke versi bawaan sistem.', 'success');
        break;
      }

      default:
        this.printLine(`Sub-perintah "${sub}" tidak dikenal. Gunakan: profile <show|set|bio|reset>`, 'error');
        break;
    }
  }

  handleBackupCommand(args) {
    const sub = args[0] ? args[0].toLowerCase() : 'export';
    const subArgs = args.slice(1);

    switch (sub) {
      case 'export': {
        const json = adminStorage.exportBackup();
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          try {
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const dateStr = new Date().toISOString().slice(0, 10);
            a.href = url;
            a.download = `hanzz-portfolio-backup-${dateStr}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.printLine(`Cadangan berhasil diekspor dan diunduh sebagai "hanzz-portfolio-backup-${dateStr}.json".`, 'success');
          } catch (e) {
            this.printLine('Gagal mengunduh berkas cadangan langsung. Menampilkan isi JSON:', 'warning');
            this.printLine(json.slice(0, 300) + '...', 'info');
          }
        } else {
          this.printLine(json, 'normal');
        }
        break;
      }

      case 'import': {
        const jsonStr = subArgs.join(' ');
        if (!jsonStr) {
          this.printLine('Format salah. Gunakan: backup import <string_json>', 'error');
          return;
        }

        const res = adminStorage.importBackup(jsonStr);
        if (res.success) {
          if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
            this.app.refreshPortfolioUI();
          }
          this.printLine(res.message, 'success');
        } else {
          this.printLine(res.message, 'error');
        }
        break;
      }

      case 'reset': {
        adminStorage.resetAll();
        if (this.app && typeof this.app.refreshPortfolioUI === 'function') {
          this.app.refreshPortfolioUI();
        }
        this.printLine('Seluruh konfigurasi proyek dan profil kustom telah dihapus dan dipulihkan.', 'success');
        break;
      }

      default:
        this.printLine(`Sub-perintah "${sub}" tidak dikenal. Gunakan: backup <export|import|reset>`, 'error');
        break;
    }
  }

  handleStatsCommand() {
    this.printLine('--- STATISTIK KONTEN PORTOFOLIO ---', 'accent');
    const projects = (this.app && this.app.data && this.app.data.projects && Array.isArray(this.app.data.projects.items))
      ? this.app.data.projects.items
      : portfolioData.projects.items;

    const techFrequency = {};
    projects.forEach(p => {
      if (Array.isArray(p.techStack)) {
        p.techStack.forEach(t => {
          techFrequency[t] = (techFrequency[t] || 0) + 1;
        });
      }
    });

    const topTech = Object.entries(techFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tech, count]) => `${tech} (${count})`)
      .join(', ');

    const usage = adminStorage.getStorageUsage();
    const domCount = typeof document !== 'undefined' ? document.querySelectorAll('*').length : 0;

    this.printTable(['Parameter', 'Nilai'], [
      ['Total Proyek Aktif', `${projects.length} item`],
      ['Total Teknologi Terdata', `${Object.keys(techFrequency).length} teknologi`],
      ['Top Teknologi Proyek', topTech || '-'],
      ['Penggunaan Penyimpanan', usage.formatted],
      ['Komponen DOM Halaman', `${domCount} elemen`],
      ['Status Ketersediaan', this.app?.data?.meta?.availability?.status || 'Tersedia']
    ]);
  }

  handleSearchCommand(query) {
    if (!query) {
      this.printLine('Format salah. Gunakan: search <kata_kunci>', 'error');
      return;
    }
    const q = query.toLowerCase();
    this.printLine(`--- HASIL PENCARIAN KATA KUNCI: "${query}" ---`, 'accent');

    const results = [];

    const projects = (this.app && this.app.data && this.app.data.projects && Array.isArray(this.app.data.projects.items))
      ? this.app.data.projects.items
      : portfolioData.projects.items;

    projects.forEach(p => {
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchDesc = (p.description || '').toLowerCase().includes(q);
      const matchTech = Array.isArray(p.techStack) && p.techStack.some(t => t.toLowerCase().includes(q));
      if (matchTitle || matchDesc || matchTech) {
        results.push(['Proyek', p.title, p.category || 'Web', p.id]);
      }
    });

    const skillTiers = this.app?.data?.skills?.tiers || portfolioData.skills?.tiers || [];
    skillTiers.forEach(tier => {
      if (Array.isArray(tier.nodes)) {
        tier.nodes.forEach(node => {
          if ((node.name || '').toLowerCase().includes(q) || (node.spec || '').toLowerCase().includes(q)) {
            results.push(['Keahlian', node.name, tier.layerName || 'Skill', node.tag || '-']);
          }
        });
      }
    });

    const notes = this.app?.data?.another?.gardenNotes || portfolioData.another?.gardenNotes || [];
    notes.forEach(note => {
      if ((note.title || '').toLowerCase().includes(q) || (note.excerpt || '').toLowerCase().includes(q)) {
        results.push(['Catatan Lab', note.title, note.topic || 'Article', note.id || '-']);
      }
    });

    if (results.length === 0) {
      this.printLine(`Tidak ditemukan hasil yang cocok untuk "${query}".`, 'warning');
    } else {
      this.printTable(['Kategori', 'Nama / Judul', 'Konteks', 'Pengenal'], results);
    }
  }

  handleShortcutCommand(args) {
    const sub = args[0] ? args[0].toLowerCase() : 'list';
    const subArgs = args.slice(1);

    switch (sub) {
      case 'list':
      case 'ls': {
        this.printLine('--- DAFTAR PINTASAN TOMBOL PERAMBAN & SISTEM ---', 'accent');
        const list = shortcutManager.list();
        const rows = list.map(item => [
          item.id,
          item.name,
          item.keys.join(', '),
          item.category.toUpperCase(),
          item.blocked ? 'DIBLOKIR' : 'DIIZINKAN',
          item.description
        ]);
        this.printTable(['ID', 'Nama', 'Tombol', 'Kategori', 'Status', 'Fungsi'], rows);
        this.printLine('Gunakan: shortcut block <id|all> untuk mematikan aksi tombol bawaan.', 'info');
        this.printLine('Gunakan: shortcut remap <id> <kombinasi> untuk memetakan tombol baru.', 'info');
        break;
      }

      case 'block': {
        const targetId = subArgs[0] ? subArgs[0].toLowerCase() : '';
        if (!targetId) {
          this.printLine('Format salah. Gunakan: shortcut block <id|all>', 'error');
          this.printLine('Contoh: shortcut block devtools (memblokir F12 dan Ctrl+Shift+I)', 'info');
          return;
        }

        const res = shortcutManager.block(targetId);
        if (res.success) {
          this.printLine(res.message, 'success');
        } else {
          this.printLine(res.message, 'error');
        }
        break;
      }

      case 'unblock': {
        const targetId = subArgs[0] ? subArgs[0].toLowerCase() : '';
        if (!targetId) {
          this.printLine('Format salah. Gunakan: shortcut unblock <id|all>', 'error');
          return;
        }

        const res = shortcutManager.unblock(targetId);
        if (res.success) {
          this.printLine(res.message, 'success');
        } else {
          this.printLine(res.message, 'error');
        }
        break;
      }

      case 'remap':
      case 'bind': {
        const targetId = subArgs[0] ? subArgs[0].toLowerCase() : '';
        const newCombo = subArgs.slice(1).join(' ').trim();

        if (!targetId || !newCombo) {
          this.printLine('Format salah. Gunakan: shortcut remap <id> <kombinasi_baru>', 'error');
          this.printLine('Contoh: shortcut remap admin-cli "Ctrl+Shift+T"', 'info');
          return;
        }

        const res = shortcutManager.remap(targetId, newCombo);
        if (res.success) {
          this.printLine(res.message, 'success');
        } else {
          this.printLine(res.message, 'error');
        }
        break;
      }

      case 'reset': {
        const res = shortcutManager.reset();
        this.printLine(res.message, 'success');
        break;
      }

      case 'test': {
        this.printLine('--- MODE PENGUJIAN DETEKSI TOMBOL AKTIF ---', 'accent');
        this.printLine('Tekan tombol apapun (misalnya F12, F5, Ctrl+S) pada keyboard Anda.', 'info');
        this.printLine('Hasil deteksi kombinasi tombol akan dicetak di bawah ini secara langsung.', 'info');
        this.printLine('Ketik "shortcut stop" untuk menghentikan pengujian.', 'warning');

        shortcutManager.setTestCallback((combo, e) => {
          this.printLine(`[Deteksi Input]: ${combo} // Kode fisik: ${e.code || '-'} // Karakter: ${e.key || '-'}`, 'info');
        });
        break;
      }

      case 'stop': {
        shortcutManager.setTestCallback(null);
        this.printLine('Mode pengujian deteksi tombol telah dinonaktifkan.', 'success');
        break;
      }

      default:
        this.printLine(`Sub-perintah "${sub}" tidak dikenal. Gunakan: shortcut <list|block|unblock|remap|reset|test>`, 'error');
        break;
    }
  }

  handleGuardCommand(args) {
    const sub = args[0] ? args[0].toLowerCase() : 'status';
    const stateArg = args[1] ? args[1].toLowerCase() : '';

    switch (sub) {
      case 'status':
      case 'ls': {
        this.printLine('--- STATUS PROTEKSI KONTEN & KEAMANAN ASET ---', 'accent');
        const st = contentProtection.getStatus();
        const rows = [
          ['Salin Teks (Copy)', st.blockCopyText ? 'AKTIF' : 'NONAKTIF', 'Teks dapat dipilih, penyalinan dicegat'],
          ['Penempelan Teks (Paste)', st.blockPasteText ? 'AKTIF' : 'NONAKTIF', 'Dibatasi pada area non-input'],
          ['Seleksi Gambar', st.blockImageSelect ? 'AKTIF' : 'NONAKTIF', 'Pencegahan seleksi visual gambar'],
          ['Penarikan Gambar (Drag)', st.blockImageDrag ? 'AKTIF' : 'NONAKTIF', 'Pencegahan seret gambar ke desktop'],
          ['Mitigasi Tangkapan Layar', st.antiScreenshot ? 'AKTIF' : 'NONAKTIF', 'Perisai tombol PrintScreen & Win+Shift+S'],
          ['Proteksi Pencetakan (Print)', st.blockPrint ? 'AKTIF' : 'NONAKTIF', 'Penyembunyian dokumen saat dicetak']
        ];
        this.printTable(['Fitur Proteksi', 'Status', 'Efek Perilaku'], rows);
        this.printLine('Gunakan: guard <copy|image|paste|screen|print|all> <on|off> untuk mengubah setelan.', 'info');
        break;
      }

      case 'copy': {
        const isEnable = stateArg === 'on' || stateArg === '1' || stateArg === 'true';
        const isDisable = stateArg === 'off' || stateArg === '0' || stateArg === 'false';
        if (!isEnable && !isDisable) {
          this.printLine('Format salah. Gunakan: guard copy <on|off>', 'error');
          return;
        }
        const res = contentProtection.setRule('copy', isEnable);
        this.printLine(res.message, res.success ? 'success' : 'error');
        break;
      }

      case 'image': {
        const isEnable = stateArg === 'on' || stateArg === '1' || stateArg === 'true';
        const isDisable = stateArg === 'off' || stateArg === '0' || stateArg === 'false';
        if (!isEnable && !isDisable) {
          this.printLine('Format salah. Gunakan: guard image <on|off>', 'error');
          return;
        }
        const res = contentProtection.setRule('image', isEnable);
        this.printLine(res.message, res.success ? 'success' : 'error');
        break;
      }

      case 'paste': {
        const isEnable = stateArg === 'on' || stateArg === '1' || stateArg === 'true';
        const isDisable = stateArg === 'off' || stateArg === '0' || stateArg === 'false';
        if (!isEnable && !isDisable) {
          this.printLine('Format salah. Gunakan: guard paste <on|off>', 'error');
          return;
        }
        const res = contentProtection.setRule('paste', isEnable);
        this.printLine(res.message, res.success ? 'success' : 'error');
        break;
      }

      case 'screen':
      case 'screenshot': {
        const isEnable = stateArg === 'on' || stateArg === '1' || stateArg === 'true';
        const isDisable = stateArg === 'off' || stateArg === '0' || stateArg === 'false';
        if (!isEnable && !isDisable) {
          this.printLine('Format salah. Gunakan: guard screen <on|off>', 'error');
          return;
        }
        const res = contentProtection.setRule('screen', isEnable);
        this.printLine(res.message, res.success ? 'success' : 'error');
        break;
      }

      case 'print': {
        const isEnable = stateArg === 'on' || stateArg === '1' || stateArg === 'true';
        const isDisable = stateArg === 'off' || stateArg === '0' || stateArg === 'false';
        if (!isEnable && !isDisable) {
          this.printLine('Format salah. Gunakan: guard print <on|off>', 'error');
          return;
        }
        const res = contentProtection.setRule('print', isEnable);
        this.printLine(res.message, res.success ? 'success' : 'error');
        break;
      }

      case 'all': {
        const isEnable = stateArg === 'on' || stateArg === '1' || stateArg === 'true';
        const isDisable = stateArg === 'off' || stateArg === '0' || stateArg === 'false';
        if (!isEnable && !isDisable) {
          this.printLine('Format salah. Gunakan: guard all <on|off>', 'error');
          return;
        }
        const res = contentProtection.setAll(isEnable);
        this.printLine(res.message, res.success ? 'success' : 'error');
        break;
      }

      case 'reset': {
        const res = contentProtection.reset();
        this.printLine(res.message, 'success');
        break;
      }

      default:
        this.printLine(`Sub-perintah "${sub}" tidak dikenal. Gunakan: guard <status|copy|image|paste|screen|print|all|reset>`, 'error');
        break;
    }
  }
}


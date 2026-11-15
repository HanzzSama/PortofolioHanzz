/**
 * MAIN ENTRY POINT
 * Modular Orchestration of Components, Parallax Physics, Web Audio & Telemetry
 * Identity: Haidar Rifky Andrianno // ITESA Muhammadiyah Semarang
 */

import { portfolioData, getPortfolioData } from './data/portfolioData.js';
import { translations } from './data/translations.js';
import { ParallaxEngine } from './core/parallaxEngine.js';
import { ArchitecturalObserver } from './core/observer.js';
import { ScrollbarPillEngine } from './core/scrollbarPill.js';
import { SmoothScroller } from './core/smoothScroller.js';

import { renderWelcome } from './components/renderWelcome.js';
import { renderAbout } from './components/renderAbout.js';
import { renderSkills } from './components/renderSkills.js';
import { renderProjects } from './components/renderProjects.js';
import { renderGithub } from './components/renderGithub.js';
import { renderLab } from './components/renderLab.js';
import { renderAnother } from './components/renderAnother.js';
import { renderPet } from './components/renderPet.js';
import { MonolithSimulator } from './core/monolithSimulator.js';
import { HanzzPetEngine } from './core/hanzzPetEngine.js';
import { monolithAudio, SOUNDSCAPE_TRACKS } from './core/monolithAudioEngine.js';

class PortfolioApp {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.audioContext = null;
    this.oscillator = null;
    this.gainNode = null;
    this.analyser = null;
    this.isAudioPlaying = false;
    this.currentFrequency = 432;
    this.canvasAnimationId = null;
    this.monolithSim = null;
    this.petEngine = null;

    // Internationalization State
    this.currentLang = localStorage.getItem('portfolio-language') || 'id';
    this.data = getPortfolioData(this.currentLang);

    this.init();
  }

  init() {
    this.renderDOM();
    this.initSmoothScroller();
    this.initParallaxAndObserver();
    this.initLiveClock();
    this.initThemeToggle();
    this.initLanguageSwitcher();
    this.initAudioSynthesizer();
    this.initClipboard();
    this.initSmoothNavLinks();
    this.initSystemDrawer();
    this.initMobileNav();
    this.initKineticTopographyCanvas();
    this.initMonolithSimulator();
    this.initHanzzPet();
    this.initScrollbarPill();
  }

  renderDOM() {
    if (!this.appContainer) return;

    // Render modular components sequentially with current localized data
    const html = [
      renderWelcome(this.data),
      renderAbout(this.data),
      renderSkills(this.data),
      renderProjects(this.data),
      renderGithub(this.data),
      renderLab(this.data),
      renderAnother(this.data)
    ].join('\n');

    this.appContainer.innerHTML = html;
  }

  initLanguageSwitcher() {
    const switcher = document.getElementById('lang-switcher');
    const toggleBtn = document.getElementById('lang-toggle-btn');
    const dropdown = document.getElementById('lang-dropdown');

    if (!toggleBtn || !dropdown) return;

    // Toggle dropdown open/close
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = switcher.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      dropdown.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#lang-switcher')) {
        switcher.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      }
    });

    // Header dropdown option clicks
    document.querySelectorAll('.lang-node-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.setLanguage(lang);
        switcher.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
      });
    });

    // Mobile overlay option clicks
    document.querySelectorAll('.mobile-lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        this.setLanguage(lang);
      });
    });

    // Initialize with stored or default language
    this.applyLanguageUI(this.currentLang);
  }

  setLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('portfolio-language', lang);
    this.data = getPortfolioData(lang);
    document.documentElement.setAttribute('lang', lang);

    this.applyLanguageUI(lang);

    // Smooth subtle crossfade DOM re-render
    if (this.appContainer) {
      this.appContainer.style.transition = 'opacity 0.2s cubic-bezier(0.2, 0.0, 0, 1.0)';
      this.appContainer.style.opacity = '0';
      setTimeout(() => {
        this.renderDOM();
        this.appContainer.style.opacity = '1';

        // Re-initialize dynamic component bindings after re-rendering
        this.initKineticTopographyCanvas();
        this.initMonolithSimulator();
        this.initHanzzPet();
        this.initParallaxAndObserver();
        this.initSmoothNavLinks();
        this.initAudioSynthesizer();
        this.initClipboard();
      }, 200);
    }
  }

  applyLanguageUI(lang) {
    const t = translations[lang] || translations.id;

    // Update document title and meta description
    if (t.documentTitle) document.title = t.documentTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.documentDesc) {
      metaDesc.setAttribute('content', t.documentDesc);
    }

    // Update header nav labels
    const navLinks = document.querySelectorAll('.nav-links .nav-label-text');
    if (navLinks.length >= 6 && t.nav) {
      navLinks[0].textContent = t.nav.welcome;
      navLinks[1].textContent = t.nav.about;
      navLinks[2].textContent = t.nav.skills;
      navLinks[3].textContent = t.nav.projects;
      navLinks[4].textContent = t.nav.github || '05.GIT';
      navLinks[5].textContent = t.nav.another || '06.LAB';
    }

    // Update mobile nav labels
    const mobileTitles = document.querySelectorAll('.mobile-nav-title');
    if (mobileTitles.length >= 6) {
      const titles = {
        id: ['Welcome', 'Manifesto', 'Architecture', 'Selected Works', 'GitHub Vault', 'Kinetic Lab'],
        en: ['Welcome', 'Manifesto', 'Capabilities', 'Selected Works', 'GitHub Vault', 'Kinetic Lab'],
        zh: ['首页', '建筑宣言', '能力矩阵', '精选作品', '开源仓库', '动能实验室'],
        ja: ['冒頭', '建築宣言', '能力一覧', '選定実績', '開発拠点', '動的実験室'],
        de: ['Willkommen', 'Manifest', 'Fähigkeiten', 'Ausgewählte Arbeiten', 'GitHub Tresor', 'Kinetisches Labor']
      };
      const curTitles = titles[lang] || titles.id;
      mobileTitles.forEach((el, idx) => {
        if (curTitles[idx]) el.textContent = curTitles[idx];
      });
    }

    // Update telemetry status
    const teleStatus = document.getElementById('telemetry-status');
    if (teleStatus && t.ui) teleStatus.textContent = t.ui.sysOp;

    // Update current lang code badge
    const codeEl = document.getElementById('current-lang-code');
    if (codeEl) codeEl.textContent = lang.toUpperCase();

    // Update active state in dropdown
    document.querySelectorAll('.lang-node-item').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update active state in mobile selector
    document.querySelectorAll('.mobile-lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  initParallaxAndObserver() {
    // Instantiate Parallax Engine
    this.parallax = new ParallaxEngine({ ease: 0.085 });

    // Instantiate IntersectionObserver
    this.observer = new ArchitecturalObserver();
  }

  initLiveClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;

    const updateClock = () => {
      const now = new Date();
      // Format time in Asia/Jakarta (Semarang Node)
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `${timeStr} WIB [GMT+7]`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeLabel = document.getElementById('theme-label');

    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButtonState(savedTheme, themeIcon, themeLabel);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        this.updateThemeButtonState(newTheme, themeIcon, themeLabel);
      });
    }
  }

  updateThemeButtonState(theme, iconEl, labelEl) {
    if (theme === 'dark') {
      if (iconEl) iconEl.textContent = '☼';
      if (labelEl) labelEl.textContent = 'Limestone';
    } else {
      if (iconEl) iconEl.textContent = '☾';
      if (labelEl) labelEl.textContent = 'Obsidian';
    }
  }

  initAudioSynthesizer() {
    const headerPill = document.getElementById('header-audio-pill');
    const modalBackdrop = document.getElementById('monolith-audio-backdrop');
    const consoleCloseBtn = document.getElementById('console-close-btn');
    const masterPlayBtn = document.getElementById('console-master-play-btn');
    const inPagePlayBtn = document.getElementById('synth-mute-toggle');
    const studioOpenConsoleBtn = document.getElementById('studio-open-console-btn');

    // ── No auto-start: user must explicitly press play ───────────────────────

    // Register Mini Equalizer Bars in Header
    const eqBars = [
      document.getElementById('eq-bar-1'),
      document.getElementById('eq-bar-2'),
      document.getElementById('eq-bar-3'),
      document.getElementById('eq-bar-4')
    ].filter(Boolean);
    monolithAudio.registerHeaderEq(eqBars);

    // Register Visualizer Canvases (both in Modal and in Section Another)
    const modalCanvas = document.getElementById('console-visualizer-canvas');
    const studioCanvas = document.getElementById('synth-canvas');
    if (modalCanvas) monolithAudio.registerCanvas(modalCanvas);
    if (studioCanvas) monolithAudio.registerCanvas(studioCanvas);

    // Populate Modal Tracks Matrix
    const tracksGrid = document.getElementById('console-tracks-grid');
    if (tracksGrid && tracksGrid.children.length === 0) {
      tracksGrid.innerHTML = SOUNDSCAPE_TRACKS.map((t, idx) => `
        <button class="console-track-card" data-track-select="${t.id}" data-cursor-target>
          <div class="track-card-top">
            <span class="track-index-num">0${idx + 1}</span>
            <span class="track-cat-badge">${t.category}</span>
          </div>
          <div class="track-card-name">${t.name}</div>
          <div class="track-card-desc">${t.desc}</div>
        </button>
      `).join('');
    }

    // Sync initial active state — currentTrackId is null on fresh load, so all buttons nonactive
    const initTrackId = monolithAudio.currentTrackId; // null on refresh
    document.querySelectorAll('[data-track-select]').forEach(b => {
      b.classList.remove('active-track', 'active-tone');
      if (initTrackId && b.getAttribute('data-track-select') === initTrackId) {
        b.classList.add('active-track', 'active-tone');
      }
    });

    // Modal Open / Close Handlers
    const openModal = () => {
      if (modalBackdrop) modalBackdrop.classList.add('is-open');
    };
    const closeModal = () => {
      if (modalBackdrop) modalBackdrop.classList.remove('is-open');
    };

    headerPill?.addEventListener('click', (e) => {
      if (e.target.closest('.header-audio-gear-icon')) {
        openModal();
      } else {
        monolithAudio.toggle();
      }
    });

    studioOpenConsoleBtn?.addEventListener('click', openModal);
    consoleCloseBtn?.addEventListener('click', closeModal);
    modalBackdrop?.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop?.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Master Play Buttons
    masterPlayBtn?.addEventListener('click', () => monolithAudio.toggle());
    inPagePlayBtn?.addEventListener('click', () => monolithAudio.toggle());

    // Track Select Handlers across page & modal
    // Use event delegation on document to catch dynamically injected cards too
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-track-select]');
      if (!btn) return;
      const trackId = btn.getAttribute('data-track-select');

      // Immediately update active state on ALL track buttons — no waiting for AudioContext
      document.querySelectorAll('[data-track-select]').forEach(b => {
        const isThis = b.getAttribute('data-track-select') === trackId;
        b.classList.toggle('active-track', isThis);
        b.classList.toggle('active-tone', isThis); // keep synth-freq-btn compat
      });

      // Start playback
      monolithAudio.play(trackId);
      const nameEl = document.getElementById('console-now-playing-name');
      const track = SOUNDSCAPE_TRACKS.find(t => t.id === trackId);
      if (nameEl && track) nameEl.textContent = track.name;
    });

    // Faders & Sliders
    const volSlider = document.getElementById('fader-volume');
    const studioVolSlider = document.getElementById('studio-volume-slider');
    const gainReadout = document.getElementById('fader-gain-readout');
    const studioVolReadout = document.getElementById('studio-vol-readout');

    const handleVolume = (val) => {
      monolithAudio.setVolume(val);
      const pct = `${Math.round(val * 100)}%`;
      if (gainReadout) gainReadout.textContent = pct;
      if (studioVolReadout) studioVolReadout.textContent = pct;
      if (volSlider) volSlider.value = val;
      if (studioVolSlider) studioVolSlider.value = val;
    };

    volSlider?.addEventListener('input', (e) => handleVolume(parseFloat(e.target.value)));
    studioVolSlider?.addEventListener('input', (e) => handleVolume(parseFloat(e.target.value)));

    const filterSlider = document.getElementById('fader-filter');
    const studioFilterSlider = document.getElementById('studio-filter-slider');
    const filterReadout = document.getElementById('fader-filter-readout');
    const studioFilterReadout = document.getElementById('studio-filter-readout');

    const handleFilter = (val) => {
      monolithAudio.setFilterCutoff(val);
      const text = `${Math.round(val)} Hz`;
      if (filterReadout) filterReadout.textContent = text;
      if (studioFilterReadout) studioFilterReadout.textContent = text;
      if (filterSlider) filterSlider.value = val;
      if (studioFilterSlider) studioFilterSlider.value = val;
    };

    filterSlider?.addEventListener('input', (e) => handleFilter(parseFloat(e.target.value)));
    studioFilterSlider?.addEventListener('input', (e) => handleFilter(parseFloat(e.target.value)));

    // Rain Toggle
    const rainBtn = document.getElementById('btn-toggle-rain-overlay');
    const studioRainBtn = document.getElementById('studio-toggle-rain-btn');
    const handleRainToggle = () => {
      const active = monolithAudio.toggleRainOverlay();
      rainBtn?.classList.toggle('active', active);
      studioRainBtn?.classList.toggle('active', active);
    };
    rainBtn?.addEventListener('click', handleRainToggle);
    studioRainBtn?.addEventListener('click', handleRainToggle);

    // Custom Audio Upload & Stream URL
    const fileInput = document.getElementById('custom-audio-file-input');
    fileInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        monolithAudio.loadCustomFile(e.target.files[0]);
      }
    });

    const streamUrlInput = document.getElementById('custom-stream-url-input');
    const loadStreamBtn = document.getElementById('btn-load-stream-url');
    loadStreamBtn?.addEventListener('click', () => {
      if (streamUrlInput && streamUrlInput.value.trim()) {
        monolithAudio.loadCustomAudioUrl(streamUrlInput.value.trim());
        monolithAudio.play('06_custom');
      }
    });

    // Initial visualizer idle draw
    monolithAudio.drawIdleState();
  }

  initClipboard() {
    const copyBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('copy-toast');
    if (!copyBtn || !toast) return;

    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2200);
        });
      }
    });
  }

  initSmoothScroller() {
    this.smoothScroller = new SmoothScroller({
      duration: 1.2,
      headerOffset: 72,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });
  }

  initSmoothNavLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (this.smoothScroller) {
            this.smoothScroller.scrollTo(targetEl, { offset: -72, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  /* ==========================================================================
     ARCHITECTURAL SYSTEM DEEP-DIVE DRAWER & MODAL INSPECTOR
     ========================================================================== */
  initSystemDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    const drawer = document.getElementById('system-drawer');
    const closeBtn = document.getElementById('drawer-close-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeDrawer());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeDrawer();
    });

    // Delegated click listeners
    document.addEventListener('click', (e) => {
      // 1. Inspect Project
      const projectTarget = e.target.closest('[data-inspect-project]');
      if (projectTarget) {
        e.preventDefault();
        const projId = projectTarget.getAttribute('data-inspect-project');
        const proj = this.data.projects.items.find((p) => p.id === projId);
        if (proj && proj.deepDive) {
          this.openProjectInspection(proj);
        }
        return;
      }

      // 2. Inspect Skill Node
      const skillTarget = e.target.closest('[data-inspect-skill]');
      if (skillTarget) {
        const skillName = skillTarget.getAttribute('data-inspect-skill');
        const spec = skillTarget.getAttribute('data-spec');
        const tier = skillTarget.getAttribute('data-tier');
        const tag = skillTarget.getAttribute('data-tag');
        this.openSkillInspection(skillName, spec, tier, tag);
        return;
      }

      // 3. Inspect Digital Garden Monograph
      const noteTarget = e.target.closest('[data-inspect-note]');
      if (noteTarget) {
        const noteId = noteTarget.getAttribute('data-inspect-note');
        const note = this.data.another.gardenNotes.find((n) => n.id === noteId);
        if (note) {
          this.openNoteInspection(note);
        }
        return;
      }
    });
  }

  openDrawer(callsign, contentHtml) {
    const backdrop = document.getElementById('drawer-backdrop');
    const drawer = document.getElementById('system-drawer');
    const callsignEl = document.getElementById('drawer-callsign');
    const bodyEl = document.getElementById('drawer-body');

    if (this._drawerCloseTimer) {
      clearTimeout(this._drawerCloseTimer);
      this._drawerCloseTimer = null;
    }

    if (callsignEl) callsignEl.textContent = callsign;
    if (bodyEl) bodyEl.innerHTML = contentHtml;

    if (backdrop && drawer) {
      drawer.scrollTop = 0;
      document.body.style.overflow = 'hidden';
      this.smoothScroller?.stop();

      requestAnimationFrame(() => {
        backdrop.classList.add('active');
        drawer.classList.add('active');
      });
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    const drawer = document.getElementById('system-drawer');

    if (backdrop && drawer) {
      backdrop.classList.remove('active');
      drawer.classList.remove('active');

      if (this._drawerCloseTimer) clearTimeout(this._drawerCloseTimer);
      this._drawerCloseTimer = setTimeout(() => {
        if (!backdrop.classList.contains('active')) {
          document.body.style.overflow = '';
          this.smoothScroller?.start();
        }
        this._drawerCloseTimer = null;
      }, 420);
    }
  }

  openProjectInspection(proj) {
    const { deepDive } = proj;
    const html = `
      <div class="drawer-title-group">
        <div style="font-family: var(--font-mono); font-size: var(--font-mono-tag); color: var(--accent-primary); margin-bottom: 0.25rem;">
          ${proj.code} // ${proj.category} [${proj.year}]
        </div>
        <h2>${proj.title}</h2>
        <div class="drawer-subtitle">${proj.subtitle}</div>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">01 // PROBLEM STATEMENT</div>
        <p style="font-size: var(--font-body-md); line-height: 1.65; color: var(--text-secondary);">
          ${deepDive.problem}
        </p>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">02 // ARCHITECTURAL SOLUTION</div>
        <p style="font-size: var(--font-body-md); line-height: 1.65; color: var(--text-secondary);">
          ${deepDive.solution}
        </p>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">03 // SYSTEM TOPOLOGY SCHEMA</div>
        <pre class="drawer-schema-box"><code>${deepDive.architectureSchema}</code></pre>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">04 // PRODUCTION BENCHMARKS</div>
        <div class="drawer-benchmarks-grid">
          ${deepDive.benchmarks
            .map(
              (b) => `
            <div class="drawer-benchmark-cell">
              <span class="bench-metric">${b.metric}</span>
              <span class="bench-achieved">${b.achieved}</span>
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-muted);">Target: ${b.target}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">05 // CODE IMPLEMENTATION KERNEL</div>
        <pre class="drawer-code-preview"><code>${deepDive.sourceSnippet}</code></pre>
      </div>

      <div style="display: flex; gap: var(--space-md); margin-top: var(--space-md);">
        <a href="${proj.links.preview}" target="_blank" rel="noopener noreferrer" class="project-btn-primary" data-cursor-target>
          <span>Live Deployment</span> <span>↗</span>
        </a>
        <a href="${proj.links.code}" target="_blank" rel="noopener noreferrer" class="project-btn-secondary" data-cursor-target>
          <span>Repository</span>
        </a>
      </div>
    `;

    this.openDrawer(`${proj.code} // DEEP INSPECT`, html);
  }

  openSkillInspection(skillName, spec, tier, tag) {
    const html = `
      <div class="drawer-title-group">
        <div style="font-family: var(--font-mono); font-size: var(--font-mono-tag); color: var(--accent-primary); margin-bottom: 0.25rem;">
          SYSTEM TAXONOMY // TAG: [${tag}]
        </div>
        <h2>${skillName}</h2>
        <div class="drawer-subtitle">${tier}</div>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">ARCHITECTURAL SPECIFICATION</div>
        <p style="font-family: var(--font-mono); font-size: 1rem; color: var(--accent-primary); font-weight: 500;">
          ${spec}
        </p>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">DESIGN SYSTEM PRINCIPLE</div>
        <p style="font-size: var(--font-body-md); line-height: 1.65; color: var(--text-secondary);">
          Node ini diintegrasikan ke dalam metodologi rekayasa sistem Haidar Rifky Andrianno. Menolak pendekatan statis atau library bloatware pihak ketiga; setiap implementasi mengedepankan efisiensi siklus komputasi, kebersihan antarmuka, dan keselarasan biofilik alami.
        </p>
      </div>

      <div class="drawer-section-block">
        <div class="drawer-section-heading">ACADEMIC & ENTERPRISE CONTEXT</div>
        <p style="font-size: var(--font-body-md); line-height: 1.65; color: var(--text-secondary);">
          Diaplikasikan dalam riset analitik skala institusi pada <strong>ITESA Muhammadiyah Semarang</strong> serta arsitektur antarmuka dan rekayasa FullStack di Semarang.
        </p>
      </div>
    `;

    this.openDrawer(`SKILL.SYS // ${tag}`, html);
  }

  openNoteInspection(note) {
    const html = `
      <div class="drawer-title-group">
        <div style="font-family: var(--font-mono); font-size: var(--font-mono-tag); color: var(--accent-primary); margin-bottom: 0.25rem;">
          ${note.tag} // ${note.date} [${note.readTime}]
        </div>
        <h2 style="line-height: 1.25;">${note.title}</h2>
      </div>

      <div class="drawer-section-block" style="font-size: var(--font-body-md); line-height: 1.75; color: var(--text-secondary);">
        ${note.content}
      </div>

      <div class="drawer-section-block" style="font-family: var(--font-mono); font-size: var(--font-mono-micro); color: var(--text-muted);">
        PUBLISHED BY: Haidar Rifky Andrianno • ITESA Muhammadiyah Semarang Node
      </div>
    `;

    this.openDrawer(note.tag, html);
  }

  /* ==========================================================================
     MOBILE NAVIGATION OVERLAY CONTROLLER
     ========================================================================== */
  initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const overlay = document.getElementById('mobile-nav-overlay');
    const label = document.getElementById('mobile-menu-label');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !overlay) return;

    toggleBtn.addEventListener('click', () => {
      const isActive = overlay.classList.contains('active');
      if (isActive) {
        overlay.classList.remove('active');
        if (label) label.textContent = 'MENU';
      } else {
        overlay.classList.add('active');
        if (label) label.textContent = 'CLOSE';
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        overlay.classList.remove('active');
        if (label) label.textContent = 'MENU';
      });
    });
  }

  /* ==========================================================================
     KINETIC BIOPHILIC TOPOGRAPHY CANVAS
     ========================================================================== */
  initKineticTopographyCanvas() {
    const canvas = document.getElementById('kinetic-topo-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = 580);
    let height = (canvas.height = 580);
    let time = 0;

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, { passive: true });

    const rings = 7;
    const baseRadius = 60;
    const step = 28;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.012;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const strokeColor = isDark ? 'rgba(117, 146, 122, 0.45)' : 'rgba(74, 93, 78, 0.4)';

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;

      for (let r = 0; r < rings; r++) {
        ctx.beginPath();
        const currentR = baseRadius + r * step;
        const points = 60;

        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const noise =
            Math.sin(angle * 3 + time + r * 0.4) * 8 +
            Math.cos(angle * 5 - time * 0.8) * 5;

          // Proximity to mouse
          const px = width / 2 + Math.cos(angle) * (currentR + noise);
          const py = height / 2 + Math.sin(angle) * (currentR + noise);

          const dist = Math.hypot(px - mouseX, py - mouseY);
          const repel = Math.max(0, (140 - dist) * 0.12);

          const finalX = px + Math.cos(angle) * repel;
          const finalY = py + Math.sin(angle) * repel;

          if (i === 0) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      requestAnimationFrame(render);
    };

    render();
  }

  initMonolithSimulator() {
    if (this.monolithSim) {
      this.monolithSim.destroy();
      this.monolithSim = null;
    }
    const canvas = document.getElementById('monolith-canvas');
    if (canvas) {
      this.monolithSim = new MonolithSimulator('monolith-canvas');
    }
  }

  initHanzzPet() {
    const container = document.getElementById('hanzz-pet-container');
    if (!container) return;

    if (this.petEngine) {
      this.petEngine.destroy();
      this.petEngine = null;
    }

    container.innerHTML = renderPet(this.data);
    this.petEngine = new HanzzPetEngine();
  }

  initScrollbarPill() {
    this.scrollbarPill = new ScrollbarPillEngine();
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

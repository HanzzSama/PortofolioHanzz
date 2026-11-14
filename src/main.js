/**
 * MAIN ENTRY POINT
 * Modular Orchestration of Components, Parallax Physics, Web Audio & Telemetry
 * Identity: Haidar Rifky Andrianno // ITESA Muhammadiyah Semarang
 */

import { portfolioData } from './data/portfolioData.js';
import { ParallaxEngine } from './core/parallaxEngine.js';
import { ArchitecturalObserver } from './core/observer.js';
import { ScrollbarPillEngine } from './core/scrollbarPill.js';

import { renderWelcome } from './components/renderWelcome.js';
import { renderAbout } from './components/renderAbout.js';
import { renderSkills } from './components/renderSkills.js';
import { renderProjects } from './components/renderProjects.js';
import { renderAnother } from './components/renderAnother.js';

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

    this.init();
  }

  init() {
    this.renderDOM();
    this.initParallaxAndObserver();
    this.initLiveClock();
    this.initThemeToggle();
    this.initAudioSynthesizer();
    this.initClipboard();
    this.initSmoothNavLinks();
    this.initSystemDrawer();
    this.initMobileNav();
    this.initKineticTopographyCanvas();
    this.initScrollbarPill();
  }

  renderDOM() {
    if (!this.appContainer) return;

    // Render modular components sequentially
    const html = [
      renderWelcome(portfolioData),
      renderAbout(portfolioData),
      renderSkills(portfolioData),
      renderProjects(portfolioData),
      renderAnother(portfolioData)
    ].join('\n');

    this.appContainer.innerHTML = html;
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
    const muteBtn = document.getElementById('synth-mute-toggle');
    const stateIcon = document.getElementById('synth-state-icon');
    const stateLabel = document.getElementById('synth-state-label');
    const freqButtons = document.querySelectorAll('.synth-freq-btn');
    const canvas = document.getElementById('synth-canvas');

    const ensureAudioContext = () => {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioCtx();

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;

        this.gainNode = this.audioContext.createGain();
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);

        // Lowpass filter to ensure organic, calm biophilic warmth (eliminating digital harshness)
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, this.audioContext.currentTime);

        this.oscillator = this.audioContext.createOscillator();
        this.oscillator.type = 'sine';
        this.oscillator.frequency.setValueAtTime(this.currentFrequency, this.audioContext.currentTime);

        this.oscillator.connect(filter);
        filter.connect(this.gainNode);
        this.gainNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.oscillator.start();
      }
    };

    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        ensureAudioContext();

        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume();
        }

        if (this.isAudioPlaying) {
          // Fade out gracefully
          this.gainNode.gain.setTargetAtTime(0, this.audioContext.currentTime, 0.1);
          this.isAudioPlaying = false;
          if (stateIcon) stateIcon.textContent = '▶';
          if (stateLabel) stateLabel.textContent = 'Activate Resonant Tone';
          muteBtn.classList.remove('active');
        } else {
          // Fade in to gentle ambient level
          this.gainNode.gain.setTargetAtTime(0.08, this.audioContext.currentTime, 0.15);
          this.isAudioPlaying = true;
          if (stateIcon) stateIcon.textContent = '■';
          if (stateLabel) stateLabel.textContent = 'Mute Resonant Tone';
          muteBtn.classList.add('active');
          this.startVisualizer(canvas);
        }
      });
    }

    freqButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const freq = parseFloat(btn.getAttribute('data-frequency'));
        this.currentFrequency = freq;

        freqButtons.forEach((b) => b.classList.remove('active-tone'));
        btn.classList.add('active-tone');

        if (this.oscillator && this.audioContext) {
          this.oscillator.frequency.setTargetAtTime(freq, this.audioContext.currentTime, 0.08);
        }
      });
    });

    if (canvas) {
      this.drawIdleVisualizer(canvas);
    }
  }

  drawIdleVisualizer(canvas) {
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (this.isAudioPlaying) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) { requestAnimationFrame(draw); return; }
      if (canvas.width !== W) canvas.width = W;
      if (canvas.height !== H) canvas.height = H;

      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(74, 93, 78, 0.3)';
      ctx.lineWidth = 1;

      const slices = 48;
      const sliceW = W / slices;
      let x = 0;
      for (let i = 0; i <= slices; i++) {
        const y = H / 2 + Math.sin(i * 0.3 + Date.now() * 0.0018) * 5;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceW;
      }
      ctx.stroke();
      requestAnimationFrame(draw);
    };

    // Defer one frame to allow CSS layout to assign dimensions
    requestAnimationFrame(draw);
  }

  startVisualizer(canvas) {
    if (!canvas || !this.analyser) return;
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderWave = () => {
      if (!this.isAudioPlaying) return;
      this.canvasAnimationId = requestAnimationFrame(renderWave);

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      if (!W || !H) return;
      if (canvas.width !== W) canvas.width = W;
      if (canvas.height !== H) canvas.height = H;

      this.analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'var(--accent-primary)';
      ctx.beginPath();

      const sliceW = W / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * H) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceW;
      }
      ctx.lineTo(W, H / 2);
      ctx.stroke();
    };

    renderWave();
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

  initSmoothNavLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        const proj = portfolioData.projects.items.find((p) => p.id === projId);
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
        const note = portfolioData.another.gardenNotes.find((n) => n.id === noteId);
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

    if (callsignEl) callsignEl.textContent = callsign;
    if (bodyEl) bodyEl.innerHTML = contentHtml;

    if (backdrop && drawer) {
      backdrop.classList.add('active');
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    const drawer = document.getElementById('system-drawer');

    if (backdrop && drawer) {
      backdrop.classList.remove('active');
      drawer.classList.remove('active');
      document.body.style.overflow = '';
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

  initScrollbarPill() {
    this.scrollbarPill = new ScrollbarPillEngine();
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

/**
 * X-RAY BIOSPHERE TELEMETRY & WIREFRAME ENGINE
 * Avant-garde Technical HUD Overlay revealing real-time DSP, Physics, DOM & Solar Cycles
 * Zero third-party dependencies, lightweight Web Audio FFT & RAF monitor
 */

import { monolithAudio } from './monolithAudioEngine.js';
import { hapticAudio } from './hapticAudioEngine.js';
import { deviceTelemetry } from './deviceTelemetry.js';
import { shortcutManager } from './shortcutManager.js';

export class XRayBiosphereEngine {
  constructor() {
    this.isOpen = false;
    this.overlay = null;
    this.rafId = null;

    // Performance tracking
    this.fps = 60;
    this.frames = 0;
    this.lastTime = performance.now();
    this.fpsHistory = new Array(40).fill(60);

    // Audio FFT Canvas
    this.fftCanvas = null;
    this.fftCtx = null;

    this.init();
  }

  init() {
    this.createHUDDOM();
    this.bindTriggers();
    this.updateDeviceTelemetry();
  }

  createHUDDOM() {
    const hud = document.createElement('div');
    hud.id = 'xray-biosphere-hud';
    hud.className = 'xray-biosphere-hud';
    hud.setAttribute('aria-hidden', 'true');

    hud.innerHTML = `
      <div class="xray-backdrop" id="xray-backdrop"></div>
      <div class="xray-panel">
        <!-- Header Strip -->
        <div class="xray-header">
          <div class="xray-title-group">
            <span class="xray-status-blink"></span>
            <span class="xray-title font-mono">SYS.XRAY // BIOSPHERE ARCHITECTURAL TELEMETRY</span>
          </div>
          <button class="xray-close-btn font-mono" id="xray-close-btn" data-cursor-target>
            <span>[Esc] Tutup ×</span>
          </button>
        </div>

        <!-- Telemetry Matrix Grid -->
        <div class="xray-grid">
          <!-- Module 1: DSP Audio FFT Vector -->
          <div class="xray-module">
            <div class="module-header font-mono">
              <span>01 // DSP frequency matrix (FFT: 512)</span>
              <span id="xray-track-name" class="module-tag">432Hz TERRA</span>
            </div>
            <div class="module-body">
              <canvas id="xray-fft-canvas" class="xray-fft-canvas" width="380" height="95"></canvas>
              <div class="xray-metrics-row font-mono">
                <div>Bass: <span id="xray-bass-val">0.00</span></div>
                <div>Mid: <span id="xray-mid-val">0.00</span></div>
                <div>Energy: <span id="xray-energy-val">0.00</span></div>
              </div>
            </div>
          </div>

          <!-- Module 2: Framerate & Cycle Performance -->
          <div class="xray-module">
            <div class="module-header font-mono">
              <span>02 // Computation cadence and FPS</span>
              <span id="xray-fps-readout" class="module-tag">-- FPS</span>
            </div>
            <div class="module-body">
              <canvas id="xray-fps-canvas" class="xray-fps-canvas" width="380" height="95"></canvas>
              <div class="xray-metrics-row font-mono">
                <div>Refresh: <span id="xray-dpr">1.0x DPR</span></div>
                <div>Frame time: <span id="xray-frametime">--ms</span></div>
                <div>Cadence: <span id="xray-stability" class="tag-success">UNLOCKED</span></div>
              </div>
            </div>
          </div>

          <!-- Module 3: Viewport Physics & DOM Metrics -->
          <div class="xray-module">
            <div class="module-header font-mono">
              <span>03 // Kinetic viewport and DOM load</span>
              <span class="module-tag">LENIS MOMENTUM</span>
            </div>
            <div class="module-body font-mono xray-data-list">
              <div class="data-item"><span>Scroll velocity:</span> <span id="xray-scroll-vel">0.00 px/f</span></div>
              <div class="data-item"><span>Viewport coord:</span> <span id="xray-viewport-pos">Y: 0px</span></div>
              <div class="data-item"><span>Active DOM nodes:</span> <span id="xray-dom-count">--</span></div>
              <div class="data-item"><span>Browser runtime:</span> <span>VANILLA ES6+</span></div>
            </div>
          </div>

          <!-- Module 4: Spatial Geography & Astronomical Arc -->
          <div class="xray-module">
            <div class="module-header font-mono">
              <span>04 // Geodesic node and solar cycle</span>
              <span class="module-tag">SEMARANG, ID</span>
            </div>
            <div class="module-body font-mono xray-data-list">
              <div class="data-item"><span>Coordinates:</span> <span>07°00'S, 110°25'E</span></div>
              <div class="data-item"><span>Altitude / node:</span> <span>18m ASL // ITESA</span></div>
              <div class="data-item"><span>Theme:</span> <span id="xray-theme-state">OBSIDIAN NIGHT</span></div>
              <div class="data-item"><span>Session seed:</span> <span id="xray-session-seed">#432-TERRA</span></div>
            </div>
          </div>

          <!-- Module 5: Silicon Architecture & Hardware -->
          <div class="xray-module">
            <div class="module-header font-mono">
              <span>05 // Silicon architecture and hardware</span>
              <span id="xray-hw-tier" class="module-tag">ONLINE // ACCELERATED</span>
            </div>
            <div class="module-body font-mono xray-data-list">
              <div class="data-item"><span>Processor (CPU):</span> <span id="xray-cpu-cores">DETECTING...</span></div>
              <div class="data-item"><span>CPU generation:</span> <span id="xray-cpu-gen">DETECTING...</span></div>
              <div class="data-item"><span>Discrete (dGPU):</span> <span id="xray-dgpu-name">DETECTING...</span></div>
              <div class="data-item"><span>dGPU generation:</span> <span id="xray-dgpu-gen">DETECTING...</span></div>
              <div class="data-item"><span>Integrated (iGPU):</span> <span id="xray-igpu-name">DETECTING...</span></div>
              <div class="data-item"><span>iGPU generation:</span> <span id="xray-igpu-gen">DETECTING...</span></div>
              <div class="data-item"><span>System memory (RAM):</span> <span id="xray-ram-val">DETECTING...</span></div>
              <div class="data-item"><span>Local storage (SSD):</span> <span id="xray-ssd-quota">CALCULATING...</span></div>
            </div>
          </div>

          <!-- Module 6: Client Matrix & Display Biosphere -->
          <div class="xray-module">
            <div class="module-header font-mono">
              <span>06 // Client matrix and display specifications</span>
              <span id="xray-form-tag" class="module-tag">CLIENT // MATRIX</span>
            </div>
            <div class="module-body font-mono xray-data-list">
              <div class="data-item"><span>Device form factor:</span> <span id="xray-form-factor">DETECTING...</span></div>
              <div class="data-item"><span>Operating system:</span> <span id="xray-os-platform">DETECTING...</span></div>
              <div class="data-item"><span>Native resolution:</span> <span id="xray-display-res">DETECTING...</span></div>
              <div class="data-item"><span>Color gamut:</span> <span id="xray-color-gamut">DETECTING...</span></div>
              <div class="data-item"><span>Network status:</span> <span id="xray-net-cadence">ONLINE</span></div>
            </div>
          </div>
        </div>

        <!-- Footer Command Strip -->
        <div class="xray-footer font-mono">
          <span>Tekan [X] atau [Esc] untuk menutup // Haidar Rifky Andrianno, 2026</span>
        </div>
      </div>
    `;

    document.body.appendChild(hud);
    this.overlay = hud;

    // FFT Canvas
    this.fftCanvas = document.getElementById('xray-fft-canvas');
    if (this.fftCanvas) {
      this.fftCtx = this.fftCanvas.getContext('2d');
    }

    // FPS Canvas
    this.fpsCanvas = document.getElementById('xray-fps-canvas');
    if (this.fpsCanvas) {
      this.fpsCtx = this.fpsCanvas.getContext('2d');
    }
  }

  bindTriggers() {
    // 1. Click on Header Seed Badge or Telemetry Bar
    document.addEventListener('click', (e) => {
      const trigger = e.target?.closest?.('#session-seed-badge, .session-seed-badge, #telemetry-status, .header-telemetry');
      if (trigger) {
        e.preventDefault();
        this.toggle();
      }
    });

    // 2. Keyboard Hotkey [X]
    shortcutManager.setActionHandler('xray-hud', () => {
      this.toggle();
    });

    window.addEventListener('keydown', (e) => {
      // Ignore if typing in input/textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'x' || e.key === 'X') {
        const xrayItem = shortcutManager.shortcuts.find(s => s.id === 'xray-hud');
        if (xrayItem && !xrayItem.keys.some(k => k.toLowerCase() === 'keyx' || k.toLowerCase() === 'x')) {
          return;
        }
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        e.preventDefault();
        this.close();
      }
    });

    // 3. Close Button & Backdrop
    const closeBtn = document.getElementById('xray-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    const backdrop = document.getElementById('xray-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (!this.overlay) return;
    this.isOpen = true;
    this.overlay.classList.add('is-active');
    this.overlay.setAttribute('aria-hidden', 'false');
    hapticAudio.playDrop();
    hapticAudio.playWhoosh();

    // Lock page scroll
    document.body.style.overflow = 'hidden';

    // Refresh hardware & environment telemetry
    this.updateDeviceTelemetry();

    // Start RAF telemetry loop
    this.startLoop();
  }

  async updateDeviceTelemetry() {
    try {
      const data = await deviceTelemetry.gatherFullTelemetry();
      
      const cpuEl = document.getElementById('xray-cpu-cores');
      const cpuGenEl = document.getElementById('xray-cpu-gen');
      const dgpuNameEl = document.getElementById('xray-dgpu-name');
      const dgpuGenEl = document.getElementById('xray-dgpu-gen');
      const igpuNameEl = document.getElementById('xray-igpu-name');
      const igpuGenEl = document.getElementById('xray-igpu-gen');
      const ramEl = document.getElementById('xray-ram-val');
      const ssdEl = document.getElementById('xray-ssd-quota');
      const hwTierEl = document.getElementById('xray-hw-tier');

      const formFactorEl = document.getElementById('xray-form-factor');
      const osEl = document.getElementById('xray-os-platform');
      const displayEl = document.getElementById('xray-display-res');
      const gamutEl = document.getElementById('xray-color-gamut');
      const netEl = document.getElementById('xray-net-cadence');
      const formTagEl = document.getElementById('xray-form-tag');

      if (cpuEl) cpuEl.textContent = data.cpu.description;
      if (cpuGenEl) {
        cpuGenEl.textContent = data.cpu.generation;
        cpuGenEl.title = data.cpu.generation;
      }
      
      if (dgpuNameEl) {
        dgpuNameEl.textContent = data.gpus.dgpu?.renderer || 'N/A';
        dgpuNameEl.title = data.gpus.dgpu?.renderer || '';
      }
      if (dgpuGenEl) {
        dgpuGenEl.textContent = data.gpus.dgpu?.generation || 'GENERIC HARDWARE ACCEL';
        dgpuGenEl.title = data.gpus.dgpu?.generation || '';
      }

      if (igpuNameEl) {
        igpuNameEl.textContent = data.gpus.igpu?.renderer || 'N/A';
        igpuNameEl.title = data.gpus.igpu?.renderer || '';
      }
      if (igpuGenEl) {
        igpuGenEl.textContent = data.gpus.igpu?.generation || 'SYSTEM INTEGRATED CORE';
        igpuGenEl.title = data.gpus.igpu?.generation || '';
      }

      if (ramEl) ramEl.textContent = data.memory.fullDisplay;
      if (ssdEl) ssdEl.textContent = data.storage;
      if (hwTierEl) {
        hwTierEl.textContent = data.gpus.hasDualGPU 
          ? 'DUAL-GPU HYBRID // ACCELERATED' 
          : (data.cpu.cores >= 8 ? 'ONLINE // HIGH-TIER' : 'ONLINE // EFFICIENCY');
      }

      if (formFactorEl) formFactorEl.textContent = data.formFactor.label;
      if (osEl) osEl.textContent = data.os.display;
      if (displayEl) displayEl.textContent = data.display.nativeRes;
      if (gamutEl) gamutEl.textContent = data.display.gamut;
      if (netEl) netEl.textContent = data.network;
      if (formTagEl) formTagEl.textContent = data.formFactor.type;

      const themeStateEl = document.getElementById('xray-theme-state');
      if (themeStateEl) themeStateEl.textContent = data.themeStatus;
    } catch (err) {
      console.warn('Telemetry gather error:', err);
    }
  }

  close() {
    if (!this.overlay || !this.isOpen) return;
    this.isOpen = false;
    this.overlay.classList.remove('is-active');
    this.overlay.setAttribute('aria-hidden', 'true');
    hapticAudio.playWhoosh();

    document.body.style.overflow = '';

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  startLoop() {
    const loop = (now) => {
      if (!this.isOpen) return;

      // FPS Calculation
      this.frames++;
      if (now > this.lastTime + 500) {
        this.fps = Math.round((this.frames * 1000) / (now - this.lastTime));
        this.fpsHistory.shift();
        this.fpsHistory.push(this.fps);
        this.frames = 0;
        this.lastTime = now;
      }

      this.updateTelemetryDOM();
      this.drawFFTCanvas();
      this.drawFPSCanvas();

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  updateTelemetryDOM() {
    // Audio DSP Energy
    const audio = (monolithAudio && typeof monolithAudio.getAudioEnergy === 'function')
      ? monolithAudio.getAudioEnergy()
      : { bass: 0, mid: 0, overall: 0, isPlaying: false, trackName: 'IDLE' };

    const trackNameEl = document.getElementById('xray-track-name');
    const bassEl = document.getElementById('xray-bass-val');
    const midEl = document.getElementById('xray-mid-val');
    const energyEl = document.getElementById('xray-energy-val');

    if (trackNameEl) trackNameEl.textContent = audio.isPlaying ? audio.trackName : 'DSP OFF';
    if (bassEl) bassEl.textContent = audio.bass.toFixed(3);
    if (midEl) midEl.textContent = audio.mid.toFixed(3);
    if (energyEl) energyEl.textContent = audio.overall.toFixed(3);

    // FPS
    const fpsReadout = document.getElementById('xray-fps-readout');
    const frametimeEl = document.getElementById('xray-frametime');
    const dprEl = document.getElementById('xray-dpr');
    const stabilityEl = document.getElementById('xray-stability');

    if (fpsReadout) fpsReadout.textContent = `${this.fps} FPS`;
    if (frametimeEl) frametimeEl.textContent = `${(1000 / Math.max(1, this.fps)).toFixed(1)}ms`;
    if (dprEl) dprEl.textContent = `${(window.devicePixelRatio || 1).toFixed(1)}x DPR`;

    if (stabilityEl) {
      if (this.fps >= 100) {
        stabilityEl.textContent = `${this.fps}Hz PRO MOTION`;
        stabilityEl.className = 'tag-success';
      } else if (this.fps >= 55) {
        stabilityEl.textContent = 'OPTIMAL // 60Hz+';
        stabilityEl.className = 'tag-success';
      } else {
        stabilityEl.textContent = 'POWER ADAPTIVE';
        stabilityEl.className = '';
      }
    }

    // Viewport & DOM
    const scrollPosEl = document.getElementById('xray-viewport-pos');
    const domCountEl = document.getElementById('xray-dom-count');
    const seedEl = document.getElementById('xray-session-seed');
    const themeEl = document.getElementById('xray-theme-state');

    if (scrollPosEl) scrollPosEl.textContent = `Y: ${Math.round(window.scrollY)}px`;
    if (domCountEl) domCountEl.textContent = document.getElementsByTagName('*').length.toString();

    const activeSeed = document.getElementById('session-seed-badge')?.textContent || '#432-TERRA';
    if (seedEl) seedEl.textContent = activeSeed;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (themeEl) themeEl.textContent = isDark ? 'OBSIDIAN // DARK' : 'LIMESTONE // LIGHT';
  }

  drawFFTCanvas() {
    if (!this.fftCtx || !this.fftCanvas) return;
    const ctx = this.fftCtx;
    const w = this.fftCanvas.width;
    const h = this.fftCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(74, 93, 78, 0.2)' : 'rgba(0, 0, 0, 0.08)';
    const barColor = isDark ? '#4A5D4E' : '#2D3748';
    const accentColor = '#10B981';

    // Grid baseline
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h - 1);
    ctx.lineTo(w, h - 1);
    ctx.stroke();

    const audio = (monolithAudio && typeof monolithAudio.getAudioEnergy === 'function')
      ? monolithAudio.getAudioEnergy()
      : null;

    if (!audio || !audio.isPlaying || !audio.freqBins) {
      // Idle wave
      ctx.strokeStyle = gridColor;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      return;
    }

    const bins = audio.freqBins;
    const barCount = 36;
    const barWidth = (w / barCount) - 2;

    for (let i = 0; i < barCount; i++) {
      const binIdx = Math.floor((i / barCount) * (bins.length * 0.65));
      const val = bins[binIdx] / 255;
      const barHeight = Math.max(2, val * (h - 8));
      const x = i * (barWidth + 2);
      const y = h - barHeight;

      ctx.fillStyle = i < 8 ? accentColor : barColor;
      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }

  drawFPSCanvas() {
    if (!this.fpsCtx || !this.fpsCanvas) return;
    const ctx = this.fpsCtx;
    const w = this.fpsCanvas.width;
    const h = this.fpsCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(74, 93, 78, 0.2)' : 'rgba(0, 0, 0, 0.08)';
    const lineColor = isDark ? '#10B981' : '#2E7D32';

    // Dynamic ceiling based on actual measured peak (supports 60Hz, 120Hz, 144Hz, 165Hz, 240Hz+)
    const currentPeak = Math.max(60, ...this.fpsHistory);
    const maxCeil = currentPeak > 180 ? 240 : (currentPeak > 130 ? 165 : (currentPeak > 80 ? 120 : 75));

    // Reference baseline hairlines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    // 60 Hz reference line
    const y60 = h - (60 / maxCeil) * (h - 12) - 6;
    ctx.beginPath();
    ctx.moveTo(0, y60);
    ctx.lineTo(w, y60);
    ctx.stroke();

    // High refresh reference line if above 60Hz
    if (maxCeil > 75) {
      const highRef = maxCeil >= 200 ? 144 : 120;
      const yHigh = h - (highRef / maxCeil) * (h - 12) - 6;
      ctx.beginPath();
      ctx.moveTo(0, yHigh);
      ctx.lineTo(w, yHigh);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Line Graph
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const step = w / (this.fpsHistory.length - 1);
    this.fpsHistory.forEach((fpsVal, idx) => {
      const norm = Math.max(0, Math.min(maxCeil, fpsVal)) / maxCeil;
      const y = h - (norm * (h - 12)) - 6;
      const x = idx * step;

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }
}


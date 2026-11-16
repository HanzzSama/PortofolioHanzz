/**
 * METEOROLOGICAL CONTOUR & ACOUSTIC NADA WAVE ENGINE
 * Generative Topographic Isobars, Real-Time Open-Meteo Telemetry & 432Hz Sound Synthesis
 * High-Refresh Rate Compatible (60/120/144/240Hz)
 */

import { monolithAudio } from './monolithAudioEngine.js';

export class WeatherContourEngine {
  constructor() {
    this.canvas = document.getElementById('weather-contour-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d', { alpha: true }) : null;

    // Viewport dimensions
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Live Meteorological State (Default: Semarang Geodesic Node -6.9667, 110.4167)
    this.weather = {
      tempC: 29.4,
      apparentC: 33.2,
      unit: 'C',
      humidity: 78,
      pressureHpa: 1011.8,
      windSpeedKm: 12.5,
      windDirectionDeg: 135,
      cloudCoverPct: 45,
      weatherCode: 2,
      conditionLabel: 'TROPICAL OVERCAST // BIOPHILIC OPTIMAL',
      uvIndex: 4.8,
      isDay: 1,
      lastSync: new Date(),
      isLive: false
    };

    // Contour Visualization State
    this.contourMode = 'isobars'; // 'isobars' | 'wind' | 'elevation'
    this.contourLevels = 16;
    this.time = 0;
    this.animId = null;

    // Interactive Cursor Magnetic Warp
    this.mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false
    };

    // Nada Wave Mode & Sound Synthesis
    this.isNadaWaveActive = false;
    this.waveRipples = [];
    this.audioNodes = null;
    this.lastToneTime = 0;

    // Theme state
    this.isDark = true;

    if (this.canvas) {
      this.init();
    }
  }

  init() {
    this.resize();
    this.checkTheme();
    this.bindEvents();
    this.fetchRealtimeWeather();
    this.startLoop();
  }

  checkTheme() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    this.isDark = theme !== 'light';
  }

  resize() {
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    this.width = Math.floor(rect.width) || 600;
    this.height = Math.floor(rect.height) || 400;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Canvas Mouse Interaction for Topographic Elevation Warp
    if (this.canvas) {
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.targetX = e.clientX - rect.left;
        this.mouse.targetY = e.clientY - rect.top;
        this.mouse.isHovered = true;

        // If Nada Wave mode is active, play harmonic microtones corresponding to elevation
        if (this.isNadaWaveActive) {
          this.playElevationTone(this.mouse.targetX, this.mouse.targetY);
        }

        // Update coordinate overlay
        const coordEl = document.getElementById('weather-cursor-coord');
        if (coordEl) {
          const latOffset = ((this.mouse.targetY / this.height) * 0.04 - 0.02).toFixed(4);
          const lonOffset = ((this.mouse.targetX / this.width) * 0.04 - 0.02).toFixed(4);
          coordEl.textContent = `07°00.${Math.abs(Math.round(latOffset * 1000))}S 110°25.${Math.abs(Math.round(lonOffset * 1000))}E`;
        }
      }, { passive: true });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.isHovered = false;
        this.mouse.targetX = -1000;
        this.mouse.targetY = -1000;
      });

      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.triggerWaveRipple(x, y, 1.2);
        this.playChordStrike();
      });
    }

    // Nada Wave Mode Toggle Button
    const waveBtn = document.getElementById('weather-nada-wave-btn');
    if (waveBtn) {
      waveBtn.addEventListener('click', () => {
        this.toggleNadaWaveMode();
      });
    }

    // Temperature Unit Toggle Buttons (°C / °F)
    const unitBtns = document.querySelectorAll('[data-weather-unit]');
    unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const unit = btn.getAttribute('data-weather-unit');
        this.setUnit(unit);
      });
    });

    // Layer Mode Buttons
    const modeBtns = document.querySelectorAll('[data-weather-mode]');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        this.contourMode = btn.getAttribute('data-weather-mode') || 'isobars';
      });
    });

    // Refresh Sync Button
    const syncBtn = document.getElementById('weather-sync-refresh-btn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        this.fetchRealtimeWeather(true);
      });
    }

    // Theme mutation observer
    const observer = new MutationObserver(() => this.checkTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  // Fetch real-time meteorological data from Open-Meteo
  async fetchRealtimeWeather(isManual = false) {
    const lat = -6.9667;
    const lon = 110.4167;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&timezone=Asia%2FJakarta`;

    try {
      const response = await fetch(url, { cache: 'no-cache' });
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      if (data && data.current) {
        const curr = data.current;
        this.weather.tempC = curr.temperature_2m ?? 29.4;
        this.weather.apparentC = curr.apparent_temperature ?? 33.2;
        this.weather.humidity = curr.relative_humidity_2m ?? 78;
        this.weather.pressureHpa = curr.surface_pressure ?? 1011.8;
        this.weather.windSpeedKm = curr.wind_speed_10m ?? 12.5;
        this.weather.windDirectionDeg = curr.wind_direction_10m ?? 135;
        this.weather.cloudCoverPct = curr.cloud_cover ?? 45;
        this.weather.weatherCode = curr.weather_code ?? 2;
        this.weather.isDay = curr.is_day ?? 1;
        this.weather.conditionLabel = this.mapWeatherCode(this.weather.weatherCode, this.weather.isDay);
        this.weather.lastSync = new Date();
        this.weather.isLive = true;

        this.updateDOMTelemetry();
      }
    } catch (_) {
      // Graceful biophilic fallback simulation for offline/sandboxed environments
      this.simulateDiurnalWeather();
      this.updateDOMTelemetry();
    }
  }

  // Diurnal realistic solar model for Semarang when offline
  simulateDiurnalWeather() {
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    // Diurnal temperature curve peaking at 14:00 (32°C), minimum at 05:00 (24°C)
    const solarCurve = Math.sin(((hours - 8) / 24) * Math.PI * 2);
    this.weather.tempC = +(27.5 + solarCurve * 4.2).toFixed(1);
    this.weather.apparentC = +(this.weather.tempC + 3.8).toFixed(1);
    this.weather.humidity = Math.round(82 - solarCurve * 18);
    this.weather.pressureHpa = +(1011.5 + Math.cos(hours * 0.26) * 1.8).toFixed(1);
    this.weather.windSpeedKm = +(9.0 + Math.abs(solarCurve) * 6.5).toFixed(1);
    this.weather.windDirectionDeg = Math.round((120 + hours * 3) % 360);
    this.weather.cloudCoverPct = Math.round(40 + Math.sin(hours * 0.5) * 25);
    this.weather.isDay = hours >= 5.5 && hours <= 18.0 ? 1 : 0;
    this.weather.conditionLabel = this.weather.isDay ? 'DIURNAL SUN // BIOPHILIC OPTIMAL' : 'NOCTURNAL OBSIDIAN // LUMINESCENT ARC';
    this.weather.isLive = false;
  }

  mapWeatherCode(code, isDay) {
    switch (code) {
      case 0: return isDay ? 'CLEAR SKY // AZIMUTH ZENITH' : 'CLEAR NIGHT // ASTRONOMICAL OBSIDIAN';
      case 1:
      case 2:
      case 3: return isDay ? 'TROPICAL OVERCAST // DIFFUSE SUN' : 'NIGHT CUMULUS // LUMINESCENT CANOPY';
      case 45:
      case 48: return 'BIOPHILIC MIST // CONDENSATION DEW';
      case 51:
      case 53:
      case 55: return 'WARM SAGE DRIZZLE // PRECIPITATION';
      case 61:
      case 63:
      case 65: return 'TROPICAL MONSOON // SACRED RAIN';
      case 80:
      case 81:
      case 82: return 'TORRENTIAL CONVECTIVE SHOWERS';
      case 95:
      case 96:
      case 99: return 'IONIC ATMOSPHERIC THUNDERSTORM';
      default: return 'TROPICAL BIOSPHERE // BALANCED';
    }
  }

  setUnit(unit) {
    this.weather.unit = unit;
    const unitBtns = document.querySelectorAll('[data-weather-unit]');
    unitBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-weather-unit') === unit);
    });
    this.updateDOMTelemetry();
  }

  updateDOMTelemetry() {
    const isF = this.weather.unit === 'F';
    const currentTemp = isF ? (this.weather.tempC * 9 / 5 + 32) : this.weather.tempC;
    const apparentTemp = isF ? (this.weather.apparentC * 9 / 5 + 32) : this.weather.apparentC;
    const unitSymbol = isF ? '°F' : '°C';

    const tempEl = document.getElementById('weather-temp-display');
    if (tempEl) tempEl.textContent = `${currentTemp.toFixed(1)}${unitSymbol}`;

    const apparentEl = document.getElementById('weather-apparent-display');
    if (apparentEl) apparentEl.textContent = `APPARENT: ${apparentTemp.toFixed(1)}${unitSymbol}`;

    const condEl = document.getElementById('weather-condition-display');
    if (condEl) condEl.textContent = this.weather.conditionLabel;

    const pressureEl = document.getElementById('weather-pressure-display');
    if (pressureEl) pressureEl.textContent = `${this.weather.pressureHpa} hPa`;

    const windEl = document.getElementById('weather-wind-display');
    if (windEl) windEl.textContent = `${this.weather.windSpeedKm} km/h`;

    const windDirEl = document.getElementById('weather-wind-dir');
    if (windDirEl) windDirEl.textContent = `${this.weather.windDirectionDeg}° ${this.degToCompass(this.weather.windDirectionDeg)}`;

    const humidityEl = document.getElementById('weather-humidity-display');
    if (humidityEl) humidityEl.textContent = `${this.weather.humidity}%`;

    const humidityBar = document.getElementById('weather-humidity-bar');
    if (humidityBar) humidityBar.style.width = `${Math.min(100, this.weather.humidity)}%`;

    const cloudEl = document.getElementById('weather-cloud-display');
    if (cloudEl) cloudEl.textContent = `${this.weather.cloudCoverPct}%`;

    const cloudBar = document.getElementById('weather-cloud-bar');
    if (cloudBar) cloudBar.style.width = `${Math.min(100, this.weather.cloudCoverPct)}%`;

    const syncStatusEl = document.getElementById('weather-sync-status');
    if (syncStatusEl) {
      syncStatusEl.textContent = this.weather.isLive
        ? `OPEN-METEO SYNCED // ${this.formatTime(this.weather.lastSync)}`
        : `ASTRONOMICAL MODEL // ${this.formatTime(this.weather.lastSync)}`;
    }
  }

  degToCompass(deg) {
    const val = Math.floor((deg / 22.5) + 0.5);
    const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return arr[val % 16];
  }

  formatTime(date) {
    if (!date) return '--:--';
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m} WIB`;
  }

  // =========================================================================
  // NADA WAVE AUDIO SYNTHESIS (432Hz Solfeggio & Harmonic Chord Suite)
  // =========================================================================
  ensureAudioContext() {
    if (monolithAudio && monolithAudio.ctx) {
      if (monolithAudio.ctx.state === 'suspended') {
        monolithAudio.ctx.resume().catch(() => {});
      }
      return monolithAudio.ctx;
    }
    return monolithAudio ? monolithAudio.ensureContext() : null;
  }

  toggleNadaWaveMode() {
    this.isNadaWaveActive = !this.isNadaWaveActive;

    const waveBtn = document.getElementById('weather-nada-wave-btn');
    const statusBadge = document.getElementById('weather-wave-status');
    if (waveBtn) {
      waveBtn.classList.toggle('is-playing', this.isNadaWaveActive);
    }
    if (statusBadge) {
      statusBadge.classList.toggle('is-active', this.isNadaWaveActive);
    }

    if (this.isNadaWaveActive) {
      this.startNadaWaveDrone();
      // Trigger a dramatic central expanding soundwave across the contour canvas
      this.triggerWaveRipple(this.width / 2, this.height / 2, 2.0);
    } else {
      this.stopNadaWaveDrone();
    }
  }

  startNadaWaveDrone() {
    const ctx = this.ensureAudioContext();
    if (!ctx) return;

    try {
      // 432Hz Solfeggio Pentatonic Cluster (F#3, C#4, F#4, G#4)
      const freqs = [182.25, 273.38, 364.5, 432.0];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.2);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(680, ctx.currentTime);

      const oscs = freqs.map((f, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        // Slow organic binaural beating (0.1Hz ~ 0.3Hz)
        oscGain.gain.setValueAtTime(0.25 / freqs.length, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        return osc;
      });

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      this.audioNodes = { masterGain, filter, oscs };
    } catch (_) {}
  }

  stopNadaWaveDrone() {
    if (!this.audioNodes) return;
    const ctx = this.ensureAudioContext();
    if (ctx && this.audioNodes.masterGain) {
      try {
        this.audioNodes.masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          this.audioNodes?.oscs?.forEach(o => {
            try { o.stop(); } catch (_) {}
          });
          this.audioNodes = null;
        }, 700);
      } catch (_) {}
    }
  }

  // Play a musical harmonic tone when moving across contour elevations
  playElevationTone(x, y) {
    const now = performance.now();
    if (now - this.lastToneTime < 140) return;
    this.lastToneTime = now;

    const ctx = this.ensureAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const t = ctx.currentTime;
      // Map elevation field value at (x, y) to pentatonic pitch
      const elev = this.sampleElevation(x, y);
      const pentatonic = [216, 243, 270, 324, 364.5, 432, 486, 540];
      const noteIdx = Math.floor(Math.abs(elev) * pentatonic.length) % pentatonic.length;
      const freq = pentatonic[noteIdx];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.025, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.36);

      // Spawn a mini contour ripple ring
      this.triggerWaveRipple(x, y, 0.6);
    } catch (_) {}
  }

  // Play a bell-like chord strike on click
  playChordStrike() {
    const ctx = this.ensureAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const t = ctx.currentTime;
      const chord = [432, 540, 648, 864];
      chord.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + idx * 0.02);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.03 / chord.length, t + 0.01 + idx * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.65 + idx * 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.02);
        osc.stop(t + 0.75 + idx * 0.05);
      });
    } catch (_) {}
  }

  // Trigger an acoustic wave ripple across the contour canvas
  triggerWaveRipple(x, y, power = 1.0) {
    this.waveRipples.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(this.width, this.height) * 1.1,
      speed: 380 * power,
      alpha: 1.0,
      active: true
    });
  }

  // Public hook for theme wave transition sync
  triggerThemeWave() {
    this.triggerWaveRipple(this.width / 2, this.height / 2, 1.8);
    this.playChordStrike();
  }

  // =========================================================================
  // GENERATIVE TOPOGRAPHIC CONTOUR RENDERING ENGINE
  // =========================================================================
  startLoop() {
    this.lastFrameTime = performance.now();
    const render = (timestamp) => {
      this.renderFrame(timestamp);
      this.animId = requestAnimationFrame(render);
    };
    this.animId = requestAnimationFrame(render);
  }

  // Procedural 2D elevation sample based on multi-harmonic sine waves & wind vector
  sampleElevation(x, y) {
    const scaleX = x * 0.0045;
    const scaleY = y * 0.0045;
    const windAngle = (this.weather.windDirectionDeg * Math.PI) / 180;
    const windSpeedFactor = this.weather.windSpeedKm * 0.015;

    // Wind drift vector
    const wx = Math.cos(windAngle) * this.time * windSpeedFactor;
    const wy = Math.sin(windAngle) * this.time * windSpeedFactor;

    // Harmonic multi-octave elevation field
    let val = Math.sin(scaleX + wx) * Math.cos(scaleY + wy);
    val += Math.sin((scaleX * 2.1 - wy) * 0.8) * Math.cos((scaleY * 2.1 + wx) * 0.8) * 0.5;
    val += Math.sin((scaleX * 4.3 + wx * 1.5)) * Math.sin((scaleY * 4.3 - wy * 1.5)) * 0.25;

    // Cursor magnetic elevation warp (depression / mountain peak)
    if (this.mouse.isHovered && this.mouse.x > -100) {
      const dx = x - this.mouse.x;
      const dy = y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const warpRadius = 140;
      if (dist < warpRadius) {
        const falloff = Math.cos((dist / warpRadius) * (Math.PI / 2));
        val += falloff * 0.85; // Creates an interactive topographic mountain peak under cursor
      }
    }

    // Ripple shockwave distortion
    for (let i = 0; i < this.waveRipples.length; i++) {
      const r = this.waveRipples[i];
      if (!r.active) continue;
      const rdx = x - r.x;
      const rdy = y - r.y;
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
      const waveWidth = 36;
      if (Math.abs(rdist - r.radius) < waveWidth) {
        const waveProgress = 1 - Math.abs(rdist - r.radius) / waveWidth;
        val += Math.sin(waveProgress * Math.PI) * 0.65 * r.alpha;
      }
    }

    return (val + 1.75) / 3.5; // Normalized 0..1
  }

  renderFrame(timestamp) {
    if (!this.ctx || !this.width || !this.height) return;

    const now = timestamp || performance.now();
    const dtMs = this.lastFrameTime ? Math.min(50, Math.max(1, now - this.lastFrameTime)) : 16.67;
    this.lastFrameTime = now;
    const dt = dtMs / 16.667;

    // Progress time based on wind velocity
    this.time += 0.008 * dt * (1 + this.weather.windSpeedKm * 0.03);

    // Smooth cursor interpolation
    if (this.mouse.isHovered) {
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.22 * dt;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.22 * dt;
    }

    // Update wave ripples
    for (let i = 0; i < this.waveRipples.length; i++) {
      const r = this.waveRipples[i];
      if (!r.active) continue;
      r.radius += r.speed * (dtMs * 0.001);
      r.alpha = Math.max(0, 1 - (r.radius / r.maxRadius));
      if (r.radius >= r.maxRadius || r.alpha <= 0.01) {
        r.active = false;
      }
    }

    // Clear Canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Grid resolution for contour marching segments
    const stepX = 14;
    const stepY = 14;
    const cols = Math.ceil(this.width / stepX) + 1;
    const rows = Math.ceil(this.height / stepY) + 1;

    // Sample 2D grid matrix
    const grid = [];
    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        grid[y][x] = this.sampleElevation(x * stepX, y * stepY);
      }
    }

    // Theme color palette: Obsidian (Emerald Moss / Warm Gold) vs Limestone (Sage Olive / Slate)
    const baseColor = this.isDark ? '16, 185, 129' : '74, 93, 78';
    const accentColor = this.isDark ? '212, 175, 55' : '58, 80, 65';

    // Render Contour Isobar Lines
    const numLevels = this.contourLevels;
    this.ctx.lineWidth = 1;

    for (let l = 1; l < numLevels; l++) {
      const threshold = l / numLevels;
      const isMajorIsobar = l % 4 === 0;

      const alpha = isMajorIsobar
        ? (this.isDark ? 0.42 : 0.45)
        : (this.isDark ? 0.14 : 0.16);

      this.ctx.strokeStyle = isMajorIsobar
        ? `rgba(${accentColor}, ${alpha})`
        : `rgba(${baseColor}, ${alpha})`;

      this.ctx.beginPath();

      // Contour line tracing
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const v00 = grid[y][x];
          const v10 = grid[y][x + 1];
          const v01 = grid[y + 1][x];
          const v11 = grid[y + 1][x + 1];

          // Horizontal segments
          if ((v00 < threshold && v10 >= threshold) || (v00 >= threshold && v10 < threshold)) {
            const frac = (threshold - v00) / (v10 - v00 + 1e-6);
            const px = (x + frac) * stepX;
            const py = y * stepY;
            this.ctx.moveTo(px, py);
            this.ctx.lineTo(px + 1, py);
          }
          // Vertical segments
          if ((v00 < threshold && v01 >= threshold) || (v00 >= threshold && v01 < threshold)) {
            const frac = (threshold - v00) / (v01 - v00 + 1e-6);
            const px = x * stepX;
            const py = (y + frac) * stepY;
            this.ctx.moveTo(px, py);
            this.ctx.lineTo(px, py + 1);
          }
        }
      }
      this.ctx.stroke();

      // Draw elevation contour label at center of major isobars
      if (isMajorIsobar && l === 8) {
        const isobarHpa = (990 + threshold * 35).toFixed(0);
        this.ctx.font = '9px "JetBrains Mono", monospace';
        this.ctx.fillStyle = `rgba(${this.isDark ? '16, 185, 129' : '74, 93, 78'}, 0.45)`;
        this.ctx.fillText(`${isobarHpa} hPa // ISO.${l}`, 24, 40 + l * 18);
      }
    }

    // Draw Wind Stream Vector Streamlines if in 'wind' or 'isobars' mode
    if (this.contourMode === 'wind' || this.contourMode === 'isobars') {
      this.renderWindStreamlines(dt);
    }

    // Draw Ripple Wave Rings
    for (let i = 0; i < this.waveRipples.length; i++) {
      const r = this.waveRipples[i];
      if (!r.active) continue;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${this.isDark ? '16, 185, 129' : '74, 93, 78'}, ${r.alpha * 0.75})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Draw Cursor Elevation Magnetic Reticle when hovering
    if (this.mouse.isHovered && this.mouse.x > -100) {
      this.ctx.save();
      const cursorPulse = Math.sin(now * 0.008) * 3;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 20 + cursorPulse, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${this.isDark ? '212, 175, 55' : '74, 93, 78'}, 0.6)`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Crosshair lines
      this.ctx.beginPath();
      this.ctx.moveTo(this.mouse.x - 28, this.mouse.y);
      this.ctx.lineTo(this.mouse.x + 28, this.mouse.y);
      this.ctx.moveTo(this.mouse.x, this.mouse.y - 28);
      this.ctx.lineTo(this.mouse.x, this.mouse.y + 28);
      this.ctx.strokeStyle = `rgba(${this.isDark ? '16, 185, 129' : '74, 93, 78'}, 0.35)`;
      this.ctx.stroke();

      this.ctx.restore();
    }
  }

  // Draw subtle wind flow streamlines
  renderWindStreamlines(dt) {
    const angle = (this.weather.windDirectionDeg * Math.PI) / 180;
    const speed = Math.max(0.4, this.weather.windSpeedKm * 0.06);
    const count = 18;

    this.ctx.save();
    this.ctx.strokeStyle = `rgba(${this.isDark ? '16, 185, 129' : '74, 93, 78'}, 0.16)`;
    this.ctx.lineWidth = 0.8;

    for (let i = 0; i < count; i++) {
      const seed = i * 137.5;
      const x = ((seed + this.time * speed * 30) % (this.width + 100)) - 50;
      const y = ((i * 37 + Math.sin(this.time + i) * 20) % this.height);
      const len = 25 + Math.sin(i) * 12;

      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    this.stopNadaWaveDrone();
  }
}


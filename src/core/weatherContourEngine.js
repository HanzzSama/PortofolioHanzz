/**
 * METEOROLOGICAL CONTOUR & ACOUSTIC NADA WAVE ENGINE (v2.0)
 * Generative Topographic Isobars, Diurnal Solar Ambiance (Pagi, Siang, Sore, Petang, Malam),
 * Real-Time Open-Meteo Telemetry & 432Hz Sound Synthesis
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

    // Diurnal Ambiance State: 'auto' | 'dawn' | 'noon' | 'golden' | 'twilight' | 'night'
    this.diurnalMode = 'auto';
    this.activePhase = 'noon';

    // Ambient Airborne Particles (36 lightweight floating particles)
    this.ambientParticles = [];
    this.initAmbientParticles();

    // Contour Visualization State
    this.contourMode = 'isobars'; // 'isobars' | 'wind' | 'elevation'
    this.contourLevels = 18;
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
    this.resolveDiurnalPhase();
    this.startLoop();
  }

  initAmbientParticles() {
    this.ambientParticles = [];
    for (let i = 0; i < 36; i++) {
      this.ambientParticles.push({
        x: Math.random() * (this.width || 600),
        y: Math.random() * (this.height || 400),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        size: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6,
        pulseSpeed: 0.002 + Math.random() * 0.004,
        seed: Math.random() * 100
      });
    }
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

    if (this.ambientParticles.length === 0) {
      this.initAmbientParticles();
    }
  }

  // Calculate diurnal atmospheric phase based on mode or local clock
  resolveDiurnalPhase() {
    if (this.diurnalMode !== 'auto') {
      this.activePhase = this.diurnalMode;
    } else {
      const now = new Date();
      const hours = now.getHours() + (now.getMinutes() / 60);

      if (hours >= 5.0 && hours < 10.0) {
        this.activePhase = 'dawn';     // Pagi Hari (05:00 - 10:00)
      } else if (hours >= 10.0 && hours < 15.5) {
        this.activePhase = 'noon';     // Siang Hari (10:00 - 15:30)
      } else if (hours >= 15.5 && hours < 18.5) {
        this.activePhase = 'golden';   // Sore Hari / Golden Hour (15:30 - 18:30)
      } else if (hours >= 18.5 && hours < 19.75) {
        this.activePhase = 'twilight'; // Petang / Senja (18:30 - 19:45)
      } else {
        this.activePhase = 'night';    // Malam Hari (19:45 - 05:00)
      }
    }

    this.updateDiurnalUI();
    return this.activePhase;
  }

  setDiurnalPhase(phase) {
    this.diurnalMode = phase;
    this.resolveDiurnalPhase();

    // Trigger visual contour wave ripple and harmonic tone shift
    this.triggerWaveRipple(this.width / 2, this.height / 2, 1.4);
    this.playChordStrike();

    // If Nada Wave is running, retune drone to new phase chord
    if (this.isNadaWaveActive) {
      this.stopNadaWaveDrone();
      setTimeout(() => this.startNadaWaveDrone(), 200);
    }
  }

  updateDiurnalUI() {
    // Update button states
    const btns = document.querySelectorAll('[data-diurnal-phase]');
    btns.forEach(btn => {
      const p = btn.getAttribute('data-diurnal-phase');
      btn.classList.toggle('is-active', p === this.diurnalMode);
    });

    // Tag the weather card with the active diurnal phase for dynamic telemetry badge styling
    const card = document.querySelector('.weather-contour-card');
    if (card) {
      card.setAttribute('data-diurnal-active', this.activePhase);
    }

    const phaseAccents = {
      dawn: { color: this.isDark ? '#fbbf24' : '#d97706' },
      noon: { color: this.isDark ? '#fb923c' : '#ea580c' },
      golden: { color: this.isDark ? '#ea580c' : '#c2410c' },
      twilight: { color: '#93c5fd' },
      night: { color: '#fef08a' }
    };

    // Update phase indicator label
    const indicator = document.getElementById('weather-phase-indicator');
    if (indicator) {
      const labels = {
        dawn: 'SOLAR: PAGI // WARM SUNRISE [06:00]',
        noon: 'SOLAR: SIANG // WARM AMBER ZENITH [12:00]',
        golden: 'SOLAR: SORE // ORANGE TUA GOLDEN HOUR [17:00]',
        twilight: 'SOLAR: PETANG // BIRU WARM TWILIGHT [19:00]',
        night: 'SOLAR: MALAM // BIRU DARK WARM [23:00]'
      };
      indicator.textContent = labels[this.activePhase] || 'SOLAR: SIANG // WARM AMBER ZENITH';
      if (phaseAccents[this.activePhase]) {
        indicator.style.color = phaseAccents[this.activePhase].color;
      }
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Diurnal Phase Buttons
    const diurnalBtns = document.querySelectorAll('[data-diurnal-phase]');
    diurnalBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const phase = btn.getAttribute('data-diurnal-phase');
        this.setDiurnalPhase(phase);
      });
    });

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

      // Mobile Touch Interaction
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          const rect = this.canvas.getBoundingClientRect();
          const x = e.touches[0].clientX - rect.left;
          const y = e.touches[0].clientY - rect.top;
          this.triggerWaveRipple(x, y, 1.2);
          this.playChordStrike();
        }
      }, { passive: true });

      this.canvas.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.targetX = e.touches[0].clientX - rect.left;
          this.mouse.targetY = e.touches[0].clientY - rect.top;
          this.mouse.isHovered = true;
          if (this.isNadaWaveActive) {
            this.playElevationTone(this.mouse.targetX, this.mouse.targetY);
          }
          const coordEl = document.getElementById('weather-cursor-coord');
          if (coordEl) {
            const latOffset = ((this.mouse.targetY / this.height) * 0.04 - 0.02).toFixed(4);
            const lonOffset = ((this.mouse.targetX / this.width) * 0.04 - 0.02).toFixed(4);
            coordEl.textContent = `07°00.${Math.abs(Math.round(latOffset * 1000))}S 110°25.${Math.abs(Math.round(lonOffset * 1000))}E`;
          }
        }
      }, { passive: true });

      this.canvas.addEventListener('touchend', () => {
        this.mouse.isHovered = false;
        this.mouse.targetX = -1000;
        this.mouse.targetY = -1000;
      }, { passive: true });
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
  // NADA WAVE AUDIO SYNTHESIS (Diurnal Solfeggio & Harmonic Chords)
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

  // Get harmonic chord frequencies based on diurnal phase
  getPhaseFrequencies() {
    switch (this.activePhase) {
      case 'dawn':
        // Dewy Morning Major 9th (A=432Hz): F#3 (182.25), A3 (216), C#4 (273.38), E4 (324), G#4 (432)
        return [182.25, 216.0, 273.38, 324.0, 432.0];
      case 'noon':
        // High Radiant Zenith Open Fifths (432Hz): D3 (144), A3 (216), E4 (324), B4 (486)
        return [144.0, 216.0, 324.0, 432.0, 486.0];
      case 'golden':
        // Soulful Golden Hour Pentatonic Minor 7th: D3 (144), F#3 (182.25), A3 (216), C#4 (273.38), E4 (324)
        return [144.0, 182.25, 216.0, 273.38, 364.5];
      case 'twilight':
        // Violet Dusk Twilight Sus4: C#3 (136.69), F#3 (182.25), G#3 (202.5), C#4 (273.38)
        return [136.69, 182.25, 202.5, 273.38, 405.0];
      case 'night':
      default:
        // Nocturnal 432Hz Deep Theta Drone: A2 (108), E3 (162), A3 (216), E4 (324), A4 (432)
        return [108.0, 162.0, 216.0, 324.0, 432.0];
    }
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
      this.triggerWaveRipple(this.width / 2, this.height / 2, 2.0);
    } else {
      this.stopNadaWaveDrone();
    }
  }

  startNadaWaveDrone() {
    const ctx = this.ensureAudioContext();
    if (!ctx) return;

    try {
      const freqs = this.getPhaseFrequencies();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.2);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      // Lowpass cutoff changes with diurnal mood: brighter in noon/golden, softer in dawn/night
      const cutoff = this.activePhase === 'noon' ? 950 : this.activePhase === 'golden' ? 780 : 540;
      filter.frequency.setValueAtTime(cutoff, ctx.currentTime);

      const oscs = freqs.map((f, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        // Organic micro-detuning for binaural warmth
        const detune = (idx - 2) * 1.2;
        osc.detune.setValueAtTime(detune, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.24 / freqs.length, ctx.currentTime);

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
    if (now - this.lastToneTime < 130) return;
    this.lastToneTime = now;

    const ctx = this.ensureAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const t = ctx.currentTime;
      const elev = this.sampleElevation(x, y);
      const pentatonic = this.getPhaseFrequencies();
      const noteIdx = Math.floor(Math.abs(elev) * pentatonic.length) % pentatonic.length;
      const freq = pentatonic[noteIdx] * (elev > 0.6 ? 2 : 1);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.028, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.40);

      this.triggerWaveRipple(x, y, 0.6);
    } catch (_) {}
  }

  // Play a bell-like chord strike on click
  playChordStrike() {
    const ctx = this.ensureAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const t = ctx.currentTime;
      const chord = this.getPhaseFrequencies();
      chord.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f * 2, t + idx * 0.02);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.035 / chord.length, t + 0.01 + idx * 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.75 + idx * 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.02);
        osc.stop(t + 0.85 + idx * 0.05);
      });
    } catch (_) {}
  }

  // Trigger an acoustic wave ripple across the contour canvas
  triggerWaveRipple(x, y, power = 1.0) {
    this.waveRipples.push({
      x,
      y,
      radius: 0,
      maxRadius: Math.max(this.width, this.height) * 1.15,
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
  // GENERATIVE TOPOGRAPHIC CONTOUR & DIURNAL RENDERING ENGINE
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
        val += falloff * 0.85;
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

    return (val + 1.75) / 3.5;
  }

  // Draw Sky Atmosphere Gradient matching active diurnal phase
  renderAtmosphericSky(now) {
    const phase = this.activePhase;
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);

    if (this.isDark) {
      // Obsidian Dark Theme Atmospheres
      switch (phase) {
        case 'dawn':
          // Pagi: Soft warm sunrise peach-amber glow
          grad.addColorStop(0, 'rgba(75, 42, 28, 0.65)');
          grad.addColorStop(0.5, 'rgba(52, 30, 22, 0.55)');
          grad.addColorStop(1, 'rgba(16, 14, 16, 0.95)');
          break;
        case 'noon':
          // Siang: Palette orange warm, soft solar daylight
          grad.addColorStop(0, 'rgba(95, 52, 20, 0.68)');
          grad.addColorStop(0.5, 'rgba(60, 32, 14, 0.60)');
          grad.addColorStop(1, 'rgba(18, 14, 12, 0.95)');
          break;
        case 'golden':
          // Sore: Palette orange tua warm, soft sunset glow
          grad.addColorStop(0, 'rgba(125, 45, 12, 0.78)');
          grad.addColorStop(0.5, 'rgba(85, 28, 10, 0.70)');
          grad.addColorStop(1, 'rgba(22, 12, 10, 0.96)');
          break;
        case 'twilight':
          // Petang: Biru warm twilight (indigo-cobalt dusk)
          grad.addColorStop(0, 'rgba(24, 46, 88, 0.88)');
          grad.addColorStop(0.5, 'rgba(18, 34, 68, 0.80)');
          grad.addColorStop(1, 'rgba(10, 16, 30, 0.98)');
          break;
        case 'night':
        default:
          // Malam: Biru dark warm nocturnal deep navy
          grad.addColorStop(0, 'rgba(10, 18, 38, 0.95)');
          grad.addColorStop(0.6, 'rgba(8, 14, 28, 0.96)');
          grad.addColorStop(1, 'rgba(5, 8, 18, 0.99)');
          break;
      }
    } else {
      // Limestone Light Theme Atmospheres (Warm, tactile, real-world natural daylight)
      switch (phase) {
        case 'dawn':
          // Pagi: Soft peach apricot sunrise morning light
          grad.addColorStop(0, 'rgba(255, 228, 205, 0.85)');
          grad.addColorStop(0.5, 'rgba(255, 240, 225, 0.60)');
          grad.addColorStop(1, 'rgba(247, 245, 240, 0.95)');
          break;
        case 'noon':
          // Siang: Palette orange warm, soft daylight glow
          grad.addColorStop(0, 'rgba(255, 225, 185, 0.88)');
          grad.addColorStop(0.5, 'rgba(255, 238, 215, 0.65)');
          grad.addColorStop(1, 'rgba(248, 246, 242, 0.95)');
          break;
        case 'golden':
          // Sore: Palette orange tua warm, soft golden hour
          grad.addColorStop(0, 'rgba(255, 185, 130, 0.92)');
          grad.addColorStop(0.5, 'rgba(250, 165, 105, 0.70)');
          grad.addColorStop(1, 'rgba(245, 232, 218, 0.96)');
          break;
        case 'twilight':
          // Petang: Biru warm twilight (rich warm blue dusk)
          grad.addColorStop(0, 'rgba(68, 108, 179, 0.85)');
          grad.addColorStop(0.5, 'rgba(110, 150, 210, 0.65)');
          grad.addColorStop(1, 'rgba(238, 242, 248, 0.96)');
          break;
        case 'night':
        default:
          // Malam: Biru dark warm midnight sky
          grad.addColorStop(0, 'rgba(28, 48, 82, 0.90)');
          grad.addColorStop(0.6, 'rgba(45, 72, 115, 0.70)');
          grad.addColorStop(1, 'rgba(230, 236, 244, 0.96)');
          break;
      }
    }

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // Draw Sun / Moon Celestial Body along astronomical orbital arc
  renderCelestialBody(now) {
    const phase = this.activePhase;
    let cx, cy, radius, isSun = true;
    let mainColor, glowColor, rayColor;

    switch (phase) {
      case 'dawn':
        // Low on left horizon rising (Pagi - soft golden sunrise)
        cx = this.width * 0.18;
        cy = this.height * 0.50;
        radius = 20;
        isSun = true;
        mainColor = this.isDark ? '#fbbf24' : '#d97706';
        glowColor = this.isDark ? 'rgba(245, 158, 11, 0.38)' : 'rgba(217, 119, 6, 0.35)';
        rayColor = this.isDark ? 'rgba(251, 191, 36, 0.60)' : 'rgba(217, 119, 6, 0.55)';
        break;
      case 'noon':
        // High zenith at top center (Siang - palette orange warm, soft)
        cx = this.width * 0.50;
        cy = this.height * 0.18;
        radius = 24;
        isSun = true;
        mainColor = this.isDark ? '#fb923c' : '#ea580c';
        glowColor = this.isDark ? 'rgba(249, 115, 22, 0.40)' : 'rgba(234, 88, 12, 0.35)';
        rayColor = this.isDark ? 'rgba(251, 146, 60, 0.68)' : 'rgba(234, 88, 12, 0.60)';
        break;
      case 'golden':
        // Sinking low on right horizon (Sore - palette orange tua warm, soft)
        cx = this.width * 0.82;
        cy = this.height * 0.54;
        radius = 26;
        isSun = true;
        mainColor = this.isDark ? '#ea580c' : '#c2410c';
        glowColor = this.isDark ? 'rgba(234, 88, 12, 0.48)' : 'rgba(194, 65, 12, 0.42)';
        rayColor = this.isDark ? 'rgba(249, 115, 22, 0.75)' : 'rgba(194, 65, 12, 0.68)';
        break;
      case 'twilight':
        // Dipped just below right horizon (Petang - biru warm twilight)
        cx = this.width * 0.88;
        cy = this.height * 0.68;
        radius = 18;
        isSun = true;
        mainColor = this.isDark ? '#60a5fa' : '#2563eb';
        glowColor = this.isDark ? 'rgba(96, 165, 250, 0.38)' : 'rgba(37, 99, 235, 0.35)';
        rayColor = this.isDark ? 'rgba(147, 197, 253, 0.65)' : 'rgba(59, 130, 246, 0.60)';
        break;
      case 'night':
      default:
        // Glowing Crescent Moon at upper right (Malam - biru dark warm moon & stars)
        cx = this.width * 0.78;
        cy = this.height * 0.22;
        radius = 18;
        isSun = false;
        mainColor = this.isDark ? '#fef08a' : '#1e3a8a';
        glowColor = this.isDark ? 'rgba(254, 240, 138, 0.35)' : 'rgba(30, 58, 138, 0.28)';
        break;
    }

    this.ctx.save();

    // Radiant Corona Glow
    const coronaRadius = radius * 3.4;
    const coronaGrad = this.ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, coronaRadius);
    coronaGrad.addColorStop(0, glowColor);
    coronaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    this.ctx.fillStyle = coronaGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, coronaRadius, 0, Math.PI * 2);
    this.ctx.fill();

    if (isSun) {
      // Draw Sun Body
      this.ctx.fillStyle = mainColor;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Sun Halo Ring
      this.ctx.strokeStyle = rayColor;
      this.ctx.lineWidth = 1.2;
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius + 5, 0, Math.PI * 2);
      this.ctx.stroke();

      // Minimalist Sun Rays
      const rot = now * 0.0006;
      const numRays = 8;
      this.ctx.strokeStyle = rayColor;
      this.ctx.lineWidth = 1.2;
      for (let i = 0; i < numRays; i++) {
        const a = rot + (i * Math.PI * 2) / numRays;
        const r1 = radius + 9;
        const r2 = radius + 16 + Math.sin(now * 0.004 + i) * 3;
        this.ctx.beginPath();
        this.ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
        this.ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
        this.ctx.stroke();
      }
    } else {
      // Draw Crisp Geometric Crescent Moon without punching transparent hole in sky
      this.ctx.fillStyle = mainColor;
      this.ctx.beginPath();
      // Outer arc from top to bottom
      this.ctx.arc(cx, cy, radius, -Math.PI * 0.42, Math.PI * 0.65, false);
      // Inner carve arc curving back from bottom to top
      this.ctx.arc(cx - radius * 0.42, cy - radius * 0.12, radius * 0.88, Math.PI * 0.65, -Math.PI * 0.42, true);
      this.ctx.closePath();
      this.ctx.fill();

      // Lunar Halo Ring
      this.ctx.strokeStyle = this.isDark ? 'rgba(254, 240, 138, 0.40)' : 'rgba(30, 58, 138, 0.35)';
      this.ctx.lineWidth = 0.9;
      this.ctx.setLineDash([3, 3]);
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    this.ctx.restore();
  }

  // Draw Airborne Atmospheric Particles (Mist in Dawn, Sparkles in Noon, Embers in Sore, Stars in Night)
  renderAtmosphericParticles(dt, now) {
    const phase = this.activePhase;
    this.ctx.save();

    for (let i = 0; i < this.ambientParticles.length; i++) {
      const p = this.ambientParticles[i];

      // Update position with wind drift
      const windSpeed = Math.max(0.2, this.weather.windSpeedKm * 0.04);
      p.x += (p.vx + windSpeed) * dt;
      p.y += p.vy * dt;

      // Wrap around edges
      if (p.x > this.width + 10) p.x = -10;
      if (p.x < -10) p.x = this.width + 10;
      if (p.y > this.height + 10) p.y = -10;
      if (p.y < -10) p.y = this.height + 10;

      // Dynamic alpha pulse
      const pulse = 0.5 + Math.sin(now * p.pulseSpeed + p.seed) * 0.5;
      const alpha = p.alpha * pulse;

      let r, g, b;
      switch (phase) {
        case 'dawn':
          // Soft golden-peach morning motes
          r = 251; g = 191; b = 36;
          break;
        case 'noon':
          // Warm soft orange solar motes
          r = 251; g = 146; b = 60;
          break;
        case 'golden':
          // Orange tua warm sunset embers
          r = 234; g = 88; b = 12;
          break;
        case 'twilight':
          // Biru warm twilight motes
          r = 96; g = 165; b = 250;
          break;
        case 'night':
        default:
          // Biru dark warm starry motes
          r = 254; g = 240; b = 138;
          break;
      }

      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      this.ctx.beginPath();

      if (phase === 'night' && i % 3 === 0) {
        // Draw 4-point star for select night particles
        const arm = p.size * 1.8;
        this.ctx.moveTo(p.x, p.y - arm);
        this.ctx.lineTo(p.x, p.y + arm);
        this.ctx.moveTo(p.x - arm, p.y);
        this.ctx.lineTo(p.x + arm, p.y);
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        this.ctx.lineWidth = 0.6;
        this.ctx.stroke();
      } else {
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    this.ctx.restore();
  }

  renderFrame(timestamp) {
    if (!this.ctx || !this.width || !this.height) return;

    const now = timestamp || performance.now();
    const dtMs = this.lastFrameTime ? Math.min(50, Math.max(1, now - this.lastFrameTime)) : 16.67;
    this.lastFrameTime = now;
    const dt = dtMs / 16.667;

    // Periodically re-resolve diurnal phase if in auto mode
    if (this.diurnalMode === 'auto' && Math.floor(now / 1000) % 30 === 0) {
      this.resolveDiurnalPhase();
    }

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

    // 1. Render Atmospheric Sky Backdrop (Pagi, Siang, Sore, Petang, Malam)
    this.renderAtmosphericSky(now);

    // 2. Render Celestial Body (Sun / Moon)
    this.renderCelestialBody(now);

    // 3. Render Airborne Ambient Particles (Mist, Solar Sparkles, Golden Embers, Stars)
    this.renderAtmosphericParticles(dt, now);

    // 4. Sample 2D Grid Matrix for Topographic Marching Contours
    const stepX = 14;
    const stepY = 14;
    const cols = Math.ceil(this.width / stepX) + 1;
    const rows = Math.ceil(this.height / stepY) + 1;

    const grid = [];
    for (let y = 0; y < rows; y++) {
      grid[y] = [];
      for (let x = 0; x < cols; x++) {
        grid[y][x] = this.sampleElevation(x * stepX, y * stepY);
      }
    }

    // Dynamic Isobar Color Palette matching diurnal atmosphere
    let baseColor, accentColor, majorColor;
    switch (this.activePhase) {
      case 'dawn':
        // Pagi - Soft peach-amber sunrise
        baseColor = this.isDark ? '217, 130, 60' : '180, 105, 45';
        accentColor = this.isDark ? '251, 191, 36' : '217, 119, 6';
        majorColor = this.isDark ? '#fbbf24' : '#d97706';
        break;
      case 'noon':
        // Siang - Palette orange warm, soft daylight
        baseColor = this.isDark ? '234, 120, 40' : '195, 95, 30';
        accentColor = this.isDark ? '251, 146, 60' : '234, 88, 12';
        majorColor = this.isDark ? '#fb923c' : '#ea580c';
        break;
      case 'golden':
        // Sore - Palette orange tua warm, soft golden hour
        baseColor = this.isDark ? '220, 80, 25' : '175, 55, 15';
        accentColor = this.isDark ? '249, 115, 22' : '194, 65, 12';
        majorColor = this.isDark ? '#ea580c' : '#c2410c';
        break;
      case 'twilight':
        // Petang - Biru warm twilight
        baseColor = this.isDark ? '45, 80, 145' : '65, 105, 170';
        accentColor = this.isDark ? '147, 197, 253' : '96, 165, 250';
        majorColor = '#93c5fd';
        break;
      case 'night':
      default:
        // Malam - Biru dark warm midnight
        baseColor = this.isDark ? '35, 60, 115' : '45, 75, 135';
        accentColor = this.isDark ? '96, 165, 250' : '147, 197, 253';
        majorColor = '#fef08a';
        break;
    }

    // 5. Render High-Contrast Topographic Isobar Contours
    const numLevels = this.contourLevels;

    for (let l = 1; l < numLevels; l++) {
      const threshold = l / numLevels;
      const isMajorIsobar = l % 4 === 0;

      // Higher visibility and crispness on both dark and light modes
      const alpha = isMajorIsobar
        ? (this.isDark ? 0.78 : 0.72)
        : (this.isDark ? 0.35 : 0.32);

      this.ctx.lineWidth = isMajorIsobar ? 1.4 : 0.9;
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
        this.ctx.fillStyle = majorColor;
        this.ctx.fillText(`${isobarHpa} hPa // ISO.${l}`, 24, 52 + l * 16);
      }
    }

    // 6. Draw Wind Stream Vectors
    if (this.contourMode === 'wind' || this.contourMode === 'isobars') {
      this.renderWindStreamlines(dt, accentColor);
    }

    // 7. Draw Ripple Wave Rings
    for (let i = 0; i < this.waveRipples.length; i++) {
      const r = this.waveRipples[i];
      if (!r.active) continue;

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${accentColor}, ${r.alpha * 0.85})`;
      this.ctx.lineWidth = 1.6;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 8. Draw Cursor Elevation Magnetic Reticle
    if (this.mouse.isHovered && this.mouse.x > -100) {
      this.ctx.save();
      const cursorPulse = Math.sin(now * 0.008) * 3;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 22 + cursorPulse, 0, Math.PI * 2);
      this.ctx.strokeStyle = majorColor;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Reticle crosshair lines
      this.ctx.beginPath();
      this.ctx.moveTo(this.mouse.x - 30, this.mouse.y);
      this.ctx.lineTo(this.mouse.x + 30, this.mouse.y);
      this.ctx.moveTo(this.mouse.x, this.mouse.y - 30);
      this.ctx.lineTo(this.mouse.x, this.mouse.y + 30);
      this.ctx.strokeStyle = `rgba(${baseColor}, 0.55)`;
      this.ctx.stroke();

      this.ctx.restore();
    }
  }

  // Draw subtle wind flow streamlines
  renderWindStreamlines(dt, color) {
    const angle = (this.weather.windDirectionDeg * Math.PI) / 180;
    const speed = Math.max(0.4, this.weather.windSpeedKm * 0.06);
    const count = 18;

    this.ctx.save();
    this.ctx.strokeStyle = `rgba(${color}, 0.28)`;
    this.ctx.lineWidth = 0.9;

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

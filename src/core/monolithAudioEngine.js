/**
 * MONOLITH AUDIOPHILE SOUND ENGINE (v3.0)
 * Architectural Soundscape Synthesizer & Procedural Ambient Generator
 * Biophilic 432Hz / 528Hz Solfeggio / Lo-Fi Rain / Cyber Ostinato / 6Hz Binaural Theta
 * Pure Web Audio DSP Math — Zero external audio file dependencies
 */

export const SOUNDSCAPE_TRACKS = [
  {
    id: '01_sanctuary',
    name: '432Hz Terra Alpha',
    category: 'BIOPHILIC SANCTUARY',
    desc: 'Harmonik 432Hz dipadu gelombang otak 10Hz Alpha, derai hujan alami & akord hangat.',
    bpm: 'SLOW // 432Hz ALPHA',
    color: '#4A5D4E'
  },
  {
    id: '02_solfeggio',
    name: '528Hz Solfeggio',
    category: 'MIRACLE TONE',
    desc: 'Frekuensi transformasi 528Hz dengan akord minor ke-9 dan analog tape flutter.',
    bpm: 'RELAX // 528Hz',
    color: '#D4AF37'
  },
  {
    id: '03_rain_lofi',
    name: 'Semarang Rain',
    category: 'BIOPHILIC TEXTURE',
    desc: 'Sintesis derai hujan organik (pink noise) dipadu akord Rhodes jazz pentatonik hangat.',
    bpm: '72 BPM // RAIN',
    color: '#588157'
  },
  {
    id: '04_cyber_pulse',
    name: 'Cyber Monolith',
    category: 'MODULAR PULSE',
    desc: 'Arpeggiator ostinato 90 BPM dengan sub-bass brutalist dan detak arsitektural.',
    bpm: '90 BPM // OSTINATO',
    color: '#10B981'
  },
  {
    id: '05_binaural_theta',
    name: '6Hz Theta Flow',
    category: 'BINAURAL FOCUS',
    desc: 'Separasi stereo 216Hz (L) & 222Hz (R) memicu gelombang otak Theta untuk deep coding.',
    bpm: '6.0Hz // THETA',
    color: '#60A5FA'
  },
  {
    id: '06_custom',
    name: 'Custom Stream',
    category: 'USER INPUT',
    desc: 'Unggah file audio lokal atau streaming URL audio kustom melalui DSP Monolith.',
    bpm: 'EXTERNAL STREAM',
    color: '#E57373'
  }
];

export class MonolithAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackId = '01_sanctuary'; // Default track set on startup & refresh
    this.volume = parseFloat(localStorage.getItem('monolith-vol') || '0.35');
    this.filterCutoff = parseFloat(localStorage.getItem('monolith-filter') || '1400');
    this.isRainActive = localStorage.getItem('monolith-rain') === 'true';

    // Core DSP Nodes
    this.masterGain = null;
    this.analyser = null;
    this.masterFilter = null;

    // Active Synthesizer Voices Registry
    this.activeNodes = [];
    this.timerIds = [];
    this.customAudioEl = null;
    this.customSourceNode = null;

    // Visualization Canvases
    this.canvases = [];
    this.animId = null;

    // Mini EQ Bars in Header
    this.headerEqBars = [];
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();

      // Analyser Node for FFT and Oscilloscope
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.82;

      // Master Biquad Lowpass Filter (eliminates harsh digital high-ends)
      this.masterFilter = this.ctx.createBiquadFilter();
      this.masterFilter.type = 'lowpass';
      this.masterFilter.frequency.setValueAtTime(this.filterCutoff, this.ctx.currentTime);

      // Master Gain Node
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      // Connect DSP Chain: Voices -> masterFilter -> masterGain -> analyser -> destination
      this.masterFilter.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /* ==========================================================================
     PLAYBACK ORCHESTRATION
     ========================================================================== */
  play(trackId = this.currentTrackId) {
    if (!trackId) return; // No track selected, do nothing
    this.ensureContext();
    if (!this.ctx) return;

    this.stopActiveVoices();
    this.currentTrackId = trackId;
    // Do NOT persist to localStorage — selection resets on every refresh by design

    // Fade in Master Gain smoothly
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.35);

    // Start Synthesizer Generator for chosen track
    switch (trackId) {
      case '01_sanctuary':
        this.start432HzSanctuary();
        break;
      case '02_solfeggio':
        this.start528HzSolfeggio();
        break;
      case '03_rain_lofi':
        this.startRainLoFi();
        break;
      case '04_cyber_pulse':
        this.startCyberPulse();
        break;
      case '05_binaural_theta':
        this.startBinauralTheta();
        break;
      case '06_custom':
        this.startCustomStream();
        break;
      default:
        this.start432HzSanctuary();
        break;
    }

    if (this.isRainActive && trackId !== '03_rain_lofi') {
      this.startRainNoiseOverlay();
    }

    this.isPlaying = true;
    this.updateUIPerPlayback(true);
    this.startVisualizerLoop();

    // Couple with HanzzPet
    const petDock = document.getElementById('hanzz-pet-dock');
    if (petDock) petDock.classList.add('is-bobbing');
  }

  pause() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 0.25);

    setTimeout(() => {
      this.stopActiveVoices();
      this.isPlaying = false;
      this.updateUIPerPlayback(false);
      const petDock = document.getElementById('hanzz-pet-dock');
      if (petDock) petDock.classList.remove('is-bobbing');
    }, 260);
  }

  toggle(trackId) {
    if (this.isPlaying) {
      if (trackId && trackId !== this.currentTrackId) {
        this.play(trackId);
      } else {
        this.pause();
      }
    } else {
      // If no track selected yet, default to 01_sanctuary when user hits play
      this.play(trackId || this.currentTrackId || '01_sanctuary');
    }
  }

  /* ==========================================================================
     STARTUP & REFRESH AUTOPLAY ORCHESTRATION (Browser Policy Compliant)
     ========================================================================== */
  initAutoplayOnStartup(defaultTrackId = '01_sanctuary') {
    this.currentTrackId = defaultTrackId;
    this.updateUIPerPlayback(false); // Highlight Track 01 button immediately

    const startAutoplay = () => {
      this.ensureContext();
      if (!this.ctx) return;

      this.play(defaultTrackId);

      // Smooth gradual 1.8s fade-in for comforting, warm entry
      if (this.masterGain && this.ctx) {
        const now = this.ctx.currentTime;
        const targetVol = this.volume || 0.35;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(0.001, now);
        this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, targetVol), now + 1.8);
      }
    };

    this.ensureContext();

    if (this.ctx && this.ctx.state === 'running') {
      startAutoplay();
    } else {
      // Browser Autoplay Policy: AudioContext starts suspended until user gesture.
      // Attach transparent passive gesture trigger to unlock instantly on first interaction.
      const unlockAndPlay = () => {
        ['click', 'pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
          window.removeEventListener(evt, unlockAndPlay, { capture: true });
        });

        this.ensureContext();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().then(() => {
            startAutoplay();
          }).catch(() => {
            startAutoplay();
          });
        } else {
          startAutoplay();
        }
      };

      ['click', 'pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
        window.addEventListener(evt, unlockAndPlay, { capture: true, once: true, passive: true });
      });

      // Immediate resume attempt in case tab pre-approved media engagement
      if (this.ctx && typeof this.ctx.resume === 'function') {
        this.ctx.resume().then(() => {
          if (this.ctx.state === 'running') {
            startAutoplay();
          }
        }).catch(() => {});
      }
    }
  }

  stopActiveVoices() {
    this.timerIds.forEach(id => clearInterval(id));
    this.timerIds = [];

    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (_) {}
    });
    this.activeNodes = [];

    if (this.customAudioEl && !this.customAudioEl.paused) {
      this.customAudioEl.pause();
    }
  }

  /* ==========================================================================
     PROCEDURAL SOUNDSCAPE GENERATORS (Pure Web Audio Math)
     ========================================================================== */
  
  // Track 01: 432Hz Terra Alpha (Warmth, Biophilic Rain Canopy & 10Hz Alpha Brainwave)
  start432HzSanctuary() {
    // 1. Organic Warm Grounding Drone Matrix (A=432Hz Verdi Series)
    const droneFreqs = [108, 216, 432, 648]; // Sub, Root, Fundamental, 5th harmonic
    const droneGains = [0.20, 0.16, 0.12, 0.06];

    droneFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i === 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Slow organic breath LFO (0.04Hz - 0.08Hz)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.04 + i * 0.018, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.8, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();
      this.activeNodes.push(lfo);

      gain.gain.setValueAtTime(droneGains[i], this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterFilter);
      osc.start();

      this.activeNodes.push(osc, gain);
    });

    // 2. 10.0Hz Alpha Wave Binaural Differential for Calm Mental Balance
    // Left: 216Hz, Right: 226Hz => Differential = 10.0Hz Alpha Wave
    try {
      if (this.ctx.createStereoPanner) {
        const leftOsc = this.ctx.createOscillator();
        const leftGain = this.ctx.createGain();
        const leftPan = this.ctx.createStereoPanner();
        leftOsc.type = 'sine';
        leftOsc.frequency.setValueAtTime(216, this.ctx.currentTime);
        leftGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        leftPan.pan.setValueAtTime(-0.85, this.ctx.currentTime);
        leftOsc.connect(leftGain);
        leftGain.connect(leftPan);
        leftPan.connect(this.masterFilter);
        leftOsc.start();
        this.activeNodes.push(leftOsc, leftGain, leftPan);

        const rightOsc = this.ctx.createOscillator();
        const rightGain = this.ctx.createGain();
        const rightPan = this.ctx.createStereoPanner();
        rightOsc.type = 'sine';
        rightOsc.frequency.setValueAtTime(226, this.ctx.currentTime); // +10Hz Alpha differential
        rightGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        rightPan.pan.setValueAtTime(0.85, this.ctx.currentTime);
        rightOsc.connect(rightGain);
        rightGain.connect(rightPan);
        rightPan.connect(this.masterFilter);
        rightOsc.start();
        this.activeNodes.push(rightOsc, rightGain, rightPan);
      }
    } catch (_) {
      // Fallback if StereoPanner is unsupported
    }

    // 3. Soft Biophilic Nature Texture (Gentle Canopy Pink Rain Bed)
    this.startSoftBiophilicNatureBed();

    // 4. Meditative Pentatonic Warm Rhodes Drops (Spaced gently every 5.5s)
    const pentatonicNotes = [
      [216.0, 270.0, 324.0, 432.0], // Warm 432-tuned Pentatonic Cluster 1
      [162.0, 216.0, 270.0, 324.0], // Cluster 2 (Gentle low)
      [270.0, 324.0, 432.0, 540.0], // Cluster 3 (Warm air)
      [216.0, 256.0, 324.0, 384.0]  // Cluster 4 (Warm major 7th)
    ];

    let pIdx = 0;
    const playWarmDrop = () => {
      if (!this.isPlaying || this.currentTrackId !== '01_sanctuary' || !this.ctx) return;
      const cluster = pentatonicNotes[pIdx % pentatonicNotes.length];
      pIdx++;

      cluster.forEach((freq, nIdx) => {
        setTimeout(() => {
          if (!this.isPlaying || !this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const now = this.ctx.currentTime;
          gain.gain.setValueAtTime(0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

          osc.connect(gain);
          gain.connect(this.masterFilter);
          osc.start(now);
          osc.stop(now + 4.2);
        }, nIdx * 110);
      });
    };

    playWarmDrop();
    const dropTimer = setInterval(playWarmDrop, 5500);
    this.timerIds.push(dropTimer);
  }

  // Soft filtered pink-noise nature bed for the 432Hz Sanctuary
  startSoftBiophilicNatureBed() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.022; // very soft & calm
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(800, this.ctx.currentTime); // warm canopy foliage cut

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterFilter);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise, noiseFilter, noiseGain);
  }

  // Track 02: 528Hz Solfeggio Miracle Chords
  start528HzSolfeggio() {
    const chordFreqs = [528, 396, 639, 741];
    chordFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Slow pulse gain envelope
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      lfo.connect(gain.gain);
      lfo.start();
      this.activeNodes.push(lfo);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterFilter);
      osc.start();

      this.activeNodes.push(osc, gain);
    });
  }

  // Track 03: Semarang Biophilic Lo-Fi Rain
  startRainLoFi() {
    this.startRainNoiseOverlay();

    // Periodic Rhodes Lo-Fi Pentatonic Chords (Cmaj9 -> Am9 -> Fmaj7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 440.00], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7
      [196.00, 246.94, 293.66, 392.00, 440.00]  // G6
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.isPlaying || this.currentTrackId !== '03_rain_lofi') return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, nIdx) => {
        setTimeout(() => {
          if (!this.isPlaying || !this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const now = this.ctx.currentTime;
          gain.gain.setValueAtTime(0.06, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

          osc.connect(gain);
          gain.connect(this.masterFilter);
          osc.start(now);
          osc.stop(now + 3.2);
        }, nIdx * 65);
      });
    };

    playChord();
    const timer = setInterval(playChord, 3800);
    this.timerIds.push(timer);
  }

  // Organic Pink Noise Generator for Rain Simulation
  startRainNoiseOverlay() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter noise into smooth biophilic rain
    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(950, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(this.masterGain);
    whiteNoise.start();

    this.activeNodes.push(whiteNoise, rainFilter, rainGain);
  }

  // Track 04: Cyber Monolith Ostinato Pulse (90 BPM)
  startCyberPulse() {
    const bassline = [110, 110, 130.81, 146.83, 110, 98, 110, 164.81];
    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || this.currentTrackId !== '04_cyber_pulse' || !this.ctx) return;
      const freq = bassline[step % bassline.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      const now = this.ctx.currentTime;
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.22);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterFilter);

      osc.start(now);
      osc.stop(now + 0.28);
    };

    playStep();
    const timer = setInterval(playStep, (60 / 90 / 2) * 1000); // 16th notes
    this.timerIds.push(timer);
  }

  // Track 05: 6.0Hz Binaural Theta Flow (Left: 216Hz, Right: 222Hz)
  startBinauralTheta() {
    const merger = this.ctx.createChannelMerger(2);

    // Left Ear: 216Hz
    const oscL = this.ctx.createOscillator();
    const gainL = this.ctx.createGain();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(216, this.ctx.currentTime);
    gainL.gain.setValueAtTime(0.2, this.ctx.currentTime);
    oscL.connect(gainL);
    gainL.connect(merger, 0, 0); // channel 0 = left

    // Right Ear: 222Hz (produces exact 6.0Hz Theta brainwave difference)
    const oscR = this.ctx.createOscillator();
    const gainR = this.ctx.createGain();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(222, this.ctx.currentTime);
    gainR.gain.setValueAtTime(0.2, this.ctx.currentTime);
    oscR.connect(gainR);
    gainR.connect(merger, 0, 1); // channel 1 = right

    merger.connect(this.masterFilter);
    oscL.start();
    oscR.start();

    this.activeNodes.push(oscL, oscR, gainL, gainR, merger);
  }

  // Track 06: Custom Ingested Stream / Audio File
  startCustomStream() {
    if (!this.customAudioEl) {
      this.customAudioEl = new Audio();
      this.customAudioEl.crossOrigin = 'anonymous';
      this.customAudioEl.src = 'https://stream.zeno.fm/f3wvbbqmdg8uv';
    }

    if (!this.customSourceNode) {
      try {
        this.customSourceNode = this.ctx.createMediaElementSource(this.customAudioEl);
        this.customSourceNode.connect(this.masterFilter);
      } catch (_) {}
    }

    // Only fallback on hard error — never on timeout/stall (stream needs time to buffer)
    this.customAudioEl.onerror = () => {
      if (this.currentTrackId !== '06_custom') return;
      this.stopActiveVoices();
      this.currentTrackId = '01_sanctuary';
      this.start432HzSanctuary();
      this.updateUIPerPlayback(true);
    };

    this.customAudioEl.play().catch(() => {
      // play() rejected (e.g. no src set yet) — do nothing, wait for user to load file
    });
  }

  loadCustomAudioUrl(url) {
    if (!url) return;
    if (!this.customAudioEl) {
      this.customAudioEl = new Audio();
      this.customAudioEl.crossOrigin = 'anonymous';
    }
    this.customAudioEl.src = url;
    if (this.currentTrackId === '06_custom' && this.isPlaying) {
      this.customAudioEl.play().catch(() => {});
    }
  }

  loadCustomFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    this.loadCustomAudioUrl(url);
    this.play('06_custom');
  }

  /* ==========================================================================
     PARAMETER TUNING & FADERS
     ========================================================================== */
  setVolume(val) {
    this.volume = Math.max(0, Math.min(val, 1));
    localStorage.setItem('monolith-vol', this.volume.toFixed(2));
    if (this.masterGain && this.ctx && this.isPlaying) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(this.volume, now, 0.05);
    }
  }

  setFilterCutoff(freq) {
    this.filterCutoff = Math.max(100, Math.min(freq, 16000));
    localStorage.setItem('monolith-filter', this.filterCutoff.toString());
    if (this.masterFilter && this.ctx) {
      this.masterFilter.frequency.setTargetAtTime(this.filterCutoff, this.ctx.currentTime, 0.08);
    }
  }

  toggleRainOverlay() {
    this.isRainActive = !this.isRainActive;
    localStorage.setItem('monolith-rain', this.isRainActive);
    if (this.isPlaying) {
      this.play(this.currentTrackId);
    }
    return this.isRainActive;
  }

  /* ==========================================================================
     CANVAS VISUALIZERS & LIVE OSCILLOSCOPE
     ========================================================================== */
  registerCanvas(canvasEl) {
    if (canvasEl && !this.canvases.includes(canvasEl)) {
      this.canvases.push(canvasEl);
    }
  }

  registerHeaderEq(barsArray) {
    this.headerEqBars = barsArray;
  }

  getAudioEnergy() {
    if (!this.analyser || !this.isPlaying) {
      return { bass: 0, mid: 0, treble: 0, overall: 0, isPlaying: false, trackName: 'IDLE' };
    }
    const binCount = this.analyser.frequencyBinCount;
    const freqData = new Uint8Array(binCount);
    this.analyser.getByteFrequencyData(freqData);

    let bass = 0;
    const bassBins = Math.min(16, binCount);
    for (let i = 0; i < bassBins; i++) bass += freqData[i];
    bass = bass / (bassBins * 255);

    let mid = 0;
    const midBins = Math.min(64, binCount);
    for (let i = bassBins; i < midBins; i++) mid += freqData[i];
    mid = mid / (Math.max(1, midBins - bassBins) * 255);

    let overall = 0;
    for (let i = 0; i < binCount; i++) overall += freqData[i];
    overall = overall / (binCount * 255);

    const currentTrack = SOUNDSCAPE_TRACKS.find(t => t.id === this.currentTrackId);
    return {
      bass,
      mid,
      overall,
      isPlaying: true,
      trackName: currentTrack ? currentTrack.name : 'RESONANCE ON',
      trackId: this.currentTrackId,
      freqBins: freqData
    };
  }

  startVisualizerLoop() {
    if (this.animId) cancelAnimationFrame(this.animId);

    const bufferLength = this.analyser ? this.analyser.frequencyBinCount : 256;
    const dataArray = new Uint8Array(bufferLength);
    const timeDomain = new Uint8Array(bufferLength);

    const draw = () => {
      this.animId = requestAnimationFrame(draw);

      if (!this.analyser || !this.isPlaying) {
        // Idle flatline animation
        this.drawIdleState();
        return;
      }

      this.analyser.getByteFrequencyData(dataArray);
      this.analyser.getByteTimeDomainData(timeDomain);

      // Animate Mini Header Equalizer Bars
      if (this.headerEqBars && this.headerEqBars.length > 0) {
        const binStep = Math.floor(bufferLength / (this.headerEqBars.length + 2));
        this.headerEqBars.forEach((bar, idx) => {
          const val = dataArray[(idx + 1) * binStep] || 10;
          const scaleY = Math.max(0.18, val / 255);
          bar.style.transform = `scaleY(${scaleY.toFixed(2)})`;
        });
      }

      // Render to registered canvases
      this.canvases.forEach(canvas => {
        this.renderCanvasSpectrum(canvas, dataArray, timeDomain);
      });
    };

    draw();
  }

  renderCanvasSpectrum(canvas, dataArray, timeDomain) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const primaryColor = isDark ? '#74A872' : '#4A5D4E';
    const accentGold = '#D4AF37';

    // 1. Draw 32-Band Architectural Spectrum Columns
    const barCount = 32;
    const barWidth = (width / barCount) - 2;
    const step = Math.floor(dataArray.length / barCount);

    for (let i = 0; i < barCount; i++) {
      const val = dataArray[i * step] || 0;
      const barHeight = (val / 255) * (height - 18);
      const x = i * (barWidth + 2);
      const y = height - barHeight;

      ctx.fillStyle = i % 4 === 0 ? accentGold : primaryColor;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Hairline Peak Cap Dot
      ctx.fillStyle = isDark ? '#FFFFFF' : '#1A1C19';
      ctx.fillRect(x, Math.max(y - 2, 2), barWidth, 1.5);
    }

    // 2. Overlay Vector Lissajous Oscilloscope Waveform Line
    ctx.beginPath();
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(26, 28, 25, 0.35)';
    ctx.lineWidth = 1.2;

    const sliceWidth = width / timeDomain.length;
    let x = 0;

    for (let i = 0; i < timeDomain.length; i++) {
      const v = timeDomain[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }

    ctx.stroke();
    ctx.globalAlpha = 1.0;
  }

  drawIdleState() {
    // Reset mini header EQ bars
    if (this.headerEqBars) {
      this.headerEqBars.forEach(bar => {
        bar.style.transform = 'scaleY(0.2)';
      });
    }

    this.canvases.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(74, 93, 78, 0.2)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    });
  }

  /* ==========================================================================
     UI SYNCHRONIZATION HELPERS
     ========================================================================== */
  updateUIPerPlayback(isPlaying) {
    const playIcons = document.querySelectorAll('.monolith-play-icon');
    const playLabels = document.querySelectorAll('.monolith-play-label');
    const headerPill = document.getElementById('header-audio-pill');

    playIcons.forEach(icon => {
      icon.textContent = isPlaying ? '■' : '▶';
    });

    playLabels.forEach(label => {
      label.textContent = isPlaying ? 'HALT RESONANCE' : 'ACTIVATE SOUND';
    });

    if (headerPill) {
      headerPill.classList.toggle('is-playing', isPlaying);
      const track = SOUNDSCAPE_TRACKS.find(t => t.id === this.currentTrackId);
      const trackNameEl = document.getElementById('header-audio-track-name');
      if (trackNameEl) {
        trackNameEl.textContent = isPlaying ? (track ? track.name : 'AUDIO ON') : 'AUDIO // OFF';
      }
    }

    // Sync track highlight on all track buttons — active-track = selected, active-tone = selected on synth btns
    document.querySelectorAll('[data-track-select]').forEach(btn => {
      const id = btn.getAttribute('data-track-select');
      const isSelected = id === this.currentTrackId;
      btn.classList.toggle('active-track', isSelected);
      btn.classList.toggle('active-tone', isSelected); // synth-freq-btn compat
    });
  }
}

// Global Singleton Export
export const monolithAudio = new MonolithAudioEngine();


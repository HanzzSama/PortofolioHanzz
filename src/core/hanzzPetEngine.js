/**
 * HANZZPET INTERACTIVE ENGINE (v2.5)
 * Autonomous Mascot System: Eye Tracking with Organic Head Tilt,
 * 7 Section Persona Metamorphosis, Contextual Dynamic Powers,
 * Procedural Eye Expressions Library, Chewy Mochi Physics,
 * Web Audio Modular Synthesizers (432Hz/Chirp/Sonar/Droplets/Matrix),
 * Dynamic Particle Cloud, and Boundary Bounce
 */

import { translations } from '../data/translations.js';

// Procedural SVG Eye Expression Templates
export const EYE_TEMPLATES = {
  normal: `
    <ellipse cx="33" cy="44" rx="5.5" ry="8" transform="rotate(6 33 44)" fill="#000000" />
    <ellipse cx="67" cy="44" rx="5.5" ry="8" transform="rotate(-6 67 44)" fill="#000000" />
  `,
  happy: `
    <path d="M 27 44 Q 33 36 39 44" stroke="#000000" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M 61 44 Q 67 36 73 44" stroke="#000000" stroke-width="3.4" stroke-linecap="round" fill="none"/>
  `,
  sleepy: `
    <line x1="27" y1="44" x2="39" y2="44" stroke="#000000" stroke-width="3.4" stroke-linecap="round"/>
    <line x1="61" y1="44" x2="73" y2="44" stroke="#000000" stroke-width="3.4" stroke-linecap="round"/>
  `,
  love: `
    <path d="M 33 40 C 31 37 27 37 27 40 C 27 44 33 48 33 48 C 33 48 39 44 39 40 C 39 37 35 37 33 40 Z" fill="#e11d48"/>
    <path d="M 67 40 C 65 37 61 37 61 40 C 61 44 67 48 67 48 C 67 48 73 44 73 40 C 73 37 69 37 67 40 Z" fill="#e11d48"/>
  `,
  curious: `
    <ellipse cx="33" cy="43" rx="4.5" ry="6" transform="rotate(6 33 43)" fill="#000000" />
    <circle cx="67" cy="42" r="7.5" fill="#000000" />
  `,
  wink: `
    <path d="M 27 44 Q 33 37 39 44" stroke="#000000" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <ellipse cx="67" cy="44" rx="5.5" ry="8" transform="rotate(-6 67 44)" fill="#000000" />
  `,
  code: `
    <text x="26" y="50" font-family="monospace" font-size="14" font-weight="900" fill="#000000">{</text>
    <text x="62" y="50" font-family="monospace" font-size="14" font-weight="900" fill="#000000">}</text>
  `,
  sparkle: `
    <path d="M 33 37 L 35 42 L 40 44 L 35 46 L 33 51 L 31 46 L 26 44 L 31 42 Z" fill="#D4AF37"/>
    <path d="M 67 37 L 69 42 L 74 44 L 69 46 L 67 51 L 65 46 L 60 44 L 65 42 Z" fill="#D4AF37"/>
  `,
  binary: `
    <text x="27" y="50" font-family="monospace" font-size="13" font-weight="900" fill="#10B981">1</text>
    <text x="63" y="50" font-family="monospace" font-size="13" font-weight="900" fill="#10B981">0</text>
  `,
  zen: `
    <path d="M 27 45 Q 33 50 39 45" stroke="#000000" stroke-width="3.2" stroke-linecap="round" fill="none"/>
    <path d="M 61 45 Q 67 50 73 45" stroke="#000000" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  `
};

// 20 Authentic Bot Dialogues from Portofolio Source (lines 892-913)
export const AUTHENTIC_BOT_DIALOGUES = [
  { text: "Halo! Makasih ya udah sempetin mampir ke sini!", expr: "happy" },
  { text: "Kamu tahu nggak? Hanzz nulis kode CSS untuk mataku satu per satu lho!", expr: "normal" },
  { text: "Btw, coba deh seret aku ke atas atau kanan layar. Aku bisa otomatis nyesuain posisiku!", expr: "happy" },
  { text: "Aduh! Jangan klik aku terlalu cepat, nanti aku pusing tujuh keliling!", expr: "sleepy" },
  { text: "Fun fact: Hanzz minum kopi saat mengerjakan portofolio ini.", expr: "happy" },
  { text: "Hei, kamu tipe orang yang suka dark mode atau light mode? Hanzz suka keduanya!", expr: "normal" },
  { text: "Jangan lupa cek keahlian PHP & Laravel milik Hanzz di bawah ya! Keren abis!", expr: "happy" },
  { text: "Udah lihat website Ladangku? Itu project yang dibikin buat kompetisi lho!", expr: "sparkle" },
  { text: "Ada yang bilang programmer itu jarang tidur... padahal emang bener sih. Hehe", expr: "sleepy" },
  { text: "Hmm... Masih nge-klik aku terus ya? Penasaran banget sama apa yang bakal aku omongin?", expr: "curious" },
  { text: "Oke, ini rahasia: Kalau kamu hover foto profil Hanzz di atas, aku bakal tersenyum manis!", expr: "love" },
  { text: "Kalau butuh bantuan buat website interaktif kayak gini, Hanzz siap bantu kok!", expr: "happy" },
  { text: "Aduh, jariku pegel nih diajak ngobrol mulu... Eh, kan aku nggak punya jari ya?", expr: "curious" },
  { text: "Stop! Aku lagi konsentrasi memantau pergerakan kursor kamu...", expr: "normal" },
  { text: "Kenapa programmer pake kacamata? Soalnya mereka gak bisa 'C#'! Hahaha garing ya...", expr: "sleepy" },
  { text: "Sudah, cukup! Aku lelah dipermainkan seperti ini! Jangan klik lagi!", expr: "curious" },
  { text: "Zzz... Aku mogok ngomong ah, mau tidur sejenak aja...", expr: "sleepy" },
  { text: "Hayo lho, masih diklik juga? Kamu bandel ya!", expr: "wink" },
  { text: "Tapi serius deh, kalau kamu tertarik collab, langsung chat Hanzz via kontak di bawah ya!", expr: "happy" },
  { text: "Kamu sudah membuka seluruh 20 dialog interaktifku.", expr: "sparkle" }
];

// 7 Section Personas Configuration
export const SECTION_PERSONAS = {
  welcome: {
    name: 'Pure Mochi Guardian',
    className: 'persona-welcome-active',
    defaultEyes: 'normal',
    tipKey: 'context_welcome',
    defaultTip: 'Beacon',
    iconSvg: `
      <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.3"/>
      <path d="M8 1V3M8 13V15M1 8H3M13 8H15" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    `,
    particle: '✦'
  },
  about: {
    name: 'Biophilic Dryad',
    className: 'persona-about-active',
    defaultEyes: 'happy',
    tipKey: 'context_about',
    defaultTip: 'Siram Tunas',
    iconSvg: `
      <path d="M8 2C8 2 4 6.5 4 9.5C4 11.7 5.8 13.5 8 13.5C10.2 13.5 12 11.7 12 9.5C12 6.5 8 2 8 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M8 8V11M6.5 9.5L8 11L9.5 9.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    `,
    particle: '·'
  },
  skills: {
    name: 'Master Artisan',
    className: 'persona-skills-active',
    defaultEyes: 'code',
    tipKey: 'context_skills',
    defaultTip: 'Pindai Stack',
    iconSvg: `
      <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/>
      <path d="M8 4V12M4 8H12M8 6L10 8L8 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    `,
    particle: '•'
  },
  projects: {
    name: 'Hardhat Architect',
    className: 'persona-projects-active',
    defaultEyes: 'sparkle',
    tipKey: 'context_projects',
    defaultTip: 'Inspeksi Blueprint',
    iconSvg: `
      <path d="M3 13V6C3 4.5 5 3 8 3C11 3 13 4.5 13 6V13" stroke="currentColor" stroke-width="1.3"/>
      <path d="M2 13H14M6 6H10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
    `,
    particle: '⋆'
  },
  github: {
    name: 'Cyber Terminal Node',
    className: 'persona-github-active',
    defaultEyes: 'binary',
    tipKey: 'context_github',
    defaultTip: 'Radar Komit',
    iconSvg: `
      <circle cx="5" cy="5" r="2" stroke="currentColor" stroke-width="1.2"/>
      <circle cx="5" cy="11" r="2" stroke="currentColor" stroke-width="1.2"/>
      <circle cx="11" cy="8" r="2" stroke="currentColor" stroke-width="1.2"/>
      <path d="M5 7V9M7 5.5L9 7M7 10.5L9 9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    `,
    particle: '°'
  },
  lab: {
    name: 'Holographic Polyhedron',
    className: 'persona-lab-active',
    defaultEyes: 'curious',
    tipKey: 'context_lab',
    defaultTip: 'Inversi Gravitasi',
    iconSvg: `
      <path d="M8 2L13 5V11L8 14L3 11V5L8 2Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
      <path d="M8 2V14M3 5L13 11M3 11L13 5" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"/>
    `,
    particle: '×'
  },
  another: {
    name: 'Zen Sound Harmonizer',
    className: 'persona-another-active',
    defaultEyes: 'zen',
    tipKey: 'context_another',
    defaultTip: 'Chime 432Hz',
    iconSvg: `
      <circle cx="8" cy="8" r="3.5" stroke="currentColor" stroke-width="1.3"/>
      <path d="M4.5 4.5C3 6 3 10 4.5 11.5M11.5 4.5C13 6 13 10 11.5 11.5M2 2C-0.5 4.5 -0.5 11.5 2 14M14 2C16.5 4.5 16.5 11.5 14 14" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>
    `,
    particle: '+'
  }
};

export class HanzzPetEngine {
  constructor() {
    this.dock = document.getElementById('hanzz-pet-dock');
    if (!this.dock) return;

    this.stage = document.getElementById('hanzz-pet-stage');
    this.petBody = document.getElementById('neurapet-body');
    this.petHead = document.getElementById('neurapet-head');
    this.eyesWrapper = document.getElementById('neurapet-eyes-wrapper');
    this.eyesTrack = document.getElementById('neurapet-eyes-track');
    this.stageGlow = document.getElementById('pet-stage-glow');
    this.particleCloud = document.getElementById('pet-particle-cloud');

    this.speech = document.getElementById('hanzz-pet-speech');
    this.speechPrefix = document.getElementById('pet-speech-prefix');
    this.speechText = document.getElementById('pet-speech-text');

    // State Variables
    this.isTrackingEnabled = true;
    this.isBlinkEnabled = true;
    this.isSoundEnabled = localStorage.getItem('pet-sound') !== 'muted';
    this.isPetting = false;
    this.isDancing = false;
    this.isRoyal = false;
    this.isSleepy = false;
    this.isMinimized = false;
    this.isWireframe = false;
    this.isDragging = false;
    this.isTossed = false;

    this.currentMood = 'ready';
    this.currentExpression = 'normal';
    this.currentSection = 'welcome';
    this.expressionKeys = ['normal', 'happy', 'sleepy', 'love', 'curious', 'wink', 'code', 'sparkle', 'binary', 'zen'];
    this.expressionIdx = 0;

    // Multi-click detection
    this.clickCount = 0;
    this.clickTimer = null;

    // Dock Coordinates & Physics
    this.dockHeight = 138;
    this.dockX = 24;
    this.dockY = window.innerHeight - this.dockHeight - 24;
    this.currentX = this.dockX;
    this.currentY = this.dockY;

    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.55;
    this.friction = 0.985;
    this.bounceDamping = 0.65;
    this.lastPointerPos = { x: 0, y: 0, time: 0 };
    this.velocityHistory = [];

    // Mouse Tracking target & damping
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.trackingRaf = null;

    // Web Audio Context
    this.audioCtx = null;

    // Timers
    this.idleTimer = null;
    this.blinkTimer = null;
    this.speechTimeout = null;

    // Internationalization
    this.currentLang = localStorage.getItem('portfolio-language') || 'id';

    this.init();
  }

  init() {
    this.setupAudio();
    this.bindEvents();
    this.scheduleBlinkLoop();
    this.resetIdleTimer();
    this.resetToDock();
    this.applySectionPersona('welcome', false);

    // Initial greeting quote
    setTimeout(() => {
      this.say("SYS.PET // ONLINE", this.getQuote('welcome'));
    }, 1200);
  }

  /* ==========================================================================
     SYNTHESIZED WEB AUDIO (Pure Chimes, Purrs, and Arpeggios)
     ========================================================================== */
  setupAudio() {
    const initAudio = () => {
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      window.removeEventListener('pointerdown', initAudio);
    };
    window.addEventListener('pointerdown', initAudio, { once: true });
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playSoundChirp(freq1 = 520, freq2 = 780, type = 'sine', duration = 0.15) {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(freq1, now);
      osc.frequency.exponentialRampToValueAtTime(freq2, now + duration);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (_) {}
  }

  playHappyArpeggio() {
    if (!this.isSoundEnabled) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playSoundChirp(freq, freq * 1.05, 'triangle', 0.12);
      }, idx * 65);
    });
  }

  playPurrSound() {
    if (!this.isSoundEnabled) return;
    this.playSoundChirp(280, 420, 'sine', 0.22);
  }

  /* Tactile Mochi Rubber Bounce Sound (Sine frequency sweep + snap transient) */
  playMochiBounceSound(velocity = 6) {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Calculate dynamic pitch and volume based on impact intensity
      const intensity = Math.min(Math.max(velocity / 8, 0.4), 1.8);
      const baseFreq = 160 * intensity;
      const peakFreq = 340 * intensity;
      const duration = 0.22;

      // 1. Chewy Rubber Spring Oscillator (Sine Sweep Up & Down)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(peakFreq, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, now + duration);

      const maxGain = Math.min(0.06 * intensity, 0.14);
      gain.gain.setValueAtTime(maxGain, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);

      // 2. Harmonic Tactile "Plop/Boing" Transients (Triangle snap)
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(432 * intensity, now);
      snapOsc.frequency.exponentialRampToValueAtTime(216, now + 0.09);

      snapGain.gain.setValueAtTime(0.04 * intensity, now);
      snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start(now);
      snapOsc.stop(now + 0.09);
    } catch (_) {}
  }

  /* Organic Mochi Squish / Squeeze Pop Sound */
  playSquishPopSound() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Chewy Mochi Squeeze ("pyoo-wump")
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.07);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.19);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (_) {}
  }

  /* Section Web Audio Modular Synthesizers */
  playSonarPingSound() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.18);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (_) {}
  }

  playDropletSound() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.22);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (_) {}
  }

  playScannerBlipSound() {
    if (!this.isSoundEnabled) return;
    try {
      const notes = [659, 880, 1318];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playSoundChirp(freq, freq * 1.12, 'triangle', 0.08);
        }, idx * 45);
      });
    } catch (_) {}
  }

  playMetalClinkSound() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [784, 1568].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 0.18);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      });
    } catch (_) {}
  }

  playDataModemSound() {
    if (!this.isSoundEnabled) return;
    try {
      const notes = [1046, 1318, 1567, 2093];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playSoundChirp(freq, freq * 1.04, 'square', 0.05);
        }, idx * 35);
      });
    } catch (_) {}
  }

  playSciFiGlitchSound() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.28);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (_) {}
  }

  playSingingBowl432Sound() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [432, 864, 1296].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        const startGain = 0.06 / (idx + 1);
        gain.gain.setValueAtTime(startGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.8);
      });
    } catch (_) {}
  }

  playSectionTransitionSound(sectionId) {
    if (!this.isSoundEnabled) return;
    switch (sectionId) {
      case 'welcome':
        this.playSoundChirp(440, 660, 'sine', 0.15);
        break;
      case 'about':
        this.playDropletSound();
        break;
      case 'skills':
        this.playSoundChirp(520, 880, 'triangle', 0.12);
        break;
      case 'projects':
        this.playMetalClinkSound();
        break;
      case 'github':
        this.playSoundChirp(880, 1320, 'square', 0.08);
        break;
      case 'lab':
        this.playSoundChirp(340, 680, 'sawtooth', 0.14);
        break;
      case 'another':
        this.playSingingBowl432Sound();
        break;
      default:
        this.playSoundChirp(440, 660, 'sine', 0.15);
        break;
    }
  }

  toggleSound() {
    this.isSoundEnabled = !this.isSoundEnabled;
    localStorage.setItem('pet-sound', this.isSoundEnabled ? 'active' : 'muted');

    const soundOnSvg = document.getElementById('pet-sound-on-svg');
    const soundOffSvg = document.getElementById('pet-sound-off-svg');
    if (soundOnSvg && soundOffSvg) {
      soundOnSvg.style.display = this.isSoundEnabled ? 'block' : 'none';
      soundOffSvg.style.display = this.isSoundEnabled ? 'none' : 'block';
    }

    const soundBtn = document.getElementById('pet-btn-sound');
    if (soundBtn) {
      soundBtn.classList.toggle('active', this.isSoundEnabled);
    }

    if (this.isSoundEnabled) {
      this.playMochiBounceSound(6);
      this.say("SYS.SFX // AUDIO", "Audio Web Audio diaktifkan!");
    } else {
      this.say("SYS.SFX // MUTED", "Audio dimatikan (mode hening).");
    }
  }

  /* ==========================================================================
     EYE EXPRESSIONS LIBRARY & SWITCHER
     ========================================================================== */
  setEyeExpression(exprName) {
    if (!EYE_TEMPLATES[exprName] || !this.eyesTrack) return;
    this.currentExpression = exprName;
    this.eyesTrack.innerHTML = EYE_TEMPLATES[exprName];
  }

  nextEyeExpression() {
    this.expressionIdx = (this.expressionIdx + 1) % this.expressionKeys.length;
    const nextExpr = this.expressionKeys[this.expressionIdx];
    this.setEyeExpression(nextExpr);
    this.playSoundChirp(480, 640, 'triangle', 0.1);

    const labels = {
      normal: "Normal",
      happy: "Senang",
      sleepy: "Tidur",
      love: "Cinta",
      curious: "Kepo",
      wink: "Kedip",
      code: "Kode",
      sparkle: "Bintang",
      binary: "Biner",
      zen: "Zen"
    };
    this.say("PET.EXPR", `Ekspresi mata: ${labels[nextExpr] || nextExpr}`, 2400);
  }

  /* ==========================================================================
     THE 7 SECTION PERSONA METAMORPHOSIS & CONTEXTUAL ACTIONS
     ========================================================================== */
  applySectionPersona(sectionId, notify = true) {
    if (!this.dock) return;
    this.currentSection = sectionId;
    const persona = SECTION_PERSONAS[sectionId] || SECTION_PERSONAS.welcome;

    // 1. Remove previous persona classes and apply current persona
    Object.values(SECTION_PERSONAS).forEach(p => {
      this.dock.classList.remove(p.className);
    });
    this.dock.classList.add(persona.className);

    // 2. Wireframe mode for Lab
    if (sectionId === 'lab') {
      this.dock.classList.add('is-wireframe');
    } else {
      this.dock.classList.remove('is-wireframe');
    }

    // 3. Update Contextual Action Button Icon & Tooltip
    const contextBtn = document.getElementById('pet-btn-context');
    const contextIcon = document.getElementById('pet-context-icon');
    if (contextBtn && contextIcon) {
      contextIcon.innerHTML = persona.iconSvg;
      const tooltip = this.getTooltip(persona.tipKey) || persona.defaultTip;
      contextBtn.setAttribute('data-tip', tooltip);

      // Pulse animation on button to indicate persona superpower
      contextBtn.classList.remove('section-pulse');
      void contextBtn.offsetWidth;
      contextBtn.classList.add('section-pulse');
    }

    // 4. Update Eye Expression to section persona default (if not in sleep or dance)
    if (!this.isSleepy && !this.isDancing && !this.isPetting) {
      this.setEyeExpression(persona.defaultEyes);
    }

    // 5. Sound & speech notification
    if (notify) {
      this.playSectionTransitionSound(sectionId);
      const quote = this.getQuote(sectionId);
      if (quote) {
        this.say(`SYS.PERSONA // ${persona.name.toUpperCase()}`, quote, 4200);
      }
    }
  }

  getTooltip(key) {
    try {
      const lang = translations[this.currentLang] ? this.currentLang : 'id';
      return translations[lang]?.tips?.[key] || translations.id.tips[key];
    } catch (_) {
      return '';
    }
  }

  triggerContextAction() {
    if (!this.dock || !this.petBody) return;

    // Trigger elastic chewy mochi squish on button click
    this.petBody.classList.remove('is-squished', 'is-dancing', 'is-bouncing');
    void this.petBody.offsetWidth;
    this.petBody.classList.add('is-squished');

    switch (this.currentSection) {
      case 'welcome':
        this.pingBeacon();
        break;
      case 'about':
        this.waterSprout();
        break;
      case 'skills':
        this.scanSkills();
        break;
      case 'projects':
        this.inspectBlueprint();
        break;
      case 'github':
        this.pulseGitCommits();
        break;
      case 'lab':
        this.invertGravity();
        break;
      case 'another':
        this.resonate432Hz();
        break;
      default:
        this.pingBeacon();
        break;
    }

    setTimeout(() => {
      if (this.petBody) this.petBody.classList.remove('is-squished');
    }, 720);
  }

  pingBeacon() {
    this.playSonarPingSound();
    this.spawnParticles(50, 20, 8, '✦');
    this.setEyeExpression('curious');
    this.say("SYS.BEACON", "Radar suar aktif! Koordinat menyambut Anda di portal arsitektural Haidar Rifky.");
    setTimeout(() => {
      if (!this.isSleepy) this.setEyeExpression('normal');
    }, 2800);
  }

  waterSprout() {
    this.playDropletSound();
    this.spawnParticles(50, 10, 8, '·');
    const blossom = document.getElementById('sprout-blossom');
    if (blossom) {
      blossom.setAttribute('r', '2.8');
      setTimeout(() => blossom.setAttribute('r', '1.3'), 2200);
    }
    this.setEyeExpression('happy');
    this.say("SYS.BIO // SPROUT", "Tunas biophilic bermekaran! Harmoni alam organik & arsitektur presisi.");
    setTimeout(() => {
      if (!this.isSleepy) this.setEyeExpression('happy');
    }, 2800);
  }

  scanSkills() {
    this.playScannerBlipSound();
    this.spawnParticles(50, 44, 7, '•');
    this.setEyeExpression('code');
    this.say("SYS.SKILL // MATRIX", "Komputasi Stack: Node, React, Cloud & Zero Bloatware terverifikasi 100%!");
    setTimeout(() => {
      if (!this.isSleepy) this.setEyeExpression('code');
    }, 3000);
  }

  inspectBlueprint() {
    this.playMetalClinkSound();
    this.spawnParticles(50, 20, 8, '⋆');
    this.setEyeExpression('sparkle');
    this.say("SYS.BUILD // BLUEPRINT", "Membuka cetak biru: Sistem terdistribusi berdaya tahan tinggi!");
    setTimeout(() => {
      if (!this.isSleepy) this.setEyeExpression('normal');
    }, 2800);
  }

  pulseGitCommits() {
    this.playDataModemSound();
    this.spawnParticles(50, 44, 9, '°');
    this.setEyeExpression('binary');
    this.say("SYS.GIT // RADAR", "44+ komit riil tahunan di repositori @HanzzSama! Teruji dan transparan.");
    setTimeout(() => {
      if (!this.isSleepy) this.setEyeExpression('binary');
    }, 2800);
  }

  invertGravity() {
    this.playSciFiGlitchSound();
    this.spawnParticles(50, 40, 10, '×');
    this.setEyeExpression('curious');
    if (this.petBody) {
      this.petBody.style.transform = 'translateY(-28px) rotate(360deg) scale(1.15)';
      setTimeout(() => {
        if (this.petBody) {
          this.petBody.style.transform = '';
          this.petBody.classList.remove('is-squished', 'is-bouncing');
          void this.petBody.offsetWidth;
          this.petBody.classList.add('is-bouncing');
          this.playMochiBounceSound(8);
          setTimeout(() => this.petBody && this.petBody.classList.remove('is-bouncing'), 680);
        }
      }, 420);
    }
    this.say("SYS.LAB // QUANTUM", "Gravitasi kuantum kanvas dibalik sejenak! Proyeksi matematika 3D aktif.");
  }

  resonate432Hz() {
    this.playSingingBowl432Sound();
    this.spawnParticles(50, 10, 8, '+');
    this.setEyeExpression('zen');
    this.say("SYS.ZEN // 432HZ", "Resonansi gelombang 432Hz menenangkan memori komputasi.");
    setTimeout(() => {
      if (!this.isSleepy) this.setEyeExpression('zen');
    }, 3200);
  }

  /* ==========================================================================
     ORGANIC MOUSE TRACKING & HEAD TILT
     ========================================================================== */
  updateTracking(targetX, targetY) {
    if (!this.petBody || !this.eyesTrack || !this.petHead) return;
    if (!this.isTrackingEnabled || this.isPetting || this.isDancing || this.isSleepy) return;

    const rect = this.petBody.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = targetX - centerX;
    const deltaY = targetY - centerY;
    const dist = Math.hypot(deltaX, deltaY);

    if (dist === 0) {
      this.eyesTrack.style.transform = 'translate(0px, 0px)';
      this.petHead.style.transform = 'translate(0px, 0px) rotate(0deg)';
      return;
    }

    // Max eye displacement limit: ±6.8px horizontal, ±5.2px vertical
    const maxRadius = 450;
    const factor = Math.min(dist / maxRadius, 1);
    const offsetX = (deltaX / dist) * factor * 6.8;
    const offsetY = (deltaY / dist) * factor * 5.2;

    this.eyesTrack.style.transform = `translate(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px)`;

    // Subtle organic head tilt (±4.5 deg) & shift
    const tiltAngle = (deltaX / dist) * factor * 4.5;
    const headShiftX = (deltaX / dist) * factor * 2.5;
    this.petHead.style.transform = `translate(${headShiftX.toFixed(2)}px, 0px) rotate(${tiltAngle.toFixed(2)}deg)`;
  }

  /* ==========================================================================
     AUTONOMOUS BLINKING (Random Intervals & Rapid Double-Blink)
     ========================================================================== */
  performBlink() {
    if (!this.isBlinkEnabled || this.isPetting || this.isSleepy) return;
    if (!this.eyesWrapper) return;

    this.eyesWrapper.classList.add('is-blinking');
    setTimeout(() => {
      if (this.eyesWrapper) this.eyesWrapper.classList.remove('is-blinking');
    }, 120);

    // 30% chance for organic rapid double-blink
    if (Math.random() < 0.3) {
      setTimeout(() => {
        if (this.eyesWrapper) {
          this.eyesWrapper.classList.add('is-blinking');
          setTimeout(() => {
            if (this.eyesWrapper) this.eyesWrapper.classList.remove('is-blinking');
          }, 100);
        }
      }, 220);
    }
  }

  scheduleBlinkLoop() {
    const delay = 2200 + Math.random() * 2800;
    this.blinkTimer = setTimeout(() => {
      this.performBlink();
      this.scheduleBlinkLoop();
    }, delay);
  }

  /* ==========================================================================
     PARTICLE CLOUD GENERATOR
     ========================================================================== */
  spawnParticles(x, y, count = 6, emoji = '✦') {
    if (!this.particleCloud) return;
    const glyphs = ['✦', '·', '•', '⋆', '°', '×', '+'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'floating-heart';
      p.textContent = emoji === 'random' ? glyphs[Math.floor(Math.random() * glyphs.length)] : emoji;

      const offsetX = (Math.random() - 0.5) * 70;
      const offsetY = (Math.random() - 0.5) * 35;
      const rot = (Math.random() - 0.5) * 45;
      const dx = (Math.random() - 0.5) * 60;

      p.style.left = `${x + offsetX}px`;
      p.style.top = `${y + offsetY}px`;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--rot', `${rot}deg`);

      this.particleCloud.appendChild(p);

      setTimeout(() => {
        if (p.parentNode) p.parentNode.removeChild(p);
      }, 1250);
    }
  }

  /* ==========================================================================
     INTERACTIONS: PETTING & HAPPY DANCE
     ========================================================================== */
  triggerPetInteraction(e) {
    if (!this.petBody) return;
    this.isPetting = true;
    this.dock.classList.add('is-petted', 'is-happy');

    // Squish animation reflow with chewy mochi bounce
    this.petBody.classList.remove('is-squished', 'is-dancing', 'is-bouncing');
    void this.petBody.offsetWidth; // force reflow
    this.petBody.classList.add('is-squished');

    this.playSquishPopSound();

    // Spawn hearts
    const rect = this.petBody.getBoundingClientRect();
    const clickX = e && e.clientX ? e.clientX - rect.left : rect.width / 2;
    const clickY = e && e.clientY ? e.clientY - rect.top : rect.height / 2;
    this.spawnParticles(clickX, clickY, 6, '✦');

    // Cycle authentic bot dialogues from Portofolio
    const dialogue = AUTHENTIC_BOT_DIALOGUES[this.clickCount % AUTHENTIC_BOT_DIALOGUES.length];
    this.clickCount++;

    this.setEyeExpression(dialogue.expr || 'happy');
    this.say("HANZZ.BOT", dialogue.text, 4500);

    setTimeout(() => {
      this.isPetting = false;
      this.dock.classList.remove('is-petted', 'is-happy');
      this.petBody.classList.remove('is-squished');
      if (!this.isSleepy) {
        this.setEyeExpression(dialogue.expr === 'happy' ? 'normal' : dialogue.expr || 'normal');
      }
    }, 720);
  }

  triggerHappyDance() {
    if (!this.petBody || this.isDancing) return;
    this.isDancing = true;

    this.petBody.classList.remove('is-squished', 'is-dancing');
    void this.petBody.offsetWidth;
    this.petBody.classList.add('is-dancing');

    this.playHappyArpeggio();

    const rect = this.petBody.getBoundingClientRect();
    this.spawnParticles(rect.width / 2, rect.height / 2, 12, 'random');
    this.setEyeExpression('love');
    this.say("SYS.PET // DANCE", "Yaaay! Joget arsitektural merayakan kode presisi!");

    setTimeout(() => {
      this.isDancing = false;
      if (this.petBody) this.petBody.classList.remove('is-dancing');
      this.setEyeExpression('happy');
      setTimeout(() => {
        if (!this.isSleepy && !this.isDancing) this.setEyeExpression('normal');
      }, 1200);
    }, 1800);
  }

  feedMatcha() {
    this.playSoundChirp(600, 950, 'triangle', 0.2);
    const rect = this.petBody.getBoundingClientRect();
    this.spawnParticles(rect.width / 2, rect.height / 2, 7, '·');
    this.setEyeExpression('curious');
    this.say("SYS.PET // MATCHA", "Slurp... Teh matcha hangat menenangkan memori sistem!");
    setTimeout(() => this.setEyeExpression('happy'), 800);
    setTimeout(() => {
      if (!this.isSleepy) this.setEyeExpression('normal');
    }, 2400);
  }

  toggleRoyal() {
    this.isRoyal = !this.isRoyal;
    this.dock.classList.toggle('is-royal', this.isRoyal);
    const royalBtn = document.getElementById('pet-btn-royal');
    if (royalBtn) royalBtn.classList.toggle('active', this.isRoyal);

    if (this.isRoyal) {
      this.playHappyArpeggio();
      this.setEyeExpression('curious');
      this.say("SYS.PET // ROYAL", "Mahkota arsitektural terpasang! Baginda HanzzPet siap memerintah.");
      this.spawnParticles(50, 10, 8, '⋆');
    } else {
      this.say("SYS.PET // CASUAL", "Mahkota disimpan di brankas kode.");
      this.setEyeExpression('normal');
    }
  }

  toggleSleep() {
    this.isSleepy = !this.isSleepy;
    this.dock.classList.toggle('is-sleepy', this.isSleepy);
    const sleepBtn = document.getElementById('pet-btn-sleep');
    if (sleepBtn) sleepBtn.classList.toggle('active', this.isSleepy);

    if (this.isSleepy) {
      this.playSoundChirp(320, 160, 'sine', 0.35);
      this.setEyeExpression('sleepy');
      this.say("SYS.PET // NAP", "Zzz... Mode hemat energi diaktifkan...");
    } else {
      this.playSoundChirp(200, 540, 'triangle', 0.2);
      this.setEyeExpression('normal');
      this.say("SYS.PET // WAKE", "Bangun! Siap merancang arsitektur kembali.");
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    this.dock.classList.toggle('is-minimized', this.isMinimized);
    const minPath = document.getElementById('pet-min-path');
    if (minPath) {
      minPath.setAttribute('d', this.isMinimized ? 'M8 3V13M3 8H13' : 'M3 8H13');
    }
  }

  /* ==========================================================================
     PHYSICS ENGINE: DRAG, TOSS & BOUNDARY BOUNCE
     ========================================================================== */
  resetToDock() {
    if (this.dock) {
      this.dock.style.left = '';
      this.dock.style.top = '';
      this.dock.style.bottom = '';
      this.dock.classList.remove('speech-align-right');
      this.dock.classList.remove('is-dragged');
    }
    this.dockX = 24;
    this.dockY = window.innerHeight - this.dockHeight - 24;
    this.currentX = this.dockX;
    this.currentY = this.dockY;
  }

  updatePosition(x, y) {
    this.currentX = x;
    this.currentY = y;
    if (this.dock) {
      this.dock.style.left = `${x}px`;
      this.dock.style.bottom = 'auto';
      this.dock.style.top = `${y}px`;

      if (x > window.innerWidth - 260) {
        this.dock.classList.add('speech-align-right');
      } else {
        this.dock.classList.remove('speech-align-right');
      }
    }
  }

  updateTossPhysics() {
    this.vy += this.gravity;
    this.vx *= this.friction;
    this.vy *= this.friction;

    let nextX = this.currentX + this.vx;
    let nextY = this.currentY + this.vy;

    const dockW = 160;
    const minX = 12;
    const maxX = window.innerWidth - dockW - 12;
    const minY = 90;
    const maxY = window.innerHeight - this.dockHeight - 24;

    let hasBounced = false;
    let impactVelocity = 0;

    if (nextX <= minX) {
      nextX = minX;
      impactVelocity = Math.abs(this.vx);
      this.vx = -this.vx * this.bounceDamping;
      hasBounced = true;
    } else if (nextX >= maxX) {
      nextX = maxX;
      impactVelocity = Math.abs(this.vx);
      this.vx = -this.vx * this.bounceDamping;
      hasBounced = true;
    }

    if (nextY <= minY) {
      nextY = minY;
      impactVelocity = Math.max(impactVelocity, Math.abs(this.vy));
      this.vy = -this.vy * this.bounceDamping;
      hasBounced = true;
    } else if (nextY >= maxY) {
      nextY = maxY;
      impactVelocity = Math.max(impactVelocity, Math.abs(this.vy));
      this.vy = -this.vy * this.bounceDamping;
      hasBounced = true;
      this.vx *= 0.88;

      // Floor impact triggers chewy mochi squash and bounce
      if (this.petBody && impactVelocity > 1.6) {
        this.petBody.classList.remove('is-bouncing', 'is-squished');
        void this.petBody.offsetWidth;
        this.petBody.classList.add('is-bouncing');
        setTimeout(() => {
          if (this.petBody) this.petBody.classList.remove('is-bouncing');
        }, 680);
      }
    }

    if (hasBounced && impactVelocity > 1.2) {
      this.playMochiBounceSound(impactVelocity);
      this.spawnParticles(60, 45, Math.min(Math.floor(impactVelocity * 0.8) + 1, 6), '✦');
    }

    this.updatePosition(nextX, nextY);

    if (Math.hypot(this.vx, this.vy) < 0.65 && nextY >= maxY - 4) {
      this.isTossed = false;
      this.vx = 0;
      this.vy = 0;

      setTimeout(() => {
        this.returnToDock();
      }, 800);
    }
  }

  returnToDock() {
    if (this.isDragging || this.isTossed) return;

    const targetX = 24;
    const targetY = window.innerHeight - this.dockHeight - 24;

    const animateReturn = () => {
      if (this.isDragging || this.isTossed) return;

      const dx = targetX - this.currentX;
      const dy = targetY - this.currentY;

      if (Math.hypot(dx, dy) > 2) {
        this.updatePosition(this.currentX + dx * 0.14, this.currentY + dy * 0.14);
        requestAnimationFrame(animateReturn);
      } else {
        this.resetToDock();
        this.say("SYS.PET // HOME", "Kembali ke koordinat dok santai...");
      }
    };

    animateReturn();
  }

  /* ==========================================================================
     SPEECH & DIALOGUES
     ========================================================================== */
  say(prefix, text, duration = 4500) {
    if (!this.speech || this.isMinimized) return;

    if (this.speechPrefix) this.speechPrefix.textContent = prefix;
    if (this.speechText) this.speechText.textContent = text;

    this.speech.classList.add('is-visible');

    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    this.speechTimeout = setTimeout(() => {
      if (this.speech) this.speech.classList.remove('is-visible');
    }, duration);
  }

  getQuote(key) {
    const quotes = {
      id: {
        welcome: "Selamat datang di ruang portofolio digital Haidar Rifky Andrianno!",
        about: "Menciptakan desain dan pengalaman baru yang bermanfaat bagi banyak orang.",
        skills: "17 keahlian teruji dari web development, UI/UX, hingga basis data.",
        projects: "6 proyek nyata berfokus pada fungsionalitas dan kenyamanan pengguna.",
        github: "Repositori dan kontribusi kode terbuka di GitHub @HanzzSama.",
        lab: "Eksplorasi interaktif kanvas dan ide kreatif tanpa batas.",
        randomWisdom: [
          "Desain yang baik adalah desain yang mempermudah kehidupan manusia.",
          "Setiap baris kode dibangun dengan ketelitian dan rasa ingin tahu yang tinggi.",
          "Kreativitas dan logika bekerja sama untuk menciptakan solusi digital nyata.",
          "Terus belajar keterampilan baru adalah kunci pertumbuhan tanpa henti."
        ]
      },
      en: {
        welcome: "Welcome to the digital portfolio of Haidar Rifky Andrianno!",
        about: "Creating fresh, meaningful designs and digital experiences.",
        skills: "17 proven skills across web development, UI/UX, and databases.",
        projects: "6 real-world projects focused on usability and solid engineering.",
        github: "Open source repositories and contributions at GitHub @HanzzSama.",
        lab: "Interactive canvas experiments and limitless creative exploration.",
        randomWisdom: [
          "Good design is design that empowers human workflows.",
          "Every line of code is crafted with precision and curiosity.",
          "Creativity and logic collaborate to build tangible digital products.",
          "Continuous learning is the cornerstone of sustainable craft."
        ]
      }
    };

    const lang = quotes[this.currentLang] ? this.currentLang : 'id';
    const dict = quotes[lang];

    if (key === 'random') {
      const list = dict.randomWisdom;
      return list[Math.floor(Math.random() * list.length)];
    }

    return dict[key] || quotes.id.welcome;
  }

  /* ==========================================================================
     EVENT BINDINGS
     ========================================================================== */
  bindEvents() {
    // Mouse tracking across viewport
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.resetIdleTimer();

      if (this.trackingRaf) cancelAnimationFrame(this.trackingRaf);
      this.trackingRaf = requestAnimationFrame(() => {
        this.updateTracking(e.clientX, e.clientY);
      });
    }, { passive: true });

    // Physics Loop for Toss
    const physicsLoop = () => {
      if (this.isTossed) {
        this.updateTossPhysics();
      }
      requestAnimationFrame(physicsLoop);
    };
    requestAnimationFrame(physicsLoop);

    // Multi-click & Click on Character Body
    if (this.petBody) {
      this.petBody.addEventListener('click', (e) => {
        if (this.isDragging) return;
        this.clickCount++;
        clearTimeout(this.clickTimer);
        this.clickTimer = setTimeout(() => { this.clickCount = 0; }, 380);

        if (this.clickCount >= 3) {
          this.clickCount = 0;
          this.triggerHappyDance();
        } else {
          this.triggerPetInteraction(e);
        }
      });
    }

    // Pointer Drag & Toss on Stage
    if (this.stage) {
      this.stage.addEventListener('pointerdown', (e) => {
        if (e.target.closest('.pet-action-btn')) return;

        this.isDragging = true;
        this.isTossed = false;
        this.dock.classList.add('is-dragged');

        const rect = this.dock.getBoundingClientRect();
        this.currentX = rect.left;
        this.currentY = rect.top;
        this.dragOffset = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };

        this.lastPointerPos = { x: e.clientX, y: e.clientY, time: performance.now() };
        this.velocityHistory = [];

        try { this.stage.setPointerCapture(e.pointerId); } catch (_) {}
        this.playSoundChirp(320, 480, 'triangle', 0.12);
      });

      this.stage.addEventListener('pointermove', (e) => {
        if (!this.isDragging) return;

        const nextX = e.clientX - this.dragOffset.x;
        const nextY = e.clientY - this.dragOffset.y;
        this.updatePosition(nextX, nextY);

        const now = performance.now();
        const dt = Math.max(now - this.lastPointerPos.time, 1);
        const vx = (e.clientX - this.lastPointerPos.x) / dt * 16;
        const vy = (e.clientY - this.lastPointerPos.y) / dt * 16;

        this.velocityHistory.push({ vx, vy });
        if (this.velocityHistory.length > 5) this.velocityHistory.shift();

        this.lastPointerPos = { x: e.clientX, y: e.clientY, time: now };

        // Elastic dynamic mochi stretch while dragging based on velocity
        if (this.petBody) {
          const speed = Math.hypot(vx, vy);
          const stretch = Math.min(speed * 0.012, 0.28);
          const tilt = Math.max(Math.min(vx * 0.7, 18), -18);
          this.petBody.style.transform = `scale(${1 + stretch}, ${1 - stretch * 0.55}) rotate(${tilt.toFixed(1)}deg)`;
        }
      });

      const handlePointerUp = (e) => {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.dock.classList.remove('is-dragged');
        try { this.stage.releasePointerCapture(e.pointerId); } catch (_) {}

        // Reset inline stretch transform
        if (this.petBody) {
          this.petBody.style.transform = '';
        }

        if (this.velocityHistory.length > 0) {
          const avgVx = this.velocityHistory.reduce((s, v) => s + v.vx, 0) / this.velocityHistory.length;
          const avgVy = this.velocityHistory.reduce((s, v) => s + v.vy, 0) / this.velocityHistory.length;

          if (Math.hypot(avgVx, avgVy) > 4.5) {
            this.isTossed = true;
            this.vx = avgVx * 0.9;
            this.vy = avgVy * 0.9;
            this.playMochiBounceSound(Math.hypot(avgVx, avgVy));
            this.say("SYS.PET // TOSS", "Wheee! Fisika lemparan bebas!");
          } else {
            // Soft release spring squish
            if (this.petBody) {
              this.petBody.classList.remove('is-squished', 'is-bouncing');
              void this.petBody.offsetWidth;
              this.petBody.classList.add('is-squished');
              this.playMochiBounceSound(3);
              setTimeout(() => {
                if (this.petBody) this.petBody.classList.remove('is-squished');
              }, 720);
            }
          }
        }
      };

      this.stage.addEventListener('pointerup', handlePointerUp);
      this.stage.addEventListener('pointercancel', handlePointerUp);
    }

    // Action Toolbar buttons
    document.getElementById('pet-btn-pet')?.addEventListener('click', (e) => this.triggerPetInteraction(e));
    document.getElementById('pet-btn-context')?.addEventListener('click', () => this.triggerContextAction());
    document.getElementById('pet-btn-dance')?.addEventListener('click', () => this.triggerHappyDance());
    document.getElementById('pet-btn-matcha')?.addEventListener('click', () => this.feedMatcha());
    document.getElementById('pet-btn-expr')?.addEventListener('click', () => this.nextEyeExpression());
    document.getElementById('pet-btn-royal')?.addEventListener('click', () => this.toggleRoyal());
    document.getElementById('pet-btn-talk')?.addEventListener('click', () => {
      this.playSoundChirp(450, 680, 'sine', 0.15);
      this.say("HANZZ // WISDOM", this.getQuote('random'));
    });
    document.getElementById('pet-btn-sleep')?.addEventListener('click', () => this.toggleSleep());
    document.getElementById('pet-btn-sound')?.addEventListener('click', () => this.toggleSound());
    document.getElementById('pet-btn-minimize')?.addEventListener('click', () => this.toggleMinimize());

    // Contextual section change observer listener: triggers dynamic persona metamorphosis
    window.addEventListener('sectionchange', (e) => {
      const sectionId = e.detail?.id;
      if (!sectionId) return;
      this.applySectionPersona(sectionId, true);
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.dockX = 24;
      this.dockY = window.innerHeight - this.dockHeight - 24;
      if (!this.isTossed && !this.isDragging) {
        this.resetToDock();
      }
    }, { passive: true });
  }

  getSectionNum(id) {
    const map = { welcome: '1', about: '2', skills: '3', projects: '4', github: '5', lab: '6', another: '6' };
    return map[id] || '0';
  }

  resetIdleTimer() {
    if (this.idleTimer) clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      if (!this.isDragging && !this.isTossed && !this.isSleepy) {
        this.toggleSleep();
      }
    }, 28000);
  }

  destroy() {
    if (this.blinkTimer) clearTimeout(this.blinkTimer);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    if (this.trackingRaf) cancelAnimationFrame(this.trackingRaf);
  }
}

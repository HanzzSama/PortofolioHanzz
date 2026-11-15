/**
 * HANZZPET INTERACTIVE ENGINE (v2.4)
 * Autonomous Mascot System: Eye Tracking with Organic Head Tilt,
 * Procedural Eye Expressions Library, Jelly Squish & Happy Dance Physics,
 * 432Hz/Chirp Web Audio Synthesizer, Dynamic Particle Cloud, and Boundary Bounce
 */

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
  `
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
    this.expressionKeys = ['normal', 'happy', 'sleepy', 'love', 'curious', 'wink'];
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
      normal: "Normal (• •)",
      happy: "Senang (^ ^)",
      sleepy: "Tidur (- -)",
      love: "Cinta (♥ ♥)",
      curious: "Kepo (o O)",
      wink: "Kedip (^ •)"
    };
    this.say("PET.EXPR", `Ekspresi mata: ${labels[nextExpr] || nextExpr}`, 2400);
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
  spawnParticles(x, y, count = 6, emoji = '💖') {
    if (!this.particleCloud) return;
    const emojis = ['💖', '✨', '⭐', '🌸', '💫', '🍃'];

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'floating-heart';
      p.textContent = emoji === 'random' ? emojis[Math.floor(Math.random() * emojis.length)] : emoji;

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
    this.spawnParticles(clickX, clickY, 6, '💖');

    this.setEyeExpression('happy');

    const happyQuotes = [
      'Hehe, kenyal seperti mochi arsitektural! ✨',
      'Purr purr... senangnya ditemani arsitek ramah!',
      'Frekuensi harmonis 432Hz terkalibrasi 100%! 💚',
      'Elusan kamu bikin komputasi makin elastis & lancar!'
    ];
    this.say("SYS.PET // HAPPY", happyQuotes[Math.floor(Math.random() * happyQuotes.length)]);

    setTimeout(() => {
      this.isPetting = false;
      this.dock.classList.remove('is-petted', 'is-happy');
      this.petBody.classList.remove('is-squished');
      if (!this.isSleepy) {
        this.setEyeExpression(this.currentExpression === 'happy' ? 'normal' : this.currentExpression);
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
    this.say("SYS.PET // DANCE", "Yaaay! Joget arsitektural merayakan kode presisi! 🎶💃");

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
    this.spawnParticles(rect.width / 2, rect.height / 2, 7, '🍵');
    this.setEyeExpression('curious');
    this.say("SYS.PET // MATCHA", "Slurp... Teh matcha hangat menenangkan memori sistem! 🍃");
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
      this.spawnParticles(50, 10, 8, '👑');
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
      this.spawnParticles(60, 45, Math.min(Math.floor(impactVelocity * 0.8) + 1, 6), '✨');
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
        welcome: "Selamat datang di ruang digital Haidar Rifky Andrianno!",
        about: "Menyelaraskan alam organik dengan kode presisi tanpa kompromi.",
        skills: "Arsitektur murni tanpa bloatware. Setiap siklus komputasi dihitung.",
        projects: "Sistem terdistribusi dan rekayasa antarmuka skala tinggi.",
        github: "44+ komit riil di repositori @HanzzSama! Terbuka dan teruji.",
        lab: "Mode wireframe 3D aktif! Menikmati inersia matematika Kanvas.",
        randomWisdom: [
          "Garis 1px bukan sekadar pembatas, melainkan balok penopang struktur.",
          "Estetika sejati lahir dari efisiensi komputasi, bukan library raksasa.",
          "Semarang Node beroperasi pada frekuensi nominal 432Hz.",
          "Kerapian kode adalah cerminan keteraturan pikiran sang arsitek."
        ]
      },
      en: {
        welcome: "Welcome to the digital sanctuary of Haidar Rifky Andrianno!",
        about: "Harmonizing organic nature with rigid code without compromise.",
        skills: "Pure architecture with zero bloatware. Every cycle counts.",
        projects: "Distributed systems and high-throughput web architecture.",
        github: "44+ annual commits on @HanzzSama! Open and verified.",
        lab: "3D wireframe active! Savoring pure Canvas projection mathematics.",
        randomWisdom: [
          "A 1px line is not merely a border, but a structural load-bearing beam.",
          "True elegance stems from computational efficiency, not heavy libraries.",
          "Semarang Node operating at nominal 432Hz harmonic frequency.",
          "Code cleanliness mirrors the architectural order of its craftsman."
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

    // Contextual section change observer listener
    window.addEventListener('sectionchange', (e) => {
      const sectionId = e.detail?.id;
      if (!sectionId) return;

      if (sectionId === 'lab') {
        this.dock.classList.add('is-wireframe');
        this.say("SYS.PET // LAB", this.getQuote('lab'), 5000);
      } else {
        this.dock.classList.remove('is-wireframe');
      }

      if (Math.random() < 0.65) {
        const quote = this.getQuote(sectionId);
        if (quote) {
          this.say(`SYS.NODE // 0${this.getSectionNum(sectionId)}`, quote, 4200);
        }
      }
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

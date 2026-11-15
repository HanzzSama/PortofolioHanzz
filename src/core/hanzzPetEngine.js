/**
 * HANZZPET INTERACTIVE ENGINE
 * Real-time Procedural Eye-Tracking, Verlet Toss & Bounce Physics,
 * Web Audio 432Hz Sound Synthesis, and Architectural Telemetry State Machine
 */

export class HanzzPetEngine {
  constructor() {
    this.dock = document.getElementById('hanzz-pet-dock');
    if (!this.dock) return;

    this.stage = document.getElementById('hanzz-pet-stage');
    this.speech = document.getElementById('hanzz-pet-speech');
    this.speechPrefix = document.getElementById('pet-speech-prefix');
    this.speechText = document.getElementById('pet-speech-text');

    this.bodyGroup = document.getElementById('pet-body-group');
    this.eyesWrapper = document.getElementById('pet-eyes-wrapper');
    this.eyeLeft = document.getElementById('pet-eye-left');
    this.eyeRight = document.getElementById('pet-eye-right');
    this.glimmerLeft = document.getElementById('pet-glimmer-left');
    this.glimmerRight = document.getElementById('pet-glimmer-right');
    this.shadow = document.getElementById('pet-shadow');

    // State
    this.isRoyal = false;
    this.isSleepy = false;
    this.isMinimized = false;
    this.isWireframe = false;
    this.isDragging = false;
    this.isTossed = false;
    this.isPetting = false;

    // Default Dock Coordinates
    this.dockHeight = 138;
    this.dockX = 24;
    this.dockY = window.innerHeight - this.dockHeight - 24;
    this.currentX = this.dockX;
    this.currentY = this.dockY;

    // Physics Velocity
    this.vx = 0;
    this.vy = 0;
    this.gravity = 0.55;
    this.friction = 0.985;
    this.bounceDamping = 0.65;
    this.lastPointerPos = { x: 0, y: 0, time: 0 };
    this.velocityHistory = [];

    // Eye Tracking Coordinates & Lerp
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.eyePos = { x: 0, y: 0 };
    this.targetEyePos = { x: 0, y: 0 };

    // Audio Context (Synthesized 432Hz)
    this.audioCtx = null;

    // Timers
    this.idleTimer = null;
    this.blinkTimer = null;
    this.speechTimeout = null;
    this.rafId = null;

    // Internationalized Dialogue Quotes
    this.currentLang = localStorage.getItem('portfolio-language') || 'id';

    this.init();
  }

  init() {
    this.setupAudio();
    this.bindEvents();
    this.startEyeTrackingLoop();
    this.scheduleNaturalBlink();
    this.resetIdleTimer();

    // Initial positioning: reset cleanly to CSS dock anchor (bottom: 24px; left: 24px)
    this.resetToDock();

    // Initial greeting thought
    setTimeout(() => {
      this.say("SYS.PET // ONLINE", this.getQuote('welcome'));
    }, 1200);
  }

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

  /* ==========================================================================
     SYNTHESIZED WEB AUDIO (432Hz PENTATONIC HARMONICS)
     ========================================================================== */
  setupAudio() {
    // Lazy initialize on first user interaction to satisfy browser autoplay policy
    const initAudio = () => {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      window.removeEventListener('pointerdown', initAudio);
    };
    window.addEventListener('pointerdown', initAudio, { once: true });
  }

  playTone(freq, duration = 0.25, type = 'sine', gainVal = 0.08) {
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (_) {}
  }

  playPurr() {
    // Warm low-frequency purr with frequency modulation
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const lfo = this.audioCtx.createOscillator();
      const lfoGain = this.audioCtx.createGain();
      const mainGain = this.audioCtx.createGain();

      lfo.frequency.setValueAtTime(18, now); // 18Hz vibrato flutter
      lfoGain.gain.setValueAtTime(12, now);

      osc.frequency.setValueAtTime(108, now); // 108Hz harmonic root
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      mainGain.gain.setValueAtTime(0.06, now);
      mainGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(mainGain);
      mainGain.connect(this.audioCtx.destination);

      lfo.start(now);
      osc.start(now);
      lfo.stop(now + 0.4);
      osc.stop(now + 0.4);
    } catch (_) {}
  }

  playChime(noteIdx = 0) {
    // 432Hz natural pentatonic tuning scale (C, D, E, G, A)
    const scale = [432, 486, 540, 648, 720];
    const freq = scale[noteIdx % scale.length];
    this.playTone(freq, 0.35, 'sine', 0.09);
  }

  playBoing() {
    // Elastic spring pitch glide
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(432, now + 0.18);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch (_) {}
  }

  playRoyalFanfare() {
    // Majestic arpeggio chord: C4 (432Hz), E4 (540Hz), G4 (648Hz), C5 (864Hz)
    const chord = [432, 540, 648, 864];
    chord.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.45, 'triangle', 0.1);
      }, i * 90);
    });
  }

  /* ==========================================================================
     EYE TRACKING & PROCEDURAL ANIMATION LOOP
     ========================================================================== */
  startEyeTrackingLoop() {
    const loop = () => {
      // Calculate target eye position from stage center to mouse
      if (this.stage && !this.isSleepy) {
        const rect = this.stage.getBoundingClientRect();
        const stageCenterX = rect.left + rect.width / 2;
        const stageCenterY = rect.top + rect.height / 2;

        const dx = this.mouse.x - stageCenterX;
        const dy = this.mouse.y - stageCenterY;
        const dist = Math.hypot(dx, dy);

        // Clamped maximum eye travel range (elliptical bounds)
        const maxRadius = 3.8;
        const factor = Math.min(dist / 220, 1.0);
        const angle = Math.atan2(dy, dx);

        this.targetEyePos.x = Math.cos(angle) * maxRadius * factor;
        this.targetEyePos.y = Math.sin(angle) * (maxRadius * 0.75) * factor;

        // Smooth Lerp Damping
        this.eyePos.x += (this.targetEyePos.x - this.eyePos.x) * 0.12;
        this.eyePos.y += (this.targetEyePos.y - this.eyePos.y) * 0.12;

        // Update Pupil positions (Centered at lx=46, ly=49 and rx=83, ry=49)
        if (this.eyeLeft && this.eyeRight) {
          const lx = 46 + this.eyePos.x;
          const ly = 49 + this.eyePos.y;
          const rx = 83 + this.eyePos.x;
          const ry = 49 + this.eyePos.y;

          this.eyeLeft.setAttribute('cx', lx.toFixed(2));
          this.eyeLeft.setAttribute('cy', ly.toFixed(2));
          this.eyeRight.setAttribute('cx', rx.toFixed(2));
          this.eyeRight.setAttribute('cy', ry.toFixed(2));
        }
      }

      // Physics loop for Toss & Bounce
      if (this.isTossed) {
        this.updateTossPhysics();
      }

      this.rafId = requestAnimationFrame(loop);
    };

    loop();
  }

  scheduleNaturalBlink() {
    const blink = () => {
      if (!this.isSleepy && this.eyesWrapper) {
        this.eyesWrapper.classList.add('is-blinking');
        setTimeout(() => {
          this.eyesWrapper.classList.remove('is-blinking');

          // 25% chance of charming double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              this.eyesWrapper.classList.add('is-blinking');
              setTimeout(() => {
                this.eyesWrapper.classList.remove('is-blinking');
              }, 110);
            }, 120);
          }
        }, 130);
      }

      // Schedule next blink at organic interval (3.5 - 7 seconds)
      const nextDelay = 3500 + Math.random() * 3500;
      this.blinkTimer = setTimeout(blink, nextDelay);
    };

    this.blinkTimer = setTimeout(blink, 2500);
  }

  /* ==========================================================================
     PHYSICS ENGINE: DRAG, TOSS & BOUNDARY BOUNCE
     ========================================================================== */
  updatePosition(x, y) {
    this.currentX = x;
    this.currentY = y;
    if (this.dock) {
      this.dock.style.left = `${x}px`;
      this.dock.style.bottom = 'auto';
      this.dock.style.top = `${y}px`;

      // Flip speech bubble direction when near the right edge
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

    // Horizontal Boundary Collisions
    if (nextX <= minX) {
      nextX = minX;
      this.vx = -this.vx * this.bounceDamping;
      hasBounced = true;
    } else if (nextX >= maxX) {
      nextX = maxX;
      this.vx = -this.vx * this.bounceDamping;
      hasBounced = true;
    }

    // Vertical Boundary Collisions
    if (nextY <= minY) {
      nextY = minY;
      this.vy = -this.vy * this.bounceDamping;
      hasBounced = true;
    } else if (nextY >= maxY) {
      nextY = maxY;
      this.vy = -this.vy * this.bounceDamping;
      hasBounced = true;

      // Friction on ground
      this.vx *= 0.88;
    }

    if (hasBounced && Math.hypot(this.vx, this.vy) > 2) {
      this.playBoing();
      this.squish(1.22, 0.78);
      this.spawnParticle('spark', this.currentX + 60, this.currentY + 50);
    }

    this.updatePosition(nextX, nextY);

    // Stop toss when velocity settles
    if (Math.hypot(this.vx, this.vy) < 0.65 && nextY >= maxY - 4) {
      this.isTossed = false;
      this.vx = 0;
      this.vy = 0;

      // Crawl/Spring back gently to home dock
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

  squish(scaleX = 1.15, scaleY = 0.85) {
    if (!this.bodyGroup) return;
    this.bodyGroup.style.transform = `scale(${scaleX}, ${scaleY})`;
    setTimeout(() => {
      if (this.bodyGroup) {
        this.bodyGroup.style.transform = '';
      }
    }, 180);
  }

  /* ==========================================================================
     PARTICLE BURST ENGINE (Hearts, Sage Leaves, Royal Sparks)
     ========================================================================== */
  spawnParticle(type = 'heart', x, y) {
    const particle = document.createElement('span');
    particle.className = 'pet-particle font-mono';

    const icons = {
      heart: '💚',
      leaf: '🍃',
      spark: '✨',
      tea: '🍵',
      crown: '👑'
    };
    particle.textContent = icons[type] || '✨';

    const dx = (Math.random() - 0.5) * 60;
    const dy = -40 - Math.random() * 45;
    const rot = (Math.random() - 0.5) * 40;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--p-dx', `${dx}px`);
    particle.style.setProperty('--p-dy', `${dy}px`);
    particle.style.setProperty('--p-rot', `${rot}deg`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1250);
  }

  /* ==========================================================================
     STATE MACHINE & ACTIONS
     ========================================================================== */
  setHappy(isHappy) {
    this.dock.classList.toggle('is-happy', isHappy);
    if (isHappy) {
      this.dock.classList.remove('is-sleepy');
      this.isSleepy = false;
    }
  }

  toggleRoyal() {
    this.isRoyal = !this.isRoyal;
    this.dock.classList.toggle('is-royal', this.isRoyal);
    const royalBtn = document.getElementById('pet-btn-royal');
    if (royalBtn) royalBtn.classList.toggle('active', this.isRoyal);

    if (this.isRoyal) {
      this.playRoyalFanfare();
      this.squish(1.08, 0.92);
      this.say("SYS.PET // ROYAL", "Mahkota arsitektural terpasang! Baginda HanzzPet siap memerintah.");
      this.spawnParticle('crown', this.currentX + 50, this.currentY);
      this.spawnParticle('spark', this.currentX + 70, this.currentY + 10);
    } else {
      this.say("SYS.PET // CASUAL", "Mahkota disimpan di brankas kode.");
    }
  }

  feedMatcha() {
    this.setHappy(true);
    this.playChime(2);
    this.squish(0.92, 1.12);
    this.say("SYS.PET // MATCHA", "Slurp... Teh matcha hangat menenangkan frekuensi sistem.");
    this.spawnParticle('tea', this.currentX + 58, this.currentY + 20);
    this.spawnParticle('leaf', this.currentX + 35, this.currentY + 15);
    setTimeout(() => this.setHappy(false), 2200);
  }

  triggerZoomies() {
    this.say("SYS.PET // ZOOMIES", "Woooo! Kecepatan komputasi hiperaktif diaktifkan!");
    this.playTone(648, 0.2);

    let step = 0;
    const maxSteps = 24;
    const startX = this.currentX;
    const startY = this.currentY;

    const zoom = () => {
      step++;
      const offsetAngle = (step / maxSteps) * Math.PI * 4;
      const jx = startX + Math.sin(offsetAngle) * 160;
      const jy = startY - Math.abs(Math.cos(offsetAngle)) * 80;

      this.updatePosition(jx, jy);
      this.spawnParticle('spark', jx + 60, jy + 50);

      if (step % 4 === 0) {
        this.playTone(300 + step * 25, 0.1);
      }

      if (step < maxSteps) {
        requestAnimationFrame(zoom);
      } else {
        this.returnToDock();
        this.say("SYS.PET // REST", "Fiuh... Latihan sirkuit selesai!");
      }
    };

    zoom();
  }

  toggleSleep() {
    this.isSleepy = !this.isSleepy;
    this.dock.classList.toggle('is-sleepy', this.isSleepy);
    const sleepBtn = document.getElementById('pet-btn-sleep');
    if (sleepBtn) sleepBtn.classList.toggle('active', this.isSleepy);

    if (this.isSleepy) {
      this.playTone(160, 0.4, 'sine', 0.05);
      this.say("SYS.PET // NAP", "Zzz... Mode hemat energi diaktifkan...");
    } else {
      this.playTone(540, 0.2);
      this.squish(0.9, 1.15);
      this.say("SYS.PET // WAKE", "Bangun! Siap merancang arsitektur kembali.");
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    this.dock.classList.toggle('is-minimized', this.isMinimized);
    const minBtn = document.getElementById('pet-btn-minimize');
    if (minBtn) {
      minBtn.querySelector('span').textContent = this.isMinimized ? '+' : '–';
    }
  }

  say(prefix, text, duration = 4500) {
    if (!this.speech || this.isMinimized) return;

    if (this.speechPrefix) this.speechPrefix.textContent = prefix;
    if (this.speechText) this.speechText.textContent = text;

    this.speech.classList.add('is-visible');

    if (this.speechTimeout) clearTimeout(this.speechTimeout);
    this.speechTimeout = setTimeout(() => {
      this.speech.classList.remove('is-visible');
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
    // Window mouse tracker
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.resetIdleTimer();
    }, { passive: true });

    // Petting / Hover on Stage
    if (this.stage) {
      let petMoveCount = 0;

      this.stage.addEventListener('pointerenter', () => {
        this.isPetting = true;
        this.dock.classList.add('is-petted');
        this.setHappy(true);
        this.playPurr();
        this.spawnParticle('heart', this.currentX + 60, this.currentY + 20);
      });

      this.stage.addEventListener('pointermove', (e) => {
        if (!this.isDragging) {
          petMoveCount++;
          if (petMoveCount % 12 === 0) {
            this.playPurr();
            this.spawnParticle('leaf', e.clientX, e.clientY - 20);
          }
        }
      });

      this.stage.addEventListener('pointerleave', () => {
        this.isPetting = false;
        this.dock.classList.remove('is-petted');
        petMoveCount = 0;
        if (!this.isRoyal) {
          setTimeout(() => this.setHappy(false), 800);
        }
      });

      // Pointer Drag & Toss
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
        this.squish(0.9, 1.15);
        this.playTone(320, 0.15);
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
      });

      const handlePointerUp = (e) => {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.dock.classList.remove('is-dragged');
        try { this.stage.releasePointerCapture(e.pointerId); } catch (_) {}

        // Calculate fling release velocity
        if (this.velocityHistory.length > 0) {
          const avgVx = this.velocityHistory.reduce((s, v) => s + v.vx, 0) / this.velocityHistory.length;
          const avgVy = this.velocityHistory.reduce((s, v) => s + v.vy, 0) / this.velocityHistory.length;

          if (Math.hypot(avgVx, avgVy) > 4.5) {
            this.isTossed = true;
            this.vx = avgVx * 0.9;
            this.vy = avgVy * 0.9;
            this.playBoing();
            this.say("SYS.PET // TOSS", "Wheee! Fisika lemparan bebas!");
          }
        }
      };

      this.stage.addEventListener('pointerup', handlePointerUp);
      this.stage.addEventListener('pointercancel', handlePointerUp);
    }

    // Action Toolbar buttons
    document.getElementById('pet-btn-royal')?.addEventListener('click', () => this.toggleRoyal());
    document.getElementById('pet-btn-matcha')?.addEventListener('click', () => this.feedMatcha());
    document.getElementById('pet-btn-zoomies')?.addEventListener('click', () => this.triggerZoomies());
    document.getElementById('pet-btn-wisdom')?.addEventListener('click', () => {
      this.playChime(1);
      this.say("HANZZ // WISDOM", this.getQuote('random'));
    });
    document.getElementById('pet-btn-sleep')?.addEventListener('click', () => this.toggleSleep());
    document.getElementById('pet-btn-minimize')?.addEventListener('click', () => this.toggleMinimize());

    // Contextual section change observer listener
    window.addEventListener('sectionchange', (e) => {
      const sectionId = e.detail?.id;
      if (!sectionId) return;

      // Special visual reaction when entering Kinetic Lab
      if (sectionId === 'lab') {
        this.dock.classList.add('is-wireframe');
        this.say("SYS.PET // LAB", this.getQuote('lab'), 5000);
      } else {
        this.dock.classList.remove('is-wireframe');
      }

      // Contextual thought bubble
      if (Math.random() < 0.65) {
        const quote = this.getQuote(sectionId);
        if (quote) {
          this.say(`SYS.0${this.getSectionNum(sectionId)} // NODE`, quote, 4200);
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
      if (!this.isDragging && !this.isTossed) {
        this.toggleSleep();
      }
    }, 22000); // 22 seconds idle triggers nap
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.blinkTimer) clearTimeout(this.blinkTimer);
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this.speechTimeout) clearTimeout(this.speechTimeout);
  }
}


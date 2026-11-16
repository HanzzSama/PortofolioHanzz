/**
 * FLUID CURSOR LIQUID WAKE ENGINE
 * Living bioluminescent wake & organic water-droplet particle physics
 * Adapts dynamically to Obsidian / Limestone theme tokens
 * Zero-garbage collection pool design, 60/120 FPS capped
 */

export class FluidCursorEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Particle pool with pre-allocated objects
    this.maxParticles = 65;
    this.particles = [];
    this.poolIndex = 0;

    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
      lastX: this.width / 2,
      lastY: this.height / 2,
      vx: 0,
      vy: 0,
      speed: 0,
      isMoving: false
    };

    this.lastMoveTime = 0;
    this.animId = null;
    this.isThemeDark = true;

    // Card hover state — amplifies wake intensity
    this.isOnCard = false;
    this.cardHoverIntensity = 0; // 0→1 spring for smooth transition

    this.init();
  }

  init() {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.createCanvas();
    this.initParticlePool();
    this.bindEvents();
    this.checkTheme();
    this.start();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'fluid-cursor-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '999998'; // Just behind custom cursor dot/ring (1000000 / 999999)
    this.canvas.style.mixBlendMode = 'screen';
    this.canvas.style.opacity = '0.85';

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.resize();
  }

  initParticlePool() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 0,
        maxRadius: 0,
        alpha: 0,
        maxAlpha: 0,
        life: 0,
        maxLife: 1,
        active: false,
        hueOffset: 0
      });
    }
  }

  checkTheme() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    this.isThemeDark = theme !== 'light';
    if (this.canvas) {
      this.canvas.style.mixBlendMode = this.isThemeDark ? 'screen' : 'multiply';
      this.canvas.style.opacity = this.isThemeDark ? '0.85' : '0.45';
    }
  }

  resize() {
    if (!this.canvas || !this.ctx) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Card hover detection — amplifies fluid wake when hovering interactive surfaces
    const cardSelector = '.project-architectural-card, .pillar-card, .matrix-tier-card, .about-grid-card, .synth-freq-btn, .kinetic-control-card, .monolith-stage-container, .welcome-terminal-box, [data-cursor-target], .project-details-panel, .project-blueprint-panel, .weather-contour-card, .weather-primary-card, .weather-metric-tile';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(cardSelector)) {
        this.isOnCard = true;
      }
    }, { passive: true });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(cardSelector)) {
        this.isOnCard = false;
      }
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - this.lastMoveTime);
      this.lastMoveTime = now;

      const dx = e.clientX - this.mouse.x;
      const dy = e.clientY - this.mouse.y;
      this.mouse.speed = Math.sqrt(dx * dx + dy * dy) / dt;
      this.mouse.vx = dx * 0.4;
      this.mouse.vy = dy * 0.4;

      this.mouse.lastX = this.mouse.x;
      this.mouse.lastY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Spawn fluid wake particles along trajectory
      this.spawnWakeParticles(e.clientX, e.clientY, this.mouse.speed);
    }, { passive: true });

    // Listen for theme mutations
    const observer = new MutationObserver(() => this.checkTheme());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  spawnWakeParticles(x, y, speed) {
    // When hovering over cards, spawn more particles with larger spread & higher alpha
    const onCard = this.isOnCard;
    const baseCount = onCard ? Math.max(2, Math.floor(speed * 3)) : Math.max(1, Math.floor(speed * 2.2));
    const count = Math.min(onCard ? 5 : 3, baseCount);

    for (let c = 0; c < count; c++) {
      const p = this.particles[this.poolIndex];
      this.poolIndex = (this.poolIndex + 1) % this.maxParticles;

      // Jitter position along stroke — wider spread on card hover
      const spread = onCard ? Math.min(28, speed * 5 + 8) : Math.min(18, speed * 4);
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * spread;

      p.x = x + Math.cos(angle) * dist;
      p.y = y + Math.sin(angle) * dist;
      p.vx = -this.mouse.vx * 0.15 + (Math.random() - 0.5) * (onCard ? 1.4 : 0.8);
      p.vy = -this.mouse.vy * 0.15 + (Math.random() - 0.5) * (onCard ? 1.4 : 0.8);

      // Larger, brighter particles on card hover
      const baseRadius = onCard ? 6 : 4;
      const speedBonus = onCard ? Math.min(18, speed * 4.5) : Math.min(14, speed * 3.5);
      p.radius = baseRadius + Math.random() * 6 + speedBonus;
      p.maxRadius = p.radius * (1.6 + Math.random() * 0.8);

      const alphaBoost = onCard ? 0.15 : 0;
      p.maxAlpha = this.isThemeDark
        ? (0.28 + alphaBoost + Math.random() * 0.22)
        : (0.18 + alphaBoost + Math.random() * 0.14);
      p.alpha = p.maxAlpha;
      p.maxLife = onCard ? (35 + Math.random() * 30) : (28 + Math.random() * 24);
      p.life = p.maxLife;
      p.active = true;
      p.hueOffset = (Math.random() - 0.5) * 30;
      p.isCardParticle = onCard;
    }
  }

  start() {
    this.lastFrameTime = performance.now();
    const loop = (timestamp) => {
      this.render(timestamp);
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  render(timestamp) {
    if (!this.ctx) return;

    const now = timestamp || performance.now();
    const dtMs = this.lastFrameTime ? Math.min(64, Math.max(1, now - this.lastFrameTime)) : 16.67;
    this.lastFrameTime = now;
    const dt = dtMs / 16.667;

    // Smooth card hover intensity ramp (spring interpolation)
    const targetIntensity = this.isOnCard ? 1.0 : 0.0;
    this.cardHoverIntensity += (targetIntensity - this.cardHoverIntensity) * Math.min(1, 0.16 * dt);

    // Continuous subtle fluid pulse while hovering on cards even at low speed
    this.idleFrameCounter = (this.idleFrameCounter || 0) + 1;
    if (this.isOnCard && this.idleFrameCounter % 6 === 0) {
      this.spawnWakeParticles(this.mouse.x, this.mouse.y, Math.max(0.35, this.mouse.speed));
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw active bioluminescent fluid core aura under cursor when hovering cards
    if (this.cardHoverIntensity > 0.01) {
      const coreAlpha = (this.isThemeDark ? 0.35 : 0.22) * this.cardHoverIntensity;
      const pulse = Math.sin(now * 0.006) * 3.5;
      const coreRadius = Math.max(18, 30 + pulse + Math.min(24, this.mouse.speed * 8));

      const coreGrad = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, coreRadius
      );

      if (this.isThemeDark) {
        // Emerald to Sacred Moss living biophilic liquid
        coreGrad.addColorStop(0, `rgba(50, 205, 135, ${coreAlpha})`);
        coreGrad.addColorStop(0.4, `rgba(74, 140, 100, ${coreAlpha * 0.55})`);
        coreGrad.addColorStop(1, `rgba(74, 93, 78, 0)`);
      } else {
        // Olive to sage slate liquid aura
        coreGrad.addColorStop(0, `rgba(74, 93, 78, ${coreAlpha})`);
        coreGrad.addColorStop(0.45, `rgba(110, 135, 118, ${coreAlpha * 0.45})`);
        coreGrad.addColorStop(1, `rgba(74, 93, 78, 0)`);
      }

      this.ctx.fillStyle = coreGrad;
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, coreRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];
      if (!p.active) continue;

      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        continue;
      }

      // Physics update: when hovering on cards, particles dynamically track and flow with cursor
      if (p.isCardParticle || this.cardHoverIntensity > 0.05) {
        const pull = 0.048 * (p.isCardParticle ? 1.0 : this.cardHoverIntensity);
        p.vx += (this.mouse.x - p.x) * pull * dt;
        p.vy += (this.mouse.y - p.y) * pull * dt;
        p.vx += this.mouse.vx * 0.08 * dt;
        p.vy += this.mouse.vy * 0.08 * dt;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= Math.pow(0.93, dt);
      p.vy *= Math.pow(0.93, dt);

      const progress = 1 - (p.life / p.maxLife);
      const currentRadius = p.radius + (p.maxRadius - p.radius) * progress;
      const currentAlpha = p.maxAlpha * (1 - progress);

      // Biophilic bioluminescence color synthesis
      let r, g, b;
      if (this.isThemeDark) {
        // Obsidian mode: Sacred Moss green (74, 93, 78) to Spring Emerald (16, 185, 129) & Warm Gold
        if (p.isCardParticle) {
          r = 45; g = 210; b = 140; // Vibrant luminous emerald when on cards
        } else if (p.hueOffset > 0) {
          r = 74; g = 140; b = 100;
        } else {
          r = 50; g = 180; b = 130;
        }
      } else {
        // Limestone mode: Earthy Olive / Sage slate
        r = 58; g = 80; b = 65;
      }

      // Draw soft gradient aura
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha})`);
      grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentAlpha * 0.45})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}


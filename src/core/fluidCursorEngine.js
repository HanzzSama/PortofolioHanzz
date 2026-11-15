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
    const count = Math.min(3, Math.max(1, Math.floor(speed * 2.2)));
    for (let c = 0; c < count; c++) {
      const p = this.particles[this.poolIndex];
      this.poolIndex = (this.poolIndex + 1) % this.maxParticles;

      // Jitter position along stroke
      const spread = Math.min(18, speed * 4);
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * spread;

      p.x = x + Math.cos(angle) * dist;
      p.y = y + Math.sin(angle) * dist;
      p.vx = -this.mouse.vx * 0.15 + (Math.random() - 0.5) * 0.8;
      p.vy = -this.mouse.vy * 0.15 + (Math.random() - 0.5) * 0.8;

      p.radius = 4 + Math.random() * 6 + Math.min(14, speed * 3.5);
      p.maxRadius = p.radius * (1.6 + Math.random() * 0.8);
      p.maxAlpha = this.isThemeDark ? (0.28 + Math.random() * 0.22) : (0.18 + Math.random() * 0.14);
      p.alpha = p.maxAlpha;
      p.maxLife = 28 + Math.random() * 24; // frames of life (~0.5 - 0.8s)
      p.life = p.maxLife;
      p.active = true;
      p.hueOffset = (Math.random() - 0.5) * 30;
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

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];
      if (!p.active) continue;

      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        continue;
      }

      // Physics update (Frame-rate independent friction)
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= Math.pow(0.94, dt);
      p.vy *= Math.pow(0.94, dt);

      const progress = 1 - (p.life / p.maxLife);
      const currentRadius = p.radius + (p.maxRadius - p.radius) * progress;
      const currentAlpha = p.maxAlpha * (1 - progress);

      // Biophilic bioluminescence color synthesis
      let r, g, b;
      if (this.isThemeDark) {
        // Obsidian mode: Sacred Moss green (74, 93, 78) to Spring Emerald (16, 185, 129) & Warm Gold
        if (p.hueOffset > 0) {
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


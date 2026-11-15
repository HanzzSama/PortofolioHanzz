/**
 * KINETIC VARIABLE TYPOGRAPHY ENGINE
 * Organic letter-spacing breathing and spring-inertia on cursor proximity
 * Turns static headlines into living, elastic biophilic typography
 */

export class KineticTypographyEngine {
  constructor(selector = '.welcome-title, .lab-intro h2, .skills-headline, .section-watermark-label') {
    this.selector = selector;
    this.elements = [];
    this.mouse = { x: -1000, y: -1000 };
    this.proximityRadius = 240; // px
    this.rafId = null;

    this.init();
  }

  init() {
    if (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.collectElements();
    this.bindEvents();
    this.startLoop();
  }

  collectElements() {
    const targets = document.querySelectorAll(this.selector);
    this.elements = Array.from(targets).map(el => {
      // Store default styles
      const defaultSpacing = window.getComputedStyle(el).letterSpacing;
      return {
        el,
        defaultSpacing: defaultSpacing === 'normal' ? 0 : parseFloat(defaultSpacing) || 0,
        currentSpacing: 0,
        targetSpacing: 0,
        bounds: el.getBoundingClientRect()
      };
    });
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      this.updateBounds();
    }, { passive: true });

    window.addEventListener('resize', () => {
      this.updateBounds();
    }, { passive: true });
  }

  updateBounds() {
    this.elements.forEach(item => {
      item.bounds = item.el.getBoundingClientRect();
    });
  }

  startLoop() {
    this.lastFrameTime = performance.now();
    const loop = (timestamp) => {
      const now = timestamp || performance.now();
      const dtMs = this.lastFrameTime ? Math.min(50, Math.max(1, now - this.lastFrameTime)) : 16.67;
      this.lastFrameTime = now;
      const dt = dtMs / 16.667;
      const ease = 1 - Math.pow(1 - 0.12, dt);

      this.elements.forEach(item => {
        const { bounds } = item;
        // Compute center of element
        const cx = bounds.left + bounds.width / 2;
        const cy = bounds.top + bounds.height / 2;

        const dist = Math.hypot(this.mouse.x - cx, this.mouse.y - cy);

        if (dist < this.proximityRadius) {
          const factor = 1 - (dist / this.proximityRadius);
          // Quadratic falloff for smooth organic response
          const intensity = factor * factor;
          item.targetSpacing = intensity * 4.5; // up to 4.5px extra letter-spacing
        } else {
          item.targetSpacing = 0;
        }

        // Spring lerp interpolation (Frame-rate independent)
        item.currentSpacing += (item.targetSpacing - item.currentSpacing) * ease;

        // Apply if changing
        if (Math.abs(item.currentSpacing) > 0.02 || item.targetSpacing > 0) {
          item.el.style.letterSpacing = `${(item.defaultSpacing + item.currentSpacing).toFixed(2)}px`;
        }
      });

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}


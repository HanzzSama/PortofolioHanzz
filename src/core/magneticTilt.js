/**
 * MAGNETIC 3D PERSPECTIVE TILT ENGINE
 * Physical spring-inertia 3D perspective rotation with dynamic surface glare
 * Compatible with touch devices (auto-disabled on coarse pointers)
 */

export class MagneticTiltEngine {
  constructor(selector = '.project-architectural-card, .synth-freq-btn, .about-grid-card, .pillar-card, .matrix-tier-card, .weather-contour-card, .weather-primary-card, .weather-metric-tile') {
    this.selector = selector;
    this.elements = [];
    this.maxTilt = 8.5; // degrees
    this.perspective = 900; // px
    this.scale = 1.018;

    this.init();
  }

  init() {
    // Disable on touch devices or reduced motion
    if (window.matchMedia('(pointer: coarse)').matches || 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.bindCards();
  }

  bindCards() {
    const targets = document.querySelectorAll(this.selector);
    targets.forEach(el => {
      if (el.dataset.tiltBound) return;
      el.dataset.tiltBound = 'true';

      // Setup 3D transform style
      el.style.transformStyle = 'preserve-3d';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';

      let bounds = null;

      const onMouseEnter = () => {
        bounds = el.getBoundingClientRect();
        el.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = el.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const normX = (x / bounds.width) * 2 - 1; // -1 to 1
        const normY = (y / bounds.height) * 2 - 1;

        const rotX = -normY * this.maxTilt;
        const rotY = normX * this.maxTilt;

        // Dynamic surface glare CSS vars
        el.style.setProperty('--glare-x', `${(x / bounds.width) * 100}%`);
        el.style.setProperty('--glare-y', `${(y / bounds.height) * 100}%`);

        el.style.transform = `perspective(${this.perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${this.scale}, ${this.scale}, 1)`;
      };

      const onMouseLeave = () => {
        bounds = null;
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
        el.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      };

      el.addEventListener('mouseenter', onMouseEnter, { passive: true });
      el.addEventListener('mousemove', onMouseMove, { passive: true });
      el.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  refresh() {
    this.bindCards();
  }
}


/**
 * MAGNETIC TILT ENGINE (DISABLED)
 * All 3D hover perspective tilt and sketch transforms have been removed
 * in favor of clean, flat, rectilinear architectural cards.
 */

export class MagneticTiltEngine {
  constructor(selector = '.project-architectural-card, .synth-freq-btn, .about-grid-card, .pillar-card, .matrix-tier-card, .weather-contour-card, .weather-primary-card, .weather-metric-tile') {
    this.selector = selector;
    this.init();
  }

  init() {
    // Clean up any inline 3D transform or transform-style if previously attached
    if (typeof document !== 'undefined') {
      try {
        const targets = document.querySelectorAll(this.selector);
        targets.forEach(el => {
          el.style.transformStyle = '';
          if (el.style.transform && el.style.transform.includes('perspective')) {
            el.style.transform = '';
          }
        });
      } catch (_) {}
    }
  }

  bindCards() {
    // Intentionally no-op: 3D hover tilt disabled
  }

  refresh() {
    this.init();
  }
}



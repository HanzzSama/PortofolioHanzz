/**
 * BIO-ATMOSPHERE SOLAR TIME SYNCHRONIZATION ENGINE
 * Adapts ambient lighting, solar warmth & HUD telemetry based on real-time solar cadence
 * Dawn (05:00-10:00) // Noon (10:00-16:00) // Dusk (16:00-18:30) // Night (18:30-05:00)
 */

export class BioTimeEngine {
  constructor() {
    this.timerId = null;
    this.currentCycle = '';
    this.init();
  }

  init() {
    this.updateSolarCycle();
    // Re-check solar arc every 60 seconds
    this.timerId = setInterval(() => this.updateSolarCycle(), 60000);
  }

  updateSolarCycle() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeDec = hours + (minutes / 60);

    let cycle = 'night';
    let label = 'SOLAR: NIGHT [LUMINESCENT]';
    let accentGlow = 'rgba(16, 185, 129, 0.06)';

    if (timeDec >= 5.0 && timeDec < 10.0) {
      cycle = 'dawn';
      label = 'SOLAR: DAWN [DEWY SAGE]';
      accentGlow = 'rgba(74, 140, 100, 0.08)';
    } else if (timeDec >= 10.0 && timeDec < 16.0) {
      cycle = 'noon';
      label = 'SOLAR: NOON [LIMESTONE ZENITH]';
      accentGlow = 'rgba(16, 185, 129, 0.04)';
    } else if (timeDec >= 16.0 && timeDec < 18.5) {
      cycle = 'dusk';
      label = 'SOLAR: DUSK [GOLDEN AMBER]';
      accentGlow = 'rgba(212, 175, 55, 0.08)';
    } else {
      cycle = 'night';
      label = 'SOLAR: NIGHT [OBSIDIAN ARC]';
      accentGlow = 'rgba(16, 185, 129, 0.06)';
    }

    this.currentCycle = cycle;

    // Apply attribute and CSS custom properties to root
    document.documentElement.setAttribute('data-solar-cycle', cycle);
    document.documentElement.style.setProperty('--solar-glow', accentGlow);

    // Update DOM telemetry
    const solarEl = document.getElementById('telemetry-solar-cycle');
    if (solarEl) {
      solarEl.textContent = label;
    }
  }

  destroy() {
    if (this.timerId) clearInterval(this.timerId);
  }
}


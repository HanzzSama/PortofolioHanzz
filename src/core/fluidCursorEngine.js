/**
 * FLUID CURSOR LIQUID WAKE ENGINE (NEUTRALIZED)
 * Custom cursor trail and wake particle physics permanently disabled.
 * Preserves clean, precision dual-element cursor without motion trails.
 */

export class FluidCursorEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.init();
  }

  init() {
    // Purge any residual trail canvas from DOM
    const existing = document.getElementById('fluid-cursor-canvas');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
  }

  destroy() {
    const existing = document.getElementById('fluid-cursor-canvas');
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing);
    }
  }
}

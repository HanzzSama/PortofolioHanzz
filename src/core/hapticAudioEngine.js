/**
 * HAPTIC MICRO-AUDITORY ENGINE
 * Procedural Organic UI Clicks & Acoustic Micro-Feedback via Web Audio API
 * Bamboo tick, Warm Water Drop & Air Sweep — Zero audio file dependencies
 */

import { monolithAudio } from './monolithAudioEngine.js';

export class HapticAudioEngine {
  constructor() {
    this.isEnabled = true;
    this.lastTickTime = 0;
    this.init();
  }

  init() {
    this.bindInteractiveListeners();
  }

  getCtx() {
    if (monolithAudio && monolithAudio.ctx) {
      if (monolithAudio.ctx.state === 'suspended') {
        monolithAudio.ctx.resume().catch(() => {});
      }
      return monolithAudio.ctx;
    }
    return monolithAudio ? monolithAudio.ensureContext() : null;
  }

  // Delicate bamboo tick on hover
  playTick() {
    if (!this.isEnabled) return;
    const nowMs = performance.now();
    // Throttle hover ticks so it doesn't machine-gun on fast scrubs
    if (nowMs - this.lastTickTime < 65) return;
    this.lastTickTime = nowMs;

    const ctx = this.getCtx();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      // Pitch drop creates the organic "wooden tick" tactile click
      osc.frequency.setValueAtTime(780, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.022);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, t);

      // Whispering volume: gain 0.02
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.022, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.024);
    } catch (_) {}
  }

  // Warm organic water drop on button click / tab activation
  playDrop() {
    if (!this.isEnabled) return;
    const ctx = this.getCtx();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      // Downward frequency sweep mimics a gentle surface water drop
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.075);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.038, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.082);
    } catch (_) {}
  }

  // Whisper-soft lowpass air sweep on drawer / modal opening
  playWhoosh() {
    if (!this.isEnabled) return;
    const ctx = this.getCtx();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const bufferSize = ctx.sampleRate * 0.25; // 250ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      const t = ctx.currentTime;
      filter.frequency.setValueAtTime(280, t);
      filter.frequency.exponentialRampToValueAtTime(950, t + 0.12);
      filter.frequency.exponentialRampToValueAtTime(220, t + 0.25);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.03, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(t);
    } catch (_) {}
  }

  bindInteractiveListeners() {
    // Delegated hover listener for interactive elements
    document.addEventListener('mouseover', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const target = e.target.closest('a, button, [data-cursor-target], [data-drawer-trigger], .project-architectural-card, .synth-freq-btn, .theme-toggle-btn');
      if (target) {
        this.playTick();
      }
    }, { passive: true });

    // Delegated click listener
    document.addEventListener('click', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const target = e.target.closest('button, [data-drawer-trigger], .synth-freq-btn, .theme-toggle-btn, .system-pill');
      if (target) {
        this.playDrop();
      }
    }, { passive: true });
  }
}

export const hapticAudio = new HapticAudioEngine();


/**
 * GOOGLE ANTIGRAVITY SMOOTH SCROLLER ENGINE
 * Physics-Driven Momentum Scrolling & Viewport Synchronization
 * Based on Google Antigravity & Lenis Architecture
 */

import Lenis from '../vendor/lenis.js';

export class SmoothScroller {
  constructor(options = {}) {
    this.options = {
      lerp: options.lerp !== undefined ? options.lerp : 0.04, // Ultra-cinematic heavy floating mass — long deceleration tail
      duration: options.duration !== undefined ? options.duration : undefined,
      headerOffset: options.headerOffset || 72,
      wheelMultiplier: options.wheelMultiplier !== undefined ? options.wheelMultiplier : 1.2,
      touchMultiplier: options.touchMultiplier !== undefined ? options.touchMultiplier : 2.0,
      smoothWheel: true,
      smoothTouch: false,
      ...options
    };

    this.lenis = null;
    this.rafId = null;
    this.isReducedMotion = false;
    this.callbacks = new Set();

    this.init();
  }

  init() {
    // Check user accessibility preference for reduced motion
    this.isReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;

    if (this.isReducedMotion) {
      console.info('[AntigravityScroller] Reduced motion preferred; using native scroll fallback.');
      this.bindAnchorLinksNative();
      return;
    }

    // Initialize Lenis with Google Antigravity physics specifications
    this.lenis = new Lenis({
      lerp: this.options.lerp,
      duration: this.options.duration,
      // Exponential ease-out curve (identical to Google Antigravity & high-end physics showcases)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: this.options.smoothWheel,
      syncTouch: false,
      syncTouchLerp: 0.075,
      touchInertiaMultiplier: 35,
      wheelMultiplier: this.options.wheelMultiplier,
      touchMultiplier: this.options.touchMultiplier,
      infinite: false,
      autoResize: true,
      autoRaf: false // Driven via dedicated high-frequency RAF loop
    });

    // Make instance accessible globally for components
    window.lenis = this.lenis;
    window.__antigravityScroller = this;

    // Start requestAnimationFrame loop
    this.startRAF();

    // Setup scroll listener to broadcast to subscribers
    this.lenis.on('scroll', (e) => {
      this.callbacks.forEach((cb) => {
        try {
          cb(e);
        } catch (err) {
          console.error('[AntigravityScroller] Callback error:', err);
        }
      });
    });

    // Intercept anchor clicks for smooth momentum navigation
    this.bindAnchorLinks();

    // Update document attribute
    document.documentElement.setAttribute('data-scroller', 'antigravity-smooth');
  }

  startRAF() {
    const update = (time) => {
      if (this.lenis) {
        this.lenis.raf(time);
      }
      this.rafId = requestAnimationFrame(update);
    };
    this.rafId = requestAnimationFrame(update);
  }

  stopRAF() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Subscribe to scroll updates from the Antigravity scroller
   */
  onScroll(callback) {
    if (typeof callback === 'function') {
      this.callbacks.add(callback);
      return () => this.callbacks.delete(callback);
    }
    return () => {};
  }

  /**
   * Smoothly scroll to target element, selector, or pixel coordinate
   */
  scrollTo(target, options = {}) {
    if (!this.lenis) {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    const defaultOptions = {
      offset: -this.options.headerOffset,
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      immediate: false,
      lock: false
    };

    this.lenis.scrollTo(target, { ...defaultOptions, ...options });
  }

  /**
   * Temporarily stop scrolling (e.g. when opening modals or system drawer)
   */
  stop() {
    if (this.lenis) {
      this.lenis.stop();
    }
  }

  /**
   * Resume scrolling
   */
  start() {
    if (this.lenis) {
      this.lenis.start();
    }
  }

  /**
   * Intercept internal hash links to glide with momentum
   */
  bindAnchorLinks() {
    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const link = e.target?.closest?.('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      let targetEl = null;
      try {
        targetEl = document.querySelector(hash);
      } catch (_) {
        targetEl = document.getElementById(decodeURIComponent(hash.slice(1)));
      }

      if (targetEl) {
        e.preventDefault();
        // Update URL hash without abrupt native jump
        if (history.pushState) {
          history.pushState(null, '', hash);
        }
        this.scrollTo(targetEl, {
          offset: -this.options.headerOffset,
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  }

  bindAnchorLinksNative() {
    document.addEventListener('click', (e) => {
      const link = e.target?.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  destroy() {
    this.stopRAF();
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
    this.callbacks.clear();
  }
}


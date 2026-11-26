/**
 * GOOGLE ANTIGRAVITY SMOOTH SCROLLER ENGINE
 * Physics-Driven Momentum Scrolling & Viewport Synchronization
 * Based on Google Antigravity & Lenis Architecture
 * 
 * Mobile Optimization:
 * Smooth scroller is automatically disabled on mobile screen ratios (<= 768px)
 * to use native hardware-accelerated momentum scrolling, saving battery and CPU.
 */

import Lenis from '../vendor/lenis.js';

export class SmoothScroller {
  constructor(options = {}) {
    this.options = {
      lerp: options.lerp !== undefined ? options.lerp : 0.045, // Fluid cinematic glide with responsive initiation
      duration: options.duration !== undefined ? options.duration : 1.2,
      headerOffset: options.headerOffset || 72,
      wheelMultiplier: options.wheelMultiplier !== undefined ? options.wheelMultiplier : 1.25,
      touchMultiplier: options.touchMultiplier !== undefined ? options.touchMultiplier : 1.8,
      smoothWheel: true,
      smoothTouch: false, // Disallow smooth touch simulation on touchscreens
      ...options
    };

    this.lenis = null;
    this.rafId = null;
    this.isReducedMotion = false;
    this.callbacks = new Set();
    this.resizeHandler = null;
    this._nativeAnchorBound = false;
    this._lenisAnchorBound = false;

    this.init();
    this.initResizeListener();
  }

  /**
   * Detects mobile viewport or touch coarse screen ratio
   */
  isMobileRatio() {
    return (
      window.innerWidth <= 768 ||
      Boolean(window.matchMedia?.('(max-width: 768px)')?.matches) ||
      Boolean(window.matchMedia?.('(pointer: coarse) and (max-width: 860px)')?.matches)
    );
  }

  init() {
    // Check user accessibility preference for reduced motion
    this.isReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;

    if (this.isReducedMotion || this.isMobileRatio()) {
      if (this.isReducedMotion) {
        console.info('[AntigravityScroller] Reduced motion preferred; using native scroll fallback.');
      } else {
        console.info('[AntigravityScroller] Mobile ratio detected; smooth scroller disabled, using native mobile momentum scroll.');
      }
      this.cleanupLenis();
      this.bindAnchorLinksNative();
      return;
    }

    this.initLenis();
  }

  initLenis() {
    if (this.lenis) return;

    // Initialize Lenis with Google Antigravity physics specifications
    this.lenis = new Lenis({
      lerp: this.options.lerp,
      duration: this.options.duration,
      // Exponential ease-out curve matching high-end motion showcases
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: this.options.smoothWheel,
      syncTouch: false,
      touchMultiplier: this.options.touchMultiplier,
      wheelMultiplier: this.options.wheelMultiplier,
      infinite: false,
      autoResize: true,
      autoRaf: false, // Driven via dedicated high-frequency RAF loop
      prevent: (node) => {
        if (!node || !(node instanceof HTMLElement)) return false;
        return Boolean(
          node.hasAttribute?.('data-lenis-prevent') ||
          node.closest?.('[data-lenis-prevent], #system-drawer, .architectural-drawer, #drawer-body, .drawer-content, #admin-terminal-window, .admin-terminal-window, #terminal-screen-body, .terminal-body, #monolith-audio-console, .monolith-audio-console, .xray-overlay, .admin-auth-modal')
        );
      }
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

  cleanupLenis() {
    this.stopRAF();
    if (this.lenis) {
      try {
        this.lenis.destroy();
      } catch (_) {}
      this.lenis = null;
    }
    window.lenis = null;
    window.__antigravityScroller = this;

    document.documentElement.removeAttribute('data-scroller');
    document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped', 'lenis-locked');
    if (document.body) {
      document.body.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped', 'lenis-locked');
    }
  }

  initResizeListener() {
    let resizeTimer = null;
    this.resizeHandler = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (this.isReducedMotion) return;

        const isMobile = this.isMobileRatio();
        if (isMobile && this.lenis) {
          // Viewport shrank to mobile ratio: dismantle smooth scroller
          this.cleanupLenis();
          this.bindAnchorLinksNative();
        } else if (!isMobile && !this.lenis) {
          // Viewport widened to desktop: activate smooth scroller
          this.initLenis();
        } else if (this.lenis) {
          this.lenis.resize();
        }
      }, 150);
    };

    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  startRAF() {
    this.stopRAF();
    const update = (time) => {
      if (this.lenis) {
        this.lenis.raf(time);
        this.rafId = requestAnimationFrame(update);
      }
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
    const headerOffset = this.options.headerOffset || 72;

    if (!this.lenis) {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }
      return;
    }

    const defaultOptions = {
      offset: -headerOffset,
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
   * Intercept internal hash links to glide with momentum on desktop
   */
  bindAnchorLinks() {
    if (this._lenisAnchorBound) return;
    this._lenisAnchorBound = true;

    document.addEventListener('click', (e) => {
      if (!this.lenis) return;
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

  /**
   * Native smooth scroll for mobile and reduced motion
   */
  bindAnchorLinksNative() {
    if (this._nativeAnchorBound) return;
    this._nativeAnchorBound = true;

    document.addEventListener('click', (e) => {
      if (this.lenis) return; // Handled by Lenis when desktop is active
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
        const headerOffset = this.options.headerOffset || 72;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, '', hash);
        }
      }
    });
  }

  destroy() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
    this.cleanupLenis();
    this.callbacks.clear();
  }
}

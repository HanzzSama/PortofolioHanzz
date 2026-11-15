/**
 * MULTI-LAYER PARALLAX ENGINE & MOTION PHYSICS
 * Linear Interpolation (Lerp), Multi-layer Z-Depth & Cursor Physics
 * Based on Google Material 3 Expressive motion principles
 */

export class ParallaxEngine {
  constructor(options = {}) {
    this.viewport = document.getElementById('parallax-viewport');
    this.ease = options.ease || 0.085;
    this.scroll = {
      target: window.scrollY,
      current: window.scrollY,
      last: window.scrollY,
      velocity: 0,
      direction: 1
    };

    this.mouse = {
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      currentX: window.innerWidth / 2,
      currentY: window.innerHeight / 2,
      normX: 0,
      normY: 0
    };

    this.layers = [];
    this.textSliders = [];
    this.scrollScaleTargets = [];
    this.isRunning = false;
    this.rafId = null;

    // Custom cursor elements
    this.cursorDot = document.querySelector('.custom-cursor-dot');
    this.cursorRing = document.querySelector('.custom-cursor-ring');
    this.cursorPos = {
      dotX: this.mouse.targetX,
      dotY: this.mouse.targetY,
      ringX: this.mouse.targetX,
      ringY: this.mouse.targetY
    };

    this.init();
  }

  init() {
    this.collectLayers();
    this.bindEvents();
    this.start();
  }

  collectLayers() {
    // Parallax layers (generic only: exclude text sliders, relative layers, and topo-plane)
    const layerElements = document.querySelectorAll(
      '[data-parallax-speed]:not([data-parallax-slide]):not([data-parallax-relative]):not(.welcome-topo-plane), [data-depth]'
    );
    this.layers = Array.from(layerElements).map((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed')) || parseFloat(el.getAttribute('data-depth')) || 0.1;
      const direction = el.getAttribute('data-parallax-direction') === 'horizontal' ? 'x' : 'y';
      return {
        element: el,
        speed,
        direction,
        initialY: el.getBoundingClientRect().top + window.scrollY
      };
    });

    // Relative parallax layers (relative to parent container, e.g. blueprint canvas)
    this.relativeLayers = Array.from(document.querySelectorAll('[data-parallax-relative]')).map((el) => ({
      element: el,
      speed: parseFloat(el.getAttribute('data-parallax-speed')) || 0.1
    }));

    // Text slider parallax elements
    this.textSliders = this.collectTextSliders();

    // Scroll-scale elements
    this.scrollScaleTargets = this.collectScrollScaleTargets();
  }

  collectTextSliders() {
    return Array.from(document.querySelectorAll('[data-parallax-slide]')).map(el => ({
      element: el,
      direction: el.getAttribute('data-parallax-slide'), // 'left'|'right'|'up'|'down'
      speed: parseFloat(el.getAttribute('data-parallax-speed')) || 0.08,
      initialY: el.getBoundingClientRect().top + window.scrollY
    }));
  }

  collectScrollScaleTargets() {
    return Array.from(document.querySelectorAll('[data-scroll-scale]')).map(el => ({
      element: el,
      scaleFrom: parseFloat(el.getAttribute('data-scale-from')) || 0.92,
      scaleTo: parseFloat(el.getAttribute('data-scale-to')) || 1.0
    }));
  }

  bindEvents() {
    // Wheel / Scroll event tracking
    window.addEventListener('scroll', () => {
      this.scroll.target = window.scrollY;
      this.updateProgressBar();
    }, { passive: true });

    // Mouse movement tracking for cursor and mouse-parallax
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.normX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.normY = (e.clientY / window.innerHeight) * 2 - 1;

      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    }, { passive: true });

    // Cursor magnetic and hover interactions
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, [data-cursor-target], .project-architectural-card, .pillar-card, .matrix-tier-card');
      if (target && this.cursorRing) {
        this.cursorRing.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, [data-cursor-target], .project-architectural-card, .pillar-card, .matrix-tier-card');
      if (target && this.cursorRing) {
        this.cursorRing.classList.remove('cursor-hover');
      }
    });

    // Resize recalculation
    window.addEventListener('resize', () => {
      this.collectLayers();
    }, { passive: true });
  }

  updateProgressBar() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }

  lerp(start, end, factor, dt = 1.0) {
    const rate = 1 - Math.pow(Math.max(0, 1 - factor), dt);
    return start + (end - start) * rate;
  }

  render(timestamp) {
    const now = timestamp || performance.now();
    const dtMs = this.lastFrameTime ? Math.min(50, Math.max(1, now - this.lastFrameTime)) : 16.67;
    this.lastFrameTime = now;
    const dt = dtMs / 16.667;

    // Smooth Lerp for scroll velocity calculation (frame-rate independent)
    const isSmoothScroller = Boolean(window.lenis);
    const scrollEase = isSmoothScroller ? 0.35 : this.ease;
    this.scroll.current = this.lerp(this.scroll.current, this.scroll.target, scrollEase, dt);
    this.scroll.velocity = this.scroll.target - this.scroll.current;

    // Lerp Cursor Ring
    if (this.cursorRing) {
      this.cursorPos.ringX = this.lerp(this.cursorPos.ringX, this.mouse.targetX, 0.22, dt);
      this.cursorPos.ringY = this.lerp(this.cursorPos.ringY, this.mouse.targetY, 0.22, dt);
      this.cursorRing.style.transform = `translate3d(${this.cursorPos.ringX - 16}px, ${this.cursorPos.ringY - 16}px, 0)`;
    }

    // Parallax Layers calculation
    const windowH = window.innerHeight;
    const currentScrollY = this.scroll.current;

    this.layers.forEach((layer) => {
      const rect = layer.element.getBoundingClientRect();
      const inView = rect.top < windowH && rect.bottom > 0;
      if (inView) {
        const offset = (currentScrollY - layer.initialY) * layer.speed;
        if (layer.direction === 'y') {
          layer.element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        } else {
          layer.element.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
        }
      }
    });

    // Mouse Parallax for elements marked with [data-mouse-parallax]
    const mouseElements = document.querySelectorAll('[data-mouse-parallax]');
    mouseElements.forEach((el) => {
      const depth = parseFloat(el.getAttribute('data-mouse-depth')) || 20;
      const moveX = this.mouse.normX * depth;
      const moveY = this.mouse.normY * depth;
      el.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0)`;
    });

    // New render passes
    this.renderTextSliders();
    this.renderRelativeParallax();
    this.renderScrollScale();
    this.renderRotateParallax();

    if (this.isRunning) {
      this.rafId = requestAnimationFrame((t) => this.render(t));
    }
  }

  renderTextSliders() {
    if (!this.textSliders || this.textSliders.length === 0) return;
    const currentScrollY = this.scroll.current;
    this.textSliders.forEach(slider => {
      const rect = slider.element.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 1.5 && rect.bottom > -window.innerHeight * 0.5;
      if (!inView) return;
      // Offset relatif terhadap posisi awal elemen
      const relativeScroll = currentScrollY - slider.initialY + window.innerHeight * 0.5;
      const offset = relativeScroll * slider.speed;
      let transform = '';
      switch (slider.direction) {
        case 'left': transform = `translate3d(${(-offset).toFixed(2)}px, 0, 0)`; break;
        case 'right': transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`; break;
        case 'up': transform = `translate3d(0, ${(-offset).toFixed(2)}px, 0)`; break;
        case 'down': transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`; break;
        default: transform = `translate3d(0, ${(-offset).toFixed(2)}px, 0)`;
      }
      slider.element.style.transform = transform;
    });
  }

  renderRelativeParallax() {
    if (!this.relativeLayers || this.relativeLayers.length === 0) return;
    const windowH = window.innerHeight;
    this.relativeLayers.forEach(layer => {
      const parent = layer.element.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      if (parentRect.top < windowH && parentRect.bottom > 0) {
        // Shift relative to parent position within screen center
        const centerDiff = parentRect.top - (windowH - parentRect.height) / 2;
        const offset = centerDiff * layer.speed;
        layer.element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      }
    });
  }

  renderScrollScale() {
    if (!this.scrollScaleTargets || this.scrollScaleTargets.length === 0) return;
    const vh = window.innerHeight;
    this.scrollScaleTargets.forEach(target => {
      const rect = target.element.getBoundingClientRect();
      // True up-scale and down-scale relative to viewport center
      const elemCenter = rect.top + rect.height / 2;
      const vhCenter = vh / 2;
      const distFromCenter = Math.abs(elemCenter - vhCenter);
      const maxDist = (vh + rect.height) * 0.55;
      // Progress: 1 when element is centered in viewport, smoothly dropping as it enters or leaves
      const centerFactor = Math.max(0, Math.min(1, 1 - (distFromCenter / maxDist)));
      // Smooth cosine bell curve
      const progress = 0.5 * (1 - Math.cos(centerFactor * Math.PI));
      const scale = target.scaleFrom + (target.scaleTo - target.scaleFrom) * progress;
      target.element.style.setProperty('--scroll-scale', scale.toFixed(4));
      target.element.style.transform = `scale(${scale.toFixed(4)})`;
    });
  }

  renderRotateParallax() {
    const topoPlane = document.querySelector('.welcome-topo-plane');
    if (!topoPlane) return;
    const scrollY = this.scroll.current;
    const rotateAngle = (scrollY * 0.015).toFixed(2);
    const translateY = (scrollY * -0.18).toFixed(2);
    // Apply rotate + translateY via CSS vars (topo-plane may already have data-parallax-speed)
    topoPlane.style.setProperty('--topo-rotate', `${rotateAngle}deg`);
    topoPlane.style.setProperty('--topo-translate-y', `${translateY}px`);
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(() => this.render());
    }
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  refresh() {
    this.collectLayers();
    this.textSliders = this.collectTextSliders();
    this.scrollScaleTargets = this.collectScrollScaleTargets();
  }
}

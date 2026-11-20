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
    this.imagePanels = [];
    this.camera = {
      pitch: 0,
      yaw: 0,
      roll: 0,
      dolly: 0
    };
    this.isRunning = false;
    this.rafId = null;
    this.lastRenderedScroll = -9999;
    this.mouseElements = [];
    this.vignetteElement = null;

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

    // Image aperture parallax elements
    this.imagePanels = Array.from(document.querySelectorAll('.project-preview-img, .non-image-blueprint-chassis')).map(el => ({
      element: el,
      parent: el.closest('.project-blueprint-panel') || el.parentElement
    }));

    // Mouse Parallax elements (cached for zero-allocation 60/120fps render)
    this.mouseElements = Array.from(document.querySelectorAll('[data-mouse-parallax]')).map((el) => ({
      element: el,
      depth: parseFloat(el.getAttribute('data-mouse-depth')) || 20
    }));

    // Film vignette element (cached)
    this.vignetteElement = document.querySelector('.cinematic-film-vignette');
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
    // Wheel / Scroll event tracking — only used as fallback when Lenis is NOT active.
    // When Lenis is active, scroll.current is synced directly from window.lenis.scroll
    // in the render loop, so this listener only updates the progress bar.
    window.addEventListener('scroll', () => {
      if (!window.lenis) {
        this.scroll.target = window.scrollY;
      }
      this.updateProgressBar();
    }, { passive: true });

    // Mouse movement tracking for cursor and mouse-parallax
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.normX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.normY = (e.clientY / window.innerHeight) * 2 - 1;

      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    }, { passive: true });

    // Cursor magnetic and hover interactions
    document.addEventListener('mouseover', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const target = e.target.closest('a, button, [data-cursor-target], .project-architectural-card, .pillar-card, .matrix-tier-card');
      if (target && this.cursorRing) {
        this.cursorRing.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
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

    // Smooth Scroll synchronization (1:1 lock with Lenis physics or smooth fallback)
    if (window.lenis && typeof window.lenis.scroll === 'number') {
      this.scroll.current = window.lenis.scroll;
      this.scroll.velocity = window.lenis.velocity || 0;
    } else {
      this.scroll.current = this.lerp(this.scroll.current, this.scroll.target, this.ease, dt);
      this.scroll.velocity = this.scroll.target - this.scroll.current;
    }

    this.updateProgressBar();

    // Lerp Cursor Ring
    if (this.cursorRing) {
      this.cursorPos.ringX = this.lerp(this.cursorPos.ringX, this.mouse.targetX, 0.22, dt);
      this.cursorPos.ringY = this.lerp(this.cursorPos.ringY, this.mouse.targetY, 0.22, dt);
      this.cursorRing.style.transform = `translate3d(${this.cursorPos.ringX}px, ${this.cursorPos.ringY}px, 0) translate(-50%, -50%)`;
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

    // Mouse Parallax for elements marked with [data-mouse-parallax] (Zero DOM query allocation)
    if (this.mouseElements && this.mouseElements.length > 0) {
      this.mouseElements.forEach((item) => {
        const moveX = this.mouse.normX * item.depth;
        const moveY = this.mouse.normY * item.depth;
        item.element.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0)`;
      });
    }

    // Cinematic camera pass
    this.renderKineticCamera(dt, now);

    // Multi-plane render passes (only execute layout measurements when scroll actively moves)
    const isScrollMoving = Math.abs(this.scroll.velocity) > 0.005 || Math.abs(currentScrollY - this.lastRenderedScroll) > 0.15;
    if (isScrollMoving) {
      this.lastRenderedScroll = currentScrollY;
      this.renderImageAperture();
      this.renderTextSliders();
      this.renderRelativeParallax();
      this.renderScrollScale();
      this.renderRotateParallax();
    }

    if (this.isRunning) {
      this.rafId = requestAnimationFrame((t) => this.render(t));
    }
  }

  renderKineticCamera(dt = 1.0, now = performance.now()) {
    if (!this.viewport || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return;

    const vel = this.scroll.velocity || 0;
    const windowH = window.innerHeight;
    const currentScrollY = this.scroll.current;

    // 1. Camera Pitch: tilt forward on downscroll, backward on upscroll
    const targetPitch = Math.max(-3.5, Math.min(3.5, vel * -0.018));
    this.camera.pitch = this.lerp(this.camera.pitch, targetPitch, 0.1, dt);

    // 2. Camera Yaw (Pan): subtle horizontal tracking with mouse
    const targetYaw = this.mouse.normX * 1.2;
    this.camera.yaw = this.lerp(this.camera.yaw, targetYaw, 0.08, dt);

    // 3. Camera Roll (Dutch Angle): kinetic tilt during rapid acceleration + subtle breathing
    const breathingRoll = Math.sin(now * 0.0008) * 0.15;
    const targetRoll = Math.max(-1.0, Math.min(1.0, vel * -0.004)) + breathingRoll;
    this.camera.roll = this.lerp(this.camera.roll, targetRoll, 0.08, dt);

    // 4. Camera Dolly (Push-in / Pull-out): camera pulls back into wide FOV on rapid scroll
    const targetDolly = Math.max(-60, Math.min(0, -Math.abs(vel) * 0.28));
    this.camera.dolly = this.lerp(this.camera.dolly, targetDolly, 0.09, dt);

    // 5. Dynamic Eye-Level Pivot: Always locked to the center of the user's screen
    const pivotY = currentScrollY + windowH * 0.5;

    this.viewport.style.setProperty('--camera-pivot-y', `${pivotY.toFixed(1)}px`);
    this.viewport.style.setProperty('--camera-pitch', `${this.camera.pitch.toFixed(3)}deg`);
    this.viewport.style.setProperty('--camera-yaw', `${this.camera.yaw.toFixed(3)}deg`);
    this.viewport.style.setProperty('--camera-roll', `${this.camera.roll.toFixed(3)}deg`);
    this.viewport.style.setProperty('--camera-dolly', `${this.camera.dolly.toFixed(2)}px`);

    // 6. Dynamic Vignette intensity on high velocity (cached element)
    if (this.vignetteElement) {
      const speedFactor = Math.min(1, Math.abs(vel) / 40);
      this.vignetteElement.style.setProperty('--vignette-intensity', (0.55 + speedFactor * 0.35).toFixed(2));
    }
  }

  renderImageAperture() {
    if (!this.imagePanels || this.imagePanels.length === 0) return;
    const windowH = window.innerHeight;

    this.imagePanels.forEach(item => {
      if (!item.parent) return;
      const rect = item.parent.getBoundingClientRect();
      const inView = rect.top < windowH && rect.bottom > 0;
      if (!inView) return;

      const parentCenter = rect.top + rect.height * 0.5;
      const vhCenter = windowH * 0.5;
      const distRatio = (parentCenter - vhCenter) / windowH; // -0.5 to 0.5
      const offset = distRatio * 32; // ±16px cinematic pan

      item.element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.04)`;
    });
  }

  renderTextSliders() {
    if (!this.textSliders || this.textSliders.length === 0) return;
    const windowH = window.innerHeight;

    this.textSliders.forEach(slider => {
      const rect = slider.element.getBoundingClientRect();
      const inView = rect.top < windowH * 1.3 && rect.bottom > -windowH * 0.3;
      if (!inView) return;

      const elemCenter = rect.top + rect.height / 2;
      const vhCenter = windowH / 2;
      const distFromCenter = elemCenter - vhCenter;
      const offset = distFromCenter * slider.speed;

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

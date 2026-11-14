/**
 * SCROLLBAR CAPSULE HUD ENGINE
 * High-Precision Unified Spring Physics Architecture
 * 
 * Features:
 * - Single-Engine Unified Spring-Damper Solver (Zero CSS conflict)
 * - Continuous Liquid Morphing between Idle Pill & Active Capsule
 * - Zero Layout Jump Vertical Clearance Anchor
 * - Hardware Composited 60/120 FPS Motion
 */

export class ScrollbarPillEngine {
  constructor() {
    this.hudContainer = document.getElementById('scrollbar-capsule-hud');
    this.pill = document.getElementById('hud-capsule-pill');
    this.content = document.getElementById('hud-capsule-content');
    this.avatarPct = document.getElementById('hud-avatar-pct');
    this.topCircle = document.getElementById('hud-top-circle');

    if (!this.pill || !this.content) return;

    // Dimensions configuration (Pixels)
    this.config = {
      idleWidth: 18,
      activeWidth: 56,
      idleHeight: 68,
      activeHeight: 140,
      marginTop: 70,
      marginBottom: 40
    };

    // Vertical Motion Spring State
    this.springY = {
      current: 70,
      target: 70,
      velocity: 0,
      stiffness: 120,
      damping: 20
    };

    // Morphing Expansion Spring State (0 = Idle, 1 = Active)
    this.springMorph = {
      current: 0,
      target: 0,
      velocity: 0,
      stiffness: 85,  // Smooth, gradual, organic spring tension
      damping: 17     // Critically damped without sharp snapping
    };

    this.isActive = false;
    this.isDragging = false;
    this.dragStartY = 0;
    this.dragStartScroll = 0;
    this.pointerDownPos = { x: 0, y: 0 };
    this.hasDragged = false;
    this.lastTime = performance.now();
    this.rafId = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateProgressText();
    this.calculateTargetY();
    this.springY.current = this.springY.target;
    this.renderFrame(0);
    this.startLoop();
  }

  calculateTargetY() {
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - vh;
    const progress = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;

    // Stable track boundary so expanding never shifts vertical anchor abruptly
    const maxPillHeight = this.config.activeHeight;
    const availableTrack = Math.max(50, vh - this.config.marginTop - this.config.marginBottom - maxPillHeight);

    this.springY.target = this.config.marginTop + progress * availableTrack;
  }

  toggleActive(forceState) {
    const nextState = typeof forceState === 'boolean' ? forceState : !this.isActive;
    this.isActive = nextState;

    // Set morphing target for the continuous spring solver
    this.springMorph.target = this.isActive ? 1 : 0;
    this.pill.classList.toggle('is-active', this.isActive);
    this.pill.setAttribute('aria-expanded', String(this.isActive));
  }

  bindEvents() {
    // Window scroll tracking
    window.addEventListener('scroll', () => {
      this.calculateTargetY();
      this.updateProgressText();
    }, { passive: true });

    // Window resize tracking
    window.addEventListener('resize', () => {
      this.calculateTargetY();
    }, { passive: true });

    // Pointer down on capsule
    this.pill.addEventListener('pointerdown', (e) => {
      this.pointerDownPos = { x: e.clientX, y: e.clientY };
      this.hasDragged = false;
      this.dragStartY = e.clientY;
      this.dragStartScroll = window.scrollY;

      try {
        this.pill.setPointerCapture(e.pointerId);
      } catch (_) {}
    });

    // Pointer move - detect drag vs tap
    window.addEventListener('pointermove', (e) => {
      if (!this.pill.hasPointerCapture(e.pointerId)) return;

      const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      if (dist > 4) {
        this.hasDragged = true;
        this.isDragging = true;
        this.pill.classList.add('is-dragging');

        const vh = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight - vh;
        if (docHeight > 0) {
          const deltaY = e.clientY - this.dragStartY;
          const availableTrack = Math.max(50, vh - 110 - this.config.activeHeight);
          const scrollRatio = docHeight / availableTrack;

          window.scrollTo({
            top: Math.max(0, Math.min(docHeight, this.dragStartScroll + deltaY * scrollRatio)),
            behavior: 'instant'
          });
        }
      }
    });

    // Pointer up on capsule
    const handlePointerUp = (e) => {
      if (this.pill.hasPointerCapture(e.pointerId)) {
        try {
          this.pill.releasePointerCapture(e.pointerId);
        } catch (_) {}

        if (this.isDragging) {
          this.isDragging = false;
          this.pill.classList.remove('is-dragging');
        } else if (!this.hasDragged) {
          // Crisp press/click: trigger smooth physics morph
          this.toggleActive();
        }
      }
    };

    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    // Keyboard accessibility (Space / Enter toggles active)
    this.pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleActive();
      } else if (e.key === 'Escape' && this.isActive) {
        this.toggleActive(false);
      }
    });

    // Close on click outside HUD
    document.addEventListener('click', (e) => {
      if (!this.isActive) return;
      const insideHUD = e.target.closest('#scrollbar-capsule-hud');
      if (!insideHUD) {
        this.toggleActive(false);
      }
    });
  }

  updateProgressText() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
    const pct = Math.round(progress * 100);

    if (this.avatarPct) this.avatarPct.textContent = `${pct}%`;
  }

  stepSpring(spring, dt) {
    const displacement = spring.current - spring.target;
    const springForce = -spring.stiffness * displacement;
    const dampingForce = -spring.damping * spring.velocity;
    const acceleration = springForce + dampingForce;

    spring.velocity += acceleration * dt;
    spring.current += spring.velocity * dt;

    // Rest condition
    if (Math.abs(spring.velocity) < 0.0001 && Math.abs(displacement) < 0.0001) {
      spring.current = spring.target;
      spring.velocity = 0;
    }
  }

  renderFrame(p) {
    // Morphing Interpolation based on physics progress p (0 = Idle, 1 = Active)
    const w = this.config.idleWidth + (this.config.activeWidth - this.config.idleWidth) * p;
    const h = this.config.idleHeight + (this.config.activeHeight - this.config.idleHeight) * p;
    
    // Smooth Content Scale & Dissolve
    const scale = 0.38 + 0.62 * p;
    const opacity = Math.max(0, Math.min(1, (p - 0.08) / 0.92));
    const blur = (1 - p) * 2.5;

    // Apply directly via unified style update
    this.pill.style.transform = `translate3d(0, ${this.springY.current.toFixed(2)}px, 0)`;
    this.pill.style.width = `${w.toFixed(2)}px`;
    this.pill.style.height = `${h.toFixed(2)}px`;

    this.content.style.transform = `scale(${scale.toFixed(3)})`;
    this.content.style.opacity = opacity.toFixed(3);
    this.content.style.filter = blur > 0.08 ? `blur(${blur.toFixed(2)}px)` : 'none';
  }

  startLoop() {
    const loop = (timestamp) => {
      // Clamp dt to prevent frame bursts after tab switch
      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.033);
      this.lastTime = timestamp;

      // Step Vertical Tracking Spring
      this.stepSpring(this.springY, dt);

      // Step Morphing Expansion Spring
      this.stepSpring(this.springMorph, dt);

      // Render updated frame
      this.renderFrame(this.springMorph.current);

      this.rafId = requestAnimationFrame(loop);
    };

    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

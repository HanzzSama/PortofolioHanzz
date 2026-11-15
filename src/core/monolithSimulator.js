/**
 * KINETIC MONOLITH 3D WIREFRAME SIMULATOR
 * Pure Canvas Linear Algebra, Projection Mathematics & Rotational Inertia Physics
 * Designed for Biophilic Architectural Minimalism
 */

export class MonolithSimulator {
  constructor(canvasId = 'monolith-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.viewport = document.getElementById('lab-canvas-viewport');

    // Telemetry DOM elements
    this.rxEl = document.getElementById('telemetry-rx');
    this.ryEl = document.getElementById('telemetry-ry');
    this.verticesEl = document.getElementById('telemetry-vertices');
    this.physicsEl = document.getElementById('telemetry-physics');
    this.hintEl = document.getElementById('stage-hint');

    // State
    this.currentMode = 'monolith';
    this.autoRotate = true;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.lastPointer = { x: 0, y: 0 };

    // Rotation angles (radians) & velocities
    this.rot = { x: 0.35, y: 0.65, z: 0 };
    this.vel = { x: 0.003, y: 0.005 };
    this.damping = 0.94;

    // Viewport scale & perspective
    this.scale = 140;
    this.perspective = 500;
    this.time = 0;
    this.rafId = null;

    this.init();
  }

  init() {
    this.resize();
    this.bindEvents();
    this.startLoop();
  }

  resize() {
    if (!this.canvas || !this.viewport) return;
    const rect = this.viewport.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = rect.width || 800;
    this.height = Math.max(380, Math.min(520, window.innerHeight * 0.55));

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
    this.scale = Math.min(this.width, this.height) * 0.38;
  }

  // -------------------------------------------------------------
  // GEOMETRIC TOPOLOGY GENERATORS
  // -------------------------------------------------------------
  getGeometry(mode) {
    switch (mode) {
      case 'tesseract':
        return this.createTesseract();
      case 'geodesic':
        return this.createIcosahedron();
      case 'wave':
        return this.createWaveGrid();
      case 'monolith':
      default:
        return this.createMonolith();
    }
  }

  createMonolith() {
    // Elegant tall architectural cuboid
    const w = 0.75, h = 1.35, d = 0.55;
    const vertices = [
      [-w, -h, -d], [w, -h, -d], [w, h, -d], [-w, h, -d],
      [-w, -h,  d], [w, -h,  d], [w, h,  d], [-w, h,  d]
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back
      [4, 5], [5, 6], [6, 7], [7, 4], // Front
      [0, 4], [1, 5], [2, 6], [3, 7]  // Connectors
    ];
    return { vertices, edges };
  }

  createTesseract() {
    // 4D Hypercube projected to 3D (Inner & Outer cubes)
    const o = 1.0;
    const i = 0.5;
    const vertices = [
      // Outer Cube
      [-o, -o, -o], [o, -o, -o], [o, o, -o], [-o, o, -o],
      [-o, -o,  o], [o, -o,  o], [o, o,  o], [-o, o,  o],
      // Inner Cube
      [-i, -i, -i], [i, -i, -i], [i, i, -i], [-i, i, -i],
      [-i, -i,  i], [i, -i,  i], [i, i,  i], [-i, i,  i]
    ];
    const edges = [
      // Outer edges
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
      // Inner edges
      [8,9],[9,10],[10,11],[11,8],[12,13],[13,14],[14,15],[15,12],[8,12],[9,13],[10,14],[11,15],
      // Inter-dimensional bridges
      [0,8],[1,9],[2,10],[3,11],[4,12],[5,13],[6,14],[7,15]
    ];
    return { vertices, edges };
  }

  createIcosahedron() {
    // Golden ratio geodesic sphere
    const phi = (1 + Math.sqrt(5)) / 2;
    const scale = 0.85;
    const vertices = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ].map(v => v.map(c => c * scale));

    const edges = [
      [0,11],[0,5],[0,1],[0,7],[0,10],
      [1,5],[1,7],[1,8],[1,9],
      [2,11],[2,10],[2,6],[2,3],[2,4],
      [3,4],[3,6],[3,8],[3,9],
      [4,5],[4,9],[4,11],
      [5,9],[5,11],
      [6,7],[6,8],[6,10],
      [7,8],[7,10],
      [8,9],
      [10,11]
    ];
    return { vertices, edges };
  }

  createWaveGrid() {
    // Dynamic 6x6 topology surface grid
    const size = 6;
    const vertices = [];
    const edges = [];
    const step = 0.45;
    const offset = ((size - 1) * step) / 2;

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const vx = x * step - offset;
        const vz = z * step - offset;
        // Harmonic undulating wave height
        const dist = Math.hypot(vx, vz);
        const vy = Math.sin(dist * 4 - this.time * 2) * 0.28;
        vertices.push([vx, vy, vz]);
      }
    }

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const idx = x * size + z;
        if (x < size - 1) edges.push([idx, idx + size]);
        if (z < size - 1) edges.push([idx, idx + 1]);
      }
    }
    return { vertices, edges };
  }

  // -------------------------------------------------------------
  // PROJECTION & RENDERING
  // -------------------------------------------------------------
  project(v) {
    // Rotate Y
    let x1 = v[0] * Math.cos(this.rot.y) + v[2] * Math.sin(this.rot.y);
    let y1 = v[1];
    let z1 = -v[0] * Math.sin(this.rot.y) + v[2] * Math.cos(this.rot.y);

    // Rotate X
    let x2 = x1;
    let y2 = y1 * Math.cos(this.rot.x) - z1 * Math.sin(this.rot.x);
    let z2 = y1 * Math.sin(this.rot.x) + z1 * Math.cos(this.rot.x);

    // Perspective projection
    const fov = this.perspective;
    const distance = 3.2;
    const zProj = z2 + distance;
    const factor = zProj > 0.1 ? fov / zProj : 1;

    const projX = this.width / 2 + x2 * this.scale * (factor / fov);
    const projY = this.height / 2 + y2 * this.scale * (factor / fov);

    return { x: projX, y: projY, z: z2 };
  }

  render() {
    if (!this.ctx) return;
    this.time += 0.02;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Inertia physics update
    if (!this.isDragging) {
      if (this.autoRotate) {
        this.rot.y += 0.006;
        this.rot.x += 0.0025;
      }
      this.rot.x += this.vel.x;
      this.rot.y += this.vel.y;
      this.vel.x *= this.damping;
      this.vel.y *= this.damping;
    }

    // Colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const wireColor = isDark ? 'rgba(117, 146, 122, 0.75)' : 'rgba(74, 93, 78, 0.65)';
    const vertexColor = isDark ? '#D5DAD5' : '#222A24';
    const gridGuideColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';

    // Subtle background coordinate crosshairs
    const cx = this.width / 2;
    const cy = this.height / 2;
    this.ctx.strokeStyle = gridGuideColor;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - 160, cy);
    this.ctx.lineTo(cx + 160, cy);
    this.ctx.moveTo(cx, cy - 160);
    this.ctx.lineTo(cx, cy + 160);
    this.ctx.stroke();

    // Fetch geometry
    const geom = this.getGeometry(this.currentMode);
    const projected = geom.vertices.map(v => this.project(v));

    // Draw Edges (Wireframe)
    this.ctx.strokeStyle = wireColor;
    this.ctx.lineWidth = 1.35;

    geom.edges.forEach(([i1, i2]) => {
      const p1 = projected[i1];
      const p2 = projected[i2];
      if (!p1 || !p2) return;

      // Depth gradient fade
      const avgZ = (p1.z + p2.z) / 2;
      const alpha = Math.max(0.18, Math.min(1.0, 0.65 + avgZ * 0.35));

      this.ctx.strokeStyle = isDark
        ? `rgba(117, 146, 122, ${alpha})`
        : `rgba(74, 93, 78, ${alpha})`;

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    });

    // Draw Vertices (Precision architectural points)
    projected.forEach(p => {
      const pointRadius = Math.max(1.8, Math.min(3.5, 2.4 + p.z * 0.8));
      this.ctx.fillStyle = vertexColor;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Update Telemetry DOM
    this.updateTelemetry(geom.vertices.length);

    this.rafId = requestAnimationFrame(() => this.render());
  }

  updateTelemetry(vertexCount) {
    if (this.rxEl) {
      const rxVal = (this.rot.x % (Math.PI * 2)).toFixed(2);
      this.rxEl.textContent = (this.rot.x >= 0 ? '+' : '') + rxVal;
    }
    if (this.ryEl) {
      const ryVal = (this.rot.y % (Math.PI * 2)).toFixed(2);
      this.ryEl.textContent = (this.rot.y >= 0 ? '+' : '') + ryVal;
    }
    if (this.verticesEl) {
      this.verticesEl.textContent = String(vertexCount);
    }
  }

  setMode(mode) {
    this.currentMode = mode;
    // Highlight active button
    document.querySelectorAll('#lab-mode-buttons .console-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  }

  resetOrientation() {
    this.rot = { x: 0.35, y: 0.65, z: 0 };
    this.vel = { x: 0, y: 0 };
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    const btn = document.getElementById('lab-toggle-autorotate');
    const icon = document.getElementById('autorotate-icon');
    const text = document.getElementById('autorotate-text');

    if (btn) btn.classList.toggle('active', this.autoRotate);
    if (icon) icon.textContent = this.autoRotate ? '■' : '▶';
    if (text) text.textContent = this.autoRotate ? 'AUTO-ORBIT: ON' : 'AUTO-ORBIT: OFF';
  }

  // -------------------------------------------------------------
  // EVENT BINDINGS
  // -------------------------------------------------------------
  bindEvents() {
    // Mode Buttons
    const modeButtons = document.querySelectorAll('#lab-mode-buttons .console-btn');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        if (mode) this.setMode(mode);
      });
    });

    // Zoom buttons
    const zoomInBtn = document.getElementById('lab-zoom-in');
    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        this.scale = Math.min(340, this.scale * 1.18);
      });
    }

    const zoomOutBtn = document.getElementById('lab-zoom-out');
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        this.scale = Math.max(70, this.scale * 0.84);
      });
    }

    // Auto-rotate toggle
    const toggleBtn = document.getElementById('lab-toggle-autorotate');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleAutoRotate());
    }

    // Reset button
    const resetBtn = document.getElementById('lab-reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetOrientation());
    }

    // Pointer Drag Interactions
    if (this.canvas) {
      this.canvas.addEventListener('pointerdown', (e) => {
        this.isDragging = true;
        this.dragStart = { x: e.clientX, y: e.clientY };
        this.lastPointer = { x: e.clientX, y: e.clientY };
        this.vel = { x: 0, y: 0 };
        try { this.canvas.setPointerCapture(e.pointerId); } catch (_) {}
        if (this.hintEl) this.hintEl.style.opacity = '0.2';
      });

      this.canvas.addEventListener('pointermove', (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.lastPointer.x;
        const dy = e.clientY - this.lastPointer.y;

        this.rot.y += dx * 0.008;
        this.rot.x += dy * 0.008;

        this.vel = { x: dy * 0.004, y: dx * 0.004 };
        this.lastPointer = { x: e.clientX, y: e.clientY };
      });

      const handlePointerUp = (e) => {
        if (!this.isDragging) return;
        this.isDragging = false;
        try { this.canvas.releasePointerCapture(e.pointerId); } catch (_) {}
        if (this.hintEl) this.hintEl.style.opacity = '';
      };

      this.canvas.addEventListener('pointerup', handlePointerUp);
      this.canvas.addEventListener('pointercancel', handlePointerUp);

      // Wheel zoom interaction
      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.2;
        this.scale = Math.max(60, Math.min(300, this.scale + delta));
      }, { passive: false });
    }

    // Window resize
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  startLoop() {
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => this.render());
    }
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}


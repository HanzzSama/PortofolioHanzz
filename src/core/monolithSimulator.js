/**
 * KINETIC MONOLITH 3D WIREFRAME SIMULATOR
 * Pure Canvas Linear Algebra, Projection Mathematics & Rotational Inertia Physics
 * Biophilic Architectural Minimalism × Real-time Audio Resonance Coupling
 */

import { monolithAudio } from './monolithAudioEngine.js';

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
    this.resonanceEl = document.getElementById('telemetry-resonance');
    this.resonancePillEl = document.getElementById('telemetry-resonance-pill');
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
  // GEOMETRIC TOPOLOGY GENERATORS (Only 'cymatics' couples with audio)
  // -------------------------------------------------------------
  getGeometry(mode, audio = { bass: 0, mid: 0, overall: 0, isPlaying: false }) {
    switch (mode) {
      case 'cymatics':
        // The DEDICATED Audio Resonance Model
        return this.createCymaticsResonator(audio);
      case 'manta':
        return this.createMantaRay();
      case 'helix':
        return this.createDoubleHelix();
      case 'torus':
        return this.createTorusKnot();
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

  createCymaticsResonator(audio) {
    // Dedicated Harmonic Cymatics Audio Resonator
    // Directly metamorphoses its 3D wireframe architecture based on the active audio frequency & track profile
    const vertices = [];
    const edges = [];

    // Central Singularity Node (index 0)
    const coreIdx = 0;
    const corePulse = audio.isPlaying ? (audio.bass * 0.25) : Math.sin(this.time * 3) * 0.05;
    vertices.push([0, corePulse, 0]);

    // Resonator Shell: 5 latitude rings x 12 points = 60 vertices (+ 2 polar points + 1 core = 63 vertices)
    const rings = 5;
    const pointsPerRing = 12;
    const baseR = 1.05;

    const trackId = audio.trackId || '';
    const isPlaying = audio.isPlaying;
    const bass = audio.bass || 0;
    const mid = audio.mid || 0;

    const ringIndices = [];

    for (let r = 0; r < rings; r++) {
      const ringRow = [];
      const theta = ((r + 1) / (rings + 1)) * Math.PI; // latitude from north to south
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      for (let p = 0; p < pointsPerRing; p++) {
        const phi = (p / pointsPerRing) * Math.PI * 2; // longitude around ring

        // Harmonic Wave Modulation based on specific resonance frequency soundscape:
        let cymaticDisp = 0;

        if (!isPlaying) {
          // Idle: Dormant geometric breathing crystal
          cymaticDisp = Math.sin(3 * phi + this.time * 1.5) * Math.sin(2 * theta) * 0.12;
        } else if (trackId === '01_sanctuary') {
          // 432Hz Sanctuary: Sacred 8-fold flower of life / merkaba harmonic
          const harm432 = Math.cos(4 * phi + this.time * 2.2) * Math.sin(3 * theta);
          cymaticDisp = harm432 * (0.32 + bass * 0.55);
        } else if (trackId === '02_solfeggio') {
          // 528Hz Solfeggio: Golden 5-fold blossoming transformation
          const harm528 = Math.sin(5 * phi - this.time * 2.5) * Math.sin(2 * theta);
          cymaticDisp = harm528 * (0.35 + bass * 0.45);
        } else if (trackId === '03_rain_lofi') {
          // Semarang Rain: Rippling concentric liquid droplet wave
          const rainRipple = Math.sin(theta * 7 - this.time * 4.5) * Math.cos(phi * 2);
          cymaticDisp = rainRipple * (0.30 + bass * 0.40);
        } else if (trackId === '04_cyber_pulse') {
          // Cyber Pulse: Sharp geometric facet spikes on beat
          const cyberSpike = Math.pow(Math.abs(Math.sin(6 * phi) * Math.cos(3 * theta)), 2.5);
          cymaticDisp = (cyberSpike * 0.55 + Math.sin(this.time * 10) * 0.08) * (1 + bass * 0.9);
        } else if (trackId === '05_binaural_theta') {
          // 6Hz Theta Flow: Dual 6-wave undulating meditative brainwave ribbons
          const thetaWave = Math.sin(phi * 6 - this.time * 6.0) * Math.sin(theta * 2);
          cymaticDisp = thetaWave * (0.38 + bass * 0.35);
        } else {
          // 06_custom or dynamic spectrum: Samples raw audio frequency bins
          const binIndex = Math.floor((p / pointsPerRing) * 24);
          const binEnergy = audio.freqBins ? (audio.freqBins[binIndex] / 255) : mid;
          cymaticDisp = (binEnergy * 0.65) * Math.sin(theta * 3);
        }

        const radius = Math.max(0.35, baseR + cymaticDisp);
        const x = radius * sinTheta * Math.cos(phi);
        const y = radius * cosTheta;
        const z = radius * sinTheta * Math.sin(phi);

        const vIdx = vertices.length;
        vertices.push([x, y, z]);
        ringRow.push(vIdx);

        // Radial resonating spokes connecting outer shell directly to core node
        if (p % 3 === 0) {
          edges.push([coreIdx, vIdx]);
        }
      }
      ringIndices.push(ringRow);
    }

    // North & South Pole Singularity Nodes
    const northPoleIdx = vertices.length;
    const northPulse = (baseR + (isPlaying ? bass * 0.4 : Math.sin(this.time * 2) * 0.1));
    vertices.push([0, northPulse, 0]);

    const southPoleIdx = vertices.length;
    const southPulse = -(baseR + (isPlaying ? bass * 0.4 : -Math.sin(this.time * 2) * 0.1));
    vertices.push([0, southPulse, 0]);

    // Connect Poles to top and bottom rings
    for (let p = 0; p < pointsPerRing; p++) {
      edges.push([northPoleIdx, ringIndices[0][p]]);
      edges.push([southPoleIdx, ringIndices[rings - 1][p]]);
    }

    // Connect Ring Latitudinal Loops and Longitudinal Ribs
    for (let r = 0; r < rings; r++) {
      const row = ringIndices[r];
      for (let p = 0; p < pointsPerRing; p++) {
        const nextP = (p + 1) % pointsPerRing;
        edges.push([row[p], row[nextP]]); // Latitudinal circle

        if (r < rings - 1) {
          const nextRow = ringIndices[r + 1];
          edges.push([row[p], nextRow[p]]); // Longitudinal rib
          // Cymatics diagonal harmonic lattice
          edges.push([row[p], nextRow[nextP]]);
        }
      }
    }

    return { vertices, edges };
  }

  createMantaRay() {
    // Biophilic Giant Oceanic Manta Ray Wireframe
    // Graceful natural undulating aquatic locomotion
    const vertices = [];
    const edges = [];

    const flapSpeed = 2.2;
    const flapAmp = 0.35;
    const flapPhase = this.time * flapSpeed;

    // Body stations along longitudinal axis Z: [z, halfSpan, bodyThickness]
    const stations = [
      { z: -1.40, span: 0.32, thick: 0.08 }, // Cephalic horn roots & snout
      { z: -1.05, span: 0.70, thick: 0.16 }, // Head & gills
      { z: -0.60, span: 1.40, thick: 0.20 }, // Anterior wings
      { z: -0.10, span: 2.10, thick: 0.18 }, // Maximum wingtip span
      { z:  0.45, span: 1.45, thick: 0.13 }, // Posterior trailing edge
      { z:  0.95, span: 0.60, thick: 0.08 }, // Pelvic fins
      { z:  1.35, span: 0.14, thick: 0.04 }  // Tail base
    ];

    const lateralSteps = 3; // 7 points across each station (center + 3 left + 3 right)
    const rowIndices = [];

    stations.forEach((st) => {
      const row = [];
      const spinePitch = Math.sin(flapPhase - st.z * 1.2) * 0.07;

      for (let c = -lateralSteps; c <= lateralSteps; c++) {
        const u = c / lateralSteps; // -1 to +1
        const x = u * st.span;
        const distFromCenter = Math.abs(u);

        // Flapping wave equation: outward traveling wave + z propagation
        const wingWave = Math.sin(flapPhase - Math.abs(x) * 1.8 + st.z * 1.1);
        const wingElevation = wingWave * flapAmp * Math.pow(distFromCenter, 1.4);

        const thickness = st.thick * Math.cos(distFromCenter * (Math.PI / 2));
        const y = spinePitch + wingElevation - thickness * 0.25;

        const vIdx = vertices.length;
        vertices.push([x, y, st.z]);
        row.push(vIdx);
      }
      rowIndices.push(row);
    });

    // Cephalic Horns (frontal sensory/feeding lobes)
    const hornWave = Math.sin(flapPhase * 1.4) * 0.08;
    const leftHornIdx = vertices.length;
    vertices.push([-0.36, hornWave - 0.04, -1.72]);
    const rightHornIdx = vertices.length;
    vertices.push([0.36, hornWave - 0.04, -1.72]);

    // Connect Cephalic Horns to front station
    edges.push([leftHornIdx, rowIndices[0][lateralSteps - 1]]);
    edges.push([leftHornIdx, rowIndices[0][lateralSteps]]);
    edges.push([rightHornIdx, rowIndices[0][lateralSteps + 1]]);
    edges.push([rightHornIdx, rowIndices[0][lateralSteps]]);

    // Sleek undulating whip-tail trailing behind
    const tailSegments = 4;
    const tailBaseIdx = rowIndices[rowIndices.length - 1][lateralSteps];
    let prevTailIdx = tailBaseIdx;

    for (let t = 1; t <= tailSegments; t++) {
      const tProgress = t / tailSegments;
      const tz = 1.35 + tProgress * 1.45;
      const tailSway = Math.sin(flapPhase - tz * 2.2) * (0.05 + tProgress * 0.25);
      const tailElevation = Math.sin(flapPhase - tz * 1.6) * 0.10;
      const tIdx = vertices.length;
      vertices.push([tailSway, tailElevation, tz]);
      edges.push([prevTailIdx, tIdx]);
      prevTailIdx = tIdx;
    }

    // Connect Stations (Ribs, Longitudinal Struts & Diagonal Tessellation)
    for (let s = 0; s < stations.length; s++) {
      const row = rowIndices[s];
      // Lateral wing rib lines
      for (let c = 0; c < row.length - 1; c++) {
        edges.push([row[c], row[c + 1]]);
      }
      // Longitudinal connections to next station
      if (s < stations.length - 1) {
        const nextRow = rowIndices[s + 1];
        for (let c = 0; c < row.length; c++) {
          edges.push([row[c], nextRow[c]]);
          if (c < row.length - 1) {
            edges.push([row[c], nextRow[c + 1]]);
          }
        }
      }
    }

    return { vertices, edges };
  }

  createDoubleHelix() {
    // Biophilic DNA Double Helix Spiral with hydrogen base rungs
    const vertices = [];
    const edges = [];

    const turns = 2.4;
    const numSteps = 24;
    const height = 2.5;
    const radius = 0.72;
    const rotationSpeed = 1.0;

    const strandA = [];
    const strandB = [];

    for (let i = 0; i < numSteps; i++) {
      const t = i / (numSteps - 1);
      const y = -height / 2 + t * height;
      const angle = t * Math.PI * 2 * turns + this.time * rotationSpeed;

      const xA = Math.cos(angle) * radius;
      const zA = Math.sin(angle) * radius;
      const idxA = vertices.length;
      vertices.push([xA, y, zA]);
      strandA.push(idxA);

      const xB = Math.cos(angle + Math.PI) * radius;
      const zB = Math.sin(angle + Math.PI) * radius;
      const idxB = vertices.length;
      vertices.push([xB, y, zB]);
      strandB.push(idxB);

      // Horizontal base-pair rungs
      edges.push([idxA, idxB]);
    }

    // Connecting backbone helical edges
    for (let i = 0; i < numSteps - 1; i++) {
      edges.push([strandA[i], strandA[i + 1]]);
      edges.push([strandB[i], strandB[i + 1]]);
      // Diagonal hydrogen bond lattice
      edges.push([strandA[i], strandB[i + 1]]);
    }

    return { vertices, edges };
  }

  createTorusKnot() {
    // Quantum Architectural Torus Knot (p=2, q=3)
    const vertices = [];
    const edges = [];

    const p = 2;
    const q = 3;
    const steps = 48;

    for (let i = 0; i < steps; i++) {
      const phi = (i / steps) * Math.PI * 2;
      const r = 0.78 + 0.34 * Math.cos(q * phi + this.time * 1.2);
      const x = r * Math.cos(p * phi);
      const y = 0.48 * Math.sin(q * phi + this.time * 1.2);
      const z = r * Math.sin(p * phi);
      vertices.push([x, y, z]);
    }

    for (let i = 0; i < steps; i++) {
      const next = (i + 1) % steps;
      edges.push([i, next]);
      if (i % 2 === 0) {
        edges.push([i, (i + Math.floor(steps / 3)) % steps]);
      }
    }

    return { vertices, edges };
  }

  createMonolith() {
    // Architectural cuboid (classic pure geometry)
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
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
      [8,9],[9,10],[10,11],[11,8],[12,13],[13,14],[14,15],[15,12],[8,12],[9,13],[10,14],[11,15],
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

    const waveHeight = 0.28;
    const waveSpeed = 2.0;

    for (let x = 0; x < size; x++) {
      for (let z = 0; z < size; z++) {
        const vx = x * step - offset;
        const vz = z * step - offset;
        const dist = Math.hypot(vx, vz);
        const vy = Math.sin(dist * 4 - this.time * waveSpeed) * waveHeight;
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

    // Audio Resonance Energy Coupling (Exclusively active on 'cymatics' mode)
    const isCymatics = this.currentMode === 'cymatics';
    const audio = (monolithAudio && typeof monolithAudio.getAudioEnergy === 'function')
      ? monolithAudio.getAudioEnergy()
      : { bass: 0, mid: 0, overall: 0, isPlaying: false, trackName: 'IDLE' };
    const isResonating = isCymatics && audio.isPlaying;

    // Inertia physics update with audio pulse (strictly only for cymatics)
    if (!this.isDragging) {
      if (this.autoRotate) {
        const speedBoost = isResonating ? 1.0 + audio.bass * 0.75 : 1.0;
        this.rot.y += 0.006 * speedBoost;
        this.rot.x += 0.0025 * speedBoost;
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

    // Fetch geometry (passing audio energy for real-time mesh deformation)
    const geom = this.getGeometry(this.currentMode, audio);
    const projected = geom.vertices.map(v => this.project(v));

    // Draw Edges (Wireframe) — line modulation strictly only for cymatics
    const baseLineWidth = 1.35 + (isResonating ? audio.bass * 1.1 : 0);
    this.ctx.lineWidth = baseLineWidth;

    geom.edges.forEach(([i1, i2]) => {
      const p1 = projected[i1];
      const p2 = projected[i2];
      if (!p1 || !p2) return;

      // Depth gradient fade (audio alpha boost only for cymatics)
      const avgZ = (p1.z + p2.z) / 2;
      const alphaBoost = isResonating ? audio.bass * 0.22 : 0;
      const alpha = Math.max(0.18, Math.min(1.0, 0.65 + avgZ * 0.35 + alphaBoost));

      this.ctx.strokeStyle = isDark
        ? `rgba(117, 146, 122, ${alpha})`
        : `rgba(74, 93, 78, ${alpha})`;

      this.ctx.beginPath();
      this.ctx.moveTo(p1.x, p1.y);
      this.ctx.lineTo(p2.x, p2.y);
      this.ctx.stroke();
    });

    // Draw Vertices (Audio vertex pulse and halo strictly only for cymatics)
    projected.forEach(p => {
      const audioPulse = isResonating ? (1 + audio.bass * 0.55) : 1;
      const pointRadius = Math.max(1.8, Math.min(4.5, (2.4 + p.z * 0.8) * audioPulse));
      this.ctx.fillStyle = vertexColor;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
      this.ctx.fill();

      // Resonance halo ring strictly on dedicated cymatics model during strong beats
      if (isResonating && audio.bass > 0.22) {
        this.ctx.strokeStyle = isDark
          ? `rgba(168, 209, 175, ${audio.bass * 0.4})`
          : `rgba(74, 93, 78, ${audio.bass * 0.35})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, pointRadius + audio.bass * 4, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    });

    // Update Telemetry DOM with audio status
    this.updateTelemetry(geom.vertices.length, audio, isCymatics);

    this.rafId = requestAnimationFrame(() => this.render());
  }

  updateTelemetry(vertexCount, audio, isCymatics) {
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
    if (this.resonanceEl) {
      if (isCymatics) {
        if (audio && audio.isPlaying) {
          this.resonanceEl.textContent = `SYNCED [${(audio.bass * 100).toFixed(0)}%]`;
          this.resonanceEl.style.color = 'var(--accent-primary)';
        } else {
          this.resonanceEl.textContent = 'STANDBY // READY';
          this.resonanceEl.style.color = '';
        }
      } else {
        this.resonanceEl.textContent = 'OFF // GEOMETRIC';
        this.resonanceEl.style.color = '';
      }
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


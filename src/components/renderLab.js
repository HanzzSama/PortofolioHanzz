/**
 * COMPONENT 06: KINETIC LAB / INTERACTIVE 3D MONOLITH SIMULATOR
 * Real-time Computational Wireframe Geometry & Gravity Physics
 * Biophilic Architectural Minimalism × Interactive Canvas
 */

export function renderLab(data) {
  const { kineticLab } = data;
  if (!kineticLab) return '';

  return `
    <section id="lab" class="architectural-section section-lab" data-reveal>
      <!-- Watermark Label -->
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${kineticLab.sectionIndex} // KINETIC LABORATORY</span>
        <span class="watermark-meta">${kineticLab.subtitle}</span>
      </div>

      <!-- Section Intro Header -->
      <div class="lab-intro" data-stagger>
        <div class="lab-preamble">
          <span class="lab-preamble-line"></span>
          <span>SYS.06 // EXPERIMENTAL COMPUTATION</span>
          <span>//</span>
          <span>KINETIC SYSTEMS</span>
        </div>
        <h2 class="font-display">${kineticLab.title}</h2>
        <p class="lab-lead-text">${kineticLab.description}</p>
      </div>

      <!-- Interactive 3D Canvas Stage Monolith -->
      <div class="lab-stage-container" data-stagger>
        <!-- Canvas Stage -->
        <div class="lab-canvas-viewport" id="lab-canvas-viewport">
          <canvas id="monolith-canvas" class="monolith-canvas" width="900" height="520"></canvas>
          
          <!-- Stage Architectural Overlays (Corner Crosshairs) -->
          <div class="stage-overlay-tl font-mono" aria-hidden="true">+ [TOPOLOGY.NODE]</div>
          <div class="stage-overlay-tr font-mono" aria-hidden="true">[FPS: 60/120] +</div>
          <div class="stage-overlay-bl font-mono" aria-hidden="true">+ [PROJECTION: PERSPECTIVE]</div>
          <div class="stage-overlay-br font-mono" aria-hidden="true">[DAMPING: 0.94] +</div>

          <!-- Central Hint Banner -->
          <div class="stage-interaction-hint font-mono" id="stage-hint">
            <span class="hint-pulse"></span>
            <span>DRAG TO ROTATE 3D WIREFRAME // SELECT FORM BELOW</span>
          </div>

          <!-- Live Real-Time Floating Telemetry HUD -->
          <div class="stage-telemetry-cluster font-mono">
            <div class="telemetry-pill">
              <span class="pill-dim">RX:</span> <span id="telemetry-rx">+0.00</span>
              <span class="pill-dim">RY:</span> <span id="telemetry-ry">+0.00</span>
            </div>
            <div class="telemetry-pill">
              <span class="pill-dim">VERTICES:</span> <span id="telemetry-vertices">8</span>
            </div>
            <div class="telemetry-pill">
              <span class="pill-dim">PHYSICS:</span> <span id="telemetry-physics">INERTIA DAMPED</span>
            </div>
          </div>
        </div>

        <!-- Interactive Control Console -->
        <div class="lab-control-console font-mono">
          <div class="console-modes-group">
            <span class="console-label">TOPOLOGY:</span>
            <div class="console-mode-buttons" id="lab-mode-buttons">
              ${kineticLab.modes
                .map(
                  (mode, idx) => `
                <button 
                  class="console-btn ${idx === 0 ? 'active' : ''}" 
                  data-mode="${mode.id}"
                  data-vertices="${mode.vertices}"
                  data-edges="${mode.edges}"
                  data-cursor-target
                >
                  <span class="btn-indicator"></span>
                  <span>${mode.label}</span>
                </button>
              `
                )
                .join('')}
            </div>
          </div>

          <div class="console-actions-group">
            <button id="lab-zoom-in" class="console-action-btn" title="Zoom In" data-cursor-target>
              <span>+ ZOOM</span>
            </button>
            <button id="lab-zoom-out" class="console-action-btn" title="Zoom Out" data-cursor-target>
              <span>- ZOOM</span>
            </button>
            <button id="lab-toggle-autorotate" class="console-action-btn active" data-cursor-target>
              <span id="autorotate-icon">■</span>
              <span id="autorotate-text">AUTO-ORBIT: ON</span>
            </button>
            <button id="lab-reset-view" class="console-action-btn" data-cursor-target>
              <span>RESET</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}


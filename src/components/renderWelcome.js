/**
 * COMPONENT 01: WELCOME SECTION
 * Biophilic Architectural Minimalism × Material Expressive
 */

export function renderWelcome(data) {
  const { welcome, meta } = data;

  return `
    <section id="welcome" class="architectural-section section-welcome" data-reveal>
      <!-- Parallax Topographic Organic Silhouette (Layer 1: Low Speed) -->
      <div class="welcome-topo-plane" data-parallax-speed="-0.15" data-mouse-parallax data-mouse-depth="15">
        <canvas id="kinetic-topo-canvas" width="580" height="580" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></canvas>
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: relative; z-index: 2;">
          <ellipse cx="250" cy="250" rx="220" ry="200" stroke="currentColor" stroke-width="0.75" stroke-dasharray="4 4" opacity="0.4"/>
          <path d="M 50,250 C 70,140 180,60 270,70 C 370,80 430,160 410,270 C 390,370 320,440 210,430 C 120,420 30,340 50,250 Z" stroke="currentColor" stroke-width="1.2" opacity="0.6"/>
          <path d="M 90,250 C 110,170 190,110 260,120 C 340,130 380,190 370,270 C 350,340 290,390 210,380 C 140,370 70,310 90,250 Z" stroke="currentColor" stroke-width="0.85" opacity="0.8"/>
          <path d="M 140,250 C 155,195 210,160 260,165 C 310,170 340,210 330,265 C 320,310 275,345 220,340 C 170,335 125,290 140,250 Z" stroke="currentColor" stroke-width="1" opacity="1"/>
          <!-- Architectural Crosshairs & Coordinates -->
          <circle cx="250" cy="250" r="3" fill="currentColor"/>
          <line x1="230" y1="250" x2="270" y2="250" stroke="currentColor" stroke-width="0.75"/>
          <line x1="250" y1="230" x2="250" y2="270" stroke="currentColor" stroke-width="0.75"/>
          <text x="260" y="244" font-family="'JetBrains Mono', monospace" font-size="9" fill="currentColor" opacity="0.85">NODE.SRG [6.9667°S]</text>
        </svg>
      </div>

      <div class="welcome-preamble-bar" data-stagger>
        <span class="preamble-line"></span>
        <span>${welcome.systemTag}</span>
        <span>//</span>
        <span>${welcome.architecturalPreamble}</span>
      </div>

      <h1 class="welcome-headline font-display" data-velocity-skew>
        <span class="line-break" data-parallax-slide="left" data-parallax-speed="0.055">${welcome.headlineLine1}</span>
        <span class="line-break"><span class="editorial-word" data-parallax-slide="up" data-parallax-speed="0.035">${welcome.headlineLine2}</span></span>
        <span class="line-break" data-parallax-slide="right" data-parallax-speed="0.055">${welcome.headlineLine3}</span>
      </h1>

      <div class="welcome-grid-content">
        <div class="welcome-narrative-wrap" data-stagger>
          <p class="welcome-lead-text">
            ${welcome.leadParagraph}
          </p>
        </div>

        <div class="welcome-telemetry-cluster" data-stagger>
          ${welcome.telemetry
            .map(
              (item) => `
            <div class="telemetry-cell">
              <div class="telemetry-cell-label">${item.label}</div>
              <div class="telemetry-cell-value">${item.value}</div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

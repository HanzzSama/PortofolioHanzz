/**
 * COMPONENT 04: SELECTED WORKS / ARCHITECTURAL PROJECTS
 * Gallery-Standard Multi-Layer Cards & Vector Blueprint Canvases
 * Abstract, Minimalist & Expressive Project Previews with Auto-Detection & Fallback
 */

import { getProjectImageCandidates } from '../utils/imageDetector.js';

export function renderProjects(data) {
  const { projects } = data;

  const renderBlueprintSvg = (type, proj = {}) => {
    const label = proj.title ? `${proj.title.toUpperCase()} // ${proj.year || '2026'}` : 'PROYEK // HANZZ';
    const gridId = `arch-grid-${proj.id || 'def'}`;

    const gridBackground = `
      <defs>
        <pattern id="${gridId}" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.35" stroke-opacity="0.18"/>
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#${gridId})" />
    `;

    switch (type) {
      case 'neural':
      case 'ai':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            ${gridBackground}
            <!-- Axis lines -->
            <line x1="20" y1="185" x2="380" y2="185" stroke-width="0.5" stroke-opacity="0.25" stroke-dasharray="4 4"/>
            <line x1="200" y1="20" x2="200" y2="340" stroke-width="0.5" stroke-opacity="0.25" stroke-dasharray="4 4"/>

            <!-- Interconnects with clean hierarchy -->
            <!-- Input to Hidden -->
            <line x1="90" y1="110" x2="200" y2="75" stroke-width="0.8" stroke-opacity="0.35"/>
            <line x1="90" y1="110" x2="200" y2="145" stroke-width="1.2" stroke-opacity="0.6"/>
            <line x1="90" y1="110" x2="200" y2="215" stroke-width="0.8" stroke-opacity="0.35"/>
            <line x1="90" y1="185" x2="200" y2="75" stroke-width="0.8" stroke-opacity="0.35"/>
            <line x1="90" y1="185" x2="200" y2="145" stroke-width="1.5" stroke-opacity="0.8"/>
            <line x1="90" y1="185" x2="200" y2="215" stroke-width="1.2" stroke-opacity="0.6"/>
            <line x1="90" y1="185" x2="200" y2="285" stroke-width="0.8" stroke-opacity="0.35"/>
            <line x1="90" y1="260" x2="200" y2="145" stroke-width="0.8" stroke-opacity="0.35"/>
            <line x1="90" y1="260" x2="200" y2="215" stroke-width="1.5" stroke-opacity="0.8"/>
            <line x1="90" y1="260" x2="200" y2="285" stroke-width="1.2" stroke-opacity="0.6"/>

            <!-- Hidden to Output -->
            <line x1="200" y1="75" x2="310" y2="145" stroke-width="1" stroke-opacity="0.5"/>
            <line x1="200" y1="145" x2="310" y2="145" stroke-width="1.8" stroke-opacity="0.9"/>
            <line x1="200" y1="215" x2="310" y2="145" stroke-width="0.8" stroke-opacity="0.4"/>
            <line x1="200" y1="145" x2="310" y2="245" stroke-width="0.8" stroke-opacity="0.4"/>
            <line x1="200" y1="215" x2="310" y2="245" stroke-width="1.8" stroke-opacity="0.9"/>
            <line x1="200" y1="285" x2="310" y2="245" stroke-width="1" stroke-opacity="0.5"/>

            <!-- Enclosing decision envelope -->
            <polygon points="200,45 340,185 200,315 60,185" stroke-width="0.75" stroke-opacity="0.3" stroke-dasharray="3 3"/>

            <!-- Nodes with solid fill so lines terminate cleanly at circumference -->
            <!-- Input layer -->
            <circle cx="90" cy="110" r="10" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="90" cy="110" r="4" fill="currentColor"/>
            <circle cx="90" cy="185" r="12" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="90" cy="185" r="5" fill="currentColor"/>
            <circle cx="90" cy="260" r="10" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="90" cy="260" r="4" fill="currentColor"/>

            <!-- Hidden layer -->
            <circle cx="200" cy="75" r="9" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="200" cy="145" r="14" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="200" cy="145" r="6" fill="currentColor"/>
            <circle cx="200" cy="215" r="14" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="200" cy="215" r="6" fill="currentColor"/>
            <circle cx="200" cy="285" r="9" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>

            <!-- Output layer -->
            <circle cx="310" cy="145" r="16" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="310" cy="145" r="7" fill="currentColor"/>
            <circle cx="310" cy="245" r="16" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="310" cy="245" r="7" fill="currentColor"/>

            <!-- Centered, uncollided label -->
            <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor">${label}</text>
          </svg>
        `;

      case 'roadmap':
      case 'code':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            ${gridBackground}
            <!-- Outer compass circle -->
            <circle cx="200" cy="185" r="130" stroke-width="0.75" stroke-opacity="0.3" stroke-dasharray="4 4"/>
            <circle cx="200" cy="185" r="80" stroke-width="0.5" stroke-opacity="0.2"/>

            <!-- Precision Isometric Step Monolith -->
            <!-- Base Foundation Layer (01 ZERO) -->
            <polygon points="120,225 200,180 280,225 200,270" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <polygon points="120,225 200,270 200,290 120,245" fill="var(--bg-surface-sunken)" stroke-width="1.2" stroke-opacity="0.7"/>
            <polygon points="200,270 280,225 280,245 200,290" fill="var(--bg-surface-sunken)" stroke-width="1.2" stroke-opacity="0.5"/>

            <!-- Mid Architecture Layer (02 CORE) -->
            <polygon points="145,175 200,145 255,175 200,205" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <polygon points="145,175 200,205 200,220 145,190" fill="var(--bg-surface-sunken)" stroke-width="1.2" stroke-opacity="0.7"/>
            <polygon points="200,205 255,175 255,190 200,220" fill="var(--bg-surface-sunken)" stroke-width="1.2" stroke-opacity="0.5"/>

            <!-- Top Apex Layer (03 PRO) -->
            <polygon points="170,125 200,107 230,125 200,143" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <polygon points="170,125 200,143 200,155 170,137" fill="var(--bg-surface-sunken)" stroke-width="1.2" stroke-opacity="0.7"/>
            <polygon points="200,143 230,125 230,137 200,155" fill="var(--bg-surface-sunken)" stroke-width="1.2" stroke-opacity="0.5"/>

            <!-- Central vertical spine line -->
            <line x1="200" y1="70" x2="200" y2="300" stroke-width="1" stroke-dasharray="3 3"/>
            <circle cx="200" cy="70" r="4" fill="currentColor"/>

            <!-- Dimension / Extension Annotations -->
            <line x1="60" y1="235" x2="110" y2="235" stroke-width="0.75"/>
            <text x="55" y="238" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="currentColor">01.ZERO</text>

            <line x1="340" y1="175" x2="265" y2="175" stroke-width="0.75"/>
            <text x="345" y="178" text-anchor="start" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="currentColor">02.CORE</text>

            <line x1="60" y1="125" x2="160" y2="125" stroke-width="0.75"/>
            <text x="55" y="128" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="currentColor">03.PRO</text>

            <!-- Centered, uncollided label -->
            <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor">${label}</text>
          </svg>
        `;

      case 'topographic':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            ${gridBackground}
            <!-- Precision Concentric Topographic Isobars -->
            <circle cx="200" cy="180" r="145" stroke-width="0.5" stroke-opacity="0.2" stroke-dasharray="3 4"/>
            <path d="M 50,180 C 50,100 120,50 200,50 C 280,50 350,100 350,180 C 350,260 280,310 200,310 C 120,310 50,260 50,180 Z" stroke-width="1"/>
            <path d="M 80,180 C 80,120 135,80 200,80 C 265,80 320,120 320,180 C 320,240 265,280 200,280 C 135,280 80,240 80,180 Z" stroke-width="1.2" stroke-opacity="0.8"/>
            <path d="M 115,180 C 115,135 150,110 200,110 C 250,110 285,135 285,180 C 285,225 250,250 200,250 C 150,250 115,225 115,180 Z" stroke-width="1.5"/>
            <path d="M 150,180 C 150,150 170,135 200,135 C 230,135 250,150 250,180 C 250,210 230,225 200,225 C 170,225 150,210 150,180 Z" stroke-width="1.2" stroke-opacity="0.85"/>
            <circle cx="200" cy="180" r="18" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="200" cy="180" r="4" fill="currentColor"/>

            <!-- Precision Crosshairs & Cardinal Ticks -->
            <line x1="160" y1="180" x2="240" y2="180" stroke-width="0.75"/>
            <line x1="200" y1="140" x2="200" y2="220" stroke-width="0.75"/>
            <line x1="20" y1="180" x2="40" y2="180" stroke-width="1"/>
            <line x1="360" y1="180" x2="380" y2="180" stroke-width="1"/>
            <line x1="200" y1="20" x2="200" y2="40" stroke-width="1"/>

            <!-- Elevation annotations -->
            <text x="208" y="125" font-family="'JetBrains Mono', monospace" font-size="6.5" fill="currentColor" opacity="0.7">+120m</text>
            <text x="208" y="95" font-family="'JetBrains Mono', monospace" font-size="6.5" fill="currentColor" opacity="0.7">+80m</text>

            <!-- Centered, uncollided label -->
            <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor">${label}</text>
          </svg>
        `;

      case 'matrix':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            ${gridBackground}
            <!-- Precision Symmetrical Cartesian Matrix Grid -->
            <rect x="70" y="55" width="260" height="260" fill="none" stroke-width="0.75" stroke-opacity="0.3" stroke-dasharray="3 3"/>
            <circle cx="200" cy="185" r="115" stroke-width="0.5" stroke-opacity="0.25"/>

            <!-- Interconnect Lines (Exact Center-to-Center) -->
            <line x1="110" y1="105" x2="200" y2="85" stroke-width="1"/>
            <line x1="200" y1="85" x2="290" y2="105" stroke-width="1"/>
            <line x1="110" y1="105" x2="130" y2="205" stroke-width="1.2"/>
            <line x1="200" y1="85" x2="200" y2="185" stroke-width="1.5"/>
            <line x1="290" y1="105" x2="270" y2="205" stroke-width="1.2"/>
            <line x1="130" y1="205" x2="200" y2="185" stroke-width="1.2"/>
            <line x1="270" y1="205" x2="200" y2="185" stroke-width="1.2"/>
            <line x1="130" y1="205" x2="160" y2="275" stroke-width="1"/>
            <line x1="200" y1="185" x2="200" y2="275" stroke-width="1"/>
            <line x1="270" y1="205" x2="240" y2="275" stroke-width="1"/>
            <line x1="160" y1="275" x2="240" y2="275" stroke-width="1.2"/>

            <!-- Nodes with solid fill so lines terminate cleanly at circumference -->
            <circle cx="110" cy="105" r="10" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="110" cy="105" r="3.5" fill="currentColor"/>

            <circle cx="200" cy="85" r="12" fill="var(--bg-surface-sunken)" stroke-width="1.75"/>
            <circle cx="200" cy="85" r="4.5" fill="currentColor"/>

            <circle cx="290" cy="105" r="10" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="290" cy="105" r="3.5" fill="currentColor"/>

            <circle cx="130" cy="205" r="12" fill="var(--bg-surface-sunken)" stroke-width="1.75"/>
            <circle cx="130" cy="205" r="4" fill="currentColor"/>

            <!-- Central Hub Node -->
            <circle cx="200" cy="185" r="18" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="200" cy="185" r="7" fill="currentColor"/>
            <circle cx="200" cy="185" r="24" stroke-width="0.5" stroke-dasharray="2 3"/>

            <circle cx="270" cy="205" r="12" fill="var(--bg-surface-sunken)" stroke-width="1.75"/>
            <circle cx="270" cy="205" r="4" fill="currentColor"/>

            <circle cx="160" cy="275" r="11" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="160" cy="275" r="3.5" fill="currentColor"/>

            <circle cx="240" cy="275" r="11" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="240" cy="275" r="3.5" fill="currentColor"/>

            <!-- Centered, uncollided label -->
            <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor">${label}</text>
          </svg>
        `;

      case 'contour':
      case 'orbit':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            ${gridBackground}
            <!-- Precision Celestial Orbit System -->
            <!-- Axis lines -->
            <line x1="30" y1="185" x2="370" y2="185" stroke-width="0.5" stroke-opacity="0.25" stroke-dasharray="4 4"/>
            <line x1="200" y1="20" x2="200" y2="340" stroke-width="0.5" stroke-opacity="0.25" stroke-dasharray="4 4"/>

            <!-- Outer Azimuth Ring with 4 Cardinal Markers -->
            <circle cx="200" cy="185" r="140" stroke-width="0.75" stroke-opacity="0.3"/>
            <circle cx="200" cy="45" r="3" fill="currentColor"/>
            <circle cx="340" cy="185" r="3" fill="currentColor"/>
            <circle cx="200" cy="325" r="3" fill="currentColor"/>
            <circle cx="60" cy="185" r="3" fill="currentColor"/>

            <!-- Keplerian Ellipses (Cleanly Oriented) -->
            <ellipse cx="200" cy="185" rx="140" ry="85" stroke-width="1" stroke-opacity="0.75" transform="rotate(-15 200 185)"/>
            <ellipse cx="200" cy="185" rx="105" ry="60" stroke-width="1.25" transform="rotate(25 200 185)"/>
            <ellipse cx="200" cy="185" rx="70" ry="40" stroke-width="1" stroke-opacity="0.6"/>

            <!-- Satellite Nodes on Ellipses -->
            <circle cx="310" cy="155" r="7" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="310" cy="155" r="3" fill="currentColor"/>

            <circle cx="110" cy="145" r="6" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="110" cy="145" r="2.5" fill="currentColor"/>

            <circle cx="260" cy="210" r="5" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
            <circle cx="260" cy="210" r="2" fill="currentColor"/>

            <!-- Core Star / Nexus -->
            <circle cx="200" cy="185" r="18" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="200" cy="185" r="7" fill="currentColor"/>
            <circle cx="200" cy="185" r="26" stroke-width="0.5" stroke-dasharray="2 3"/>

            <!-- Centered, uncollided label -->
            <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor">${label}</text>
          </svg>
        `;

      default:
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            ${gridBackground}
            <!-- Sacred Geometry / Vitruvian Architectural Modulor -->
            <!-- Concentric Harmonic Circles -->
            <circle cx="200" cy="180" r="135" stroke-width="0.75" stroke-opacity="0.35"/>
            <circle cx="200" cy="180" r="95" stroke-width="1"/>
            <circle cx="200" cy="180" r="55" stroke-width="0.75" stroke-opacity="0.5"/>

            <!-- Mathematically Inscribed Square (Standard & 45° Rotated) -->
            <rect x="133" y="113" width="134" height="134" fill="var(--bg-surface-sunken)" fill-opacity="0.3" stroke-width="1.2"/>
            <rect x="133" y="113" width="134" height="134" stroke-width="0.75" stroke-opacity="0.5" stroke-dasharray="4 4" transform="rotate(45 200 180)"/>

            <!-- Precision Inscribed Equilateral Triangle (All 3 vertices touch outer circle r=135 at (200, 180)) -->
            <polygon points="200,45 317,247.5 83,247.5" stroke-width="1.5"/>

            <!-- Cardinal Axis Lines & Registration Crosshairs -->
            <line x1="30" y1="180" x2="370" y2="180" stroke-width="0.5" stroke-opacity="0.3"/>
            <line x1="200" y1="15" x2="200" y2="345" stroke-width="0.5" stroke-opacity="0.3"/>

            <circle cx="200" cy="45" r="4" fill="currentColor"/>
            <circle cx="317" cy="247.5" r="4" fill="currentColor"/>
            <circle cx="83" cy="247.5" r="4" fill="currentColor"/>

            <!-- Central Core Eye -->
            <circle cx="200" cy="180" r="14" fill="var(--bg-surface-sunken)" stroke-width="2"/>
            <circle cx="200" cy="180" r="5" fill="currentColor"/>

            <!-- Centered, uncollided label -->
            <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor">${label}</text>
          </svg>
        `;
    }
  };

  return `
    <section id="projects" class="architectural-section section-projects">
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${projects.sectionIndex} // ${projects.sectionTitle}</span>
        <span class="watermark-meta">${projects.sectionSub}</span>
      </div>

      <div class="projects-intro">
        <h2 class="font-display">${projects.headline || 'Curated Engineering Systems'}</h2>
        <p>${projects.description}</p>
      </div>

      <div class="projects-list">
        ${projects.items
          .map((proj) => {
            const candidates = getProjectImageCandidates(proj);
            const firstCandidate = candidates[0] || '';

            return `
          <article class="project-architectural-card" data-scroll-scale data-scale-from="0.94" data-scale-to="1.0">
            <div class="project-details-panel">
              <div>
                <div class="project-card-meta">
                  <span class="project-code-tag">${proj.code}</span>
                  <span>${proj.category}</span>
                  <span>${proj.year}</span>
                </div>

                <h3 class="project-title">${proj.title}</h3>
                <div class="project-subtitle">${proj.subtitle}</div>

                <p class="project-narrative">
                  ${proj.description}
                </p>

                <ul class="project-deliverables">
                  ${proj.deliverables
                    .map(
                      (item) => `
                    <li class="deliverable-item">
                      <span class="deliverable-bullet"></span>
                      <span>${item}</span>
                    </li>
                  `
                    )
                    .join('')}
                </ul>

                <div class="project-tags-wrap">
                  ${proj.techStack
                    .map((tech) => `<span class="project-tech-chip">${tech}</span>`)
                    .join('')}
                </div>
              </div>

              <div class="project-card-actions">
                <button class="project-btn-primary" data-inspect-project="${proj.id}" data-cursor-target>
                  <span>${projects.ui?.inspect || 'Deep-Dive Topology'}</span>
                  <span>↗</span>
                </button>
                <a href="${proj.links.code}" target="_blank" rel="noopener noreferrer" class="project-btn-secondary" data-cursor-target>
                  <span>${projects.ui?.github || 'GitHub Node'}</span>
                </a>
              </div>
            </div>

            <!-- Abstract, Minimalist & Expressive Project Preview Panel -->
            <div class="project-blueprint-panel" data-inspect-project="${proj.id}" data-cursor-target title="${projects.ui?.inspectTooltip || 'Klik untuk inspeksi detail arsitektur'}">
              <!-- 4 Drafting Registration Crosshairs -->
              <span class="drafting-crosshair ch-tl" aria-hidden="true">+</span>
              <span class="drafting-crosshair ch-tr" aria-hidden="true">+</span>
              <span class="drafting-crosshair ch-bl" aria-hidden="true">+</span>
              <span class="drafting-crosshair ch-br" aria-hidden="true">+</span>

              <div class="blueprint-meta-header">
                <div class="blueprint-meta-left font-mono">
                  <span class="blueprint-radar-dot"></span>
                  <span>${proj.code} // ${proj.category}</span>
                </div>
                <div class="blueprint-meta-right font-mono">
                  <span>${proj.year} // ${proj.techStack?.[0] || 'DEV'}</span>
                </div>
              </div>

              <!-- Refined Architectural Preview Chassis (Passe-Partout Matting) -->
              <div class="project-preview-viewport">
                <!-- Optical Reticle Brackets (Cleanly Positioned on the Chassis Mat) -->
                <span class="reticle-bracket rb-tl" aria-hidden="true"></span>
                <span class="reticle-bracket rb-tr" aria-hidden="true"></span>
                <span class="reticle-bracket rb-bl" aria-hidden="true"></span>
                <span class="reticle-bracket rb-br" aria-hidden="true"></span>

                <!-- Inner Media Canvas: Clean Frame & Shadow -->
                <div class="preview-media-inner">
                  <!-- Image Candidate with Auto-Detect & Cascade Fallback -->
                  <img 
                    src="${firstCandidate}" 
                    alt="${proj.title} Preview" 
                    class="project-preview-img"
                    loading="lazy"
                    data-candidates='${JSON.stringify(candidates)}'
                    data-candidate-idx="0"
                    onload="window.__handleProjectImgLoad && window.__handleProjectImgLoad(this)"
                    onerror="window.__handleProjectImgError && window.__handleProjectImgError(this)"
                  />

                  <!-- Abstract Non-Image Thumbnail (Vector Blueprint Matrix) -->
                  <div class="non-image-blueprint-chassis" style="color: ${proj.accent};" data-parallax-relative data-parallax-speed="0.12">
                    ${renderBlueprintSvg(proj.blueprintSvg, proj)}
                    <div class="blueprint-ambient-grid" aria-hidden="true"></div>
                  </div>

                  <!-- Hover Shimmer Sweep -->
                  <div class="abstract-shimmer-sweep" aria-hidden="true"></div>
                </div>

                <!-- Floating Interactive Hover Capsule (Clean & Non-Colliding) -->
                <div class="preview-hover-tag font-mono" aria-hidden="true">
                  <span class="hover-tag-dot"></span>
                  <span>DEEP INSPECT ↗</span>
                </div>
              </div>

              <div class="blueprint-telemetry-badge font-mono">
                ${Object.entries(proj.metrics)
                  .map(([key, val]) => `<span><strong>${key.toUpperCase()}:</strong> ${val}</span>`)
                  .join('<span style="opacity: 0.4;">|</span>')}
              </div>
            </div>
          </article>
        `;
          })
          .join('')}
      </div>
    </section>
  `;
}

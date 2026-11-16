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
    switch (type) {
      case 'neural':
      case 'ai':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <circle cx="80" cy="120" r="7" stroke-width="1.5"/>
            <circle cx="80" cy="200" r="7" stroke-width="1.5"/>
            <circle cx="80" cy="280" r="7" stroke-width="1.5"/>
            <circle cx="200" cy="90" r="9" stroke-width="1.5"/>
            <circle cx="200" cy="170" r="11" stroke-width="2"/>
            <circle cx="200" cy="250" r="9" stroke-width="1.5"/>
            <circle cx="200" cy="320" r="7" stroke-width="1.2"/>
            <circle cx="320" cy="150" r="13" stroke-width="2"/>
            <circle cx="320" cy="250" r="13" stroke-width="2"/>
            <line x1="87" y1="120" x2="191" y2="90" stroke-width="0.75" stroke-dasharray="2 3"/>
            <line x1="87" y1="120" x2="189" y2="170" stroke-width="0.75"/>
            <line x1="87" y1="200" x2="189" y2="170" stroke-width="1"/>
            <line x1="87" y1="200" x2="191" y2="250" stroke-width="0.75"/>
            <line x1="87" y1="280" x2="191" y2="250" stroke-width="0.75"/>
            <line x1="87" y1="280" x2="193" y2="320" stroke-width="0.75" stroke-dasharray="2 3"/>
            <line x1="209" y1="90" x2="307" y2="150" stroke-width="0.75"/>
            <line x1="211" y1="170" x2="307" y2="150" stroke-width="1.2"/>
            <line x1="211" y1="170" x2="307" y2="250" stroke-width="1.2"/>
            <line x1="209" y1="250" x2="307" y2="250" stroke-width="0.75"/>
            <line x1="207" y1="320" x2="307" y2="250" stroke-width="0.75" stroke-dasharray="2 3"/>
            <circle cx="320" cy="150" r="4" fill="currentColor"/>
            <circle cx="320" cy="250" r="4" fill="currentColor"/>
            <text x="120" y="380" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">NEURAL DIAGNOSTIC // XGBOOST</text>
            <text x="140" y="65" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">${label}</text>
          </svg>
        `;
      case 'roadmap':
      case 'code':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <line x1="60" y1="320" x2="340" y2="80" stroke-width="1.5" stroke-dasharray="3 3"/>
            <rect x="70" y="270" width="70" height="40" stroke-width="1.2"/>
            <text x="80" y="295" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">01. ZERO</text>
            <rect x="165" y="190" width="70" height="40" stroke-width="1.2"/>
            <text x="175" y="215" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">02. CORE</text>
            <rect x="260" y="110" width="70" height="40" stroke-width="1.5"/>
            <text x="275" y="135" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">03. PRO</text>
            <circle cx="105" cy="270" r="3" fill="currentColor"/>
            <circle cx="200" cy="190" r="3" fill="currentColor"/>
            <circle cx="295" cy="110" r="4" fill="currentColor"/>
            <line x1="140" y1="290" x2="165" y2="210" stroke-width="0.75"/>
            <line x1="235" y1="210" x2="260" y2="130" stroke-width="0.75"/>
            <text x="70" y="360" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">${label}</text>
          </svg>
        `;
      case 'topographic':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <path d="M 40,200 Q 120,80 200,200 T 360,200" stroke-width="0.75" stroke-dasharray="3 3"/>
            <path d="M 60,200 C 90,130 150,90 200,100 C 270,110 320,160 340,200 C 320,250 260,310 200,300 C 130,290 80,250 60,200 Z" stroke-width="1.2"/>
            <path d="M 100,200 C 120,150 160,130 200,135 C 240,140 280,170 290,200 C 280,230 240,270 200,265 C 160,260 120,230 100,200 Z" stroke-width="1"/>
            <circle cx="200" cy="200" r="4" fill="currentColor"/>
            <line x1="180" y1="200" x2="220" y2="200" stroke-width="0.75"/>
            <line x1="200" y1="180" x2="200" y2="220" stroke-width="0.75"/>
            <text x="210" y="195" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">${label}</text>
          </svg>
        `;
      case 'matrix':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <rect x="50" y="50" width="300" height="300" stroke-width="0.75" stroke-dasharray="2 4"/>
            <circle cx="100" cy="120" r="8" stroke-width="1.5"/>
            <circle cx="200" cy="80" r="12" stroke-width="1.5"/>
            <circle cx="300" cy="150" r="10" stroke-width="1.5"/>
            <circle cx="150" cy="250" r="14" stroke-width="2"/>
            <circle cx="260" cy="270" r="9" stroke-width="1.5"/>
            <line x1="100" y1="120" x2="200" y2="80" stroke-width="0.75"/>
            <line x1="200" y1="80" x2="300" y2="150" stroke-width="0.75"/>
            <line x1="100" y1="120" x2="150" y2="250" stroke-width="0.75"/>
            <line x1="150" y1="250" x2="260" y2="270" stroke-width="0.75"/>
            <line x1="300" y1="150" x2="260" y2="270" stroke-width="0.75"/>
            <text x="160" y="245" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">${label}</text>
          </svg>
        `;
      case 'contour':
      case 'orbit':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <ellipse cx="200" cy="200" rx="160" ry="120" stroke-width="0.75"/>
            <ellipse cx="200" cy="200" rx="120" ry="85" stroke-width="1"/>
            <ellipse cx="200" cy="200" rx="80" ry="50" stroke-width="1.25"/>
            <circle cx="200" cy="200" r="3" fill="currentColor"/>
            <line x1="40" y1="200" x2="360" y2="200" stroke-width="0.5" stroke-dasharray="4 4"/>
            <text x="210" y="195" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">${label}</text>
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <circle cx="200" cy="200" r="140" stroke-width="0.75"/>
            <polygon points="200,80 310,270 90,270" stroke-width="1"/>
            <rect x="150" y="150" width="100" height="100" stroke-width="1.2"/>
            <line x1="100" y1="100" x2="300" y2="300" stroke-width="0.5" stroke-dasharray="2 2"/>
            <text x="210" y="195" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">${label}</text>
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

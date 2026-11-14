/**
 * COMPONENT 04: SELECTED WORKS / ARCHITECTURAL PROJECTS
 * Gallery-Standard Multi-Layer Cards & Vector Blueprint Canvases
 */

export function renderProjects(data) {
  const { projects } = data;

  const renderBlueprintSvg = (type) => {
    switch (type) {
      case 'topographic':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <path d="M 40,200 Q 120,80 200,200 T 360,200" stroke-width="0.75" stroke-dasharray="3 3"/>
            <path d="M 60,200 C 90,130 150,90 200,100 C 270,110 320,160 340,200 C 320,250 260,310 200,300 C 130,290 80,250 60,200 Z" stroke-width="1.2"/>
            <path d="M 100,200 C 120,150 160,130 200,135 C 240,140 280,170 290,200 C 280,230 240,270 200,265 C 160,260 120,230 100,200 Z" stroke-width="1"/>
            <circle cx="200" cy="200" r="4" fill="currentColor"/>
            <line x1="180" y1="200" x2="220" y2="200" stroke-width="0.75"/>
            <line x1="200" y1="180" x2="200" y2="220" stroke-width="0.75"/>
            <text x="210" y="195" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">60 FPS // BIO.GRID</text>
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
            <text x="160" y="245" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">ITESA.NODE // 1.2M REC</text>
          </svg>
        `;
      case 'contour':
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <ellipse cx="200" cy="200" rx="160" ry="120" stroke-width="0.75"/>
            <ellipse cx="200" cy="200" rx="120" ry="85" stroke-width="1"/>
            <ellipse cx="200" cy="200" rx="80" ry="50" stroke-width="1.25"/>
            <circle cx="200" cy="200" r="3" fill="currentColor"/>
            <line x1="40" y1="200" x2="360" y2="200" stroke-width="0.5" stroke-dasharray="4 4"/>
            <text x="210" y="195" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">SOIL.MOIST // 28ms</text>
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
            <circle cx="200" cy="200" rx="140" stroke-width="0.75"/>
            <polygon points="200,80 310,270 90,270" stroke-width="1"/>
            <rect x="150" y="150" width="100" height="100" stroke-width="1.2"/>
            <line x1="100" y1="100" x2="300" y2="300" stroke-width="0.5" stroke-dasharray="2 2"/>
            <text x="210" y="195" font-family="'JetBrains Mono', monospace" font-size="8" fill="currentColor">TOKEN.M3 // 42K DL</text>
          </svg>
        `;
    }
  };

  return `
    <section id="projects" class="architectural-section section-projects" data-reveal>
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${projects.sectionIndex} // ${projects.sectionTitle}</span>
        <span class="watermark-meta">${projects.sectionSub}</span>
      </div>

      <div class="projects-intro" data-stagger>
        <h2 class="font-display">Curated Engineering Systems</h2>
        <p>${projects.description}</p>
      </div>

      <div class="projects-list">
        ${projects.items
          .map(
            (proj) => `
          <article class="project-architectural-card" data-stagger data-velocity-skew data-scroll-scale data-scale-from="0.93" data-scale-to="1.0">
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
                  <span>Deep-Dive Topology</span>
                  <span>↗</span>
                </button>
                <a href="${proj.links.code}" target="_blank" rel="noopener noreferrer" class="project-btn-secondary" data-cursor-target>
                  <span>GitHub Node</span>
                </a>
              </div>
            </div>

            <div class="project-blueprint-panel" data-inspect-project="${proj.id}" data-cursor-target title="Click to inspect architecture">
              <div class="blueprint-meta-header">
                <span>ROLE: ${proj.role}</span>
                <span>CLIENT: ${proj.client}</span>
              </div>

              <div class="blueprint-canvas-container" style="color: ${proj.accent};" data-parallax-relative data-parallax-speed="0.12">
                ${renderBlueprintSvg(proj.blueprintSvg)}
              </div>

              <div class="blueprint-telemetry-badge">
                ${Object.entries(proj.metrics)
                  .map(([key, val]) => `<span><strong>${key.toUpperCase()}:</strong> ${val}</span>`)
                  .join('<span style="opacity: 0.4;">|</span>')}
              </div>
            </div>
          </article>
        `
          )
          .join('')}
      </div>
    </section>
  `;
}

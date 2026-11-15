/**
 * COMPONENT 02: ABOUT SECTION / ARCHITECTURAL MANIFESTO
 * Pedagogical Journey at ITESA Muhammadiyah Semarang & Biophilic Ethos
 */

export function renderAbout(data) {
  const { about, meta } = data;

  return `
    <section id="about" class="architectural-section section-about" data-reveal>
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${about.sectionIndex} // ${about.sectionTitle}</span>
        <span class="watermark-meta">${about.sectionSub}</span>
      </div>

      <div class="about-manifesto-header">
        <h2 class="about-manifesto-title font-display" data-parallax-slide="left" data-parallax-speed="0.04">
          ${about.ethosTitle}
        </h2>
      </div>

      <div class="about-narrative-split">
        <div class="narrative-col-1">
          <p>${about.ethosParagraphs[0]}</p>
        </div>
        <div class="narrative-col-2">
          <p>${about.ethosParagraphs[1]}</p>
        </div>
      </div>

      <!-- 4 Architectural Pillars (Tectonic Cards, No AI-slop glassmorphism) -->
      <div class="about-pillars-grid">
        ${about.pillars
          .map(
            (pillar) => `
          <div class="pillar-card" data-stagger>
            <div>
              <div class="pillar-code">${pillar.code}</div>
              <h3 class="pillar-title">${pillar.title}</h3>
            </div>
            <p class="pillar-desc">${pillar.desc}</p>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- Timeline & Pedagogy Specs -->
      <div class="about-timeline-section" data-stagger>
        <div class="timeline-header-bar">
          <h3 class="font-display">${about.timelineTitle || 'Pedagogical Chronology & Field Practice'}</h3>
          <span class="font-mono" style="font-size: var(--font-mono-tag); color: var(--accent-primary);">
            BASE: ${meta.institution.name} [SEMARANG]
          </span>
        </div>

        <div class="timeline-items">
          ${about.timeline
            .map(
              (item) => `
            <div class="timeline-row">
              <div class="timeline-year">${item.year}</div>
              <div class="timeline-role-block">
                <h4>${item.title}</h4>
                <div class="timeline-place">${item.place}</div>
              </div>
              <div class="timeline-description">
                ${item.description}
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}

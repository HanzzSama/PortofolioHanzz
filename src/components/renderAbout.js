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

      <!-- Authentic Profile Hero with Abstract Architectural Drafting Chassis -->
      <div class="about-profile-hero" data-stagger>
        <div class="about-abstract-card" data-cursor-target>
          <!-- 4 Drafting Registration Crosshairs -->
          <span class="drafting-crosshair ch-tl" aria-hidden="true">+</span>
          <span class="drafting-crosshair ch-tr" aria-hidden="true">+</span>
          <span class="drafting-crosshair ch-bl" aria-hidden="true">+</span>
          <span class="drafting-crosshair ch-br" aria-hidden="true">+</span>

          <!-- Minimalist Telemetry Header -->
          <div class="abstract-card-hud-bar">
            <div class="hud-left-tag">
              <span class="hud-pulse-ring"></span>
              <span class="hud-tag-text font-mono">NODE // SRG.01</span>
            </div>
            <div class="hud-right-coords font-mono">
              <span>06°58'S 110°25'E</span>
            </div>
          </div>

          <!-- Abstract Photo Viewport Chamber -->
          <div class="abstract-photo-chamber">
            <!-- Optical framing reticle brackets -->
            <span class="reticle-bracket rb-tl" aria-hidden="true"></span>
            <span class="reticle-bracket rb-tr" aria-hidden="true"></span>
            <span class="reticle-bracket rb-bl" aria-hidden="true"></span>
            <span class="reticle-bracket rb-br" aria-hidden="true"></span>

            <img 
              src="${about.photo || meta.photo || './src/assets/Hanzz.jpeg'}" 
              alt="${meta.fullName}, ${meta.role}" 
              class="abstract-photo-img" 
              loading="lazy"
              decoding="async"
            />
            
            <!-- Expressive architectural kinetic overlay on hover -->
            <div class="abstract-photo-scrim" aria-hidden="true"></div>
            <div class="abstract-shimmer-sweep" aria-hidden="true"></div>

            <!-- In-frame micro watermark -->
            <div class="chamber-watermark font-mono">
              <span class="chamber-index">EXP // PACITAN</span>
              <span class="chamber-elevation">82M ASL</span>
            </div>
          </div>

          <!-- Minimalist Expressive Metadata Footer -->
          <div class="abstract-card-footer">
            <div class="abstract-identity-row">
              <div class="abstract-name-block">
                <span class="abstract-eyebrow font-mono">AUTEUR // CREATIVE</span>
                <h3 class="abstract-person-name font-display">${meta.fullName || 'Haidar Rifky Andrianno'}</h3>
              </div>
              <span class="abstract-exp-tag font-mono">4 YRS IT</span>
            </div>

            <div class="abstract-context-row font-mono">
              <span class="abstract-caption-text">${about.photoCaption || 'Foto di Pantai Pacitan'}</span>
            </div>

            <!-- Sleek Single-Line Telemetry Capsule (Never Wraps) -->
            <div class="abstract-telemetry-capsule font-mono" title="${about.locationBadge || 'Indonesia | Jawa Tengah | Kota Semarang'}">
              <div class="capsule-geo-section">
                <span class="capsule-radar-dot"></span>
                <span class="capsule-city">SEMARANG, ID</span>
              </div>
              <span class="capsule-divider">//</span>
              <span class="capsule-base">BASE: ITESA</span>
            </div>
          </div>
        </div>

        <div class="about-narrative-split">
          <div class="narrative-col-1">
            <p>${about.ethosParagraphs[0]}</p>
          </div>
          <div class="narrative-col-2">
            <p>${about.ethosParagraphs[1]}</p>
          </div>
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

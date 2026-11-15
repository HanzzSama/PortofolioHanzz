/**
 * COMPONENT 05: ANOTHER SECTION
 * Digital Garden, Interactive 432Hz Audio Synth, Transmission Terminal & Colophon
 */

export function renderAnother(data) {
  const { another, meta } = data;

  return `
    <section id="another" class="architectural-section section-another" data-reveal>
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${another.sectionIndex} // ${another.sectionTitle}</span>
        <span class="watermark-meta">${another.sectionSub}</span>
      </div>

      <div class="another-intro" data-stagger>
        <h2 class="font-display">${another.headline || 'Digital Garden & Field Notes'}</h2>
        <p>${another.description}</p>
      </div>

      <!-- Digital Garden Monograph Cards -->
      <div class="garden-grid">
        ${another.gardenNotes
          .map(
            (note) => `
          <div class="garden-note-card" data-inspect-note="${note.id}" data-stagger data-cursor-target>
            <div>
              <div class="note-header">
                <span>${note.tag}</span>
                <span>${note.date}</span>
              </div>
              <h3 class="note-title">${note.title}</h3>
              <p class="note-excerpt">${note.excerpt}</p>
            </div>
            <div style="margin-top: var(--space-md); display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: var(--font-mono-micro); color: var(--text-muted);">
              <span>${another.ui?.readTimeLabel || 'READ TIME:'} ${note.readTime}</span>
              <span style="color: var(--accent-primary);">${another.ui?.inspectLabel || 'INSPECT MONOGRAPH ↗'}</span>
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- Interactive Web Audio Biophilic Synthesizer -->
      <div class="audio-synth-wrapper" data-stagger>
        <div class="synth-header">
          <div>
            <h3>${another.audioSynth.title}</h3>
            <p style="font-family: var(--font-mono); font-size: var(--font-mono-tag); color: var(--accent-primary);">
              ${another.audioSynth.tagline}
            </p>
          </div>
          <button id="synth-mute-toggle" class="tactile-btn" data-cursor-target>
            <span id="synth-state-icon">▶</span>
            <span id="synth-state-label">${another.ui?.synthBtnPlay || 'Activate Resonant Tone'}</span>
          </button>
        </div>

        <div class="synth-controls-cluster">
          ${another.audioSynth.frequencies
            .map(
              (freq, index) => `
            <button class="synth-freq-btn ${index === 2 ? 'active-tone' : ''}" data-frequency="${freq.freq}" data-cursor-target>
              <strong>${freq.label}</strong>
              <span class="synth-sub-desc">${freq.desc}</span>
            </button>
          `
            )
            .join('')}
        </div>

        <canvas id="synth-canvas" class="synth-visualizer-canvas"></canvas>
      </div>

      <!-- Transmission / Contact Terminal -->
      <div class="transmission-terminal" data-stagger>
        <div class="transmission-info">
          <div style="font-family: var(--font-mono); font-size: var(--font-mono-tag); color: var(--accent-primary); margin-bottom: 0.5rem;">
            ${another.ui?.dispatchTag || 'COMMUNICATION DISPATCH // PROTOCOL: ENCRYPTED'}
          </div>
          <h3 class="font-display">${another.ui?.dispatchTitle || 'Initiate Collaboration'}</h3>
          <p>
            ${another.ui?.dispatchLead || 'Terbuka untuk diskusi arsitektur sistem, peran FullStack Developer, rekacipta aplikasi modern, atau riset komputasional bersama ITESA Muhammadiyah Semarang.'}
          </p>

          <button id="copy-email-btn" class="contact-quick-pill" data-email="${meta.socials[2].handle}" data-cursor-target>
            <span>✉</span>
            <span>${meta.socials[2].handle}</span>
            <span style="opacity: 0.5;">${another.ui?.copyLabel || '[COPY]'}</span>
            <span id="copy-toast" class="copy-feedback-toast">${another.ui?.copiedToast || 'COPIED TO CLIPBOARD'}</span>
          </button>
        </div>

        <div class="transmission-socials">
          ${meta.socials
            .map(
              (item) => `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="social-node-card" data-cursor-target>
              <span class="social-network-name">${item.name}</span>
              <span class="social-network-handle">${item.handle}</span>
            </a>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Colophon -->
      <footer class="architectural-colophon">
        <div>${another.colophon.license}</div>
        <div>${another.colophon.typography}</div>
        <div>${another.colophon.carbonEstimate}</div>
      </footer>
    </section>
  `;
}

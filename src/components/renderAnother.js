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
              <span style="color: var(--accent-primary);">${another.ui?.inspectLabel || 'INSPECT MONOGRAPH'}</span>
            </div>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- Acoustic Monolith Soundscape Studio Workstation -->
      <div class="audio-synth-wrapper monolith-audio-studio-box" data-stagger>
        <div class="synth-header">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.62rem; color: var(--accent-primary); letter-spacing: 0.08em; margin-bottom: 0.25rem;">
              AUDIO_DSP // PROCEDURAL SOUNDSCAPE ENGINE
            </div>
            <h3>${another.audioSynth.title || 'Acoustic Monolith Sound Studio'}</h3>
            <p style="font-family: var(--font-mono); font-size: var(--font-mono-tag); color: var(--text-secondary);">
              ${another.audioSynth.tagline || '432Hz Nature Solfeggio • Binaural Theta • Biophilic Rain Audio Suite'}
            </p>
          </div>
          <div class="synth-header-actions">
            <button id="studio-open-console-btn" class="tactile-btn" title="Open Advanced Hardware Console" data-cursor-target>
              <span>CONSOLE [DSP]</span>
            </button>
            <button id="synth-mute-toggle" class="tactile-btn" data-cursor-target>
              <span id="synth-state-icon" class="monolith-play-icon">▶</span>
              <span id="synth-state-label" class="monolith-play-label">${another.ui?.synthBtnPlay || 'ACTIVATE SOUND'}</span>
            </button>
          </div>
        </div>

        <!-- 6 Track Architecture Nodes -->
        <div class="synth-controls-cluster" id="studio-track-buttons">
          <button class="synth-freq-btn active-track active-tone" data-track-select="01_sanctuary" data-cursor-target>
            <strong>01 // Terra Sanctuary</strong>
            <span class="synth-sub-desc">Nature Song &amp; Warm Rhodes</span>
          </button>
          <button class="synth-freq-btn" data-track-select="02_solfeggio" data-cursor-target>
            <strong>02 // 528Hz Solfeggio</strong>
            <span class="synth-sub-desc">Miracle Chords &amp; Warmth</span>
          </button>
          <button class="synth-freq-btn" data-track-select="03_rain_lofi" data-cursor-target>
            <strong>03 // Semarang Rain</strong>
            <span class="synth-sub-desc">Biophilic Pink Noise &amp; Rhodes</span>
          </button>
          <button class="synth-freq-btn" data-track-select="04_cyber_pulse" data-cursor-target>
            <strong>04 // Cyber Pulse</strong>
            <span class="synth-sub-desc">90 BPM Modular Ostinato</span>
          </button>
          <button class="synth-freq-btn" data-track-select="05_binaural_theta" data-cursor-target>
            <strong>05 // 6Hz Theta Flow</strong>
            <span class="synth-sub-desc">Binaural Deep Focus</span>
          </button>
          <button class="synth-freq-btn" data-track-select="06_custom" data-cursor-target>
            <strong>06 // Custom Stream</strong>
            <span class="synth-sub-desc">User Stream &amp; Audio File</span>
          </button>
        </div>

        <!-- Real-Time Oscilloscope & Spectrum Display -->
        <div style="position: relative; margin-bottom: var(--space-md);">
          <div style="position: absolute; top: 8px; left: 10px; font-family: var(--font-mono); font-size: 0.58rem; color: var(--text-muted); letter-spacing: 0.05em; pointer-events: none;">
            FFT.MATRIX // LISSAJOUS VECTOR CRT
          </div>
          <canvas id="synth-canvas" class="synth-visualizer-canvas" width="800" height="90"></canvas>
        </div>

        <!-- Quick Faders Row -->
        <div class="synth-faders-row">
          <div class="synth-fader-item">
            <span>VOL:</span>
            <input type="range" id="studio-volume-slider" class="monolith-range-slider" min="0" max="1" step="0.01" value="0.35">
            <span id="studio-vol-readout" style="color: var(--accent-primary); font-weight: 600;">35%</span>
          </div>
          <div class="synth-fader-item">
            <span>LPF:</span>
            <input type="range" id="studio-filter-slider" class="monolith-range-slider" min="200" max="8000" step="50" value="1400">
            <span id="studio-filter-readout" style="color: var(--accent-primary); font-weight: 600;">1400Hz</span>
          </div>
          <button id="studio-toggle-rain-btn" class="tactile-toggle-pill" data-cursor-target>
            <span>RAIN OVERLAY</span>
          </button>
        </div>
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

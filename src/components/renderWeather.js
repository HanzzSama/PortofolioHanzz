/**
 * COMPONENT 07: REAL-TIME METEOROLOGY & CONTOUR BIOSPHERE
 * Minimalist Abstract Topography, Live Weather Telemetry & 432Hz Nada Wave Suite
 */

export function renderWeather(data) {
  const weatherData = data.weather || {
    sectionIndex: "07",
    sectionTitle: "ATMOSPHERE",
    sectionSub: "METEOROLOGICAL TOPOLOGY & REAL-TIME BIOSPHERE",
    headline: "Geodesic Meteorology & Contour Isobars",
    description: "Sistem telemetri atmosfer real-time dan kontur isobar generatif yang disinkronisasikan langsung dengan biosfer geografis Semarang (07°00'S 110°25'E).",
    topologyBadge: "+ [TOPOLOGY // 07°00'S 110°25'E • 82m ASL]",
    ui: {
      isobars: "[ISOBARS]",
      windStream: "[WIND STREAM]",
      nadaWave: "NADA WAVE // 432Hz",
      pressure: "Tekanan Barometrik",
      wind: "Vektor Angin",
      humidity: "Kelembapan Udara",
      cloudCover: "Tutupan Awan",
      apparent: "APPARENT:",
      sync: "REFRESH TELEMETRY ↻",
      biosphereFootprint: "CARBON IMPACT: < 0.12g CO₂ // BIOPHILIC OPTIMAL",
      solarCycle: "SOLAR AZIMUTH // DIURNAL ARC"
    }
  };

  const ui = weatherData.ui || {};

  return `
    <section id="weather" class="architectural-section section-weather" data-reveal>
      <!-- Background Watermark Label -->
      <div class="section-watermark-label" data-parallax-slide="left" data-parallax-speed="0.05">
        <span class="watermark-index">${weatherData.sectionIndex} // ${weatherData.sectionTitle}</span>
        <span class="watermark-meta">${weatherData.sectionSub}</span>
      </div>

      <div class="weather-intro" data-stagger>
        <div class="system-tag" style="margin-bottom: var(--space-xs);">
          <span>ATMOSPHERE.07 // BIOSPHERIC CADENCE</span>
          <span>${weatherData.topologyBadge}</span>
        </div>
        <h2 class="font-display">${weatherData.headline}</h2>
        <p>${weatherData.description}</p>
      </div>

      <!-- Main Stage Grid: Interactive Contour Canvas + Telemetry Stack -->
      <div class="weather-stage-grid">
        <!-- Left: Interactive Generative Contour Isobar Canvas -->
        <div class="weather-contour-card" data-stagger>
          <!-- Diurnal Atmosphere Time Phase Header -->
          <div class="weather-diurnal-bar">
            <span class="diurnal-title">ATMOSPHERIC AMBIANCE //</span>
            <div class="diurnal-btn-group">
              <button class="diurnal-btn is-active" data-diurnal-phase="auto" data-cursor-target title="Sync with Real-time Clock">
                ● LIVE WIB
              </button>
              <button class="diurnal-btn" data-diurnal-phase="dawn" data-cursor-target title="06:00 WIB • Pagi Hari (Warm Soft Sunrise)">
                PAGI
              </button>
              <button class="diurnal-btn" data-diurnal-phase="noon" data-cursor-target title="12:00 WIB • Siang Hari (Palette Orange Warm, Soft)">
                SIANG
              </button>
              <button class="diurnal-btn" data-diurnal-phase="golden" data-cursor-target title="17:00 WIB • Sore Hari (Palette Orange Tua Warm, Soft)">
                SORE
              </button>
              <button class="diurnal-btn" data-diurnal-phase="twilight" data-cursor-target title="19:00 WIB • Petang / Senja (Biru Warm Twilight)">
                PETANG
              </button>
              <button class="diurnal-btn" data-diurnal-phase="night" data-cursor-target title="23:00 WIB • Malam Hari (Biru Dark Warm Midnight)">
                MALAM
              </button>
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="weather-contour-canvas-wrap">
            <canvas id="weather-contour-canvas"></canvas>

            <!-- Floating Topography Crosshairs -->
            <div class="weather-canvas-crosshairs">
              <div>NODE: SEMARANG // 82m ASL</div>
              <div id="weather-cursor-coord" class="active-coord">07°00.125S 110°25.416E</div>
              <div id="weather-phase-indicator" class="active-coord">SOLAR: SIANG // ZENITH</div>
            </div>

            <!-- Wave Mode Real-time Indicator -->
            <div id="weather-wave-status" class="weather-wave-status" title="Acoustic Wave Mode State">
              <span class="wave-pulse-ring"></span>
              <span id="weather-wave-label">NADA: HARMONIC 432Hz</span>
            </div>
          </div>

          <!-- Contour Interactive Controls Bar -->
          <div class="weather-controls-bar">
            <!-- Layer Toggles -->
            <div class="weather-layer-btn-group">
              <button class="weather-mode-btn is-active" data-weather-mode="isobars" data-cursor-target>
                ${ui.isobars || '[ISOBARS]'}
              </button>
              <button class="weather-mode-btn" data-weather-mode="wind" data-cursor-target>
                ${ui.windStream || '[WIND STREAM]'}
              </button>
            </div>

            <!-- Nada Wave Theme Effect Button -->
            <div>
              <button id="weather-nada-wave-btn" class="weather-nada-wave-btn" data-cursor-target title="Toggle 432Hz Acoustic Nada Wave Resonance">
                <span class="nada-wave-icon">◎</span>
                <span>${ui.nadaWave || 'NADA WAVE // 432Hz'}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right: Real-Time Meteorological Telemetry HUD -->
        <div class="weather-telemetry-hud" data-stagger>
          <!-- Primary Temperature Hero Card -->
          <div class="weather-primary-card">
            <div class="weather-meta-header">
              <span class="weather-node-pulse">
                <span class="status-pulse-dot"></span>
                <span>GEODESIC NODE // ITESA SEMARANG</span>
              </span>
              <!-- Unit Selector -->
              <div class="weather-unit-toggle">
                <button class="weather-unit-btn active" data-weather-unit="C" data-cursor-target>°C</button>
                <button class="weather-unit-btn" data-weather-unit="F" data-cursor-target>°F</button>
              </div>
            </div>

            <div class="weather-temp-row">
              <div id="weather-temp-display" class="weather-temp-hero">29.4°C</div>
              <div id="weather-apparent-display" class="weather-apparent-temp">APPARENT: 33.2°C</div>
            </div>

            <div class="weather-condition-tagline">
              <span id="weather-condition-display" class="weather-desc-badge">TROPICAL OVERCAST // BIOPHILIC OPTIMAL</span>
            </div>
          </div>

          <!-- Secondary Metrics 2x2 Grid -->
          <div class="weather-metrics-grid">
            <!-- Barometric Isobar Pressure -->
            <div class="weather-metric-tile">
              <div class="metric-label">${ui.pressure || 'Tekanan Barometrik'}</div>
              <div class="metric-value-row">
                <span id="weather-pressure-display" class="metric-value">1011.8 hPa</span>
              </div>
              <div class="metric-sub">ISOBAR GRADIENT: STABLE</div>
            </div>

            <!-- Wind Velocity & Direction -->
            <div class="weather-metric-tile">
              <div class="metric-label">${ui.wind || 'Vektor Angin'}</div>
              <div class="metric-value-row">
                <span id="weather-wind-display" class="metric-value">12.5 km/h</span>
              </div>
              <div id="weather-wind-dir" class="metric-sub">135° SE • KINETIC</div>
            </div>

            <!-- Relative Humidity Index -->
            <div class="weather-metric-tile">
              <div class="metric-label">${ui.humidity || 'Kelembapan Udara'}</div>
              <div class="metric-value-row">
                <span id="weather-humidity-display" class="metric-value">78%</span>
              </div>
              <div class="metric-bar-track">
                <div id="weather-humidity-bar" class="metric-bar-fill" style="width: 78%;"></div>
              </div>
            </div>

            <!-- Cloud Canopy Cover -->
            <div class="weather-metric-tile">
              <div class="metric-label">${ui.cloudCover || 'Tutupan Awan'}</div>
              <div class="metric-value-row">
                <span id="weather-cloud-display" class="metric-value">45%</span>
              </div>
              <div class="metric-bar-track">
                <div id="weather-cloud-bar" class="metric-bar-fill" style="width: 45%;"></div>
              </div>
            </div>
          </div>

          <!-- Tertiary Solar & Sync Status Strip -->
          <div class="weather-solar-strip">
            <div class="weather-sync-indicator">
              <span class="sync-dot"></span>
              <span id="weather-sync-status">OPEN-METEO SYNCED // LIVE</span>
            </div>
            <button id="weather-sync-refresh-btn" class="weather-sync-btn" data-cursor-target title="Refresh Real-time Weather Data">
              ${ui.sync || 'REFRESH ↻'}
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}


/**
 * COMPONENT 05: CERTIFICATIONS & CREDENTIALS ARCHIVE
 * Biophilic Architectural Standard Credentials Chassis & Guilloché Security Blueprint
 * Verified Licenses, Academic Honors & Technical Certifications
 */

import { resolveCertificateImage } from '../utils/imageDetector.js';

export function renderCertificates(data) {
  const { certificates } = data;
  if (!certificates || !Array.isArray(certificates.items)) return '';

  const ui = certificates.ui || {
    filterAll: 'Semua',
    filterDev: 'Rekayasa Web',
    filterDesign: 'Desain Antarmuka',
    filterCloud: 'Cloud & Keamanan',
    filterAcademic: 'Akademik',
    inspect: 'Inspeksi Kredensial',
    verify: 'Validasi Resmi',
    verifiedBadge: 'TERVERIFIKASI',
    issuer: 'Penerbit',
    validUntil: 'Masa Berlaku',
    credentialId: 'ID Kredensial',
    skillsTitle: 'Kompetensi Teruji'
  };

  /**
   * Generates mathematical Guilloché / Cryptographic security patterns for certificate fallback.
   */
  const renderGuillocheBlueprintSvg = (pattern, cert = {}) => {
    const label = cert.code ? `${cert.code} // VERIFIED` : 'CREDENTIAL // ARCHIVE';
    const gridId = `cert-grid-${cert.id || 'def'}`;

    const gridBackground = `
      <defs>
        <pattern id="${gridId}" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" stroke-width="0.3" stroke-opacity="0.12"/>
        </pattern>
      </defs>
      <rect width="360" height="180" fill="url(#${gridId})" />
    `;

    switch (pattern) {
      case 'golden-ratio-grid':
        return `
          <svg viewBox="0 0 360 180" width="100%" height="100%" fill="none" stroke="currentColor" class="guilloche-vector-svg">
            ${gridBackground}
            <!-- Outer Fine Framing -->
            <rect x="14" y="14" width="332" height="152" stroke-width="0.75" stroke-opacity="0.35" stroke-dasharray="2 3"/>
            <rect x="20" y="20" width="320" height="140" stroke-width="0.5" stroke-opacity="0.2"/>

            <!-- Golden Ratio Spiral & Harmonic Drafting Grid centered at 180, 90 -->
            <path d="M 80,135 A 95,95 0 0,1 175,40 A 60,60 0 0,1 235,100 A 38,38 0 0,1 197,138 A 24,24 0 0,1 173,114 A 15,15 0 0,1 188,99" stroke-width="1.2" stroke-opacity="0.85"/>
            <line x1="60" y1="135" x2="300" y2="135" stroke-width="0.5" stroke-opacity="0.3" stroke-dasharray="4 4"/>
            <line x1="175" y1="35" x2="175" y2="155" stroke-width="0.5" stroke-opacity="0.3" stroke-dasharray="4 4"/>
            <line x1="235" y1="35" x2="235" y2="155" stroke-width="0.5" stroke-opacity="0.25"/>

            <!-- Calibration Rosettes -->
            <circle cx="180" cy="90" r="32" stroke-width="0.8" stroke-opacity="0.4" stroke-dasharray="3 3"/>
            <circle cx="180" cy="90" r="20" stroke-width="1" stroke-opacity="0.6"/>
            <circle cx="180" cy="90" r="5" fill="currentColor"/>

            <text x="180" y="156" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" letter-spacing="0.1em" fill="currentColor">${label}</text>
          </svg>
        `;

      case 'cryptographic-lattice':
        return `
          <svg viewBox="0 0 360 180" width="100%" height="100%" fill="none" stroke="currentColor" class="guilloche-vector-svg">
            ${gridBackground}
            <!-- Framing -->
            <rect x="14" y="14" width="332" height="152" stroke-width="0.75" stroke-opacity="0.35"/>
            <rect x="18" y="18" width="324" height="144" stroke-width="0.4" stroke-opacity="0.25" stroke-dasharray="1 2"/>

            <!-- Hexagonal Security Mesh centered at 180, 85 -->
            <polygon points="180,35 230,62 230,118 180,145 130,118 130,62" stroke-width="1.2" stroke-opacity="0.7"/>
            <polygon points="180,48 216,68 216,112 180,132 144,112 144,68" stroke-width="0.75" stroke-opacity="0.45" stroke-dasharray="2 2"/>
            
            <!-- Radiating Symmetry Interconnects -->
            <line x1="130" y1="62" x2="60" y2="35" stroke-width="0.7" stroke-opacity="0.3"/>
            <line x1="230" y1="62" x2="300" y2="35" stroke-width="0.7" stroke-opacity="0.3"/>
            <line x1="130" y1="118" x2="60" y2="145" stroke-width="0.7" stroke-opacity="0.3"/>
            <line x1="230" y1="118" x2="300" y2="145" stroke-width="0.7" stroke-opacity="0.3"/>

            <!-- Core Seal Points -->
            <circle cx="180" cy="90" r="12" stroke-width="1.2" stroke-opacity="0.8"/>
            <circle cx="180" cy="90" r="4" fill="currentColor"/>

            <text x="180" y="156" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" letter-spacing="0.1em" fill="currentColor">${label}</text>
          </svg>
        `;

      case 'geometric-seal':
        return `
          <svg viewBox="0 0 360 180" width="100%" height="100%" fill="none" stroke="currentColor" class="guilloche-vector-svg">
            ${gridBackground}
            <rect x="14" y="14" width="332" height="152" stroke-width="0.8" stroke-opacity="0.4"/>
            <rect x="18" y="18" width="324" height="144" stroke-width="0.4" stroke-opacity="0.2" stroke-dasharray="2 3"/>

            <!-- Concentric Octagonal Academic Medallion centered at 180, 85 -->
            <polygon points="180,38 218,54 234,90 218,126 180,142 142,126 126,90 142,54" stroke-width="1.2" stroke-opacity="0.8"/>
            <polygon points="180,48 210,60 222,90 210,120 180,132 150,120 138,90 150,60" stroke-width="0.6" stroke-opacity="0.4" stroke-dasharray="2 3"/>
            <circle cx="180" cy="90" r="25" stroke-width="0.8" stroke-opacity="0.6"/>
            <circle cx="180" cy="90" r="6" fill="currentColor"/>

            <!-- Laurel Leaf Axis Lines -->
            <path d="M 110,90 Q 135,125 165,130" stroke-width="0.8" stroke-opacity="0.5"/>
            <path d="M 250,90 Q 225,125 195,130" stroke-width="0.8" stroke-opacity="0.5"/>

            <text x="180" y="156" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" letter-spacing="0.1em" fill="currentColor">${label}</text>
          </svg>
        `;

      case 'security-guilloche':
      default:
        return `
          <svg viewBox="0 0 360 180" width="100%" height="100%" fill="none" stroke="currentColor" class="guilloche-vector-svg">
            ${gridBackground}
            <!-- Outer Security Border -->
            <rect x="14" y="14" width="332" height="152" stroke-width="0.75" stroke-opacity="0.35"/>
            <rect x="18" y="18" width="324" height="144" stroke-width="0.5" stroke-opacity="0.2" stroke-dasharray="2 2"/>

            <!-- Overlapping Guilloché Security Waves centered vertically at 90 -->
            <path d="M 35,90 C 75,40 125,140 180,90 C 235,40 285,140 325,90" stroke-width="1.2" stroke-opacity="0.85"/>
            <path d="M 35,90 C 75,55 125,125 180,90 C 235,55 285,125 325,90" stroke-width="0.8" stroke-opacity="0.5"/>
            <path d="M 35,90 C 75,70 125,110 180,90 C 235,70 285,110 325,90" stroke-width="0.6" stroke-opacity="0.35"/>

            <!-- Central Verification Seal Ring -->
            <circle cx="180" cy="90" r="38" stroke-width="1" stroke-opacity="0.7" stroke-dasharray="4 2"/>
            <circle cx="180" cy="90" r="28" stroke-width="1.3" stroke-opacity="0.9"/>
            <circle cx="180" cy="90" r="5" fill="currentColor"/>

            <!-- Official Seal Star Points -->
            <polygon points="180,68 183,76 191,76 185,82 188,90 180,84 172,90 175,82 169,76 177,76" fill="none" stroke="currentColor" stroke-width="0.6" stroke-opacity="0.5" transform="translate(0, 10)"/>

            <text x="180" y="156" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="600" letter-spacing="0.1em" fill="currentColor">${label}</text>
          </svg>
        `;
    }
  };

  return `
    <section id="certificates" class="certificates-section architectural-section" data-nav-section aria-labelledby="certificates-title">
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${certificates.sectionIndex || '05'} // ${certificates.sectionTitle || 'Sertifikasi & Kredensial Resmi'}</span>
        <span class="watermark-meta">${certificates.sectionSub || 'OFFICIAL CERTIFICATIONS // CREDENTIALS & LICENSES'}</span>
      </div>

      <div class="certificates-intro" data-stagger>
        <h2 id="certificates-title" class="font-display">${certificates.headline || certificates.sectionTitle || 'Sertifikasi & Kredensial Resmi'}</h2>
        <p class="certificates-narrative">${certificates.description || 'Dokumentasi lisensi resmi, pengujian standar industri, dan rekognisi kompetensi bidang teknologi informasi dan desain.'}</p>
      </div>

      <!-- Filter Controls -->
      <div class="certificates-filter-bar font-mono" role="tablist" aria-label="Filter Sertifikat">
        <span class="filter-lead-label font-mono" aria-hidden="true">FILTER //</span>
        <button class="cert-filter-btn active" data-cert-filter="all" role="tab" aria-selected="true" data-cursor-target>
          <span>${ui.filterAll || 'Semua'}</span>
          <span class="cert-count-badge">${certificates.items.length}</span>
        </button>
        <button class="cert-filter-btn" data-cert-filter="dev" role="tab" aria-selected="false" data-cursor-target>
          <span>${ui.filterDev || 'Rekayasa Web'}</span>
        </button>
        <button class="cert-filter-btn" data-cert-filter="design" role="tab" aria-selected="false" data-cursor-target>
          <span>${ui.filterDesign || 'Desain Antarmuka'}</span>
        </button>
        <button class="cert-filter-btn" data-cert-filter="cloud" role="tab" aria-selected="false" data-cursor-target>
          <span>${ui.filterCloud || 'Cloud & Keamanan'}</span>
        </button>
        <button class="cert-filter-btn" data-cert-filter="academic" role="tab" aria-selected="false" data-cursor-target>
          <span>${ui.filterAcademic || 'Akademik'}</span>
        </button>
      </div>

      <!-- Certificates Grid -->
      <div class="certificates-grid" id="certificates-grid-container">
        ${certificates.items
          .map((cert) => {
            const certImage = resolveCertificateImage(cert);
            const hasImage = Boolean(certImage);

            return `
              <article class="certificate-architectural-card" data-category="${cert.category}" data-scroll-scale data-scale-from="0.95" data-scale-to="1.0">
                <!-- Top Meta Bar: Code, Category, Status -->
                <div class="cert-card-header font-mono">
                  <div class="cert-code-group">
                    <span class="cert-code-tag">${cert.code}</span>
                    <span class="cert-cat-pill">${cert.categoryLabel}</span>
                  </div>
                  <div class="cert-status-pill">
                    <span class="cert-status-dot"></span>
                    <span>${ui.verifiedBadge || 'TERVERIFIKASI'}</span>
                  </div>
                </div>

                <!-- Chassis Visual Mat -->
                <div class="certificate-thumb-chassis ${hasImage ? 'has-active-image' : 'has-no-image'}" data-inspect-certificate="${cert.id}" data-cursor-target title="Klik untuk inspeksi kredensial">
                  <!-- Reticle Optical Brackets (Unobstructed corners) -->
                  <span class="reticle-bracket rb-tl" aria-hidden="true"></span>
                  <span class="reticle-bracket rb-tr" aria-hidden="true"></span>
                  <span class="reticle-bracket rb-bl" aria-hidden="true"></span>
                  <span class="reticle-bracket rb-br" aria-hidden="true"></span>

                  <!-- Canvas Viewport -->
                  <div class="certificate-canvas-viewport">
                    <div class="guilloche-fallback-wrap">
                      ${renderGuillocheBlueprintSvg(cert.blueprintPattern, cert)}
                    </div>
                    ${
                      hasImage
                        ? `<img src="${certImage}" alt="${cert.title}" class="certificate-preview-img" loading="lazy" decoding="async" onload="window.__handleCertificateImgLoad && window.__handleCertificateImgLoad(this)" onerror="window.__handleCertificateImgError && window.__handleCertificateImgError(this)" />`
                        : ''
                    }
                  </div>
                </div>

                <!-- Details Panel -->
                <div class="certificate-details-panel">
                  <div class="cert-title-block">
                    <div class="cert-meta-row font-mono">
                      <span class="cert-year-tag">${cert.year}</span>
                      <span class="cert-meta-sep">//</span>
                      <span class="cert-valid-tag">${cert.expiryDate ? `${ui.validUntil || 'Masa Berlaku'}: ${cert.expiryDate}` : cert.issueDate}</span>
                    </div>
                    <h3 class="certificate-title" title="${cert.title}">${cert.title}</h3>
                  </div>

                  <div class="cert-meta-fields font-mono">
                    <div class="cert-field-row">
                      <span class="cert-field-label">${ui.issuer || 'Penerbit'}:</span>
                      <span class="cert-field-val">${cert.issuer}</span>
                    </div>
                    <div class="cert-field-row">
                      <span class="cert-field-label">${ui.credentialId || 'ID'}:</span>
                      <span class="cert-field-val cert-field-code">${cert.credentialId}</span>
                    </div>
                  </div>

                  <div class="certificate-tags-wrap">
                    ${cert.skills
                      .map((skill) => `<span class="cert-tech-chip">${skill}</span>`)
                      .join('')}
                  </div>

                  <div class="certificate-actions-row">
                    <button class="cert-btn-primary" data-inspect-certificate="${cert.id}" data-cursor-target>
                      <span>${ui.inspect || 'Inspeksi Kredensial'}</span>
                    </button>
                    ${
                      cert.credentialUrl
                        ? `<a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="cert-btn-secondary" data-cursor-target title="${ui.verify || 'Validasi Resmi'}">
                            <span>${ui.verify || 'Validasi Resmi'}</span>
                            <span class="cert-ext-icon" aria-hidden="true">↗</span>
                          </a>`
                        : ''
                    }
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

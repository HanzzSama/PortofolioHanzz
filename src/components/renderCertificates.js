/**
 * SECTION 04.B // ACCREDITATION & CREDENTIAL ARCHIVE
 * Design: Architectural Brutalism, Minimalist Cryptographic Ledger & Expressive Generative Seals
 * Single Source: portfolioData.certificates
 */

import { getCertificateImageCandidates } from '../utils/imageDetector.js';

/**
 * Generates mathematically aligned cryptographic SVG seals for certificates
 * @param {string} type - 'guilloche' | 'cipher' | 'circuit' | 'neural'
 * @param {Object} cert - Certificate object
 * @returns {string} SVG markup
 */
export function renderCryptographicSeal(type = 'guilloche', cert = {}) {
  const serial = cert.credentialId || 'ID-2026-X99';
  const issuerShort = (cert.issuer || 'HANZZ ACCREDITED').toUpperCase();
  const year = cert.issuedDate || '2026';
  const gridId = `seal-grid-${cert.id || 'def'}`;

  const baseDefs = `
    <defs>
      <pattern id="${gridId}" width="16" height="16" patternUnits="userSpaceOnUse">
        <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" stroke-width="0.3" stroke-opacity="0.15"/>
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#${gridId})" />
  `;

  switch (type) {
    case 'cipher':
      // Radial Hexadecimal Cipher Matrix (Cyber Security)
      return `
        <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor" class="cert-svg-seal cert-svg-cipher">
          ${baseDefs}
          <!-- Reticle crosshairs -->
          <line x1="20" y1="180" x2="380" y2="180" stroke-width="0.5" stroke-opacity="0.3" stroke-dasharray="3 3"/>
          <line x1="200" y1="10" x2="200" y2="350" stroke-width="0.5" stroke-opacity="0.3" stroke-dasharray="3 3"/>

          <!-- Concentric Cipher Rings -->
          <circle cx="200" cy="180" r="145" stroke-width="1" stroke-opacity="0.25"/>
          <circle cx="200" cy="180" r="130" stroke-width="1.5" stroke-opacity="0.6" stroke-dasharray="8 4 2 4"/>
          <circle cx="200" cy="180" r="110" stroke-width="0.75" stroke-opacity="0.4"/>
          <circle cx="200" cy="180" r="85" stroke-width="1.2" stroke-opacity="0.7" stroke-dasharray="14 6"/>
          <circle cx="200" cy="180" r="60" stroke-width="0.75" stroke-opacity="0.4"/>
          
          <!-- Inner Core Vault -->
          <circle cx="200" cy="180" r="32" fill="var(--bg-surface-sunken)" stroke-width="2"/>
          <polygon points="200,162 216,180 200,198 184,180" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="200" cy="180" r="4" fill="currentColor"/>

          <!-- Cardinal Sensor Ticks -->
          <circle cx="200" cy="35" r="3" fill="currentColor"/>
          <circle cx="345" cy="180" r="3" fill="currentColor"/>
          <circle cx="200" cy="325" r="3" fill="currentColor"/>
          <circle cx="55" cy="180" r="3" fill="currentColor"/>

          <!-- Cryptographic Hash Rings -->
          <path id="cipher-text-path-${cert.id || 'c'}" d="M 90,180 A 110,110 0 1,1 310,180" fill="none"/>
          <text font-family="'JetBrains Mono', monospace" font-size="7.5" letter-spacing="0.18em" fill="currentColor" stroke="none" opacity="0.85">
            <textPath href="#cipher-text-path-${cert.id || 'c'}" startOffset="50%" text-anchor="middle">
              SEC.CIPHER // SHA-256 // ${serial}
            </textPath>
          </text>

          <!-- Baseline Verification Label -->
          <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor" stroke="none">${issuerShort} // ${year}</text>
        </svg>
      `;

    case 'circuit':
      // Silicon Wafer PCB Microarchitecture (Software & Frontend Architecture)
      return `
        <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor" class="cert-svg-seal cert-svg-circuit">
          ${baseDefs}
          <!-- Precision Circuit Perimeter -->
          <rect x="65" y="45" width="270" height="270" stroke-width="1" stroke-opacity="0.3"/>
          <rect x="80" y="60" width="240" height="240" stroke-width="1.25" stroke-opacity="0.6"/>

          <!-- Silicon Chip Core -->
          <rect x="145" y="125" width="110" height="110" fill="var(--bg-surface-sunken)" stroke-width="2"/>
          <rect x="160" y="140" width="80" height="80" stroke-width="0.75" stroke-opacity="0.5" stroke-dasharray="4 4"/>
          <circle cx="200" cy="180" r="16" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
          <circle cx="200" cy="180" r="6" fill="currentColor"/>

          <!-- Bus Lines & Solder Nodes (North) -->
          <line x1="170" y1="125" x2="170" y2="80" stroke-width="1.2"/>
          <circle cx="170" cy="76" r="3" fill="currentColor"/>
          <line x1="200" y1="125" x2="200" y2="65" stroke-width="1.5"/>
          <circle cx="200" cy="61" r="3.5" fill="currentColor"/>
          <line x1="230" y1="125" x2="230" y2="80" stroke-width="1.2"/>
          <circle cx="230" cy="76" r="3" fill="currentColor"/>

          <!-- Bus Lines (South) -->
          <line x1="170" y1="235" x2="170" y2="280" stroke-width="1.2"/>
          <circle cx="170" cy="284" r="3" fill="currentColor"/>
          <line x1="200" y1="235" x2="200" y2="295" stroke-width="1.5"/>
          <circle cx="200" cy="299" r="3.5" fill="currentColor"/>
          <line x1="230" y1="235" x2="230" y2="280" stroke-width="1.2"/>
          <circle cx="230" cy="284" r="3" fill="currentColor"/>

          <!-- Bus Lines (West) -->
          <line x1="145" y1="160" x2="100" y2="160" stroke-width="1.2"/>
          <circle cx="96" cy="160" r="3" fill="currentColor"/>
          <line x1="145" y1="200" x2="100" y2="200" stroke-width="1.2"/>
          <circle cx="96" cy="200" r="3" fill="currentColor"/>

          <!-- Bus Lines (East) -->
          <line x1="255" y1="160" x2="300" y2="160" stroke-width="1.2"/>
          <circle cx="304" cy="160" r="3" fill="currentColor"/>
          <line x1="255" y1="200" x2="300" y2="200" stroke-width="1.2"/>
          <circle cx="304" cy="200" r="3" fill="currentColor"/>

          <!-- Baseline Verification Label -->
          <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor" stroke="none">${serial} // ARCHITECTURE</text>
        </svg>
      `;

    case 'neural':
      // Fractal Perceptron Synapse Network (AI & Machine Learning)
      return `
        <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor" class="cert-svg-seal cert-svg-neural">
          ${baseDefs}
          <!-- Harmonic Orbit Shells -->
          <circle cx="200" cy="180" r="140" stroke-width="0.75" stroke-opacity="0.3"/>
          <circle cx="200" cy="180" r="100" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="6 6"/>
          <circle cx="200" cy="180" r="60" stroke-width="1.2" stroke-opacity="0.7"/>

          <!-- Inscribed Hexagonal Neural Cluster -->
          <polygon points="200,90 278,135 278,225 200,270 122,225 122,135" stroke-width="1" stroke-opacity="0.6"/>

          <!-- Central Kernel -->
          <circle cx="200" cy="180" r="24" fill="var(--bg-surface-sunken)" stroke-width="2"/>
          <circle cx="200" cy="180" r="8" fill="currentColor"/>

          <!-- Radial Axon Lines & Solid Nodes -->
          <line x1="200" y1="180" x2="200" y2="90" stroke-width="1.2"/>
          <circle cx="200" cy="90" r="6" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
          <circle cx="200" cy="90" r="2.5" fill="currentColor"/>

          <line x1="200" y1="180" x2="278" y2="135" stroke-width="1.2"/>
          <circle cx="278" cy="135" r="6" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
          <circle cx="278" cy="135" r="2.5" fill="currentColor"/>

          <line x1="200" y1="180" x2="278" y2="225" stroke-width="1.2"/>
          <circle cx="278" cy="225" r="6" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
          <circle cx="278" cy="225" r="2.5" fill="currentColor"/>

          <line x1="200" y1="180" x2="200" y2="270" stroke-width="1.2"/>
          <circle cx="200" cy="270" r="6" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
          <circle cx="200" cy="270" r="2.5" fill="currentColor"/>

          <line x1="200" y1="180" x2="122" y2="225" stroke-width="1.2"/>
          <circle cx="122" cy="225" r="6" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
          <circle cx="122" cy="225" r="2.5" fill="currentColor"/>

          <line x1="200" y1="180" x2="122" y2="135" stroke-width="1.2"/>
          <circle cx="122" cy="135" r="6" fill="var(--bg-surface-sunken)" stroke-width="1.5"/>
          <circle cx="122" cy="135" r="2.5" fill="currentColor"/>

          <!-- Baseline Verification Label -->
          <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor" stroke="none">NEURAL ACCREDITED // ${year}</text>
        </svg>
      `;

    case 'guilloche':
    default:
      // Sacred Guilloché Mathematical Security Rosette (National & Official Accreditation)
      return `
        <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor" class="cert-svg-seal cert-svg-guilloche">
          ${baseDefs}
          <!-- Concentric Outer Notches -->
          <circle cx="200" cy="180" r="148" stroke-width="0.75" stroke-opacity="0.3"/>
          <circle cx="200" cy="180" r="142" stroke-width="1.5" stroke-opacity="0.7" stroke-dasharray="2 3"/>
          <circle cx="200" cy="180" r="132" stroke-width="0.75" stroke-opacity="0.4"/>

          <!-- Harmonic Rotated Squares (8-Point Star Guilloché) -->
          <rect x="120" y="100" width="160" height="160" stroke-width="1.2" stroke-opacity="0.7" fill="var(--bg-surface-sunken)" fill-opacity="0.25"/>
          <rect x="120" y="100" width="160" height="160" stroke-width="1.2" stroke-opacity="0.7" transform="rotate(45 200 180)"/>
          <rect x="120" y="100" width="160" height="160" stroke-width="0.5" stroke-opacity="0.4" stroke-dasharray="3 3" transform="rotate(22.5 200 180)"/>
          <rect x="120" y="100" width="160" height="160" stroke-width="0.5" stroke-opacity="0.4" stroke-dasharray="3 3" transform="rotate(67.5 200 180)"/>

          <!-- Inner Guilloché Rings -->
          <circle cx="200" cy="180" r="82" stroke-width="1" stroke-opacity="0.5"/>
          <circle cx="200" cy="180" r="64" stroke-width="1.5" stroke-opacity="0.8"/>
          <circle cx="200" cy="180" r="46" stroke-width="0.75" stroke-opacity="0.5" stroke-dasharray="2 2"/>

          <!-- Central Official Crest Knot -->
          <circle cx="200" cy="180" r="28" fill="var(--bg-surface-sunken)" stroke-width="2"/>
          <circle cx="200" cy="180" r="8" fill="currentColor"/>

          <!-- Baseline Verification Label -->
          <text x="200" y="365" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.08em" fill="currentColor" stroke="none">${serial} // OFFICIAL SEAL</text>
        </svg>
      `;
  }
}

/**
 * Main render function for Certificates section
 * @param {Object} data - Whole portfolio data object
 * @returns {string} HTML string
 */
export function renderCertificates(data) {
  const certs = data.certificates;
  if (!certs || !certs.items) return '';

  const ui = certs.ui || {};

  const categoriesHtml = (certs.categories || [])
    .map((cat, idx) => `
      <button 
        type="button" 
        class="cert-filter-pill ${idx === 0 ? 'active' : ''}" 
        data-filter="${cat.id}"
        data-cursor-target
      >
        <span class="pill-dot"></span>
        <span class="pill-label">${cat.label}</span>
      </button>
    `)
    .join('');

  const certCardsHtml = certs.items
    .map((cert, idx) => {
      const candidates = getCertificateImageCandidates(cert);
      const candidatesJson = JSON.stringify(candidates).replace(/"/g, '&quot;');
      const sealSvg = renderCryptographicSeal(cert.sealType || 'guilloche', cert);

      const skillsHtml = (cert.skills || [])
        .map((s) => `<span class="cert-skill-tag">${s}</span>`)
        .join('');

      return `
        <article 
          class="cert-card" 
          data-cert-id="${cert.id}" 
          data-inspect-cert="${cert.id}"
          data-category="${cert.category || 'all'}"
          data-cursor-target
        >
          <!-- Passe-Partout Architectural Seal Viewport -->
          <div class="cert-seal-viewport has-no-image">
            <span class="cert-reticle cert-reticle-tl">┌</span>
            <span class="cert-reticle cert-reticle-tr">┐</span>
            <span class="cert-reticle cert-reticle-bl">└</span>
            <span class="cert-reticle cert-reticle-br">┘</span>

            <!-- Mathematical Vector SVG Seal (Fallback & Ambient Backing) -->
            <div class="cert-seal-svg-container">
              ${sealSvg}
            </div>

            <!-- Auto-detected Physical Image with Natural Aspect Ratio -->
            <div class="cert-media-inner">
              <img 
                src="${candidates[0] || ''}" 
                alt="Sertifikat ${cert.title}" 
                class="cert-image-preview" 
                loading="lazy"
                data-candidates="${candidatesJson}"
                data-candidate-idx="0"
                onload="window.__handleCertImgLoad && window.__handleCertImgLoad(this)"
                onerror="window.__handleCertImgError && window.__handleCertImgError(this)"
              />
            </div>

            <!-- Floating Hover Interaction Pill -->
            <div class="cert-hover-tag">
              <span>${ui.inspectCertificate || 'DEEP INSPECT'} ↗</span>
            </div>
          </div>

          <!-- Card Header Telemetry -->
          <div class="cert-card-header">
            <div class="cert-serial-line">
              <span class="cert-serial-tag">CERT // ${(idx + 1).toString().padStart(2, '0')} // ${cert.credentialId}</span>
              <span class="cert-badge-status">${cert.status || 'VERIFIED'}</span>
            </div>
            <h3 class="cert-card-title">${cert.title}</h3>
          </div>

          <!-- Metadata Spec Grid -->
          <div class="cert-meta-grid">
            <div class="cert-meta-item">
              <span class="cert-meta-label">${ui.issuerLabel || 'ISSUER'}</span>
              <span class="cert-meta-value">${cert.issuer}</span>
            </div>
            <div class="cert-meta-item">
              <span class="cert-meta-label">${ui.yearLabel || 'PERIOD'}</span>
              <span class="cert-meta-value">${cert.issuedDate} — ${cert.expiryDate || 'LIFETIME'}</span>
            </div>
          </div>

          <!-- Description -->
          <p class="cert-card-desc">${cert.description}</p>

          <!-- Competency Skill Chips -->
          <div class="cert-skills-wrap">
            ${skillsHtml}
          </div>

          <!-- Card Actions Footer -->
          <div class="cert-card-footer">
            <button type="button" class="cert-action-btn cert-inspect-trigger" data-cert-id="${cert.id}" data-inspect-cert="${cert.id}" data-cursor-target>
              <span>${ui.inspectCertificate || 'INSPEKSI KREDENSIAL'}</span>
              <span class="btn-arrow">↗</span>
            </button>
            ${
              cert.verifyUrl
                ? `
                  <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="cert-verify-link" data-cursor-target>
                    <span>${ui.viewCredential || 'VERIFIKASI RESMI'}</span>
                    <span class="link-arrow">↗</span>
                  </a>
                `
                : ''
            }
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section id="certificates" class="section certs-section">
      <!-- Section Watermark Index -->
      <div class="section-watermark" aria-hidden="true">
        <span class="watermark-index">${certs.sectionIndex} // ${certs.sectionTitle}</span>
      </div>

      <div class="section-container">
        <!-- Section Header -->
        <header class="section-header">
          <div class="section-title-wrap">
            <span class="section-badge">// ${certs.sectionIndex} // ${certs.sectionSub}</span>
            <h2 class="section-title">${certs.headline}</h2>
            <p class="section-desc">${certs.description}</p>
          </div>
        </header>

        <!-- Category Filter Bar -->
        <div class="cert-filter-bar" role="tablist" aria-label="Filter Sertifikat">
          ${categoriesHtml}
        </div>

        <!-- Architectural Grid of Certificates -->
        <div class="certs-grid" id="certs-grid">
          ${certCardsHtml}
        </div>
      </div>

      <!-- Credential Deep-Inspect Drawer / Modal Container -->
      <div class="cert-drawer-backdrop" id="cert-drawer-backdrop" aria-hidden="true">
        <div class="cert-drawer" id="cert-drawer" role="dialog" aria-modal="true" aria-labelledby="cert-drawer-title">
          <header class="cert-drawer-header">
            <div class="cert-drawer-telemetry">
              <span id="cert-drawer-serial">CERT // INSPECTION</span>
            </div>
            <button type="button" class="cert-drawer-close" id="cert-drawer-close-btn" aria-label="Tutup Inspeksi" data-cursor-target>
              <span>${ui.closeDrawer || 'CLOSE [ESC]'}</span>
            </button>
          </header>

          <div class="cert-drawer-body" id="cert-drawer-content">
            <!-- Dynamically populated on click -->
          </div>
        </div>
      </div>
    </section>
  `;
}

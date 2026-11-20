/**
 * COMPONENT 05: GITHUB TELEMETRY & OPEN-SOURCE VAULT
 * Biophilic Architectural Minimalism × Open Source Repository Showcase
 * Identity: @HanzzSama // Haidar Rifky Andrianno
 */

export function renderGithub(data) {
  const { github } = data;
  if (!github) return '';

  const { profile, repositories, heatmap } = github;

  // Generate 52 weeks x 7 days pseudo-matrix matching the screenshot's 44 annual commits
  // Days of week: Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const weeks = 52;
  const daysPerWeek = 7;
  
  // Seed realistic commit distribution based on Hanzz's profile (44 commits distributed over 52 weeks)
  // Concentrated around Nov-Dec 2025, Jan-Feb 2026, May, Jul, Aug, Sep, Oct, Nov 2026
  const activeWeeks = [
    { week: 3, day: 2, count: 2 },
    { week: 3, day: 4, count: 3 },
    { week: 4, day: 1, count: 1 },
    { week: 8, day: 0, count: 2 },
    { week: 9, day: 4, count: 1 },
    { week: 14, day: 3, count: 2 },
    { week: 24, day: 2, count: 1 },
    { week: 33, day: 0, count: 3 },
    { week: 34, day: 4, count: 1 },
    { week: 42, day: 2, count: 2 },
    { week: 45, day: 1, count: 4 },
    { week: 46, day: 3, count: 3 },
    { week: 47, day: 0, count: 2 },
    { week: 48, day: 2, count: 5 },
    { week: 49, day: 4, count: 4 },
    { week: 50, day: 1, count: 6 },
    { week: 51, day: 3, count: 2 }
  ];

  const getCommitLevel = (w, d) => {
    const found = activeWeeks.find(item => item.week === w && item.day === d);
    if (!found) return { level: 0, count: 0 };
    if (found.count >= 5) return { level: 4, count: found.count };
    if (found.count >= 3) return { level: 3, count: found.count };
    if (found.count >= 2) return { level: 2, count: found.count };
    return { level: 1, count: found.count };
  };

  const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

  return `
    <section id="github" class="architectural-section section-github" data-reveal>
      <!-- Watermark Label -->
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${github.sectionIndex} // ${github.sectionTitle}</span>
        <span class="watermark-meta">${github.sectionSub}</span>
      </div>

      <!-- Section Intro Header -->
      <div class="github-intro" data-stagger>
        <div class="github-preamble">
          <span class="github-preamble-line"></span>
          <span>SYS.05 // SOURCE CODE REPOSITORIES</span>
          <span>//</span>
          <span>GITHUB TELEMETRY</span>
        </div>
        <h2 class="font-display">${github.headline}</h2>
        <p class="github-lead-text">${github.description}</p>
      </div>

      <!-- Profile Telemetry Node Card -->
      <div class="github-profile-monolith" data-stagger>
        <div class="github-profile-header">
          <div class="github-avatar-cluster">
            <div class="github-avatar-orbital-ring">
              <img 
                src="${profile.avatarUrl}" 
                alt="${profile.username} Avatar" 
                class="github-avatar-img"
                loading="eager"
                decoding="async"
                onerror="this.src='./src/assets/hanzz-avatar.png'; this.onerror=null;"
              />
            </div>
            <div class="github-identity-block">
              <div class="github-handle-row">
                <span class="github-handle font-display">@${profile.username}</span>
                <span class="github-pulse-badge">
                  <span class="github-pulse-dot"></span>
                  <span>ONLINE // ACTIVE</span>
                </span>
              </div>
              <p class="github-bio">${profile.bio}</p>
            </div>
          </div>

          <a href="${profile.profileUrl}" target="_blank" rel="noopener noreferrer" class="tactile-btn github-cta-btn" data-cursor-target>
            <span>${profile.actionLabel}</span>
          </a>
        </div>

        <!-- Telemetry Metrics Grid -->
        <div class="github-telemetry-row">
          ${profile.stats
            .map(
              (stat) => `
            <div class="github-telemetry-cell">
              <span class="github-telemetry-label">${stat.label}</span>
              <span class="github-telemetry-value font-display">${stat.value}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Interactive 52-Week Contribution Heatmap Matrix -->
      <div class="github-heatmap-container" data-stagger>
        <div class="heatmap-header-bar">
          <div class="heatmap-title-group">
            <span class="heatmap-icon" aria-hidden="true">■</span>
            <span class="heatmap-title font-mono">${heatmap.totalContributions}</span>
          </div>
          <div class="heatmap-year-selector font-mono">
            <span class="heatmap-year active">${heatmap.year}</span>
            <span class="heatmap-year">2025</span>
          </div>
        </div>

        <!-- Scrollable Heatmap Layout Wrapper -->
        <div class="heatmap-scrollable-content">
          <div class="heatmap-inner-layout">
            <!-- Month Labels Bar -->
            <div class="heatmap-months-row font-mono" aria-hidden="true">
              ${months.map(m => `<span>${m}</span>`).join('')}
            </div>

            <!-- Heatmap Grid Canvas / Cells -->
            <div class="heatmap-matrix-wrapper" role="region" aria-label="Contribution Activity Matrix">
              <div class="heatmap-days-legend font-mono" aria-hidden="true">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div class="heatmap-grid" id="github-heatmap-grid">
                ${Array.from({ length: weeks }, (_, w) => `
                  <div class="heatmap-week-col" data-week="${w}">
                    ${Array.from({ length: daysPerWeek }, (_, d) => {
                      const { level, count } = getCommitLevel(w, d);
                      const commitText = count > 0 ? `${count} commits` : 'No contributions';
                      return `
                        <div 
                          class="heatmap-cell level-${level}" 
                          data-week="${w}" 
                          data-day="${d}"
                          data-count="${count}"
                          data-tooltip="${commitText}"
                          tabindex="0"
                          aria-label="${commitText}"
                        ></div>
                      `;
                    }).join('')}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Heatmap Footer & Legend -->
        <div class="heatmap-footer font-mono">
          <span class="heatmap-footer-note">Telemetry node synchronized via Git DAG</span>
          <div class="heatmap-legend">
            <span>${heatmap.legend[0]}</span>
            <span class="legend-cell level-0"></span>
            <span class="legend-cell level-1"></span>
            <span class="legend-cell level-2"></span>
            <span class="legend-cell level-3"></span>
            <span class="legend-cell level-4"></span>
            <span>${heatmap.legend[4]}</span>
          </div>
        </div>
      </div>

      <!-- Pinned Repositories Monolithic Grid -->
      <div class="github-repos-section" data-stagger>
        <div class="github-repos-header">
          <h3 class="font-display">Featured Code Repositories</h3>
          <span class="font-mono" style="font-size: var(--font-mono-tag); color: var(--accent-primary);">
            CURATED ARCHIVE // 6 NODES
          </span>
        </div>

        <div class="github-repos-grid">
          ${repositories
            .map(
              (repo, idx) => `
            <article class="github-repo-card" data-stagger data-cursor-target>
              <div class="repo-card-top">
                <div class="repo-meta-tags">
                  <span class="repo-index font-mono">0${idx + 1}</span>
                  <span class="repo-visibility font-mono">PUBLIC</span>
                  <span class="repo-badge font-mono">${repo.badge}</span>
                </div>
                <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-external-link" aria-label="Open ${repo.name} on GitHub">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
              </div>

              <div class="repo-card-body">
                <h4 class="repo-title font-display">
                  <a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
                </h4>
                <p class="repo-desc">${repo.description}</p>
              </div>

              <div class="repo-card-bottom font-mono">
                <div class="repo-lang-cluster">
                  <span class="repo-lang-dot" style="background-color: ${repo.langColor};"></span>
                  <span class="repo-lang-name">${repo.language}</span>
                </div>
                <div class="repo-stats-cluster">
                  <span class="repo-stat-item" title="Stars">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>${repo.stars}</span>
                  </span>
                  <span class="repo-stat-item" title="Forks">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="18" r="3"></circle>
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="18" cy="6" r="3"></circle>
                      <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                      <path d="M12 12v3"></path>
                    </svg>
                    <span>${repo.forks}</span>
                  </span>
                </div>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}


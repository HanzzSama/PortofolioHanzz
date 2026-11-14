/**
 * COMPONENT 03: SKILLS SECTION / SYSTEMIC ARCHITECTURE MATRIX
 * Strict Anti-AI-slop: Architectural System Classification, ZERO Progress Bars
 */

export function renderSkills(data) {
  const { skills } = data;

  return `
    <section id="skills" class="architectural-section section-skills" data-reveal>
      <div class="section-watermark-label" data-parallax-slide="right" data-parallax-speed="-0.06">
        <span class="watermark-index">${skills.sectionIndex} // ${skills.sectionTitle}</span>
        <span class="watermark-meta">${skills.sectionSub}</span>
      </div>

      <div class="skills-intro" data-stagger>
        <h2 class="font-display">Taxonomy of Capabilities</h2>
        <p>${skills.description}</p>
      </div>

      <div class="skills-matrix-container">
        ${skills.matrixTiers
          .map(
            (tier, index) => `
          <div class="matrix-tier-card" data-stagger data-parallax-slide="${index % 2 === 0 ? 'up' : 'down'}" data-parallax-speed="0.04">
            <div class="tier-card-header">
              <span class="tier-id">${tier.tierId}</span>
              <span class="tier-concept">${tier.concept}</span>
            </div>
            
            <h3 class="tier-title">${tier.layerName}</h3>

            <div class="tier-nodes-list">
              ${tier.nodes
                .map(
                  (node) => `
                <div class="node-item" data-inspect-skill="${node.name}" data-spec="${node.spec}" data-tier="${tier.layerName}" data-tag="${node.tag}" data-cursor-target>
                  <div class="node-info">
                    <span class="node-name">${node.name}</span>
                    <span class="node-spec">${node.spec}</span>
                  </div>
                  <span class="node-tag-badge">${node.tag}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>
  `;
}

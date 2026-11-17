/**
 * HANZZPET COMPONENT TEMPLATE
 * Interactive AI Companion Mascot (NeuraPet Engine v2.4 Architecture)
 * Identity: HanzzPet // Digital Companion to Haidar Rifky Andrianno
 * Biophilic Architectural Minimalism × Organic Expressive Interaction
 * Control Deck: Bespoke Abstract Monolith Vector Wireframe Glyphs
 */

export function renderPet(data) {
  const { pet } = data || {};
  const t = pet || {
    name: "HanzzPet",
    statusPrefix: "SYS.PET // NOMINAL",
    defaultThought: "Halo! Aku HanzzPet, asisten AI ruang digital Haidar Rifky. Elus aku ya!",
    tips: {
      pet: "Elus HanzzPet",
      dance: "Joget Bersama",
      matcha: "Beri Matcha",
      expr: "Ganti Ekspresi Mata",
      crown: "Mahkota Royal",
      talk: "Ajak Bicara",
      sleep: "Tidur / Bangun",
      sound: "Suara On/Off",
      toggle: "Ciutkan"
    }
  };

  return `
    <div id="hanzz-pet-dock" class="hanzz-pet-dock" role="complementary" aria-label="HanzzPet Companion">
      <!-- Ambient Stage Glow -->
      <div id="pet-stage-glow" class="pet-stage-glow"></div>

      <!-- Particle Cloud for Floating Hearts, Sparkles & Matcha -->
      <div id="pet-particle-cloud" class="particle-cloud"></div>

      <!-- Floating Speech / Thought Bubble -->
      <div id="hanzz-pet-speech" class="hanzz-pet-speech font-mono">
        <span id="pet-speech-prefix" class="speech-prefix">${t.statusPrefix}</span>
        <span id="pet-speech-text" class="speech-text">${t.defaultThought}</span>
      </div>

      <!-- Interactive Pet Stage (Grabbable & Throwable) -->
      <div id="hanzz-pet-stage" class="hanzz-pet-stage" data-cursor-target tabindex="0" role="button" aria-label="Pet HanzzPet" title="Klik 1x untuk mengelus kenyal, klik 3x cepat untuk joget!">
        <!-- NeuraPet Character Body Container -->
        <div id="neurapet-body" class="neurapet-character">
          <svg id="neurapet-svg" class="pet-svg" viewBox="0 0 100 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- Royal Gold Crown Gradient -->
              <linearGradient id="crownGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F9E27D" />
                <stop offset="50%" stop-color="#E5B834" />
                <stop offset="100%" stop-color="#BD8D1E" />
              </linearGradient>

              <!-- Ambient Body Soft Gradient -->
              <radialGradient id="bodyLightGrad" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="90%" stop-color="#FFFFFF" />
                <stop offset="100%" stop-color="#F6F7F4" />
              </radialGradient>
            </defs>

            <!-- Ground Contact Shadow -->
            <ellipse id="pet-shadow" class="pet-shadow" cx="50" cy="71" rx="34" ry="4.5" />

            <!-- Ghost Mochi Body / Head (Exact Reference Path) -->
            <path
              id="neurapet-head"
              class="pet-head-path"
              d="M 50 6 C 78 6 95 18 95 39 C 95 60 78 71 50 71 C 22 71 5 60 5 39 C 5 18 22 6 50 6 Z"
              fill="url(#bodyLightGrad)"
            />

            <!-- Soft Blush Cheeks (Visible on Happy/Petting) -->
            <circle class="pet-blush" cx="24" cy="46" r="4" />
            <circle class="pet-blush" cx="76" cy="46" r="4" />

            <!-- Eyes Container with Autonomous Blink & Mouse Tracking -->
            <g class="neurapet-eyes-wrapper" id="neurapet-eyes-wrapper">
              <g class="neurapet-eyes-track" id="neurapet-eyes-track">
                <!-- Regular Oval Eyes (Default) with Organic 6-deg Splay -->
                <ellipse cx="33" cy="44" rx="5.5" ry="8" transform="rotate(6 33 44)" fill="#000000" />
                <ellipse cx="67" cy="44" rx="5.5" ry="8" transform="rotate(-6 67 44)" fill="#000000" />
              </g>
            </g>

            <!-- Royal Tectonic Crown (Floating Above Head, Centered at X=50, Y=6) -->
            <g id="pet-crown-group" class="pet-crown-group">
              <path
                class="crown-body"
                d="M 34 8 L 36 -2 L 44 4 L 50 -4 L 56 4 L 64 -2 L 66 8 Z"
                fill="url(#crownGoldGrad)"
              />
              <circle class="crown-jewel" cx="50" cy="2" r="1.5" />
              <circle class="crown-jewel" cx="39" cy="5" r="1" />
              <circle class="crown-jewel" cx="61" cy="5" r="1" />
            </g>

            <!-- ========================================================
                 THE 7 SECTION PERSONA MORPHOLOGY OVERLAYS
                 ======================================================== -->
            <!-- 1. Welcome Persona: Pure Mochi with Radar Pulse Antenna -->
            <g id="persona-welcome" class="persona-accessory persona-welcome">
              <line x1="50" y1="6" x2="50" y2="-2" stroke="var(--accent-primary)" stroke-width="1.3" stroke-linecap="round"/>
              <circle cx="50" cy="-3" r="1.5" fill="var(--accent-primary)"/>
              <path class="beacon-wave beacon-wave-1" d="M 44 -5 A 7 7 0 0 1 56 -5" stroke="var(--accent-primary)" stroke-width="1.1" stroke-linecap="round" fill="none"/>
              <path class="beacon-wave beacon-wave-2" d="M 40 -8 A 12 12 0 0 1 60 -8" stroke="var(--accent-primary)" stroke-width="0.9" stroke-linecap="round" fill="none" opacity="0.6"/>
            </g>

            <!-- 2. About Persona: Biophilic Organic Sprout & Twin Leaves -->
            <g id="persona-about" class="persona-accessory persona-about">
              <path id="sprout-stem" d="M 50 6 Q 50 1 50 -2" stroke="#588157" stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <path id="sprout-leaf-l" class="sprout-leaf-left" d="M 50 -2 C 43 -5 41 -12 47 -12 C 51 -12 51 -4 50 -2 Z" fill="#74A872" stroke="#436842" stroke-width="0.7"/>
              <path id="sprout-leaf-r" class="sprout-leaf-right" d="M 50 -2 C 57 -5 59 -12 53 -12 C 49 -12 49 -4 50 -2 Z" fill="#88C286" stroke="#436842" stroke-width="0.7"/>
              <circle id="sprout-blossom" cx="50" cy="-2" r="1.3" fill="#E9C46A" opacity="0.9"/>
            </g>

            <!-- 3. Skills Persona: Master Artisan Blueprint Monocle -->
            <g id="persona-skills" class="persona-accessory persona-skills">
              <circle cx="67" cy="44" r="12" fill="rgba(74, 144, 226, 0.12)" stroke="var(--accent-primary)" stroke-width="1.3"/>
              <circle cx="67" cy="44" r="9" stroke="var(--accent-primary)" stroke-width="0.6" stroke-dasharray="2 2" fill="none"/>
              <line x1="67" y1="33" x2="67" y2="36" stroke="var(--accent-primary)" stroke-width="1.2"/>
              <line x1="67" y1="52" x2="67" y2="55" stroke="var(--accent-primary)" stroke-width="1.2"/>
              <line x1="56" y1="44" x2="59" y2="44" stroke="var(--accent-primary)" stroke-width="1.2"/>
              <line x1="75" y1="44" x2="78" y2="44" stroke="var(--accent-primary)" stroke-width="1.2"/>
              <path d="M 79 44 C 83 44 86 49 85 54" stroke="var(--accent-primary)" stroke-width="1.1" fill="none" stroke-linecap="round"/>
            </g>

            <!-- 4. Projects Persona: Minimalist Architectural Safety Hardhat -->
            <g id="persona-projects" class="persona-accessory persona-projects">
              <path class="hardhat-body" d="M 30 7 C 30 -5 70 -5 70 7 Z" fill="#F4F1DE" stroke="#3D405B" stroke-width="1.2"/>
              <path d="M 26 7 Q 50 11 74 7" stroke="#3D405B" stroke-width="1.6" stroke-linecap="round" fill="none"/>
              <path d="M 44 -4 H 56 V 7 H 44 Z" fill="#D4AF37" opacity="0.85"/>
              <line x1="50" y1="-4" x2="50" y2="7" stroke="#3D405B" stroke-width="0.8"/>
            </g>

            <!-- 5. GitHub Persona: Cyberpunk Terminal HUD Visor -->
            <g id="persona-github" class="persona-accessory persona-github">
              <path d="M 23 37 H 77 C 78.5 37 79.5 39 79 49 C 78 54 75 55 70 55 H 30 C 25 55 22 54 21 49 C 20.5 39 21.5 37 23 37 Z" fill="rgba(16, 185, 129, 0.16)" stroke="#10B981" stroke-width="1.3"/>
              <line class="hud-scanline" x1="25" y1="46" x2="75" y2="46" stroke="#34D399" stroke-width="1" stroke-linecap="round"/>
              <rect x="26" y="40" width="3" height="1.5" fill="#10B981"/>
              <rect x="71" y="40" width="3" height="1.5" fill="#10B981"/>
            </g>

            <!-- 6. Lab Persona: 3D Holographic Polyhedron Wireframe -->
            <g id="persona-lab" class="persona-accessory persona-lab">
              <path class="wireframe-lattice" d="M 50 6 L 86 24 L 86 54 L 50 71 L 14 54 L 14 24 Z" stroke="var(--accent-primary)" stroke-width="1.2" stroke-dasharray="3 2" fill="rgba(74, 93, 78, 0.05)"/>
              <line x1="50" y1="6" x2="50" y2="71" stroke="var(--accent-primary)" stroke-width="0.9" stroke-dasharray="2 2"/>
              <line x1="14" y1="24" x2="86" y2="54" stroke="var(--accent-primary)" stroke-width="0.9" stroke-dasharray="2 2"/>
              <line x1="14" y1="54" x2="86" y2="24" stroke="var(--accent-primary)" stroke-width="0.9" stroke-dasharray="2 2"/>
              <circle cx="50" cy="6" r="1.5" fill="var(--accent-primary)"/>
              <circle cx="86" cy="24" r="1.5" fill="var(--accent-primary)"/>
              <circle cx="86" cy="54" r="1.5" fill="var(--accent-primary)"/>
              <circle cx="50" cy="71" r="1.5" fill="var(--accent-primary)"/>
              <circle cx="14" cy="54" r="1.5" fill="var(--accent-primary)"/>
              <circle cx="14" cy="24" r="1.5" fill="var(--accent-primary)"/>
            </g>

            <!-- 7. Another Persona: Zen 432Hz Acoustic Floating Halo -->
            <g id="persona-another" class="persona-accessory persona-another">
              <ellipse class="zen-halo-outer" cx="50" cy="-3" rx="20" ry="5.5" stroke="#60A5FA" stroke-width="1.2" fill="none" stroke-dasharray="4 2"/>
              <ellipse class="zen-halo-inner" cx="50" cy="0" rx="14" ry="4" stroke="var(--accent-primary)" stroke-width="1" fill="none" opacity="0.6"/>
              <circle cx="36" cy="-3" r="1.2" fill="#60A5FA"/>
              <circle cx="64" cy="-3" r="1.2" fill="#60A5FA"/>
            </g>
          </svg>
        </div>
      </div>

      <!-- Mini Action Toolbar with Abstract Monolith Architectural Icons -->
      <nav id="hanzz-pet-toolbar" class="hanzz-pet-toolbar" aria-label="HanzzPet Actions">
        <!-- 1. Pet / Touch: Abstract Monolith Spark Prism -->
        <button id="pet-btn-pet" class="pet-action-btn" data-tip="${t.tips.pet || 'Elus'}" aria-label="Pet">
          <svg class="monolith-icon" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L9.8 6.2L15 8L9.8 9.8L8 15L6.2 9.8L1 8L6.2 6.2L8 1Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
          </svg>
        </button>

        <!-- 2. Dynamic Contextual Action: Mutates per Active Section -->
        <button id="pet-btn-context" class="pet-action-btn pet-context-btn active" data-tip="${t.tips.context_welcome || 'Beacon'}" aria-label="Special Action">
          <svg id="pet-context-icon" class="monolith-icon" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.3"/>
            <path d="M8 1V3M8 13V15M1 8H3M13 8H15" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- 3. Dance: Abstract Kinetic Rhythm Pillars -->
        <button id="pet-btn-dance" class="pet-action-btn" data-tip="${t.tips.dance || 'Joget'}" aria-label="Dance">
          <svg class="monolith-icon" viewBox="0 0 16 16" fill="none">
            <path d="M3 13V7M6.5 14V3M10 13V5M13.5 14V8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <circle cx="6.5" cy="3" r="1" fill="currentColor"/>
          </svg>
        </button>

        <!-- 3. Matcha: Abstract Energy Vessel / Intake Spire -->
        <button id="pet-btn-matcha" class="pet-action-btn" data-tip="${t.tips.matcha || 'Matcha'}" aria-label="Feed Matcha">
          <svg class="monolith-icon" viewBox="0 0 16 16" fill="none">
            <path d="M3 6.5C3 6.5 3 13 8 13C13 13 13 6.5 13 6.5H3Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <path d="M6 3.5C6 2.5 7 2 8 2C9 2 10 2.5 10 3.5M2 14H14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- 4. Eye Expressions: Abstract Iris Aperture Monolith -->
        <button id="pet-btn-expr" class="pet-action-btn" data-tip="${t.tips.expr || 'Ekspresi'}" aria-label="Cycle Expression">
          <svg class="monolith-icon" viewBox="0 0 16 16" fill="none">
            <path d="M1.5 8C3 4.5 5.5 3 8 3C10.5 3 13 4.5 14.5 8C13 11.5 10.5 13 8 13C5.5 13 3 11.5 1.5 8Z" stroke="currentColor" stroke-width="1.3"/>
            <ellipse cx="8" cy="8" rx="2.5" ry="3.5" fill="currentColor"/>
          </svg>
        </button>

        <!-- 5. Royal Crown: Abstract 3-Peak Tectonic Chevron Crown -->
        <button id="pet-btn-royal" class="pet-action-btn" data-tip="${t.tips.crown || 'Mahkota'}" aria-label="Royal Crown">
          <svg class="monolith-icon icon-crown" viewBox="0 0 16 16" fill="none">
            <path d="M2.5 12.5L3.5 5.5L6.5 9L8 3.5L9.5 9L12.5 5.5L13.5 12.5H2.5Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <circle cx="8" cy="12.5" r="0.9" fill="currentColor"/>
          </svg>
        </button>

        <!-- 6. Dialogue: Abstract Terminal Quote Node -->
        <button id="pet-btn-talk" class="pet-action-btn" data-tip="${t.tips.talk || 'Bicara'}" aria-label="Talk">
          <svg class="monolith-icon" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2.5" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.3"/>
            <path d="M5.5 11.5L4 14L7.5 11.5M5.5 6H7M9 6H10.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- 7. Sleep: Abstract Orbital Crescent Monolith -->
        <button id="pet-btn-sleep" class="pet-action-btn" data-tip="${t.tips.sleep || 'Tidur'}" aria-label="Sleep / Wake">
          <svg class="monolith-icon icon-moon" viewBox="0 0 16 16" fill="none">
            <path d="M12.5 9.5C12.5 12.8 9.8 14.5 7 14.5C4 14.5 2 12 2 8.5C2 5.5 4 3 6.5 2.5C6 3.5 5.8 4.8 6 6C6.5 8.2 8.3 10 10.5 10.2C11.2 10.2 11.9 10 12.5 9.5Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <circle cx="12.5" cy="3.5" r="1" fill="currentColor"/>
          </svg>
        </button>

        <!-- 8. Sound: Abstract Acoustic Resonance Waveform -->
        <button id="pet-btn-sound" class="pet-action-btn active" data-tip="${t.tips.sound || 'Suara'}" aria-label="Toggle Sound">
          <svg id="pet-sound-on-svg" class="monolith-icon icon-sound-on" viewBox="0 0 16 16" fill="none">
            <path d="M2 6H4.5L8 3V13L4.5 10H2V6Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            <path d="M10.5 5.5C11.5 6.3 12 7.1 12 8C12 8.9 11.5 9.7 10.5 10.5M12.5 3.5C14 4.8 14.8 6.3 14.8 8C14.8 9.7 14 11.2 12.5 12.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
          <svg id="pet-sound-off-svg" class="monolith-icon icon-sound-off" viewBox="0 0 16 16" fill="none" style="display:none;">
            <path d="M2 6H4.5L8 3V13L4.5 10H2V6ZM11 6L14 10M14 6L11 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- 9. Minimize: Abstract Structural Hairline Bar -->
        <button id="pet-btn-minimize" class="pet-action-btn" data-tip="${t.tips.toggle || 'Ciutkan'}" aria-label="Minimize Companion">
          <svg class="monolith-icon" viewBox="0 0 16 16" fill="none">
            <path id="pet-min-path" d="M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </nav>
    </div>
  `;
}

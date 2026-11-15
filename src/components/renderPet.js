/**
 * HANZZPET COMPONENT TEMPLATE
 * Minimalist Mochi Squircle Resident Companion SVG & Control Toolbar
 * Identity: HanzzPet // Companion to Haidar Rifky Andrianno
 */

export function renderPet(data) {
  const { pet } = data || {};
  const t = pet || {
    name: "HanzzPet",
    statusPrefix: "SYS.PET // NOMINAL",
    defaultThought: "Menyelaraskan koordinat Semarang... [6.9667° S]",
    tips: {
      pet: "Elus / Pet",
      crown: "Mahkota Royal",
      matcha: "Beri Matcha",
      zoomies: "Zoomies!",
      wisdom: "Celoteh Arsitektur",
      sleep: "Tidur / Bangun",
      toggle: "Ciutkan"
    }
  };

  return `
    <div id="hanzz-pet-dock" class="hanzz-pet-dock" role="complementary" aria-label="HanzzPet Companion">
      <!-- Floating Speech / Thought Bubble -->
      <div id="hanzz-pet-speech" class="hanzz-pet-speech font-mono">
        <span id="pet-speech-prefix" class="speech-prefix">${t.statusPrefix}</span>
        <span id="pet-speech-text" class="speech-text">${t.defaultThought}</span>
      </div>

      <!-- Interactive Pet Stage (Grabbable & Throwable) -->
      <div id="hanzz-pet-stage" class="hanzz-pet-stage" data-cursor-target tabindex="0" role="button" aria-label="Pet HanzzPet">
        <svg class="hanzz-pet-svg" viewBox="0 0 128 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Royal Gold Crown Gradient -->
            <linearGradient id="crownGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F9E27D" />
              <stop offset="50%" stop-color="#E5B834" />
              <stop offset="100%" stop-color="#BD8D1E" />
            </linearGradient>

            <!-- Ambient Body Gradient -->
            <radialGradient id="bodyLightGrad" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="90%" stop-color="#FFFFFF" />
              <stop offset="100%" stop-color="#F7F8F5" />
            </radialGradient>
          </defs>

          <!-- Ground Contact Shadow -->
          <ellipse id="pet-shadow" class="pet-shadow" cx="64.5" cy="88" rx="38" ry="4.5" />

          <!-- Main Mochi Squircle Body & Face Group -->
          <g id="pet-body-group" class="pet-body-group">
            <!-- Exact Pill Squircle Body Matching Reference Image (Aspect ~1.39) -->
            <path
              id="pet-body-path"
              class="pet-body-path"
              d="M 46 12 L 84 12 C 102 12, 114 26, 114 48 C 114 70, 102 83, 84 83 L 46 83 C 28 83, 15 70, 15 48 C 15 26, 28 12, 46 12 Z"
              fill="url(#bodyLightGrad)"
            />

            <!-- Soft Blush Cheeks (Subtle on Happy/Petting) -->
            <circle class="pet-blush" cx="32" cy="54" r="4.5" />
            <circle class="pet-blush" cx="97" cy="54" r="4.5" />

            <!-- Expressive Eyes Container -->
            <g id="pet-eyes-container" class="pet-eyes-container">
              <g id="pet-eyes-wrapper" class="pet-eyes-wrapper">
                <!-- Neutral / Active Deep Black Oval Eyes (Exact Proportion & Placement) -->
                <ellipse id="pet-eye-left" class="pet-eye-pupil" cx="46" cy="49" rx="6" ry="8.5" />
                <ellipse id="pet-eye-right" class="pet-eye-pupil" cx="83" cy="49" rx="6" ry="8.5" />

                <!-- Happy Crescent Eyes (Visible on Purr/Happy) -->
                <path class="pet-eye-happy" d="M 40 49 Q 46 40 52 49" />
                <path class="pet-eye-happy" d="M 77 49 Q 83 40 89 49" />

                <!-- Sleepy Eye Slits (Visible on Nap) -->
                <path class="pet-eye-sleepy" d="M 39 49 Q 46 52 53 49" />
                <path class="pet-eye-sleepy" d="M 76 49 Q 83 52 90 49" />
              </g>
            </g>

            <!-- Royal Tectonic Crown (Floating Above Head) -->
            <g id="pet-crown-group" class="pet-crown-group">
              <!-- Crown Base & 3 Peaks Centered at X=64.5 -->
              <path
                class="crown-body"
                d="M 48.5 14 L 50.5 4 L 58.5 10 L 64.5 2 L 70.5 10 L 78.5 4 L 80.5 14 Z"
                fill="url(#crownGoldGrad)"
              />
              <!-- Emerald Center Jewel -->
              <circle class="crown-jewel" cx="64.5" cy="8" r="1.5" />
              <!-- Diamond side jewels -->
              <circle class="crown-jewel" cx="53.5" cy="11" r="1" />
              <circle class="crown-jewel" cx="75.5" cy="11" r="1" />
            </g>
          </g>
        </svg>
      </div>

      <!-- Mini Action Toolbar -->
      <nav id="hanzz-pet-toolbar" class="hanzz-pet-toolbar" aria-label="HanzzPet Actions">
        <button id="pet-btn-royal" class="pet-action-btn" data-tip="${t.tips.crown}" aria-label="Royal Crown">
          <span>👑</span>
        </button>
        <button id="pet-btn-matcha" class="pet-action-btn" data-tip="${t.tips.matcha}" aria-label="Feed Matcha">
          <span>🍵</span>
        </button>
        <button id="pet-btn-zoomies" class="pet-action-btn" data-tip="${t.tips.zoomies}" aria-label="Zoomies">
          <span>⚡</span>
        </button>
        <button id="pet-btn-wisdom" class="pet-action-btn" data-tip="${t.tips.wisdom}" aria-label="Wisdom Dialogue">
          <span>💬</span>
        </button>
        <button id="pet-btn-sleep" class="pet-action-btn" data-tip="${t.tips.sleep}" aria-label="Sleep / Wake">
          <span>💤</span>
        </button>
        <button id="pet-btn-minimize" class="pet-action-btn" data-tip="${t.tips.toggle}" aria-label="Minimize Companion">
          <span>–</span>
        </button>
      </nav>
    </div>
  `;
}


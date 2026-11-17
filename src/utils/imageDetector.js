/**
 * PROJECT IMAGE AUTO-DETECTION & RESOLVER ENGINE
 * Resolves verified project preview images without blind cascading network 404 requests.
 * Format support: webp, png, jpg, jpeg, gif, svg
 * Identity: Haidar Rifky Andrianno // HanzzSama 2026
 */

export const SUPPORTED_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'gif', 'svg'];

/**
 * Verified repository assets registry for project preview images.
 * Keeps network calls deterministic and prevents console 404 waterfalls.
 */
export const KNOWN_PROJECT_IMAGES = [
  './src/assets/projects/pmb-itesa-new.png',
  './src/assets/projects/kalkulator-mathicalc.png',
  './src/assets/projects/neura-ai.png'
];

/**
 * Convert string to clean URL-friendly slug
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
}

/**
 * Resolves a valid image path for a given project.
 * Checks explicit project image property first, then matches against known assets.
 * Returns null if no verified image exists, allowing immediate blueprint fallback.
 * @param {Object} proj - Project data object
 * @returns {string|null} Resolved image path or null
 */
export function resolveProjectImage(proj) {
  if (!proj) return null;

  // 1. Explicit image property if provided (e.g. in portfolioData or admin storage)
  if (proj.image && typeof proj.image === 'string' && proj.image.trim()) {
    return proj.image.trim();
  }

  // 2. Derive potential slugs
  const titleSlug = slugify(proj.title);
  const baseTitleSlug = slugify(proj.title.replace(/\b20\d{2}\b/g, ''));
  const idSlug = proj.id ? slugify(proj.id) : '';

  const slugs = Array.from(new Set([titleSlug, baseTitleSlug, idSlug].filter(Boolean)));

  // 3. Match against verified known project images
  for (const known of KNOWN_PROJECT_IMAGES) {
    const knownLower = known.toLowerCase();
    for (const slug of slugs) {
      if (knownLower.includes(`/${slug}.`) || knownLower.includes(`${slug}.`)) {
        return known;
      }
    }
  }

  return null;
}

/**
 * Generate candidate image paths for compatibility.
 * Returns single verified image or empty array.
 * @param {Object} proj - Project data object
 * @returns {string[]}
 */
export function getProjectImageCandidates(proj) {
  const resolved = resolveProjectImage(proj);
  return resolved ? [resolved] : [];
}

/**
 * Global client-side fallback handler for project preview images.
 * Installed onto window for inline onload/onerror handling.
 */
export function initProjectImageDetector() {
  if (typeof window === 'undefined') return;

  window.__handleProjectImgError = function (imgEl) {
    if (!imgEl) return;
    fallbackToNonImage(imgEl);
  };

  window.__handleProjectImgLoad = function (imgEl) {
    if (!imgEl) return;
    const panel = imgEl.closest('.project-blueprint-panel');
    const viewport = imgEl.closest('.project-preview-viewport');
    if (panel) {
      panel.classList.add('has-active-image');
      panel.classList.remove('has-no-image');
    }
    if (viewport) {
      viewport.classList.add('has-active-image');
      viewport.classList.remove('has-no-image');
    }
    imgEl.style.opacity = '1';
    imgEl.style.visibility = 'visible';
  };

  function fallbackToNonImage(imgEl) {
    imgEl.style.display = 'none';
    const panel = imgEl.closest('.project-blueprint-panel');
    const viewport = imgEl.closest('.project-preview-viewport');
    if (panel) {
      panel.classList.remove('has-active-image');
      panel.classList.add('has-no-image');
    }
    if (viewport) {
      viewport.classList.remove('has-active-image');
      viewport.classList.add('has-no-image');
    }
  }
}

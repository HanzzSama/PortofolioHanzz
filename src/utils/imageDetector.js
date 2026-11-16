/**
 * PROJECT IMAGE AUTO-DETECTION & CASCADE FALLBACK ENGINE
 * Generates candidate paths based on project slug & handles client-side probing
 * Format support: *nama-project*.[webp|png|jpg|jpeg|gif|svg]
 */

export const SUPPORTED_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg', 'gif', 'svg'];

/**
 * Convert string to clean URL-friendly slug
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
 * Generate prioritized candidate image paths for a given project
 * @param {Object} proj - Project data object
 * @returns {string[]} Array of candidate image URL paths
 */
export function getProjectImageCandidates(proj) {
  const candidates = [];

  // 1. Explicit image property if provided in portfolioData
  if (proj.image) {
    candidates.push(proj.image);
  }

  // 2. Slug from title
  const titleSlug = slugify(proj.title);
  // 3. Short slug without year (e.g. pmb-itesa-new instead of pmb-itesa-new-2026)
  const baseTitleSlug = slugify(proj.title.replace(/\b20\d{2}\b/g, ''));
  // 4. Project ID slug (e.g. proj-01)
  const idSlug = proj.id ? slugify(proj.id) : '';

  const slugs = Array.from(new Set([titleSlug, baseTitleSlug, idSlug].filter(Boolean)));

  const directories = ['./src/assets/projects/', './src/assets/'];

  directories.forEach((dir) => {
    slugs.forEach((slug) => {
      SUPPORTED_EXTENSIONS.forEach((ext) => {
        const path = `${dir}${slug}.${ext}`;
        if (!candidates.includes(path)) {
          candidates.push(path);
        }
      });
    });
  });

  return candidates;
}

/**
 * Global client-side fallback handler for project preview images
 * Installed onto window for seamless inline onerror integration
 */
export function initProjectImageDetector() {
  if (typeof window === 'undefined') return;

  window.__handleProjectImgError = function (imgEl) {
    if (!imgEl) return;
    try {
      const candidatesRaw = imgEl.getAttribute('data-candidates');
      if (!candidatesRaw) {
        fallbackToNonImage(imgEl);
        return;
      }
      const candidates = JSON.parse(candidatesRaw);
      let nextIdx = parseInt(imgEl.getAttribute('data-candidate-idx') || '0', 10) + 1;

      if (Array.isArray(candidates) && nextIdx < candidates.length) {
        imgEl.setAttribute('data-candidate-idx', String(nextIdx));
        imgEl.src = candidates[nextIdx];
      } else {
        fallbackToNonImage(imgEl);
      }
    } catch (e) {
      fallbackToNonImage(imgEl);
    }
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



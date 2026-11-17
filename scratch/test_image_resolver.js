import { portfolioData } from '../src/data/portfolioData.js';
import { resolveProjectImage } from '../src/utils/imageDetector.js';

console.log('Testing image resolution for all portfolio projects:');
portfolioData.projects.items.forEach((p, idx) => {
  const resolved = resolveProjectImage(p);
  console.log(`[${idx + 1}] ID: ${p.id} | Title: "${p.title}" -> Image: ${resolved ? resolved : '(No Image - Vector Blueprint Active)'}`);
});


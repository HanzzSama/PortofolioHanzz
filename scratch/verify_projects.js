import { getPortfolioData } from '../src/data/portfolioData.js';
import { renderProjects } from '../src/components/renderProjects.js';

const data = getPortfolioData('id');
const pHtml = renderProjects(data);
const count = (pHtml.match(/project-architectural-card/g) || []).length;
console.log('Total project cards rendered in HTML:', count);
data.projects.items.forEach((p, i) => {
  console.log(`${i+1}. [${p.code}] ${p.title} (${p.year}) - ${p.category}`);
});

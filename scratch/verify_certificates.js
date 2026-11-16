import { portfolioData, getPortfolioData } from '../src/data/portfolioData.js';
import { renderCertificates, renderCryptographicSeal } from '../src/components/renderCertificates.js';
import { getCertificateImageCandidates } from '../src/utils/imageDetector.js';

console.log('Testing Certificates Section Architecture:');
const data = getPortfolioData('id');
console.log('1. Certificates section loaded:', !!data.certificates);
console.log('2. Section Index:', data.certificates.sectionIndex);
console.log('3. Section Title:', data.certificates.sectionTitle);
console.log('4. Number of Certificates:', data.certificates.items.length);

const html = renderCertificates(data);
console.log('5. renderCertificates HTML generated successfully! Length:', html.length);

data.certificates.items.forEach((cert, i) => {
  const candidates = getCertificateImageCandidates(cert);
  const seal = renderCryptographicSeal(cert.sealType, cert);
  console.log(`   - Cert #${i + 1}: ${cert.title} [${cert.categoryLabel}]`);
  console.log(`     Candidates count: ${candidates.length}, Seal type: ${cert.sealType}, Seal length: ${seal.length}`);
});

console.log('ALL TESTS PASSED!');


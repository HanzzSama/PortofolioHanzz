import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'scratch') return;
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (/\.(html|js|css|json)$/.test(file)) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('.');

// Rules from SKILL.md
// Rule 7: AI vocab: additionally, crucial, delve, enhance, foster, landscape, pivotal, showcase, testament, underscore, vibrant
// Indonesian equivalents: selain itu/tambahan lagi, krusial, menyelami, meningkatkan/memperkaya (in AI sense), membina/memupuk, lanskap (metaphor), penting/sentral, menampilkan/memamerkan (showcase), bukti nyata (testament), menggarisbawahi (underscore), dinamis/vibrant (overused)
// Rule 8: Say "is" or "has", not "serves as", "stands as", "boasts", "features" (berfungsi sebagai, hadir sebagai, menawarkan fitur, menyajikan)
// Rule 9: "not just X, but Y" / "bukan hanya X, tetapi Y" / "tidak hanya X, tapi Y"
// Rule 10: Don't force ideas into threes
// Rule 12: "from X to Y" / "dari X hingga Y"
// Rule 13: em dashes, en dashes, hyphens as dashes, parentheses replacing punctuation
// Rule 14: colon mid-sentence connector
// Rule 15: bold every proper noun/acronym
// Rule 16: bold label and colon restating line
// Rule 17: sentence case headings
// Rule 18: decorative emojis
// Rule 19: straight quotes (curly quotes “ ” ‘ ’)
// Rule 20: chatbot phrases
// Rule 22: praise/agreement openers
// Rule 23: filler ("in order to", "untuk tujuan", "perlu dicatat bahwa")
// Rule 26: abstract metaphor nouns: substrate, wedge, vector, nexus, primitive, harness, surface, scaffolding, paradigm, ratchet, north star, flywheel (biosfer, ekosistem, matriks if abstract)
// Rule 31: "utilize"/"leverage" / "memanfaatkan"

console.log('Total files to scan:', files.length);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    // Rule 13: em dash / en dash
    if (/[—–]/.test(line)) {
      console.log(`[Rule 13] ${file}:${idx + 1} -> ${trimmed.slice(0, 90)}`);
    }

    // Rule 18: emojis
    if (/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u.test(line)) {
      // Exclude math or layout symbols if legitimate
      console.log(`[Rule 18] ${file}:${idx + 1} -> ${trimmed.slice(0, 90)}`);
    }

    // Rule 19: curly quotes
    if (/[“”‘’]/.test(line)) {
      console.log(`[Rule 19] ${file}:${idx + 1} -> ${trimmed.slice(0, 90)}`);
    }

    // Rule 9: bukan hanya ... tetapi ...
    if (/bukan hanya|tidak hanya/i.test(line) && /tetapi|tapi|namun/i.test(line)) {
      console.log(`[Rule 9] ${file}:${idx + 1} -> ${trimmed.slice(0, 90)}`);
    }

    // Rule 8: berfungsi sebagai / hadir sebagai
    if (/berfungsi sebagai|hadir sebagai|menjadi bukti/i.test(line)) {
      console.log(`[Rule 8] ${file}:${idx + 1} -> ${trimmed.slice(0, 90)}`);
    }
  });
}


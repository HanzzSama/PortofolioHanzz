import fs from 'fs';

const files = fs.readdirSync('src/components').map(f => 'src/components/' + f);

console.log('Checking components for hardcoded Indonesian strings...\n');

const indonesianKeywords = ['Tahun di', 'Lihat ', 'Buka ', 'Unduh ', 'Selengkapnya', 'Salin ', 'Hubungi '];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    indonesianKeywords.forEach(kw => {
      if (l.includes(kw)) {
        console.log(`${f}:${idx + 1} -> ${l.trim()}`);
      }
    });
  });
});


import fs from 'fs';

let content = fs.readFileSync('src/data/translations.js', 'utf8');

const replacements = [
  ['"sectionTitle": "TENTANG SAYA"', '"sectionTitle": "Tentang saya"'],
  ['"sectionTitle": "KEAHLIAN & KOMPETENSI"', '"sectionTitle": "Keahlian dan kompetensi"'],
  ['"sectionTitle": "PROYEK KARYA"', '"sectionTitle": "Proyek karya"'],
  ['"sectionTitle": "REFLEKSI & CATATAN KREATIF"', '"sectionTitle": "Refleksi dan catatan kreatif"'],
  ['"sectionTitle": "GIT TELEMETRY & VAULT"', '"sectionTitle": "Telemetri dan repositori Git"'],
  ['"sectionTitle": "SUASANA & CUACA"', '"sectionTitle": "Suasana dan cuaca"'],
  ['"sectionTitle": "ABOUT ME"', '"sectionTitle": "About me"'],
  ['"sectionTitle": "SKILLS & COMPETENCIES"', '"sectionTitle": "Skills and competencies"'],
  ['"sectionTitle": "PORTFOLIO PROJECTS"', '"sectionTitle": "Portfolio projects"'],
  ['"sectionTitle": "REFLECTIONS & CREATIVE NOTES"', '"sectionTitle": "Reflections and creative notes"'],
  ['"sectionTitle": "ÜBER MICH"', '"sectionTitle": "Über mich"'],
  ['"sectionTitle": "FÄHIGKEITEN & TOOLS"', '"sectionTitle": "Fähigkeiten und Tools"'],
  ['"sectionTitle": "PROJEKTE"', '"sectionTitle": "Projekte"'],
  ['"sectionTitle": "KREATIVE NOTIZEN"', '"sectionTitle": "Kreative Notizen"']
];

replacements.forEach(([target, rep]) => {
  content = content.replaceAll(target, rep);
});

fs.writeFileSync('src/data/translations.js', content, 'utf8');
console.log('Successfully updated sectionTitle in translations.js');


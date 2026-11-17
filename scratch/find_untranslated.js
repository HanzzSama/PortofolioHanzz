import { translations } from '../src/data/translations.js';

const langs = ['en', 'zh', 'ja', 'de'];

function checkIndonesianWords(str) {
  // Common Indonesian grammatical words
  const indonesianWords = [
    'yang', 'dan', 'di', 'dari', 'untuk', 'dengan', 'saya', 'ini', 'ke', 'pada', 
    'adalah', 'sebagai', 'secara', 'serta', 'dapat', 'oleh', 'akan', 'atau',
    'kami', 'mereka', 'sudah', 'telah', 'bisa', 'lebih', 'tentang', 'membuat',
    'belajar', 'pengalaman', 'karya', 'rancangan', 'antarmuka', 'pengguna'
  ];
  if (typeof str !== 'string') return false;
  const words = str.toLowerCase().split(/[\s,\.\/\(\)\[\]\:\;\-\_]+/);
  return indonesianWords.some(w => words.includes(w));
}

langs.forEach(lang => {
  console.log(`\n================== CHECKING INDONESIAN TEXT IN ${lang.toUpperCase()} ==================`);
  let matches = 0;

  function traverse(obj, path) {
    if (!obj) return;
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      const curPath = path ? `${path}.${key}` : key;
      if (typeof val === 'string') {
        if (checkIndonesianWords(val)) {
          matches++;
          console.log(`[${lang}] Untranslated Indonesian at ${curPath}:`);
          console.log(`   "${val.slice(0, 90)}..."\n`);
        }
      } else if (typeof val === 'object' && !Array.isArray(val)) {
        traverse(val, curPath);
      } else if (Array.isArray(val)) {
        val.forEach((item, idx) => {
          if (typeof item === 'string' && checkIndonesianWords(item)) {
            matches++;
            console.log(`[${lang}] Untranslated Indonesian at ${curPath}[${idx}]: "${item.slice(0, 90)}..."\n`);
          } else if (typeof item === 'object') {
            traverse(item, `${curPath}[${idx}]`);
          }
        });
      }
    }
  }

  traverse(translations[lang], '');
  console.log(`Total Indonesian text matches in ${lang}: ${matches}`);
});


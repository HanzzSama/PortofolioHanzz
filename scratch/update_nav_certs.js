import fs from 'fs';

let code = fs.readFileSync('src/data/translations.js', 'utf8');
code = code.replaceAll('"projects": "04.PRJ",', '"projects": "04.PRJ",\n      "certificates": "04.CRT",');
fs.writeFileSync('src/data/translations.js', code, 'utf8');
console.log('Successfully updated translations.js nav!');


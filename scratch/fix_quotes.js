import fs from 'fs';

let c = fs.readFileSync('src/data/translations.js', 'utf8');
c = c.replaceAll('’', "'").replaceAll('‘', "'").replaceAll('“', '"').replaceAll('”', '"');
c = c.replaceAll(' – ', ', ');
fs.writeFileSync('src/data/translations.js', c, 'utf8');
console.log('Fixed quotes and dashes in translations.js');


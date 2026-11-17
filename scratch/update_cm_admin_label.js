import fs from 'fs';

import('../src/data/translations.js').then(mod => {
  const t = mod.translations;

  const adminLabels = {
    id: "Command Prompt Admin",
    en: "Command Prompt (Admin)",
    zh: "命令提示符 (管理员)",
    ja: "コマンドプロンプト (管理者)",
    de: "Eingabeaufforderung (Admin)"
  };

  for (const lang of ['id', 'en', 'zh', 'ja', 'de']) {
    if (t[lang].contextMenu) {
      t[lang].contextMenu.adminTerminal = adminLabels[lang];
    }
  }

  const outStr = 'export const translations = ' + JSON.stringify(t, null, 2) + ';\n';
  fs.writeFileSync('src/data/translations.js', outStr, 'utf8');
  console.log('Successfully added adminTerminal to contextMenu translations!');
});


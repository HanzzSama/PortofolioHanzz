import { translations } from '../src/data/translations.js';
import { portfolioData } from '../src/data/portfolioData.js';

const langs = ['en', 'zh', 'ja', 'de'];

console.log('=== AUDIT TRANSLATIONS.JS ===\n');

for (const lang of langs) {
  console.log(`\n--- LANGUAGE: ${lang.toUpperCase()} ---`);
  const t = translations[lang];

  // 1. Check garden notes content
  for (const noteId of ['note-01', 'note-02', 'note-03']) {
    const note = t.another?.gardenNotes?.[noteId];
    if (!note || !note.content) {
      console.log(`[${lang}] another.gardenNotes.${noteId}.content is MISSING!`);
    }
  }

  // 2. Check projects deepDive
  if (t.projects?.items) {
    Object.keys(t.projects.items).forEach(pId => {
      const p = t.projects.items[pId];
      if (!p.deepDive) {
        console.log(`[${lang}] projects.items.${pId}.deepDive is MISSING!`);
      } else {
        if (!p.deepDive.problem) console.log(`[${lang}] projects.items.${pId}.deepDive.problem is MISSING!`);
        if (!p.deepDive.solution) console.log(`[${lang}] projects.items.${pId}.deepDive.solution is MISSING!`);
      }
    });
  }

  // 3. Check about timeline
  if (t.about?.timeline) {
    t.about.timeline.forEach((item, idx) => {
      if (!item.role || !item.description) {
        console.log(`[${lang}] about.timeline[${idx}] missing role or description`);
      }
    });
  } else {
    console.log(`[${lang}] about.timeline is MISSING!`);
  }

  // 4. Check about stats
  if (!t.about?.stats) {
    console.log(`[${lang}] about.stats is MISSING!`);
  }

  // 5. Check pet dialogues / thoughts
  if (!t.pet?.defaultThought) {
    console.log(`[${lang}] pet.defaultThought is MISSING!`);
  }

  // 6. Check contextMenu / common UI if any
  // Check ui keys
  const idUiKeys = Object.keys(translations.id.ui || {});
  const langUiKeys = Object.keys(t.ui || {});
  const missingUiKeys = idUiKeys.filter(k => !langUiKeys.includes(k));
  if (missingUiKeys.length > 0) {
    console.log(`[${lang}] missing UI keys:`, missingUiKeys);
  }
}

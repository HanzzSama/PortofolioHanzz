import { portfolioData } from '../src/data/portfolioData.js';
import { translations } from '../src/data/translations.js';

console.log('=== COMPARING PORTFOLIODATA.JS AGAINST TRANSLATIONS.JS ===\n');

// 1. Meta
console.log('--- META ---');
['role', 'subRole', 'experienceYears', 'photoCaption', 'location'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].meta?.[k]) {
      console.log(`[${lang}] meta.${k} missing in translations`);
    }
  });
});

if (portfolioData.meta.institution) {
  ['status', 'period'].forEach(k => {
    ['en', 'zh', 'ja', 'de'].forEach(lang => {
      if (!translations[lang].meta?.institution?.[k]) {
        console.log(`[${lang}] meta.institution.${k} missing in translations`);
      }
    });
  });
}

if (portfolioData.meta.availability) {
  ['status', 'badge'].forEach(k => {
    ['en', 'zh', 'ja', 'de'].forEach(lang => {
      if (!translations[lang].meta?.availability?.[k]) {
        console.log(`[${lang}] meta.availability.${k} missing in translations`);
      }
    });
  });
}

// 2. Welcome
console.log('\n--- WELCOME ---');
['architecturalPreamble', 'leadParagraph'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].welcome?.[k]) {
      console.log(`[${lang}] welcome.${k} missing in translations`);
    }
  });
});

// 3. About
console.log('\n--- ABOUT ---');
['sectionTitle', 'sectionSub', 'ethosTitle', 'photoCaption'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].about?.[k]) {
      console.log(`[${lang}] about.${k} missing in translations`);
    }
  });
});

// 4. Skills
console.log('\n--- SKILLS ---');
['sectionTitle', 'sectionSub', 'headline', 'description'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].skills?.[k]) {
      console.log(`[${lang}] skills.${k} missing in translations`);
    }
  });
});

// 5. Projects
console.log('\n--- PROJECTS ---');
['sectionTitle', 'sectionSub', 'headline', 'description'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].projects?.[k]) {
      console.log(`[${lang}] projects.${k} missing in translations`);
    }
  });
});
if (portfolioData.projects.ui) {
  Object.keys(portfolioData.projects.ui).forEach(k => {
    ['en', 'zh', 'ja', 'de'].forEach(lang => {
      if (!translations[lang].projects?.ui?.[k]) {
        console.log(`[${lang}] projects.ui.${k} missing in translations`);
      }
    });
  });
}

// 6. Another / Garden Notes
console.log('\n--- ANOTHER ---');
portfolioData.another.gardenNotes.forEach(note => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    const tNote = translations[lang].another?.gardenNotes?.[note.id];
    if (!tNote) {
      console.log(`[${lang}] another.gardenNotes.${note.id} missing completely`);
    } else {
      if (!tNote.title) console.log(`[${lang}] another.gardenNotes.${note.id}.title missing`);
      if (!tNote.excerpt) console.log(`[${lang}] another.gardenNotes.${note.id}.excerpt missing`);
      if (!tNote.readTime) console.log(`[${lang}] another.gardenNotes.${note.id}.readTime missing`);
      if (!tNote.content) console.log(`[${lang}] another.gardenNotes.${note.id}.content missing`);
    }
  });
});

// 7. Kinetic Lab
console.log('\n--- KINETIC LAB ---');
['title', 'subtitle', 'description'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].kineticLab?.[k]) {
      console.log(`[${lang}] kineticLab.${k} missing in translations`);
    }
  });
});

// 8. Weather
console.log('\n--- WEATHER ---');
['sectionTitle', 'sectionSub', 'headline', 'description', 'topologyBadge'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].weather?.[k]) {
      console.log(`[${lang}] weather.${k} missing in translations`);
    }
  });
});

// 9. Pet
console.log('\n--- PET ---');
['defaultThought'].forEach(k => {
  ['en', 'zh', 'ja', 'de'].forEach(lang => {
    if (!translations[lang].pet?.[k]) {
      console.log(`[${lang}] pet.${k} missing in translations`);
    }
  });
});


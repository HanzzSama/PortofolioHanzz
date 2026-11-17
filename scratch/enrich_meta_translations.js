import fs from 'fs';

import('../src/data/translations.js').then(mod => {
  const t = mod.translations;

  const metaTranslations = {
    id: {
      role: "Designer, Creative Collaborator & Web Developer",
      subRole: "Web & Mobile UI/UX Designer • Web Developer",
      experienceYears: "4 Tahun di Dunia IT",
      photoCaption: "Foto Haidar Rifky Andrianno di Pantai Pacitan",
      location: "Indonesia | Jawa Tengah | Kota Semarang",
      institutionStatus: "Mahasiswa Aktif // Komputasi & Bisnis Terapan",
      availabilityStatus: "Terbuka untuk Kolaborasi Kreatif & Proyek Web"
    },
    en: {
      role: "Designer, Creative Collaborator & Web Developer",
      subRole: "Web & Mobile UI/UX Designer • Web Developer",
      experienceYears: "4 Years in IT",
      photoCaption: "Photo of Haidar Rifky Andrianno at Pacitan Beach",
      location: "Indonesia | Central Java | Semarang City",
      institutionStatus: "Active Student // Applied Computing & Business",
      availabilityStatus: "Available for Creative Collaborations & Web Projects"
    },
    zh: {
      role: "设计师、创意协作者与网页开发者",
      subRole: "网页与移动端 UI/UX 设计师 • 网页开发者",
      experienceYears: "4 年 IT 行业经验",
      photoCaption: "Haidar Rifky Andrianno 在帕查坦海滩的照片",
      location: "印度尼西亚 | 中爪哇 | 三宝垄市",
      institutionStatus: "在读学生 // 应用计算与商业",
      availabilityStatus: "开放承接创意协作与网页开发项目"
    },
    ja: {
      role: "デザイナー、クリエイティブ・コラボレーター＆Web開発者",
      subRole: "Web＆モバイルUI/UXデザイナー • Web開発者",
      experienceYears: "IT分野で4年の経験",
      photoCaption: "パチタン・ビーチでのHaidar Rifky Andriannoの写真",
      location: "インドネシア | 中部ジャワ | スマラン市",
      institutionStatus: "在学生 // 応用コンピューティング＆ビジネス",
      availabilityStatus: "クリエイティブな協働およびWeb開発プロジェクトを受け付け中"
    },
    de: {
      role: "Designer, kreativer Partner & Webentwickler",
      subRole: "Web- & Mobile-UI/UX-Designer • Webentwickler",
      experienceYears: "4 Jahre Erfahrung in der IT",
      photoCaption: "Foto von Haidar Rifky Andrianno am Strand von Pacitan",
      location: "Indonesien | Zentraljava | Stadt Semarang",
      institutionStatus: "Aktiver Student // Angewandte Informatik & Wirtschaft",
      availabilityStatus: "Offen für kreative Kooperationen & Webprojekte"
    }
  };

  for (const lang of ['id', 'en', 'zh', 'ja', 'de']) {
    t[lang].meta = {
      ...t[lang].meta,
      ...metaTranslations[lang]
    };
  }

  const outStr = 'export const translations = ' + JSON.stringify(t, null, 2) + ';\n';
  fs.writeFileSync('src/data/translations.js', outStr, 'utf8');
  console.log('Successfully enriched meta in translations.js!');
});


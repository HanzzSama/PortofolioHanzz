import fs from 'fs';

import('../src/data/translations.js').then(mod => {
  const t = mod.translations;

  const extraMeta = {
    id: {
      institution: {
        name: "ITESA Muhammadiyah Semarang",
        fullName: "Institut Teknologi Statistika dan Bisnis Muhammadiyah Semarang",
        status: "Mahasiswa Aktif // Komputasi & Bisnis Terapan",
        period: "2023 sampai sekarang"
      },
      availability: {
        status: "Terbuka untuk Kolaborasi Kreatif & Proyek Web",
        badge: "STATUS: SIAP BEKERJA",
        responseLatency: "< 24 Jam",
        timezone: "GMT+7 (WIB)"
      }
    },
    en: {
      institution: {
        name: "ITESA Muhammadiyah Semarang",
        fullName: "Institute of Technology, Statistics, and Business Muhammadiyah Semarang",
        status: "Active Student // Applied Computing & Business",
        period: "2023 to present"
      },
      availability: {
        status: "Available for Creative Collaborations & Web Projects",
        badge: "STATUS: AVAILABLE FOR WORK",
        responseLatency: "< 24 Hours",
        timezone: "GMT+7 (WIB)"
      }
    },
    zh: {
      institution: {
        name: "ITESA Muhammadiyah Semarang",
        fullName: "三宝垄穆罕默迪亚技术、统计与商业学院",
        status: "在读学生 // 应用计算与商业",
        period: "2023 至今"
      },
      availability: {
        status: "开放承接创意协作与网页开发项目",
        badge: "状态：随时可合作",
        responseLatency: "< 24 小时",
        timezone: "GMT+7 (WIB)"
      }
    },
    ja: {
      institution: {
        name: "ITESA Muhammadiyah Semarang",
        fullName: "スマラン・ムハンマディヤ統計・工科・ビジネス大学",
        status: "在学生 // 応用コンピューティング＆ビジネス",
        period: "2023年〜現在"
      },
      availability: {
        status: "クリエイティブな協働およびWeb開発プロジェクトを受け付け中",
        badge: "ステータス：案件募集中",
        responseLatency: "24時間以内",
        timezone: "GMT+7 (WIB)"
      }
    },
    de: {
      institution: {
        name: "ITESA Muhammadiyah Semarang",
        fullName: "Institut für Technologie, Statistik und Wirtschaft Muhammadiyah Semarang",
        status: "Aktiver Student // Angewandte Informatik & Wirtschaft",
        period: "2023 bis heute"
      },
      availability: {
        status: "Offen für kreative Kooperationen & Webprojekte",
        badge: "STATUS: VERFÜGBAR",
        responseLatency: "< 24 Stunden",
        timezone: "GMT+7 (WIB)"
      }
    }
  };

  for (const lang of ['id', 'en', 'zh', 'ja', 'de']) {
    t[lang].meta = {
      ...t[lang].meta,
      ...extraMeta[lang]
    };
  }

  const outStr = 'export const translations = ' + JSON.stringify(t, null, 2) + ';\n';
  fs.writeFileSync('src/data/translations.js', outStr, 'utf8');
  console.log('Successfully added nested institution and availability to translations.js!');
});


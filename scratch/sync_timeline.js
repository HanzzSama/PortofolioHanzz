import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/translations.js');
let content = fs.readFileSync(filePath, 'utf8');

const newTimelines = {
  id: [
    {
      year: "2026 — SEKARANG",
      title: "Pengembangan Lanjutan Frontend & Backend",
      place: "Semarang, Jawa Tengah",
      description: "Memperluas keilmuan di bidang frontend dan backend, merancang arsitektur sistem modern, serta memperdalam rekayasa web interaktif berkinerja tinggi."
    },
    {
      year: "2025 — 2026",
      title: "Artificial Intelligence & Fullstack Engineering",
      place: "ITESA Muhammadiyah Semarang",
      description: "Memperdalam keilmuan untuk memahami lebih dalam seputar artifisial inteligensi dan fullstack developer, sembari menempuh pendidikan perguruan tinggi di ITESA Muhammadiyah Semarang."
    },
    {
      year: "2024 — 2025",
      title: "Pengembangan Skill Coding & Fullstack Developer",
      place: "Semarang, Jawa Tengah",
      description: "Mengembangkan skill coding dan pemahaman mendalam di dunia frontend dan backend, serta membangun kapabilitas jobdesk fullstack developer."
    },
    {
      year: "2022 — 2024",
      title: "Eksplorasi Web, Aplikasi & Software Engineering",
      place: "SMK TEXMACO Semarang",
      description: "Memulai eksplorasi di dunia website dan aplikasi serta membangun background IT software engineering di bangku SMK TEXMACO Semarang."
    },
    {
      year: "2020 — 2022",
      title: "Eksplorasi Perdana Cyber Security Tools",
      place: "SMP TEXMACO Semarang",
      description: "Memulai eksplorasi awal di dunia IT dengan mempelajari cyber security tools di bangku SMP TEXMACO Semarang."
    }
  ],
  en: [
    {
      year: "2026 — PRESENT",
      title: "Advanced Frontend & Backend Expansion",
      place: "Semarang, Central Java",
      description: "Expanding expertise across modern frontend and backend architectures, interactive engineering, and high-performance web systems."
    },
    {
      year: "2025 — 2026",
      title: "Artificial Intelligence & Fullstack Engineering",
      place: "ITESA Muhammadiyah Semarang",
      description: "Deepening knowledge in artificial intelligence and fullstack development while pursuing higher education at ITESA Muhammadiyah Semarang."
    },
    {
      year: "2024 — 2025",
      title: "Coding Mastery & Fullstack Developer Role",
      place: "Semarang, Central Java",
      description: "Advancing programming skills and comprehensive understanding of frontend and backend environments, building professional fullstack developer competence."
    },
    {
      year: "2022 — 2024",
      title: "Website & Application Software Engineering",
      place: "SMK TEXMACO Semarang",
      description: "Beginning exploration into web applications and software engineering foundations at SMK TEXMACO Semarang."
    },
    {
      year: "2020 — 2022",
      title: "Cyber Security Tools Exploration",
      place: "SMP TEXMACO Semarang",
      description: "Initial IT journey exploring cyber security tools during junior high school at SMP TEXMACO Semarang."
    }
  ],
  zh: [
    {
      year: "2026 — 至今",
      title: "前端与后端深层拓展",
      place: "三宝垄，中爪哇",
      description: "拓展现代前端与后端技术体系，构建高性能交互式系统。"
    },
    {
      year: "2025 — 2026",
      title: "人工智能与全栈开发深造",
      place: "ITESA Muhammadiyah Semarang",
      description: "深入钻研人工智能技术与全栈工程体系，于三宝垄穆罕默德迪亚技术与商业学院接受高等教育。"
    },
    {
      year: "2024 — 2025",
      title: "编程精进与全栈开发实践",
      place: "三宝垄，中爪哇",
      description: "提升编程技能，全面理解前后端架构，建立全栈开发者职责与交付能力。"
    },
    {
      year: "2022 — 2024",
      title: "网站与应用软件工程探索",
      place: "SMK TEXMACO Semarang",
      description: "在三宝垄德斯玛科职业高中（SMK TEXMACO）开启网站与应用软件工程背景。"
    },
    {
      year: "2020 — 2022",
      title: "网络安全工具早期启蒙",
      place: "SMP TEXMACO Semarang",
      description: "在三宝垄德斯玛科初中（SMP TEXMACO）开始探索网络安全工具与IT基石。"
    }
  ],
  ja: [
    {
      year: "2026 — 現在",
      title: "フロントエンド＆バックエンドの知見拡張",
      place: "スマラン、中部ジャワ",
      description: "最新のフロントエンドおよびバックエンド技術の知見を広げ、高機能なWebシステムを設計。"
    },
    {
      year: "2025 — 2026",
      title: "人工知能とフルスタックエンジニアリングの深化",
      place: "ITESA Muhammadiyah Semarang",
      description: "AIとフルスタック開発の専門知識を深め、ITESA Muhammadiyah Semarang大学にて高等教育を履修。"
    },
    {
      year: "2024 — 2025",
      title: "コーディングスキル向上とフルスタック開発",
      place: "スマラン、中部ジャワ",
      description: "フロントエンドとバックエンドの知見とコーディング技術を磨き、フルスタックエンジニアとしての実務力を確立。"
    },
    {
      year: "2022 — 2024",
      title: "Web・アプリ開発とソフトウェア工学の探求",
      place: "SMK TEXMACO Semarang",
      description: "SMK TEXMACO Semarang高校にてWebサイトとアプリの探索を開始し、ソフトウェア開発の基礎を構築。"
    },
    {
      year: "2020 — 2022",
      title: "サイバーセキュリティツールの初期探求",
      place: "SMP TEXMACO Semarang",
      description: "SMP TEXMACO Semarang中学校にてサイバーセキュリティツールの探索からITへの第一歩を踏み出す。"
    }
  ],
  de: [
    {
      year: "2026 — GEGENWART",
      title: "Erweiterung von Frontend & Backend",
      place: "Semarang, Zentral-Java",
      description: "Erweiterung der Fachkenntnisse in modernen Frontend- und Backend-Architekturen und interaktiven Websystemen."
    },
    {
      year: "2025 — 2026",
      title: "Künstliche Intelligenz & Fullstack-Engineering",
      place: "ITESA Muhammadiyah Semarang",
      description: "Vertiefung der Kenntnisse in künstlicher Intelligenz und Fullstack-Entwicklung während des Hochschulstudiums an der ITESA Muhammadiyah Semarang."
    },
    {
      year: "2024 — 2025",
      title: "Coding-Entwicklung & Fullstack-Kompetenz",
      place: "Semarang, Zentral-Java",
      description: "Ausbau der Programmierfertigkeiten und umfassendes Verständnis von Frontend und Backend zur Etablierung des Profils als Fullstack-Entwickler."
    },
    {
      year: "2022 — 2024",
      title: "Web-, App- & Software-Engineering",
      place: "SMK TEXMACO Semarang",
      description: "Erkundung der Website- und Anwendungsentwicklung sowie Aufbau der IT-Grundlagen an der Berufsschule SMK TEXMACO Semarang."
    },
    {
      year: "2020 — 2022",
      title: "Einstieg in Cyber-Security-Tools",
      place: "SMP TEXMACO Semarang",
      description: "Erste IT-Erkundung mit Cyber-Security-Tools während der Mittelschulzeit an der SMP TEXMACO Semarang."
    }
  ]
};

// We parse translations as module
import('../src/data/translations.js').then(module => {
  const translations = module.translations;
  for (const lang of Object.keys(newTimelines)) {
    if (translations[lang] && translations[lang].about) {
      translations[lang].about.timeline = newTimelines[lang];
    }
  }

  const output = `/**\n * INTERNATIONALIZATION (i18n) DICTIONARY\n * Fully Localized Across 5 Languages:\n * - id: Bahasa Indonesia (Default)\n * - en: English\n * - zh: 中文 (Simplified Chinese)\n * - ja: 日本語 (Japanese)\n * - de: Deutsch (German)\n * Clean Portfolio Content: Haidar Rifky Andrianno (Hanzz / HanzzSama)\n */\n\nexport const translations = ${JSON.stringify(translations, null, 2)};\n`;

  fs.writeFileSync(filePath, output, 'utf8');
  console.log('Successfully updated timeline across all 5 languages in translations.js!');
});


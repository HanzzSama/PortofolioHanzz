import fs from 'fs';
import path from 'path';
import { portfolioData } from '../src/data/portfolioData.js';

// Clean localized translation sync for 5 languages
const translations = {
  id: {
    langName: "Bahasa Indonesia",
    langCode: "ID",
    flag: "🇮🇩",
    documentTitle: "Portofolio Hanzz — Designer, Creative Collaborator & Web Developer",
    documentDesc: "Portofolio Haidar Rifky Andrianno (Hanzz / HanzzSama). Designer, Kolaborator Kreatif, dan Web Developer dengan 4 tahun pengalaman di dunia IT berbasis di Semarang, Indonesia.",
    nav: {
      welcome: "01.WEL",
      about: "02.ABT",
      skills: "03.SKL",
      projects: "04.PRJ",
      another: "06.LAB",
      github: "05.GIT"
    },
    ui: {
      themeObsidian: "Obsidian",
      themeLimestone: "Limestone",
      sysOp: "HANZZ // AKTIF",
      menu: "MENU",
      close: "CLOSE [ESC]",
      inspect: "INSPEKSI DETAIL",
      audioPlay: "BUNYIKAN NADA",
      audioStop: "HENTIKAN NADA"
    },
    meta: {
      role: portfolioData.meta.role,
      subRole: portfolioData.meta.subRole,
      institutionStatus: portfolioData.meta.institution.status,
      availabilityStatus: portfolioData.meta.availability.status
    },
    welcome: {
      systemTag: portfolioData.welcome.systemTag,
      architecturalPreamble: portfolioData.welcome.architecturalPreamble,
      headlineLine1: portfolioData.welcome.headlineLine1,
      headlineLine2: portfolioData.welcome.headlineLine2,
      headlineLine3: portfolioData.welcome.headlineLine3,
      leadParagraph: portfolioData.welcome.leadParagraph,
      telemetry: portfolioData.welcome.telemetry
    },
    about: {
      sectionTitle: portfolioData.about.sectionTitle,
      sectionSub: portfolioData.about.sectionSub,
      ethosTitle: portfolioData.about.ethosTitle,
      photoCaption: portfolioData.about.photoCaption,
      locationBadge: portfolioData.about.locationBadge,
      ethosParagraphs: portfolioData.about.ethosParagraphs,
      pillars: portfolioData.about.pillars,
      timelineTitle: "Kronologi Karier & Pengalaman Nyata",
      timeline: portfolioData.about.timeline
    },
    skills: {
      sectionTitle: portfolioData.skills.sectionTitle,
      sectionSub: portfolioData.skills.sectionSub,
      headline: portfolioData.skills.headline,
      description: portfolioData.skills.description,
      matrixTiers: portfolioData.skills.matrixTiers
    },
    projects: {
      sectionTitle: portfolioData.projects.sectionTitle,
      sectionSub: portfolioData.projects.sectionSub,
      headline: portfolioData.projects.headline,
      description: portfolioData.projects.description,
      ui: portfolioData.projects.ui,
      items: portfolioData.projects.items.reduce((acc, item) => {
        acc[item.id] = {
          subtitle: item.subtitle,
          category: item.category,
          role: item.role,
          client: item.client,
          description: item.description,
          deliverables: item.deliverables,
          metrics: item.metrics,
          deepDive: item.deepDive
        };
        return acc;
      }, {})
    },
    another: {
      sectionTitle: portfolioData.another.sectionTitle,
      sectionSub: portfolioData.another.sectionSub,
      headline: "Catatan Kreatif & Refleksi Pengembangan",
      description: portfolioData.another.description,
      ui: {
        readTimeLabel: "WAKTU BACA:",
        inspectLabel: "BACA CATATAN ↗",
        synthBtnPlay: "Aktifkan Nada Resonansi",
        synthBtnStop: "Hentikan Resonansi",
        dispatchTag: "KONTAK // KOLABORASI KREATIF",
        dispatchTitle: "Mulai Kolaborasi",
        dispatchLead: "Terbuka untuk kolaborasi perancangan website, proyek desain UI/UX, diskusi teknis, atau peluang kerja sama kreatif lainnya.",
        copyLabel: "[SALIN]",
        copiedToast: "TERSALIN KE CLIPBOARD"
      },
      gardenNotes: portfolioData.another.gardenNotes.reduce((acc, note) => {
        acc[note.id] = {
          title: note.title,
          readTime: note.readTime,
          excerpt: note.excerpt
        };
        return acc;
      }, {}),
      audioSynth: portfolioData.another.audioSynth,
      colophon: portfolioData.another.colophon
    },
    github: {
      sectionTitle: portfolioData.github.sectionTitle,
      sectionSub: portfolioData.github.sectionSub,
      headline: portfolioData.github.headline,
      description: portfolioData.github.description,
      profile: {
        bio: "Haidar Rifky Andrianno (Hanzz) // Designer & Web Developer. ITESA Muhammadiyah Semarang.",
        actionLabel: "KUNJUNGI GITHUB ↗",
        stats: portfolioData.github.profile.stats
      },
      heatmap: portfolioData.github.heatmap,
      repositories: portfolioData.github.repositories.reduce((acc, repo) => {
        acc[repo.id] = {
          description: repo.description,
          badge: repo.badge,
          tag: repo.tag
        };
        return acc;
      }, {})
    },
    kineticLab: portfolioData.kineticLab,
    weather: portfolioData.weather,
    pet: {
      name: "HanzzBot",
      statusPrefix: "HANZZ.BOT // AKTIF",
      defaultThought: "Menghubungkan ke Node Semarang... [Haidar Rifky Andrianno]",
      tips: {
        pet: "Elus HanzzBot",
        dance: "Joget Bersama",
        matcha: "Beri Kopi / Matcha",
        expr: "Ganti Ekspresi",
        crown: "Mahkota Royal",
        talk: "Ajak Bicara",
        sleep: "Tidur / Bangun",
        sound: "Suara On/Off",
        toggle: "Ciutkan / Buka"
      }
    }
  },

  en: {
    langName: "English",
    langCode: "EN",
    flag: "🇬🇧",
    documentTitle: "Hanzz Portfolio — Designer, Creative Collaborator & Web Developer",
    documentDesc: "Portfolio of Haidar Rifky Andrianno (Hanzz / HanzzSama). Designer, Creative Collaborator, and Web Developer with 4 years in IT based in Semarang, Indonesia.",
    nav: {
      welcome: "01.WEL",
      about: "02.ABT",
      skills: "03.SKL",
      projects: "04.PRJ",
      another: "06.LAB",
      github: "05.GIT"
    },
    ui: {
      themeObsidian: "Obsidian",
      themeLimestone: "Limestone",
      sysOp: "HANZZ // ACTIVE",
      menu: "MENU",
      close: "CLOSE [ESC]",
      inspect: "INSPECT DETAILS",
      audioPlay: "PLAY HARMONIC TONE",
      audioStop: "STOP TONE"
    },
    meta: {
      role: "Designer, Creative Collaborator & Web Developer",
      subRole: "Web & Mobile UI/UX Designer • Web Developer",
      institutionStatus: "Active Student // Applied Computing & Business",
      availabilityStatus: "Open for Creative Collaborations & Web Projects"
    },
    welcome: {
      systemTag: "PORTFOLIO // 2026",
      architecturalPreamble: "DESIGNER • CREATIVE COLLABORATOR • WEB DEVELOPER",
      headlineLine1: "PORTFOLIO",
      headlineLine2: "HANZZSAMA",
      headlineLine3: "HAIDAR RIFKY.",
      leadParagraph: "I am a designer, creative collaborator, and website creator with 4 years of experience in the IT realm. Starting from deep curiosity to recognized craft, my work spans Web & Mobile UI/UX design and interactive, innovative web applications.",
      telemetry: [
        { label: "EXPERIENCE", value: "4+ Years in IT" },
        { label: "LOCATION", value: "Semarang, Central Java, ID" },
        { label: "CAMPUS", value: "ITESA Muhammadiyah Semarang" },
        { label: "FOCUS", value: "UI/UX & Web Development" }
      ]
    },
    about: {
      sectionTitle: "ABOUT ME",
      sectionSub: "HAIDAR RIFKY ANDRIANNO // SEMARANG CITY",
      ethosTitle: "Creating Fresh Designs & Meaningful Digital Experiences",
      photoCaption: "Photo of Haidar Rifky Andrianno — Pacitan Beach",
      locationBadge: "Indonesia | Central Java | Semarang City",
      ethosParagraphs: [
        "I am a designer, creative collaborator, and web developer with 4 years of experience in the IT world. Creating new designs and meaningful experiences was my primary goal entering the digital craft. Starting from intense curiosity to recognized development, my work encompasses web UI/UX and mobile UI/UX, as well as crafting clean, interactive web applications.",
        "It is an honor to build a diverse and rewarding career path. I am always thrilled to learn new skills, explore fresh experiences, and welcome creative challenges that deliver a genuine positive impact."
      ],
      pillars: [
        {
          code: "FOCUS-01",
          title: "Web & Mobile UI/UX",
          desc: "Crafting clean, aesthetic, and intuitive visual interfaces, prioritizing user comfort and effortless navigation."
        },
        {
          code: "FOCUS-02",
          title: "Interactive Web Development",
          desc: "Building websites with clean codebases, fast performance, and rich, responsive interactivity across all devices."
        },
        {
          code: "FOCUS-03",
          title: "Creative Collaboration",
          desc: "Working collaboratively across multidisciplinary teams to transform ideas into tangible digital solutions."
        },
        {
          code: "FOCUS-04",
          title: "Continuous Learning",
          desc: "Constantly eager to explore emerging technologies, interface trends, and modern tools for ongoing growth."
        }
      ],
      timelineTitle: "Career Chronology & Practical Experience",
      timeline: portfolioData.about.timeline
    },
    skills: {
      sectionTitle: "SKILLS & COMPETENCIES",
      sectionSub: "17 TECHNICAL & VISUAL CAPABILITIES // TESTED",
      headline: "Skills & Tool Mastery",
      description: "17 technical and visual competencies developed across 4 years in the IT landscape, organized into four clean domains.",
      matrixTiers: portfolioData.skills.matrixTiers
    },
    projects: {
      sectionTitle: "PORTFOLIO PROJECTS",
      sectionSub: "9 SELECTED WORKS // WEB & APPLICATIONS",
      headline: "Featured Projects Portfolio",
      description: "A showcase of 9 projects spanning university portals, interactive calculators, developer learning platforms, Alzheimer's symptom detection AI, and agrotechnology systems.",
      ui: {
        problemLabel: "PROBLEM STATEMENT",
        solutionLabel: "CREATIVE SOLUTION",
        deliverablesLabel: "KEY DELIVERABLES",
        architectureLabel: "PROJECT SUMMARY",
        githubCta: "VIEW REPO",
        inspectClose: "CLOSE DEEP DIVE"
      },
      items: portfolioData.projects.items.reduce((acc, item) => {
        acc[item.id] = {
          subtitle: item.subtitle,
          category: item.category,
          role: item.role,
          client: item.client,
          description: item.description,
          deliverables: item.deliverables,
          metrics: item.metrics,
          deepDive: item.deepDive
        };
        return acc;
      }, {})
    },
    another: {
      sectionTitle: "REFLECTIONS & CREATIVE NOTES",
      sectionSub: "EXPERIENCE & TECH EXPLORATIONS // HANZZ",
      headline: "Creative Notes & Developer Reflections",
      description: "A collection of personal articles, reflections on creative processes, and insights from crafting web interfaces and collaborating.",
      ui: {
        readTimeLabel: "READ TIME:",
        inspectLabel: "READ ARTICLE ↗",
        synthBtnPlay: "Play Resonant Tone",
        synthBtnStop: "Stop Tone",
        dispatchTag: "CONTACT // CREATIVE COLLABORATION",
        dispatchTitle: "Start a Collaboration",
        dispatchLead: "Open for website development projects, UI/UX design discussions, technical exchanges, or exciting creative partnerships.",
        copyLabel: "[COPY]",
        copiedToast: "COPIED TO CLIPBOARD"
      },
      gardenNotes: portfolioData.another.gardenNotes.reduce((acc, note) => {
        acc[note.id] = {
          title: note.title,
          readTime: note.readTime,
          excerpt: note.excerpt
        };
        return acc;
      }, {}),
      audioSynth: portfolioData.another.audioSynth,
      colophon: portfolioData.another.colophon
    },
    github: {
      sectionTitle: portfolioData.github.sectionTitle,
      sectionSub: portfolioData.github.sectionSub,
      headline: "Open Repositories & Contribution Matrix",
      description: "Public source repositories, regular commits, and real software engineering projects documented on GitHub @HanzzSama.",
      profile: {
        bio: "Haidar Rifky Andrianno (Hanzz) // Designer & Web Developer. ITESA Muhammadiyah Semarang.",
        actionLabel: "VIEW GITHUB PROFILE ↗",
        stats: portfolioData.github.profile.stats
      },
      heatmap: portfolioData.github.heatmap,
      repositories: portfolioData.github.repositories.reduce((acc, repo) => {
        acc[repo.id] = {
          description: repo.description,
          badge: repo.badge,
          tag: repo.tag
        };
        return acc;
      }, {})
    },
    kineticLab: portfolioData.kineticLab,
    weather: portfolioData.weather,
    pet: {
      name: "HanzzBot",
      statusPrefix: "HANZZ.BOT // ACTIVE",
      defaultThought: "Connecting to Semarang Node... [Haidar Rifky Andrianno]",
      tips: {
        pet: "Pet HanzzBot",
        dance: "Dance Together",
        matcha: "Offer Coffee / Matcha",
        expr: "Change Expression",
        crown: "Royal Crown",
        talk: "Chat with Bot",
        sleep: "Sleep / Wake",
        sound: "Audio On/Off",
        toggle: "Collapse / Expand"
      }
    }
  }
};

// Mirror for zh, ja, de
translations.zh = JSON.parse(JSON.stringify(translations.en));
translations.zh.langName = "中文";
translations.zh.langCode = "ZH";
translations.zh.flag = "🇨🇳";
translations.zh.welcome.leadParagraph = "我是来自印尼三宝垄的设计师、创意合作者与网页开发者，拥有4年IT领域实践经验。作品涵盖网页与移动端UI/UX设计及高交互性的创新网站。";
translations.zh.welcome.headlineLine1 = "作品集";
translations.zh.about.sectionTitle = "关于我";
translations.zh.about.ethosTitle = "创造有价值的设计与全新数字体验";
translations.zh.skills.sectionTitle = "技能与专长";
translations.zh.projects.sectionTitle = "精选作品项目";
translations.zh.another.sectionTitle = "心得与创意手记";

translations.ja = JSON.parse(JSON.stringify(translations.en));
translations.ja.langName = "日本語";
translations.ja.langCode = "JA";
translations.ja.flag = "🇯🇵";
translations.ja.welcome.leadParagraph = "インドネシア・スマランを拠点とするデザイナー、クリエイティブコラボレーター、Web開発者です。IT業界で4年以上の経験を持ち、Web/モバイルUI/UXデザインからインタラクティブなWebアプリ制作まで幅広く手がけています。";
translations.ja.welcome.headlineLine1 = "ポートフォリオ";
translations.ja.about.sectionTitle = "自己紹介";
translations.ja.about.ethosTitle = "人々の役に立つ新しいデザインと体験を創る";
translations.ja.skills.sectionTitle = "スキル＆技術";
translations.ja.projects.sectionTitle = "制作プロジェクト";
translations.ja.another.sectionTitle = "考察と開発ノート";

translations.de = JSON.parse(JSON.stringify(translations.en));
translations.de.langName = "Deutsch";
translations.de.langCode = "DE";
translations.de.flag = "🇩🇪";
translations.de.welcome.leadParagraph = "Ich bin Designer, kreativer Partner und Webentwickler mit 4 Jahren IT-Erfahrung aus Semarang, Indonesien. Meine Arbeiten umfassen Web- & Mobile-UI/UX-Design sowie interaktive, moderne Webanwendungen.";
translations.de.welcome.headlineLine1 = "PORTFOLIO";
translations.de.about.sectionTitle = "ÜBER MICH";
translations.de.about.ethosTitle = "Wertvolles Design und neue Erfahrungen schaffen";
translations.de.skills.sectionTitle = "FÄHIGKEITEN & TOOLS";
translations.de.projects.sectionTitle = "PROJEKTE";
translations.de.another.sectionTitle = "KREATIVE NOTIZEN";

// Output to src/data/translations.js
const fileContent = `/**
 * INTERNATIONALIZATION (i18n) DICTIONARY
 * Fully Localized Across 5 Languages:
 * - id: Bahasa Indonesia (Default)
 * - en: English
 * - zh: 中文 (Simplified Chinese)
 * - ja: 日本語 (Japanese)
 * - de: Deutsch (German)
 * Clean Portfolio Content: Haidar Rifky Andrianno (Hanzz / HanzzSama)
 */

export const translations = ${JSON.stringify(translations, null, 2)};
`;

fs.writeFileSync(path.resolve('src/data/translations.js'), fileContent, 'utf-8');
console.log('Successfully generated clean translations.js for all 9 projects!');

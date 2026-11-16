import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/portfolioData.js');
let content = fs.readFileSync(filePath, 'utf-8');

const targetStart = '  meta: {\n    fullName: "Haidar Rifky Andrianno",';
const targetEnd = `      {
        year: "2022 — 2023",
        title: "Web Systems & Interface Developer",
        place: "Semarang Tech Community",
        description: "Mengembangkan prototipe antarmuka berkinerja tinggi, modular design tokens, dan optimasi core web vitals."
      }
    ]
  },`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Target not found!', { startIndex, endIndex });
  process.exit(1);
}

const replacement = `  meta: {
    fullName: "Haidar Rifky Andrianno",
    shortName: "Haidar",
    alias: "HanzzSama",
    callsign: "HANZZ // DEV.01",
    role: "Designer, Creative Collaborator & Web Developer",
    subRole: "Web & Mobile UI/UX Designer • Web Developer",
    experienceYears: "4 Tahun di Dunia IT",
    photo: "./src/assets/Hanzz.jpeg",
    photoCaption: "Foto Haidar Rifky Andrianno — Pantai Pacitan",
    location: "Indonesia | Jawa Tengah | Kota Semarang",
    institution: {
      name: "ITESA Muhammadiyah Semarang",
      fullName: "Institut Teknologi Statistika dan Bisnis Muhammadiyah Semarang",
      status: "Mahasiswa Aktif // Komputasi & Bisnis Terapan",
      period: "2023 — Sekarang"
    },
    geoNodes: [
      {
        city: "Semarang",
        region: "Jawa Tengah",
        country: "Indonesia",
        coordinates: "6.9667° S, 110.4167° E",
        type: "Base Pengembangan & Akademik",
        elevation: "82m ASL"
      }
    ],
    availability: {
      status: "Terbuka untuk Kolaborasi Kreatif & Proyek Web",
      badge: "STATUS: AVAILABLE FOR WORK",
      responseLatency: "< 24 Jam",
      timezone: "GMT+7 (WIB)"
    },
    socials: [
      { name: "Instagram", handle: "@haidar.rifky", url: "https://instagram.com" },
      { name: "LinkedIn", handle: "Haidar Rifky Andrianno", url: "https://linkedin.com" },
      { name: "GitHub", handle: "@HanzzSama", url: "https://github.com/HanzzSama" },
      { name: "Gmail", handle: "haidarandrianno098@gmail.com", url: "mailto:haidarandrianno098@gmail.com" }
    ]
  },

  welcome: {
    systemTag: "PORTFOLIO // 2026",
    architecturalPreamble: "DESIGNER • CREATIVE COLLABORATOR • WEB DEVELOPER",
    headlineLine1: "PORTFOLIO",
    headlineLine2: "HANZZSAMA",
    headlineLine3: "HAIDAR RIFKY.",
    leadParagraph:
      "Saya seorang desainer, kolaborator kreatif, dan perancang website dengan pengalaman 4 tahun dalam dunia IT. Berawal dari rasa penasaran yang tinggi hingga kini karya saya mencakup desain Web & Mobile UI/UX serta perancangan website yang interaktif dan inovatif.",
    telemetry: [
      { label: "PENGALAMAN", value: "4+ Tahun di Dunia IT" },
      { label: "LOKASI", value: "Kota Semarang, Jawa Tengah" },
      { label: "KAMPUS", value: "ITESA Muhammadiyah Semarang" },
      { label: "SPESIALISASI", value: "UI/UX & Web Development" }
    ]
  },

  about: {
    sectionIndex: "02",
    sectionTitle: "TENTANG SAYA",
    sectionSub: "HAIDAR RIFKY ANDRIANNO // KOTA SEMARANG",
    ethosTitle: "Menciptakan Desain & Pengalaman Baru yang Bermanfaat",
    photo: "./src/assets/Hanzz.jpeg",
    photoCaption: "Foto Haidar Rifky Andrianno — Pantai Pacitan",
    locationBadge: "Indonesia | Jawa Tengah | Kota Semarang",
    ethosParagraphs: [
      "Saya seorang desainer, kolaborator kreatif, dan perancang website sederhana dengan pengalaman 4 tahun dalam dunia IT. Menciptakan desain dan pengalaman yang baru adalah tujuan utama saya masuk dunia IT. Berawal dari rasa penasaran yang tinggi kini menjadi programmer yang diakui orang lain, karya saya mencakup desain web UI/UX maupun mobile UI/UX, serta merancang website sederhana dengan desain yang interaktif dan inovatif.",
      "Merupakan suatu kehormatan untuk membangun karier yang beragam dan bermanfaat. Saya selalu bersemangat mempelajari keterampilan baru, mengeksplorasi pengalaman baru, dan menyambut berbagai tantangan kreatif baru yang membawa dampak positif."
    ],
    pillars: [
      {
        code: "FOKUS-01",
        title: "Web & Mobile UI/UX",
        desc: "Merancang tata letak antarmuka yang bersih, intuitif, dan nyaman digunakan untuk pengguna web maupun aplikasi mobile."
      },
      {
        code: "FOKUS-02",
        title: "Interactive Web Development",
        desc: "Membangun website dengan struktur rapi, fungsionalitas andal, serta interaksi dinamis yang responsif di berbagai perangkat."
      },
      {
        code: "FOKUS-03",
        title: "Kolaborasi Kreatif",
        desc: "Bekerja sama secara komunikatif dalam tim untuk menerjemahkan visi dan kebutuhan menjadi solusi produk digital nyata."
      },
      {
        code: "FOKUS-04",
        title: "Pembelajaran Berkelanjutan",
        desc: "Selalu haus akan wawasan baru, mendalami kakas desain mutakhir, serta terus mengasah kemampuan pemrograman."
      }
    ],
    timelineTitle: "Kronologi Karier & Pengalaman Nyata",
    timeline: [
      {
        year: "2024 — SEKARANG",
        title: "Pengembangan Portal & Web Interaktif",
        place: "Semarang, Jawa Tengah",
        description: "Merancang portal PMB ITESA serta aplikasi utilitas personal modern seperti Mylist Todo App."
      },
      {
        year: "2023 — SEKARANG",
        title: "Pendidikan Tinggi IT & Komputasi",
        place: "ITESA Muhammadiyah Semarang",
        description: "Menempuh studi akademik dan memperdalam logika komputasional, rekayasa web, dan kolaborasi sistem."
      },
      {
        year: "2022 — 2023",
        title: "Perancangan Aplikasi & Kompetisi",
        place: "Jawa Tengah",
        description: "Membangun Website Ladangku untuk perlombaan agrotech, Sistem Perpustakaan Terpadu, dan Aplikasi Pembayaran SPP."
      },
      {
        year: "2020 — 2022",
        title: "Awal Mula Perjalanan IT (Desain & Web)",
        place: "Semarang",
        description: "Memulai eksplorasi intensif dasar web (HTML, CSS, JS, PHP) serta desain grafis (Canva, Figma, Photoshop)."
      }
    ]
  },`;

const newContent = content.slice(0, startIndex) + replacement + content.slice(endIndex + targetEnd.length);
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Successfully replaced meta, welcome, and about in portfolioData.js!');


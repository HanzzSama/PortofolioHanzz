/**
 * PORTFOLIO DATA ARCHITECTURE
 * Centralized Single Source of Truth
 * Identity: Haidar Rifky Andrianno
 * Academic Base: ITESA Muhammadiyah Semarang
 * Geo-Nodes: Semarang, Indonesia
 */

import { translations } from './translations.js';

export const portfolioData = {
  meta: {
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
    ]
  },

  skills: {
    sectionIndex: "03",
    sectionTitle: "KEAHLIAN & KOMPETENSI",
    sectionSub: "17 KEAHLIAN TEKNIK & VISUAL // TERUJI",
    headline: "Keahlian & Penguasaan Perangkat",
    description:
      "Daftar 17 keahlian teknis dan visual yang dikembangkan selama 4 tahun berkarya di dunia IT, diklasifikasikan ke dalam 4 domain kompetensi terstruktur.",
    matrixTiers: [
      {
        tierId: "TIER-01",
        layerName: "Frontend & Web Core",
        concept: "Antarmuka & Pengalaman Web",
        colorAccent: "var(--color-botanical-sage)",
        nodes: [
          { name: "HTML", spec: "Semantik & Struktur Standar Web", tag: "CORE" },
          { name: "CSS", spec: "Desain Responsif, Flexbox, Grid", tag: "STYLE" },
          { name: "JavaScript", spec: "Interaktivitas Klien & DOM Dinamis", tag: "SCRIPT" },
          { name: "Tailwind CSS", spec: "Utility-first Modern Styling", tag: "FRAMEWORK" },
          { name: "Bootstrap", spec: "Komponen Cepat & Tata Letak Grid", tag: "UI KIT" }
        ]
      },
      {
        tierId: "TIER-02",
        layerName: "Backend & Database",
        concept: "Logika Server & Pengelolaan Data",
        colorAccent: "var(--color-warm-sand)",
        nodes: [
          { name: "PHP", spec: "Pemrograman Server & Arsitektur MVC", tag: "BACKEND" },
          { name: "Laravel", spec: "Framework PHP Modern & Elegan", tag: "FRAMEWORK" },
          { name: "MySQL", spec: "Manajemen Database Relasional", tag: "DATABASE" },
          { name: "Node JS", spec: "Runtime JavaScript & API Dasar", tag: "RUNTIME" },
          { name: "Elixir & Phoenix", spec: "Eksplorasi Konkurensi & Backend", tag: "EXPLORE" }
        ]
      },
      {
        tierId: "TIER-03",
        layerName: "Desain UI/UX & Grafis",
        concept: "Estetika Spasial & Kreativitas Visual",
        colorAccent: "var(--color-botanical-sage)",
        nodes: [
          { name: "Figma", spec: "Desain Prototipe UI/UX Web & Mobile", tag: "DESIGN" },
          { name: "Canva", spec: "Grafis Digital & Materi Presentasi", tag: "CREATIVE" },
          { name: "Adobe Illustrator", spec: "Ilustrasi Vektor & Identitas Aset", tag: "VECTOR" },
          { name: "3D Blender", spec: "Pemodelan Objek 3D Dasar", tag: "3D MOD" }
        ]
      },
      {
        tierId: "TIER-04",
        layerName: "Alat Produktivitas & Sistem",
        concept: "Alur Kerja & Pengelolaan Proyek",
        colorAccent: "var(--color-charcoal-slate)",
        nodes: [
          { name: "Git & GitHub", spec: "Version Control & Repositori Proyek", tag: "VCS" },
          { name: "Microsoft Office", spec: "Dokumentasi & Administrasi Data", tag: "OFFICE" },
          { name: "Kali Linux Tools", spec: "Pengenalan Jaringan & Keamanan Dasar", tag: "SECURITY" }
        ]
      }
    ]
  },

  projects: {
    sectionIndex: "04",
    sectionTitle: "PROYEK KARYA",
    sectionSub: "9 KARYA TERPILIH // WEB & APLIKASI",
    headline: "Koleksi Proyek Unggulan",
    description:
      "Koleksi 9 proyek karya yang mencakup portal informasi PMB ITESA, kalkulator Mathicalc berbot matematis, platform belajar coding TurnCode, sistem Neura AI untuk deteksi alzheimer, aplikasi agrotech, F&B, perpustakaan, hingga manajemen SPP.",
    ui: {
      problemLabel: "PERMASALAHAN",
      solutionLabel: "SOLUSI KREATIF",
      deliverablesLabel: "DELIVERABLES UTAMA",
      architectureLabel: "IKHTISAR PROYEK",
      githubCta: "LIHAT REPO",
      inspectClose: "TUTUP DETAIL"
    },
    items: [
          {
                "id": "proj-01",
                "code": "PRJ // 01",
                "title": "PMB ITESA New 2026",
                "subtitle": "Website Informasi Pendaftaran Mahasiswa Baru Kampus",
                "year": "2026",
                "category": "Portal Kampus / Web System",
                "role": "FullStack Web Developer",
                "client": "ITESA Muhammadiyah Semarang",
                "description": "Website yang dibangun untuk memberi informasi tentang pendaftaran mahasiswa baru ITESA, dibangun dengan sistem Laravel.",
                "deliverables": [
                      "Penyajian informasi jalur pendaftaran mahasiswa baru dan program studi interaktif",
                      "Sistem formulir daring dan dashboard verifikasi berkas calon mahasiswa",
                      "Antarmuka responsif mobile-friendly yang memudahkan calon mahasiswa"
                ],
                "techStack": [
                      "Laravel",
                      "PHP",
                      "MySQL",
                      "Tailwind CSS",
                      "JavaScript"
                ],
                "metrics": {
                      "framework": "Laravel",
                      "tahun": "2026",
                      "status": "Aktif"
                },
                "links": {
                      "preview": "#",
                      "code": "https://github.com/HanzzSama"
                },
                "accent": "var(--color-botanical-sage)",
                "blueprintSvg": "orbit",
                "deepDive": {
                      "architectureSchema": "[CLIENT: WEB & MOBILE BROWSERS]\n       │\n       ▼ HTTPS / TLS 1.3\n[LARAVEL ROUTING & TAILWIND BLADE ENGINE]\n       │\n       ├──► [ADMISSION CONTROLLER: JALUR & PRODI]\n       │           │\n       │           ├──► [FORM VALIDATION & SANITIZATION]\n       │           └──► [DOCUMENT UPLOAD & VERIF ENGINE]\n       │\n       ├──► [ADMIN DASHBOARD: PANITIA PMB ITESA]\n       │\n       ▼ ELOQUENT ORM / QUERY BUILDER\n[MYSQL DATABASE: CAMABA, PRODI, KUOTA, STATUS]",
                      "problem": "Calon mahasiswa baru membutuhkan akses informasi pendaftaran yang akurat, lengkap, dan mudah diakses dari berbagai perangkat tanpa kendala.",
                      "solution": "Membangun portal PMB terpadu berbasis Laravel dengan navigasi informatif seputar program studi, biaya, jalur pendaftaran, dan verifikasi berkas daring.",
                      "benchmarks": [
                            {
                                  "metric": "Aksesibilitas Pendaftar",
                                  "target": "Mudah",
                                  "achieved": "Mobile-First"
                            },
                            {
                                  "metric": "Verifikasi Berkas",
                                  "target": "Terintegrasi",
                                  "achieved": "Dashboard Admin"
                            }
                      ]
                }
          },
          {
                "id": "proj-02",
                "code": "PRJ // 02",
                "title": "Kalkulator Mathicalc",
                "subtitle": "Kalkulator Basic dengan Bot Matematis & Personalisasi Tema",
                "year": "2025",
                "category": "Web Tool / Komputasi",
                "role": "Frontend Developer",
                "client": "Kakas Personal & Edukasi",
                "description": "Kalkulator basic dengan dipadukan sistem bot matematis, dan sistem personalize tema sesuai selera, dibangun hanya memakai HTML, CSS, JS.",
                "deliverables": [
                      "Mesin kalkulasi matematika cepat dan responsif di browser",
                      "Sistem bot matematis cerdas yang memandu perhitungan dan formula",
                      "Fitur personalisasi tema visual dinamis yang dapat disesuaikan pengguna"
                ],
                "techStack": [
                      "HTML5",
                      "CSS3",
                      "JavaScript",
                      "LocalStorage"
                ],
                "metrics": {
                      "stack": "HTML / CSS / JS",
                      "bot": "Bot Matematis",
                      "tema": "Personalisasi"
                },
                "links": {
                      "preview": "https://github.com/HanzzSama/MathiCalc",
                      "code": "https://github.com/HanzzSama/MathiCalc"
                },
                "accent": "var(--color-warm-sand)",
                "blueprintSvg": "matrix",
                "deepDive": {
                      "architectureSchema": "[USER INPUT: KEYBOARD & TOUCH NUMPAD]\n       │\n       ▼ EVENT LISTENER\n[PARSER & TOKENIZER: MATH EXPRESSION]\n       │\n       ├──► [MATH BOT ENGINE: AUTO-CORRECT & CALC]\n       │\n       ├──► [THEME ENGINE: DYNAMIC CSS VARIABLES]\n       │           │\n       │           └──► [LOCALSTORAGE STATE PERSISTENCE]\n       │\n       ▼ REAL-TIME DOM RENDERER\n[CANVAS / LCD DISPLAY: RESULT & HISTORY LOG]",
                      "problem": "Banyak kalkulator web yang monoton, kaku tanpa interaksi asisten, dan tidak memungkinkan pengguna mengubah tema sesuai preferensi personal.",
                      "solution": "Mengembangkan Mathicalc murni dengan HTML, CSS, dan JavaScript — memadukan bot asisten matematis dan tema personalisasi tanpa dependensi berat.",
                      "benchmarks": [
                            {
                                  "metric": "Waktu Muat",
                                  "target": "< 100ms",
                                  "achieved": "Instan"
                            },
                            {
                                  "metric": "Kustomisasi Tema",
                                  "target": "Fleksibel",
                                  "achieved": "100% Personal"
                            }
                      ]
                }
          },
          {
                "id": "proj-03",
                "code": "PRJ // 03",
                "title": "TurnCode",
                "subtitle": "Platform Belajar Coding dari Zero to Pro",
                "year": "2025",
                "category": "E-Learning / Developer Tools",
                "role": "FullStack Developer",
                "client": "Komunitas Belajar Coding",
                "description": "Website yang dibangun untuk pengguna untuk belajar coding dari zero to pro, dibangun dengan lingkungan Laravel.",
                "deliverables": [
                      "Kurikulum materi pemrograman terstruktur dari level pemula hingga mahir",
                      "Antarmuka belajar interaktif dengan latihan praktis dan evaluasi pemahaman",
                      "Sistem manajemen pengguna dan pelacakan progres belajar berbasis Laravel"
                ],
                "techStack": [
                      "Laravel",
                      "PHP",
                      "MySQL",
                      "Tailwind CSS",
                      "JavaScript"
                ],
                "metrics": {
                      "lingkungan": "Laravel",
                      "jalur": "Zero to Pro",
                      "basis": "Web App"
                },
                "links": {
                      "preview": "https://github.com/HanzzSama/TurnCode",
                      "code": "https://github.com/HanzzSama/TurnCode"
                },
                "accent": "var(--color-botanical-sage)",
                "blueprintSvg": "geometry",
                "deepDive": {
                      "architectureSchema": "[LEARNER / DEVELOPER UI]\n       │\n       ▼ HTTPS REST API\n[LARAVEL CORE: LEARNING ROADMAP ENGINE]\n       │\n       ├──► [MODULAR CURRICULUM: ZERO TO PRO]\n       │           │\n       │           ├──► [CODE PLAYGROUND & SANDBOX]\n       │           └──► [INTERACTIVE SYNTAX VALIDATOR]\n       │\n       ├──► [PROGRESSION & MILESTONE TRACKER]\n       │\n       ▼ ELOQUENT ORM\n[MYSQL DATABASE: USERS, LESSONS, COMPLETIONS]",
                      "problem": "Banyak calon programmer pemula kesulitan belajar mandiri karena materi online yang terpecah-pecah tanpa panduan tahapan yang runtut.",
                      "solution": "Membangun platform TurnCode di atas Laravel untuk menghadirkan alur belajar terpadu 'Zero to Pro' yang terarah dan mudah dipahami.",
                      "benchmarks": [
                            {
                                  "metric": "Alur Pembelajaran",
                                  "target": "Terstruktur",
                                  "achieved": "Zero to Pro"
                            },
                            {
                                  "metric": "Keandalan Sistem",
                                  "target": "Tinggi",
                                  "achieved": "Laravel MVC"
                            }
                      ]
                }
          },
          {
                "id": "proj-04",
                "code": "PRJ // 04",
                "title": "Neura AI",
                "subtitle": "Deteksi Gejala Alzheimer Berbasis LLM & XGBoost",
                "year": "2025",
                "category": "Healthcare AI / Web Intelligence",
                "role": "AI & FullStack Developer",
                "client": "Inisiatif Riset Kesehatan Kognitif",
                "description": "Website untuk mendeteksi gejala alzheimer dengan base LLM dan kalkulasi algoritma XGBoost.",
                "deliverables": [
                      "Integrasi LLM untuk analisis pemahaman bahasa dan kuesioner kognitif pengguna",
                      "Kalkulasi probabilitas klasifikasi gejala alzheimer dengan algoritma XGBoost",
                      "Penyajian hasil evaluasi yang jelas, aman, dan mudah dipahami pengguna"
                ],
                "techStack": [
                      "Python",
                      "XGBoost",
                      "LLM",
                      "FastAPI / Web",
                      "JavaScript",
                      "Tailwind CSS"
                ],
                "metrics": {
                      "base": "LLM + XGBoost",
                      "fokus": "Deteksi Alzheimer",
                      "analisis": "Kognitif"
                },
                "links": {
                      "preview": "https://github.com/HanzzSama/Neura",
                      "code": "https://github.com/HanzzSama/Neura"
                },
                "accent": "var(--color-warm-sand)",
                "blueprintSvg": "contour",
                "deepDive": {
                      "architectureSchema": "[CLINICAL ASSESSMENT / USER QUESTIONNAIRE]\n       │\n       ▼ WEBSOCKET / REST API\n[FASTAPI & LLM INTERFACE LAYER]\n       │\n       ├──► [LLM: SYMPTOM EXTRACTION & CONTEXT]\n       │           │\n       │           ▼\n       ├──► [FEATURE VECTOR PREPROCESSING]\n       │           │\n       │           ▼\n       ├──► [XGBOOST CLASSIFIER: ALZHEIMER RISK]\n       │           │\n       │           └──► [DECISION TREE ENSEMBLE SCORING]\n       │\n       ▼ JSON TELEMETRY RESPONSE\n[DIAGNOSTIC RADAR & RISK STRATIFICATION UI]",
                      "problem": "Pemeriksaan gejala alzheimer pada fase awal sering terlambat karena keterbatasan akses skrining kognitif awal yang cepat dan terjangkau.",
                      "solution": "Menggabungkan model LLM untuk ekstraksi interaksi bahasa dengan ketepatan algoritma tabular XGBoost guna mengkalkulasi indikasi gejala secara akurat.",
                      "benchmarks": [
                            {
                                  "metric": "Akurasi Prediksi",
                                  "target": "> 85%",
                                  "achieved": "Optimal XGBoost"
                            },
                            {
                                  "metric": "Kemudahan Evaluasi",
                                  "target": "Intuitif",
                                  "achieved": "Asesmen Interaktif"
                            }
                      ]
                }
          },
          {
                "id": "proj-05",
                "code": "PRJ // 05",
                "title": "Website Ladangku",
                "subtitle": "Platform Pertanian Modern & Optimasi Lahan",
                "year": "2022",
                "category": "Agrotech / Perlombaan",
                "role": "Web Designer & Developer",
                "client": "Inisiatif Kompetisi Agroteknologi",
                "description": "Membangun platform digital yang memadukan prinsip pertanian tradisional dengan teknologi modern untuk meningkatkan efisiensi dan produktivitas petani lokal.",
                "deliverables": [
                      "Perancangan antarmuka agrotech yang ramah pengguna",
                      "Katalog informasi pertanian modern dan kiat peningkatan hasil tani",
                      "Integrasi modul kalkulasi efisiensi panen berbasis web"
                ],
                "techStack": [
                      "PHP",
                      "HTML5",
                      "CSS3",
                      "JavaScript",
                      "MySQL"
                ],
                "metrics": {
                      "timeline": "2022",
                      "type": "Kompetisi",
                      "status": "Selesai"
                },
                "links": {
                      "preview": "#",
                      "code": "https://github.com/HanzzSama"
                },
                "accent": "var(--color-botanical-sage)",
                "blueprintSvg": "matrix",
                "deepDive": {
                      "architectureSchema": "[AGROTECH PORTAL USER]\n       │\n       ▼ HTTPS\n[PHP MVC FRAMEWORK & WEB RUNTIME]\n       │\n       ├──► [KATALOG PRODUK PERTANIAN & AGRIBISNIS]\n       │\n       ├──► [SISTEM INFORMASI KEMITRAAN PETANI]\n       │\n       ▼ MYSQL STORAGE\n[DATABASE PRODUK, ARTIKEL TANI & DATA MITRA]",
                      "problem": "Petani tradisional menghadapi kesulitan dalam pencatatan siklus tanam, pemetaan lahan, dan pemantauan sumber daya karena masih mengandalkan pencatatan manual di kertas.",
                      "solution": "Merancang Ladangku sebagai platform web ringan dengan navigasi sederhana, indikator status visual, dan aksesibilitas cepat melalui perangkat mobile para petani.",
                      "benchmarks": [
                            {
                                  "metric": "Kemudahan Navigasi",
                                  "target": "Intuitif",
                                  "achieved": "100% Sederhana"
                            },
                            {
                                  "metric": "Aksesibilitas Mobile",
                                  "target": "Responsif",
                                  "achieved": "Optimal di HP"
                            }
                      ]
                }
          },
          {
                "id": "proj-06",
                "code": "PRJ // 06",
                "title": "Pemesanan Makanan",
                "subtitle": "Solusi Digital Pemesanan Restoran & F&B",
                "year": "2022",
                "category": "Web Application / F&B",
                "role": "FullStack Developer",
                "client": "Restoran & Mitra Kuliner",
                "description": "Sistem pemesanan makanan online yang memudahkan pelanggan memilih menu hidangan secara instan dan mengoptimalkan alur manajemen pesanan kasir.",
                "deliverables": [
                      "Katalog menu makanan interaktif dengan filter kategori dan rincian harga",
                      "Sistem keranjang belanja pesanan (order cart) real-time",
                      "Ringkasan pesanan otomatis untuk meminimalisir kesalahan pelayan"
                ],
                "techStack": [
                      "JavaScript",
                      "PHP",
                      "Bootstrap",
                      "MySQL"
                ],
                "metrics": {
                      "timeline": "2022",
                      "type": "Web App",
                      "status": "Selesai"
                },
                "links": {
                      "preview": "#",
                      "code": "https://github.com/HanzzSama"
                },
                "accent": "var(--color-warm-sand)",
                "blueprintSvg": "geometry",
                "deepDive": {
                      "architectureSchema": "[CUSTOMER TABLE / MOBILE ORDER]\n       │\n       ▼\n[ORDER DISPATCHER & CART STATE]\n       │\n       ├──► [MENU SELECTOR & PRICING CALCULATOR]\n       │\n       ├──► [KITCHEN DISPLAY SYSTEM TICKETING]\n       │\n       ▼ TRANSACTION LOG\n[ORDER STATUS, PAYMENT RECEIPT & DATABASE]",
                      "problem": "Buku menu fisik konvensional memicu antrean pesanan yang lambat, kesalahan perhitungan harga manual, dan repot saat memperbarui daftar menu harian.",
                      "solution": "Membangun aplikasi menu digital yang responsif dengan kartu menu visual, perhitungan total harga otomatis, dan konfirmasi pesanan instan.",
                      "benchmarks": [
                            {
                                  "metric": "Waktu Pemesanan",
                                  "target": "< 1 Menit",
                                  "achieved": "Instan"
                            },
                            {
                                  "metric": "Akurasi Total Tagihan",
                                  "target": "100%",
                                  "achieved": "Otomatis"
                            }
                      ]
                }
          },
          {
                "id": "proj-07",
                "code": "PRJ // 07",
                "title": "Perpustakaan Buku",
                "subtitle": "Sistem Manajemen Sirkulasi & Katalog Pustaka",
                "year": "2023",
                "category": "Management System / Education",
                "role": "Backend & Database Developer",
                "client": "Institusi Pendidikan & Perpustakaan",
                "description": "Platform perpustakaan modern terpadu untuk memudahkan pencarian katalog buku, pengelolaan sirkulasi peminjaman, serta pendataan inventaris pustaka.",
                "deliverables": [
                      "Katalog buku dinamis dengan indikator ketersediaan real-time",
                      "Pencatatan sirkulasi peminjaman dan penghitungan denda keterlambatan",
                      "Dashboard administrasi untuk kontrol ketersediaan stok buku"
                ],
                "techStack": [
                      "PHP",
                      "MySQL",
                      "JavaScript",
                      "CSS3"
                ],
                "metrics": {
                      "timeline": "2023",
                      "type": "Sistem Informasi",
                      "status": "Selesai"
                },
                "links": {
                      "preview": "#",
                      "code": "https://github.com/HanzzSama"
                },
                "accent": "var(--color-botanical-sage)",
                "blueprintSvg": "orbit",
                "deepDive": {
                      "architectureSchema": "[SISWA & PUSTAKAWAN INTERFACE]\n       │\n       ▼\n[LIBRARY MANAGEMENT CORE]\n       │\n       ├──► [OPAC: ONLINE CATALOG SEARCH]\n       │\n       ├──► [CIRCULATION: PINJAM, KEMBALI, DENDA]\n       │\n       ▼ RELATIONAL SCHEMA\n[DATABASE BUKU, MEMBER, & RIWAYAT PEMINJAMAN]",
                      "problem": "Pencatatan buku pinjaman secara manual sering menyebabkan kehilangan buku, kekeliruan data peminjam, dan pencarian koleksi yang memakan waktu lama.",
                      "solution": "Menghadirkan sistem web terpadu yang mengotomatisasi log sirkulasi, memantau tenggat waktu pengembalian, dan menyajikan katalog buku yang mudah dicari.",
                      "benchmarks": [
                            {
                                  "metric": "Kecepatan Temu Kembali",
                                  "target": "< 3 Detik",
                                  "achieved": "Real-time"
                            },
                            {
                                  "metric": "Transparansi Denda",
                                  "target": "Akurat",
                                  "achieved": "Otomatis"
                            }
                      ]
                }
          },
          {
                "id": "proj-08",
                "code": "PRJ // 08",
                "title": "Pembayaran SPP",
                "subtitle": "Portal Administrasi Keuangan Sekolah Terpadu",
                "year": "2023",
                "category": "FinTech / Administration",
                "role": "Fullstack Developer",
                "client": "Administrasi Sekolah",
                "description": "Aplikasi pembayaran SPP online yang transparan, akuntabel, dan aman untuk memudahkan orang tua murid serta pihak administrasi sekolah memantau iuran bulanan.",
                "deliverables": [
                      "Pencatatan riwayat transaksi SPP dan tagihan siswa per periode",
                      "Cetak bukti pembayaran/kwitansi digital transparan",
                      "Manajemen otentikasi multi-peran (Admin, Petugas, Siswa)"
                ],
                "techStack": [
                      "Laravel",
                      "PHP",
                      "MySQL",
                      "Blade",
                      "Tailwind CSS"
                ],
                "metrics": {
                      "timeline": "2023",
                      "type": "Laravel App",
                      "status": "Selesai"
                },
                "links": {
                      "preview": "#",
                      "code": "https://github.com/HanzzSama/MySPP"
                },
                "accent": "var(--color-warm-sand)",
                "blueprintSvg": "matrix",
                "deepDive": {
                      "architectureSchema": "[ADMIN KEUANGAN & SISWA PORTAL]\n       │\n       ▼\n[FINANCIAL LEDGER & BILLING SYSTEM]\n       │\n       ├──► [VERIFIKASI TAGIHAN BULANAN SISWA]\n       │\n       ├──► [CETAK BUKTI PEMBAYARAN & KWITANSI]\n       │\n       ▼ TRANSACTION ARCHIVE\n[DATABASE TRANSAKSI, REKAP KAS & LAPORAN SPP]",
                      "problem": "Petugas keuangan sekolah kewalahan merekap pembayaran ratusan siswa secara manual di buku kas, menyulitkan pengecekan tunggakan secara akurat.",
                      "solution": "Membangun portal administrasi berbasis framework Laravel dengan database relasional terstruktur, verifikasi kwitansi otomatis, dan pelaporan keuangan bulanan.",
                      "benchmarks": [
                            {
                                  "metric": "Rekap Keuangan",
                                  "target": "Instan",
                                  "achieved": "Terpusat"
                            },
                            {
                                  "metric": "Integritas Data",
                                  "target": "Relasional",
                                  "achieved": "MySQL Terstruktur"
                            }
                      ]
                }
          },
          {
                "id": "proj-09",
                "code": "PRJ // 09",
                "title": "Mylist Todo App",
                "subtitle": "Aplikasi Manajemen Tugas Harian & Produktivitas",
                "year": "2024",
                "category": "Productivity / Web Tool",
                "role": "Frontend Developer & UI Designer",
                "client": "Aplikasi Personal & Komunitas",
                "description": "Aplikasi produktivitas yang dirancang minimalis dan bersih untuk membantu pengguna melacak, menyusun prioritas, dan menyelesaikan tugas harian secara terorganisir.",
                "deliverables": [
                      "Antarmuka penambahan, checklist, dan penghapusan tugas instan",
                      "Filter status tugas (Semua, Aktif, Selesai) secara responsif",
                      "Penyimpanan lokal instan tanpa jeda pemuatan server"
                ],
                "techStack": [
                      "JavaScript (ES6+)",
                      "CSS Modern",
                      "HTML5",
                      "LocalStorage"
                ],
                "metrics": {
                      "timeline": "2024",
                      "type": "Produktivitas",
                      "status": "Selesai"
                },
                "links": {
                      "preview": "#",
                      "code": "https://github.com/HanzzSama"
                },
                "accent": "var(--color-botanical-sage)",
                "blueprintSvg": "geometry",
                "deepDive": {
                      "architectureSchema": "[USER TASK INPUT & GESTURE CONTROL]\n       │\n       ▼\n[TASK STATE MANAGER: CRUD & FILTERING]\n       │\n       ├──► [PRIORITY MATRIX: HIGH / MED / LOW]\n       │\n       ├──► [LOCALSTORAGE OFFLINE SYNC]\n       │\n       ▼ REACTIVE DOM\n[INTERACTIVE TASK LIST & COMPLETION TELEMETRY]",
                      "problem": "Banyak aplikasi to-do dipenuhi fitur rumit dan iklan yang justru mengganggu fokus pengguna saat mencatat agenda penting harian.",
                      "solution": "Merancang Mylist Todo App dengan tampilan bersih, fokus navigasi cepat, dan persistensi LocalStorage untuk akses kilat setiap saat.",
                      "benchmarks": [
                            {
                                  "metric": "Waktu Muat",
                                  "target": "< 100ms",
                                  "achieved": "Instan"
                            },
                            {
                                  "metric": "Penyimpanan",
                                  "target": "Lokal",
                                  "achieved": "Zero Jeda"
                            }
                      ]
                }
          }
    ]
  },

  github: {
    sectionIndex: "05",
    sectionTitle: "GIT TELEMETRY & VAULT",
    sectionSub: "PUBLIC REPOSITORIES // CONTRIBUTION MATRIX",
    headline: "Repositori Terbuka & Matriks Kontribusi",
    description: "Arsip kode sumber publik, commit berkala, dan proyek rekayasa perangkat lunak mandiri yang didokumentasikan di ekosistem GitHub @HanzzSama.",
    profile: {
      username: "HanzzSama",
      profileUrl: "https://github.com/HanzzSama",
      avatarUrl: "./src/assets/hanzz-avatar.png",
      stats: [
        { label: "PUBLIC REPOS", value: "19", id: "repos" },
        { label: "ANNUAL COMMITS", value: "44+", id: "commits" },
        { label: "FOLLOWERS", value: "3", id: "followers" },
        { label: "FOLLOWING", value: "5", id: "following" },
        { label: "ACHIEVEMENT", value: "YOLO // UNLOCKED", id: "badge" }
      ],
      bio: "Hanzz // FullStack Developer & Systems Craftsman. ITESA Muhammadiyah Semarang.",
      actionLabel: "VISIT GITHUB PROFILE ↗"
    },
    repositories: [
      {
        id: "repo-01",
        name: "MathiCalc",
        fullName: "HanzzSama/MathiCalc",
        url: "https://github.com/HanzzSama/MathiCalc",
        description: "Mesin kalkulator komputasi presisi tinggi dengan evaluasi rumus matematika bertahap dan visualisasi ekspresi real-time.",
        language: "JavaScript",
        langColor: "#F7DF1E",
        stars: 1,
        forks: 0,
        badge: "CORE ENGINE",
        tag: "COMPUTATION"
      },
      {
        id: "repo-02",
        name: "MathiCore",
        fullName: "HanzzSama/MathiCore",
        url: "https://github.com/HanzzSama/MathiCore",
        description: "Inti pustaka parsing aljabar dan struktur data pohon sintaks matematika untuk evaluasi formula tanpa overhead.",
        language: "HTML / JS",
        langColor: "#E34F26",
        stars: 0,
        forks: 0,
        badge: "LIBRARY",
        tag: "ALGORITHM"
      },
      {
        id: "repo-03",
        name: "MySPP",
        fullName: "HanzzSama/MySPP",
        url: "https://github.com/HanzzSama/MySPP",
        description: "Sistem manajemen pembayaran SPP dan administrasi keuangan institusi pendidikan berbasis arsitektur MVC terstruktur.",
        language: "Blade / PHP",
        langColor: "#F05340",
        stars: 0,
        forks: 0,
        badge: "ENTERPRISE",
        tag: "ACADEMIA"
      },
      {
        id: "repo-04",
        name: "TiketKu",
        fullName: "HanzzSama/TiketKu",
        url: "https://github.com/HanzzSama/TiketKu",
        description: "Platform e-ticketing dan reservasi tiket terdistribusi dengan alur checkout instan dan validasi tiket QR aman.",
        language: "Blade / PHP",
        langColor: "#F05340",
        stars: 0,
        forks: 0,
        badge: "FULLSTACK",
        tag: "COMMERCE"
      },
      {
        id: "repo-05",
        name: "UrbanChic",
        fullName: "HanzzSama/UrbanChic",
        url: "https://github.com/HanzzSama/UrbanChic",
        description: "Katalog e-commerce gaya hidup urban dengan sistem keranjang belanja modular, filter kategori dinamis, dan UI responsif.",
        language: "Blade / PHP",
        langColor: "#F05340",
        stars: 0,
        forks: 0,
        badge: "COMMERCE",
        tag: "REACTIVE"
      },
      {
        id: "repo-06",
        name: "MusicGate",
        fullName: "HanzzSama/MusicGate",
        url: "https://github.com/HanzzSama/MusicGate",
        description: "Pintu gerbang agregasi audio digital dan kurasi playlist berkinerja tinggi dengan antarmuka media taktil.",
        language: "Blade / PHP",
        langColor: "#F05340",
        stars: 0,
        forks: 0,
        badge: "STREAMING",
        tag: "AUDIO WEB"
      }
    ],
    heatmap: {
      year: "2026",
      totalContributions: "44 kontribusi dalam setahun terakhir",
      legend: ["Less", "Level 1", "Level 2", "Level 3", "More"]
    }
  },

  kineticLab: {
    sectionIndex: "06.A",
    title: "KINETIC MONOLITH SIMULATOR",
    subtitle: "REAL-TIME 3D WIREFRAME // ROTATIONAL GRAVITY GYROSCOPE",
    description: "Eksperimen grafis komputasional 3D interaktif murni Canvas. Drag untuk merotasi geometri monolit, ubah topologi bentuk, dan amati pembelokan sumbu koordinat secara real-time.",
    modes: [
      { id: "monolith", label: "Tectonic Monolith", vertices: 8, edges: 12 },
      { id: "cymatics", label: "Harmonic Cymatics Core", vertices: 66, edges: 144 },
      { id: "manta", label: "Giant Manta Ray", vertices: 44, edges: 92 },
      { id: "helix", label: "Biophilic Double Helix", vertices: 48, edges: 70 },
      { id: "torus", label: "Quantum Torus Knot", vertices: 64, edges: 128 },
      { id: "tesseract", label: "Hypercube 4D", vertices: 16, edges: 32 },
      { id: "geodesic", label: "Icosahedron Sphere", vertices: 12, edges: 30 },
      { id: "wave", label: "Topographic Grid", vertices: 36, edges: 60 }
    ],
    telemetryLabels: {
      rotation: "ROTATION MATRIX",
      vertexCount: "ACTIVE VERTICES",
      inertia: "VELOCITY DAMPING",
      fps: "RENDER FPS"
    }
  },

  weather: {
    sectionIndex: "07",
    sectionTitle: "SUASANA & CUACA",
    sectionSub: "TELEMETRI CUACA KOTA SEMARANG // REAL-TIME",
    headline: "Cuaca Real-Time & Suasana Atmosfer",
    description: "Visualisasi interaktif cuaca real-time Kota Semarang (07°00'S 110°25'E) dengan suasana atmosfer dinamis, garis isobar topografi, dan nada harmonis.",
    topologyBadge: "KOTA SEMARANG // 07°00'S 110°25'E • 82m ASL",
    ui: {
      isobars: "[ISOBARS]",
      windStream: "[VEKTOR ANGIN]",
      nadaWave: "NADA WAVE // 432Hz",
      pressure: "Tekanan Barometrik",
      wind: "Vektor Angin",
      humidity: "Kelembapan Udara",
      cloudCover: "Tutupan Awan",
      apparent: "APPARENT:",
      sync: "REFRESH TELEMETRI ↻",
      biosphereFootprint: "NODE: SEMARANG // JAWA TENGAH",
      solarCycle: "SIKLUS MATAHARI // SUASANA REAL"
    }
  },

  pet: {
    name: "HanzzPet",
    statusPrefix: "HANZZ.BOT // AKTIF",
    defaultThought: "Menghubungkan ke Node Semarang... [Haidar Rifky Andrianno]",
    tips: {
      pet: "Elus HanzzBot",
      crown: "Mahkota Royal",
      matcha: "Beri Matcha",
      zoomies: "Mode Lincah",
      wisdom: "Celoteh HanzzBot",
      sleep: "Tidur / Bangun",
      toggle: "Ciutkan"
    }
  },

  another: {
    sectionIndex: "06",
    sectionTitle: "REFLEKSI & CATATAN KREATIF",
    sectionSub: "PENGALAMAN & EKSPLORASI TEKNOLOGI // HANZZ",
    description:
      "Kumpulan artikel, catatan pengalaman, dan refleksi proses kreatif dalam merancang antarmuka web, kolaborasi tim, dan eksplorasi teknologi.",
    gardenNotes: [
      {
        id: "note-01",
        date: "2026",
        tag: "REFLEKSI // 01",
        title: "4 Tahun di Dunia IT: Dari Rasa Penasaran Hingga Solusi Nyata",
        readTime: "5 menit baca",
        excerpt:
          "Perjalanan dari awal mula ketertarikan pada teknologi, belajar pemrograman mandiri, hingga merancang website dan aplikasi yang bermanfaat bagi sesama.",
        content: `
          <h4>1. Awal Mula Ketertarikan</h4>
          <p>Berawal dari rasa penasaran yang tinggi terhadap bagaimana sebuah website dan aplikasi digital bekerja, saya mulai mempelajari dasar-dasar pemrograman web. Dari HTML, CSS, hingga JavaScript, setiap baris kode membuka cara pandang baru tentang bagaimana teknologi dapat memecahkan masalah sehari-hari.</p>
          <h4>2. Belajar Mandiri dan Membangun Portofolio</h4>
          <p>Selama 4 tahun berkarya, saya konsisten mengeksplorasi ekosistem web modern — mulai dari PHP dan Laravel untuk backend, Tailwind dan Bootstrap untuk styling yang efisien, hingga kakas desain seperti Figma dan Illustrator untuk merancang antarmuka yang ramah pengguna.</p>
          <h4>3. Dampak Nyata untuk Pengguna</h4>
          <p>Tujuan utama saya masuk dunia IT adalah menciptakan desain dan pengalaman baru yang bermanfaat bagi orang lain. Karya yang baik bukan hanya tentang estetika visual, melainkan tentang kemudahan dan nilai manfaat yang dirasakan penggunanya.</p>
        `
      },
      {
        id: "note-02",
        date: "2026",
        tag: "DESAIN & KODE // 02",
        title: "Menghubungkan Desain UI/UX dengan Kode Web yang Interaktif",
        readTime: "4 menit baca",
        excerpt:
          "Bagaimana desainer yang memahami kode dapat menciptakan pengalaman pengguna yang mulus tanpa batasan antara rancangan visual dan implementasi teknis.",
        content: `
          <h4>1. Kolaborasi Desain dan Kode</h4>
          <p>Sering kali ada jarak antara konsep visual di Figma dengan hasil akhir di browser. Dengan memiliki keahlian di bidang UI/UX sekaligus Web Development, proses penerjemahan rancangan menjadi kode berjalan lebih cepat, presisi, dan sesuai dengan visi interaksi awal.</p>
          <h4>2. Kenyamanan Pengguna sebagai Prioritas</h4>
          <p>Antarmuka yang bersih, hierarki tipografi yang jelas, dan navigasi yang intuitif adalah kunci. Interaksi yang responsif pada perangkat mobile memastikan pengguna merasa nyaman saat berinteraksi dengan produk digital.</p>
          <h4>3. Detail Interaksi yang Menyenangkan</h4>
          <p>Sentuhan mikro-interaksi seperti animasi hover, responsivitas elemen, dan feedback visual instan mengubah website biasa menjadi pengalaman digital yang hidup dan berkesan.</p>
        `
      },
      {
        id: "note-03",
        date: "2026",
        tag: "AKADEMIK & STUDI // 03",
        title: "Studi dan Kolaborasi Terapan di ITESA Muhammadiyah Semarang",
        readTime: "5 menit baca",
        excerpt:
          "Pengalaman belajar di kampus ITESA Muhammadiyah Semarang yang memperkaya wawasan logika komputasi, pemecahan masalah analitis, dan kerja sama tim.",
        content: `
          <h4>1. Fondasi Akademik di ITESA</h4>
          <p>Menempuh pendidikan di ITESA Muhammadiyah Semarang memberikan fondasi yang kuat dalam memahami logika komputasi, analisis data, dan perancangan sistem terstruktur. Teori yang dipelajari di kelas langsung diterapkan ke dalam proyek-proyek praktis.</p>
          <h4>2. Semangat Kolaboratif</h4>
          <p>Sebagai kolaborator kreatif, saya percaya bahwa proyek besar lahir dari komunikasi yang solid dan pembagian peran yang seimbang. Kolaborasi antar-mahasiswa dan dosen menghasilkan karya nyata seperti portal PMB ITESA dan berbagai proyek lainnya.</p>
          <h4>3. Komitmen Terus Berkembang</h4>
          <p>Dunia teknologi terus bergerak maju dengan cepat. Semangat untuk terus belajar keterampilan baru, mengeksplorasi teknologi baru, dan menyambut tantangan kreatif adalah modal utama untuk terus berkontribusi di masa depan.</p>
        `
      }
    ],
    audioSynth: {
      title: "Generator Nada Resonansi Harmonis",
      tagline: "Frekuensi Alami 432Hz • Node Audio Web Interaktif",
      frequencies: [
        { label: "Ground (108Hz)", freq: 108, desc: "Nada Sub-Bass Alami" },
        { label: "Sage Earth (216Hz)", freq: 216, desc: "Harmoni Fondasi Dasar" },
        { label: "Natural Calm (432Hz)", freq: 432, desc: "Nada Resonansi Harmonis" },
        { label: "Canopy Air (864Hz)", freq: 864, desc: "Nada Cerah Atmosfer" }
      ]
    },
    colophon: {
      typography: "Syne • Instrument Serif • Plus Jakarta Sans • JetBrains Mono",
      gridSystem: "Tata Letak Responsif & Desain Interaktif",
      carbonEstimate: "Dioptimalkan untuk Performa Cepat & Aksesibilitas",
      license: "Portofolio © 2026 Haidar Rifky Andrianno (Hanzz / HanzzSama). Semarang, Jawa Tengah, Indonesia."
    }
  }
};

/**
 * Returns localized portfolio data merged with the selected language translation.
 * @param {string} lang - 'id' | 'en' | 'zh' | 'ja' | 'de'
 * @returns {object}
 */
export function getPortfolioData(lang = 'id') {
  const t = translations[lang] || translations.id;
  
  // Deep clone base data to avoid mutating original source
  const localized = JSON.parse(JSON.stringify(portfolioData));

  if (t.welcome) {
    localized.welcome = { ...localized.welcome, ...t.welcome };
  }

  if (t.about) {
    localized.about.sectionTitle = t.about.sectionTitle || localized.about.sectionTitle;
    localized.about.sectionSub = t.about.sectionSub || localized.about.sectionSub;
    localized.about.ethosTitle = t.about.ethosTitle || localized.about.ethosTitle;
    localized.about.ethosParagraphs = t.about.ethosParagraphs || localized.about.ethosParagraphs;
    if (t.about.timelineTitle) localized.about.timelineTitle = t.about.timelineTitle;
    if (t.about.pillars) localized.about.pillars = t.about.pillars;
    if (t.about.timeline) localized.about.timeline = t.about.timeline;
  }

  if (t.skills) {
    localized.skills.sectionTitle = t.skills.sectionTitle || localized.skills.sectionTitle;
    localized.skills.sectionSub = t.skills.sectionSub || localized.skills.sectionSub;
    localized.skills.headline = t.skills.headline || localized.skills.headline;
    localized.skills.description = t.skills.description || localized.skills.description;
    if (t.skills.matrixTiers && Array.isArray(t.skills.matrixTiers)) {
      localized.skills.matrixTiers = localized.skills.matrixTiers.map((tier, idx) => {
        const transTier = t.skills.matrixTiers[idx];
        if (!transTier) return tier;
        return {
          ...tier,
          concept: transTier.concept || tier.concept,
          layerName: transTier.layerName || tier.layerName,
          nodes: tier.nodes.map((node, nodeIdx) => {
            const transNode = transTier.nodes?.[nodeIdx];
            if (!transNode) return node;
            return {
              ...node,
              name: transNode.name || node.name,
              spec: transNode.spec || node.spec,
              tag: transNode.tag || node.tag
            };
          })
        };
      });
    }
  }

  if (t.projects) {
    localized.projects.sectionTitle = t.projects.sectionTitle || localized.projects.sectionTitle;
    localized.projects.sectionSub = t.projects.sectionSub || localized.projects.sectionSub;
    localized.projects.headline = t.projects.headline || localized.projects.headline;
    localized.projects.description = t.projects.description || localized.projects.description;
    localized.projects.ui = t.projects.ui || localized.projects.ui;
    if (t.projects.items) {
      localized.projects.items = localized.projects.items.map((item, idx) => {
        const transItem = t.projects.items[item.id] || t.projects.items[idx];
        if (!transItem) return item;
        return {
          ...item,
          subtitle: transItem.subtitle || item.subtitle,
          category: transItem.category || item.category,
          role: transItem.role || item.role,
          client: transItem.client || item.client,
          description: transItem.description || item.description,
          deliverables: transItem.deliverables || item.deliverables,
          metrics: transItem.metrics || item.metrics,
          deepDive: transItem.deepDive ? {
            ...item.deepDive,
            problem: transItem.deepDive.problem || item.deepDive?.problem,
            solution: transItem.deepDive.solution || item.deepDive?.solution,
            architectureSchema: transItem.deepDive.architectureSchema || item.deepDive?.architectureSchema || ''
          } : item.deepDive
        };
      });
    } else if (t.projects.itemsDesc) {
      localized.projects.items = localized.projects.items.map((item) => ({
        ...item,
        description: t.projects.itemsDesc[item.id] || item.description
      }));
    }
  }

  if (t.github) {
    localized.github.sectionTitle = t.github.sectionTitle || localized.github.sectionTitle;
    localized.github.sectionSub = t.github.sectionSub || localized.github.sectionSub;
    localized.github.headline = t.github.headline || localized.github.headline;
    localized.github.description = t.github.description || localized.github.description;
    if (t.github.profile) {
      localized.github.profile = {
        ...localized.github.profile,
        ...t.github.profile,
        stats: t.github.profile.stats || localized.github.profile.stats
      };
    }
    if (t.github.heatmap) {
      localized.github.heatmap = {
        ...localized.github.heatmap,
        ...t.github.heatmap
      };
    }
    if (t.github.repositories) {
      localized.github.repositories = localized.github.repositories.map((repo, idx) => {
        const transRepo = t.github.repositories[repo.id] || t.github.repositories[idx];
        if (!transRepo) return repo;
        return {
          ...repo,
          description: transRepo.description || repo.description,
          badge: transRepo.badge || repo.badge,
          tag: transRepo.tag || repo.tag
        };
      });
    }
  }

  if (t.kineticLab) {
    localized.kineticLab = {
      ...localized.kineticLab,
      ...t.kineticLab
    };
  }

  if (t.weather) {
    localized.weather = {
      ...localized.weather,
      ...t.weather,
      ui: { ...localized.weather.ui, ...t.weather.ui }
    };
  }

  if (t.another) {
    localized.another.sectionTitle = t.another.sectionTitle || localized.another.sectionTitle;
    localized.another.sectionSub = t.another.sectionSub || localized.another.sectionSub;
    localized.another.headline = t.another.headline || localized.another.headline;
    localized.another.description = t.another.description || localized.another.description;
    localized.another.ui = t.another.ui || localized.another.ui;
    if (t.another.gardenNotes) {
      localized.another.gardenNotes = localized.another.gardenNotes.map((note, idx) => {
        const transNote = t.another.gardenNotes[note.id] || t.another.gardenNotes[idx];
        if (!transNote) return note;
        return {
          ...note,
          title: transNote.title || note.title,
          excerpt: transNote.excerpt || note.excerpt,
          readTime: transNote.readTime || note.readTime,
          content: transNote.content || note.content
        };
      });
    }
    if (t.another.audioSynth) {
      localized.another.audioSynth = {
        ...localized.another.audioSynth,
        ...t.another.audioSynth
      };
    }
    if (t.another.colophon) {
      localized.another.colophon = {
        ...localized.another.colophon,
        ...t.another.colophon
      };
    }
  }

  if (t.pet) {
    localized.pet = t.pet;
  }

  if (t.meta) {
    localized.meta = { ...localized.meta, ...t.meta };
  }

  localized.currentLang = lang;
  localized.t = t;

  return localized;
}

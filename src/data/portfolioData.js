/**
 * PORTFOLIO DATA ARCHITECTURE
 * Centralized Single Source of Truth
 * Identity: Haidar Rifky Andrianno
 * Academic Base: ITESA Muhammadiyah Semarang
 * Geo-Nodes: Semarang, Indonesia
 */

import { translations } from './translations.js';
import { adminStorage } from '../core/adminStorageManager.js';

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
    photoCaption: "Foto Haidar Rifky Andrianno di Pantai Pacitan",
    location: "Indonesia | Jawa Tengah | Kota Semarang",
    institution: {
      name: "ITESA Muhammadiyah Semarang",
      fullName: "Institut Teknologi Statistika dan Bisnis Muhammadiyah Semarang",
      status: "Mahasiswa Aktif // Komputasi & Bisnis Terapan",
      period: "2023 sampai sekarang"
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
      "Saya desainer, kolaborator kreatif, dan perancang website dengan pengalaman 4 tahun di bidang IT. Karya saya mencakup desain UI/UX web dan mobile serta website interaktif.",
    telemetry: [
      { label: "PENGALAMAN", value: "4+ Tahun di Dunia IT" },
      { label: "LOKASI", value: "Kota Semarang, Jawa Tengah" },
      { label: "KAMPUS", value: "ITESA Muhammadiyah Semarang" },
      { label: "SPESIALISASI", value: "UI/UX & Web Development" }
    ]
  },

  about: {
    sectionIndex: "02",
    sectionTitle: "Tentang saya",
    sectionSub: "HAIDAR RIFKY ANDRIANNO // KOTA SEMARANG",
    ethosTitle: "Membuat desain dan pengalaman baru yang berguna",
    photo: "./src/assets/Hanzz.jpeg",
    photoCaption: "Foto Haidar Rifky Andrianno di Pantai Pacitan",
    locationBadge: "Indonesia | Jawa Tengah | Kota Semarang",
    ethosParagraphs: [
      "Saya desainer, kolaborator kreatif, dan perancang website dengan pengalaman 4 tahun di bidang IT. Tujuan utama saya masuk dunia IT adalah membuat desain dan pengalaman baru. Karya saya mencakup desain UI/UX web dan mobile, serta website interaktif yang sederhana.",
      "Saya terus mempelajari keterampilan baru dan menerima tantangan kreatif baru."
    ],
    pillars: [
      {
        code: "FOKUS-01",
        title: "Web & Mobile UI/UX",
        desc: "Merancang tata letak antarmuka yang bersih dan mudah dipakai di web dan aplikasi mobile."
      },
      {
        code: "FOKUS-02",
        title: "Interactive web development",
        desc: "Membangun website dengan kode yang rapi dan interaksi yang berjalan di ponsel, tablet, dan desktop."
      },
      {
        code: "FOKUS-03",
        title: "Kolaborasi kreatif",
        desc: "Bekerja dalam tim untuk mengubah kebutuhan menjadi produk digital."
      },
      {
        code: "FOKUS-04",
        title: "Pembelajaran berkelanjutan",
        desc: "Mempelajari kakas desain baru dan melatih kemampuan pemrograman secara rutin."
      }
    ],
    timelineTitle: "Kronologi karier dan pengalaman",
    timeline: [
      {
        year: "2026 sampai sekarang",
        title: "Pengembangan lanjutan frontend dan backend",
        place: "Semarang, Jawa Tengah",
        description: "Mempelajari frontend dan backend, merancang arsitektur sistem, dan mengembangkan web interaktif."
      },
      {
        year: "2025 sampai 2026",
        title: "Artificial intelligence dan fullstack engineering",
        place: "ITESA Muhammadiyah Semarang",
        description: "Mempelajari artificial intelligence dan fullstack development sambil kuliah di ITESA Muhammadiyah Semarang."
      },
      {
        year: "2024 sampai 2025",
        title: "Pengembangan keterampilan coding dan fullstack developer",
        place: "Semarang, Jawa Tengah",
        description: "Melatih coding frontend dan backend untuk bekerja sebagai fullstack developer."
      },
      {
        year: "2022 sampai 2024",
        title: "Eksplorasi web, aplikasi, dan software engineering",
        place: "SMK TEXMACO Semarang",
        description: "Mulai membuat website dan aplikasi serta mempelajari software engineering di SMK TEXMACO Semarang."
      },
      {
        year: "2020 sampai 2022",
        title: "Eksplorasi awal cyber security tools",
        place: "SMP TEXMACO Semarang",
        description: "Mulai mempelajari cyber security tools di SMP TEXMACO Semarang."
      }
    ]
  },

  skills: {
    sectionIndex: "03",
    sectionTitle: "Keahlian dan kompetensi",
    sectionSub: "17 KEAHLIAN TEKNIS DAN VISUAL",
    headline: "Keahlian dan perangkat yang dikuasai",
    description:
      "17 keahlian teknis dan visual dari 4 tahun bekerja di bidang IT, dibagi dalam 4 kelompok.",
    matrixTiers: [
      {
        tierId: "TIER-01",
        layerName: "Frontend & web core",
        concept: "Antarmuka & pengalaman web",
        colorAccent: "var(--color-botanical-sage)",
        nodes: [
          { name: "HTML", spec: "Semantik & struktur standar web", tag: "CORE" },
          { name: "CSS", spec: "Desain responsif, Flexbox, Grid", tag: "STYLE" },
          { name: "JavaScript", spec: "Interaktivitas klien & DOM dinamis", tag: "SCRIPT" },
          { name: "Tailwind CSS", spec: "Styling dengan utility class", tag: "FRAMEWORK" },
          { name: "Bootstrap", spec: "Komponen cepat & tata letak Grid", tag: "UI KIT" }
        ]
      },
      {
        tierId: "TIER-02",
        layerName: "Backend & database",
        concept: "Logika server & pengelolaan data",
        colorAccent: "var(--color-warm-sand)",
        nodes: [
          { name: "PHP", spec: "Pemrograman server & arsitektur MVC", tag: "BACKEND" },
          { name: "Laravel", spec: "Framework PHP", tag: "FRAMEWORK" },
          { name: "MySQL", spec: "Manajemen database relasional", tag: "DATABASE" },
          { name: "Node JS", spec: "Runtime JavaScript & API dasar", tag: "RUNTIME" },
          { name: "Elixir & Phoenix", spec: "Eksplorasi konkurensi & backend", tag: "EXPLORE" }
        ]
      },
      {
        tierId: "TIER-03",
        layerName: "Desain UI/UX & grafis",
        concept: "Estetika spasial & kreativitas visual",
        colorAccent: "var(--color-botanical-sage)",
        nodes: [
          { name: "Figma", spec: "Desain prototipe UI/UX web & mobile", tag: "DESIGN" },
          { name: "Canva", spec: "Grafis digital & materi presentasi", tag: "CREATIVE" },
          { name: "Adobe Illustrator", spec: "Ilustrasi vektor & identitas aset", tag: "VECTOR" },
          { name: "3D Blender", spec: "Pemodelan objek 3D dasar", tag: "3D MOD" }
        ]
      },
      {
        tierId: "TIER-04",
        layerName: "Alat produktivitas & sistem",
        concept: "Alur kerja & pengelolaan proyek",
        colorAccent: "var(--color-charcoal-slate)",
        nodes: [
          { name: "Git & GitHub", spec: "Version control & repositori proyek", tag: "VCS" },
          { name: "Microsoft Office", spec: "Dokumentasi & administrasi data", tag: "OFFICE" },
          { name: "Kali Linux Tools", spec: "Pengenalan jaringan & keamanan dasar", tag: "SECURITY" }
        ]
      }
    ]
  },

  projects: {
    sectionIndex: "04",
    sectionTitle: "Proyek karya",
    sectionSub: "9 KARYA TERPILIH // WEB & APLIKASI",
    headline: "Proyek terpilih",
    description:
      "9 proyek: portal informasi PMB ITESA, kalkulator Mathicalc dengan bot matematika, platform belajar coding TurnCode, sistem Neura AI untuk mendeteksi gejala alzheimer, aplikasi agrotech, aplikasi pemesanan makanan, sistem perpustakaan, aplikasi pembayaran SPP, dan aplikasi to-do.",
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
                "subtitle": "Website informasi pendaftaran mahasiswa baru kampus",
                "year": "2026",
                "category": "Portal Kampus / Web System",
                "role": "FullStack Web Developer",
                "client": "ITESA Muhammadiyah Semarang",
                "description": "Website informasi pendaftaran mahasiswa baru ITESA, dibangun dengan Laravel.",
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
                "subtitle": "Kalkulator basic dengan bot matematis dan personalisasi tema",
                "year": "2025",
                "category": "Web Tool / Komputasi",
                "role": "Frontend Developer",
                "client": "Kakas Personal & Edukasi",
                "description": "Kalkulator dengan bot matematika dan tema yang bisa diubah sesuai selera, dibuat hanya dengan HTML, CSS, dan JavaScript.",
                "deliverables": [
                      "Mesin kalkulasi matematika cepat dan responsif di browser",
                      "Bot matematika yang memandu perhitungan dan formula",
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
                      "solution": "Mengembangkan Mathicalc dengan HTML, CSS, dan JavaScript saja. Mathicalc memiliki bot asisten matematika dan tema yang bisa diubah, tanpa dependensi tambahan.",
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
                "subtitle": "Platform belajar coding dari zero to pro",
                "year": "2025",
                "category": "E-Learning / Developer Tools",
                "role": "FullStack Developer",
                "client": "Komunitas Belajar Coding",
                "description": "Website untuk belajar coding dari zero to pro, dibangun dengan Laravel.",
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
                "blueprintSvg": "roadmap",
                "deepDive": {
                      "architectureSchema": "[LEARNER / DEVELOPER UI]\n       │\n       ▼ HTTPS REST API\n[LARAVEL CORE: LEARNING ROADMAP ENGINE]\n       │\n       ├──► [MODULAR CURRICULUM: ZERO TO PRO]\n       │           │\n       │           ├──► [CODE PLAYGROUND & SANDBOX]\n       │           └──► [INTERACTIVE SYNTAX VALIDATOR]\n       │\n       ├──► [PROGRESSION & MILESTONE TRACKER]\n       │\n       ▼ ELOQUENT ORM\n[MYSQL DATABASE: USERS, LESSONS, COMPLETIONS]",
                      "problem": "Banyak calon programmer pemula kesulitan belajar mandiri karena materi online yang terpecah-pecah tanpa panduan tahapan yang runtut.",
                      "solution": "Membangun platform TurnCode dengan Laravel dan alur belajar bertahap dari zero to pro.",
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
                "subtitle": "Deteksi gejala Alzheimer berbasis LLM dan XGBoost",
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
                "blueprintSvg": "neural",
                "deepDive": {
                      "architectureSchema": "[CLINICAL ASSESSMENT / USER QUESTIONNAIRE]\n       │\n       ▼ WEBSOCKET / REST API\n[FASTAPI & LLM INTERFACE LAYER]\n       │\n       ├──► [LLM: SYMPTOM EXTRACTION & CONTEXT]\n       │           │\n       │           ▼\n       ├──► [FEATURE VECTOR PREPROCESSING]\n       │           │\n       │           ▼\n       ├──► [XGBOOST CLASSIFIER: ALZHEIMER RISK]\n       │           │\n       │           └──► [DECISION TREE ENSEMBLE SCORING]\n       │\n       ▼ JSON TELEMETRY RESPONSE\n[DIAGNOSTIC RADAR & RISK STRATIFICATION UI]",
                      "problem": "Pemeriksaan gejala alzheimer pada fase awal sering terlambat karena keterbatasan akses skrining kognitif awal yang cepat dan terjangkau.",
                      "solution": "Menggabungkan model LLM untuk mengekstrak gejala dari bahasa pengguna dengan algoritma XGBoost untuk menghitung indikasi gejala.",
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
                "subtitle": "Platform pertanian modern dan optimasi lahan",
                "year": "2022",
                "category": "Agrotech / Perlombaan",
                "role": "Web Designer & Developer",
                "client": "Inisiatif Kompetisi Agroteknologi",
                "description": "Platform web yang membantu petani lokal meningkatkan hasil tani dengan katalog informasi dan kalkulasi panen.",
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
                "blueprintSvg": "topographic",
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
                "subtitle": "Solusi digital pemesanan restoran dan F&B",
                "year": "2022",
                "category": "Web Application / F&B",
                "role": "FullStack Developer",
                "client": "Restoran & Mitra Kuliner",
                "description": "Sistem pemesanan makanan online untuk memilih menu dan mengelola pesanan kasir.",
                "deliverables": [
                      "Katalog menu makanan interaktif dengan filter kategori dan rincian harga",
                      "Keranjang pesanan real-time",
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
                "subtitle": "Sistem manajemen sirkulasi dan katalog pustaka",
                "year": "2023",
                "category": "Management System / Education",
                "role": "Backend & Database Developer",
                "client": "Institusi Pendidikan & Perpustakaan",
                "description": "Sistem perpustakaan untuk mencari katalog buku, mengelola peminjaman, dan mendata inventaris.",
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
                "subtitle": "Portal administrasi keuangan sekolah terpadu",
                "year": "2023",
                "category": "FinTech / Administration",
                "role": "Fullstack Developer",
                "client": "Administrasi Sekolah",
                "description": "Aplikasi pembayaran SPP online untuk orang tua murid dan administrasi sekolah memantau iuran bulanan.",
                "deliverables": [
                      "Pencatatan riwayat transaksi SPP dan tagihan siswa per periode",
                      "Cetak bukti pembayaran dan kwitansi digital",
                      "Autentikasi multi-peran: Admin, Petugas, dan Siswa"
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
                "subtitle": "Aplikasi manajemen tugas harian dan produktivitas",
                "year": "2024",
                "category": "Productivity / Web Tool",
                "role": "Frontend Developer & UI Designer",
                "client": "Aplikasi Personal & Komunitas",
                "description": "Aplikasi to-do untuk mencatat, memprioritaskan, dan menyelesaikan tugas harian.",
                "deliverables": [
                      "Antarmuka penambahan, checklist, dan penghapusan tugas instan",
                      "Filter status tugas: Semua, Aktif, dan Selesai",
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
                "blueprintSvg": "roadmap",
                "deepDive": {
                      "architectureSchema": "[USER TASK INPUT & GESTURE CONTROL]\n       │\n       ▼\n[TASK STATE MANAGER: CRUD & FILTERING]\n       │\n       ├──► [PRIORITY MATRIX: HIGH / MED / LOW]\n       │\n       ├──► [LOCALSTORAGE OFFLINE SYNC]\n       │\n       ▼ REACTIVE DOM\n[INTERACTIVE TASK LIST & COMPLETION TELEMETRY]",
                      "problem": "Banyak aplikasi to-do dipenuhi fitur rumit dan iklan yang justru mengganggu fokus pengguna saat mencatat agenda penting harian.",
                      "solution": "Merancang Mylist Todo App dengan tampilan bersih dan penyimpanan LocalStorage agar data tetap ada saat halaman dibuka lagi.",
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
    sectionTitle: "Telemetri dan repositori Git",
    sectionSub: "PUBLIC REPOSITORIES // CONTRIBUTION MATRIX",
    headline: "Repositori terbuka dan kontribusi",
    description: "Kode sumber publik, commit rutin, dan proyek pribadi di GitHub @HanzzSama.",
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
      bio: "Haidar Rifky Andrianno, alias Hanzz. Designer dan web developer. Mahasiswa ITESA Muhammadiyah Semarang.",
      actionLabel: "VISIT GITHUB PROFILE"
    },
    repositories: [
      {
        id: "repo-01",
        name: "MathiCalc",
        fullName: "HanzzSama/MathiCalc",
        url: "https://github.com/HanzzSama/MathiCalc",
        description: "Mesin kalkulator dengan evaluasi rumus matematika bertahap dan visualisasi ekspresi real-time.",
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
        description: "Pustaka parsing aljabar dan pohon sintaks matematika untuk mengevaluasi formula.",
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
        description: "Sistem pembayaran SPP dan administrasi keuangan sekolah dengan arsitektur MVC.",
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
        description: "Platform e-ticketing dengan checkout dan validasi tiket QR.",
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
        description: "Katalog e-commerce dengan keranjang belanja, filter kategori, dan UI responsif.",
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
        description: "Agregator audio digital dan kurasi playlist dengan antarmuka pemutar.",
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
    title: "Kinetic monolith simulator",
    subtitle: "Wireframe 3D real-time, gyroscope gravitasi rotasional",
    description: "Eksperimen grafis 3D interaktif yang dibuat hanya dengan Canvas. Seret untuk memutar monolit, ganti bentuk, dan lihat sumbu koordinat berubah secara real-time.",
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
    sectionTitle: "Suasana dan cuaca",
    sectionSub: "TELEMETRI CUACA KOTA SEMARANG // REAL-TIME",
    headline: "Cuaca real-time dan suasana atmosfer",
    description: "Cuaca real-time Kota Semarang di 07°00'S 110°25'E, dengan visual atmosfer, garis isobar, dan nada harmonis.",
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
      sync: "REFRESH TELEMETRI",
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
      crown: "Mahkota royal",
      matcha: "Beri matcha",
      zoomies: "Mode lincah",
      wisdom: "Celoteh HanzzBot",
      sleep: "Tidur / bangun",
      toggle: "Ciutkan"
    }
  },

  another: {
    sectionIndex: "06",
    sectionTitle: "Refleksi dan catatan kreatif",
    sectionSub: "PENGALAMAN & EKSPLORASI TEKNOLOGI // HANZZ",
    description:
      "Catatan tentang merancang antarmuka web, bekerja dalam tim, dan mencoba teknologi baru.",
    gardenNotes: [
      {
        id: "note-01",
        date: "2026",
        tag: "REFLEKSI // 01",
        title: "Empat tahun di dunia IT",
        readTime: "5 menit baca",
        excerpt:
          "Cerita tentang ketertarikan awal pada teknologi, belajar pemrograman secara mandiri, dan membuat website serta aplikasi.",
        content: `
          <h4>1. Awal mula ketertarikan</h4>
          <p>Saya mulai belajar dasar-dasar pemrograman web karena ingin tahu cara kerja website dan aplikasi digital. Saya belajar HTML, CSS, dan JavaScript, lalu memakainya untuk menyelesaikan masalah sehari-hari.</p>
          <h4>2. Belajar mandiri dan membangun portofolio</h4>
          <p>Selama 4 tahun, saya mempelajari PHP dan Laravel untuk backend, Tailwind dan Bootstrap untuk styling, serta Figma dan Illustrator untuk merancang antarmuka.</p>
          <h4>3. Dampak untuk pengguna</h4>
          <p>Tujuan utama saya masuk dunia IT adalah membuat desain dan pengalaman baru yang berguna bagi orang lain. Karya yang baik harus mudah dipakai dan enak dilihat.</p>
        `
      },
      {
        id: "note-02",
        date: "2026",
        tag: "DESAIN & KODE // 02",
        title: "Menghubungkan desain UI/UX dengan kode web interaktif",
        readTime: "4 menit baca",
        excerpt:
          "Cara desainer yang memahami kode menjaga pengalaman pengguna tetap konsisten antara rancangan visual dan implementasi.",
        content: `
          <h4>1. Kolaborasi desain dan kode</h4>
          <p>Sering ada jarak antara rancangan di Figma dan hasil akhir di browser. Karena saya mengerjakan UI/UX sekaligus web development, rancangan lebih cepat menjadi kode dan tetap sesuai dengan interaksi yang dirancang.</p>
          <h4>2. Kenyamanan pengguna sebagai prioritas</h4>
          <p>Prioritas saya adalah antarmuka yang bersih, hierarki tipografi yang jelas, dan navigasi yang mudah dipahami. Interaksi yang responsif di perangkat mobile membuat produk nyaman dipakai.</p>
          <h4>3. Detail interaksi</h4>
          <p>Mikro-interaksi seperti animasi hover, elemen yang responsif, dan umpan balik visual langsung memberi tahu pengguna bahwa tindakannya sudah diterima.</p>
        `
      },
      {
        id: "note-03",
        date: "2026",
        tag: "AKADEMIK & STUDI // 03",
        title: "Studi dan kolaborasi terapan di ITESA Muhammadiyah Semarang",
        readTime: "5 menit baca",
        excerpt:
          "Pengalaman belajar di ITESA Muhammadiyah Semarang: logika komputasi, pemecahan masalah, dan kerja sama tim.",
        content: `
          <h4>1. Fondasi akademik di ITESA</h4>
          <p>Kuliah di ITESA Muhammadiyah Semarang mengajarkan logika komputasi, analisis data, dan perancangan sistem. Teori dari kelas langsung saya terapkan di proyek praktis.</p>
          <h4>2. Kerja sama tim</h4>
          <p>Sebagai kolaborator kreatif, saya percaya proyek besar membutuhkan komunikasi yang jelas dan pembagian peran yang seimbang. Kolaborasi dengan mahasiswa dan dosen menghasilkan karya seperti portal PMB ITESA dan proyek lainnya.</p>
          <h4>3. Terus belajar</h4>
          <p>Teknologi terus berubah. Saya terus mempelajari keterampilan dan teknologi baru, dan mengambil tantangan kreatif untuk proyek berikutnya.</p>
        `
      }
    ],
    audioSynth: {
      title: "Generator nada resonansi harmonis",
      tagline: "Frekuensi alami 432Hz • Node audio web interaktif",
      frequencies: [
        { label: "Ground 108Hz", freq: 108, desc: "Nada sub-bass alami" },
        { label: "Sage Earth 216Hz", freq: 216, desc: "Harmoni fondasi dasar" },
        { label: "Natural Calm 432Hz", freq: 432, desc: "Nada resonansi harmonis" },
        { label: "Canopy Air 864Hz", freq: 864, desc: "Nada cerah atmosfer" }
      ]
    },
    colophon: {
      typography: "Syne • Instrument Serif • Plus Jakarta Sans • JetBrains Mono",
      gridSystem: "Tata Letak Responsif & Desain Interaktif",
      carbonEstimate: "Dioptimalkan untuk Performa Cepat & Aksesibilitas",
      license: "Portofolio © 2026 Haidar Rifky Andrianno, alias Hanzz atau HanzzSama. Semarang, Jawa Tengah, Indonesia."
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
    if (t.about.photoCaption) localized.about.photoCaption = t.about.photoCaption;
    if (t.about.locationBadge) localized.about.locationBadge = t.about.locationBadge;
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
    localized.meta = {
      ...localized.meta,
      ...t.meta,
      institution: t.meta.institution ? { ...localized.meta.institution, ...t.meta.institution } : localized.meta.institution,
      availability: t.meta.availability ? { ...localized.meta.availability, ...t.meta.availability } : localized.meta.availability
    };
  }

  // Apply admin custom projects if stored in local persistence
  const customProjects = adminStorage.getCustomProjects();
  if (customProjects && Array.isArray(customProjects) && customProjects.length > 0) {
    localized.projects.items = customProjects;
  }

  // Apply admin custom profile if stored in local persistence
  const customProfile = adminStorage.getCustomProfile();
  if (customProfile && typeof customProfile === 'object') {
    localized.meta = {
      ...localized.meta,
      ...customProfile,
      institution: customProfile.institution ? { ...localized.meta.institution, ...customProfile.institution } : localized.meta.institution,
      availability: customProfile.availability ? (typeof customProfile.availability === 'object' ? { ...localized.meta.availability, ...customProfile.availability } : { ...localized.meta.availability, status: customProfile.availability }) : localized.meta.availability
    };
    if (customProfile.role) {
      localized.welcome.architecturalPreamble = customProfile.role;
    }
    if (customProfile.bio) {
      const remainingParagraphs = Array.isArray(localized.about.ethosParagraphs) ? localized.about.ethosParagraphs.slice(1) : [];
      localized.about.ethosParagraphs = [customProfile.bio, ...remainingParagraphs];
    }
  }

  localized.currentLang = lang;
  localized.t = t;

  return localized;
}

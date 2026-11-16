import fs from 'fs';
import path from 'path';

const allProjects = [
  {
    id: "proj-01",
    code: "PRJ // 01",
    title: "PMB ITESA New 2026",
    subtitle: "Website Informasi Pendaftaran Mahasiswa Baru Kampus",
    year: "2026",
    category: "Portal Kampus / Web System",
    role: "FullStack Web Developer",
    client: "ITESA Muhammadiyah Semarang",
    description: "Website yang dibangun untuk memberi informasi tentang pendaftaran mahasiswa baru ITESA, dibangun dengan sistem Laravel.",
    deliverables: [
      "Penyajian informasi jalur pendaftaran mahasiswa baru dan program studi interaktif",
      "Sistem formulir daring dan dashboard verifikasi berkas calon mahasiswa",
      "Antarmuka responsif mobile-friendly yang memudahkan calon mahasiswa"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    metrics: {
      framework: "Laravel",
      tahun: "2026",
      status: "Aktif"
    },
    links: {
      preview: "#",
      code: "https://github.com/HanzzSama"
    },
    accent: "var(--color-botanical-sage)",
    blueprintSvg: "orbit",
    deepDive: {
      problem: "Calon mahasiswa baru membutuhkan akses informasi pendaftaran yang akurat, lengkap, dan mudah diakses dari berbagai perangkat tanpa kendala.",
      solution: "Membangun portal PMB terpadu berbasis Laravel dengan navigasi informatif seputar program studi, biaya, jalur pendaftaran, dan verifikasi berkas daring.",
      benchmarks: [
        { metric: "Aksesibilitas Pendaftar", target: "Mudah", achieved: "Mobile-First" },
        { metric: "Verifikasi Berkas", target: "Terintegrasi", achieved: "Dashboard Admin" }
      ]
    }
  },
  {
    id: "proj-02",
    code: "PRJ // 02",
    title: "Kalkulator Mathicalc",
    subtitle: "Kalkulator Basic dengan Bot Matematis & Personalisasi Tema",
    year: "2025",
    category: "Web Tool / Komputasi",
    role: "Frontend Developer",
    client: "Kakas Personal & Edukasi",
    description: "Kalkulator basic dengan dipadukan sistem bot matematis, dan sistem personalize tema sesuai selera, dibangun hanya memakai HTML, CSS, JS.",
    deliverables: [
      "Mesin kalkulasi matematika cepat dan responsif di browser",
      "Sistem bot matematis cerdas yang memandu perhitungan dan formula",
      "Fitur personalisasi tema visual dinamis yang dapat disesuaikan pengguna"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
    metrics: {
      stack: "HTML / CSS / JS",
      bot: "Bot Matematis",
      tema: "Personalisasi"
    },
    links: {
      preview: "https://github.com/HanzzSama/MathiCalc",
      code: "https://github.com/HanzzSama/MathiCalc"
    },
    accent: "var(--color-warm-sand)",
    blueprintSvg: "matrix",
    deepDive: {
      problem: "Banyak kalkulator web yang monoton, kaku tanpa interaksi asisten, dan tidak memungkinkan pengguna mengubah tema sesuai preferensi personal.",
      solution: "Mengembangkan Mathicalc murni dengan HTML, CSS, dan JavaScript — memadukan bot asisten matematis dan tema personalisasi tanpa dependensi berat.",
      benchmarks: [
        { metric: "Waktu Muat", target: "< 100ms", achieved: "Instan" },
        { metric: "Kustomisasi Tema", target: "Fleksibel", achieved: "100% Personal" }
      ]
    }
  },
  {
    id: "proj-03",
    code: "PRJ // 03",
    title: "TurnCode",
    subtitle: "Platform Belajar Coding dari Zero to Pro",
    year: "2025",
    category: "E-Learning / Developer Tools",
    role: "FullStack Developer",
    client: "Komunitas Belajar Coding",
    description: "Website yang dibangun untuk pengguna untuk belajar coding dari zero to pro, dibangun dengan lingkungan Laravel.",
    deliverables: [
      "Kurikulum materi pemrograman terstruktur dari level pemula hingga mahir",
      "Antarmuka belajar interaktif dengan latihan praktis dan evaluasi pemahaman",
      "Sistem manajemen pengguna dan pelacakan progres belajar berbasis Laravel"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    metrics: {
      lingkungan: "Laravel",
      jalur: "Zero to Pro",
      basis: "Web App"
    },
    links: {
      preview: "https://github.com/HanzzSama/TurnCode",
      code: "https://github.com/HanzzSama/TurnCode"
    },
    accent: "var(--color-botanical-sage)",
    blueprintSvg: "geometry",
    deepDive: {
      problem: "Banyak calon programmer pemula kesulitan belajar mandiri karena materi online yang terpecah-pecah tanpa panduan tahapan yang runtut.",
      solution: "Membangun platform TurnCode di atas Laravel untuk menghadirkan alur belajar terpadu 'Zero to Pro' yang terarah dan mudah dipahami.",
      benchmarks: [
        { metric: "Alur Pembelajaran", target: "Terstruktur", achieved: "Zero to Pro" },
        { metric: "Keandalan Sistem", target: "Tinggi", achieved: "Laravel MVC" }
      ]
    }
  },
  {
    id: "proj-04",
    code: "PRJ // 04",
    title: "Neura AI",
    subtitle: "Deteksi Gejala Alzheimer Berbasis LLM & XGBoost",
    year: "2025",
    category: "Healthcare AI / Web Intelligence",
    role: "AI & FullStack Developer",
    client: "Inisiatif Riset Kesehatan Kognitif",
    description: "Website untuk mendeteksi gejala alzheimer dengan base LLM dan kalkulasi algoritma XGBoost.",
    deliverables: [
      "Integrasi LLM untuk analisis pemahaman bahasa dan kuesioner kognitif pengguna",
      "Kalkulasi probabilitas klasifikasi gejala alzheimer dengan algoritma XGBoost",
      "Penyajian hasil evaluasi yang jelas, aman, dan mudah dipahami pengguna"
    ],
    techStack: ["Python", "XGBoost", "LLM", "FastAPI / Web", "JavaScript", "Tailwind CSS"],
    metrics: {
      base: "LLM + XGBoost",
      fokus: "Deteksi Alzheimer",
      analisis: "Kognitif"
    },
    links: {
      preview: "https://github.com/HanzzSama/Neura",
      code: "https://github.com/HanzzSama/Neura"
    },
    accent: "var(--color-warm-sand)",
    blueprintSvg: "contour",
    deepDive: {
      problem: "Pemeriksaan gejala alzheimer pada fase awal sering terlambat karena keterbatasan akses skrining kognitif awal yang cepat dan terjangkau.",
      solution: "Menggabungkan model LLM untuk ekstraksi interaksi bahasa dengan ketepatan algoritma tabular XGBoost guna mengkalkulasi indikasi gejala secara akurat.",
      benchmarks: [
        { metric: "Akurasi Prediksi", target: "> 85%", achieved: "Optimal XGBoost" },
        { metric: "Kemudahan Evaluasi", target: "Intuitif", achieved: "Asesmen Interaktif" }
      ]
    }
  },
  {
    id: "proj-05",
    code: "PRJ // 05",
    title: "Website Ladangku",
    subtitle: "Platform Pertanian Modern & Optimasi Lahan",
    year: "2022",
    category: "Agrotech / Perlombaan",
    role: "Web Designer & Developer",
    client: "Inisiatif Kompetisi Agroteknologi",
    description: "Membangun platform digital yang memadukan prinsip pertanian tradisional dengan teknologi modern untuk meningkatkan efisiensi dan produktivitas petani lokal.",
    deliverables: [
      "Perancangan antarmuka agrotech yang ramah pengguna",
      "Katalog informasi pertanian modern dan kiat peningkatan hasil tani",
      "Integrasi modul kalkulasi efisiensi panen berbasis web"
    ],
    techStack: ["PHP", "HTML5", "CSS3", "JavaScript", "MySQL"],
    metrics: {
      timeline: "2022",
      type: "Kompetisi",
      status: "Selesai"
    },
    links: {
      preview: "#",
      code: "https://github.com/HanzzSama"
    },
    accent: "var(--color-botanical-sage)",
    blueprintSvg: "matrix",
    deepDive: {
      problem: "Petani tradisional menghadapi kesulitan dalam pencatatan siklus tanam, pemetaan lahan, dan pemantauan sumber daya karena masih mengandalkan pencatatan manual di kertas.",
      solution: "Merancang Ladangku sebagai platform web ringan dengan navigasi sederhana, indikator status visual, dan aksesibilitas cepat melalui perangkat mobile para petani.",
      benchmarks: [
        { metric: "Kemudahan Navigasi", target: "Intuitif", achieved: "100% Sederhana" },
        { metric: "Aksesibilitas Mobile", target: "Responsif", achieved: "Optimal di HP" }
      ]
    }
  },
  {
    id: "proj-06",
    code: "PRJ // 06",
    title: "Pemesanan Makanan",
    subtitle: "Solusi Digital Pemesanan Restoran & F&B",
    year: "2022",
    category: "Web Application / F&B",
    role: "FullStack Developer",
    client: "Restoran & Mitra Kuliner",
    description: "Sistem pemesanan makanan online yang memudahkan pelanggan memilih menu hidangan secara instan dan mengoptimalkan alur manajemen pesanan kasir.",
    deliverables: [
      "Katalog menu makanan interaktif dengan filter kategori dan rincian harga",
      "Sistem keranjang belanja pesanan (order cart) real-time",
      "Ringkasan pesanan otomatis untuk meminimalisir kesalahan pelayan"
    ],
    techStack: ["JavaScript", "PHP", "Bootstrap", "MySQL"],
    metrics: {
      timeline: "2022",
      type: "Web App",
      status: "Selesai"
    },
    links: {
      preview: "#",
      code: "https://github.com/HanzzSama"
    },
    accent: "var(--color-warm-sand)",
    blueprintSvg: "geometry",
    deepDive: {
      problem: "Buku menu fisik konvensional memicu antrean pesanan yang lambat, kesalahan perhitungan harga manual, dan repot saat memperbarui daftar menu harian.",
      solution: "Membangun aplikasi menu digital yang responsif dengan kartu menu visual, perhitungan total harga otomatis, dan konfirmasi pesanan instan.",
      benchmarks: [
        { metric: "Waktu Pemesanan", target: "< 1 Menit", achieved: "Instan" },
        { metric: "Akurasi Total Tagihan", target: "100%", achieved: "Otomatis" }
      ]
    }
  },
  {
    id: "proj-07",
    code: "PRJ // 07",
    title: "Perpustakaan Buku",
    subtitle: "Sistem Manajemen Sirkulasi & Katalog Pustaka",
    year: "2023",
    category: "Management System / Education",
    role: "Backend & Database Developer",
    client: "Institusi Pendidikan & Perpustakaan",
    description: "Platform perpustakaan modern terpadu untuk memudahkan pencarian katalog buku, pengelolaan sirkulasi peminjaman, serta pendataan inventaris pustaka.",
    deliverables: [
      "Katalog buku dinamis dengan indikator ketersediaan real-time",
      "Pencatatan sirkulasi peminjaman dan penghitungan denda keterlambatan",
      "Dashboard administrasi untuk kontrol ketersediaan stok buku"
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "CSS3"],
    metrics: {
      timeline: "2023",
      type: "Sistem Informasi",
      status: "Selesai"
    },
    links: {
      preview: "#",
      code: "https://github.com/HanzzSama"
    },
    accent: "var(--color-botanical-sage)",
    blueprintSvg: "orbit",
    deepDive: {
      problem: "Pencatatan buku pinjaman secara manual sering menyebabkan kehilangan buku, kekeliruan data peminjam, dan pencarian koleksi yang memakan waktu lama.",
      solution: "Menghadirkan sistem web terpadu yang mengotomatisasi log sirkulasi, memantau tenggat waktu pengembalian, dan menyajikan katalog buku yang mudah dicari.",
      benchmarks: [
        { metric: "Kecepatan Temu Kembali", target: "< 3 Detik", achieved: "Real-time" },
        { metric: "Transparansi Denda", target: "Akurat", achieved: "Otomatis" }
      ]
    }
  },
  {
    id: "proj-08",
    code: "PRJ // 08",
    title: "Pembayaran SPP",
    subtitle: "Portal Administrasi Keuangan Sekolah Terpadu",
    year: "2023",
    category: "FinTech / Administration",
    role: "Fullstack Developer",
    client: "Administrasi Sekolah",
    description: "Aplikasi pembayaran SPP online yang transparan, akuntabel, dan aman untuk memudahkan orang tua murid serta pihak administrasi sekolah memantau iuran bulanan.",
    deliverables: [
      "Pencatatan riwayat transaksi SPP dan tagihan siswa per periode",
      "Cetak bukti pembayaran/kwitansi digital transparan",
      "Manajemen otentikasi multi-peran (Admin, Petugas, Siswa)"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
    metrics: {
      timeline: "2023",
      type: "Laravel App",
      status: "Selesai"
    },
    links: {
      preview: "#",
      code: "https://github.com/HanzzSama/MySPP"
    },
    accent: "var(--color-warm-sand)",
    blueprintSvg: "matrix",
    deepDive: {
      problem: "Petugas keuangan sekolah kewalahan merekap pembayaran ratusan siswa secara manual di buku kas, menyulitkan pengecekan tunggakan secara akurat.",
      solution: "Membangun portal administrasi berbasis framework Laravel dengan database relasional terstruktur, verifikasi kwitansi otomatis, dan pelaporan keuangan bulanan.",
      benchmarks: [
        { metric: "Rekap Keuangan", target: "Instan", achieved: "Terpusat" },
        { metric: "Integritas Data", target: "Relasional", achieved: "MySQL Terstruktur" }
      ]
    }
  },
  {
    id: "proj-09",
    code: "PRJ // 09",
    title: "Mylist Todo App",
    subtitle: "Aplikasi Manajemen Tugas Harian & Produktivitas",
    year: "2024",
    category: "Productivity / Web Tool",
    role: "Frontend Developer & UI Designer",
    client: "Aplikasi Personal & Komunitas",
    description: "Aplikasi produktivitas yang dirancang minimalis dan bersih untuk membantu pengguna melacak, menyusun prioritas, dan menyelesaikan tugas harian secara terorganisir.",
    deliverables: [
      "Antarmuka penambahan, checklist, dan penghapusan tugas instan",
      "Filter status tugas (Semua, Aktif, Selesai) secara responsif",
      "Penyimpanan lokal instan tanpa jeda pemuatan server"
    ],
    techStack: ["JavaScript (ES6+)", "CSS Modern", "HTML5", "LocalStorage"],
    metrics: {
      timeline: "2024",
      type: "Produktivitas",
      status: "Selesai"
    },
    links: {
      preview: "#",
      code: "https://github.com/HanzzSama"
    },
    accent: "var(--color-botanical-sage)",
    blueprintSvg: "geometry",
    deepDive: {
      problem: "Banyak aplikasi to-do dipenuhi fitur rumit dan iklan yang justru mengganggu fokus pengguna saat mencatat agenda penting harian.",
      solution: "Merancang Mylist Todo App dengan tampilan bersih, fokus navigasi cepat, dan persistensi LocalStorage untuk akses kilat setiap saat.",
      benchmarks: [
        { metric: "Waktu Muat", target: "< 100ms", achieved: "Instan" },
        { metric: "Penyimpanan", target: "Lokal", achieved: "Zero Jeda" }
      ]
    }
  }
];

const filePath = path.resolve('src/data/portfolioData.js');
let content = fs.readFileSync(filePath, 'utf-8');

const targetStart = '  projects: {\n    sectionIndex: "04",';
const targetEnd = `        deepDive: {
          problem: "Calon mahasiswa baru dari berbagai daerah membutuhkan platform pendaftaran daring yang jelas, mudah dipahami alurnya, dan tidak membingungkan.",
          solution: "Berkolaborasi merancang dan mengembangkan portal PMB yang responsif di smartphone, dilengkapi panduan langkah demi langkah dan validasi formulir terintegrasi.",
          benchmarks: [
            { metric: "Aksesibilitas Pendaftar", target: "Mudah", achieved: "Mobile-First" },
            { metric: "Verifikasi Berkas", target: "Terintegrasi", achieved: "Dashboard Admin" }
          ]
        }
      }
    ]
  },`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Projects block not found in portfolioData.js!', { startIndex, endIndex });
  process.exit(1);
}

const replacement = `  projects: {
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
    items: ${JSON.stringify(allProjects, null, 6).replace(/\n/g, '\n    ')}
  },`;

const newContent = content.slice(0, startIndex) + replacement + content.slice(endIndex + targetEnd.length);
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Successfully updated portfolioData.js with 9 projects including PMB ITESA New 2026, Mathicalc, TurnCode, and Neura AI!');


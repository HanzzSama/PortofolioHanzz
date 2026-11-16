import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/portfolioData.js');
let content = fs.readFileSync(filePath, 'utf-8');

const targetStart = '  skills: {\n    sectionIndex: "03",\n    sectionTitle: "SYSTEMIC CAPABILITIES",';
const targetEnd = `// Neura Low-Latency SSE Dispatcher
export async function streamNeuraInference(prompt, streamWriter) {
  const context = await retrieveVectorContext(prompt);
  for await (const chunk of executeModelStream(prompt, context)) {
    streamWriter.write(formatSseEvent(chunk));
  }
}\`
        }
      }
    ]
  },`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Target not found!', { startIndex, endIndex });
  process.exit(1);
}

const replacement = `  skills: {
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
    sectionTitle: "PROYEK NYATA",
    sectionSub: "6 KARYA TERPILIH // WEB & APLIKASI",
    headline: "Koleksi Proyek Unggulan",
    description:
      "Enam proyek nyata yang mencakup perancangan agrotech, solusi F&B, sistem perpustakaan, administrasi sekolah, utilitas produktivitas, hingga portal akademik kampus.",
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
        id: "proj-01",
        code: "PRJ // 01",
        title: "Website Ladangku",
        subtitle: "Platform Pertanian Modern & Optimasi Lahan",
        year: "2022",
        category: "Agrotech / Perlombaan",
        role: "Web Designer & Developer",
        client: "Inisiatif Kompetisi Agroteknologi",
        description:
          "Membangun platform digital yang memadukan prinsip pertanian tradisional dengan teknologi modern untuk meningkatkan efisiensi dan produktivitas petani lokal.",
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
        id: "proj-02",
        code: "PRJ // 02",
        title: "Pemesanan Makanan",
        subtitle: "Solusi Digital Pemesanan Restoran & F&B",
        year: "2022",
        category: "Web Application / F&B",
        role: "FullStack Developer",
        client: "Restoran & Mitra Kuliner",
        description:
          "Sistem pemesanan makanan online yang memudahkan pelanggan memilih menu hidangan secara instan dan mengoptimalkan alur manajemen pesanan kasir.",
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
        id: "proj-03",
        code: "PRJ // 03",
        title: "Perpustakaan Buku",
        subtitle: "Sistem Manajemen Sirkulasi & Katalog Pustaka",
        year: "2023",
        category: "Management System / Education",
        role: "Backend & Database Developer",
        client: "Institusi Pendidikan & Perpustakaan",
        description:
          "Platform perpustakaan modern terpadu untuk memudahkan pencarian katalog buku, pengelolaan sirkulasi peminjaman, serta pendataan inventaris pustaka.",
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
        id: "proj-04",
        code: "PRJ // 04",
        title: "Pembayaran SPP",
        subtitle: "Portal Administrasi Keuangan Sekolah Terpadu",
        year: "2023",
        category: "FinTech / Administration",
        role: "Fullstack Developer",
        client: "Administrasi Sekolah",
        description:
          "Aplikasi pembayaran SPP online yang transparan, akuntabel, dan aman untuk memudahkan orang tua murid serta pihak administrasi sekolah memantau iuran bulanan.",
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
        id: "proj-05",
        code: "PRJ // 05",
        title: "Mylist Todo App",
        subtitle: "Aplikasi Manajemen Tugas Harian & Produktivitas",
        year: "2024",
        category: "Productivity / Web Tool",
        role: "Frontend Developer & UI Designer",
        client: "Aplikasi Personal & Komunitas",
        description:
          "Aplikasi produktivitas yang dirancang minimalis dan bersih untuk membantu pengguna melacak, menyusun prioritas, dan menyelesaikan tugas harian secara terorganisir.",
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
      },
      {
        id: "proj-06",
        code: "PRJ // 06",
        title: "PMB ITESA",
        subtitle: "Portal Penerimaan Mahasiswa Baru Kampus",
        year: "2024",
        category: "University Portal / Web System",
        role: "FullStack Developer & UI/UX",
        client: "ITESA Muhammadiyah Semarang",
        description:
          "Membangun portal penerimaan mahasiswa baru yang responsif, komprehensif, dan mudah digunakan untuk calon mahasiswa Institut Teknologi Statistika dan Bisnis Muhammadiyah Semarang.",
        deliverables: [
          "Alur pendaftaran mahasiswa baru daring yang terstruktur",
          "Halaman informasi program studi dan panduan perkuliahan interaktif",
          "Validasi data calon mahasiswa dan dashboard verifikasi berkas"
        ],
        techStack: ["PHP", "Laravel", "Tailwind CSS", "MySQL", "JavaScript"],
        metrics: {
          timeline: "2024",
          type: "Portal Kampus",
          status: "Aktif"
        },
        links: {
          preview: "#",
          code: "https://github.com/HanzzSama"
        },
        accent: "var(--color-warm-sand)",
        blueprintSvg: "orbit",
        deepDive: {
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

const newContent = content.slice(0, startIndex) + replacement + content.slice(endIndex + targetEnd.length);
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Successfully replaced skills and projects in portfolioData.js!');


# Portofolio Hanzz — Biophilic Architectural Minimalism

[![License: MIT](https://img.shields.io/badge/License-MIT-4A5D4E.svg)](https://opensource.org/licenses/MIT)
[![JavaScript: ES6+](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-Procedural%20DSP-60A5FA)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Theme: Obsidian / Limestone](https://img.shields.io/badge/Theme-Obsidian%20%7C%20Limestone-222A24)](https://github.com/)
[![Node: Semarang, ID](https://img.shields.io/badge/Node-Semarang%2C%20ID-588157)](https://maps.google.com)

> **Arsitektur Antarmuka Web Portofolio Personal Berkinerja Tinggi**  
> Didesain dan direkayasa oleh **Haidar Rifky Andrianno (Hanzz // HRA)** — Mahasiswa Teknik Informatika di **ITESA Muhammadiyah Semarang**, berbasis di Semarang, Indonesia.  
> *Filosofi: Biophilic Architectural Minimalism meets Google Material Expressive & Antigravity Physics.*

---

## 📑 Daftar Isi

- [1. Gambaran Umum & Konsep Arsitektur](#1-gambaran-umum--konsep-arsitektur)
- [2. Struktur Berkas & Direktori](#2-struktur-berkas--direktori)
- [3. Fitur Utama & Keunggulan](#3-fitur-utama--keunggulan)
- [4. Rincian Section Halaman](#4-rincian-section-halaman)
- [5. Mesin Inti (Core Engines)](#5-mesin-inti-core-engines)
  - [5.1 Monolith Audio DSP Engine](#51-monolith-audio-dsp-engine)
  - [5.2 Kinetic Lab 3D Wireframe Simulator](#52-kinetic-lab-3d-wireframe-simulator)
  - [5.3 HanzzPet Interactive Virtual Companion](#53-hanzzpet-interactive-virtual-companion)
  - [5.4 Smooth Scroller & Parallax Viewport](#54-smooth-scroller--parallax-viewport)
  - [5.5 Circular Wave Theme Switcher](#55-circular-wave-theme-switcher)
  - [5.6 Architectural Deep-Dive Drawer](#56-architectural-deep-dive-drawer)
- [6. Tumpukan Teknologi & Alat (Apps & Tools)](#6-tumpukan-teknologi--alat-apps--tools)
- [7. Panduan Menjalankan (Getting Started)](#7-panduan-menjalankan-getting-started)
- [8. Konfigurasi Desain & Palet Warna](#8-konfigurasi-desain--palet-warna)
- [9. Lisensi & Hak Cipta](#9-lisensi--hak-cipta)

---

## 1. Gambaran Umum & Konsep Arsitektur

Portofolio Hanzz adalah sistem antarmuka web modern yang mengedepankan **efisiensi siklus komputasi**, **zero third-party bloatware**, dan **estetika biofilik alami**. Dibangun secara murni menggunakan **Vanilla JavaScript (ES Modules)**, **HTML5 Semantik**, dan **CSS3 Design Tokens**, proyek ini membuktikan bahwa pengalaman web kelas atas dengan grafis 3D interaktif dan sintesis audio real-time dapat terwujud dengan performa terkunci pada **60/120 FPS**.

```
    [ User Viewport ]
           │
  ┌────────┴────────────────────────────────────────────────┐
  │  Core Orchestrator (src/main.js)                        │
  ├──────────────────┬───────────────────┬──────────────────┤
  │ Telemetry Engine │ Theme Wave Engine │ i18n Translation │
  └────────┬─────────┴─────────┬─────────┴────────┬─────────┘
           │                   │                  │
  ┌────────▼─────────┐┌────────▼────────┐┌────────▼─────────┐
  │ Smooth Scroller  ││ Kinetic Lab 3D  ││ Monolith DSP     │
  │ (Antigravity/Lenis) (Canvas Vector) ││ (Web Audio API)  │
  └──────────────────┘└─────────────────┘└──────────────────┘
```

---

## 2. Struktur Berkas & Direktori

```
PortofolioHanzz/
├── index.html                 # Dokumen induk semantik HTML5 & Application Shell
├── hanzzpet.html              # Standalone interactive viewport untuk HanzzPet
├── serve.bat                  # Windows batch shortcut untuk menjalankan server lokal
├── serve.ps1                  # HTTP server mandiri berbasis PowerShell .NET HttpListener
├── package.json               # Konfigurasi proyek & skrip npm
├── README.md                  # Dokumentasi teknis proyek
└── src/
    ├── main.js                # Titik masuk utama aplikasi (PortfolioApp orchestrator)
    ├── assets/                # Aset visual statis (Avatar, ikon, media)
    │   ├── hanzz-avatar.jpg
    │   └── hanzz-avatar.png
    ├── components/            # Komponen modular render HTML
    │   ├── renderWelcome.js   # 01 // Section Hero & Topography
    │   ├── renderAbout.js     # 02 // Section Manifesto & Credentials
    │   ├── renderSkills.js    # 03 // Section Taxonomy & Stack Nodes
    │   ├── renderProjects.js  # 04 // Section Blueprint Projects Grid
    │   ├── renderGithub.js    # 05 // Section GitHub Vault & Radar
    │   ├── renderLab.js       # 06 // Section Kinetic Lab 3D Simulator
    │   ├── renderAnother.js   # 07 // Section Audio Synth & Garden Notes
    │   └── renderPet.js       # Standalone renderer untuk HanzzPet
    ├── core/                  # Mesin fungsional komputasi & DSP
    │   ├── monolithAudioEngine.js # Mesin sintesis audio procedural Web Audio DSP
    │   ├── monolithSimulator.js   # Mesin proyeksi matematika wireframe 3D Canvas
    │   ├── hanzzPetEngine.js      # State machine virtual companion HanzzPet
    │   ├── smoothScroller.js      # Lenis momentum physics scrolling orchestrator
    │   ├── parallaxEngine.js      # Interpolasi koordinat parallax & kursor haptik
    │   ├── observer.js            # Telemetry scroll observer & stagger reveal
    │   └── scrollbarPill.js       # Dynamic floating scrollbar capsule indicator
    ├── data/                  # Sumber data terstruktur & lokalisasi bahasa
    │   ├── portfolioData.js   # Data konten statis proyek, skills, dan log
    │   └── translations.js    # Kamus lokalisasi 5 bahasa (ID, EN, ZH, JA, DE)
    ├── styles/                # Arsitektur CSS modular
    │   ├── variables.css      # Design tokens (warna, tipografi, radius, easing)
    │   ├── base.css           # Reset modern, typography rules, reduced-motion
    │   ├── layout.css         # Header, grid lines, telemetri, side drawer, modal
    │   ├── sections.css       # Spesifikasi tata letak masing-masing section
    │   ├── monolithAudio.css  # Konsol audio DSP & panel kontrol synthesizer
    │   ├── pet.css            # Desain antarmuka & animasi retro HanzzPet
    │   └── scrollbarCapsule.css # Kapsul scroll progress bar melayang
    └── vendor/
        └── lenis.js           # Lightweight physics scrolling core
```

---

## 3. Fitur Utama & Keunggulan

- **🌐 Multi-Language Engine (5 Bahasa):** Mendukung pergantian bahasa instan (*instant re-hydration*) antara **Bahasa Indonesia (ID)**, **English (EN)**, **Mandarin (ZH)**, **Japanese (JA)**, dan **Deutsch (DE)** tanpa *reload* halaman.
- **🌗 Dual-Mode Architectural Theme (Limestone / Obsidian):**
  - **Limestone Mode (#F4F3EF):** Nuansa terang terinspirasi dari batu kapur alami dan kertas arsitektural biofilik.
  - **Obsidian Mode (#0E1310):** Nuansa gelap pekat terinspirasi dari batu obsidian dengan aksen sage green botanik.
  - **Circular Wave Ripple:** Transisi warna menyebar keluar berbentuk gelombang lingkaran sempurna dari pusat tombol menggunakan **Web View Transitions API** dan kurva `cubic-bezier(0.4, 0, 0.2, 1)`.
- **🔊 Procedural Biofilik Soundscape Engine:** Sintesis audio murni berbasis matematika Web Audio API (tanpa berkas MP3/WAV eksternal) dengan osilasi Solfeggio 432Hz/528Hz, gelombang otak Alpha 10Hz, derai hujan alami *pink noise*, dan *Rhodes chords*.
- **📐 3D Wireframe Kinetic Lab Simulator:** Visualisasi matematika 3D berakselerasi GPU di atas kanvas 2D dengan 8 topologi bentuk geometris, inersia rotasi mouse, zoom optik, serta coupling simatik audio.
- **🐾 HanzzPet Interactive Virtual Companion:** Karakter piksel interaktif di sudut layar yang merespons ketukan mouse, memiliki indikator lapar/tidur/kebahagiaan, dan menari berirama mengikuti nada audio (*music-coupled bobbing*).
- **📋 Architectural Deep-Dive System Drawer:** Panel samping inspeksi mendalam untuk proyek, skill, dan catatan teknis dengan animasi *slide in-out* asimetris pegas ergonomis.
- **🎯 Custom Dual-Element Cursor:** Kursor dot tajam presisi dipadu cincin luar lentur (*inertia-damped follower ring*) dengan deteksi target interaktif.
- **⚡ Zero External Package Dependencies:** Berjalan sepenuhnya di peramban secara *native* tanpa perlu kompilasi TypeScript atau `npm install`.

---

## 4. Rincian Section Halaman

### Section 01: Welcome (`#welcome`)
- **Header Telemetry Bar:** Status operasional sistem real-time (`SYS.OP // NOMINAL`), koordinat geografis Semarang (`SRG [6.9667°S]`), dan jam WIB digital live.
- **Hero Statement:** Judul manifesto arsitektur biofilik dengan tipografi *Syne* dan *Instrument Serif*.
- **Interactive Topography Canvas:** Visualisasi garis kontur topografi dinamis yang merespons pergerakan kursor mouse.
- **Call-to-Action Matrix:** Tombol navigasi cepat ke proyek pilihan dan unduhan kurikulum vitae.

### Section 02: Manifesto / About (`#about`)
- **Profil Rekayasa:** Pengantar perjalanan Haidar Rifky Andrianno di ITESA Muhammadiyah Semarang.
- **Pilar Filosofi Desain:** Tiga prinsip utama: *Biophilic Calmness*, *Zero-Bloat Engineering*, dan *Architectural Precision*.
- **Metrics Bar:** Rekapitulasi pengalaman, proyek terkirim, dan kepatuhan standar web.

### Section 03: Architecture / Skills (`#skills`)
- **Taksonomi 3 Tingkat:**
  - *Layer 1: Foundational Core* (HTML5, CSS3 Modern, Vanilla JavaScript ES6+).
  - *Layer 2: Engine & Framework* (React, Next.js SSR, Web Audio DSP, Canvas 3D).
  - *Layer 3: Enterprise & Tooling* (Git, Docker, CI/CD Pipeline, REST/GraphQL).
- **Deep-Dive Node Trigger:** Menekan setiap badge membuka panel inspeksi spesifikasi teknis arsitektur.

### Section 04: Selected Works / Projects (`#projects`)
- **Koleksi Proyek Arsitektur:** Kartu proyek komprehensif menampilkan judul, deskripsi tantangan, tumpukan teknologi, dan aksi:
  - **Neura:** Antarmuka orkestrasi kognitif AI berlatensi rendah.
  - **Sintesis Biofilik:** Studio audio generatif berbasis Web Audio DSP.
  - **Chronos Node:** Mesin telemetri dan pemantauan infrastruktur terdistribusi.
- **Deep-Dive Topology Modal:** Pratinjau skema arsitektur ASCII, tolok ukur produksi (*benchmarks*), dan cuplikan kode kernel.

### Section 05: GitHub Vault (`#github`)
- **Radar Komit GitHub:** Integrasi metrik repositori, ringkasan aktivitas kontribusi, dan tautan langsung ke basis kode publik.
- **Language Breakdown:** Visualisasi persentase bahasa pemrograman yang digunakan.

### Section 06: Kinetic Lab (`#lab`)
- **Simulator 3D Monolith:** Laboratorium geometris interaktif untuk eksplorasi bentuk wireframe dengan kontrol rotasi mouse, zoom, peredaman inersia, dan tombol *auto-orbit*.
- **Pilihan 8 Topologi:**
  1. *Struktur Monolit* (`cube`)
  2. *4D Tesseract Proyeksi* (`tesseract`)
  3. *Ikosahedron Geodesik* (`geodesic`)
  4. *Grid Gelombang Topografi* (`terrain`)
  5. *Resonator Simatik 3D* (`cymatics` — sinkron dengan musik)
  6. *Ikan Pari Raksasa* (`manta`)
  7. *Heliks Ganda DNA* (`helix`)
  8. *Torus Kuantum* (`torus`)

### Section 07: Generator Nada Resonansi Biofilik & Monograf (`#another`)
- **Audio Synthesizer Studio:** Antarmuka pemutar suara biofilik real-time di halaman.
- **Fader & DSP Controls:** Penggeser volume master gain, frekuensi *Low-Pass Filter* (cutoff 1400Hz), dan saklar lapisan derai hujan alami (*Rain Overlay*).
- **Lissajous Vector CRT Display:** Visualisasi spektrum FFT 32-band frekuensi audio real-time.
- **Digital Garden Monograph:** Kumpulan catatan teknis, esai arsitektur, dan pemikiran teknik perangkat lunak.

---

## 5. Mesin Inti (Core Engines)

### 5.1 Monolith Audio DSP Engine (`src/core/monolithAudioEngine.js`)
Mesin synthesizer prosedural yang sepenuhnya memanfaatkan **Web Audio API**:
- **Preset Default (`01 // 432Hz Terra Alpha`):**
  - Harmonik dasar 432Hz (108Hz sub, 216Hz, 432Hz, 648Hz) dengan LFO breathing alami.
  - Separasi stereo binaural 10Hz Alpha Wave (kiri 216Hz, kanan 226Hz) untuk menyeimbangkan fokus dan ketenangan gelombang otak.
  - Lapisan derai hujan kanopi (*pink noise filter* Voss-McCartney pada 800Hz).
  - Petikan akord pentatonik Rhodes berkala dengan *exponential decay* 4.2 detik.
- **Preset Lainnya:** 528Hz Solfeggio Miracle Chords, Semarang Rain Lo-Fi, Cyber Monolith Ostinato, 6Hz Theta Flow, dan Custom Stream/Local Audio File.
- **Autoplay Kepatuhan Browser:** Dilengkapi *soft-landing fade-in* 1.8 detik dan mekanisme *passive gesture unlock* tanpa memicu galat konsol browser.

### 5.2 Kinetic Lab 3D Wireframe Simulator (`src/core/monolithSimulator.js`)
Mesin grafis 3D kustom yang merender verteks dan tepi (*edges*) ke kanvas 2D tanpa dependensi library eksternal (seperti Three.js):
- Matriks rotasi 3D Euler (Rotasi X, Y, Z).
- Transformasi proyeksi perspektif dengan focal length dinamis.
- Fisika inersia gesekan halus (*damping factor 0.94*) saat drag mouse dilepas.
- **Eksklusif Resonansi Audio:** Khusus model *Resonator Simatik 3D*, geometri bergetar dan membentuk pola simatik simetris sesuai frekuensi spektrum nada FFT audio.

### 5.3 HanzzPet Interactive Virtual Companion (`src/core/hanzzPetEngine.js`)
Pendamping virtual retro interaktif bergaya biofilik:
- Menghuni dok pojok kanan bawah antarmuka.
- Status dinamis: *Idle*, *Happy*, *Sleeping*, *Eating*, dan *Dancing*.
- Interaksi klik: mengelus (*petting*), memberi makan (*feeding*), dan membangunkan.
- Animasi mengayun (*bobbing rhythm*) mengikuti ketukan synthesizer saat audio menyala.

### 5.4 Smooth Scroller & Parallax Viewport (`src/core/smoothScroller.js`)
- Mengintegrasikan mesin momentum Lenis dengan kurva deselerasi eksponensial Google Antigravity:  
  $$E(t) = \min(1, 1.001 - 2^{-10t})$$
- Menghasilkan pengalaman scroll ultra-lembut tanpa tearing pada refresh rate 60Hz, 120Hz, dan 144Hz.
- Menghentikan scroll secara presisi saat modal atau side drawer terbuka untuk mencegah pergeseran layout (*layout shifting*).

### 5.5 Circular Wave Theme Switcher (`src/main.js` & `src/styles/layout.css`)
- Menggunakan **Web View Transitions API** dengan ekspansi `clip-path`:
  $$\text{clip-path: } \text{circle}(0\text{px}) \longrightarrow \text{circle}(R_{\text{max}})$$
  di mana $R_{\text{max}}$ dihitung dari koordinat pusat tombol ke sudut terjauh layar:
  $$R_{\text{max}} = \sqrt{\max(x, W-x)^2 + \max(y, H-y)^2}$$
- Diperhalus menggunakan kurva S-Curve harmonis `cubic-bezier(0.4, 0, 0.2, 1)` selama 820ms dipadu pendaran cincin halo bercahaya (`.theme-wave-halo`).

### 5.6 Architectural Deep-Dive Drawer (`src/styles/layout.css`)
- Panel samping inspeksi arsitektur dengan akselerasi GPU layer (`translate3d`).
- Kurva asimetris:
  - **Membuka (Slide-In):** `0.48s cubic-bezier(0.16, 1, 0.3, 1)` dengan efek bayangan kedalaman `-16px 0 48px rgba(0,0,0,0.28)`.
  - **Menutup (Slide-Out):** `0.36s cubic-bezier(0.4, 0, 0.2, 1)` dengan penundaan visibilitas hingga animasi tuntas keluar layar.
  - **Cross-Slide Item:** Pergantian konten antar proyek/skill meluncur halus (`is-switching` dan `is-entering`) tanpa berkedip mendadak.

---

## 6. Tumpukan Teknologi & Alat (Apps & Tools)

| Kategori | Teknologi / Alat | Kegunaan dalam Proyek |
| :--- | :--- | :--- |
| **Bahasa Utama** | Vanilla JavaScript (ES2022+ Modules) | Logika komputasi, orkestrasi DOM, dan state management |
| **Struktur & Semantik**| HTML5 Semantik | Aksesibilitas screen reader, SEO metadata, micro-data |
| **Tata Letak & Gaya** | CSS3 Modern (Custom Properties / Tokens) | Desain sistem biofilik, grid 12 kolom, tipografi, tema |
| **Audio Processing** | Web Audio API (AudioContext, Analyser, BiquadFilter, LFO) | Sintesis suara Solfeggio 432Hz, binaural beats, pink noise |
| **Grafika 2D / 3D** | HTML5 Canvas 2D API | Simulasi topologi 3D kustom, visualisasi FFT Lissajous |
| **Fisika Scrolling** | Lenis Scroll Engine | Momentum smooth scrolling tanpa jeda |
| **Transisi Tema** | Web View Transitions API | Efek gelombang sirkular ekspansif pergantian tema |
| **Tipografi Web** | Google Fonts (Syne, Instrument Serif, JetBrains Mono, Plus Jakarta Sans) | Hirarki tipografi editorial arsitektural |
| **Alat Pengembangan** | PowerShell .NET HttpListener & Node.js | Server HTTP lokal instan tanpa instalasi package manager |

---

## 7. Panduan Menjalankan (Getting Started)

Proyek ini dirancang agar dapat dijalankan secara instan di sistem operasi apapun tanpa memerlukan langkah kompilasi atau `npm install` yang rumit.

### Prasyarat
- Peramban web modern yang mendukung ES Modules (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
- *(Opsional)* PowerShell (bawaan Windows) atau Node.js / Python untuk web server lokal.

### Cara 1: Menggunakan Skrip Bawaan (Windows - Paling Cepat)
Cukup klik dua kali berkas:
```cmd
serve.bat
```
Atau jalankan skrip PowerShell:
```powershell
.\serve.ps1
```
*Server HTTP bawaan PowerShell .NET akan langsung aktif di `http://localhost:3000/` dan membuka peramban secara otomatis.*

### Cara 2: Menggunakan Node.js
```bash
# Menggunakan npx serve bawaan
npx serve . -p 3000

# Atau menggunakan http-server
npx http-server . -p 3000
```

### Cara 3: Menggunakan Python
```bash
# Python 3.x
python -m http.server 3000
```

Buka peramban dan akses alamat:
```
http://localhost:3000/
```

---

## 8. Konfigurasi Desain & Palet Warna

Portofolio ini dibangun berdasarkan sistem variabel token CSS pada `src/styles/variables.css`:

```css
:root {
  /* Limestone Palette (Light Mode Default) */
  --bg-canvas: #F4F3EF;          /* Kertas arsitektural hangat */
  --bg-surface: #FFFFFF;         /* Kartu dan permukaan atas */
  --text-primary: #1C231E;       /* Teks hitam arang botanik */
  --accent-primary: #4A5D4E;     /* Hijau sage tua biofilik */
  --accent-gold: #D4AF37;        /* Aksen emas proporsi rasio emas */
  
  /* Font Family Stacks */
  --font-display: 'Syne', sans-serif;
  --font-editorial: 'Instrument Serif', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

[data-theme="dark"] {
  /* Obsidian Palette (Dark Mode) */
  --bg-canvas: #0E1310;          /* Hitam obsidian organik */
  --bg-surface: #141B16;         /* Permukaan elevated gelap */
  --text-primary: #EDECE8;       /* Teks putih gading */
  --accent-primary: #74A872;     /* Hijau sage cerah teriluminasi */
}
```

---

## 9. Lisensi & Hak Cipta

Dilisensikan di bawah lisensi **MIT License**. Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini untuk tujuan pembelajaran, portofolio pribadi, atau pengembangan komersial dengan tetap mencantumkan atribusi pencipta asli.

Dikonsep, direkayasa, dan dipelihara dengan dedikasi penuh oleh:  
**Haidar Rifky Andrianno (Hanzz)**  
📍 *Semarang, Jawa Tengah, Indonesia* • ITESA Muhammadiyah Semarang  
🌐 GitHub: [@HanzzSama](https://github.com/HanzzSama)


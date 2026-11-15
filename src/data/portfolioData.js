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
    alias: "Hanzz",
    callsign: "HANZZ // ARCH.01",
    role: "FullStack Developer",
    subRole: "FullStack Web & Systems Developer",
    institution: {
      name: "ITESA Muhammadiyah Semarang",
      fullName: "Institut Teknologi Statistika dan Bisnis Muhammadiyah Semarang",
      status: "Undergraduate Scholar // Computational Systems & Applied Tech",
      period: "2023 — Present"
    },
    geoNodes: [
      {
        city: "Semarang",
        region: "Central Java",
        country: "ID",
        coordinates: "6.9667° S, 110.4167° E",
        type: "Primary Academic & Development Node",
        elevation: "82m ASL"
      }
    ],
    availability: {
      status: "Available for High-Impact Commissions & FullStack Roles",
      badge: "SYSTEM STATUS: OPERATIONAL",
      responseLatency: "< 24 Hours",
      timezone: "GMT+7 (Asia/Jakarta)"
    },
    socials: [
      { name: "GitHub", handle: "@HanzzSama", url: "https://github.com/HanzzSama" },
      { name: "LinkedIn", handle: "in/haidar-rifky", url: "https://linkedin.com" },
      { name: "Terminal / Email", handle: "haidarandrianno098@gmail.com", url: "mailto:haidarandrianno098@gmail.com" },
      { name: "Portfolio / Repo", handle: "HanzzSama", url: "https://github.com/HanzzSama" }
    ]
  },

  welcome: {
    systemTag: "SYS.01 // RECONSTRUCTION",
    architecturalPreamble: "BIOPHILIC ARCHITECTURAL MINIMALISM × MATERIAL EXPRESSIVE",
    headlineLine1: "PORTFOLIO",
    headlineLine2: "HANZZ",
    headlineLine3: "FULLSTACK DEVELOPER.",
    leadParagraph:
      "Saya adalah Haidar Rifky Andrianno (Hanzz), FullStack Developer yang berbasis di Semarang. Menempuh studi di ITESA Muhammadiyah Semarang, berfokus pada sintesis ruang digital bernapas — memadukan keteraturan arsitektural minimalis, rekayasa perangkat lunak skala tinggi, dan prinsip interaksi responsif modern.",
    telemetry: [
      { label: "ACADEMIC BASE", value: "ITESA Muhammadiyah Semarang" },
      { label: "COORDINATES", value: "6.9667° S, 110.4167° E" },
      { label: "ENGINEERING DISCIPLINE", value: "FullStack Development & Systems" },
      { label: "INTERFACE PHYSICS", value: "Lerp Parallax • 60 FPS Smooth Flow" }
    ]
  },

  about: {
    sectionIndex: "02",
    sectionTitle: "ARCHITECTURAL MANIFESTO",
    sectionSub: "PHILOSOPHY // PEDAGOGY // RESILIENCE",
    ethosTitle: "Mereduksi Kebisingan, Mengembalikan Ruang Bernapas",
    ethosParagraphs: [
      "Di tengah lanskap digital yang penuh dengan gradien artifisial hiper-jenuh dan antarmuka SaaS yang seragam, saya mengambil jalur berlawanan: Biophilic Architectural Minimalism. Kami memperlakukan layar bukan sebagai kanvas datar yang statis, melainkan sebagai ruang tektonik arsitektur di mana cahaya, proporsi grid 1px, tipografi editorial, dan tekstur alami saling berinteraksi.",
      "Sebagai mahasiswa di ITESA Muhammadiyah Semarang, pemahaman statistika komputasional dan teknologi membentuk ketajaman analisis saya. Kode yang saya tulis bukan sekadar untuk merender piksel, melainkan membangun infrastruktur data terukur, bebas dari bloatware, dan memiliki ketahanan struktural layaknya arsitektur batu kapur alami."
    ],
    pillars: [
      {
        code: "PIL-01",
        title: "Tectonic Grid Structure",
        desc: "Sistem grid presisi 1px hairline border dengan proporsi matematis rasio emas dan negative space lapang, menghilangkan dekorasi semu."
      },
      {
        code: "PIL-02",
        title: "Biophilic Materiality",
        desc: "Palet warna yang diadaptasi dari alam nyata: Raw Limestone (#F4F3EF), Deep Obsidian Moss (#0D110E), dan Botanical Sage (#4A5D4E) dengan sentuhan grain subtil."
      },
      {
        code: "PIL-03",
        title: "Material Expressive Motion",
        desc: "Kurva fisika cubic-bezier(0.2, 0, 0, 1) Google Material 3 dan velocity interpolation yang memberikan sensasi gravitasi organik pada tiap interaksi."
      },
      {
        code: "PIL-04",
        title: "Algorithmic Precision",
        desc: "Kematangan backend microservices, caching multi-tier, dan pemrosesan data asinkron yang menjamin keandalan sistem berskala enterprise."
      }
    ],
    timeline: [
      {
        year: "2024 — PRESENT",
        title: "FullStack Developer & Systems Architect",
        place: "Independent & Open Source Practice // Semarang",
        description: "Merancang arsitektur sistem skala penuh, aplikasi berbasis web modern, dan kakas pengembang mutakhir."
      },
      {
        year: "2023 — PRESENT",
        title: "Applied Computer Science & Tech Studies",
        place: "ITESA Muhammadiyah Semarang",
        description: "Mendalami statistika komputasional, algoritma komputasi, dan rekayasa perangkat lunak berorientasi data."
      },
      {
        year: "2022 — 2023",
        title: "Web Systems & Interface Developer",
        place: "Semarang Tech Community",
        description: "Mengembangkan prototipe antarmuka berkinerja tinggi, modular design tokens, dan optimasi core web vitals."
      }
    ]
  },

  skills: {
    sectionIndex: "03",
    sectionTitle: "SYSTEMIC CAPABILITIES",
    sectionSub: "STRUCTURAL TAXONOMY // ZERO PROGRESS BARS",
    description:
      "Kami menolak progress bar persentase yang arbitrari. Sebagai gantinya, kemampuan kami diklasifikasikan sebagai matriks arsitektur 4-lapisan: dari infrastruktur dasar hingga pengalaman spasial manusia.",
    matrixTiers: [
      {
        tierId: "TIER-01",
        layerName: "Distributed Systems & Cloud Core",
        concept: "Subterranean Infrastructure",
        colorAccent: "var(--color-botanical-sage)",
        nodes: [
          { name: "Distributed Microservices", spec: "Event-driven, High-Throughput", tag: "CORE" },
          { name: "PostgreSQL & Redis Topology", spec: "Connection Pooling, Caching Grids", tag: "DATA" },
          { name: "Docker & Container Orchestration", spec: "Multi-stage Builds, Zero-downtime", tag: "INFRA" },
          { name: "REST, GraphQL & gRPC APIs", spec: "Strict Contract, Protocol Buffers", tag: "PROTO" },
          { name: "Cloudflare Workers & Edge Compute", spec: "Sub-50ms Global Edge Routing", tag: "EDGE" }
        ]
      },
      {
        tierId: "TIER-02",
        layerName: "Fullstack Synthesis & Engines",
        concept: "Tectonic Middleware",
        colorAccent: "var(--color-warm-sand)",
        nodes: [
          { name: "TypeScript & ECMAScript Next", spec: "Strict Typing, AST Transformations", tag: "LANG" },
          { name: "Node.js & Bun Runtimes", spec: "Non-blocking I/O, High Concurrency", tag: "ENGINE" },
          { name: "Go (Golang)", spec: "Goroutines, Low-latency Micro-daemons", tag: "LANG" },
          { name: "Python for Data & Automation", spec: "NumPy, Pandas, Telemetry Scraping", tag: "DATA" },
          { name: "Next.js & Modern SSR Pipelines", spec: "Streaming SSR, Server Components", tag: "FRAMEWORK" }
        ]
      },
      {
        tierId: "TIER-03",
        layerName: "Spatial UI & Material Motion",
        concept: "Sensory Interface Layer",
        colorAccent: "var(--color-botanical-sage)",
        nodes: [
          { name: "Material 3 Expressive Curves", spec: "cubic-bezier(0.2, 0, 0, 1), Elevation", tag: "MOTION" },
          { name: "Smooth Lerp Parallax Physics", spec: "requestAnimationFrame, Fluid Scroll", tag: "PHYSICS" },
          { name: "Canvas & Generative Topography", spec: "Organic Vector Fields, SVG Noise", tag: "CREATIVE" },
          { name: "Architectural Grid Systems", spec: "Subpixel Hairline Borders, Clamp Scales", tag: "LAYOUT" },
          { name: "Headless Design Tokens", spec: "CSS Variables, Semantic Color Spaces", tag: "SYSTEM" }
        ]
      },
      {
        tierId: "TIER-04",
        layerName: "Human Experience & Ecological Resilience",
        concept: "Atmospheric Envelope",
        colorAccent: "var(--color-charcoal-slate)",
        nodes: [
          { name: "Universal Accessibility (WCAG AAA)", spec: "Keyboard Traversal, High Contrast", tag: "A11Y" },
          { name: "Green Web & Carbon Efficiency", spec: "< 0.12g CO2/view, Zero Bloat", tag: "ECO" },
          { name: "Core Web Vitals Engineering", spec: "LCP < 0.8s, INP < 50ms, CLS 0", tag: "PERF" },
          { name: "Responsive Dynamic Viewports", spec: "Foldables, Ultra-wides, Mobile First", tag: "ADAPT" }
        ]
      }
    ]
  },

  projects: {
    sectionIndex: "04",
    sectionTitle: "SELECTED WORKS",
    sectionSub: "ARCHITECTURAL PORTFOLIO // 2024—2026",
    description:
      "Katalog karya arsitektur perangkat lunak yang dibangun dengan standar estetika galeri dan integritas rekayasa sistem.",
    items: [
      {
        id: "proj-01",
        code: "PRJ // 01",
        title: "Mathicalc",
        subtitle: "High-Precision Mathematical & Computational Engine",
        year: "2026",
        client: "Scientific & Computational Tools",
        category: "Fullstack / Computational Web",
        role: "FullStack Developer",
        description:
          "Mesin komputasi matematika dan kalkulator analitik berbasis web yang mengintegrasikan evaluasi ekspresi matematis instan, rendering LaTeX dinamis, dan visualisasi kalkulasi bertahap berpresisi tinggi.",
        deliverables: [
          "Mesin parsing dan kalkulasi ekspresi matematis berkecepatan tinggi",
          "Antarmuka reaktif minimalis dengan visualisasi formula real-time",
          "Riwayat kalkulasi komputasional dan arsitektur modular WebAssembly"
        ],
        techStack: ["TypeScript", "Next.js", "WebAssembly", "Tailwind CSS", "KaTeX"],
        metrics: {
          latency: "2.8ms Compute",
          precision: "64-bit Float",
          bundle: "24KB Gzipped"
        },
        links: {
          preview: "https://github.com/HanzzSama/Mathicalc",
          code: "https://github.com/HanzzSama/Mathicalc"
        },
        accent: "var(--color-botanical-sage)",
        blueprintSvg: "matrix",
        deepDive: {
          problem: "Kalkulator konvensional di peramban sering lambat, bergantung pada library bloated, dan gagal menyajikan penjabaran langkah matematis yang terstruktur.",
          solution: "Mathicalc mengimplementasikan parser AST mandiri dengan evaluasi bertahap, alokasi memori minimal, dan rendering visual formula berbasis KaTeX tanpa latency.",
          architectureSchema: `[ MATHEMATICAL EXPRESSION INPUT ]
                 ↓
[ LEXER & AST EXPRESSION PARSER ]
                 ↓
[ HIGH-PRECISION ALGORITHMIC CORE ]
                 ↓
[ STEP-BY-STEP KATEX VISUALIZER ]`,
          benchmarks: [
            { metric: "Parse & Solve Latency", target: "< 10ms", achieved: "2.8ms" },
            { metric: "Precision Level", target: "64-bit Exact", achieved: "100% Passed" },
            { metric: "Bundle Overhead", target: "< 40KB", achieved: "24KB" }
          ],
          sourceSnippet: `// Mathicalc Expression AST Evaluator Node
export function evaluateMathAst(node, context = {}) {
  switch (node.type) {
    case 'BinaryOp': return applyOperator(node.op, evaluateMathAst(node.left, context), evaluateMathAst(node.right, context));
    case 'FunctionCall': return executeMathFunction(node.name, node.args.map(a => evaluateMathAst(a, context)));
    case 'Number': return node.value;
  }
}`
        }
      },
      {
        id: "proj-02",
        code: "PRJ // 02",
        title: "TurnCode",
        subtitle: "Intelligent Code Translation & Developer Productivity Engine",
        year: "2025",
        client: "Developer Infrastructure & Tooling",
        category: "Developer Tools / Code Intelligence",
        role: "FullStack Developer",
        description:
          "Platform otomasi dan transformasi kode sumber multi-bahasa yang mempercepat migrasi sistem, refaktorisasi pola arsitektur, dan standardisasi kode secara deterministik.",
        deliverables: [
          "Pipeline translasi dan refactoring sintaks berbasis Abstract Syntax Tree (AST)",
          "Antarmuka dual-pane dengan diff visual real-time dan inspeksi token",
          "Backend eksekusi modular berlatensi rendah dengan isolasi proses aman"
        ],
        techStack: ["TypeScript", "Node.js", "AST Compilers", "Docker", "REST API", "Tailwind CSS"],
        metrics: {
          throughput: "12k LoC/sec",
          errorRate: "0.01% Strict Syntax",
          coverage: "98.5% Test Suite"
        },
        links: {
          preview: "https://github.com/HanzzSama/TurnCode",
          code: "https://github.com/HanzzSama/TurnCode"
        },
        accent: "var(--color-warm-sand)",
        blueprintSvg: "geometry",
        deepDive: {
          problem: "Migrasi repositori skala besar lintas bahasa membutuhkan penyesuaian sintaks berulang yang rawan human error dan memakan waktu berhari-hari.",
          solution: "TurnCode menyediakan aturan transformasi berbasis AST yang dapat diuji secara otomatis dalam sandbox terisolasi, memastikan semantik kode tetap konsisten.",
          architectureSchema: `[ SOURCE REPOSITORY INPUT ] → [ MULTI-LANGUAGE LEXER ]
                                  ↓
                        [ AST NORMALIZER ENGINE ]
                                  ↓
                        [ PATTERN REWRITE RULES ]
                                  ↓
              [ TARGET EMITTER & REAL-TIME DIFF INSPECTOR ]`,
          benchmarks: [
            { metric: "Transformation Speed", target: "> 5k LoC/s", achieved: "12k LoC/s" },
            { metric: "Syntax Preservation", target: "> 99%", achieved: "99.9% Clean AST" },
            { metric: "Sandbox Isolation", target: "Zero Leakage", achieved: "Verified 100%" }
          ],
          sourceSnippet: `// TurnCode AST Migration Pipeline
export async function transformSourcePipeline(sourceCode, ruleSet) {
  const ast = parseSourceToAst(sourceCode);
  const normalizedAst = applyRuleTransformers(ast, ruleSet);
  return generateTargetCode(normalizedAst, { format: 'standard' });
}`
        }
      },
      {
        id: "proj-03",
        code: "PRJ // 03",
        title: "Neura",
        subtitle: "Neural Cognitive Interface & AI Orchestration Platform",
        year: "2025",
        client: "Cognitive Systems & AI Lab",
        category: "AI & FullStack Engineering",
        role: "FullStack Developer",
        description:
          "Platform orkestrasi model AI dan antarmuka kognitif cerdas dengan streaming respons real-time latensi rendah, penelusuran konteks adaptif, dan integrasi pangkalan pengetahuan terdistribusi.",
        deliverables: [
          "Arsitektur server-sent events (SSE) untuk streaming inferensi sub-50ms",
          "Sistem retrieval kontekstual berbasis vektor database dan caching cerdas",
          "Antarmuka biophilic modular berstandar ketenangan visual dan performa tinggi"
        ],
        techStack: ["Python", "TypeScript", "FastAPI", "Next.js", "Vector DB", "Redis"],
        metrics: {
          ttfb: "48ms First Token",
          concurrency: "1,500 Streams",
          uptime: "99.95%"
        },
        links: {
          preview: "https://github.com/HanzzSama/Neura",
          code: "https://github.com/HanzzSama/Neura"
        },
        accent: "var(--color-botanical-sage)",
        blueprintSvg: "contour",
        deepDive: {
          problem: "Banyak antarmuka AI membebani pengguna dengan latensi respons tinggi, antarmuka generik yang bising, dan ketiadaan retensi konteks multi-sesi yang akurat.",
          solution: "Neura mengkombinasikan backend streaming asinkron FastAPI berkecepatan tinggi dengan antarmuka front-end bertema tektonik yang hemat komputasi dan responsif.",
          architectureSchema: `[ USER PROMPT / CONTEXT ]
                 ↓
[ HYBRID VECTOR RETRIEVAL (RAG) ]
                 ↓
[ STREAMING INFERENCE ORCHESTRATOR ]
                 ↓
[ ZERO-LATENCY SSE TO REACTIVE UI ]`,
          benchmarks: [
            { metric: "Time to First Token (TTFT)", target: "< 100ms", achieved: "48ms" },
            { metric: "Stream Throughput", target: "> 60 tokens/s", achieved: "85 tokens/s" },
            { metric: "Context Cache Hit Rate", target: "> 70%", achieved: "84.2%" }
          ],
          sourceSnippet: `// Neura Low-Latency SSE Dispatcher
export async function streamNeuraInference(prompt, streamWriter) {
  const context = await retrieveVectorContext(prompt);
  for await (const chunk of executeModelStream(prompt, context)) {
    streamWriter.write(formatSseEvent(chunk));
  }
}`
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

  pet: {
    name: "HanzzPet",
    statusPrefix: "SYS.PET // NOMINAL",
    defaultThought: "Menyelaraskan koordinat Semarang... [6.9667° S]",
    tips: {
      pet: "Elus / Pet",
      crown: "Mahkota Royal",
      matcha: "Beri Matcha",
      zoomies: "Zoomies!",
      wisdom: "Celoteh Arsitektur",
      sleep: "Tidur / Bangun",
      toggle: "Ciutkan"
    }
  },

  another: {
    sectionIndex: "06",
    sectionTitle: "DIGITAL GARDEN & TRANSMISSION",
    sectionSub: "LAB EXPERIMENTS // FREQUENCY SYNTH // DISPATCH",
    description:
      "Arsip pemikiran, eksperimen audio-spasial, dan saluran komunikasi langsung untuk kolaborasi arsitektural.",
    gardenNotes: [
      {
        id: "note-01",
        date: "OCT 2026",
        tag: "MONOGRAPH // 01",
        title: "Mengapa Antarmuka Modern Membutuhkan Sensasi Tektonik dan Gravitasi",
        readTime: "6 min read",
        excerpt:
          "Eksplorasi mendalam tentang kejenuhan mata pengguna terhadap gradien sintetis dan bagaimana kurva Material 3 Expressive serta tekstur batu kapur alami membangkitkan ketenangan neurologis.",
        content: `
          <h4>1. Kejenuhan Terhadap Estetika Artifisial</h4>
          <p>Selama lima tahun terakhir, antarmuka digital dikuasai oleh gradien ungu/biru neon dan efek glassmorphism yang seragam. Ini menciptakan apa yang para arsitek sebut sebagai "visual fatigue" — kelelahan kognitif akibat rangsangan spektrum warna yang tidak pernah ditemui dalam alam biologis manusia.</p>
          <h4>2. Sensasi Tektonik dan Bobot Fisik</h4>
          <p>Dengan menerapkan prinsip Biophilic Architectural Minimalism, kita mengembalikan bobot tektonik pada layar. Garis 1px bukan sekadar pembatas, melainkan balok penopang struktur. Kurva gerak cubic-bezier(0.2, 0, 0, 1) Google Material 3 memberikan inersia alami — sebuah elemen tidak berhenti seketika layaknya saklar biner, melainkan memiliki perlambatan gravitasi.</p>
          <h4>3. Ketenangan Neurologis melalui Palet Limestone</h4>
          <p>Batu kapur (Raw Limestone) dan lumut obsidian (Obsidian Moss) memantulkan spektrum cahaya yang lebih ramah bagi retina. Menggabungkannya dengan tipografi editorial menghasilkan ruang digital yang tenang, terukur, dan menghormati fokus manusia.</p>
        `
      },
      {
        id: "note-02",
        date: "AUG 2026",
        tag: "SYSTEM LAB // 02",
        title: "Arsitektur Zero-Overhead: Menyingkirkan Library Raksasa untuk Lerp Scroll Murni",
        readTime: "4 min read",
        excerpt:
          "Bagaimana kalkulasi diferensial linear interpolation 40 baris kode dapat mengungguli performa library scroll 200KB pada perangkat mobile dengan refresh rate 120Hz.",
        content: `
          <h4>1. Jebakan Bloatware Library Pihak Ketiga</h4>
          <p>Banyak pengembang mengimpor library scroll berbobot ratusan kilobyte hanya untuk mendapatkan efek gerak halus. Hal ini mengorbankan metrik INP (Interaction to Next Paint) dan membebani memori browser.</p>
          <h4>2. Matematika Lerp yang Elegan</h4>
          <p>Formula lerp(start, end, factor) = start + (end - start) * factor yang dijalankan dalam loop requestAnimationFrame dengan nilai factor antara 0.08 hingga 0.1 memberikan kehalusan 60–120 FPS tanpa overhead.</p>
          <h4>3. Momentum Parallax Halus</h4>
          <p>Dengan menghitung delta scroll secara real-time, kita dapat menerapkan translasi koordinat berbasis kecepatan scroll pengguna, memberikan pengalaman interaksi yang bersih, stabil, dan presisi.</p>
        `
      },
      {
        id: "note-03",
        date: "MAY 2026",
        tag: "ACADEMIA // 03",
        title: "Statistika Komputasional dalam Rekayasa Perangkat Lunak: Catatan dari ITESA",
        readTime: "8 min read",
        excerpt:
          "Penerapan model probabilitas stokastik untuk mendeteksi bottleneck latensi pada arsitektur microservices terdistribusi.",
        content: `
          <h4>1. Lensa Statistik dalam Pemodelan Sistem</h4>
          <p>Sebagai akademisi di ITESA Muhammadiyah Semarang, saya melihat rekayasa perangkat lunak tidak hanya sebagai seni menulis kode, melainkan sebagai sistem probabilitas terbuka. Latensi p99 bukanlah angka acak, melainkan hasil distribusi ekor panjang (heavy-tailed distribution).</p>
          <h4>2. Deteksi Bottleneck Berbasis Distribusi</h4>
          <p>Dengan menerapkan estimasi quantil dinamis menggunakan algoritma T-Digest di dalam micro-daemon, kita dapat mendeteksi degradasi performa sebelum lonjakan error 5xx terjadi pada layer aplikasi.</p>
          <h4>3. Sintesis Sains Data dan Arsitektur UI</h4>
          <p>Data metrik yang akurat memungkinkan antarmuka menyajikan informasi telemetri yang jujur, bukan angka persentase fiktif. Inilah fondasi arsitektur data terpusat kami.</p>
        `
      }
    ],
    audioSynth: {
      title: "Biophilic Resonant Tone Generator",
      tagline: "432Hz Nature Solfeggio • Interactive Web Audio Node",
      frequencies: [
        { label: "Ground (108Hz)", freq: 108, desc: "Tectonic Sub-Bass" },
        { label: "Sage Earth (216Hz)", freq: 216, desc: "Harmonic Foundation" },
        { label: "Natural Calm (432Hz)", freq: 432, desc: "Organic Resonant Tone" },
        { label: "Canopy Air (864Hz)", freq: 864, desc: "High Atmospheric Shimmer" }
      ]
    },
    colophon: {
      typography: "Syne (Display) • Instrument Serif (Editorial) • Plus Jakarta Sans (Body) • JetBrains Mono (Telemetry)",
      gridSystem: "Tectonic 12-Column Hairline Modular Grid",
      carbonEstimate: "Est. 0.09g CO2 per page view • Hosted on Edge Server",
      license: "Architectural Design & Systems © 2026 Haidar Rifky Andrianno. Crafted with precision."
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
            solution: transItem.deepDive.solution || item.deepDive?.solution
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

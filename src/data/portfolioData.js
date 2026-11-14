/**
 * PORTFOLIO DATA ARCHITECTURE
 * Centralized Single Source of Truth
 * Identity: Haidar Rifky Andrianno
 * Academic Base: ITESA Muhammadiyah Semarang
 * Geo-Nodes: Semarang, Indonesia
 */

export const portfolioData = {
  meta: {
    fullName: "Haidar Rifky Andrianno",
    shortName: "Haidar",
    callsign: "HRA // ARCH.01",
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
    headlineLine1: "HARMONIZING",
    headlineLine2: "ORGANIC NATURE",
    headlineLine3: "WITH RIGID CODE.",
    leadParagraph:
      "Saya adalah Haidar Rifky Andrianno, FullStack Developer yang berbasis di Semarang. Menempuh studi di ITESA Muhammadiyah Semarang, berfokus pada sintesis ruang digital bernapas — memadukan keteraturan arsitektural minimalis, rekayasa perangkat lunak skala tinggi, dan prinsip interaksi responsif modern.",
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

  another: {
    sectionIndex: "05",
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

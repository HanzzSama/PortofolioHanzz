import fs from 'fs';

const translationsPath = 'src/data/translations.js';
let content = fs.readFileSync(translationsPath, 'utf8');

// Garden notes contents per language
const gardenNotesContent = {
  id: {
    'note-01': `
          <h4>1. Awal mula ketertarikan</h4>
          <p>Saya mulai belajar dasar-dasar pemrograman web karena ingin tahu cara kerja website dan aplikasi yang saya gunakan sehari-hari.</p>
          <h4>2. Eksplorasi mandiri</h4>
          <p>Saya belajar HTML, CSS, dan JavaScript secara mandiri melalui dokumentasi resmi, forum pengembang, dan latihan membuat proyek kecil.</p>
          <h4>3. Penerapan pada proyek nyata</h4>
          <p>Setelah memahami konsep dasar, saya mulai merancang antarmuka dan membangun website untuk kebutuhan nyata, termasuk sistem informasi kampus dan aplikasi web interaktif.</p>
    `.trim(),
    'note-02': `
          <h4>1. Kolaborasi desain dan kode</h4>
          <p>Sering ada jarak antara rancangan di Figma dan hasil akhir di browser. Karena saya menguasai desain UI/UX dan pemrograman web, proses penerjemahan ide menjadi kode berjalan lebih terarah.</p>
          <h4>2. Antarmuka yang terstruktur</h4>
          <p>Tata letak yang teratur, tipografi yang terbaca, dan susunan navigasi yang sederhana membantu pengguna memahami isi halaman dengan cepat.</p>
          <h4>3. Interaksi yang responsif</h4>
          <p>Animasi halus dan umpan balik visual saat pengguna berinteraksi membuat website terasa responsif dan nyaman digunakan.</p>
    `.trim(),
    'note-03': `
          <h4>1. Fondasi akademik di ITESA</h4>
          <p>Kuliah di ITESA Muhammadiyah Semarang mengajarkan logika komputasi, analisis data, dan prinsip rekayasa perangkat lunak yang melandasi pekerjaan saya.</p>
          <h4>2. Kerja sama tim dan studi kasus</h4>
          <p>Tugas kelompok dan proyek kampus melatih kemampuan komunikasi, pembagian tugas dalam tim, dan penyelesaian masalah teknis secara bersama.</p>
          <h4>3. Keseimbangan teori dan praktik</h4>
          <p>Teori komputasi yang saya pelajari di kelas langsung saya uji dan terapkan dalam pengembangan website dan proyek aplikasi portofolio.</p>
    `.trim()
  },
  en: {
    'note-01': `
          <h4>1. Early curiosity</h4>
          <p>I started learning web programming fundamentals out of curiosity about how everyday websites and apps work under the hood.</p>
          <h4>2. Independent exploration</h4>
          <p>I learned HTML, CSS, and JavaScript through official documentation, developer communities, and building small practice projects.</p>
          <h4>3. Applied real-world projects</h4>
          <p>After grasping core concepts, I began designing interfaces and building web applications for real needs, including campus information systems and interactive web apps.</p>
    `.trim(),
    'note-02': `
          <h4>1. Design and code collaboration</h4>
          <p>There is often a gap between Figma mockups and browser implementation. By combining UI/UX design and web development, translating concepts into code becomes faster and more precise.</p>
          <h4>2. Structured interface</h4>
          <p>A clean layout, clear typographic hierarchy, and intuitive navigation allow users to understand content quickly.</p>
          <h4>3. Responsive interaction</h4>
          <p>Smooth micro-interactions, responsive states, and immediate visual feedback make web experiences engaging and seamless.</p>
    `.trim(),
    'note-03': `
          <h4>1. Academic foundation at ITESA</h4>
          <p>Studying at ITESA Muhammadiyah Semarang provides computational logic, data analysis, and software engineering principles that guide my development practice.</p>
          <h4>2. Teamwork and case studies</h4>
          <p>Group coursework and campus initiatives sharpen communication skills, task delegation, and collaborative problem solving.</p>
          <h4>3. Balancing theory and practice</h4>
          <p>Computational theories learned in the classroom are tested and applied in building real-world websites and portfolio applications.</p>
    `.trim()
  },
  zh: {
    'note-01': `
          <h4>1. 探索起源</h4>
          <p>出于对日常使用的网站和应用程序工作原理的好奇，我开始学习网页编程的基础知识。</p>
          <h4>2. 自主学习</h4>
          <p>我通过官方文档、开发者社区以及练习构建小型项目，自主学习了 HTML、CSS 和 JavaScript。</p>
          <h4>3. 实际项目落地</h4>
          <p>在掌握核心概念后，我开始设计界面并构建满足实际需求的网页应用，包括校园信息系统与交互式网页程序。</p>
    `.trim(),
    'note-02': `
          <h4>1. 设计与代码协同</h4>
          <p>Figma 设计稿与浏览器实现之间往往存在差距。凭借同时掌握 UI/UX 设计与网页开发的能力，将设计概念转化为代码的过程更加顺畅精准。</p>
          <h4>2. 结构化界面</h4>
          <p>清晰的版式布局、易读的排版层级和直观的导航结构，帮助用户快速理解页面内容。</p>
          <h4>3. 灵敏交互反馈</h4>
          <p>流畅的微交互、即时响应以及视觉反馈，让整个网页交互体验更加轻盈自然。</p>
    `.trim(),
    'note-03': `
          <h4>1. ITESA 学术基础</h4>
          <p>在 ITESA Muhammadiyah Semarang 的学习为我打下了计算逻辑、数据分析和软件工程原则的基础，指导着我的日常开发实践。</p>
          <h4>2. 团队协作与案例实践</h4>
          <p>小组作业与校园项目锻炼了我的沟通技巧、任务分工以及协同解决技术问题的能力。</p>
          <h4>3. 理论与实践结合</h4>
          <p>课堂上学到的计算理论直接应用于网站构建与作品集实际项目中，相得益彰。</p>
    `.trim()
  },
  ja: {
    'note-01': `
          <h4>1. 興味の始まり</h4>
          <p>日常的に使うWebサイトやアプリの仕組みを知りたいという好奇心から、Webプログラミングの基礎を学び始めました。</p>
          <h4>2. 独学での探求</h4>
          <p>公式ドキュメントや開発者フォーラム、小規模なプロジェクトの制作を通じて、HTML、CSS、JavaScriptを独学で習得しました。</p>
          <h4>3. 実践プロジェクトへの適用</h4>
          <p>基本概念を理解した後、学内情報システムやインタラクティブなWebアプリなど、実際のニーズに応じたUI設計とWeb開発を手がけ始めました。</p>
    `.trim(),
    'note-02': `
          <h4>1. デザインとコードの協働</h4>
          <p>Figmaのデザインとブラウザでの最終実装の間には乖離が生じがちです。UI/UXデザインとWeb開発の双方を理解していることで、意図を正確にコードへ落とし込めます。</p>
          <h4>2. 整理されたインターフェース</h4>
          <p>整然としたレイアウト、読みやすいタイポグラフィ、直感的なナビゲーションにより、ユーザーがコンテンツを素早く把握できます。</p>
          <h4>3. レスポンシブなインタラクション</h4>
          <p>滑らかなマイクロアニメーションと即座の視覚的フィードバックにより、快適で軽快なWeb体験を実現します。</p>
    `.trim(),
    'note-03': `
          <h4>1. ITESAでの学問的基盤</h4>
          <p>ITESA Muhammadiyah Semarangでの学びは、計算論理、データ分析、ソフトウェア工学の原理を養い、日々の開発の基盤となっています。</p>
          <h4>2. チームワークとケーススタディ</h4>
          <p>グループワークや学内プロジェクトを通じて、コミュニケーション能力、チーム内の役割分担、共同での技術課題解決力を磨いています。</p>
          <h4>3. 理論と実践の融合</h4>
          <p>講義で得た計算理論を、Webサイト構築やポートフォリオアプリの実装を通じて即座に検証・応用しています。</p>
    `.trim()
  },
  de: {
    'note-01': `
          <h4>1. Frühe Neugier</h4>
          <p>Aus Neugier darüber, wie Websites und Anwendungen im Alltag funktionieren, begann ich mit den Grundlagen der Webprogrammierung.</p>
          <h4>2. Eigenständiges Lernen</h4>
          <p>Ich erlernte HTML, CSS und JavaScript im Selbststudium durch offizielle Dokumentationen, Entwicklerforen und kleinere Übungsprojekte.</p>
          <h4>3. Anwendung in realen Projekten</h4>
          <p>Nachdem ich die Grundkonzepte verinnerlicht hatte, entwarf ich Schnittstellen und programmierte praxisnahe Webanwendungen, darunter Campus-Informationssysteme und interaktive Web-Apps.</p>
    `.trim(),
    'note-02': `
          <h4>1. Zusammenarbeit von Design und Code</h4>
          <p>Häufig klafft eine Lücke zwischen dem Figma-Entwurf und dem Browser-Ergebnis. Da ich sowohl UI/UX-Design als auch Webentwicklung beherrsche, gelingt die Umsetzung zielgerichtet und präzise.</p>
          <h4>2. Strukturierte Benutzeroberfläche</h4>
          <p>Ein aufgeräumtes Layout, klare Typografie und eine intuitive Navigation ermöglichen es Nutzern, Inhalte schnell zu erfassen.</p>
          <h4>3. Reaktionsschnelle Interaktion</h4>
          <p>Feine Mikro-Interaktionen und unmittelbares visuelles Feedback sorgen für eine reaktionsschnelle und angenehme Bedienung.</p>
    `.trim(),
    'note-03': `
          <h4>1. Akademisches Fundament an der ITESA</h4>
          <p>Das Studium an der ITESA Muhammadiyah Semarang vermittelt mir Rechenlogik, Datenanalyse und Software-Engineering-Prinzipien, die meine Entwicklung leiten.</p>
          <h4>2. Teamarbeit und Fallstudien</h4>
          <p>Gruppenarbeiten und Campusprojekte schulen Kommunikation, Aufgabenverteilung im Team und das gemeinsame Lösen technischer Herausforderungen.</p>
          <h4>3. Balance aus Theorie und Praxis</h4>
          <p>Die in Vorlesungen erlernte Informatiktheorie wende ich direkt bei der Entwicklung von Websites und praktischen Portfolio-Anwendungen an.</p>
    `.trim()
  }
};

const contextMenuTranslations = {
  id: {
    sectionTelemetry: "01 // Telemetri dan sistem",
    xray: "Buka Telemetri X-Ray",
    theme: "Ganti Tema Visual",
    audio: "Konsol Audio DSP",
    sectionNav: "02 // Navigasi cepat",
    navWelcome: "Beranda (Welcome)",
    navAbout: "Tentang saya & manifesto",
    navSkills: "Taksonomi keahlian",
    navProjects: "Arsip proyek",
    navGithub: "Repositori GitHub",
    navLab: "3D Kinetic Lab",
    navWeather: "Cuaca & biosfer",
    sectionUtils: "03 // Utilitas dan bagikan",
    copyUrl: "Salin tautan portofolio",
    copyCoord: "Salin koordinat geodesik",
    scrollTop: "Kembali ke paling atas",
    reload: "Muat ulang halaman",
    footerHint: "Shift + klik kanan untuk menu peramban bawaan",
    toastTheme: "Tema visual diperbarui",
    toastCopyUrl: "Tautan portofolio tersalin",
    toastCopyUrlFail: "Gagal menyalin tautan",
    toastCopyCoord: "Koordinat lokasi tersalin [07°00'S 110°25'E]",
    toastCopyCoordFail: "Gagal menyalin koordinat"
  },
  en: {
    sectionTelemetry: "01 // Telemetry and system",
    xray: "Open X-Ray Telemetry",
    theme: "Toggle Visual Theme",
    audio: "DSP Audio Console",
    sectionNav: "02 // Fast navigation",
    navWelcome: "Home (Welcome)",
    navAbout: "About & manifesto",
    navSkills: "Skills taxonomy",
    navProjects: "Project archive",
    navGithub: "GitHub repositories",
    navLab: "3D Kinetic Lab",
    navWeather: "Weather & atmosphere",
    sectionUtils: "03 // Utilities and share",
    copyUrl: "Copy portfolio link",
    copyCoord: "Copy coordinates",
    scrollTop: "Back to top",
    reload: "Reload page",
    footerHint: "Shift + right click for default browser menu",
    toastTheme: "Visual theme updated",
    toastCopyUrl: "Portfolio link copied",
    toastCopyUrlFail: "Failed to copy link",
    toastCopyCoord: "Coordinates copied [07°00'S 110°25'E]",
    toastCopyCoordFail: "Failed to copy coordinates"
  },
  zh: {
    sectionTelemetry: "01 // 遥测与系统",
    xray: "打开 X-Ray 遥测",
    theme: "切换视觉主题",
    audio: "DSP 音频控制台",
    sectionNav: "02 // 快速导航",
    navWelcome: "首页 (Welcome)",
    navAbout: "关于我与理念",
    navSkills: "技能体系",
    navProjects: "精选作品项目",
    navGithub: "GitHub 仓库",
    navLab: "3D 动力学实验室",
    navWeather: "天气与氛围",
    sectionUtils: "03 // 实用工具与分享",
    copyUrl: "复制作品集链接",
    copyCoord: "复制地理坐标",
    scrollTop: "返回顶部",
    reload: "刷新页面",
    footerHint: "Shift + 右键点击使用原生浏览器菜单",
    toastTheme: "视觉主题已更新",
    toastCopyUrl: "作品集链接已复制",
    toastCopyUrlFail: "复制链接失败",
    toastCopyCoord: "地理坐标已复制 [07°00'S 110°25'E]",
    toastCopyCoordFail: "复制坐标失败"
  },
  ja: {
    sectionTelemetry: "01 // テレメトリとシステム",
    xray: "X-Rayテレメトリを開く",
    theme: "ビジュアルテーマ切替",
    audio: "DSPオーディオコンソール",
    sectionNav: "02 // クイックナビゲーション",
    navWelcome: "ホーム (Welcome)",
    navAbout: "自己紹介と理念",
    navSkills: "スキル体系",
    navProjects: "制作プロジェクト",
    navGithub: "GitHubリポジトリ",
    navLab: "3Dキネティックラボ",
    navWeather: "天気と環境",
    sectionUtils: "03 // ツールと共有",
    copyUrl: "ポートフォリオリンクをコピー",
    copyCoord: "座標をコピー",
    scrollTop: "ページ先頭に戻る",
    reload: "ページを再読み込み",
    footerHint: "Shift + 右クリックでブラウザ標準メニュー",
    toastTheme: "ビジュアルテーマを更新しました",
    toastCopyUrl: "ポートフォリオのリンクをコピーしました",
    toastCopyUrlFail: "リンクのコピーに失敗しました",
    toastCopyCoord: "座標をコピーしました [07°00'S 110°25'E]",
    toastCopyCoordFail: "座標のコピーに失敗しました"
  },
  de: {
    sectionTelemetry: "01 // Telemetrie und System",
    xray: "X-Ray-Telemetrie öffnen",
    theme: "Farbschema wechseln",
    audio: "DSP-Audiokonsole",
    sectionNav: "02 // Schnellnavigation",
    navWelcome: "Startseite (Welcome)",
    navAbout: "Über mich & Manifest",
    navSkills: "Kompetenzübersicht",
    navProjects: "Projektarchiv",
    navGithub: "GitHub-Repositories",
    navLab: "3D-Kinetic-Labor",
    navWeather: "Wetter & Atmosphäre",
    sectionUtils: "03 // Werkzeuge und Teilen",
    copyUrl: "Portfolio-Link kopieren",
    copyCoord: "Standortkoordinaten kopieren",
    scrollTop: "Zurück nach oben",
    reload: "Seite neu laden",
    footerHint: "Umschalttaste + Rechtsklick für Standard-Browser-Menü",
    toastTheme: "Farbschema aktualisiert",
    toastCopyUrl: "Portfolio-Link kopiert",
    toastCopyUrlFail: "Link konnte nicht kopiert werden",
    toastCopyCoord: "Koordinaten kopiert [07°00'S 110°25'E]",
    toastCopyCoordFail: "Koordinaten konnten nicht kopiert werden"
  }
};

// Use dynamic execution with module parsing
import('../src/data/translations.js').then(mod => {
  const t = mod.translations;

  for (const lang of ['id', 'en', 'zh', 'ja', 'de']) {
    // 1. Inject gardenNotes content
    for (const noteId of ['note-01', 'note-02', 'note-03']) {
      if (t[lang]?.another?.gardenNotes?.[noteId]) {
        t[lang].another.gardenNotes[noteId].content = gardenNotesContent[lang][noteId];
      }
    }

    // 2. Inject contextMenu
    t[lang].contextMenu = contextMenuTranslations[lang];
  }

  const outStr = 'export const translations = ' + JSON.stringify(t, null, 2) + ';\n';
  fs.writeFileSync('src/data/translations.js', outStr, 'utf8');
  console.log('Successfully updated translations.js with complete garden notes content and context menu translations!');
});


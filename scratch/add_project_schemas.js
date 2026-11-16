import fs from 'fs';
import path from 'path';

const schemas = {
  "proj-01": `[CLIENT: WEB & MOBILE BROWSERS]
       │
       ▼ HTTPS / TLS 1.3
[LARAVEL ROUTING & TAILWIND BLADE ENGINE]
       │
       ├──► [ADMISSION CONTROLLER: JALUR & PRODI]
       │           │
       │           ├──► [FORM VALIDATION & SANITIZATION]
       │           └──► [DOCUMENT UPLOAD & VERIF ENGINE]
       │
       ├──► [ADMIN DASHBOARD: PANITIA PMB ITESA]
       │
       ▼ ELOQUENT ORM / QUERY BUILDER
[MYSQL DATABASE: CAMABA, PRODI, KUOTA, STATUS]`,

  "proj-02": `[USER INPUT: KEYBOARD & TOUCH NUMPAD]
       │
       ▼ EVENT LISTENER
[PARSER & TOKENIZER: MATH EXPRESSION]
       │
       ├──► [MATH BOT ENGINE: AUTO-CORRECT & CALC]
       │
       ├──► [THEME ENGINE: DYNAMIC CSS VARIABLES]
       │           │
       │           └──► [LOCALSTORAGE STATE PERSISTENCE]
       │
       ▼ REAL-TIME DOM RENDERER
[CANVAS / LCD DISPLAY: RESULT & HISTORY LOG]`,

  "proj-03": `[LEARNER / DEVELOPER UI]
       │
       ▼ HTTPS REST API
[LARAVEL CORE: LEARNING ROADMAP ENGINE]
       │
       ├──► [MODULAR CURRICULUM: ZERO TO PRO]
       │           │
       │           ├──► [CODE PLAYGROUND & SANDBOX]
       │           └──► [INTERACTIVE SYNTAX VALIDATOR]
       │
       ├──► [PROGRESSION & MILESTONE TRACKER]
       │
       ▼ ELOQUENT ORM
[MYSQL DATABASE: USERS, LESSONS, COMPLETIONS]`,

  "proj-04": `[CLINICAL ASSESSMENT / USER QUESTIONNAIRE]
       │
       ▼ WEBSOCKET / REST API
[FASTAPI & LLM INTERFACE LAYER]
       │
       ├──► [LLM: SYMPTOM EXTRACTION & CONTEXT]
       │           │
       │           ▼
       ├──► [FEATURE VECTOR PREPROCESSING]
       │           │
       │           ▼
       ├──► [XGBOOST CLASSIFIER: ALZHEIMER RISK]
       │           │
       │           └──► [DECISION TREE ENSEMBLE SCORING]
       │
       ▼ JSON TELEMETRY RESPONSE
[DIAGNOSTIC RADAR & RISK STRATIFICATION UI]`,

  "proj-05": `[AGROTECH PORTAL USER]
       │
       ▼ HTTPS
[PHP MVC FRAMEWORK & WEB RUNTIME]
       │
       ├──► [KATALOG PRODUK PERTANIAN & AGRIBISNIS]
       │
       ├──► [SISTEM INFORMASI KEMITRAAN PETANI]
       │
       ▼ MYSQL STORAGE
[DATABASE PRODUK, ARTIKEL TANI & DATA MITRA]`,

  "proj-06": `[CUSTOMER TABLE / MOBILE ORDER]
       │
       ▼
[ORDER DISPATCHER & CART STATE]
       │
       ├──► [MENU SELECTOR & PRICING CALCULATOR]
       │
       ├──► [KITCHEN DISPLAY SYSTEM TICKETING]
       │
       ▼ TRANSACTION LOG
[ORDER STATUS, PAYMENT RECEIPT & DATABASE]`,

  "proj-07": `[SISWA & PUSTAKAWAN INTERFACE]
       │
       ▼
[LIBRARY MANAGEMENT CORE]
       │
       ├──► [OPAC: ONLINE CATALOG SEARCH]
       │
       ├──► [CIRCULATION: PINJAM, KEMBALI, DENDA]
       │
       ▼ RELATIONAL SCHEMA
[DATABASE BUKU, MEMBER, & RIWAYAT PEMINJAMAN]`,

  "proj-08": `[ADMIN KEUANGAN & SISWA PORTAL]
       │
       ▼
[FINANCIAL LEDGER & BILLING SYSTEM]
       │
       ├──► [VERIFIKASI TAGIHAN BULANAN SISWA]
       │
       ├──► [CETAK BUKTI PEMBAYARAN & KWITANSI]
       │
       ▼ TRANSACTION ARCHIVE
[DATABASE TRANSAKSI, REKAP KAS & LAPORAN SPP]`,

  "proj-09": `[USER TASK INPUT & GESTURE CONTROL]
       │
       ▼
[TASK STATE MANAGER: CRUD & FILTERING]
       │
       ├──► [PRIORITY MATRIX: HIGH / MED / LOW]
       │
       ├──► [LOCALSTORAGE OFFLINE SYNC]
       │
       ▼ REACTIVE DOM
[INTERACTIVE TASK LIST & COMPLETION TELEMETRY]`
};

// 1. Update translations.js
import('../src/data/translations.js').then(transMod => {
  const trans = transMod.translations;
  for (const lang of Object.keys(trans)) {
    if (trans[lang] && trans[lang].projects && trans[lang].projects.items) {
      for (const id of Object.keys(trans[lang].projects.items)) {
        if (schemas[id]) {
          const item = trans[lang].projects.items[id];
          if (!item.deepDive) item.deepDive = {};
          item.deepDive.architectureSchema = schemas[id];
        }
      }
    }
  }

  const tPath = path.resolve('src/data/translations.js');
  const output = `/**\n * INTERNATIONALIZATION (i18n) DICTIONARY\n * Fully Localized Across 5 Languages:\n * - id: Bahasa Indonesia (Default)\n * - en: English\n * - zh: 中文 (Simplified Chinese)\n * - ja: 日本語 (Japanese)\n * - de: Deutsch (German)\n * Clean Portfolio Content: Haidar Rifky Andrianno (Hanzz / HanzzSama)\n */\n\nexport const translations = ${JSON.stringify(trans, null, 2)};\n`;
  fs.writeFileSync(tPath, output, 'utf8');
  console.log('Successfully updated translations.js with architecture schemas!');
});

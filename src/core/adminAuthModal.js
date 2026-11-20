/**
 * ADMIN OTP & QR-CODE AUTHENTICATION GATEWAY MODAL
 * Dual Verification:
 * Option 1: 6-Digit Email Verification Code to haidarandrianno098@gmail.com
 * Option 2: QR-Code Scanner / Image Drop + Root Admin Password (Default: RootUser=0)
 */

import { QrScannerEngine } from './qrScannerEngine.js';

export class AdminAuthModal {
  constructor(securityEngine, onSuccess) {
    this.sec = securityEngine;
    this.onSuccess = onSuccess;
    this.backdropEl = null;
    this.inputs = [];
    this.currentOtp = null;
    this.otpExpiresAt = 0;
    this.timerInterval = null;
    this.resendCooldownUntil = 0;
    this.resendInterval = null;

    // View state: 'qr' | 'options' | 'otp'
    this.qrScanner = new QrScannerEngine();
    this.currentView = 'qr'; // Default view: QR-code (Gambar 1)
    this.activeTab = 'qr'; // Backwards compatibility alias
    this.detectedQrToken = null;
    this.isCameraActive = false;
    this.activeQrSessionId = null;
    this.activeQrToken = null;
    this.authChannel = null;
    this.storageListener = null;
    this.cloudEventSource = null;
    this.pollApprovalInterval = null;

    // Default LAN IP fallback for local development scanning
    try {
      if (!localStorage.getItem('hra_detected_lan_ip')) {
        localStorage.setItem('hra_detected_lan_ip', '10.57.119.96');
      }
    } catch (_) {}

    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    const backdrop = document.createElement('div');
    backdrop.id = 'admin-auth-backdrop';
    backdrop.className = 'admin-auth-backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');

    backdrop.innerHTML = `
      <div class="admin-auth-dialog" data-cursor-target>
        <div class="auth-chassis-strip font-mono" id="auth-chassis-strip">
          <span id="auth-chassis-left">NODE // 07°00'S 110°25'E</span>
          <span id="auth-chassis-mid">SYS // DUAL_FACTOR</span>
          <span id="auth-chassis-right">LVL // ROOT</span>
        </div>

        <div id="auth-lockout-banner" style="display: none; background: rgba(239, 68, 68, 0.12); border: 1px solid #EF4444; color: #EF4444; padding: 0.75rem 1rem; border-radius: 4px; margin-bottom: 1.25rem; font-family: var(--font-mono); font-size: 0.75rem;">
          <strong>PERINGATAN KEAMANAN:</strong> Terlalu banyak percobaan salah. Akses dikunci sementara selama <span id="lockout-time-readout">--</span> detik.
        </div>

        <div id="auth-normal-content">
          <!-- ==============================================================
               VIEW 1: QR CODE VERIFICATION (GAMBAR 1 - DEFAULT VIEW)
               ============================================================== -->
          <div id="auth-view-qr" class="auth-sub-view active">
            <div class="auth-header">
              <div class="auth-title-cluster">
                <span class="auth-tagline font-mono">
                  <span class="auth-status-dot"></span>
                  SECURITY GATEWAY // ROOT ACCESS
                </span>
                <h3 class="auth-heading font-display">Verifikasi Akses Admin</h3>
              </div>
              <button type="button" class="auth-close-btn font-mono" id="auth-close-btn-qr" title="Tutup [Esc]">
                [ESC] X
              </button>
            </div>

            <div class="auth-qr-split-grid">
              <!-- SISI KIRI: QR-Code Frame & Status Badge -->
              <div class="auth-qr-left-pane">
                <div class="qr-code-frame">
                  <div class="qr-corner-bracket tl"></div>
                  <div class="qr-corner-bracket tr"></div>
                  <div class="qr-corner-bracket bl"></div>
                  <div class="qr-corner-bracket br"></div>
                  <div class="qr-ambient-scan-line"></div>
                  <div id="qr-live-svg-slot" class="qr-svg-holder">
                    <!-- Standard ISO QR SVG rendered dynamically -->
                  </div>
                </div>
                <div class="qr-telemetry-badge font-mono">
                  <span id="qr-session-sync-text">MOBILE PAIRING ACTIVE</span>
                </div>
              </div>

              <!-- SISI KANAN: Deskripsi & Tombol Verifikasi dengan cara lain -->
              <div class="auth-qr-right-pane">
                <div class="qr-instruction-block">
                  <h4 class="qr-section-title font-display">Pindai QR via Mobile</h4>
                  <p class="auth-body-text">
                    Pindai kode QR di sebelah kiri menggunakan kamera ponsel untuk membuka portal verifikasi, memasukkan password root, atau unggah gambar QR.
                  </p>
                  <p class="auth-body-text auth-body-subtext">
                    Sistem mendeteksi autentikasi perangkat secara instan. Setelah disetujui di ponsel, sesi terminal root aktif otomatis.
                  </p>
                  <div class="qr-host-bar font-mono" id="qr-host-bar">
                    <span class="qr-host-label">TARGET:</span>
                    <span class="qr-host-val" id="qr-host-display-val">10.57.119.96:3000</span>
                    <button type="button" class="qr-host-btn font-mono" id="btn-edit-qr-host" title="Atur IP Wi-Fi agar ponsel bisa terhubung">[ Ubah IP ]</button>
                  </div>
                </div>

                <div class="auth-qr-action-bottom">
                  <button type="button" class="auth-btn-dark font-mono" id="btn-qr-to-options">
                    Verifikasi dengan cara lain
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ==============================================================
               VIEW 2: VERIFICATION OPTIONS MENU (GAMBAR 2 - SELECTION HUB)
               ============================================================== -->
          <div id="auth-view-options" class="auth-sub-view">
            <div class="auth-header" style="margin-bottom: 1.25rem;">
              <div class="auth-title-cluster">
                <span class="auth-tagline font-mono">
                  <span class="auth-status-dot"></span>
                  SECURITY GATEWAY // ROOT ACCESS
                </span>
                <h3 class="auth-heading font-display">Pilih Metode Verifikasi</h3>
              </div>
              <div class="auth-header-actions">
                <button type="button" class="auth-back-btn font-mono" id="btn-options-back" title="Kembali ke QR Code">
                  [ &lt; ] KEMBALI
                </button>
                <button type="button" class="auth-close-btn font-mono" id="auth-close-btn-options" title="Tutup [Esc]">
                  [ESC] X
                </button>
              </div>
            </div>

            <div class="auth-options-container">
              <!-- OPTION 01: OTP EMAIL -->
              <div class="auth-option-card" id="opt-card-otp" data-cursor-target tabindex="0" role="button">
                <div class="auth-option-card-top font-mono">
                  <span>OPTION // 01</span>
                  <span>LVL // ROOT</span>
                </div>
                <div class="auth-option-tagline font-mono">
                  SECURITY GATEWAY // ROOT ACCESS
                </div>
                <h4 class="auth-option-title font-display">
                  Verifikasi lewat Code OTP Email
                </h4>
                <p class="auth-option-desc">
                  Pindai kode QR di sebelah kiri menggunakan kamera ponsel untuk membuka portal verifikasi, memasukkan password root, atau unggah gambar QR.
                </p>
              </div>

              <!-- OPTION 02: QR CODE MOBILE -->
              <div class="auth-option-card" id="opt-card-qr" data-cursor-target tabindex="0" role="button">
                <div class="auth-option-card-top font-mono">
                  <span>OPTION // 02</span>
                  <span>LVL // ROOT</span>
                </div>
                <div class="auth-option-tagline font-mono">
                  SECURITY GATEWAY // ROOT ACCESS
                </div>
                <h4 class="auth-option-title font-display">
                  Verifikasi lewat QR - Code Mobile
                </h4>
                <p class="auth-option-desc">
                  Pindai kode QR di sebelah kiri menggunakan kamera ponsel untuk membuka portal verifikasi, memasukkan password root, atau unggah gambar QR.
                </p>
              </div>
            </div>
          </div>

          <!-- ==============================================================
               VIEW 3: OTP VERIFICATION VIEW (GAMBAR 3)
               ============================================================== -->
          <div id="auth-view-otp" class="auth-sub-view">
            <div class="auth-header">
              <div class="auth-title-cluster">
                <span class="auth-tagline font-mono">
                  <span class="auth-status-dot"></span>
                  SECURITY GATEWAY // ROOT ACCESS
                </span>
                <h3 class="auth-heading font-display">Verifikasi Akses Admin</h3>
              </div>
              <button type="button" class="auth-close-btn font-mono" id="auth-close-btn-otp" title="Tutup [Esc]">
                [ESC] X
              </button>
            </div>

            <p class="auth-body-text" style="margin-bottom: 0.85rem;">
              Sistem mendeteksi permintaan akses Command Prompt tingkat root. Masukkan 6-digit kode verifikasi yang dikirimkan ke:
              <br>
              <span class="auth-target-email font-mono">${this.sec.adminEmail}</span>
            </p>

            <form id="auth-otp-form" onsubmit="return false;">
              <div class="auth-otp-row">
                <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input font-mono" data-index="0" autocomplete="off" />
                <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input font-mono" data-index="1" autocomplete="off" />
                <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input font-mono" data-index="2" autocomplete="off" />
                <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input font-mono" data-index="3" autocomplete="off" />
                <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input font-mono" data-index="4" autocomplete="off" />
                <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input font-mono" data-index="5" autocomplete="off" />
              </div>

              <div class="auth-meta-row font-mono">
                <div class="auth-timer font-mono">
                  <span>Kedaluwarsa:</span>
                  <span id="auth-countdown-val" class="auth-timer-val">05:00</span>
                </div>
                <button type="button" id="auth-resend-btn" class="auth-resend-btn font-mono">
                  Kirim ulang kode
                </button>
              </div>

              <div class="auth-otp-actions-row">
                <button type="button" class="auth-btn-dark font-mono" id="btn-otp-to-options">
                  Verifikasi dengan cara lain
                </button>
                <button type="button" id="auth-verify-btn" class="auth-btn-primary font-mono" disabled>
                  VERIFIKASI &amp; BUKA TERMINAL
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    this.backdropEl = backdrop;
    this.inputs = Array.from(backdrop.querySelectorAll('.otp-digit-input'));
  }

  bindEvents() {
    // Close buttons & backdrop click
    const closeBtns = [
      document.getElementById('auth-close-btn-qr'),
      document.getElementById('auth-close-btn-options'),
      document.getElementById('auth-close-btn-otp')
    ];
    closeBtns.forEach(btn => {
      if (btn) btn.addEventListener('click', () => this.close());
    });

    this.backdropEl.addEventListener('click', (e) => {
      if (e.target === this.backdropEl) this.close();
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // --- NAVIGATION EVENTS BETWEEN THE THREE VIEWS ---
    const btnQrToOptions = document.getElementById('btn-qr-to-options');
    if (btnQrToOptions) {
      btnQrToOptions.addEventListener('click', () => this.switchView('options'));
    }

    const btnOtpToOptions = document.getElementById('btn-otp-to-options');
    if (btnOtpToOptions) {
      btnOtpToOptions.addEventListener('click', () => this.switchView('options'));
    }

    const btnOptionsBack = document.getElementById('btn-options-back');
    if (btnOptionsBack) {
      btnOptionsBack.addEventListener('click', () => this.switchView('qr'));
    }

    const optCardOtp = document.getElementById('opt-card-otp');
    if (optCardOtp) {
      optCardOtp.addEventListener('click', () => this.switchView('otp'));
      optCardOtp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.switchView('otp');
        }
      });
    }

    const optCardQr = document.getElementById('opt-card-qr');
    if (optCardQr) {
      optCardQr.addEventListener('click', () => this.switchView('qr'));
      optCardQr.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.switchView('qr');
        }
      });
    }

    // Host configuration trigger for LAN / Wi-Fi scanning
    const editHostBtn = document.getElementById('btn-edit-qr-host');
    if (editHostBtn) {
      editHostBtn.addEventListener('click', () => {
        let currentHost = '10.57.119.96:3000';
        try {
          currentHost = new URL(this.getVerificationPortalUrl()).host;
        } catch (_) {}
        const entered = prompt(
          'Masukkan IP Komputer & Port di jaringan Wi-Fi agar ponsel bisa membuka halaman verifikasi (contoh: 10.57.119.96:3000):',
          currentHost
        );
        if (entered && entered.trim()) {
          const clean = entered.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
          localStorage.setItem('hra_admin_network_host', clean);
          this.renderDefaultQrCode();
        }
      });
    }

    // --- OTP DIGITS NAVIGATION ---
    this.inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = val ? val[val.length - 1] : '';

        if (e.target.value && index < this.inputs.length - 1) {
          this.inputs[index + 1].focus();
        }
        this.checkInputsFilled();
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
          this.inputs[index - 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
          this.inputs[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < this.inputs.length - 1) {
          this.inputs[index + 1].focus();
        } else if (e.key === 'Enter') {
          this.attemptVerify();
        }
      });

      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasted.replace(/[^0-9]/g, '').slice(0, 6);
        if (digits) {
          digits.split('').forEach((d, idx) => {
            if (this.inputs[idx]) this.inputs[idx].value = d;
          });
          const nextIdx = Math.min(digits.length, this.inputs.length - 1);
          this.inputs[nextIdx].focus();
          this.checkInputsFilled();
          if (digits.length === 6) {
            setTimeout(() => this.attemptVerify(), 150);
          }
        }
      });
    });

    // Verify button (OTP)
    const verifyBtn = document.getElementById('auth-verify-btn');
    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => this.attemptVerify());
    }

    // Resend button (OTP)
    const resendBtn = document.getElementById('auth-resend-btn');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => this.resendOtp());
    }
  }

  /* ==========================================================================
     VIEW SWITCHING (GAMBAR 1 -> GAMBAR 2 -> GAMBAR 3)
     ========================================================================== */
  switchView(viewName) {
    this.currentView = viewName;
    this.activeTab = viewName; // Backwards compatibility alias

    const viewQr = document.getElementById('auth-view-qr');
    const viewOptions = document.getElementById('auth-view-options');
    const viewOtp = document.getElementById('auth-view-otp');
    const chassisMid = document.getElementById('auth-chassis-mid');

    if (viewQr) viewQr.classList.remove('active');
    if (viewOptions) viewOptions.classList.remove('active');
    if (viewOtp) viewOtp.classList.remove('active');

    if (viewName === 'qr') {
      if (viewQr) viewQr.classList.add('active');
      if (chassisMid) chassisMid.textContent = 'SYS // DUAL_FACTOR';
      this.renderDefaultQrCode();
    } else if (viewName === 'options') {
      if (viewOptions) viewOptions.classList.add('active');
      if (chassisMid) chassisMid.textContent = 'SYS // SELECTOR';
    } else if (viewName === 'otp') {
      if (viewOtp) viewOtp.classList.add('active');
      if (chassisMid) chassisMid.textContent = 'SYS // EMAIL_OTP';
      setTimeout(() => {
        if (this.inputs[0]?.focus) this.inputs[0].focus();
      }, 100);
    }
  }

  // Alias for backwards compatibility with tests / callers
  switchTab(tab) {
    this.switchView(tab);
  }

  getVerificationPortalUrl() {
    let origin = window.location.origin || '';
    const pathname = window.location.pathname || '';
    const baseDir = pathname.substring(0, pathname.lastIndexOf('/') + 1);

    const savedHost = localStorage.getItem('hra_admin_network_host');
    if (savedHost) {
      const proto = (window.location.protocol && window.location.protocol.startsWith('http')) ? window.location.protocol : 'http:';
      origin = `${proto}//${savedHost}`;
    } else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || !origin.startsWith('http')) {
      const cachedIp = localStorage.getItem('hra_detected_lan_ip') || '10.57.119.96';
      const port = window.location.port ? `:${window.location.port}` : ':3000';
      origin = `http://${cachedIp}${port}`;
    }

    const portalPath = `${origin}${baseDir}admin-verify.html`;
    return `${portalPath}?session=${encodeURIComponent(this.activeQrSessionId || '')}&token=${encodeURIComponent(this.activeQrToken || '')}`;
  }

  renderDefaultQrCode() {
    this.activeQrSessionId = 'hra_sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
    this.activeQrToken = this.sec.generateQrChallengeToken();
    this.detectedQrToken = this.activeQrToken;

    const portalUrl = this.getVerificationPortalUrl();
    const qrSvg = this.qrScanner.generateQrSvg(portalUrl, 200);

    const slot = document.getElementById('qr-live-svg-slot');
    if (slot) {
      slot.innerHTML = qrSvg;
    }

    const hostVal = document.getElementById('qr-host-display-val');
    if (hostVal) {
      try {
        const parsed = new URL(portalUrl);
        hostVal.textContent = parsed.host;
      } catch (_) {
        hostVal.textContent = '10.57.119.96:3000';
      }
    }

    const syncText = document.getElementById('qr-session-sync-text');
    if (syncText) {
      syncText.textContent = 'MOBILE PAIRING ACTIVE';
    }

    this.startMobileApprovalListener();
  }

  startMobileApprovalListener() {
    this.stopMobileApprovalListener();

    // 1. BroadcastChannel (for same origin / tabs)
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.authChannel = new BroadcastChannel('hra_auth_channel');
        this.authChannel.onmessage = (e) => {
          if (e.data && (e.data.type === 'ADMIN_AUTH_APPROVED' || e.data.type === 'AUTH_APPROVED')) {
            if (!this.activeQrSessionId || e.data.sessionId === this.activeQrSessionId) {
              this.handleMobileApprovalSuccess(e.data);
            }
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }
    }

    // 2. LocalStorage Event (cross-window on same origin)
    this.storageListener = (e) => {
      if (e.key === 'hra_sec_mobile_auth_approved' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          if (data && (!this.activeQrSessionId || data.sessionId === this.activeQrSessionId)) {
            this.handleMobileApprovalSuccess(data);
          }
        } catch (err) {
          console.error('Storage sync parse error:', err);
        }
      }
    };
    window.addEventListener('storage', this.storageListener);

    // 3. Global Cloud Relay via ntfy.sh Server-Sent Events (instant cross-device sync)
    if (this.activeQrSessionId && typeof EventSource !== 'undefined') {
      try {
        const syncTopic = ('hra_auth_' + String(this.activeQrSessionId).replace(/[^a-zA-Z0-9_-]/g, '_')).slice(0, 64);
        this.cloudEventSource = new EventSource(`https://ntfy.sh/${syncTopic}/sse`);
        this.cloudEventSource.onmessage = (event) => {
          try {
            const raw = JSON.parse(event.data);
            if (raw && raw.event === 'message' && raw.message) {
              const payload = JSON.parse(raw.message);
              if (payload && (payload.type === 'AUTH_APPROVED' || payload.type === 'ADMIN_AUTH_APPROVED')) {
                if (!this.activeQrSessionId || payload.sessionId === this.activeQrSessionId) {
                  this.handleMobileApprovalSuccess(payload);
                }
              }
            }
          } catch (_) {}
        };
      } catch (err) {
        console.warn('EventSource sync warning:', err);
      }
    }

    // 4. Polling Fallback (tri-mode: local storage + local server + cloud relay poll)
    let pollCount = 0;
    this.pollApprovalInterval = setInterval(async () => {
      pollCount++;

      // A. Check localStorage
      const raw = localStorage.getItem('hra_sec_mobile_auth_approved');
      if (raw) {
        try {
          const data = JSON.parse(raw);
          if (data && (!this.activeQrSessionId || data.sessionId === this.activeQrSessionId)) {
            const ts = data.timestamp || data.approvedAt || 0;
            if (Date.now() - ts < 60000) {
              this.handleMobileApprovalSuccess(data);
              return;
            }
          }
        } catch (err) {}
      }

      // B. Check Local Server API (if hosted on HTTP/HTTPS)
      if (window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
        try {
          const res = await fetch(`/api/auth/status?session=${encodeURIComponent(this.activeQrSessionId)}`);
          if (res.ok) {
            const status = await res.json();
            if (status && status.approved) {
              this.handleMobileApprovalSuccess({
                type: 'AUTH_APPROVED',
                sessionId: this.activeQrSessionId
              });
              return;
            }
          }
        } catch (_) {}
      }

      // C. Check Cloud Relay via ntfy.sh JSON poll (every 2nd tick ~ 1.6s)
      if (this.activeQrSessionId && pollCount % 2 === 0) {
        try {
          const syncTopic = ('hra_auth_' + String(this.activeQrSessionId).replace(/[^a-zA-Z0-9_-]/g, '_')).slice(0, 64);
          const cloudRes = await fetch(`https://ntfy.sh/${syncTopic}/json?poll=1&since=all`);
          if (cloudRes.ok) {
            const text = await cloudRes.text();
            const lines = text.trim().split('\n');
            for (const line of lines) {
              if (!line) continue;
              try {
                const msg = JSON.parse(line);
                if (msg && msg.event === 'message' && msg.message) {
                  const payload = JSON.parse(msg.message);
                  if (payload && (payload.type === 'AUTH_APPROVED' || payload.type === 'ADMIN_AUTH_APPROVED')) {
                    if (!this.activeQrSessionId || payload.sessionId === this.activeQrSessionId) {
                      this.handleMobileApprovalSuccess(payload);
                      return;
                    }
                  }
                }
              } catch (_) {}
            }
          }
        } catch (_) {}
      }
    }, 800);
  }

  stopMobileApprovalListener() {
    if (this.cloudEventSource) {
      try {
        this.cloudEventSource.close();
      } catch (err) {}
      this.cloudEventSource = null;
    }
    if (this.authChannel) {
      try {
        this.authChannel.close();
      } catch (err) {}
      this.authChannel = null;
    }
    if (this.storageListener) {
      window.removeEventListener('storage', this.storageListener);
      this.storageListener = null;
    }
    if (this.pollApprovalInterval) {
      clearInterval(this.pollApprovalInterval);
      this.pollApprovalInterval = null;
    }
  }

  async handleMobileApprovalSuccess(payload) {
    this.stopMobileApprovalListener();

    const syncText = document.getElementById('qr-session-sync-text');
    if (syncText) {
      syncText.textContent = 'MOBILE APPROVED // ROOT';
    }

    this.sec.playSecurityAlertTone();
    this.sec.resetAttempts();
    await this.sec.createSession();

    try {
      localStorage.removeItem('hra_sec_mobile_auth_approved');
    } catch (err) {}

    setTimeout(() => {
      this.close();
      if (typeof this.onSuccess === 'function') {
        this.onSuccess();
      }
    }, 350);
  }

  async handleQrFileUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    this.updateQrStatus('Menganalisis berkas QR...', 'normal');
    try {
      const token = await this.qrScanner.scanImageFile(file);
      if (token) {
        this.detectedQrToken = token;
        this.sec.playSecurityAlertTone();
        this.updateQrStatus('QR code valid terdeteksi. Masukkan password root.', 'success');
        const pwdInput = document.getElementById('auth-qr-password-input');
        if (pwdInput && !pwdInput.value) {
          pwdInput.focus();
        }
      } else {
        this.updateQrStatus('Pola QR tidak ditemukan pada berkas.', 'error');
      }
    } catch (err) {
      this.updateQrStatus('Gagal membaca gambar: ' + (err.message || 'Format tidak didukung'), 'error');
    }
    e.target.value = '';
  }

  togglePasswordVisibility() {
    const pwdInput = document.getElementById('auth-qr-password-input');
    const btn = document.getElementById('auth-toggle-pwd-btn');
    if (!pwdInput || !btn) return;

    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      btn.textContent = 'SEMBUNYIKAN';
    } else {
      pwdInput.type = 'password';
      btn.textContent = 'LIHAT';
    }
  }

  updateQrStatus(msg, state = 'normal') {
    const statusText = document.getElementById('qr-status-text');
    if (statusText) {
      statusText.textContent = msg;
      if (state === 'success') {
        statusText.style.color = '#059669';
      } else if (state === 'error') {
        statusText.style.color = '#EF4444';
      } else {
        statusText.style.color = 'var(--text-secondary, #40443E)';
      }
    }
  }

  async attemptVerifyQr() {
    const lockout = this.sec.checkLockoutStatus();
    if (lockout.isLocked) {
      this.showLockoutMode(lockout.remainingSec);
      return;
    }

    const pwdInput = document.getElementById('auth-qr-password-input');
    const pwd = pwdInput ? pwdInput.value.trim() : '';

    if (!pwd) {
      if (pwdInput) pwdInput.classList.add('is-error');
      this.updateQrStatus('Wajib memasukkan Password Root Admin.', 'error');
      this.sec.playSecurityAlertTone();
      return;
    }

    // Verify root password
    const isPasswordValid = await this.sec.verifyRootPassword(pwd);

    if (isPasswordValid) {
      // SUCCESS!
      this.stopMobileApprovalListener();
      this.sec.resetAttempts();
      await this.sec.createSession();
      this.close();
      if (typeof this.onSuccess === 'function') {
        this.onSuccess();
      }
    } else {
      // FAILED
      const result = this.sec.recordFailedAttempt();
      if (pwdInput) pwdInput.classList.add('is-error');
      this.sec.playSecurityAlertTone();

      if (result.isLocked) {
        this.showLockoutMode(15 * 60);
      } else {
        this.updateQrStatus(`Password root salah. Sisa kesempatan: ${result.remainingAttempts}/3.`, 'error');
      }
    }
  }

  stopCamera() {
    this.qrScanner.stopCamera();
    this.isCameraActive = false;
  }

  isOpen() {
    return this.backdropEl && this.backdropEl.classList.contains('is-active');
  }

  async open() {
    if (!this.backdropEl) return;

    // Check if security lockout is active
    const lockout = this.sec.checkLockoutStatus();
    if (lockout.isLocked) {
      this.showLockoutMode(lockout.remainingSec);
      this.backdropEl.classList.add('is-active');
      return;
    }

    // Request notification permission proactively
    this.sec.requestNotificationPermission();

    // Show normal verification mode
    this.hideLockoutMode();
    this.backdropEl.classList.add('is-active');
    this.backdropEl.setAttribute('aria-hidden', 'false');

    // Reset inputs
    this.clearInputs();

    // Generate & Dispatch OTP (in background for tab 2)
    this.generateAndDispatchOtp();

    // Default view: QR Code on left pane (Gambar 1) & start mobile listener
    this.switchView('qr');
  }

  close() {
    if (!this.backdropEl) return;
    this.stopMobileApprovalListener();
    this.stopCamera();
    this.backdropEl.classList.remove('is-active');
    this.backdropEl.setAttribute('aria-hidden', 'true');
    this.stopCountdown();
    this.clearInputs();
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
      if (input.classList?.remove) {
        input.classList.remove('is-error');
      }
    });
    const verifyBtn = document.getElementById('auth-verify-btn');
    if (verifyBtn) verifyBtn.disabled = true;

    // Reset QR inputs & status
    const pwdInput = document.getElementById('auth-qr-password-input');
    if (pwdInput) {
      pwdInput.value = '';
      if (pwdInput.classList?.remove) pwdInput.classList.remove('is-error');
    }
    this.detectedQrToken = null;
    this.updateQrStatus('Menunggu pemindaian QR code...');
  }

  checkInputsFilled() {
    const fullCode = this.getEnteredCode();
    const verifyBtn = document.getElementById('auth-verify-btn');
    if (verifyBtn) {
      verifyBtn.disabled = fullCode.length !== 6;
    }
  }

  getEnteredCode() {
    return this.inputs.map(inp => inp.value.trim()).join('');
  }

  generateAndDispatchOtp() {
    // Generate secure 6-digit random code
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    this.currentOtp = randomCode;
    this.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    // Dispatch logging and notification
    console.warn(
      `%c[SECURITY GATEWAY]%c Kode verifikasi admin terkirim ke %c${this.sec.adminEmail}%c: %c${randomCode}`,
      'background: #B87357; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
      'color: #9CA3AF;',
      'color: #34D399; font-weight: bold;',
      'color: #9CA3AF;',
      'color: #FBBF24; font-weight: bold; font-size: 14px;'
    );

    // Trigger Native Notification if permitted
    this.sec.dispatchNativeNotification(
      'Kode Verifikasi Admin Portofolio',
      `Kode verifikasi login admin: ${randomCode}. Berlaku selama 5 menit. Jangan berikan kode ini kepada siapa pun.`,
      'admin-otp-code'
    );

    // Optional webhook or EmailJS integration if user sets window.ADMIN_EMAIL_CONFIG
    this.dispatchEmailWebhook(randomCode);

    // Start 5-minute countdown
    this.startCountdown();
  }

  dispatchEmailWebhook(code) {
    if (window.ADMIN_EMAIL_CONFIG && window.emailjs) {
      try {
        window.emailjs.send(
          window.ADMIN_EMAIL_CONFIG.serviceId,
          window.ADMIN_EMAIL_CONFIG.templateId,
          {
            to_email: this.sec.adminEmail,
            otp_code: code,
            timestamp: new Date().toLocaleString('id-ID')
          }
        );
      } catch (err) {
        console.error('Email webhook error:', err);
      }
    }
  }

  startCountdown() {
    this.stopCountdown();
    const countdownEl = document.getElementById('auth-countdown-val');

    const updateTimer = () => {
      const remainingMs = this.otpExpiresAt - Date.now();
      if (remainingMs <= 0) {
        if (countdownEl) countdownEl.textContent = 'Kedaluwarsa';
        this.currentOtp = null; // Invalidate
        this.stopCountdown();
        return;
      }
      const totalSec = Math.floor(remainingMs / 1000);
      const min = Math.floor(totalSec / 60).toString().padStart(2, '0');
      const sec = (totalSec % 60).toString().padStart(2, '0');
      if (countdownEl) countdownEl.textContent = `${min}:${sec}`;
    };

    updateTimer();
    this.timerInterval = setInterval(updateTimer, 1000);
  }

  stopCountdown() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resendOtp() {
    const resendBtn = document.getElementById('auth-resend-btn');
    if (Date.now() < this.resendCooldownUntil) return;

    this.resendCooldownUntil = Date.now() + 60 * 1000;
    if (resendBtn) resendBtn.disabled = true;

    this.clearInputs();
    this.generateAndDispatchOtp();

    const updateResend = () => {
      const rem = Math.ceil((this.resendCooldownUntil - Date.now()) / 1000);
      if (rem <= 0) {
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.textContent = 'Kirim ulang kode';
        }
        clearInterval(this.resendInterval);
      } else {
        if (resendBtn) resendBtn.textContent = `Kirim ulang (${rem}s)`;
      }
    };

    updateResend();
    this.resendInterval = setInterval(updateResend, 1000);
  }

  async attemptVerify() {
    const entered = this.getEnteredCode();
    if (entered.length !== 6) return;

    // Check if expired
    if (!this.currentOtp || Date.now() > this.otpExpiresAt) {
      this.showInputError('Kode telah kedaluwarsa. Silakan kirim ulang kode baru.');
      return;
    }

    // Check code match
    if (entered === this.currentOtp) {
      // SUCCESS!
      await this.sec.createSession();
      this.close();
      if (typeof this.onSuccess === 'function') {
        this.onSuccess();
      }
    } else {
      // FAILED
      const result = this.sec.recordFailedAttempt();
      this.inputs.forEach(inp => {
        if (inp.classList?.add) inp.classList.add('is-error');
      });

      if (result.isLocked) {
        this.showLockoutMode(15 * 60);
      } else {
        this.showInputError(`Kode salah. Sisa kesempatan: ${result.remainingAttempts}/3.`);
      }
    }
  }

  showInputError(msg) {
    this.sec.playSecurityAlertTone();
    let errBanner = document.getElementById('auth-error-banner');
    if (!errBanner) {
      errBanner = document.createElement('div');
      errBanner.id = 'auth-error-banner';
      errBanner.style.cssText = 'color: #F87171; font-family: var(--font-mono); font-size: 0.75rem; margin-top: 0.5rem; text-align: center;';
      const form = document.getElementById('auth-otp-form');
      if (form) form.appendChild(errBanner);
    }
    errBanner.textContent = msg;

    setTimeout(() => {
      if (errBanner) errBanner.textContent = '';
      this.inputs.forEach(inp => {
        if (inp.classList?.remove) inp.classList.remove('is-error');
      });
    }, 3200);
  }

  showLockoutMode(remainingSec) {
    const banner = document.getElementById('auth-lockout-banner');
    const content = document.getElementById('auth-normal-content');
    const dot = document.getElementById('auth-status-dot');
    const readout = document.getElementById('lockout-time-readout');

    if (banner) banner.style.display = 'block';
    if (content) content.style.display = 'none';
    if (dot) dot.classList.add('danger');

    const updateLockoutReadout = () => {
      const status = this.sec.checkLockoutStatus();
      if (!status.isLocked) {
        this.hideLockoutMode();
      } else {
        if (readout) readout.textContent = `${status.remainingSec} detik`;
      }
    };

    updateLockoutReadout();
    if (this._lockoutInterval) clearInterval(this._lockoutInterval);
    this._lockoutInterval = setInterval(updateLockoutReadout, 1000);
  }

  hideLockoutMode() {
    const banner = document.getElementById('auth-lockout-banner');
    const content = document.getElementById('auth-normal-content');
    const dot = document.getElementById('auth-status-dot');

    if (banner) banner.style.display = 'none';
    if (content) content.style.display = 'block';
    if (dot) dot.classList.remove('danger');
    if (this._lockoutInterval) clearInterval(this._lockoutInterval);
  }
}


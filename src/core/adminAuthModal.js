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

    // QR-code state
    this.qrScanner = new QrScannerEngine();
    this.activeTab = 'qr'; // Default view: QR-code
    this.detectedQrToken = null;
    this.isCameraActive = false;
    this.activeQrSessionId = null;
    this.activeQrToken = null;
    this.authChannel = null;
    this.storageListener = null;
    this.pollApprovalInterval = null;

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
        <div class="auth-chassis-strip font-mono">
          <span>NODE // 07°00'S 110°25'E</span>
          <span>SYS // DUAL_FACTOR</span>
          <span>LVL // ROOT</span>
        </div>

        <div class="auth-header">
          <div class="auth-title-cluster">
            <span class="auth-tagline">
              <span class="auth-status-dot" id="auth-status-dot"></span>
              SECURITY GATEWAY // ROOT ACCESS
            </span>
            <h3 class="auth-heading font-display">Verifikasi Akses Admin</h3>
          </div>
          <button class="auth-close-btn font-mono" id="auth-close-btn" title="Tutup [Esc]">
            [ESC] X
          </button>
        </div>

        <div id="auth-lockout-banner" style="display: none; background: rgba(239, 68, 68, 0.12); border: 1px solid #EF4444; color: #EF4444; padding: 0.75rem 1rem; border-radius: 4px; margin-bottom: 1.25rem; font-family: var(--font-mono); font-size: 0.75rem;">
          <strong>PERINGATAN KEAMANAN:</strong> Terlalu banyak percobaan salah. Akses dikunci sementara selama <span id="lockout-time-readout">--</span> detik.
        </div>

        <div id="auth-normal-content">
          <!-- Abstract Architectural Segmented Track -->
          <div class="auth-tabs-track font-mono" role="tablist">
            <button type="button" class="auth-tab-btn active" id="auth-tab-qr" data-tab="qr" role="tab" aria-selected="true">
              <span class="tab-index">01</span>
              <span class="tab-label">SCAN QR-CODE</span>
            </button>
            <button type="button" class="auth-tab-btn" id="auth-tab-otp" data-tab="otp" role="tab" aria-selected="false">
              <span class="tab-index">02</span>
              <span class="tab-label">KODE OTP</span>
            </button>
          </div>

          <!-- TAB PANEL 1: SCAN QR-CODE & MOBILE PAIRING (DEFAULT SPLIT LAYOUT) -->
          <div id="auth-tab-panel-qr" class="auth-tab-panel active">
            <div class="auth-qr-split-grid">
              <!-- SISI KIRI: Visual QR-Code Utama (Default Display) -->
              <div class="auth-qr-left-pane">
                <div class="qr-code-frame">
                  <div class="qr-corner-bracket tl"></div>
                  <div class="qr-corner-bracket tr"></div>
                  <div class="qr-corner-bracket bl"></div>
                  <div class="qr-corner-bracket br"></div>
                  <div class="qr-ambient-scan-line"></div>
                  <div id="qr-live-svg-slot" class="qr-svg-holder">
                    <!-- Standard ISO QR SVG rendered here by default -->
                  </div>
                </div>
                <div class="qr-telemetry-badge font-mono">
                  <span class="auth-status-dot"></span>
                  <span id="qr-session-sync-text">MOBILE PAIRING ACTIVE</span>
                </div>
              </div>

              <!-- SISI KANAN: Deskripsi, Instruksi & Aksi -->
              <div class="auth-qr-right-pane">
                <div class="qr-instruction-block">
                  <h4 class="qr-section-title font-display">Pindai QR via Mobile</h4>
                  <p class="auth-body-text">
                    Pindai kode QR di sebelah kiri menggunakan kamera ponsel untuk membuka portal verifikasi, memasukkan password root, atau unggah gambar QR.
                  </p>
                </div>

                <!-- Quick Action Controls -->
                <div class="qr-controls-row">
                  <button type="button" class="qr-sub-btn font-mono" id="btn-upload-qr" title="Unggah berkas gambar QR">[ Unggah QR ]</button>
                  <input type="file" id="qr-file-input" accept="image/*,.svg" style="display: none;" />
                  <button type="button" class="qr-sub-btn font-mono" id="btn-refresh-qr" title="Segarkan QR Token">[ Segarkan ]</button>
                  <button type="button" class="qr-sub-btn font-mono" id="btn-open-direct" title="Buka Halaman Portal Langsung">[ Buka Portal ]</button>
                </div>

                <!-- Desktop Direct Password Input -->
                <div class="auth-password-group">
                  <label for="auth-qr-password-input" class="auth-password-label">KREDENSIAL ROOT ADMIN (DESKTOP):</label>
                  <div class="auth-password-row">
                    <input type="password" id="auth-qr-password-input" class="auth-password-input font-mono" placeholder="Password root..." autocomplete="current-password" />
                    <button type="button" id="auth-toggle-pwd-btn" class="auth-toggle-pwd-btn font-mono">LIHAT</button>
                  </div>
                  <div class="auth-password-hint font-mono">
                    <span>Default: <code>RootUser=0</code> (Dapat diubah via: <code>passwd</code>)</span>
                  </div>
                  <div id="qr-status-text" class="auth-status-msg font-mono" style="min-height: 1.1rem; margin-top: 0.35rem; font-size: 0.68rem; color: #EF4444;"></div>
                </div>

                <!-- Action Button -->
                <div class="auth-action-row" style="margin-top: 0.25rem;">
                  <button type="button" id="auth-qr-verify-btn" class="auth-btn-primary font-mono">
                    VERIFIKASI &amp; BUKA TERMINAL
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB PANEL 2: KODE OTP -->
          <div id="auth-tab-panel-otp" class="auth-tab-panel">
            <p class="auth-body-text">
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

              <div class="auth-action-row">
                <button type="button" id="auth-verify-btn" class="auth-btn-primary font-mono" disabled>
                  VERIFIKASI &amp; BUKA TERMINAL
                </button>
              </div>
            </form>
          </div>

          <div class="auth-security-notice font-mono">
            <strong>PERINGATAN SISTEM:</strong> Setiap akses dan percobaan login diverifikasi dengan sidik jari perangkat dan dicatat secara permanen. Notifikasi keamanan sistem OS akan dipicu saat sesi aktif.
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    this.backdropEl = backdrop;
    this.inputs = Array.from(backdrop.querySelectorAll('.otp-digit-input'));
  }

  bindEvents() {
    // Close button & backdrop click
    const closeBtn = document.getElementById('auth-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    this.backdropEl.addEventListener('click', (e) => {
      if (e.target === this.backdropEl) this.close();
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Handle Digit Inputs Navigation
    this.inputs.forEach((input, index) => {
      // Input event: keep only numbers and auto-advance
      input.addEventListener('input', (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = val ? val[val.length - 1] : '';

        if (e.target.value && index < this.inputs.length - 1) {
          this.inputs[index + 1].focus();
        }
        this.checkInputsFilled();
      });

      // Keydown: backspace navigation
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

      // Paste: split 6 digits across boxes
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

    // --- TAB SWITCHER EVENTS ---
    const tabOtpBtn = document.getElementById('auth-tab-otp');
    if (tabOtpBtn) {
      tabOtpBtn.addEventListener('click', () => this.switchTab('otp'));
    }

    const tabQrBtn = document.getElementById('auth-tab-qr');
    if (tabQrBtn) {
      tabQrBtn.addEventListener('click', () => this.switchTab('qr'));
    }

    // --- QR-CODE WORKFLOW & CONTROLS ---
    const uploadQrBtn = document.getElementById('btn-upload-qr');
    const qrFileInput = document.getElementById('qr-file-input');
    if (uploadQrBtn && qrFileInput) {
      uploadQrBtn.addEventListener('click', () => qrFileInput.click());
      qrFileInput.addEventListener('change', (e) => this.handleQrFileUpload(e));
    }

    const refreshQrBtn = document.getElementById('btn-refresh-qr');
    if (refreshQrBtn) {
      refreshQrBtn.addEventListener('click', () => this.renderDefaultQrCode());
    }

    const openDirectBtn = document.getElementById('btn-open-direct');
    if (openDirectBtn) {
      openDirectBtn.addEventListener('click', () => {
        const portalUrl = this.getVerificationPortalUrl();
        window.open(portalUrl, '_blank');
      });
    }

    const togglePwdBtn = document.getElementById('auth-toggle-pwd-btn');
    if (togglePwdBtn) {
      togglePwdBtn.addEventListener('click', () => this.togglePasswordVisibility());
    }

    const qrPwdInput = document.getElementById('auth-qr-password-input');
    if (qrPwdInput) {
      qrPwdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.attemptVerifyQr();
        }
      });
      qrPwdInput.addEventListener('input', () => {
        if (qrPwdInput.classList.contains('is-error')) {
          qrPwdInput.classList.remove('is-error');
        }
        this.updateQrStatus('');
      });
    }

    const qrVerifyBtn = document.getElementById('auth-qr-verify-btn');
    if (qrVerifyBtn) {
      qrVerifyBtn.addEventListener('click', () => this.attemptVerifyQr());
    }
  }

  /* ==========================================================================
     TAB SWITCHING & QR WORKFLOWS
     ========================================================================== */
  switchTab(tab) {
    this.activeTab = tab;
    const tabOtpBtn = document.getElementById('auth-tab-otp');
    const tabQrBtn = document.getElementById('auth-tab-qr');
    const panelOtp = document.getElementById('auth-tab-panel-otp');
    const panelQr = document.getElementById('auth-tab-panel-qr');

    if (tab === 'otp') {
      if (tabOtpBtn) {
        tabOtpBtn.classList.add('active');
        tabOtpBtn.setAttribute('aria-selected', 'true');
      }
      if (tabQrBtn) {
        tabQrBtn.classList.remove('active');
        tabQrBtn.setAttribute('aria-selected', 'false');
      }
      if (panelOtp) panelOtp.classList.add('active');
      if (panelQr) panelQr.classList.remove('active');
      this.stopCamera();
      setTimeout(() => {
        if (this.inputs[0]?.focus) this.inputs[0].focus();
      }, 80);
    } else {
      if (tabQrBtn) {
        tabQrBtn.classList.add('active');
        tabQrBtn.setAttribute('aria-selected', 'true');
      }
      if (tabOtpBtn) {
        tabOtpBtn.classList.remove('active');
        tabOtpBtn.setAttribute('aria-selected', 'false');
      }
      if (panelQr) panelQr.classList.add('active');
      if (panelOtp) panelOtp.classList.remove('active');
      if (!this.activeQrSessionId) {
        this.renderDefaultQrCode();
      }
      const pwdInput = document.getElementById('auth-qr-password-input');
      setTimeout(() => {
        if (pwdInput) pwdInput.focus();
      }, 80);
    }
  }

  getVerificationPortalUrl() {
    const origin = window.location.origin || '';
    const pathname = window.location.pathname || '';
    const baseDir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    const portalPath = `${origin}${baseDir}admin-verify.html`;
    return `${portalPath}?session=${encodeURIComponent(this.activeQrSessionId || '')}&token=${encodeURIComponent(this.activeQrToken || '')}`;
  }

  renderDefaultQrCode() {
    this.activeQrSessionId = this.sec.generateQrChallengeToken();
    this.activeQrToken = this.sec.generateQrChallengeToken();
    this.detectedQrToken = this.activeQrToken;

    const portalUrl = this.getVerificationPortalUrl();
    const qrSvg = this.qrScanner.generateQrSvg(portalUrl, 168);

    const slot = document.getElementById('qr-live-svg-slot');
    if (slot) {
      slot.innerHTML = qrSvg;
    }

    const syncText = document.getElementById('qr-session-sync-text');
    if (syncText) {
      syncText.textContent = 'MOBILE PAIRING ACTIVE';
    }

    this.startMobileApprovalListener();
  }

  startMobileApprovalListener() {
    this.stopMobileApprovalListener();

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.authChannel = new BroadcastChannel('hra_auth_channel');
        this.authChannel.onmessage = (e) => {
          if (e.data && e.data.type === 'ADMIN_AUTH_APPROVED') {
            if (!this.activeQrSessionId || e.data.sessionId === this.activeQrSessionId) {
              this.handleMobileApprovalSuccess(e.data);
            }
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }
    }

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

    this.pollApprovalInterval = setInterval(() => {
      const raw = localStorage.getItem('hra_sec_mobile_auth_approved');
      if (raw) {
        try {
          const data = JSON.parse(raw);
          if (data && (!this.activeQrSessionId || data.sessionId === this.activeQrSessionId)) {
            if (Date.now() - (data.timestamp || 0) < 60000) {
              this.handleMobileApprovalSuccess(data);
            }
          }
        } catch (err) {}
      }
    }, 800);
  }

  stopMobileApprovalListener() {
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

    // Default view: QR Code on left pane & start mobile listener
    this.switchTab('qr');
    this.renderDefaultQrCode();

    // Focus password input
    setTimeout(() => {
      const pwdInput = document.getElementById('auth-qr-password-input');
      if (pwdInput) pwdInput.focus();
    }, 120);
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


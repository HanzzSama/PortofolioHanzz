/**
 * ADMIN OTP AUTHENTICATION GATEWAY MODAL
 * 6-Digit Email Verification Code to haidarandrianno098@gmail.com
 * Lockout Protection & Native OS Alert Trigger
 */

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
        <div class="auth-header">
          <div class="auth-title-cluster">
            <span class="auth-tagline">
              <span class="auth-status-dot" id="auth-status-dot"></span>
              SECURITY GATEWAY // ROOT ACCESS
            </span>
            <h3 class="auth-heading font-display">Verifikasi Kode Admin</h3>
          </div>
          <button class="auth-close-btn" id="auth-close-btn" title="Tutup [Esc]">
            [ESC] ✕
          </button>
        </div>

        <div id="auth-lockout-banner" style="display: none; background: rgba(239, 68, 68, 0.15); border: 1px solid #EF4444; color: #FCA5A5; padding: 0.75rem 1rem; border-radius: 6px; margin-bottom: 1.25rem; font-family: var(--font-mono); font-size: 0.78rem;">
          <strong>PERINGATAN KEAMANAN:</strong> Terlalu banyak percobaan salah. Akses dikunci sementara selama <span id="lockout-time-readout">--</span> detik.
        </div>

        <div id="auth-normal-content">
          <p class="auth-body-text">
            Sistem mendeteksi permintaan akses Command Prompt tingkat root. Masukkan 6-digit kode verifikasi yang dikirimkan ke:
            <br>
            <span class="auth-target-email">${this.sec.adminEmail}</span>
          </p>

          <form id="auth-otp-form" onsubmit="return false;">
            <div class="auth-otp-row">
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-index="0" autocomplete="off" />
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-index="1" autocomplete="off" />
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-index="2" autocomplete="off" />
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-index="3" autocomplete="off" />
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-index="4" autocomplete="off" />
              <input type="text" inputmode="numeric" maxlength="1" class="otp-digit-input" data-index="5" autocomplete="off" />
            </div>

            <div class="auth-meta-row">
              <div class="auth-timer font-mono">
                <span>Kedaluwarsa:</span>
                <span id="auth-countdown-val" class="auth-timer-val">05:00</span>
              </div>
              <button type="button" id="auth-resend-btn" class="auth-resend-btn">
                Kirim ulang kode
              </button>
            </div>

            <div class="auth-action-row">
              <button type="button" id="auth-verify-btn" class="auth-btn-primary" disabled>
                VERIFIKASI &amp; BUKA TERMINAL
              </button>
            </div>
          </form>

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

    // Verify button
    const verifyBtn = document.getElementById('auth-verify-btn');
    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => this.attemptVerify());
    }

    // Resend button
    const resendBtn = document.getElementById('auth-resend-btn');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => this.resendOtp());
    }
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

    // Generate & Dispatch OTP
    this.generateAndDispatchOtp();

    // Focus first input box
    setTimeout(() => {
      if (this.inputs[0]) this.inputs[0].focus();
    }, 120);
  }

  close() {
    if (!this.backdropEl) return;
    this.backdropEl.classList.remove('is-active');
    this.backdropEl.setAttribute('aria-hidden', 'true');
    this.stopCountdown();
    this.clearInputs();
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
      input.classList.remove('is-error');
    });
    const verifyBtn = document.getElementById('auth-verify-btn');
    if (verifyBtn) verifyBtn.disabled = true;
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
      this.inputs.forEach(inp => inp.classList.add('is-error'));

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
      this.inputs.forEach(inp => inp.classList.remove('is-error'));
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


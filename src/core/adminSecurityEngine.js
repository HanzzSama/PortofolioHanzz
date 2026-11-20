/**
 * ADMIN SECURITY ENGINE & DEVICE NOTIFICATION GUARD
 * Identity & Hardware Fingerprinting, Lockout Protection, and Native OS Alerts
 * Target Administrator: haidarandrianno098@gmail.com
 */

export class AdminSecurityEngine {
  constructor() {
    this.storageKeyPrefix = 'hra_sec_';
    this.maxAttempts = 3;
    this.lockoutDurationMs = 15 * 60 * 1000; // 15 minutes lockout
    this.sessionDurationMs = 30 * 60 * 1000; // 30 minutes session
    this.adminEmail = 'haidarandrianno098@gmail.com';
    this.audioCtx = null;

    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && typeof window !== 'undefined') {
      try {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      } catch (_) {}
    }
  }

  /* ==========================================================================
     1. DEVICE FINGERPRINT GENERATOR
     ========================================================================== */
  async getDeviceFingerprint() {
    const nav = typeof navigator !== 'undefined' ? navigator : {};
    const scr = typeof screen !== 'undefined' ? screen : {};
    const glInfo = this.getWebGLRenderer();
    const components = [
      nav.userAgent || 'unknown_agent',
      nav.language || 'id-ID',
      (scr.width || 1920) + 'x' + (scr.height || 1080) + 'x' + (scr.colorDepth || 24),
      nav.hardwareConcurrency || 'unknown_cores',
      nav.deviceMemory || 'unknown_ram',
      (typeof Intl !== 'undefined' && Intl.DateTimeFormat) ? (Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC') : 'UTC',
      glInfo
    ];

    const rawString = components.join('||');
    return this.hashString(rawString);
  }

  getWebGLRenderer() {
    try {
      if (typeof document === 'undefined') return 'headless_node';
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl', { powerPreference: 'high-performance' }) || 
                 canvas.getContext('experimental-webgl', { powerPreference: 'high-performance' });
      if (!gl) return 'no_webgl';
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (!ext) return 'webgl_no_debug_info';
      return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'generic_gpu';
    } catch (_) {
      return 'gl_exception';
    }
  }

  async hashString(str) {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      try {
        const buffer = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (_) {}
    }
    // Fallback simple 32-bit hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return 'fp_' + Math.abs(hash).toString(16);
  }

  /* ==========================================================================
     2. BRUTE-FORCE LOCKOUT & ATTEMPTS
     ========================================================================== */
  checkLockoutStatus() {
    try {
      const lockoutUntil = parseInt(localStorage.getItem(this.storageKeyPrefix + 'lockout_until') || '0', 10);
      const now = Date.now();
      if (lockoutUntil > now) {
        const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
        return { isLocked: true, remainingSec };
      }
    } catch (_) {}
    return { isLocked: false, remainingSec: 0 };
  }

  recordFailedAttempt() {
    try {
      let attempts = parseInt(localStorage.getItem(this.storageKeyPrefix + 'failed_attempts') || '0', 10);
      attempts += 1;
      localStorage.setItem(this.storageKeyPrefix + 'failed_attempts', attempts.toString());

      if (attempts >= this.maxAttempts) {
        const lockoutUntil = Date.now() + this.lockoutDurationMs;
        localStorage.setItem(this.storageKeyPrefix + 'lockout_until', lockoutUntil.toString());
        this.dispatchLockoutAlert();
        return { isLocked: true, remainingAttempts: 0 };
      }
      return { isLocked: false, remainingAttempts: this.maxAttempts - attempts };
    } catch (_) {
      return { isLocked: false, remainingAttempts: 1 };
    }
  }

  resetAttempts() {
    try {
      localStorage.removeItem(this.storageKeyPrefix + 'failed_attempts');
      localStorage.removeItem(this.storageKeyPrefix + 'lockout_until');
    } catch (_) {}
  }

  /* ==========================================================================
     3. SESSION TOKEN MANAGEMENT
     ========================================================================== */
  async createSession() {
    const fingerprint = await this.getDeviceFingerprint();
    const sessionData = {
      createdAt: Date.now(),
      expiresAt: Date.now() + this.sessionDurationMs,
      fingerprint: fingerprint,
      adminEmail: this.adminEmail
    };

    try {
      sessionStorage.setItem(this.storageKeyPrefix + 'session_token', JSON.stringify(sessionData));
    } catch (_) {}

    this.resetAttempts();
    await this.notifyLoginEvent('success', fingerprint);
    return sessionData;
  }

  async isSessionValid() {
    try {
      const raw = sessionStorage.getItem(this.storageKeyPrefix + 'session_token');
      if (!raw) return false;
      const session = JSON.parse(raw);
      if (!session || !session.expiresAt || !session.fingerprint) return false;

      if (Date.now() > session.expiresAt) {
        this.clearSession();
        return false;
      }

      const currentFp = await this.getDeviceFingerprint();
      if (session.fingerprint !== currentFp) {
        // Fingerprint mismatch (device spoofing / transferred token)
        this.clearSession();
        this.notifyLoginEvent('tamper_detected', currentFp);
        return false;
      }

      return true;
    } catch (_) {
      return false;
    }
  }

  clearSession() {
    try {
      sessionStorage.removeItem(this.storageKeyPrefix + 'session_token');
    } catch (_) {}
  }

  getSessionRemainingMinutes() {
    try {
      const raw = sessionStorage.getItem(this.storageKeyPrefix + 'session_token');
      if (!raw) return 0;
      const session = JSON.parse(raw);
      const remaining = session.expiresAt - Date.now();
      return Math.max(0, Math.ceil(remaining / 60000));
    } catch (_) {
      return 0;
    }
  }

  /* ==========================================================================
     4. NATIVE OS NOTIFICATIONS & SOUND CHIMES
     ========================================================================== */
  async requestNotificationPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'granted') return 'granted';
    if (Notification.permission !== 'denied') {
      try {
        return await Notification.requestPermission();
      } catch (_) {
        return 'denied';
      }
    }
    return Notification.permission;
  }

  _escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  showDeviceNotificationHUD(title, body) {
    if (typeof document === 'undefined') return;

    let container = document.getElementById('hra-device-notify-hud');
    if (!container) {
      container = document.createElement('div');
      container.id = 'hra-device-notify-hud';
      container.className = 'hra-device-notify-hud';
      container.setAttribute('role', 'alert');
      container.setAttribute('aria-live', 'assertive');
      document.body.appendChild(container);
    }

    const otpMatch = body.match(/\b\d{6}\b/);
    const otpCode = otpMatch ? otpMatch[0] : null;

    const toast = document.createElement('div');
    toast.className = 'hra-device-toast-item';
    toast.innerHTML = `
      <div class="hra-toast-header font-mono">
        <span class="hra-toast-tag">
          <span class="hra-toast-pulse"></span>
          SECURITY ALERT // DEVICE_PUSH
        </span>
        <button type="button" class="hra-toast-close" title="Tutup">&times;</button>
      </div>
      <div class="hra-toast-title font-display">${this._escapeHtml(title)}</div>
      <div class="hra-toast-body font-mono">${this._escapeHtml(body)}</div>
      ${otpCode ? `
        <div class="hra-toast-actions">
          <button type="button" class="hra-toast-copy-btn font-mono" data-code="${otpCode}">
            Salin Kode OTP [${otpCode}]
          </button>
        </div>
      ` : ''}
    `;

    const closeBtn = toast.querySelector('.hra-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toast.classList.remove('is-active');
        setTimeout(() => toast.remove(), 250);
      });
    }

    const copyBtn = toast.querySelector('.hra-toast-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(otpCode);
          copyBtn.textContent = 'KODE TERSALIN!';
          copyBtn.style.background = '#059669';
          copyBtn.style.color = '#fff';
          setTimeout(() => {
            if (copyBtn) copyBtn.textContent = `Salin Kode OTP [${otpCode}]`;
          }, 2000);
        } catch (_) {}
      });
    }

    container.appendChild(toast);

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => toast.classList.add('is-active'));
    } else {
      toast.classList.add('is-active');
    }

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.remove('is-active');
        setTimeout(() => toast.remove(), 250);
      }
    }, 12000);
  }

  async dispatchNativeNotification(title, body, tag = 'admin-guard') {
    if (typeof window === 'undefined') return;

    // 1. Guaranteed In-App HUD Toast Banner on Device Screen
    this.showDeviceNotificationHUD(title, body);

    // 2. Synthesized Web Audio Security Alert Chime
    this.playSecurityAlertTone();

    // 3. Device Haptic Vibration API
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([200, 100, 200, 100, 400]);
      } catch (_) {}
    }

    // 4. Native Web Push / OS Notification (Service Worker on mobile or window.Notification)
    if ('Notification' in window && Notification.permission === 'granted') {
      let shownViaSW = false;
      if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.ready;
          if (reg && reg.showNotification) {
            await reg.showNotification(title, {
              body: body,
              icon: './src/assets/hanzz-avatar.png',
              badge: './src/assets/hanzz-avatar.png',
              tag: tag,
              requireInteraction: true
            });
            shownViaSW = true;
          }
        } catch (_) {}
      }

      if (!shownViaSW) {
        try {
          new Notification(title, {
            body: body,
            icon: './src/assets/hanzz-avatar.png',
            tag: tag,
            requireInteraction: true
          });
        } catch (_) {}
      }
    }

    // 5. Cloud Push to ntfy.sh (Instant Push to Paired Mobile/Desktop)
    try {
      fetch('https://ntfy.sh/hra_admin_alerts', {
        method: 'POST',
        body: `${title}\n\n${body}`,
        headers: {
          'Title': title,
          'Priority': 'urgent',
          'Tags': 'warning,key'
        }
      }).catch(() => {});
    } catch (_) {}
  }

  playSecurityAlertTone() {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!this.audioCtx) this.audioCtx = new AudioContextClass();
      if (this.audioCtx.state === 'suspended') this.audioCtx.resume();

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.12);
      osc.frequency.setValueAtTime(880, now + 0.24);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (_) {}
  }

  dispatchLockoutAlert() {
    this.dispatchNativeNotification(
      'SECURITY LOCKOUT ACTIVATED',
      'Terdeteksi 3 kali kegagalan kode verifikasi admin. Akses dikunci sementara selama 15 menit.',
      'admin-lockout'
    );
  }

  async notifyLoginEvent(type, fingerprint) {
    const timeString = new Date().toLocaleTimeString('id-ID', { hour12: false }) + ' WIB';
    const deviceDesc = `${navigator.platform || 'Device'} (${navigator.userAgent.slice(0, 45)}...)`;

    if (type === 'success') {
      this.dispatchNativeNotification(
        'SECURITY ALERT: Sesi Admin Portofolio Aktif',
        `Sesi Command Prompt Admin aktif pada ${deviceDesc} [${timeString}]. Sidik jari: ${fingerprint.slice(0, 8)}...`,
        'admin-login-success'
      );
    } else if (type === 'tamper_detected') {
      this.dispatchNativeNotification(
        'SECURITY WARNING: Upaya Akses Tak Dikenal',
        `Terdeteksi manipulasi token sesi admin dari perangkat berbeda pada ${timeString}. Akses dibatalkan.`,
        'admin-tamper'
      );
    }

    // Record incident log in persistent storage
    this.recordSecurityIncident(type, fingerprint, timeString, deviceDesc);
  }

  recordSecurityIncident(type, fingerprint, timeString, deviceDesc) {
    try {
      const logKey = this.storageKeyPrefix + 'security_log';
      const existing = JSON.parse(localStorage.getItem(logKey) || '[]');
      existing.unshift({
        type,
        fingerprint: fingerprint.slice(0, 16),
        time: timeString,
        device: deviceDesc,
        date: new Date().toISOString()
      });
      // Keep last 15 security events
      if (existing.length > 15) existing.pop();
      localStorage.setItem(logKey, JSON.stringify(existing));
    } catch (_) {}
  }

  getSecurityLog() {
    try {
      const logKey = this.storageKeyPrefix + 'security_log';
      return JSON.parse(localStorage.getItem(logKey) || '[]');
    } catch (_) {
      return [];
    }
  }

  /* ==========================================================================
     5. ROOT PASSWORD & QR TOKEN MANAGEMENT
     ========================================================================== */
  getDefaultRootPassword() {
    return 'RootUser=0';
  }

  generateSalt() {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  async verifyRootPassword(enteredPassword) {
    if (!enteredPassword || typeof enteredPassword !== 'string') return false;
    try {
      const storedHash = localStorage.getItem(this.storageKeyPrefix + 'qr_pass_hash');
      const storedSalt = localStorage.getItem(this.storageKeyPrefix + 'qr_pass_salt');

      if (!storedHash || !storedSalt) {
        // Initial state: verify against default root password
        const isMatch = enteredPassword === this.getDefaultRootPassword();
        if (isMatch) {
          // Auto-migrate to hashed format
          const salt = this.generateSalt();
          const hash = await this.hashString(salt + ':' + enteredPassword);
          localStorage.setItem(this.storageKeyPrefix + 'qr_pass_salt', salt);
          localStorage.setItem(this.storageKeyPrefix + 'qr_pass_hash', hash);
        }
        return isMatch;
      }

      const computedHash = await this.hashString(storedSalt + ':' + enteredPassword);
      return computedHash === storedHash;
    } catch (_) {
      return enteredPassword === this.getDefaultRootPassword();
    }
  }

  async updateRootPassword(newPassword, oldPassword = null) {
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 4) {
      throw new Error('Password baru minimal 4 karakter.');
    }

    if (oldPassword !== null) {
      const isValidOld = await this.verifyRootPassword(oldPassword);
      if (!isValidOld) {
        throw new Error('Password lama tidak sesuai.');
      }
    }

    const salt = this.generateSalt();
    const hash = await this.hashString(salt + ':' + newPassword);
    const now = Date.now();

    localStorage.setItem(this.storageKeyPrefix + 'qr_pass_salt', salt);
    localStorage.setItem(this.storageKeyPrefix + 'qr_pass_hash', hash);
    localStorage.setItem(this.storageKeyPrefix + 'qr_pass_updated', now.toString());

    this.recordSecurityIncident(
      'password_change',
      await this.getDeviceFingerprint(),
      new Date().toLocaleTimeString('id-ID', { hour12: false }) + ' WIB',
      'Root admin password successfully updated'
    );

    return { success: true, updatedAt: now };
  }

  async resetRootPassword() {
    const defaultPass = this.getDefaultRootPassword();
    const salt = this.generateSalt();
    const hash = await this.hashString(salt + ':' + defaultPass);

    localStorage.setItem(this.storageKeyPrefix + 'qr_pass_salt', salt);
    localStorage.setItem(this.storageKeyPrefix + 'qr_pass_hash', hash);
    localStorage.removeItem(this.storageKeyPrefix + 'qr_pass_updated');

    this.recordSecurityIncident(
      'password_reset',
      await this.getDeviceFingerprint(),
      new Date().toLocaleTimeString('id-ID', { hour12: false }) + ' WIB',
      'Root admin password reset to default'
    );

    return { success: true, defaultPass };
  }

  getRootPasswordStatus() {
    try {
      const updated = localStorage.getItem(this.storageKeyPrefix + 'qr_pass_updated');
      return {
        isDefault: !Boolean(updated),
        updatedAt: updated ? parseInt(updated, 10) : null
      };
    } catch (_) {
      return { isDefault: true, updatedAt: null };
    }
  }

  generateQrChallengeToken() {
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).slice(2, 10);
    return `HRA-ADMIN-TOKEN:ROOT:${timestamp}:${nonce}`;
  }

  verifyQrToken(token) {
    if (!token || typeof token !== 'string') return false;
    const clean = token.trim();
    // Accept valid format tokens
    if (clean.startsWith('HRA-ADMIN-TOKEN:') || clean.startsWith('HRA-ROOT:') || clean.startsWith('PORTOFOLIO-HANZZ-ADMIN')) {
      return true;
    }
    // Also accept generic root user token
    if (clean.toLowerCase().includes('rootuser') || clean.toLowerCase().includes('hanzz-admin')) {
      return true;
    }
    return false;
  }
}

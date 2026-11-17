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
  }

  /* ==========================================================================
     1. DEVICE FINGERPRINT GENERATOR
     ========================================================================== */
  async getDeviceFingerprint() {
    const glInfo = this.getWebGLRenderer();
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height + 'x' + screen.colorDepth,
      navigator.hardwareConcurrency || 'unknown_cores',
      navigator.deviceMemory || 'unknown_ram',
      Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      glInfo
    ];

    const rawString = components.join('||');
    return this.hashString(rawString);
  }

  getWebGLRenderer() {
    try {
      if (typeof document === 'undefined') return 'headless_node';
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
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

  dispatchNativeNotification(title, body, tag = 'admin-guard') {
    if (typeof window === 'undefined') return;
    // 1. Web Notifications API
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: body,
          icon: './src/assets/hanzz-avatar.png',
          tag: tag,
          requireInteraction: true
        });
      } catch (_) {}
    }

    // 2. Device Haptic Vibration API
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate([200, 100, 200, 100, 400]);
      } catch (_) {}
    }

    // 3. Synthesized Web Audio Security Beep
    this.playSecurityAlertTone();
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
}

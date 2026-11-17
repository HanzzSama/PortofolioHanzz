/**
 * ADMIN STORAGE MANAGER
 * Manages local persistence and retrieval for custom portfolio projects and profile data.
 * Identity: Haidar Rifky Andrianno // HanzzSama 2026
 */

export class AdminStorageManager {
  constructor() {
    this.PROJECTS_KEY = 'hanzz_admin_custom_projects';
    this.PROFILE_KEY = 'hanzz_admin_custom_profile';
  }

  isAvailable() {
    return typeof localStorage !== 'undefined';
  }

  getCustomProjects() {
    if (!this.isAvailable()) return null;
    try {
      const raw = localStorage.getItem(this.PROJECTS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Gagal membaca data proyek kustom dari penyimpanan lokal:', e);
      return null;
    }
  }

  saveCustomProjects(projects) {
    if (!this.isAvailable()) return false;
    try {
      localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
      return true;
    } catch (e) {
      console.error('Gagal menyimpan data proyek kustom ke penyimpanan lokal:', e);
      return false;
    }
  }

  resetProjects() {
    if (!this.isAvailable()) return;
    localStorage.removeItem(this.PROJECTS_KEY);
  }

  getCustomProfile() {
    if (!this.isAvailable()) return null;
    try {
      const raw = localStorage.getItem(this.PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Gagal membaca data profil kustom dari penyimpanan lokal:', e);
      return null;
    }
  }

  saveCustomProfile(profile) {
    if (!this.isAvailable()) return false;
    try {
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
      return true;
    } catch (e) {
      console.error('Gagal menyimpan data profil kustom ke penyimpanan lokal:', e);
      return false;
    }
  }

  resetProfile() {
    if (!this.isAvailable()) return;
    localStorage.removeItem(this.PROFILE_KEY);
  }

  exportBackup() {
    const backup = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      source: 'HanzzSama Portfolio Admin',
      customProjects: this.getCustomProjects(),
      customProfile: this.getCustomProfile()
    };
    return JSON.stringify(backup, null, 2);
  }

  importBackup(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Format JSON cadangan tidak valid');
      }

      if (parsed.customProjects && Array.isArray(parsed.customProjects)) {
        this.saveCustomProjects(parsed.customProjects);
      }

      if (parsed.customProfile && typeof parsed.customProfile === 'object') {
        this.saveCustomProfile(parsed.customProfile);
      }

      return { success: true, message: 'Data cadangan berhasil dipulihkan' };
    } catch (e) {
      return { success: false, message: e.message || 'Gagal memproses data JSON' };
    }
  }

  resetAll() {
    this.resetProjects();
    this.resetProfile();
  }

  getStorageUsage() {
    if (!this.isAvailable()) return { bytes: 0, formatted: '0 KB' };
    let totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const val = localStorage.getItem(key);
      totalBytes += (key ? key.length : 0) + (val ? val.length : 0);
    }
    const kb = (totalBytes / 1024).toFixed(2);
    return { bytes: totalBytes, formatted: `${kb} KB` };
  }
}

export const adminStorage = new AdminStorageManager();

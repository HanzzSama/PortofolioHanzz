/**
 * DEVICE & HARDWARE TELEMETRY ENGINE
 * Avant-garde client-side hardware, silicon architecture & environment detector
 * Zero external dependencies. Uses standard W3C Web APIs & graceful fallbacks.
 */

export class DeviceTelemetryEngine {
  constructor() {
    this.cachedHardware = null;
  }

  /**
   * Clean up WebGL unmasked renderer string for concise aesthetic display
   */
  cleanGPURenderer(raw) {
    if (!raw || typeof raw !== 'string') return 'GENERIC HARDWARE ACCELERATOR';
    
    // Check for ANGLE string e.g. "ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 Laptop GPU (0x...), D3D11)"
    const angleMatch = raw.match(/ANGLE\s*\([^,]+,\s*([^,(]+)/i);
    if (angleMatch && angleMatch[1]) {
      return angleMatch[1].trim();
    }

    // Direct3D or OpenGL suffix cleanup
    let cleaned = raw
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/Direct3D.*/i, '')
      .replace(/vs_\d+_\d+ ps_\d+_\d+/i, '')
      .replace(/OpenGL.*/i, '')
      .trim();

    return cleaned || raw;
  }

  /**
   * Detect GPU Renderer and Vendor via WebGL / WebGPU
   */
  detectGPU() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      let renderer = 'HARDWARE ACCEL';
      let vendor = 'GENERIC VENDOR';
      let apiVersion = 'WEBGL 1.0';

      if (gl) {
        apiVersion = (typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext) 
          ? 'WEBGL 2.0' 
          : 'WEBGL 1.0';

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const rawRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const rawVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          if (rawRenderer) renderer = this.cleanGPURenderer(rawRenderer);
          if (rawVendor) vendor = rawVendor.replace(/Google Inc\..*/i, '').trim() || rawVendor;
        } else {
          renderer = gl.getParameter(gl.RENDERER) || renderer;
          vendor = gl.getParameter(gl.VENDOR) || vendor;
        }
      }

      const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;

      return {
        renderer,
        vendor,
        apiVersion: hasWebGPU ? `${apiVersion} // WEBGPU READY` : `${apiVersion} // ACCELERATED`
      };
    } catch (e) {
      return {
        renderer: 'GPU ACCEL DETECTED',
        vendor: 'SYSTEM',
        apiVersion: 'WEBGL VIRTUALIZED'
      };
    }
  }

  /**
   * Detect CPU logical cores, concurrency, and architecture
   */
  async detectCPU() {
    const cores = navigator.hardwareConcurrency || 4;
    let arch = '64-BIT';

    try {
      if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
        const entropy = await navigator.userAgentData.getHighEntropyValues(['architecture', 'bitness']);
        if (entropy.architecture) {
          arch = `${entropy.architecture.toUpperCase()}${entropy.bitness ? ` // ${entropy.bitness}-BIT` : ''}`;
        }
      } else {
        // Fallback detection from userAgent
        const ua = navigator.userAgent;
        if (/arm64|aarch64/i.test(ua)) arch = 'ARM64 // SILICON';
        else if (/x86_64|win64|wow64|x64/i.test(ua)) arch = 'x86_64 // MULTI-CORE';
      }
    } catch (e) {
      arch = '64-BIT ARCH';
    }

    return {
      cores,
      description: `${cores} LOGICAL THREADS // ${arch}`
    };
  }

  /**
   * Detect Device Memory (RAM) & JS Heap
   */
  detectMemory() {
    const rawMemory = navigator.deviceMemory; // Returns GB (e.g. 0.25, 0.5, 1, 2, 4, 8)
    let ramLabel = 'STANDARD TIED (≥ 4 GB)';

    if (rawMemory) {
      if (rawMemory >= 8) {
        ramLabel = `≥ ${rawMemory} GB RAM [HIGH-TIER]`;
      } else {
        ramLabel = `~${rawMemory} GB RAM`;
      }
    }

    // Chromium JS Heap memory
    let heapLabel = '';
    if (performance && performance.memory) {
      const usedMB = (performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
      const totalMB = (performance.memory.totalJSHeapSize / (1024 * 1024)).toFixed(0);
      heapLabel = `HEAP: ${usedMB} / ${totalMB} MB`;
    }

    return {
      ramLabel,
      heapLabel,
      fullDisplay: heapLabel ? `${ramLabel} // ${heapLabel}` : ramLabel
    };
  }

  /**
   * Detect Local Disk / SSD Storage Quota via StorageManager API
   */
  async detectStorage() {
    try {
      if (navigator.storage && typeof navigator.storage.estimate === 'function') {
        const est = await navigator.storage.estimate();
        if (est.quota) {
          const quotaGB = (est.quota / (1024 * 1024 * 1024)).toFixed(1);
          const usageMB = est.usage ? (est.usage / (1024 * 1024)).toFixed(1) : '0';
          return `${quotaGB} GB NVMe/DISK // ${usageMB} MB CACHED`;
        }
      }
    } catch (e) {
      // Storage estimate may be restricted
    }
    return 'ORIGIN STORAGE GRANTED // NVMe';
  }

  /**
   * Detect Form Factor: Mobile vs Desktop vs Tablet
   */
  detectFormFactor() {
    const isMobileUA = Boolean(navigator.userAgentData?.mobile);
    const hasCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const hasTouch = Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const screenWidth = window.screen.width;
    const isPortrait = window.matchMedia && window.matchMedia('(orientation: portrait)').matches;

    if (isMobileUA || (hasTouch && screenWidth <= 768)) {
      return {
        type: 'MOBILE',
        label: 'MOBILE CLIENT [TOUCH INTERFACE]',
        isMobile: true
      };
    }

    if (hasTouch && screenWidth > 768 && screenWidth <= 1200) {
      return {
        type: 'TABLET',
        label: 'TABLET HYBRID [TOUCH & POINTER]',
        isMobile: true
      };
    }

    return {
      type: 'DESKTOP',
      label: 'DESKTOP WORKSTATION [PRECISION MOUSE]',
      isMobile: false
    };
  }

  /**
   * Detect Operating System & Browser Engine
   */
  detectOSAndEngine() {
    const ua = navigator.userAgent;
    let os = 'UNKNOWN OS';
    let platform = navigator.userAgentData?.platform || navigator.platform || '';

    if (/Windows/i.test(ua) || /Win/i.test(platform)) {
      os = 'WINDOWS 11 / 10 (NT-KERNEL)';
    } else if (/Macintosh|Mac OS X/i.test(ua) || /Mac/i.test(platform)) {
      os = 'MACOS (DARWIN ARCHITECTURE)';
    } else if (/Android/i.test(ua)) {
      os = 'ANDROID OS (LINUX KERNEL)';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      os = 'APPLE iOS / iPadOS';
    } else if (/Linux/i.test(ua) || /Linux/i.test(platform)) {
      os = 'GNU/LINUX (POSIX ENVIRONMENT)';
    }

    // Engine
    let engine = 'BLINK ENGINE';
    if (/Firefox/i.test(ua)) engine = 'GECKO ENGINE';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) engine = 'WEBKIT ENGINE';

    return {
      os,
      engine,
      display: `${os} // ${engine}`
    };
  }

  /**
   * Detect Display Resolution, Color Gamut (Display P3 vs sRGB) & Dynamic Range
   */
  detectDisplay() {
    const dpr = (window.devicePixelRatio || 1).toFixed(2);
    const screenW = Math.round(window.screen.width * (window.devicePixelRatio || 1));
    const screenH = Math.round(window.screen.height * (window.devicePixelRatio || 1));
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    let gamut = 'sRGB STANDARD';
    if (window.matchMedia && window.matchMedia('(color-gamut: p3)').matches) {
      gamut = 'DISPLAY P3 (WIDE COLOR GAMUT)';
    } else if (window.matchMedia && window.matchMedia('(color-gamut: rec2020)').matches) {
      gamut = 'REC.2020 (CINEMA ULTRA-WIDE)';
    }

    const isHDR = window.matchMedia && window.matchMedia('(dynamic-range: high)').matches;
    const gamutWithHdr = isHDR ? `${gamut} // HDR PRO` : gamut;

    return {
      nativeRes: `${screenW} × ${screenH} @ ${dpr}x DPR`,
      viewport: `${viewportW} × ${viewportH}px`,
      gamut: gamutWithHdr
    };
  }

  /**
   * Detect Network Cadence & Telemetry
   */
  detectNetwork() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      const type = (conn.effectiveType || '4G').toUpperCase();
      const downlink = conn.downlink ? `${conn.downlink} Mbps` : '';
      const rtt = conn.rtt ? `${conn.rtt}ms RTT` : '';
      const parts = [type, downlink, rtt].filter(Boolean);
      return parts.join(' • ') || 'OPTIMAL CADENCE';
    }
    return 'ONLINE // HIGH BANDWIDTH';
  }

  /**
   * Full asynchronous telemetry gathering
   */
  async gatherFullTelemetry() {
    const [cpu, storage] = await Promise.all([
      this.detectCPU(),
      this.detectStorage()
    ]);

    const gpu = this.detectGPU();
    const memory = this.detectMemory();
    const formFactor = this.detectFormFactor();
    const os = this.detectOSAndEngine();
    const display = this.detectDisplay();
    const network = this.detectNetwork();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const osPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeStatus = isDark 
      ? `OBSIDIAN NIGHT ${osPrefersDark ? '[MATCHES OS]' : '[CUSTOM OVERRIDE]'}`
      : `LIMESTONE LIGHT ${!osPrefersDark ? '[MATCHES OS]' : '[CUSTOM OVERRIDE]'}`;

    return {
      cpu,
      gpu,
      memory,
      storage,
      formFactor,
      os,
      display,
      network,
      themeStatus
    };
  }
}

export const deviceTelemetry = new DeviceTelemetryEngine();


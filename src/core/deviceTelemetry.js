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
    
    let str = raw;

    // Check if it's an ANGLE wrapped renderer e.g. "ANGLE (Vendor, Model, Backend)"
    if (str.startsWith('ANGLE') && str.includes(',')) {
      const commaIdx = str.indexOf(',');
      const lastCommaIdx = str.lastIndexOf(',');
      if (lastCommaIdx > commaIdx) {
        str = str.substring(commaIdx + 1, lastCommaIdx).trim();
      } else {
        str = str.substring(commaIdx + 1).replace(/\)$/, '').trim();
      }
    }

    // Remove hex device IDs like (0x00002860) or (0x46A6)
    str = str.replace(/\(0x[0-9a-fA-F]+\)/gi, '');

    // Direct3D or shader suffixes
    str = str
      .replace(/Direct3D.*/i, '')
      .replace(/vs_\d+_\d+ ps_\d+_\d+/i, '')
      .replace(/OpenGL.*/i, '')
      .replace(/D3D\d+.*/i, '')
      .trim();

    // Clean up trailing commas or closing parens
    str = str.replace(/[,;)]+$/, '').trim();

    return str || raw;
  }

  /**
   * Probe WebGL with specific powerPreference ('low-power' vs 'high-performance')
   */
  probeWebGL(powerPreference = 'default') {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2', { powerPreference }) || 
                 canvas.getContext('webgl', { powerPreference }) ||
                 canvas.getContext('experimental-webgl', { powerPreference });
      if (!gl) return null;

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      let rawRenderer = '';
      let rawVendor = '';

      if (debugInfo) {
        rawRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
        rawVendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || '';
      } else {
        rawRenderer = gl.getParameter(gl.RENDERER) || '';
        rawVendor = gl.getParameter(gl.VENDOR) || '';
      }

      const renderer = this.cleanGPURenderer(rawRenderer);
      const vendor = rawVendor.replace(/Google Inc\..*/i, '').trim() || rawVendor;

      return {
        rawRenderer,
        renderer,
        vendor
      };
    } catch (e) {
      return null;
    }
  }

  /**
   * Classify GPU architecture, generation and hardware tier
   */
  classifyGPU(rendererStr, vendorStr = '') {
    const raw = rendererStr || '';
    // Normalize string: strip (R) and (TM) to prevent regex breaks
    const r = raw.toUpperCase().replace(/\((R|TM)\)/gi, ' ');
    const v = (vendorStr || '').toUpperCase();

    // 1. NVIDIA GENERATIONS
    if (r.includes('RTX 50') || /RTX\s*50\d0/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'BLACKWELL (DLSS 4 // 5TH GEN TENSOR // 3NM)',
        tier: 'FLAGSHIP DEDICATED'
      };
    }
    if (r.includes('RTX 40') || /RTX\s*40\d0/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'ADA LOVELACE (TSMC 4N // DLSS 3 // 4TH GEN TENSOR)',
        tier: 'HIGH-PERFORMANCE DEDICATED'
      };
    }
    if (r.includes('RTX 30') || /RTX\s*30\d0/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'AMPERE (8NM // DLSS 2 // 2ND GEN RT)',
        tier: 'PERFORMANCE DEDICATED'
      };
    }
    if (r.includes('RTX 20') || /RTX\s*20\d0/i.test(r) || /GTX\s*16\d0/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'TURING (12NM FFN // 1ST GEN RT CORES)',
        tier: 'MID-TIER DEDICATED'
      };
    }
    if (/GTX\s*10\d0/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'PASCAL ARCHITECTURE (16NM FINFET)',
        tier: 'LEGACY DEDICATED'
      };
    }
    if (/GTX\s*9\d0/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'MAXWELL ARCHITECTURE (28NM)',
        tier: 'LEGACY DEDICATED'
      };
    }
    if (v.includes('NVIDIA') || r.includes('GEFORCE') || r.includes('QUADRO') || r.includes('TESLA')) {
      return {
        type: 'dGPU',
        generation: 'NVIDIA DEDICATED GRAPHICS SILICON',
        tier: 'DEDICATED'
      };
    }

    // 2. AMD RADEON GENERATIONS
    if (/RX\s*7\d00/i.test(r) || /7\d0M/i.test(r)) {
      const isAPU = /7\d0M/i.test(r);
      return {
        type: isAPU ? 'iGPU' : 'dGPU',
        generation: 'RDNA 3 / 3.5 (5NM // NAVI 3X // CHIPLET)',
        tier: isAPU ? 'INTEGRATED APU' : 'HIGH-PERFORMANCE DEDICATED'
      };
    }
    if (/RX\s*6\d00/i.test(r) || /6\d0M/i.test(r)) {
      const isAPU = /6\d0M/i.test(r);
      return {
        type: isAPU ? 'iGPU' : 'dGPU',
        generation: 'RDNA 2 (7NM // BIG NAVI ARCHITECTURE)',
        tier: isAPU ? 'INTEGRATED APU' : 'PERFORMANCE DEDICATED'
      };
    }
    if (/RX\s*5\d00/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'RDNA 1 (7NM // NAVI 10/14)',
        tier: 'DEDICATED'
      };
    }
    if (r.includes('VEGA') || (v.includes('AMD') && (r.includes('GRAPHICS') || r.includes('RADEON')))) {
      return {
        type: 'iGPU',
        generation: 'AMD RADEON VEGA / RDNA HYBRID APU',
        tier: 'INTEGRATED APU'
      };
    }

    // 3. INTEL GENERATIONS
    if (/BATTLEMAGE|BMG/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'INTEL XE2-HPG (BATTLEMAGE ARCHITECTURE)',
        tier: 'DEDICATED'
      };
    }
    if (/ARC\s*A\d+|ALCHEMIST/i.test(r)) {
      return {
        type: 'dGPU',
        generation: 'INTEL XE-HPG (ALCHEMIST // TSMC N6)',
        tier: 'DEDICATED'
      };
    }
    if (/ARC.*GRAPHICS/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'INTEL XE-LPG (CORE ULTRA / METEOR LAKE)',
        tier: 'INTEGRATED TILE'
      };
    }
    if (/IRIS.*XE/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'INTEL GEN 12 XE-LP (11TH-13TH GEN CORE)',
        tier: 'INTEGRATED'
      };
    }
    if (/UHD.*(770|730|710)/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'INTEL GEN 12.2 XE-LP (12TH-14TH GEN ALDER/RAPTOR LAKE)',
        tier: 'INTEGRATED'
      };
    }
    if (/UHD.*(630|620|610)/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'INTEL GEN 9.5 (8TH-10TH GEN COFFEE/COMET LAKE)',
        tier: 'INTEGRATED'
      };
    }
    if (/HD.*(530|520|515)/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'INTEL GEN 9 (6TH GEN SKYLAKE)',
        tier: 'INTEGRATED'
      };
    }
    if (v.includes('INTEL') || r.includes('INTEL')) {
      return {
        type: 'iGPU',
        generation: 'INTEL INTEGRATED GRAPHICS SILICON',
        tier: 'INTEGRATED'
      };
    }

    // 4. APPLE SILICON
    if (r.includes('APPLE M4') || /M4\s*(PRO|MAX|ULTRA)?/i.test(r)) {
      return {
        type: 'UNIFIED',
        generation: 'APPLE M4 (3NM TSMC // DYNAMIC CACHING // ARMV9.2)',
        tier: 'UNIFIED HIGH-TIER SOC'
      };
    }
    if (r.includes('APPLE M3') || /M3\s*(PRO|MAX|ULTRA)?/i.test(r)) {
      return {
        type: 'UNIFIED',
        generation: 'APPLE M3 (3NM // HARDWARE RAY TRACING // DYNAMIC CACHING)',
        tier: 'UNIFIED SOC'
      };
    }
    if (r.includes('APPLE M2') || /M2\s*(PRO|MAX|ULTRA)?/i.test(r)) {
      return {
        type: 'UNIFIED',
        generation: 'APPLE M2 (5NM N5P // UNIFIED 100GB/S MEMORY)',
        tier: 'UNIFIED SOC'
      };
    }
    if (r.includes('APPLE M1') || /M1\s*(PRO|MAX|ULTRA)?/i.test(r)) {
      return {
        type: 'UNIFIED',
        generation: 'APPLE M1 (5NM N5 // CUSTOM 8/16-CORE GPU)',
        tier: 'UNIFIED SOC'
      };
    }
    if (v.includes('APPLE') || r.includes('APPLE')) {
      return {
        type: 'UNIFIED',
        generation: 'APPLE CUSTOM GPU SILICON (METAL ACCELERATED)',
        tier: 'UNIFIED SOC'
      };
    }

    // 5. QUALCOMM / ADRENO
    if (/ADRENO\s*X1/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'QUALCOMM ADRENO X1 (SNAPDRAGON X ELITE / ORYON)',
        tier: 'INTEGRATED ARM SOC'
      };
    }
    if (/ADRENO\s*(750|740|730)/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'QUALCOMM ADRENO 7-SERIES (SNAPDRAGON 8 GEN 2/3)',
        tier: 'MOBILE FLAGSHIP SOC'
      };
    }
    if (/MALI|IMMORTALIS/i.test(r)) {
      return {
        type: 'iGPU',
        generation: 'ARM VALHALL / 5TH GEN MOBILE GPU ARCHITECTURE',
        tier: 'MOBILE SOC'
      };
    }

    return {
      type: 'GPU',
      generation: 'HARDWARE GRAPHICS ACCELERATOR PIPELINE',
      tier: 'ACCELERATED'
    };
  }

  /**
   * Detect and correlate Dual-GPU setup (dGPU vs iGPU)
   */
  detectDualGPUs() {
    const lowPower = this.probeWebGL('low-power');
    const highPerf = this.probeWebGL('high-performance');
    const defaultGpu = this.probeWebGL('default');

    const primary = highPerf || defaultGpu || lowPower || { renderer: 'UNKNOWN GPU', vendor: '' };
    const secondary = (lowPower && lowPower.renderer !== primary.renderer) ? lowPower : null;

    let dgpu = null;
    let igpu = null;

    const classPrimary = this.classifyGPU(primary.renderer, primary.vendor);
    
    if (secondary) {
      const classSecondary = this.classifyGPU(secondary.renderer, secondary.vendor);
      
      if (classPrimary.type === 'dGPU' || classSecondary.type === 'iGPU') {
        dgpu = { ...primary, ...classPrimary };
        igpu = { ...secondary, ...classSecondary };
      } else if (classSecondary.type === 'dGPU' || classPrimary.type === 'iGPU') {
        dgpu = { ...secondary, ...classSecondary };
        igpu = { ...primary, ...classPrimary };
      } else {
        dgpu = { ...primary, ...classPrimary };
        igpu = { ...secondary, ...classSecondary };
      }
    } else {
      if (classPrimary.type === 'dGPU') {
        dgpu = { ...primary, ...classPrimary };
        igpu = {
          renderer: 'N/A [DISCRETE DIRECT PIPELINE]',
          generation: 'SYSTEM RUNNING ON DIRECT dGPU BUS',
          tier: 'DISCRETE DIRECT'
        };
      } else if (classPrimary.type === 'UNIFIED') {
        dgpu = {
          renderer: `${primary.renderer} [UNIFIED SOC]`,
          generation: classPrimary.generation,
          tier: classPrimary.tier
        };
        igpu = {
          renderer: `${primary.renderer} [INTEGRATED CORE]`,
          generation: 'SHARED ZERO-COPY HIGH SPEED FABRIC',
          tier: 'UNIFIED FABRIC'
        };
      } else {
        // Only iGPU detected
        dgpu = {
          renderer: 'N/A [NO DISCRETE GPU DETECTED]',
          generation: 'SYSTEM RUNNING ON INTEGRATED APU / iGPU',
          tier: 'INTEGRATED ONLY'
        };
        igpu = { ...primary, ...classPrimary };
      }
    }

    const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;
    const apiVersion = hasWebGPU ? 'WEBGL 2.0 // WEBGPU READY' : 'WEBGL 2.0 // HARDWARE ACCELERATED';

    return {
      dgpu,
      igpu,
      apiVersion,
      hasDualGPU: Boolean(secondary)
    };
  }

  /**
   * Infer CPU Generation and Architecture from cores, platform & detected iGPU
   */
  async detectCPU(gpus) {
    const cores = navigator.hardwareConcurrency || 4;
    let arch = '64-BIT';
    let generation = 'X86_64 MULTI-CORE PROCESSOR SILICON';

    try {
      if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
        const entropy = await navigator.userAgentData.getHighEntropyValues(['architecture', 'bitness']);
        if (entropy.architecture) {
          arch = `${entropy.architecture.toUpperCase()}${entropy.bitness ? ` // ${entropy.bitness}-BIT` : ''}`;
        }
      } else {
        const ua = navigator.userAgent;
        if (/arm64|aarch64/i.test(ua)) arch = 'ARM64 // SILICON';
        else if (/x86_64|win64|wow64|x64/i.test(ua)) arch = 'x86_64 // MULTI-CORE';
      }
    } catch (e) {
      arch = '64-BIT ARCH';
    }

    // Correlate CPU generation from detected GPU / iGPU
    const igpuText = `${gpus?.igpu?.renderer || ''} ${gpus?.dgpu?.renderer || ''}`.toUpperCase().replace(/\((R|TM)\)/gi, ' ');

    if (/APPLE\s*M4/i.test(igpuText)) {
      generation = 'APPLE M4 CUSTOM SILICON (ARMV9.2 // 3NM TSMC)';
    } else if (/APPLE\s*M3/i.test(igpuText)) {
      generation = 'APPLE M3 CUSTOM SILICON (ARMV9 // 3NM)';
    } else if (/APPLE\s*M2/i.test(igpuText)) {
      generation = 'APPLE M2 CUSTOM SILICON (ARMV8.5-A // 5NM)';
    } else if (/APPLE\s*M1/i.test(igpuText)) {
      generation = 'APPLE M1 CUSTOM SILICON (ARMV8.5-A // 5NM)';
    } else if (/ADRENO\s*X1/i.test(igpuText)) {
      generation = 'QUALCOMM SNAPDRAGON X ELITE / PLUS (ORYON SILICON)';
    } else if (/ARC.*GRAPHICS/i.test(igpuText)) {
      generation = 'INTEL CORE ULTRA SERIES 1 / 2 (METEOR / ARROW LAKE)';
    } else if (/IRIS.*XE/i.test(igpuText)) {
      if (cores >= 16) {
        generation = 'INTEL® CORE™ 13TH/14TH GEN (RAPTOR LAKE HYBRID)';
      } else if (cores >= 12) {
        generation = 'INTEL® CORE™ 12TH/13TH GEN (ALDER/RAPTOR LAKE)';
      } else {
        generation = 'INTEL® CORE™ 11TH/12TH GEN (TIGER/ALDER LAKE)';
      }
    } else if (/UHD.*(770|730|710)/i.test(igpuText)) {
      generation = 'INTEL® CORE™ 12TH-14TH GEN (ALDER / RAPTOR LAKE)';
    } else if (/UHD.*(630|620|610)/i.test(igpuText)) {
      generation = 'INTEL® CORE™ 8TH-10TH GEN (COFFEE / COMET LAKE)';
    } else if (/7\d0M/i.test(igpuText)) {
      generation = 'AMD RYZEN™ 7000 / 8000 SERIES (ZEN 4 ARCHITECTURE)';
    } else if (/6\d0M/i.test(igpuText)) {
      generation = 'AMD RYZEN™ 6000 SERIES (ZEN 3+ REMBRANDT)';
    } else if (/VEGA/i.test(igpuText) || (igpuText.includes('AMD') && igpuText.includes('GRAPHICS'))) {
      generation = 'AMD RYZEN™ 4000 / 5000 SERIES (ZEN 2 / ZEN 3)';
    } else {
      // High-core desktop inference
      if (cores >= 24) {
        generation = 'FLAGSHIP MULTI-CORE HYBRID (INTEL I9 / AMD RYZEN 9 24T+)';
      } else if (cores >= 16) {
        generation = 'PERFORMANCE COMPUTE HYBRID (16-THREAD MULTI-CORE)';
      } else if (cores >= 12) {
        generation = 'PERFORMANCE MULTI-THREADED PROCESSOR (12-THREAD)';
      } else if (cores >= 8) {
        generation = 'MAINSTREAM 8-THREAD SILICON ARCHITECTURE';
      }
    }

    return {
      cores,
      arch,
      generation,
      description: `${cores} LOGICAL THREADS // ${arch}`
    };
  }

  /**
   * Detect Device Memory (RAM) & JS Heap
   */
  detectMemory() {
    const rawMemory = navigator.deviceMemory;
    let ramLabel = 'STANDARD (≥ 4 GB)';

    if (rawMemory) {
      if (rawMemory >= 8) {
        ramLabel = `≥ ${rawMemory} GB RAM [HIGH-TIER]`;
      } else {
        ramLabel = `~${rawMemory} GB RAM`;
      }
    }

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
    const hasTouch = Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const screenWidth = window.screen.width;

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
    const gpus = this.detectDualGPUs();
    
    const [cpu, storage] = await Promise.all([
      this.detectCPU(gpus),
      this.detectStorage()
    ]);

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
      gpus,
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

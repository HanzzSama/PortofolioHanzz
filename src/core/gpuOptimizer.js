/**
 * GPU HARDWARE ACCELERATION AND DISCRETE GPU BINDING ENGINE
 * Signals the browser compositor and Windows GPU scheduler to prioritize
 * dedicated high-performance discrete GPUs (NVIDIA GeForce RTX or AMD Radeon dGPU)
 * via WebGPU and WebGL 2.0 powerPreference heuristics.
 */

export class GPUOptimizer {
  constructor() {
    this.highPerfCanvas = null;
    this.gl = null;
    this.webgpuAdapter = null;
    this.activeGPU = null;
    this.init();
  }

  async init() {
    // 1. WebGPU high-performance adapter request
    if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
      try {
        this.webgpuAdapter = await navigator.gpu.requestAdapter({
          powerPreference: 'high-performance'
        });
        if (this.webgpuAdapter && this.webgpuAdapter.info) {
          const info = this.webgpuAdapter.info;
          this.activeGPU = info.device || info.description || info.architecture || null;
        }
      } catch (_) {
        // Fallback to WebGL2
      }
    }

    // 2. Persistent WebGL2 high-performance context
    try {
      if (typeof document === 'undefined') return;

      this.highPerfCanvas = document.createElement('canvas');
      this.highPerfCanvas.width = 1;
      this.highPerfCanvas.height = 1;
      this.highPerfCanvas.style.display = 'none';
      this.highPerfCanvas.setAttribute('aria-hidden', 'true');
      this.highPerfCanvas.id = 'discrete-gpu-anchor';

      if (document.body) {
        document.body.appendChild(this.highPerfCanvas);
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          if (!document.getElementById('discrete-gpu-anchor')) {
            document.body.appendChild(this.highPerfCanvas);
          }
        });
      }

      const glOptions = {
        powerPreference: 'high-performance',
        alpha: false,
        desynchronized: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
      };

      this.gl = this.highPerfCanvas.getContext('webgl2', glOptions) ||
                this.highPerfCanvas.getContext('webgl', glOptions) ||
                this.highPerfCanvas.getContext('experimental-webgl', glOptions);

      if (this.gl) {
        const debugInfo = this.gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const rawRenderer = this.gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
          if (rawRenderer && !this.activeGPU) {
            this.activeGPU = rawRenderer;
          }
        }
      }
    } catch (_) {
      // Graceful fallback to default graphics pipeline
    }
  }

  getActiveGPU() {
    return this.activeGPU || 'HARDWARE ACCELERATED GPU';
  }
}

export const gpuOptimizer = new GPUOptimizer();


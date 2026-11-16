import fs from 'fs';
import path from 'path';

// Mock browser globals
global.window = {
  innerWidth: 1440,
  innerHeight: 900,
  scrollY: 0,
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
  location: { href: 'http://localhost/' },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  matchMedia: () => ({ matches: false, addEventListener: () => {} }),
  requestAnimationFrame: (cb) => setTimeout(cb, 16),
  cancelAnimationFrame: (id) => clearTimeout(id),
  AudioContext: class {
    createGain() { return { connect: () => {}, gain: { value: 1, setValueAtTime: () => {} } }; }
    createOscillator() { return { connect: () => {}, start: () => {}, stop: () => {}, frequency: { value: 432 } }; }
  }
};
global.document = {
  documentElement: {
    setAttribute: () => {},
    getAttribute: () => 'light',
    style: {},
    scrollHeight: 5000
  },
  getElementById: (id) => {
    if (id === 'app') {
      return {
        innerHTML: '',
        style: {},
        querySelectorAll: () => []
      };
    }
    return {
      addEventListener: () => {},
      setAttribute: () => {},
      getAttribute: () => '',
      classList: { add: () => {}, remove: () => {}, toggle: () => false },
      style: {},
      getContext: () => ({
        clearRect: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        stroke: () => {},
        fill: () => {}
      }),
      getBoundingClientRect: () => ({ top: 0, left: 0, width: 300, height: 300 })
    };
  },
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  removeEventListener: () => {}
};
global.localStorage = global.window.localStorage;
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = global.window.requestAnimationFrame;
global.cancelAnimationFrame = global.window.cancelAnimationFrame;
global.CustomEvent = class { constructor(type, detail) { this.type = type; this.detail = detail; } };
global.IntersectionObserver = class {
  constructor(cb) { this.cb = cb; }
  observe() {}
  unobserve() {}
  disconnect() {}
};

try {
  const { portfolioData, getPortfolioData } = await import('../src/data/portfolioData.js');
  const data = getPortfolioData('id');
  const { renderProjects } = await import('../src/components/renderProjects.js');
  const html = renderProjects(data);
  console.log('renderProjects succeeded! Output length:', html.length);
  console.log('Rendered projects excerpt:', html.slice(0, 500));
} catch (e) {
  console.error('CRASH in test:', e);
}

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
    getItem: () => 'id',
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
    return {
      innerHTML: '',
      textContent: '',
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
      getBoundingClientRect: () => ({ top: 0, left: 0, width: 300, height: 300 }),
      querySelectorAll: () => []
    };
  },
  querySelector: () => ({
    textContent: '',
    style: {},
    classList: { add: () => {}, remove: () => {} },
    getBoundingClientRect: () => ({ top: 0, left: 0, width: 100, height: 100 })
  }),
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
  await import('../src/main.js');
  console.log('main.js loaded and executed successfully without throwing!');
} catch (e) {
  console.error('Error during main.js run:', e);
}


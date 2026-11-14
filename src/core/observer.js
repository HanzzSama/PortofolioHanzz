/**
 * INTERSECTION OBSERVER ORCHESTRATOR
 * Expressive Entrance Physics, Telemetry Reveal & Active Section Tracker
 */

export class ArchitecturalObserver {
  constructor() {
    this.sectionObserver = null;
    this.revealObserver = null;
    this.springObserver = null;
    this.timelineObserver = null;
    this.init();
  }

  init() {
    this.setupRevealObserver();
    this.setupSectionObserver();
    this.setupScrollScaleObserver();  // BARU
    this.setupTimelineReveal();        // BARU
  }

  setupRevealObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12
    };

    this.revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          
          // If the element has stagger items
          const staggerItems = entry.target.querySelectorAll('[data-stagger]');
          staggerItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 85}ms`;
            item.classList.add('is-stagger-revealed');
          });

          // Unobserve once revealed for clean performance
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const revealTargets = document.querySelectorAll(
      '.architectural-section, .pillar-card, .matrix-tier-card, .project-architectural-card, .garden-note-card, [data-reveal]'
    );

    revealTargets.forEach((target) => {
      target.classList.add('reveal-init');
      this.revealObserver.observe(target);
    });
  }

  setupSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const watermarkCurrent = document.querySelector('.current-section-marker');

    const options = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          if (watermarkCurrent) {
            watermarkCurrent.textContent = id.toUpperCase();
          }

          // Emit global section change event for HUD Capsule and other components
          window.dispatchEvent(new CustomEvent('sectionchange', { detail: { id } }));
        }
      });
    }, options);

    sections.forEach((section) => {
      this.sectionObserver.observe(section);
    });
  }

  setupScrollScaleObserver() {
    // Garden Note Cards — spring scale entry
    const springOptions = {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08
    };

    this.springObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Add spring class with stagger delay
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('is-spring-revealed');
          }, index * 60);
          observer.unobserve(entry.target);
        }
      });
    }, springOptions);

    // Pillar cards spring entry
    const pillarTargets = document.querySelectorAll('.pillar-card');
    pillarTargets.forEach(el => {
      el.classList.add('spring-init');
      this.springObserver.observe(el);
    });

    // Garden note cards spring entry  
    const gardenTargets = document.querySelectorAll('.garden-note-card');
    gardenTargets.forEach(el => {
      el.classList.add('spring-init');
      this.springObserver.observe(el);
    });
  }

  setupTimelineReveal() {
    const timelineOptions = {
      root: null,
      rootMargin: '0px 0px -5% 0px',
      threshold: 0.05
    };

    this.timelineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rows = entry.target.querySelectorAll('.timeline-row');
          rows.forEach((row, index) => {
            row.classList.add('timeline-row-init');
            setTimeout(() => {
              row.classList.add('timeline-row-revealed');
            }, index * 55);
          });
          observer.unobserve(entry.target);
        }
      });
    }, timelineOptions);

    const timelineContainers = document.querySelectorAll('.timeline-items');
    timelineContainers.forEach(container => {
      this.timelineObserver.observe(container);
    });
  }

  refresh() {
    if (this.revealObserver) this.revealObserver.disconnect();
    if (this.sectionObserver) this.sectionObserver.disconnect();
    if (this.springObserver) this.springObserver.disconnect();
    if (this.timelineObserver) this.timelineObserver.disconnect();
    this.init();
  }
}

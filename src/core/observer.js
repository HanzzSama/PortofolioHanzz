/**
 * INTERSECTION OBSERVER ORCHESTRATOR
 * Expressive Entrance Physics, Telemetry Reveal & Active Section Tracker
 */

export class ArchitecturalObserver {
  constructor() {
    this.sectionObserver = null;
    this.revealObserver = null;
    this.cardSlideObserver = null;
    this.springObserver = null;
    this.timelineObserver = null;
    this.init();
  }

  init() {
    this.setupRevealObserver();
    this.setupCardSlideInOutObserver(); // Continuous Slide In-Out for all Portfolio Cards
    this.setupSectionObserver();
    this.setupScrollScaleObserver();
    this.setupTimelineReveal();
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
      '.architectural-section, [data-reveal]'
    );

    revealTargets.forEach((target) => {
      target.classList.add('reveal-init');
      this.revealObserver.observe(target);
    });
  }

  setupCardSlideInOutObserver() {
    const cardOptions = {
      root: null,
      rootMargin: '10px 0px -30px 0px',
      threshold: 0.08
    };

    this.cardSlideObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const rect = entry.boundingClientRect;
        const rootBounds = entry.rootBounds || {
          top: 0,
          bottom: window.innerHeight
        };

        if (entry.isIntersecting) {
          // Card enters viewport -> SLIDE IN
          card.classList.remove('card-slide-out', 'slide-out-top', 'slide-out-bottom');
          card.classList.add('card-slide-in');
        } else {
          // Card leaves viewport -> SLIDE OUT
          card.classList.remove('card-slide-in');
          // Determine whether it exited past top or bottom of viewport
          if (rect.bottom <= rootBounds.top) {
            card.classList.remove('slide-out-bottom');
            card.classList.add('card-slide-out', 'slide-out-top');
          } else if (rect.top >= rootBounds.bottom) {
            card.classList.remove('slide-out-top');
            card.classList.add('card-slide-out', 'slide-out-bottom');
          } else {
            card.classList.add('card-slide-out');
          }
        }
      });
    }, cardOptions);

    const cards = document.querySelectorAll(
      '.project-architectural-card, .github-repo-card, .matrix-tier-card, .pillar-card, .garden-note-card'
    );

    cards.forEach((card, index) => {
      card.classList.add('card-slide-init');

      // Stagger within grid row siblings
      if (card.parentElement) {
        const siblings = Array.from(card.parentElement.children).filter((c) =>
          c.matches('.project-architectural-card, .github-repo-card, .matrix-tier-card, .pillar-card, .garden-note-card')
        );
        const colIndex = siblings.indexOf(card);
        if (colIndex > 0) {
          card.style.transitionDelay = `${colIndex * 90}ms`;
        }
      }

      // Alternating direction for Project Architectural Cards
      if (card.classList.contains('project-architectural-card')) {
        const isRight = index % 2 === 1;
        card.classList.add(isRight ? 'card-slide-right' : 'card-slide-left');
      }

      this.cardSlideObserver.observe(card);
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
            const href = link.getAttribute('href');
            if (href === `#${id}` || (id === 'another' && href === '#lab')) {
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
    // Kept for backward compatibility or custom spring elements
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
    if (this.cardSlideObserver) this.cardSlideObserver.disconnect();
    if (this.springObserver) this.springObserver.disconnect();
    if (this.timelineObserver) this.timelineObserver.disconnect();
    this.init();
  }
}

/* ═══════════════════════════════════════
   GENCYO – LANDING PAGE SCRIPTS
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll glass effect ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Active nav link highlight ── */
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ── Discover More magnetic hover ── */
  const discoverBtn = document.getElementById('discover-btn');
  if (discoverBtn) {
    discoverBtn.addEventListener('mousemove', (e) => {
      const rect = discoverBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      discoverBtn.style.transform = `translateY(-3px) translate(${x * 0.08}px, ${y * 0.08}px)`;
    });
    discoverBtn.addEventListener('mouseleave', () => {
      discoverBtn.style.transform = '';
    });
  }

  /* ── Parallax on hero background ── */
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }

  /* ── Mobile menu toggle ── */
  const menuBtn      = document.getElementById('menu-btn');
  const navLinksCont = document.querySelector('.nav-links');
  if (menuBtn && navLinksCont) {
    menuBtn.addEventListener('click', () => {
      const isOpen = navLinksCont.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ── Scroll-reveal: service cards ── */
  const cards = document.querySelectorAll('.service-card');
  if (cards.length) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(card => cardObserver.observe(card));
  }

  /* ── Scroll-reveal: About section elements ── */
  const aboutRevealEls = document.querySelectorAll(
    '.about-img-main, .section-label, .about-heading, .about-desc, .about-checklist, .about-stat-card, .about-cta'
  );
  if (aboutRevealEls.length) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    aboutRevealEls.forEach(el => aboutObserver.observe(el));
  }

  /* ── Scroll-reveal: Services grid cards and labels ── */
  const gridRevealEls = document.querySelectorAll(
    '.grid-label, .services-grid-heading, .service-grid-card'
  );
  if (gridRevealEls.length) {
    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          gridObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    gridRevealEls.forEach(el => gridObserver.observe(el));
  }

  /* ── Scroll-reveal: Case study section ── */
  const caseStudyRevealEls = document.querySelectorAll(
    '.case-study-label, .case-study-heading, .view-all-btn, .project-card'
  );
  if (caseStudyRevealEls.length) {
    const caseStudyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          caseStudyObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    caseStudyRevealEls.forEach(el => caseStudyObserver.observe(el));
  }

  /* ── Animated number counter: 92% ── */
  const statEl = document.getElementById('stat-counter');
  if (statEl) {
    let counted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          let start = 0;
          const target = 92;
          const duration = 1600;
          const step = Math.ceil(duration / target);
          const timer = setInterval(() => {
            start++;
            statEl.textContent = start + '%';
            if (start >= target) clearInterval(timer);
          }, step);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(statEl);
  }

  /* ── Rotation for silver metallic blob & text reveal ── */
  const chromeBlob = document.querySelector('.deco-blob-chrome-img');
  const aboutHeadingDynamic = document.getElementById('about-heading');
  const servicesHeadingDynamic = document.getElementById('services-grid-heading');
  const caseStudyHeadingDynamic = document.getElementById('case-study-heading');
  const processHeadingDynamic = document.getElementById('process-heading');
  const processImage = document.getElementById('process-image');
  let lastScrollY = window.scrollY;
  let processRotation = 0;
  
  if (chromeBlob || aboutHeadingDynamic || servicesHeadingDynamic || caseStudyHeadingDynamic || processHeadingDynamic || processImage) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      
      // Rotate the metallic charcel3.png clockwise when scrolling down, anti-clockwise when up
      // Add a slight bounding sine wave for a floaty feel
      if (chromeBlob) {
        chromeBlob.style.transform = `translateY(${Math.sin(scrollY/200)*15}px) rotate(${scrollY * 0.15}deg)`;
      }

      // Rotate working process visual based on scroll direction:
      // down = clockwise, up = anti-clockwise
      if (processImage && delta !== 0) {
        processRotation += delta * 0.12;
        processImage.style.transform = `rotate(${processRotation}deg)`;
      }

      // Text scrub reveal for section headings
      const dynamicHeadingEls = [
        aboutHeadingDynamic,
        servicesHeadingDynamic,
        caseStudyHeadingDynamic,
        processHeadingDynamic
      ].filter(Boolean);

      dynamicHeadingEls.forEach((headingEl) => {
        const rect = headingEl.getBoundingClientRect();
        const winHeight = window.innerHeight;
        // Start revealing when the element is 85% down the screen, fully revealed at 45%
        const startReveal = winHeight * 0.85;
        const endReveal = winHeight * 0.45;
        
        let progress = 0;
        if (rect.top <= endReveal) {
          progress = 100;
        } else if (rect.top <= startReveal) {
          progress = 100 - ((rect.top - endReveal) / (startReveal - endReveal) * 100);
        }
        
        headingEl.style.setProperty('--reveal-progress', `${progress}%`);
      });
    }, { passive: true });
    
    // Trigger once on load
    window.dispatchEvent(new Event('scroll'));
  }

});


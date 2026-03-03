/* ============================================
   JIMMY'S FURRY HOUSE — GSAP Animation Engine
   Awwwards-level kinetic animations ✨
   
   Powered by GSAP + ScrollTrigger
   ============================================ */

(function () {
  'use strict';

  // Register ScrollTrigger plugin
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ===========================================
  // 1. LOADER & HERO REVEAL TIMELINE
  // ===========================================
  function initHeroReveal() {
    var loader = document.getElementById('loader');
    var hero = document.getElementById('hero');

    // Hide loader
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (loader) {
          loader.classList.add('hidden');
        }

        // If no hero (gallery/testimonials page), just run page entrance
        if (!hero) {
          initPageEntrance();
          return;
        }

        // ---- HERO REVEAL TIMELINE ----
        var tl = gsap.timeline({
          defaults: { ease: 'power3.out' }
        });

        // Hero background: scale 1.2 → 1 over 2.5s
        var heroBg = hero.querySelector('[data-gsap="hero-bg"]');
        if (heroBg) {
          gsap.set(heroBg, { scale: 1.2, opacity: 0 });
          tl.to(heroBg, {
            scale: 1,
            opacity: 1,
            duration: 2.5,
            ease: 'power3.out'
          }, 0);
        }

        // Nav elements fade in + slide down
        var navElements = document.querySelectorAll('[data-gsap="nav"]');
        if (navElements.length) {
          gsap.set(navElements, { opacity: 0, y: -30 });
          tl.to(navElements, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out'
          }, 0.3);
        }

        // Hero subtitle
        var heroSubtitle = hero.querySelector('.hero-subtitle');
        if (heroSubtitle) {
          gsap.set(heroSubtitle, { opacity: 0, y: 30 });
          tl.to(heroSubtitle, {
            opacity: 1,
            y: 0,
            duration: 1,
          }, 0.6);
        }

        // Hero title lines — staggered reveal from bottom
        var titleLines = hero.querySelectorAll('.hero-title .line-inner');
        if (titleLines.length) {
          gsap.set(titleLines, { yPercent: 100, opacity: 0 });
          tl.to(titleLines, {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out'
          }, 0.8);
        }

        // Hero tagline
        var heroTagline = hero.querySelector('.hero-tagline');
        if (heroTagline) {
          gsap.set(heroTagline, { opacity: 0, y: 20 });
          tl.to(heroTagline, {
            opacity: 1,
            y: 0,
            duration: 1,
          }, 1.4);
        }

        // Hero CTA button
        var heroCta = hero.querySelector('.hero-cta');
        if (heroCta) {
          gsap.set(heroCta, { opacity: 0, y: 20 });
          tl.to(heroCta, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          }, 1.7);
        }

        // Scroll indicator
        var scrollIndicator = hero.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
          gsap.set(scrollIndicator, { opacity: 0, y: 20 });
          tl.to(scrollIndicator, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          }, 2.0);
        }

      }, 600);
    });

    // Prevent scroll while loading
    if (loader) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('load', function () {
        setTimeout(function () {
          document.body.style.overflow = '';
        }, 800);
      });
    }
  }

  // Page entrance for non-hero pages
  function initPageEntrance() {
    var reveals = document.querySelectorAll('.gsap-reveal, .gsap-mask-text, .gsap-stagger-item');
    // Just ensure they're ready for ScrollTrigger to handle
  }

  // ===========================================
  // 2. SCROLL-TRIGGERED TYPOGRAPHY MASKING
  // ===========================================
  function initTypographyMasking() {
    var maskTexts = document.querySelectorAll('.gsap-mask-text');

    maskTexts.forEach(function (text) {
      // Set initial state: hidden below the mask container
      gsap.set(text, { yPercent: 100, opacity: 0 });

      // Animate into view on scroll
      gsap.to(text, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: text.parentElement, // the .text-mask wrapper
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        }
      });
    });
  }

  // ===========================================
  // 3. CINEMATIC IMAGE UNVEILS
  // ===========================================
  function initCinematicImageUnveils() {
    var imageWraps = document.querySelectorAll('.gsap-img-reveal');

    imageWraps.forEach(function (wrap) {
      var img = wrap.querySelector('img');
      if (!img) return;

      // Set initial state: clip the wrapper, scale up the image
      gsap.set(wrap, { clipPath: 'inset(100% 0 0 0)' });
      gsap.set(img, { scale: 1.3 });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.parentElement,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        }
      });

      // Expand the wrapper (reveal from bottom to top)
      tl.to(wrap, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.4,
        ease: 'power4.inOut',
      });

      // Simultaneously scale the image down to normal
      tl.to(img, {
        scale: 1,
        duration: 1.8,
        ease: 'power3.out',
      }, 0);
    });
  }

  // ===========================================
  // 4. STAGGERED GRID/CARD REVEALS
  // ===========================================
  function initStaggeredReveals() {
    // Group stagger items in proximity
    var staggerGroups = {};

    document.querySelectorAll('.gsap-stagger-item').forEach(function (item) {
      var parent = item.parentElement;
      var parentId = parent.id || parent.className.split(' ')[0] || 'default';

      if (!staggerGroups[parentId]) {
        staggerGroups[parentId] = {
          parent: parent,
          items: []
        };
      }
      staggerGroups[parentId].items.push(item);
    });

    Object.keys(staggerGroups).forEach(function (key) {
      var group = staggerGroups[key];

      // Set all items initial state
      gsap.set(group.items, {
        opacity: 0,
        y: 60,
        scale: 0.95
      });

      // Animate with stagger
      ScrollTrigger.create({
        trigger: group.parent,
        start: 'top 80%',
        onEnter: function () {
          gsap.to(group.items, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          });
        },
        once: true
      });
    });
  }

  // ===========================================
  // 5. SCROLL VELOCITY DISTORTIONS
  // ===========================================
  function initScrollVelocityDistortions() {
    // Track scroll velocity
    var scrollVelocity = 0;
    var lastScrollTop = 0;
    var lastTime = Date.now();
    var velocitySmooth = 0;
    var rafId = null;
    var isRunning = false;

    // Target elements for skew distortion
    var skewTargets = document.querySelectorAll(
      '.gsap-img-reveal img, .gallery-item img, .story-image img'
    );

    if (skewTargets.length === 0) return;

    // Add velocity-skew class
    skewTargets.forEach(function (el) {
      el.classList.add('gsap-velocity-skew');
    });

    function updateVelocity() {
      var currentScroll = window.pageYOffset;
      var currentTime = Date.now();
      var deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        var rawVelocity = (currentScroll - lastScrollTop) / deltaTime;
        // Smooth the velocity with lerp
        velocitySmooth += (rawVelocity - velocitySmooth) * 0.3;
      }

      lastScrollTop = currentScroll;
      lastTime = currentTime;

      // Apply skewY distortion based on velocity
      var skewAmount = velocitySmooth * 3; // Multiply for visible effect
      skewAmount = Math.max(-8, Math.min(8, skewAmount)); // Clamp

      skewTargets.forEach(function (el) {
        el.style.transform = 'skewY(' + skewAmount + 'deg)';
      });

      // Decay the velocity when idle
      if (Math.abs(velocitySmooth) > 0.001) {
        velocitySmooth *= 0.92;
        rafId = requestAnimationFrame(updateVelocity);
      } else {
        velocitySmooth = 0;
        skewTargets.forEach(function (el) {
          el.style.transform = 'skewY(0deg)';
        });
        isRunning = false;
      }
    }

    window.addEventListener('scroll', function () {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateVelocity);
      }
      // Reset the timer on each scroll
      lastTime = Date.now();
      var currentScroll = window.pageYOffset;
      var deltaScroll = currentScroll - lastScrollTop;
      var rawVelocity = deltaScroll / 16; // Approximate
      velocitySmooth += (rawVelocity - velocitySmooth) * 0.15;
      lastScrollTop = currentScroll;
    }, { passive: true });

    // Canvas-based displacement (subtle scanline effect on fast scroll)
    initVelocityCanvas(function () { return velocitySmooth; });
  }

  // Canvas overlay for subtle displacement effect
  function initVelocityCanvas(getVelocity) {
    var canvas = document.getElementById('velocityCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    var isActive = false;

    function draw() {
      var velocity = Math.abs(getVelocity());

      if (velocity > 0.5) {
        if (!isActive) {
          canvas.classList.add('active');
          isActive = true;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw subtle horizontal lines (scanline effect)
        var intensity = Math.min(velocity * 0.15, 0.12);
        var lineCount = Math.floor(velocity * 8);
        lineCount = Math.min(lineCount, 30);

        for (var i = 0; i < lineCount; i++) {
          var y = Math.random() * canvas.height;
          var height = Math.random() * 2 + 1;

          ctx.fillStyle = 'rgba(212, 168, 83, ' + (intensity * Math.random()) + ')';
          ctx.fillRect(0, y, canvas.width, height);
        }
      } else {
        if (isActive) {
          canvas.classList.remove('active');
          isActive = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ===========================================
  // GENERIC SCROLL REVEALS (gsap-reveal class)
  // ===========================================
  function initGenericReveals() {
    var reveals = document.querySelectorAll('.gsap-reveal');

    reveals.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 50 });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });

    // CTA buttons
    var ctas = document.querySelectorAll('.gsap-cta');
    ctas.forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 20 });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });
    });
  }

  // ===========================================
  // NAVBAR SCROLL EFFECT
  // ===========================================
  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar || navbar.classList.contains('scrolled')) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===========================================
  // MOBILE NAVIGATION
  // ===========================================
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ===========================================
  // GALLERY LIGHTBOX
  // ===========================================
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');
    var galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox || galleryItems.length === 0) return;

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';

          // GSAP lightbox animation
          gsap.fromTo(lightboxImg,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
          );
        }
      });
    });

    function closeLightbox() {
      gsap.to(lightboxImg, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: function () {
          lightbox.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  // ===========================================
  // PAW TRAIL CURSOR EFFECT
  // ===========================================
  function initPawTrail() {
    if (window.innerWidth < 768) return;

    var pawCount = 0;
    var maxPaws = 20;
    var lastX = 0;
    var lastY = 0;
    var minDistance = 80;

    document.addEventListener('mousemove', function (e) {
      var dx = e.clientX - lastX;
      var dy = e.clientY - lastY;
      if (Math.sqrt(dx * dx + dy * dy) < minDistance) return;

      lastX = e.clientX;
      lastY = e.clientY;
      if (pawCount >= maxPaws) return;
      pawCount++;

      var paw = document.createElement('div');
      paw.className = 'paw-cursor';
      paw.textContent = '🐾';
      paw.style.left = e.clientX + 'px';
      paw.style.top = e.clientY + 'px';
      paw.style.transform = 'rotate(' + (Math.random() * 40 - 20) + 'deg)';
      document.body.appendChild(paw);

      setTimeout(function () {
        paw.remove();
        pawCount--;
      }, 1500);
    });
  }

  // ===========================================
  // SMOOTH ANCHOR SCROLL
  // ===========================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 80 },
            ease: 'power3.inOut'
          });
        }
      });
    });
  }

  // ===========================================
  // CONTACT FORM
  // ===========================================
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = document.getElementById('submitBtn');
      var originalText = submitBtn.innerHTML;

      var inputs = form.querySelectorAll('input[required], textarea[required]');
      var isValid = true;

      inputs.forEach(function (input) {
        if (!input.value.trim()) {
          isValid = false;
          gsap.to(input, {
            borderBottomColor: '#C4302B',
            duration: 0.3,
            onComplete: function () {
              gsap.to(input, { borderBottomColor: 'rgba(255,255,255,0.2)', duration: 0.3, delay: 2 });
            }
          });
        }
      });

      if (!isValid) return;

      submitBtn.innerHTML = '✓ Message Sent!';
      submitBtn.style.backgroundColor = '#25D366';
      submitBtn.disabled = true;

      setTimeout(function () {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 3000);
    });
  }

  // ===========================================
  // PAGE TRANSITIONS
  // ===========================================
  function initPageTransitions() {
    var transition = document.getElementById('pageTransition');
    if (!transition) return;

    document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        var currentPath = window.location.pathname;
        var currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
        if (currentPage === href) return;
        if (href.includes('#') && !href.startsWith('#')) return;

        e.preventDefault();

        gsap.to(transition, {
          y: 0,
          duration: 0.5,
          ease: 'power4.inOut',
          onStart: function () {
            transition.style.transform = 'translateY(100%)';
            transition.style.display = 'block';
          },
          onComplete: function () {
            window.location.href = href;
          }
        });
      });
    });
  }

  // ===========================================
  // STICKY LOGO MORPH (Casper's Cavia Style)
  // ===========================================
  function initStickyLogo() {
    var heroTitle = document.getElementById('heroTitle');
    var heroTitleFull = document.getElementById('heroTitleFull');
    var logoDock = document.getElementById('logoDock');
    var navInitials = document.getElementById('navInitials');

    if (!heroTitle || !heroTitleFull || !logoDock || !navInitials) return;

    var mm = gsap.matchMedia();

    mm.add("(min-width: 100px)", function () {
      // The scroll distance over which the morph happens
      var scrollDist = Math.min(500, window.innerHeight * 0.7);

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=' + scrollDist,
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      tl.to(heroTitleFull, {
        scale: 0.18, // Shrink to navbar size
        opacity: 0,  // Crossfade out completely
        x: function () {
          var dockRect = logoDock.getBoundingClientRect();
          var titleRect = heroTitle.getBoundingClientRect(); // use original unscaled rect
          var dCenter = dockRect.left + dockRect.width / 2;
          var tCenter = titleRect.left + titleRect.width / 2;
          return dCenter - tCenter;
        },
        y: function () {
          var dockRect = logoDock.getBoundingClientRect();
          var titleRect = heroTitle.getBoundingClientRect();
          var dCenter = dockRect.top + dockRect.height / 2;
          var tCenter = titleRect.top + titleRect.height / 2;
          // We add scrollDist to counteract the physical upward scroll of the page over the scrub duration
          return (dCenter - tCenter) + scrollDist;
        },
        duration: 1,
        ease: 'power2.inOut'
      }, 0)
        .to(navInitials, {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.3,
          ease: 'power1.inOut'
        }, 0.7); // Fade in the JFH initials near the end 
    });
  }

  // ===========================================
  // FLOATING DECORATIVE PAWS
  // ===========================================
  function initFloatingPaws() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var positions = [
      { left: '5%', top: '20%', size: '2rem', delay: 0 },
      { left: '90%', top: '30%', size: '1.5rem', delay: 1 },
      { left: '15%', top: '70%', size: '1.8rem', delay: 2 },
      { left: '80%', top: '75%', size: '1.3rem', delay: 3 },
      { left: '50%', top: '15%', size: '1.6rem', delay: 1.5 },
    ];

    positions.forEach(function (pos) {
      var paw = document.createElement('div');
      paw.className = 'floating-paw';
      paw.textContent = '🐾';
      paw.style.left = pos.left;
      paw.style.top = pos.top;
      paw.style.fontSize = pos.size;
      paw.style.color = 'rgba(255,255,255,0.08)';
      paw.style.animationDelay = pos.delay + 's';
      hero.appendChild(paw);
    });
  }

  // ===========================================
  // SMOOTH SCROLLBAR (Optional enhancement)
  // ===========================================
  function initSmoothBody() {
    // Add will-change to body for GPU acceleration
    document.body.style.willChange = 'scroll-position';
  }

  // ===========================================
  // INITIALIZE EVERYTHING
  // ===========================================
  function init() {
    initSmoothBody();
    initHeroReveal();
    initNavbar();
    initMobileNav();
    initPawTrail();
    initSmoothScroll();
    initContactForm();
    initPageTransitions();
    initFloatingPaws();
    initLightbox();
    initStickyLogo(); // Morph logo into navbar

    // Delay GSAP ScrollTrigger animations to prevent flash
    setTimeout(function () {
      initTypographyMasking();
      initCinematicImageUnveils();
      initStaggeredReveals();
      initGenericReveals();
      initScrollVelocityDistortions();

      // Refresh ScrollTrigger after all setup
      ScrollTrigger.refresh();
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

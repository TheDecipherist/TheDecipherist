// scroll-animations.js — runs after HTML is parsed (defer)
(function () {
  if (typeof anime === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var IO_OPTS = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };

  // ─── Observe a single element, fire once ──────────────────────────────────
  function observe(el, opts, fn) {
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        fn(el);
      });
    }, opts || IO_OPTS);
    io.observe(el);
  }

  // ─── Article cards — slide up, stagger by column ──────────────────────────
  var articleCards = document.querySelectorAll('.article-card');
  anime.set(articleCards, { opacity: 0, translateY: 56 });

  Array.from(articleCards).forEach(function (el) {
    observe(el, IO_OPTS, function (target) {
      var col = Math.round(target.getBoundingClientRect().left / (target.offsetWidth + 1));
      anime({
        targets: target, opacity: [0, 1], translateY: [56, 0],
        duration: 680, delay: col * 80, easing: 'cubicBezier(0.16,1,0.3,1)',
      });
    });
  });

  // ─── Repo cards — bounce up (slight overshoot) ────────────────────────────
  var repoCards = document.querySelectorAll('.repo-card');
  anime.set(repoCards, { opacity: 0, translateY: 56 });

  Array.from(repoCards).forEach(function (el) {
    observe(el, IO_OPTS, function (target) {
      var col = Math.round(target.getBoundingClientRect().left / (target.offsetWidth + 1));
      anime({
        targets: target, opacity: [0, 1], translateY: [56, 0],
        duration: 600, delay: col * 70, easing: 'cubicBezier(0.34,1.56,0.64,1)',
      });
    });
  });

  // ─── Project items — split entrance: info from left, visual from right ────
  // Lower threshold — items are tall so use a gentler trigger
  var PROJECT_IO = { threshold: 0.06, rootMargin: '0px 0px -40px 0px' };

  document.querySelectorAll('.project-item').forEach(function (item) {
    var info   = item.querySelector('.project-item__info');
    var visual = item.querySelector('.project-item__visual');

    if (info)   anime.set(info,   { opacity: 0, translateX: -70 });
    if (visual) anime.set(visual, { opacity: 0, translateX:  70 });

    observe(item, PROJECT_IO, function () {
      if (info) {
        anime({
          targets: info, opacity: [0, 1], translateX: [-70, 0],
          duration: 1100, easing: 'cubicBezier(0.16,1,0.3,1)',
        });
      }
      if (visual) {
        anime({
          targets: visual, opacity: [0, 1], translateX: [70, 0],
          duration: 1100, delay: 150, easing: 'cubicBezier(0.16,1,0.3,1)',
        });
      }
    });
  });

  // ─── Stat items — spring pop per item ────────────────────────────────────
  var statItems = document.querySelectorAll('.stat-item');
  anime.set(statItems, { opacity: 0, translateY: 40 });

  Array.from(statItems).forEach(function (el) {
    observe(el, IO_OPTS, function (target) {
      var col = Math.round(target.getBoundingClientRect().left / (target.offsetWidth + 1));
      anime({
        targets: target, opacity: [0, 1], translateY: [40, 0],
        duration: 600, delay: col * 70, easing: 'spring(1,82,12,0)',
      });
    });
  });

  // ─── Section headings ─────────────────────────────────────────────────────
  var heads = document.querySelectorAll('.section__heading');
  anime.set(heads, { opacity: 0, translateY: 48 });
  Array.from(heads).forEach(function (el) {
    observe(el, IO_OPTS, function (target) {
      anime({ targets: target, opacity: [0, 1], translateY: [48, 0],
              duration: 750, easing: 'cubicBezier(0.16,1,0.3,1)' });
    });
  });

  var subs = document.querySelectorAll('.section__subheading');
  anime.set(subs, { opacity: 0, translateY: 28 });
  Array.from(subs).forEach(function (el) {
    observe(el, IO_OPTS, function (target) {
      anime({ targets: target, opacity: [0, 1], translateY: [28, 0],
              duration: 650, delay: 90, easing: 'cubicBezier(0.16,1,0.3,1)' });
    });
  });

  // ─── Category labels ──────────────────────────────────────────────────────
  var labels = document.querySelectorAll('.articles-category__label');
  anime.set(labels, { opacity: 0, translateX: -28 });
  Array.from(labels).forEach(function (el) {
    observe(el, IO_OPTS, function (target) {
      anime({ targets: target, opacity: [0, 1], translateX: [-28, 0],
              duration: 500, easing: 'cubicBezier(0.16,1,0.3,1)' });
    });
  });

  // ─── About section ────────────────────────────────────────────────────────
  var ABOUT_IO = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

  // Bio paragraphs — fade up + blur dissolve
  var bios = document.querySelectorAll('.about__bio');
  anime.set(bios, { opacity: 0, translateY: 32 });
  Array.from(bios).forEach(function (el) {
    observe(el, ABOUT_IO, function (target) {
      anime({
        targets: target,
        opacity: [0, 1],
        translateY: [32, 0],
        duration: 900,
        easing: 'cubicBezier(0.16,1,0.3,1)',
      });
    });
  });

  // Tool badges — spring cascade, each badge pops in from scale 0
  var toolList = document.querySelector('.about__tools');
  if (toolList) {
    var badges = toolList.querySelectorAll('.about__tool-badge');
    anime.set(badges, { opacity: 0, scale: 0.5, translateY: 12 });
    observe(toolList, ABOUT_IO, function () {
      anime({
        targets: badges,
        opacity: [0, 1],
        scale: [0.5, 1],
        translateY: [12, 0],
        duration: 480,
        delay: anime.stagger(65, { easing: 'easeOutQuad' }),
        easing: 'spring(1,80,14,0)',
      });
    });
  }

  // DL stats — each row (dt + dd pair) slides in staggered
  var aboutDl = document.querySelector('#about dl');
  if (aboutDl) {
    var dlItems = aboutDl.querySelectorAll('dt, dd');
    anime.set(dlItems, { opacity: 0, translateX: -24 });
    observe(aboutDl, ABOUT_IO, function () {
      anime({
        targets: dlItems,
        opacity: [0, 1],
        translateX: [-24, 0],
        duration: 550,
        delay: anime.stagger(45, { easing: 'easeOutQuad' }),
        easing: 'cubicBezier(0.16,1,0.3,1)',
      });
    });
  }

  // Portrait — zoom-out entrance: starts slightly enlarged, lands at 1.0
  var portrait = document.querySelector('.about__portrait');
  if (portrait) {
    anime.set(portrait, { opacity: 0, scale: 1.08 });
    observe(portrait, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }, function (target) {
      anime({
        targets: target,
        opacity: [0, 1],
        scale: [1.08, 1],
        duration: 1100,
        easing: 'cubicBezier(0.16,1,0.3,1)',
      });
    });
  }
})();

// main.js — primary ES module
// type="module" is deferred by default — no extra defer needed

// 1. Nav scroll state
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 2. Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navLinks  = document.querySelector('.nav__links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('nav__links--open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
}

// 3. Hero headline cipher scramble (GSAP ScrambleText)
function initScramble() {
  if (typeof gsap === 'undefined' || typeof ScrambleTextPlugin === 'undefined') return;
  gsap.registerPlugin(ScrambleTextPlugin);
  const headline = document.querySelector('[data-scramble]');
  if (!headline) return;
  const original = headline.textContent.trim();
  gsap.to(headline, {
    duration: 2.4,
    scrambleText: {
      text: original,
      chars: '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      revealDelay: 0.3,
      speed: 0.7,
    },
    ease: 'none',
    delay: 0.5,
  });
}

// GSAP may load after module — wait for it
if (typeof gsap !== 'undefined') {
  initScramble();
} else {
  window.addEventListener('load', initScramble, { once: true });
}

// 4. Hover-triggered prefetch for internal links
const prefetched = new Set();
document.addEventListener('mouseover', (e) => {
  const a = e.target.closest('a[href^="/"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (prefetched.has(href)) return;
  prefetched.add(href);
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  link.as = 'document';
  document.head.appendChild(link);
}, { passive: true });

// 5. Project card 3D tilt
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.setProperty('--tilt-y', `${x * 12}deg`);
    card.style.setProperty('--tilt-x', `${-y * 12}deg`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--tilt-x', '0deg');
  });
});

// 6. Project detail panel toggle
document.querySelectorAll('[data-toggle-detail]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-toggle-detail');
    const panel = document.getElementById(targetId);
    if (!panel) return;
    const isOpen = panel.getAttribute('data-open') === 'true';
    panel.setAttribute('data-open', String(!isOpen));
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

// 7. Custom cursor (teal glow ring) — desktop only
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-ring';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.setProperty('--cursor-x', `${e.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${e.clientY}px`);
  }, { passive: true });

  // Grow cursor on interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [role="button"]')) {
      cursor.classList.add('cursor-ring--hover');
    } else {
      cursor.classList.remove('cursor-ring--hover');
    }
  }, { passive: true });
}

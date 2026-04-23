// main.js — primary ES module

// 1. Hero headline cipher scramble (GSAP ScrambleText)
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
  link.rel  = 'prefetch';
  link.href = href;
  link.as   = 'document';
  document.head.appendChild(link);
}, { passive: true });

// 5. Custom cursor (fine pointer / desktop only)
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-ring';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.setProperty('--cursor-x', `${e.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${e.clientY}px`);
  }, { passive: true });

  document.addEventListener('mouseover', (e) => {
    cursor.classList.toggle(
      'cursor-ring--hover',
      !!e.target.closest('a, button, [role="button"]')
    );
  }, { passive: true });
}

// 6. Houdini Paint Worklet
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('/js/cipher-grid.worklet.js');
}

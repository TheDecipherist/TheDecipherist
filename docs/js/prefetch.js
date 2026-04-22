// prefetch.js — hover-triggered prefetch for internal links
// Loaded as a module — can be imported by main.js or used standalone

export function initPrefetch() {
  const prefetched = new Set();

  const prefetch = (href) => {
    if (prefetched.has(href)) return;
    prefetched.add(href);
    const link = document.createElement('link');
    link.rel  = 'prefetch';
    link.href = href;
    link.as   = 'document';
    document.head.appendChild(link);
  };

  // Mouseenter — desktop
  document.addEventListener('mouseover', (e) => {
    const a = e.target.closest('a[href^="/"]');
    if (a) prefetch(a.getAttribute('href'));
  }, { passive: true });

  // Touchstart — mobile (fires before click)
  document.addEventListener('touchstart', (e) => {
    const a = e.target.closest('a[href^="/"]');
    if (a) prefetch(a.getAttribute('href'));
  }, { passive: true });
}

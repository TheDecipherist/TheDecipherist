// Vanilla JS cipher-scramble reveal — no GSAP dependency
(function () {
  var CHARS   = '0123456789ABCDEF░▒▓';
  var FINAL   = 'TheDecipherist';
  var CYCLES  = 10;
  var STEP    = 102;
  var STAGGER = 55;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rndChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function runTitle(el) {
    if (reducedMotion) {
      el.innerHTML = 'The<em>Decipherist</em>';
      el.classList.add('is-resolved');
      return;
    }

    var len        = FINAL.length;
    var current    = 0;      // index of the character currently being decoded
    var cyclesLeft = CYCLES; // scramble frames remaining before locking current char

    el.style.opacity    = '0';
    el.style.transition = 'opacity 0.3s ease';
    requestAnimationFrame(function () { el.style.opacity = '1'; });

    var interval = setInterval(function () {
      // Decrement scramble cycles for the active character
      if (cyclesLeft <= 0) {
        current++;
        cyclesLeft = CYCLES;
      } else {
        cyclesLeft--;
      }

      if (current >= len) {
        clearInterval(interval);
        el.innerHTML = 'The<em>Decipherist</em>';
        el.classList.add('is-resolved');
        runCipherReveal();
        return;
      }

      // Build display: resolved chars fixed, active + pending still scrambling
      var display = '';
      for (var i = 0; i < len; i++) {
        display += i < current ? FINAL[i] : rndChar();
      }
      el.textContent = display;
    }, STEP);
  }

  function runCipherReveal() {
    var inner = document.querySelector('.cipher-stream__inner');
    if (!inner) return;
    if (reducedMotion) return;

    var phrase = 'FULL-STACK ARCHITECT · BUILDER · CIPHER RESEARCHER · THE DECIPHERIST · ';

    setTimeout(function () {
      inner.style.transition = 'opacity 0.7s ease';
      inner.style.opacity    = '0';
      setTimeout(function () {
        inner.innerHTML     = '<span>' + phrase + '</span><span>' + phrase + '</span>';
        inner.style.opacity = '1';
      }, 720);
    }, 400);
  }

  function init() {
    var el = document.querySelector('.page-identity__title');
    if (!el) return;

    if (reducedMotion) {
      runTitle(el);
      return;
    }

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        runTitle(el);
      });
    }, { threshold: 0 });

    io.observe(el);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

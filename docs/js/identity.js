// Vanilla JS cipher-scramble reveal — no GSAP dependency
(function () {
  var CHARS  = '0123456789ABCDEF░▒▓';
  var FINAL  = 'TheDecipherist';
  var CYCLES = 10;    // random char swaps per position before resolving
  var STEP   = 42;    // ms between animation frames
  var STAGGER = 55;   // ms delay before each character starts resolving

  function rndChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function run() {
    var el = document.querySelector('.page-identity__title');
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.innerHTML = 'The<em>Decipherist</em>';
      el.classList.add('is-resolved');
      return;
    }

    var len = FINAL.length;
    // state per character: how many scramble cycles remain
    var remaining = [];
    var resolved  = [];
    for (var i = 0; i < len; i++) {
      remaining[i] = CYCLES + Math.floor(i * (STAGGER / STEP));
      resolved[i]  = false;
    }

    el.style.opacity = '0';
    // Fade in
    el.style.transition = 'opacity 0.3s ease';
    requestAnimationFrame(function () {
      el.style.opacity = '1';
    });

    var interval = setInterval(function () {
      var display = '';
      var allDone = true;

      for (var i = 0; i < len; i++) {
        if (resolved[i]) {
          display += FINAL[i];
        } else if (remaining[i] <= 0) {
          resolved[i] = true;
          display += FINAL[i];
        } else {
          remaining[i]--;
          display += rndChar();
          allDone = false;
        }
      }

      el.textContent = display;

      if (allDone) {
        clearInterval(interval);
        el.innerHTML = 'The<em>Decipherist</em>';
        el.classList.add('is-resolved');
      }
    }, STEP);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

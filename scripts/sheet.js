/* Verso — the sheet turns, and things rise into view. That's all the JS there is. */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- the signature element --------------------------------------
     The sheet turns once on its own, ~2.6s in. The idea has to land
     before we ask anyone to click. Then it turns back and waits. */
  var sheet = document.getElementById('sheet');
  if (sheet) {
    var turn = function () { sheet.classList.toggle('flip'); };

    sheet.addEventListener('click', turn);
    sheet.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); turn(); }
    });

    if (!reduce) {
      setTimeout(function () { sheet.classList.add('flip'); }, 2600);
      setTimeout(function () { sheet.classList.remove('flip'); }, 6200);
    }
  }

  /* --- scroll reveal ---------------------------------------------- */
  var targets = document.querySelectorAll('.vs-rise');
  if (!targets.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (!entry.isIntersecting) return;
      setTimeout(function () { entry.target.classList.add('in'); }, i * 90);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { io.observe(el); });
})();

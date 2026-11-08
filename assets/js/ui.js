/* ===========================================================
   JINYU Textile — shared UI script
   1) mobile nav drawer
   2) back-to-top button
   Tracking / consent / contact data stay inline in each page.
   =========================================================== */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  function initNav() {
    var nav = document.querySelector('.site-nav');
    var toggle = document.querySelector('.nav-toggle');
    if (!nav || !toggle) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.nav-links a')) {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && nav.classList.contains('menu-open')) {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- back to top ---- */
  function initBackTop() {
    var btn = document.querySelector('.back-top');
    if (!btn) return;

    function sync() {
      if (window.pageYOffset > 240) btn.classList.add('show');
      else btn.classList.remove('show');
    }

    window.addEventListener('scroll', sync, { passive: true });
    sync();

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- expose helper: main WhatsApp number ---- */
  window.jinyuWaLink = function (text) {
    var num = window.__jinyuMainWa || '8618174810606';
    return 'https://wa.me/' + num + (text ? '?text=' + encodeURIComponent(text) : '');
  };

  function boot() {
    initNav();
    initBackTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

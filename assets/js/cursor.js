/* THE CONTEXT WINDOW — cursor.js
   STATUS: in use.

   NOTE ON FILENAME: the design spec named this file for the
   terminal bar cursor blink, but that blink is handled entirely
   via CSS (@keyframes blink in base.css) and needs no JS. The
   spec also lists this file as a candidate for general "scroll
   behaviour" JS, so it has been repurposed for that role rather
   than introducing a fifth, unlisted JS file. It now handles:

   1. Nav hide-on-scroll-down / reveal-on-scroll-up
   2. Mobile hamburger menu toggle

   Flagged per output rules as a deviation from the literal file
   description, not from the file's presence in the structure.
*/

(function () {
  'use strict';

  /* ---- 0. Set --terminal-bar-height precisely from actual
     rendered height, rather than relying on a hardcoded CSS
     guess that can drift out of sync with font/padding changes. ---- */
  var terminalBar = document.querySelector('.terminal-bar');

  function setTerminalBarHeight() {
    if (terminalBar) {
      var height = terminalBar.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        '--terminal-bar-height',
        height + 'px'
      );
    }
  }

  setTerminalBarHeight();
  window.addEventListener('resize', setTerminalBarHeight);

  /* ---- shared element references ---- */
  var nav = document.querySelector('.site-nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  /* ---- 1. Nav hide/show on scroll direction ---- */
  if (nav) {
    var lastScrollY = window.scrollY;
    var scrollThreshold = 10; // ignore tiny jitters
    var hideAfter = 80; // don't hide until past this scroll depth

    window.addEventListener('scroll', function () {
      var currentScrollY = window.scrollY;
      var delta = currentScrollY - lastScrollY;

      // don't hide the nav while the mobile menu is open —
      // otherwise an open dropdown slides off-screen mid-interaction
      if (navLinks && navLinks.classList.contains('nav-open')) {
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(delta) < scrollThreshold) {
        return;
      }

      if (currentScrollY > hideAfter && delta > 0) {
        // scrolling down past threshold — hide nav
        nav.classList.add('nav-hidden');
      } else if (delta < 0) {
        // scrolling up — reveal nav
        nav.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  /* ---- 2. Hamburger menu toggle ---- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // close menu when a link is tapped (mobile UX)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();


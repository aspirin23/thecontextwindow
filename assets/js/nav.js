// THE CONTEXT WINDOW — nav.js
// Handles the mobile hamburger toggle and the Find Me
// dropdown's tap-to-open behaviour on touch devices.
// Desktop dropdown open/close is pure CSS (:hover / :focus-within)
// — this file only adds the JS needed where hover doesn't exist.

document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var dropdown = document.querySelector('.nav-dropdown');
  var dropdownTrigger = document.querySelector('.nav-dropdown-trigger');

  if (dropdown && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', function (event) {
      event.stopPropagation();
      var isOpen = dropdown.classList.toggle('is-open');
      dropdownTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the dropdown if the user taps/clicks anywhere outside it
    document.addEventListener('click', function (event) {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('is-open');
        dropdownTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

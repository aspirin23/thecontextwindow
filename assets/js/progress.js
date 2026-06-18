/* THE CONTEXT WINDOW — progress.js
   Reading progress bar for issue pages.

   Tracks scroll progress through .issue-body specifically —
   not the full document — so the footer and end-matter don't
   skew the bar toward "100% read" before the essay is actually
   finished.

   Visibility: hidden at rest and at the very top of the page.
   Becomes visible only once the reader has scrolled into the
   essay body at all (decision: appear on scroll, not sit empty
   at top). Hides again if they scroll back above the body.

   No-ops harmlessly on any page that doesn't have both
   .reading-progress-fill and .issue-body (i.e. every page
   except issue pages).
*/

(function () {
  'use strict';

  var fill = document.querySelector('.reading-progress-fill');
  var body = document.querySelector('.issue-body');

  if (!fill || !body) {
    return;
  }

  function updateProgress() {
    var rect = body.getBoundingClientRect();
    var bodyTop = rect.top + window.scrollY;
    var bodyHeight = body.offsetHeight;
    var viewportHeight = window.innerHeight;
    var scrollY = window.scrollY;

    // Distance scrolled past the body's top edge.
    var scrolledPast = scrollY - bodyTop;

    // Total scrollable distance across the body: its full height
    // minus one viewport, since the bar should reach 100% once
    // the body's bottom edge reaches the bottom of the viewport,
    // not only once the page can scroll no further.
    var scrollableDistance = bodyHeight - viewportHeight;

    var percent;

    if (scrolledPast <= 0) {
      // Haven't reached the essay body yet.
      percent = 0;
    } else if (scrollableDistance <= 0) {
      // Body is shorter than the viewport — treat any entry as complete.
      percent = 100;
    } else {
      percent = (scrolledPast / scrollableDistance) * 100;
      if (percent > 100) percent = 100;
    }

    fill.style.width = percent + '%';

    if (scrolledPast > 0) {
      fill.classList.add('is-visible');
    } else {
      fill.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  updateProgress();
})();

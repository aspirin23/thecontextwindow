/* THE CONTEXT WINDOW — cursor.js
   STATUS: intentionally empty.

   The terminal bar's blinking cursor is handled entirely via CSS
   (@keyframes blink in base.css) — no JS required for it.

   HISTORY: this file previously held nav scroll-hide-on-scroll
   and hamburger-toggle logic, dating from before the terminal
   bar and site nav were merged into a single bar. That logic
   has been removed for the following reasons:

   1. Hamburger toggle was DUPLICATED in nav.js, causing both
      scripts to attach a click listener to the same button —
      a single tap toggled the menu open then immediately closed
      it again. nav.js is the correct, sole owner of that logic
      now (it also owns the Find Me dropdown, so hamburger
      handling lives alongside related nav interaction code).

   2. The scroll-hide/reveal behaviour targeted `.site-nav`, a
      class removed when the nav was merged into `.terminal-bar`.
      That code was already dead (querySelector returned null on
      every page). Decision made this session: do NOT port this
      behaviour to the merged bar — the terminal bar stays fixed
      and always visible. If this is revisited later, scroll-hide
      logic should be added fresh, scoped to `.terminal-bar`, and
      should live in nav.js alongside the rest of nav behaviour
      rather than back in this file.

   3. setTerminalBarHeight() measured `.terminal-bar` height and
      wrote it to a `--terminal-bar-height` CSS custom property.
      That property was removed from layout.css during the same
      merge and is no longer referenced anywhere in CSS, so the
      measurement had no consumer. Removed as dead code.

   This file is kept in the project (rather than deleted) only
   because it's named in the original file/folder structure spec.
   If a future feature genuinely needs cursor-specific JS, it
   belongs here. Until then, there is nothing to do in this file.
*/

/* THE CONTEXT WINDOW — cursor.js
   Typewriter effect for the terminal bar prompt.

   On load, the prompt text (e.g. "> loading consciousness...")
   types itself out over ~800ms, then the CSS blinking cursor
   carries on as before. The full text is present in the DOM
   (SEO / no-JS safe) — we type by revealing, not by inserting.

   Respects prefers-reduced-motion: users who opt out of motion
   see the prompt fully rendered immediately, no typing.

   The blinking cursor itself remains pure CSS
   (@keyframes blink in base.css). */

document.addEventListener('DOMContentLoaded', function () {
  var prompt = document.querySelector('.terminal-prompt');
  if (!prompt) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // The prompt contains a text node followed by the cursor span.
  // Type out only the text node, leaving the cursor untouched.
  var textNode = null;
  for (var i = 0; i < prompt.childNodes.length; i++) {
    var node = prompt.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
      textNode = node;
      break;
    }
  }
  if (!textNode) return;

  // Collapse the HTML source's indentation whitespace so we
  // don't spend ticks "typing" invisible characters.
  var fullText = textNode.textContent.replace(/\s+/g, ' ').trim();
  var duration = 800;
  var interval = Math.max(duration / fullText.length, 16);
  var shown = 0;

  textNode.textContent = '';

  var timer = setInterval(function () {
    shown++;
    textNode.textContent = fullText.slice(0, shown);
    if (shown >= fullText.length) {
      clearInterval(timer);
    }
  }, interval);
});

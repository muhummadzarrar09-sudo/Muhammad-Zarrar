// Theme initialization — runs before React to prevent flash of wrong theme.
// Reads localStorage("theme") and applies .light/.dark class on <html>.
// If "system" (or missing), lets CSS prefers-color-scheme handle it.
(function () {
  var t = localStorage.getItem("theme");
  if (t === "light" || t === "dark") {
    document.documentElement.classList.add(t);
  }
})();

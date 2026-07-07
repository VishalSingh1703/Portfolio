/**
 * Smooth-scroll to a section and flash it briefly so heatmap jumps
 * (which can land anywhere on the page) aren't disorienting.
 */
export function scrollToSection(id: string, { flash = false } = {}): void {
  const el = document.getElementById(id);
  if (!el) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  if (flash) {
    // retrigger the CSS animation even on repeated jumps to the same section
    el.classList.remove("section-flash");
    // force reflow so the class re-application restarts the animation
    void el.offsetWidth;
    el.classList.add("section-flash");
    window.setTimeout(() => el.classList.remove("section-flash"), 1500);
  }
}

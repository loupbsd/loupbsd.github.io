/* =========================================================================
   lap.js — direction of the slide between two sectors (pages)

   The 6 tabs are the 6 sectors of a lap: S1 Welcome … S6 Career
   (each page says which one it is in <html data-sector="n">).
   The slide itself is done in CSS (style.css, section 15, View Transitions).
   This file only tells the new page where the visitor comes from:
   a later sector slides in from the right, an earlier one from the left,
   and S6 → S1 continues the lap (from the right too).

   Loaded in <head> WITHOUT "defer": the "pagereveal" event fires before the
   new page is shown, so the listener must exist by then.
   Browsers without View Transitions never fire these events: nothing happens.
   ========================================================================= */
(() => {
  const sector = Number(document.documentElement.dataset.sector) || 0;

  // Old page, just before it is left: remember its sector
  window.addEventListener("pageswap", (event) => {
    if (!event.viewTransition) return;
    try {
      sessionStorage.setItem("lap-from", String(sector));
    } catch (error) {
      // Storage blocked (private mode): the page will simply fade instead of sliding
    }
  });

  // New page, just before it is shown: choose the direction of the slide
  window.addEventListener("pagereveal", (event) => {
    if (!event.viewTransition || !event.viewTransition.types) return;

    let from = 0;
    try {
      from = Number(sessionStorage.getItem("lap-from")) || 0;
      sessionStorage.removeItem("lap-from");
    } catch (error) {
      return;
    }

    // Unknown origin, or same sector in the other language (EN ⇄ FR): simple fade
    if (!from || !sector || from === sector) return;

    let forward = sector > from;
    if (Math.abs(sector - from) === 5) forward = sector === 1;   // S6 → S1 = next lap
    event.viewTransition.types.add(forward ? "forward" : "backward");
  });
})();

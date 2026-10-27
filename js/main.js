/* =========================================================================
   main.js — small interactions only. The site works without it.
   1. Menu (full screen on phones and tablets)
   2. Theme toggle (light / dark, remembered in localStorage)
   3. Open a project card when the URL points to it (e.g. #strudel)
   4. Career page: highlight the current section in the table of contents
   5. Telemetry trace in the header, filled as you scroll
   6. Changing sector with the keyboard: ← →
   7. Chapters: the header and the engine drawing follow the tone below them
   8. Load the neighbouring sectors in advance (instant slide)
   9. Contact pop-up (email and phone number)
   The direction of the slide between pages is in js/lap.js.
   ========================================================================= */

/* 1. Menu (full screen on phones and tablets) ---------------------------- */
// While the menu is open, the rest of the page is "inert": it cannot be
// clicked and the Tab key skips it, so keyboard users stay in the menu.
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  const pageParts = document.querySelectorAll("main, .site-footer");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    document.documentElement.classList.toggle("menu-open", open);
    pageParts.forEach((part) => {
      part.inert = open;
    });
  }

  menuButton.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    setMenu(open);
    if (open) nav.querySelector("a").focus();
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });

  // Close it when a sector is chosen (the page then slides to it),
  // and when the screen gets wide enough to show the full nav
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  window.matchMedia("(min-width: 1024px)").addEventListener("change", () => setMenu(false));
}

/* 2. Theme toggle ------------------------------------------------------ */
// The saved theme is applied earlier by the small script in each <head>,
// so the page never flashes the wrong theme. Here we only handle the click.
// Without a saved choice, the current theme is the one of the OS.
// There can be two buttons (header + phone menu): they do the same thing.
document.querySelectorAll(".theme-toggle").forEach((themeButton) => {
  themeButton.addEventListener("click", () => {
    const root = document.documentElement;
    const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.dataset.theme || (osDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Storage can be blocked (private mode): the toggle still works for this page
    }
  });
});

/* 3. Open a <details> card targeted by the URL --------------------------- */
// A link to engineering.html#strudel opens the Strudel card automatically.
function openTargetedCard() {
  if (!location.hash) return;
  const target = document.getElementById(location.hash.slice(1));
  if (target && target.tagName === "DETAILS") {
    target.open = true;
  }
}

openTargetedCard();
window.addEventListener("hashchange", openTargetedCard);

/* 4. Career page: active link in the table of contents ------------------- */
const tocLinks = document.querySelectorAll(".toc a");

if (tocLinks.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      tocLinks.forEach((link) => {
        link.classList.toggle("is-active", link.hash === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" }); // a section is "current" near the top third

  tocLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) sectionObserver.observe(section);
  });
}

/* 5. Telemetry trace ------------------------------------------------------ */
// A gentle speed trace over one lap, like the line of a circuit seen from the
// side: long smooth rises on the straights, soft dips into the corners.
// Each point is [distance along the lap (0–1000), speed (0–1)]; between two
// points the trace follows an S-curve, so there is never a sharp angle.
const LAP = [
  [0, 0.55], [140, 0.9], [220, 0.85], [300, 0.35], [380, 0.7], [440, 0.55],
  [540, 0.9], [610, 0.8], [690, 0.3], [790, 0.8], [850, 0.6], [930, 0.85], [1000, 0.55],
];

// Turns LAP into a list of [x, y] points in the SVG (fast = high = small y)
function lapPoints(height) {
  const y = (speed) => height - 1 - speed * (height - 2);
  const points = [[0, y(LAP[0][1])]];
  for (let i = 1; i < LAP.length; i++) {
    const [x0, v0] = LAP[i - 1];
    const [x1, v1] = LAP[i];
    for (let t = 0.05; t <= 1.001; t += 0.05) {
      const ease = t * t * (3 - 2 * t);   // "smoothstep": flat at both ends, no corner
      points.push([x0 + (x1 - x0) * t, y(v0 + (v1 - v0) * ease)]);
    }
  }
  return points;
}

// Height of the trace at a given x (linear interpolation between two points)
function heightAt(points, x) {
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (x <= x1) return y0 + (y1 - y0) * ((x - x0) / (x1 - x0 || 1));
  }
  return points[points.length - 1][1];
}

const header = document.querySelector(".site-header");

if (header) {
  const H = 8;                     // height of the trace (px): a low, gentle line
  const NS = "http://www.w3.org/2000/svg";
  const points = lapPoints(H);
  const d = "M" + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(2)}`).join(" L");

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "telemetry");
  svg.setAttribute("viewBox", `0 0 1000 ${H}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML = `
    <defs><clipPath id="telemetry-clip"><rect width="0" height="${H}"/></clipPath></defs>
    <path class="telemetry__base" d="${d}"/>
    <path class="telemetry__live" d="${d}" clip-path="url(#telemetry-clip)"/>`;

  // The car is a separate element so that it keeps its proportions (the trace
  // itself is stretched to the full width of the screen). Its silhouette comes
  // from assets/img/porsche-911.svg, used as a CSS mask (see .telemetry__car).
  const car = document.createElement("span");
  car.className = "telemetry__car";
  car.setAttribute("aria-hidden", "true");

  header.append(svg, car);
  document.documentElement.classList.add("has-telemetry");

  // The violet part follows the reading progress (0 % at the top, 100 % at the bottom),
  // and the car drives at the end of it, wheels on the line.
  const clipRect = svg.querySelector("rect");
  const CAR_W = 63;                // displayed size: 63 x 20 px (see CSS)
  const CAR_WHEEL_BOTTOM = 20;     // the wheels touch the bottom of the drawing
  let ticking = false;

  function updateTelemetry() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 1;
    const x = progress * 1000;
    clipRect.setAttribute("width", x.toFixed(1));

    // Front of the car at the end of the violet line, kept inside the screen
    const width = svg.clientWidth;
    const left = Math.min(Math.max(0, progress * width - CAR_W * 0.85), width - CAR_W);
    const svgTop = svg.getBoundingClientRect().top - header.getBoundingClientRect().top;
    const lineY = svgTop + heightAt(points, x) * (svg.clientHeight / H);
    car.style.transform = `translate(${left.toFixed(1)}px, ${(lineY - CAR_WHEEL_BOTTOM).toFixed(1)}px)`;

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateTelemetry); // at most one update per frame
    }
  }, { passive: true });
  window.addEventListener("resize", updateTelemetry);
  updateTelemetry();
}

/* 6. Changing sector with the keyboard: ← → ---------------------------- */
// The 6 tabs are the 6 sectors of a lap. The ‹ › arrows of the header are normal
// links (rel="prev" / rel="next"), so they work without JavaScript; here we only
// add a keyboard shortcut. (Gestures will come with the continuous scroll.)
const prevSector = document.querySelector('.site-header a[rel="prev"]');
const nextSector = document.querySelector('.site-header a[rel="next"]');

// Places where the arrow keys already have a meaning
const OWN_KEYS = "input, textarea, select, [contenteditable], audio, video, dialog";

// True if the element is inside something that scrolls sideways
// (e.g. the table of contents of the Career page on phones)
function inSideScroller(element) {
  for (let el = element; el && el !== document.body; el = el.parentElement) {
    const overflow = getComputedStyle(el).overflowX;
    if ((overflow === "auto" || overflow === "scroll") && el.scrollWidth > el.clientWidth) return true;
  }
  return false;
}

if (prevSector && nextSector) {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    // Alt + ← is the browser's "Back": never take over a shortcut that uses a modifier key
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) return;
    if (event.target.closest(OWN_KEYS) || inSideScroller(event.target)) return;
    window.location.href = (event.key === "ArrowRight" ? nextSector : prevSector).href;
  });
}

/* 7. Chapters: header and engine drawing follow the tone below them ------- */
// Each chapter has data-tone="paper", "sand" or "ink" (colours: style.css, section 13).
// The header takes the tone of what is just under it, and the engine drawing
// the tone of the middle of the screen (it turns light violet on dark chapters).
function toneAt(y) {
  const element = document.elementFromPoint(window.innerWidth / 2, y);
  const chapter = element && element.closest("main [data-tone], .site-footer[data-tone]");
  return chapter ? chapter.dataset.tone : "paper";
}

if (header && document.querySelector("main [data-tone]")) {
  let toneTicking = false;

  function updateTones() {
    toneTicking = false;
    if (document.documentElement.classList.contains("menu-open")) return;
    header.dataset.tone = toneAt(header.offsetHeight + 1);
    document.documentElement.dataset.viewTone = toneAt(window.innerHeight / 2);
  }

  window.addEventListener("scroll", () => {
    if (!toneTicking) {
      toneTicking = true;
      requestAnimationFrame(updateTones); // at most one update per frame
    }
  }, { passive: true });
  window.addEventListener("resize", updateTones);
  updateTones();
}

/* 8. Load the neighbouring sectors in advance ------------------------------ */
// "Speculation rules" (Chrome, Edge): when the mouse rests on a link to another
// sector, the browser fetches that page early, so the slide starts at once.
// Other browsers ignore this.
if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
  const rules = document.createElement("script");
  rules.type = "speculationrules";
  rules.textContent = JSON.stringify({
    prefetch: [{
      source: "document",
      where: { selector_matches: ".site-nav a, .lap-arrow, .sector-exit a" },
      eagerness: "moderate",
    }],
  });
  document.head.append(rules);
}

/* 9. Contact pop-up ---------------------------------------------------------- */
// Every "Contact" link (contact bar, footer) carries data-contact: it opens the
// <dialog> with the email and phone number. Without JavaScript the same links
// simply open an email. The × button and the Escape key close it (native).
// A click on the email or the number copies it, and a short message confirms it.
const contactDialog = document.getElementById("contact-dialog");

if (contactDialog && contactDialog.showModal) {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-contact]");
    if (!link) return;
    event.preventDefault();
    contactDialog.showModal();
  });

  // A click on the dark backdrop, outside the box, closes it too
  contactDialog.addEventListener("click", (event) => {
    if (event.target === contactDialog) contactDialog.close();
  });

  const toast = contactDialog.querySelector(".contact-dialog__toast");
  let toastTimer;

  function showToast() {
    toast.textContent = toast.dataset.message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
  }

  // Copies at once with a hidden text field and the "copy" command: it works
  // in every browser without asking for any permission. Returns true if it worked.
  function copyNow(text) {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position: fixed; top: 0; opacity: 0;";
    contactDialog.append(field);            // inside the dialog, the only part that can take focus
    field.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    field.remove();
    return ok;
  }

  contactDialog.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      const text = button.dataset.copy;
      if (copyNow(text)) {
        showToast();
      } else if (navigator.clipboard) {
        // Newer clipboard API as a second try
        navigator.clipboard.writeText(text).then(showToast, () => getSelection().selectAllChildren(button));
      } else {
        getSelection().selectAllChildren(button);   // nothing worked: the text is selected, Ctrl+C does the rest
      }
      button.focus();
    });
  });
}

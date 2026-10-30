/* =========================================================================
   lap-scroll.js — the continuous scroll: the whole site visited by scrolling

   The 6 pages (S1 Welcome … S6 Career) stay separate HTML files: they are the
   source, and what you get without JavaScript, with reduced motion or in
   "classic reading". Here, the page that was opened loads the 5 others and
   puts them end to end, in the order of the lap. Then:
   - the browser's own scroll does everything (wheel, trackpad, finger, Space,
     Page Down…): nothing is re-implemented;
   - in the horizontal sectors (S2 … S6) the track of panels is pinned under the
     header, and the vertical scroll moves it to the left (one screen per panel);
     on phones (< 768 px) they stay vertical;
   - the address bar shows the sector being read (engineering.html…), the
     header follows it, and a click on a sector scrolls to it (Back works).

   1. Should the continuous scroll run?
   2. Assemble the lap (fetch the other pages, avoid duplicate ids)
   3. Horizontal tracks (pin, panels, gauge, phones, too-tall and too-empty panels)
   4. Which sector is being read: header, address, title
   5. Clicks on a sector, Back button, keyboard ← →, focus
   6. "Classic reading" switch
   ========================================================================= */
(() => {
  const FILES = ["index.html", "engineering.html", "mobility.html", "sustainability.html", "activities.html", "career.html"];
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const main = document.getElementById("main");
  const fr = root.lang === "fr";
  const start = Number(root.dataset.sector) || 0;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const phone = window.matchMedia("(max-width: 767px)");   // same limit as the CSS

  const TEXT = fr
    ? { classic: "Lecture classique", continuous: "Défilement continu", prev: "Secteur précédent : ", next: "Secteur suivant : " }
    : { classic: "Classic reading", continuous: "Continuous scroll", prev: "Previous sector: ", next: "Next sector: " };

  /* 1. Should the continuous scroll run? -------------------------------- */
  let mode = "continuous";
  try {
    mode = localStorage.getItem("lap-mode") || "continuous";
  } catch (error) {
    // Storage blocked: default mode
  }
  addReadingToggle(mode === "continuous" && !reduceMotion);
  if (!start || !main || !header || reduceMotion || mode === "classic" || !window.fetch || location.protocol === "file:") return;

  const sectors = [];      // the 6 <section class="sector">, in the order of the lap
  const titles = [];       // the <title> of each page
  const tracks = [];       // the horizontal tracks
  let current = start;

  /* 2. Assemble the lap ---------------------------------------------------- */
  // Wraps the content of a <main> in a <section class="sector">.
  // For the pages that were fetched, every id gets a prefix (s2-…) so that
  // two pages never share an id (both Mobility and Career have #next).
  function makeSector(n, mainElement, prefix) {
    const section = document.createElement("section");
    section.className = "sector";
    section.dataset.sector = n;
    section.setAttribute("aria-label", "S" + n);
    section.append(...mainElement.childNodes);
    if (prefix) {
      section.querySelectorAll("[id]").forEach((el) => { el.id = prefix + el.id; });
      section.querySelectorAll("[aria-labelledby]").forEach((el) => {
        el.setAttribute("aria-labelledby", prefix + el.getAttribute("aria-labelledby"));
      });
      section.querySelectorAll('a[href^="#"]').forEach((a) => {
        if (a.getAttribute("href").length > 1) a.setAttribute("href", "#" + prefix + a.getAttribute("href").slice(1));
      });
    }
    return section;
  }

  async function assemble() {
    // "no-cache": the browser asks the server whether each page changed (a short
    // "304" if not), so an updated page is never replaced by an old copy
    const others = FILES.map((file, i) => (i + 1 === start ? null
      : fetch(file, { cache: "no-cache" }).then((r) => (r.ok ? r.text() : Promise.reject(new Error(file))))));
    let pages;
    try {
      pages = await Promise.all(others);
    } catch (error) {
      return false;        // a page is missing (offline…): stay in page mode
    }

    const parser = new DOMParser();
    const firstTop = main.getBoundingClientRect().top;
    const kept = makeSector(start, main, "");
    titles[start - 1] = document.title;

    for (let i = 0; i < 6; i++) {
      if (i + 1 === start) {
        sectors.push(kept);
        continue;
      }
      const doc = parser.parseFromString(pages[i], "text/html");
      titles[i] = doc.title;
      sectors.push(makeSector(i + 1, doc.getElementById("main"), "s" + (i + 1) + "-"));
    }
    sectors.forEach((s, i) => s.setAttribute("aria-label", titles[i]));   // each sector is named by its page title

    // Insert everything, then keep the page that was opened exactly where it was
    main.append(...sectors);
    root.removeAttribute("data-sector");   // each sector now carries its own number
    root.classList.add("is-continuous");
    jumpTo(window.scrollY + kept.getBoundingClientRect().top - firstTop, false);
    return true;
  }

  /* 3. Horizontal tracks --------------------------------------------------- */
  function headerHeight() {
    return header.offsetHeight;
  }

  function contactBarHeight() {
    const bar = document.querySelector(".contact-bar");
    if (!bar) return 0;
    const r = bar.getBoundingClientRect();
    return r.top > window.innerHeight / 2 ? r.height : 0;   // only the bottom bar (phones)
  }

  function setupTrack(track) {
    const info = { track, pin: null, window: null, rail: null, gauge: null, n: 0 };
    tracks.push(info);
    pin(info);
  }

  // Panel too tall for the screen? (content would be cut: never allowed)
  // A .panel--scroll panel (Projects) scrolls inside itself: nothing is ever cut.
  function overflows(panel) {
    if (panel.classList.contains("panel--scroll")) return false;
    return panel.scrollHeight > panel.clientHeight + 2;
  }

  // Small screens (tablets, zoom): a panel that holds several groups (courses,
  // skills, trainings…) is split into one panel per group. The groups are moved, not copied.
  function split(info) {
    let changed = false;
    for (const panel of [...info.rail.children]) {
      if (!overflows(panel)) continue;
      const box = panel.querySelector(".course-groups, .skill-groups, .grid");
      const groups = box ? [...box.children].filter((el) => el.matches("div, article")) : [];
      if (groups.length < 2) continue;
      const title = panel.querySelector("h2") ? panel.querySelector("h2").firstChild.textContent.trim() : "";
      let after = panel;
      groups.slice(1).forEach((group, k) => {
        const extra = document.createElement("section");
        extra.className = "chapter panel";
        extra.dataset.tone = panel.dataset.tone;
        extra.setAttribute("aria-label", `${title} (${k + 2}/${groups.length})`);
        const container = document.createElement("div");
        container.className = "container";
        const reminder = document.createElement("p");
        reminder.className = "panel__continued";
        reminder.setAttribute("aria-hidden", "true");
        reminder.textContent = `${title} · ${k + 2}/${groups.length}`;
        const copyOfBox = document.createElement(box.tagName);
        copyOfBox.className = box.className;
        copyOfBox.append(group);
        container.append(reminder, copyOfBox);
        extra.append(container);
        after.after(extra);
        after = extra;
      });
      // Still too tall (title + intro + first group)? The first group gets its own panel too
      if (overflows(panel) && groups[0].parentNode === box) {
        const first = document.createElement("section");
        first.className = "chapter panel";
        first.dataset.tone = panel.dataset.tone;
        first.setAttribute("aria-label", `${title} (1/${groups.length})`);
        const container = document.createElement("div");
        container.className = "container";
        const copyOfBox = document.createElement(box.tagName);
        copyOfBox.className = box.className;
        copyOfBox.append(groups[0]);
        container.append(copyOfBox);
        first.append(container);
        panel.after(first);
      }
      changed = true;
    }
    return changed;
  }

  function layout(info) {
    const pinH = window.innerHeight - headerHeight() - contactBarHeight();
    info.n = info.rail.children.length;
    info.track.style.setProperty("--n", info.n);
    info.track.style.setProperty("--pin-h", pinH + "px");
    info.pinH = pinH;
    // One snap mark per panel
    info.track.querySelectorAll(".track__stop").forEach((el) => el.remove());
    for (let k = 0; k < info.n; k++) {
      const stop = document.createElement("span");
      stop.className = "track__stop";
      stop.setAttribute("aria-hidden", "true");
      stop.style.top = k * pinH + "px";
      info.track.prepend(stop);
    }
    info.gauge.innerHTML = "<i></i>".repeat(info.n) + `<span>1/${info.n}</span>`;
  }

  function pin(info) {
    const { track } = info;
    // Phones: every sector reads vertically (decided on 28/10/2026)
    if (phone.matches) {
      track.dataset.stacked = "phone: vertical reading";
      return;
    }
    info.pin = document.createElement("div");
    info.pin.className = "track__pin";
    info.window = document.createElement("div");
    info.window.className = "track__window";
    info.rail = document.createElement("div");
    info.rail.className = "track__rail";
    info.gauge = document.createElement("div");
    info.gauge.className = "track__gauge";
    info.gauge.setAttribute("aria-hidden", "true");
    info.rail.append(...track.querySelectorAll(":scope > .panel"));   // also the panels made by split()
    info.window.append(info.rail);
    info.pin.append(info.window, info.gauge);
    track.append(info.pin);
    track.classList.add("is-pinned");
    layout(info);

    // Content cut on this screen? Split the panels into groups (phones), then
    // give up and read the sector vertically if it is still too tall.
    if ([...info.rail.children].some(overflows) && split(info)) layout(info);
    const tooTall = [...info.rail.children].filter(overflows);
    if (tooTall.length) {
      // Kept on the track for whoever maintains the site: which panels did not fit
      track.dataset.stacked = tooTall.map((p) => `${(p.querySelector("h2, h3") || p).textContent.trim().slice(0, 30)} (${p.scrollHeight}/${p.clientHeight}px)`).join(" | ");
      unpin(info);
    } else {
      delete track.dataset.stacked;
      fill(info);
    }
  }

  // Panels with little content (a few lines on a big screen) look empty: their
  // content is enlarged as a whole (text, cards, images) with CSS zoom, up to x1.6,
  // as long as it fills at most 80 % of the panel. Recomputed with each layout.
  const FILL_MIN = 0.55;   // below this share of the height, a panel is "too empty"
  const FILL_MAX = 0.8;    // the enlarged content never takes more than this
  function fill(info) {
    for (const panel of info.rail.children) {
      const box = panel.querySelector(":scope > .container");
      if (!box || panel.classList.contains("panel--scroll")) continue;   // Projects: open cards grow
      unzoom(box);
      const style = getComputedStyle(panel);
      const room = panel.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      const width = box.getBoundingClientRect().width;   // the column, before zoom
      if (box.getBoundingClientRect().height > room * FILL_MIN) continue;
      for (let zoom = 1.6; zoom > 1.01; zoom -= 0.05) {
        box.style.zoom = zoom.toFixed(2);
        // Zoom enlarges the width too: keep the box in the same column (never wider,
        // so it never slides under the contact rail); the text gets bigger, not longer
        box.style.maxWidth = width / zoom + "px";
        const fits = box.getBoundingClientRect().height <= room * FILL_MAX
          && !overflows(panel) && panel.scrollWidth <= panel.clientWidth + 2;
        if (fits) break;
        unzoom(box);
      }
    }
  }

  function unzoom(box) {
    box.style.zoom = "";
    box.style.maxWidth = "";
  }

  function unpin(info) {
    const { track } = info;
    track.querySelectorAll(".panel > .container").forEach(unzoom);
    track.classList.remove("is-pinned");
    track.style.removeProperty("--n");
    track.style.removeProperty("--pin-h");
    track.querySelectorAll(".track__stop").forEach((el) => el.remove());
    track.append(...info.rail.children);
    info.pin.remove();
    info.pin = null;
  }


  // Moves the pinned tracks with the scroll
  function moveTracks() {
    for (const info of tracks) {
      if (!info.pin) continue;
      const top = info.track.getBoundingClientRect().top - headerHeight();
      const range = (info.n - 1) * info.pinH;
      const progress = Math.min(Math.max(-top / range, 0), 1);
      info.window.scrollLeft = progress * (info.n - 1) * info.pin.clientWidth;
      const index = Math.round(progress * (info.n - 1));
      info.gauge.querySelectorAll("i").forEach((bar, k) => bar.classList.toggle("is-on", k === index));
      info.gauge.querySelector("span").textContent = `${index + 1}/${info.n}`;
    }
  }

  // Scroll position that shows panel k of a pinned track
  function panelScrollY(info, k) {
    return info.track.getBoundingClientRect().top + window.scrollY - headerHeight() + k * info.pinH;
  }

  // Phones: a sideways swipe on a pinned track scrolls the page (so the panels move)
  function swipeOnTracks() {
    let last = null;
    let speed = 0;
    document.addEventListener("touchstart", (event) => {
      const pinEl = event.target.closest(".track__pin");
      last = pinEl && event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY, t: event.timeStamp, pin: pinEl, sideways: null } : null;
      speed = 0;
    }, { passive: true });
    document.addEventListener("touchmove", (event) => {
      if (!last) return;
      const t = event.touches[0];
      const dx = t.clientX - last.x;
      const dy = t.clientY - last.y;
      if (last.sideways === null && Math.abs(dx) + Math.abs(dy) > 8) last.sideways = Math.abs(dx) > Math.abs(dy);
      if (!last.sideways) return;
      const info = tracks.find((i) => i.pin === last.pin);
      const ratio = info.pinH / info.pin.clientWidth;
      window.scrollBy({ top: -dx * ratio, behavior: "instant" });
      speed = (-dx * ratio) / Math.max(event.timeStamp - last.t, 1);
      last.x = t.clientX;
      last.y = t.clientY;
      last.t = event.timeStamp;
    }, { passive: true });
    document.addEventListener("touchend", () => {
      if (last && last.sideways && Math.abs(speed) > 0.2) {
        window.scrollBy({ top: speed * 250, behavior: "smooth" });   // a little momentum
      }
      last = null;
    }, { passive: true });
  }

  /* 4. Which sector is being read ------------------------------------------ */
  const navLinks = [...header.querySelectorAll(".site-nav li a")];
  const prevArrow = header.querySelector('a[rel="prev"]');
  const nextArrow = header.querySelector('a[rel="next"]');
  const lapCount = header.querySelector(".lap-count");
  const otherLanguage = header.querySelector('.lang-switch a:not([aria-current])');

  // Screen readers hear the sector change (the gauge and the sector bar are visual)
  const announcer = document.createElement("p");
  announcer.className = "sr-only";
  announcer.setAttribute("role", "status");
  document.body.append(announcer);

  function setCurrent(n) {
    if (n === current) return;
    current = n;
    const i = n - 1;
    header.dataset.sector = n;
    navLinks.forEach((a, k) => (k === i ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    if (lapCount) lapCount.textContent = `S${n}/6`;
    const p = (i + 5) % 6;
    const q = (i + 1) % 6;
    prevArrow.href = FILES[p];
    prevArrow.setAttribute("aria-label", TEXT.prev + navLinks[p].textContent.trim());
    nextArrow.href = FILES[q];
    nextArrow.setAttribute("aria-label", TEXT.next + navLinks[q].textContent.trim());
    if (otherLanguage) otherLanguage.href = (fr ? "../" : "fr/") + FILES[i];
    document.title = titles[i];
    announcer.textContent = `S${n}/6 · ${navLinks[i].textContent.trim()}`;
    history.replaceState(history.state, "", FILES[i]);
  }

  function sectorAtTop() {
    const y = headerHeight() + 1;
    const found = sectors.find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= y && r.bottom > y;
    });
    return found ? Number(found.dataset.sector) : current;
  }

  // Ticks on the telemetry trace: where each sector starts on the whole lap
  function telemetryTicks() {
    const svg = header.querySelector(".telemetry");
    if (!svg) return;
    svg.querySelectorAll(".telemetry__tick").forEach((el) => el.remove());
    const max = document.documentElement.scrollHeight - window.innerHeight;
    sectors.slice(1).forEach((s) => {
      const x = Math.min(1000, ((s.getBoundingClientRect().top + window.scrollY - headerHeight()) / max) * 1000).toFixed(1);
      const tick = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tick.setAttribute("class", "telemetry__tick");
      tick.setAttribute("d", `M${x} 0 V${svg.viewBox.baseVal.height}`);
      svg.append(tick);
    });
  }

  /* 5. Clicks on a sector, Back button, keyboard, focus ---------------------- */
  // "engineering.html#strudel" → sector 2, element "s2-strudel" (or "strudel" in the page that was opened)
  function target(url) {
    const file = url.pathname.split("/").pop() || "index.html";
    const n = FILES.indexOf(file) + 1;
    if (!n) return null;
    const sector = sectors[n - 1];
    let el = sector;
    if (url.hash.length > 1) {
      const id = url.hash.slice(1);
      el = sector.querySelector("#" + CSS.escape(n === start ? id : `s${n}-${id}`)) || sector.querySelector("#" + CSS.escape(id)) || sector;
    }
    return { n, el };
  }

  // Programmatic jumps: pause the snapping, which would otherwise move the page
  // to the nearest chapter after the jump
  let jumpTimer;
  function jumpTo(y, smooth) {
    root.classList.add("is-jumping");
    window.scrollTo({ top: y, behavior: smooth ? "smooth" : "instant" });   // "auto" would follow the CSS (smooth)
    clearTimeout(jumpTimer);
    jumpTimer = setTimeout(() => root.classList.remove("is-jumping"), smooth ? 1200 : 150);
  }

  // True if the element sits inside something that scrolls sideways on its own
  // (a wide table, a code block): the arrow keys keep scrolling it. The pinned
  // tracks are ours and do not count.
  function inSideScroller(element) {
    for (let el = element; el && el !== document.body && !el.matches(".track"); el = el.parentElement) {
      const overflow = getComputedStyle(el).overflowX;
      if ((overflow === "auto" || overflow === "scroll") && el.scrollWidth > el.clientWidth) return true;
    }
    return false;
  }

  // After a jump by link, keyboard and screen-reader users start from the
  // destination: focus it without scrolling (the jump already does that)
  let focusedByJump = false;
  function focusTarget(el) {
    if (!el || !el.focus) return;
    if (!el.matches("a[href], button, input, summary, [tabindex]")) el.setAttribute("tabindex", "-1");
    focusedByJump = true;
    el.focus({ preventScroll: true });
    setTimeout(() => { focusedByJump = false; }, 0);
  }

  function scrollToTarget(t, smooth) {
    if (t.el.tagName === "DETAILS") t.el.open = true;
    let y = t.el.getBoundingClientRect().top + window.scrollY - headerHeight();
    const panel = t.el.closest(".track.is-pinned .panel");
    if (panel) {
      const info = tracks.find((i) => i.pin && i.pin.contains(panel));
      y = panelScrollY(info, [...info.rail.children].indexOf(panel));
    }
    const toc = t.el.closest(".sector") && t.el.closest(".sector").querySelector(".toc");
    if (toc && t.el !== t.el.closest(".sector") && t.el.compareDocumentPosition(toc) & Node.DOCUMENT_POSITION_PRECEDING) y -= toc.offsetHeight;
    jumpTo(y, smooth);
  }

  function listen() {
    document.addEventListener("click", (event) => {
      const a = event.target.closest("a[href]");
      if (!a || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (a.target === "_blank" || a.hasAttribute("download") || a.closest(".lang-switch, .skip-link")) return;
      const url = new URL(a.href, location.href);
      const here = new URL(".", location.href).href;
      if (url.origin !== location.origin || new URL(".", url).href !== here) return;
      const t = target(url);
      if (!t) return;
      event.preventDefault();
      history.pushState({ lap: true }, "", FILES[t.n - 1] + url.hash);
      scrollToTarget(t, true);
      focusTarget(t.el);
    });

    window.addEventListener("popstate", () => {
      const t = target(new URL(location.href));
      if (t) scrollToTarget(t, false);
    });

    // ← → : one panel in a pinned track, otherwise the previous / next sector.
    // Registered in the capture phase, so that main.js does not change page.
    document.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const from = event.target;
      if (from.closest && (from.closest("input, textarea, select, [contenteditable], audio, video, dialog") || inSideScroller(from))) return;
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      for (const info of tracks) {
        if (!info.pin) continue;
        const top = info.track.getBoundingClientRect().top - headerHeight();
        const k = Math.round(-top / info.pinH);
        if (top <= 1 && k >= 0 && k <= info.n - 1 && k + step >= 0 && k + step <= info.n - 1) {
          jumpTo(panelScrollY(info, k + step), true);
          return;
        }
      }
      const n = Math.min(Math.max(current + step, 1), 6);
      scrollToTarget({ n, el: sectors[n - 1] }, true);
    }, { capture: true });

    // Keyboard focus in a hidden panel: bring the panel to the screen
    document.addEventListener("focusin", (event) => {
      if (focusedByJump) return;   // the jump already placed the panel
      const panel = event.target.closest && event.target.closest(".track.is-pinned .panel");
      if (!panel) return;
      const info = tracks.find((i) => i.pin && i.pin.contains(panel));
      // After the browser's own "scroll the focused element into view"
      requestAnimationFrame(() => {
        info.pin.scrollLeft = 0;   // the browser may have scrolled the pin sideways
        jumpTo(panelScrollY(info, [...info.rail.children].indexOf(panel)), false);
      });
    });

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        moveTracks();
        setCurrent(sectorAtTop());
        ticking = false;
      });
    }, { passive: true });

    let resizeTimer;
    const relayout = () => {
      tracks.forEach((info) => {
        if (info.pin) unpin(info);
        pin(info);
      });
      moveTracks();
      telemetryTicks();
    };
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(relayout, 200);
    });
    // The web fonts change the size of the texts: measure the panels again once they are there
    if (document.fonts && document.fonts.status !== "loaded") {
      const place = sectors[current - 1];
      document.fonts.ready.then(() => {
        const before = place.getBoundingClientRect().top;
        relayout();
        jumpTo(window.scrollY + place.getBoundingClientRect().top - before, false);
      });
    }

    // A card that opens inside a panel may make it too tall: check again
    document.addEventListener("toggle", (event) => {
      const panel = event.target.closest && event.target.closest(".track.is-pinned .panel");
      if (!panel) return;
      const info = tracks.find((i) => i.pin && i.pin.contains(panel));
      if (overflows(panel)) unpin(info);
    }, true);
  }

  /* 6. "Classic reading" switch --------------------------------------------- */
  function addReadingToggle(continuousNow) {
    if (reduceMotion) return;   // with reduced motion the pages always stay separate
    const make = () => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "reading-toggle";
      button.textContent = continuousNow ? TEXT.classic : TEXT.continuous;
      button.addEventListener("click", () => {
        try {
          localStorage.setItem("lap-mode", continuousNow ? "classic" : "continuous");
        } catch (error) {
          return;
        }
        // Open again the page of the sector being read, at its start. The address
        // already names it (in the continuous scroll it follows the reading);
        // a new load without the #hash, rather than reload(), so that the browser
        // does not put back the old scroll position, which means nothing in the other mode.
        location.replace(location.pathname);
      });
      return button;
    };
    // In the phone menu, and always visible in the bottom right corner
    // (no longer in the footer: the corner button is enough, 28/10/2026)
    const menu = document.querySelector(".site-nav__extra");
    if (menu) menu.append(make());
    // Always visible: bottom right, in the contact bar strip (style.css, section 17).
    // Placed outside the bar itself: on computers the bar is a rail on the left.
    const corner = make();
    corner.classList.add("reading-toggle--corner");
    corner.insertAdjacentHTML("afterbegin", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + (continuousNow ? '<rect x="3" y="4" width="8" height="16" rx="1"/><rect x="13" y="4" width="8" height="16" rx="1"/>' : '<path d="M12 3v18M6 15l6 6 6-6"/>') + "</svg>");
    corner.setAttribute("aria-label", corner.textContent);
    corner.lastChild.replaceWith(Object.assign(document.createElement("span"), { textContent: corner.textContent }));
    document.body.append(corner);
  }

  // While the page is still settling (fonts, sizes of the sectors above), keep
  // the place that was opened at the same spot on the screen. Stops at the
  // visitor's first gesture, or after 4 s.
  function holdInPlace(el) {
    const offset = el.getBoundingClientRect().top;
    const observer = new ResizeObserver(() => {
      const drift = el.getBoundingClientRect().top - offset;
      if (Math.abs(drift) > 1) jumpTo(window.scrollY + drift, false);
    });
    observer.observe(main);
    const events = ["wheel", "touchstart", "keydown", "pointerdown"];
    const stop = () => {
      observer.disconnect();
      events.forEach((type) => window.removeEventListener(type, stop));
    };
    events.forEach((type) => window.addEventListener(type, stop, { passive: true }));
    setTimeout(stop, 4000);
  }

  /* Start ------------------------------------------------------------------- */
  assemble().then((ok) => {
    if (!ok) return;
    // The pinned tracks change the height of the sectors above: keep the view in place
    const kept = sectors[start - 1];
    const before = kept.getBoundingClientRect().top;
    main.querySelectorAll('.track[data-axis="h"]').forEach(setupTrack);
    jumpTo(window.scrollY + kept.getBoundingClientRect().top - before, false);
    // A link to a precise place (#strudel…): go there again, now that the lap is complete
    let hold = kept;
    if (location.hash.length > 1) {
      const t = target(new URL(location.href));
      if (t) {
        scrollToTarget(t, false);
        hold = t.el;
      }
    }
    holdInPlace(hold);
    header.dataset.sector = start;
    swipeOnTracks();
    listen();
    moveTracks();
    telemetryTicks();
    window.dispatchEvent(new Event("scroll"));   // telemetry, tones and header follow the new length
  });
})();

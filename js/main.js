/* =========================================================================
   main.js — small interactions only. The site works without it.
   1. Mobile menu
   2. Theme toggle (light / dark, remembered in localStorage)
   3. Open a project card when the URL points to it (e.g. #strudel)
   4. Career page: highlight the current section in the table of contents
   5. Telemetry trace in the header, filled as you scroll
   ========================================================================= */

/* 1. Mobile menu ------------------------------------------------------- */
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.focus();
    }
  });
}

/* 2. Theme toggle ------------------------------------------------------ */
// The saved theme is applied earlier by the small script in each <head>,
// so the page never flashes the wrong theme. Here we only handle the click.
// Without a saved choice, the current theme is the one of the OS.
const themeButton = document.querySelector(".theme-toggle");

if (themeButton) {
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
}

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
// A simplified speed trace over one lap: flat on the straights, sharp drops
// under braking, curved climbs when accelerating out of corners.
// Each point is [distance along the lap (0–1000), speed (0–1)].
// "a" = accelerating to this point (curve), otherwise a straight line.
const LAP = [
  [0, 0.45], [130, 0.95, "a"], [210, 0.97], [228, 0.32], [245, 0.32],
  [320, 0.78, "a"], [332, 0.56], [420, 0.92, "a"], [480, 0.94], [502, 0.24],
  [516, 0.24], [610, 0.86, "a"], [624, 0.62], [700, 0.9, "a"], [790, 0.96],
  [810, 0.4], [826, 0.4], [930, 0.88, "a"], [948, 0.5], [1000, 0.6, "a"],
];

// Turns LAP into a list of [x, y] points in the SVG (fast = high = small y)
function lapPoints(height) {
  const y = (speed) => height - 1 - speed * (height - 2);
  const points = [[0, y(LAP[0][1])]];
  for (let i = 1; i < LAP.length; i++) {
    const [x0, v0] = LAP[i - 1];
    const [x1, v1, kind] = LAP[i];
    if (kind === "a") {
      // Acceleration: quick gain at first, then slower (ease-out)
      for (let t = 0.125; t <= 1; t += 0.125) {
        const ease = 1 - Math.pow(1 - t, 2.2);
        points.push([x0 + (x1 - x0) * t, y(v0 + (v1 - v0) * ease)]);
      }
    } else {
      points.push([x1, y(v1)]);
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
  const H = 14;
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
  const logoMark = header.querySelector(".logo__mark");
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

    // On narrow screens the logo sits near the left edge: hide the car while it crosses it
    const logo = logoMark.getBoundingClientRect();
    car.classList.toggle("is-hidden", left < logo.right && left + CAR_W > logo.left);
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

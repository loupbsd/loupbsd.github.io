/* =========================================================================
   main.js — small interactions only. The site works without it.
   1. Mobile menu
   2. Theme toggle (light / dark, remembered in localStorage)
   3. Open a project card when the URL points to it (e.g. #strudel)
   4. Career page: highlight the current section in the table of contents
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

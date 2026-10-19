/* =========================================================================
   main.js — small interactions only. The site works without it.
   1. Mobile menu
   2. Theme toggle (dark / light, remembered in localStorage)
   3. Fade-in on scroll
   4. Open a project card when the URL points to it (e.g. #strudel)
   5. Career page: highlight the current section in the table of contents
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
const themeButton = document.querySelector(".theme-toggle");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Storage can be blocked (private mode): the toggle still works for this page
    }
  });
}

/* 3. Fade-in on scroll --------------------------------------------------- */
// Every element with class="reveal" fades in when it enters the screen.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* 4. Open a <details> card targeted by the URL --------------------------- */
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

/* 5. Career page: active link in the table of contents ------------------- */
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

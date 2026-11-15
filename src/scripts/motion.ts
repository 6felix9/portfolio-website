/**
 * All page motion lives here (~2 kB gzipped, no dependencies).
 *
 *   1. Reveal        — [data-reveal] elements animate in when scrolled into view
 *   2. Header        — condenses into a pill on scroll; mobile menu toggle
 *   3. Nav           — sliding indicator + scroll-spy for the current section
 *   4. Timeline      — rail fills with scroll progress
 *   5. Spotlight     — cards get a soft highlight that follows the cursor
 *   6. Flip words    — rotating hero word
 *   7. Local time    — live clock in the contact section
 *   8. Projects      — "View more" on mobile
 *
 * The visuals for each are in CSS; this file only toggles classes and sets
 * custom properties, so timing/easing stays defined in one place
 * (see :root in styles/global.css).
 */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const $ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  root.querySelector<T>(selector);
const $$ = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));

/** Run `fn` at most once per animation frame. */
function onFrame(fn: () => void) {
  let queued = false;
  return () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fn();
    });
  };
}

/* 1. Reveal ---------------------------------------------------------- */
function initReveal() {
  const targets = $$("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  targets.forEach((el) => observer.observe(el));
}

/* 2. Header ---------------------------------------------------------- */
function initHeader() {
  const header = $("[data-header]");
  if (!header) return;

  const update = onFrame(() => header.toggleAttribute("data-scrolled", window.scrollY > 24));
  update();
  window.addEventListener("scroll", update, { passive: true });

  const button = $<HTMLButtonElement>("[data-menu-btn]", header);
  const menu = $("[data-mobile-menu]", header);
  if (!button || !menu) return;

  const setOpen = (open: boolean) => {
    header.toggleAttribute("data-open", open);
    button.setAttribute("aria-expanded", String(open));
  };
  button.addEventListener("click", () => setOpen(!header.hasAttribute("data-open")));
  menu.addEventListener("click", (event) => {
    if ((event.target as Element).closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target as Node)) setOpen(false);
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", () => setOpen(false));
}

/* 3. Nav indicator + scroll-spy -------------------------------------- */
function initNav() {
  const nav = $("[data-nav]");
  const indicator = $("[data-nav-indicator]");
  const allLinks = $$<HTMLAnchorElement>("[data-nav-link]");
  if (!nav || !indicator || allLinks.length === 0) return;

  const navLinks = allLinks.filter((link) => nav.contains(link));
  let current: string | null = null;
  let hovered: HTMLAnchorElement | null = null;
  let shown = false;

  const place = () => {
    const link = hovered ?? navLinks.find((l) => l.hash === current) ?? null;
    if (!link) {
      indicator.style.setProperty("--o", "0");
      shown = false;
      return;
    }
    if (!shown) {
      // Appear in place rather than sliding in from wherever it last was.
      indicator.style.transitionProperty = "opacity";
      indicator.style.setProperty("--x", `${link.offsetLeft}px`);
      indicator.style.setProperty("--w", `${link.offsetWidth}px`);
      void indicator.offsetWidth;
      indicator.style.transitionProperty = "";
    }
    indicator.style.setProperty("--x", `${link.offsetLeft}px`);
    indicator.style.setProperty("--w", `${link.offsetWidth}px`);
    indicator.style.setProperty("--o", "1");
    shown = true;
  };

  for (const link of navLinks) {
    link.addEventListener("pointerenter", () => {
      hovered = link;
      place();
    });
    link.addEventListener("focus", () => {
      hovered = link;
      place();
    });
    link.addEventListener("blur", () => {
      hovered = null;
      place();
    });
  }
  nav.addEventListener("pointerleave", () => {
    hovered = null;
    place();
  });
  window.addEventListener("resize", onFrame(place));
  document.fonts?.ready.then(place);

  // The current section is the last one whose top has passed 40% of the viewport.
  const sections = navLinks
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter((el): el is HTMLElement => el !== null);

  const spy = onFrame(() => {
    const line = window.innerHeight * 0.4;
    let next: string | null = null;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) next = `#${section.id}`;
    }
    // Pin to the last section at the very bottom of the page.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && sections.length) {
      next = `#${sections[sections.length - 1].id}`;
    }
    if (next === current) return;
    current = next;
    for (const link of allLinks) {
      if (link.hash === current) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
    place();
  });
  spy();
  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("resize", spy);
}

/* 4. Timeline progress ----------------------------------------------- */
function initTimeline() {
  const timeline = $("[data-timeline]");
  if (!timeline) return;

  const update = onFrame(() => {
    const rect = timeline.getBoundingClientRect();
    const progress = (window.innerHeight * 0.55 - rect.top) / rect.height;
    timeline.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(4));
  });

  // Only listen to scroll while the timeline is actually on screen.
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    } else {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    }
  }).observe(timeline);
}

/* 5. Card spotlight -------------------------------------------------- */
function initSpotlight() {
  if (!finePointer) return;
  document.addEventListener(
    "pointermove",
    (event) => {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );
}

/* 6. Flip words ------------------------------------------------------ */
function initFlipWords() {
  for (const root of $$("[data-flip]")) {
    const wordEl = $("[data-flip-word]", root);
    const srEl = $(".sr-only", root);
    let words: string[] = [];
    try {
      words = JSON.parse(root.dataset.flip ?? "[]");
    } catch {
      /* leave the static word in place */
    }
    if (!wordEl || words.length === 0) continue;

    const render = (word: string) => {
      wordEl.replaceChildren(
        ...Array.from(word, (char, i) => {
          const span = document.createElement("span");
          span.className = "flip-char";
          span.style.setProperty("--c", String(i));
          span.textContent = char === " " ? " " : char;
          return span;
        }),
      );
    };

    if (reduceMotion || words.length < 2) continue;

    let index = 0;
    let onScreen = true;
    new IntersectionObserver(([entry]) => (onScreen = entry.isIntersecting)).observe(root);

    render(words[0]);
    window.setTimeout(() => wordEl.classList.add("is-in"), 350);

    window.setInterval(() => {
      if (document.hidden || !onScreen) return;
      const leaving = words[index];
      wordEl.classList.add("is-out");
      window.setTimeout(
        () => {
          index = (index + 1) % words.length;
          wordEl.classList.remove("is-in", "is-out");
          render(words[index]);
          if (srEl) srEl.textContent = words[index];
          void wordEl.offsetWidth;
          wordEl.classList.add("is-in");
        },
        340 + leaving.length * 14,
      );
    }, 3200);
  }
}

/* 7. Local time ------------------------------------------------------ */
function initLocalTime() {
  for (const el of $$("[data-local-time]")) {
    const value = $("[data-local-time-value]", el);
    if (!value) continue;
    let format: Intl.DateTimeFormat;
    try {
      format = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: el.dataset.localTime,
      });
    } catch {
      continue; // unknown timezone in contact.json — just leave the clock hidden
    }
    const tick = () => (value.textContent = `${format.format(new Date())} local time`);
    tick();
    el.hidden = false;
    window.setInterval(tick, 15_000);
  }
}

/* 8. Projects "view more" -------------------------------------------- */
function initProjects() {
  const grid = $("[data-projects]");
  const more = $("[data-projects-more]");
  if (!grid || !more) return;
  more.addEventListener("click", () => grid.removeAttribute("data-collapsed"));
}

initReveal();
initHeader();
initNav();
initTimeline();
initSpotlight();
initFlipWords();
initLocalTime();
initProjects();

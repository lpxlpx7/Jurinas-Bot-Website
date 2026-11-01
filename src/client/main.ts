import { App } from "../app/app.ts";
import { copy } from "../app/data/copy.ts";
import { isChinesePage, readSetting, saveSetting, setLocale, t, type Locale } from "../app/lib/locale.ts";
import type { LayoutActions } from "../app/sections/layout.ts";

const root = document.documentElement;
// Only the home pages are interactive; the 404 page just needs the theme.
const app = document.querySelector<HTMLElement>("#app[data-page=home]");

// ---------- Theme ----------

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const applyTheme = (preference: string): void => {
  const resolved = preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;
  root.dataset.theme = resolved;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", resolved === "dark" ? "#000000" : "#f5f5f7");
};

applyTheme(readSetting("theme", "system"));
systemTheme.addEventListener("change", () => {
  if (readSetting("theme", "system") === "system") applyTheme("system");
});

// ---------- Menu ----------

// Like apple.com's globalnav: one trigger whose two lines fold into an X and back.
let menuIsOpen = false;

const setMenu = (open: boolean): void => {
  if (open === menuIsOpen) return;
  menuIsOpen = open;
  document.body.classList.toggle("menu-open", open);
  const button = document.querySelector<HTMLButtonElement>(".menu-button");
  button?.setAttribute("aria-expanded", String(open));
  button?.setAttribute("aria-label", t(open ? copy.menuClose : copy.menuOpen));
  const menu = document.querySelector(".mobile-menu");
  menu?.setAttribute("aria-hidden", String(!open));
  menu?.toggleAttribute("inert", !open);
  button?.querySelectorAll<SVGAnimationElement>(open ? ".menu-anim-open" : ".menu-anim-close").forEach((animation) => animation.beginElement());
};

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
window.matchMedia("(min-width: 735px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});

// ---------- Reveal on scroll ----------

const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealer.unobserve(entry.target);
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -32px" },
);

// ---------- Render ----------

const actions: LayoutActions = {
  onLanguage: (next: Locale) => {
    saveSetting("jurina-bot-language", next);
    setLocale(next);
    render(true);
  },
  onTheme: () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    saveSetting("theme", next);
    applyTheme(next);
  },
  onMenuToggle: () => setMenu(!menuIsOpen),
  onMenuClose: () => setMenu(false),
  menuOpen: () => menuIsOpen,
};

// The build already wrote this markup into the page; rendering it again here attaches the event
// handlers. A language switch re-renders in place, keeping content on screen visible instead of fading it in again.
function render(keepVisible = false): void {
  if (!app) return;
  document.title = t(copy.pageTitle);
  app.replaceChildren(...App(actions));
  app.querySelectorAll(".reveal").forEach((node) => {
    if (keepVisible) node.classList.add("is-visible");
    else revealer.observe(node);
  });
}

setLocale(isChinesePage() ? "zh" : readSetting("jurina-bot-language", "") === "ja" ? "ja" : "en");
root.classList.add("reveal-ready");
render();

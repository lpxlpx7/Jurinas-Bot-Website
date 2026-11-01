/*
 * Runs the same components the browser uses inside linkedom's DOM, so every page ships as full
 * HTML: readable without JavaScript and by crawlers. The browser then renders the same tree again
 * to attach event handlers.
 */
import { parseHTML } from "linkedom";
import type { PageMeta } from "../site/pages.ts";

const { window, document } = parseHTML("<!doctype html><html><head></head><body></body></html>");
Object.assign(globalThis, { window, document, Node: window.Node });

const { App, NotFound } = await import("../app/app.ts");
const { setLocale } = await import("../app/lib/locale.ts");

// Nothing is interactive at build time; the browser wires these up.
const noop = (): void => {};
const staticActions = { onLanguage: noop, onTheme: noop, onMenuToggle: noop, onMenuClose: noop, menuOpen: () => false };

export const prerender = (page: PageMeta): string => {
  document.documentElement.setAttribute("lang", page.htmlLang);
  setLocale(page.locale);
  if (page.kind === "not-found") return NotFound().outerHTML;
  const app = document.createElement("div");
  app.id = "app";
  app.dataset.page = "home";
  app.append(...App(staticActions));
  return app.outerHTML;
};

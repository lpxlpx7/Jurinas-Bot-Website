import { repoUrl } from "./data/copy.ts";
import { h } from "./lib/dom.ts";
import { Access, Commands, Coverage, Hero, Rules } from "./sections/content.ts";
import { Footer, Header, MobileMenu, type LayoutActions } from "./sections/layout.ts";
import { Playground } from "./sections/playground.ts";

/*
 * The page tree, shared by the build (which writes it into the HTML) and the browser (which
 * renders it again with live event handlers, and again on every language switch).
 */
export const App = (actions: LayoutActions): HTMLElement[] => [
  Header(actions),
  MobileMenu(actions),
  h("main", { id: "top" }, Hero(), Playground(), Coverage(), Commands(), Access(), Rules()),
  Footer(),
];

/** The 404 page; static, with English and Japanese side by side. */
export const NotFound = (): HTMLElement =>
  h(
    "main",
    { class: "error-shell" },
    h("p", { class: "eyebrow" }, "404 / PAGE NOT FOUND"),
    h("h1", null, "This page is not available"),
    h("p", null, "The address may be incorrect or the page may have moved."),
    h("p", { lang: "ja" }, "お探しのページは見つかりませんでした。"),
    h("a", { class: "button button-primary", href: "/" }, "Return to Jurina's Bot"),
    h(
      "p",
      { class: "error-source" },
      "This website is ",
      h("a", { href: repoUrl, target: "_blank", rel: "noopener noreferrer" }, "open source on GitHub"),
      ".",
    ),
  );

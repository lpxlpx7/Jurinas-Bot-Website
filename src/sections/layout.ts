import { copy, repoUrl } from "../data/copy.js";
import { asset, h, icon } from "../lib/dom.js";
import { format, isChinesePage, locale, t, type Locale } from "../lib/locale.js";

const navItems = [
  { href: "#demo", label: copy.navTry },
  { href: "#coverage", label: copy.navDatis, mobileOnly: true },
  { href: "#commands", label: copy.navCommands },
  { href: "#access", label: copy.navAccess },
];

export interface LayoutActions {
  onLanguage: (next: Locale) => void;
  onTheme: () => void;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  menuOpen: () => boolean;
}

const LanguageSwitch = (actions: LayoutActions): HTMLElement | false =>
  !isChinesePage &&
  h(
    "div",
    { class: "language-switch", role: "group", "aria-label": t(copy.language) },
    (["en", "ja"] as const).map((code) =>
      h(
        "button",
        {
          class: locale() === code ? "language-button is-active" : "language-button",
          type: "button",
          "aria-pressed": String(locale() === code),
          lang: code,
          onClick: () => actions.onLanguage(code),
        },
        code === "en" ? "EN" : "日本語",
      ),
    ),
  );

/*
 * apple.com's globalnav menu trigger: two polylines whose points morph through a single flat line
 * into an X. main.ts starts the open or close animations with beginElement().
 */
const MENU_FLAT = "2 9, 16 9";
const menuBread = (part: "top" | "bottom", rest: string, cross: string, open: boolean): string => {
  const timing = 'keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1"';
  return `<polyline class="menu-bread menu-bread-${part}" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="${open ? cross : rest}">`
    + `<animate class="menu-anim-open" attributeName="points" ${timing} values="${rest};${MENU_FLAT};${cross}"/>`
    + `<animate class="menu-anim-close" attributeName="points" ${timing} values="${cross};${MENU_FLAT};${rest}"/>`
    + `</polyline>`;
};

// Built open or closed so a language switch while the sheet is open keeps the X.
const MenuButton = (actions: LayoutActions): HTMLButtonElement => {
  const open = actions.menuOpen();
  const button = h("button", {
    class: "menu-button",
    type: "button",
    "aria-expanded": String(open),
    "aria-controls": "mobile-menu",
    "aria-label": t(open ? copy.menuClose : copy.menuOpen),
    onClick: actions.onMenuToggle,
  });
  button.innerHTML = '<svg class="menu-icon" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">'
    + menuBread("bottom", "2 12, 16 12", "3.5 15, 15 3.5", open)
    + menuBread("top", "2 5, 16 5", "3.5 3.5, 15 15", open)
    + "</svg>";
  return button;
};

export const Header = (actions: LayoutActions): HTMLElement =>
  h(
    "header",
    { class: "site-header" },
    h(
      "nav",
      { class: "nav shell", "aria-label": t(copy.primaryNav) },
      h(
        "a",
        { class: "brand", href: "#top", "aria-label": t(copy.home) },
        h("img", { class: "brand-icon", src: asset("img/1.png"), alt: "", width: 24, height: 24 }),
        h("span", null, "Jurina's Bot"),
      ),
      h(
        "div",
        { class: "nav-right" },
        h("div", { class: "nav-links" }, navItems.filter((item) => !item.mobileOnly).map((item) => h("a", { href: item.href }, t(item.label)))),
        LanguageSwitch(actions),
        h("button", { class: "theme-button", type: "button", "aria-label": t(copy.theme), onClick: actions.onTheme }, icon("moon"), icon("sun")),
        MenuButton(actions),
      ),
    ),
  );

/** Full-height phone sheet modelled on the apple.com globalnav; the header's button opens and closes it. */
export const MobileMenu = (actions: LayoutActions): HTMLElement => {
  const open = actions.menuOpen();
  return h(
    "div",
    { class: "mobile-menu", id: "mobile-menu", "aria-hidden": String(!open), inert: !open },
    h(
      "nav",
      { class: "mobile-nav", "aria-label": t(copy.mobileNav) },
      h("ul", null, navItems.map((item) => h("li", null, h("a", { href: item.href, onClick: actions.onMenuClose }, t(item.label))))),
    ),
    !isChinesePage &&
      h(
        "div",
        { class: "mobile-menu-group" },
        h("h2", null, t(copy.language)),
        h(
          "div",
          { class: "mobile-language", role: "group", "aria-label": t(copy.language) },
          (["en", "ja"] as const).map((code) =>
            h(
              "button",
              {
                class: locale() === code ? "language-option is-active" : "language-option",
                type: "button",
                "aria-pressed": String(locale() === code),
                lang: code,
                onClick: () => actions.onLanguage(code),
              },
              code === "en" ? "English" : "日本語",
            ),
          ),
        ),
      ),
  );
};

export const Footer = (): HTMLElement => {
  const link = h("a", { href: repoUrl, target: "_blank", rel: "noopener noreferrer" }, "GitHub");
  const [before, after] = format(copy.openSource, { link: "\u0000" }).split("\u0000");
  return h(
    "footer",
    { class: "site-footer" },
    h(
      "div",
      { class: "shell footer-bottom" },
      h("p", null, `© ${new Date().getFullYear()} Jurina. ${t(copy.rights)}`),
      h("p", null, before, link, after),
    ),
  );
};

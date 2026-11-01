import { css } from "../../build/css.ts";

/** Phone menu modelled on the apple.com globalnav sheet, as on the homepage. */
export default css`
/* The bar grows into a solid full-height sheet; only the trigger stays, turned into a close X. */
:root { --nav-ink: #1d1d1f; --nav-sheet: #fafafc; --nav-link: #333336; --nav-link-hover: #000; --nav-muted: #6e6e73; --nav-ease: cubic-bezier(.4,0,.6,1); }
[data-theme="dark"] { --nav-ink: #e8e8ed; --nav-sheet: #161617; --nav-link: #e8e8ed; --nav-link-hover: #fff; --nav-muted: #86868b; }
.mobile-menu {
  position: fixed; z-index: 90; inset: 0;
  padding: 48px 0 max(32px, env(safe-area-inset-bottom));
  overflow-y: auto; overscroll-behavior: contain;
  background: var(--nav-sheet);
  /* Closed, the sheet is clipped to the 48px bar it grows out of. */
  clip-path: inset(0 0 calc(100% - 48px) 0);
  visibility: hidden;
  transition: clip-path .32s var(--nav-ease) .1s, visibility 0s linear .42s;
}
.menu-open { overflow: hidden; }
.menu-open .site-header { z-index: 91; background: var(--nav-sheet); box-shadow: none; transition: background-color .32s var(--nav-ease); }
.menu-open .mobile-menu { visibility: visible; clip-path: inset(0); transition: clip-path .32s var(--nav-ease), visibility 0s; }
/* Everything else in the bar steps aside while the sheet is open. */
.site-header :is(.brand, .theme-button) { transition: opacity .24s var(--nav-ease) .1s, visibility 0s linear 0s; }
.menu-open .site-header :is(.brand, .theme-button) { opacity: 0; visibility: hidden; transition: opacity .1s var(--nav-ease), visibility 0s linear .1s; }

.mobile-nav ul { margin: 0; padding: 8px 0 0; list-style: none; }
.mobile-nav a, .mobile-menu-group > * {
  opacity: 0; transform: translateY(-4px);
  transition: opacity .1s var(--nav-ease), transform .1s var(--nav-ease), color .2s ease;
}
.mobile-nav a {
  padding: 4px max(48px, env(safe-area-inset-right)) 4px max(48px, env(safe-area-inset-left));
  display: block;
  color: var(--nav-link);
  font: 600 28px/1.1428571429 var(--display-font); letter-spacing: .007em;
}
html:is([lang="ja"], [lang="zh-CN"]) .mobile-nav a { font-family: inherit; letter-spacing: 0; }
.mobile-nav a:hover, .mobile-nav a:focus-visible { color: var(--nav-link-hover); }
.menu-open :is(.mobile-nav a, .mobile-menu-group > *) {
  opacity: 1; transform: none;
  transition: opacity .24s var(--nav-ease) calc(.2s + var(--i, 0) * .02s), transform .24s var(--nav-ease) calc(.2s + var(--i, 0) * .02s), color .2s ease;
}
.mobile-nav li:nth-child(2) a { --i: 1; }
.mobile-nav li:nth-child(3) a { --i: 2; }
.mobile-nav li:nth-child(4) a { --i: 3; }
.mobile-menu-group > :nth-child(1) { --i: 5; }
.mobile-menu-group > :nth-child(2) { --i: 6; }

.mobile-menu-group { margin-top: 40px; padding-inline: max(48px, env(safe-area-inset-left)) max(48px, env(safe-area-inset-right)); }
.mobile-menu-group h2 { margin: 0 0 12px; color: var(--nav-muted); font: 400 12px/1.3333733333 var(--font); letter-spacing: -.01em; }
.mobile-language { display: grid; justify-items: start; gap: 6px; }
.mobile-language .language-option { padding: 4px 0; border: 0; background: none; color: var(--nav-link); font: 600 17px/1.2353641176 var(--font); letter-spacing: -.022em; opacity: .56; cursor: pointer; transition: opacity .2s ease, color .2s ease; }
.mobile-language .language-option:hover { color: var(--nav-link-hover); opacity: 1; }
.mobile-language .language-option.is-active { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .mobile-menu, .menu-open .mobile-menu { clip-path: none; opacity: 0; transition: opacity .2s ease, visibility 0s linear .2s; }
  .menu-open .mobile-menu { opacity: 1; transition: opacity .2s ease, visibility 0s; }
  .mobile-nav a, .mobile-menu-group > *, .menu-open :is(.mobile-nav a, .mobile-menu-group > *) { transform: none; transition-delay: 0s; }
}
@media (min-width: 735px) { .mobile-menu { display: none; } }
`;

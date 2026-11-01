import { css } from "../../build/css.ts";

/** Sticky glass header with links, language switch and theme button. */
export default css`
.site-header {
  position: sticky; z-index: 30; top: 0; height: 48px;
  background: var(--glass);
  box-shadow: 0 .5px 0 var(--glass-border);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
}
.nav { height: 48px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.brand { display: flex; align-items: center; gap: 9px; font-size: 17px; font-weight: 600; white-space: nowrap; }
.brand-icon { width: 24px; height: 24px; border-radius: 7px; object-fit: cover; }
.nav-right, .nav-links, .language-switch { display: flex; align-items: center; }
.nav-right { gap: 26px; }
.nav-links { gap: 30px; font-size: 12px; letter-spacing: -.01em; }
.nav-links a { opacity: .72; transition: opacity .2s ease; }
.nav-links a:hover { opacity: 1; }
.language-switch { gap: 14px; }
.language-button { padding: 0; border: 0; background: none; color: var(--muted); font: inherit; font-size: 12px; cursor: pointer; transition: color .2s ease; }
.language-button:hover { color: var(--ink); }
.language-button.is-active { color: var(--ink); font-weight: 600; }
.theme-button, .menu-button { border: 0; padding: 0; background: none; color: var(--ink); font: inherit; cursor: pointer; }
.theme-button { width: 32px; height: 32px; margin-left: -10px; border-radius: 50%; display: grid; place-items: center; opacity: .8; transition: opacity .2s ease, background-color .2s ease; }
.theme-button:hover { opacity: 1; background: rgba(127,127,127,.12); }
.theme-button .icon { width: 17px; height: 17px; }
.theme-button .icon-sun, [data-theme="dark"] .theme-button .icon-moon { display: none; }
[data-theme="dark"] .theme-button .icon-sun { display: inline-block; }
.menu-button { width: 48px; height: 48px; margin-right: -15px; display: none; place-items: center; color: var(--nav-ink); }
.menu-icon { display: block; overflow: visible; }
`;

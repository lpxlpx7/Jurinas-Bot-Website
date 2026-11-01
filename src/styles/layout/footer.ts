import { css } from "../../build/css.ts";

/** Copyright and source link. */
export default css`
.site-footer { padding-bottom: max(34px, env(safe-area-inset-bottom)); color: var(--muted); font-size: 12px; }
.footer-bottom { padding-top: 18px; border-top: 1px solid var(--line); display: flex; align-items: center; justify-content: space-between; gap: 8px 24px; }
.footer-bottom p { margin: 0; }
.footer-bottom a { color: var(--ink); }
.footer-bottom a:hover { text-decoration: underline; text-underline-offset: 3px; }
`;

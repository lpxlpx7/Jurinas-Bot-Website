import { css } from "../../build/css.ts";

/** Ground rules and fine print. */
export default css`
.rules { padding-bottom: 96px; }
.rules-card { padding: 48px; border-radius: var(--radius-tile); display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 40px; background: var(--surface); box-shadow: var(--tile-shadow); }
.rules-intro h2 { margin: 0; font-size: clamp(32px, 3.6vw, 44px); font-weight: 700; line-height: 1.08; letter-spacing: -.025em; }
.rules-list { display: grid; gap: 24px; }
.rules-list li + li { padding-top: 24px; border-top: 1px solid var(--line); }
.rules-list h3 { margin: 0; font-size: 19px; font-weight: 600; }
.rules-list p { margin: 6px 0 0; color: var(--muted); font-size: 15px; line-height: 1.5; }
.fine-print { max-width: 760px; margin: 24px 0 0; color: var(--muted); font-size: 12px; line-height: 1.5; }
.fine-print a { color: var(--blue); }
`;

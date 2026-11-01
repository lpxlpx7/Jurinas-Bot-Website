import { css } from "../../build/css.ts";

/** The 404 page. */
export default css`
.error-shell { min-height: 100svh; width: min(640px, calc(100% - var(--gutter) * 2)); margin-inline: auto; padding-block: 64px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
.error-shell h1 { margin: 0; font-size: clamp(40px, 7vw, 64px); font-weight: 700; line-height: 1.06; letter-spacing: -.03em; }
.error-shell > p:not(.eyebrow) { margin: 14px 0 0; color: var(--muted); font-size: 19px; }
.error-shell .button { margin-top: 32px; }
.error-shell .error-source { margin-top: 28px; font-size: 13px; }
.error-source a { color: var(--blue); }
`;

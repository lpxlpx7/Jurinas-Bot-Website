import { css } from "../../build/css.ts";

/** Access steps and the email card. */
export default css`
.access { padding-block: 120px 96px; }
.steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; counter-reset: step; }
.step { padding: 32px; border-radius: var(--radius-tile); background: var(--surface); box-shadow: var(--tile-shadow); }
.step-number { width: 36px; height: 36px; margin-bottom: 40px; border-radius: 50%; display: grid; place-items: center; background: var(--name-gradient); color: #fff; font-weight: 700; }
.step h3 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -.015em; }
.step p { margin: 10px 0 0; color: var(--muted); font-size: 16px; line-height: 1.5; }
.mail-card { margin-top: 20px; padding: 28px 32px; border-radius: var(--radius-tile); display: flex; align-items: center; justify-content: space-between; gap: 12px 24px; flex-wrap: wrap; background: var(--ink); color: var(--page); transition: transform .3s var(--ease-out); }
.mail-card:hover { transform: scale(1.01); }
.mail-card > span { font-size: 21px; font-weight: 600; }
.mail-card strong { display: inline-flex; align-items: center; gap: 8px; font-size: 21px; font-weight: 400; }
.mail-card .icon { width: 14px; height: 14px; }
`;

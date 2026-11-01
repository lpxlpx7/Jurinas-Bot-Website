import { css } from "../../build/css.ts";

/** Eyebrow, title and lead shared by every section. */
export default css`
.section-heading { max-width: 720px; margin-bottom: 44px; }
.section-heading h2 { margin: 0; font-size: clamp(40px, 5.2vw, 64px); font-weight: 700; line-height: 1.05; letter-spacing: -.035em; }
html:is([lang="ja"], [lang="zh-CN"]) .section-heading h2 { line-height: 1.2; }
.section-heading > p:not(.eyebrow) { margin: 16px 0 0; color: var(--muted); font-size: 21px; line-height: 1.42; }
`;

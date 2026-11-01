import { css } from "../../build/css.ts";

/** Headline, lead and calls to action. */
export default css`
.hero { padding-block: 96px 56px; text-align: center; }
.hero-pill { margin-bottom: 28px; padding: 6px 14px 6px 6px; border-radius: 999px; display: inline-flex; align-items: center; gap: 10px; background: var(--surface); box-shadow: var(--tile-shadow); font-size: 14px; transition: transform .3s var(--ease-out); }
.hero-pill:hover { transform: translateY(-1px); }
.hero-pill .icon { width: 11px; height: 11px; color: var(--muted); }
.hero h1 { margin: 0; font-size: clamp(52px, 8vw, 104px); font-weight: 700; line-height: 1.02; letter-spacing: -.04em; }
html:is([lang="ja"], [lang="zh-CN"]) .hero h1 { font-size: clamp(40px, 6.4vw, 80px); line-height: 1.15; }
.hero h1 span, .hero h1 strong { display: block; }
.hero h1 strong {
  padding-bottom: .06em;
  background: var(--name-gradient); background-size: 160% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: name-drift 9s ease-in-out infinite alternate;
}
@keyframes name-drift { to { background-position: 100% 0; } }
.hero-lead { max-width: 640px; margin: 24px auto 0; color: var(--muted); font-size: 21px; line-height: 1.42; }
`;

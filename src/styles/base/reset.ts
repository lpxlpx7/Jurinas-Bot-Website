import { css } from "../../build/css.ts";

/** Element defaults and small shared helpers. */
export default css`
* { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; scroll-behavior: smooth; scroll-padding-top: 64px; overflow-x: hidden; }
body { margin: 0; min-width: 320px; overflow-x: clip; background: var(--page); color: var(--ink); font-family: var(--font); font-size: 17px; line-height: 1.47; letter-spacing: -.022em; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; -webkit-tap-highlight-color: transparent; }
html[lang="ja"] body { font-family: "GenShin Gothic", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif; letter-spacing: 0; }
/* Latin in SF Pro, Chinese from the system font. */
html[lang="zh-CN"] body { font-family: "SF Pro Text Local", -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; letter-spacing: 0; }
:is(h1, h2, h3, .brand) { font-family: var(--display-font); }
html:is([lang="ja"], [lang="zh-CN"]) :is(h1, h2, h3, .brand) { font-family: inherit; letter-spacing: 0; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { -webkit-tap-highlight-color: transparent; }
code { font-family: var(--mono); letter-spacing: 0; }
ul, ol { margin: 0; padding: 0; list-style: none; }
::selection { background: rgba(130,87,230,.24); }
:is(a, button, [tabindex]):focus-visible { outline: 2px solid var(--blue); outline-offset: 4px; }
.shell { width: min(1120px, calc(100% - var(--gutter) * 2)); margin-inline: auto; }
.eyebrow, .card-kicker { margin: 0 0 12px; color: var(--muted); font-size: 13px; font-weight: 600; letter-spacing: .06em; }
.new-badge { display: inline-flex; align-items: center; height: 20px; padding: 0 8px; border-radius: 999px; background: color-mix(in srgb, var(--new) 14%, transparent); color: var(--new); font-size: 11px; font-weight: 700; letter-spacing: .02em; vertical-align: middle; }
`;

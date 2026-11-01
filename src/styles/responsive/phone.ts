import { css } from "../../build/css.ts";

/** Phone overrides. */
export default css`
@media (max-width: 734px) {
  :root { --gutter: 20px; --radius-tile: 24px; }
  body { font-size: 16px; }
  .nav-links, .nav .language-switch { display: none; }
  .menu-button { display: grid; }
  .nav-right { gap: 4px; }
  .theme-button { margin-left: 0; }

  .hero { padding-block: 48px 36px; }
  .hero-pill { margin-bottom: 22px; font-size: 13px; }
  .hero h1 { font-size: clamp(42px, 12.4vw, 60px); }
  html:is([lang="ja"], [lang="zh-CN"]) .hero h1 { font-size: clamp(32px, 9.4vw, 46px); }
  .hero-lead { font-size: 17px; }
  .actions { margin-top: 26px; }

  .demo { width: 100%; padding-bottom: 80px; }
  .demo-chips { margin-bottom: 16px; padding-inline: var(--gutter); flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; }
  .demo-chips::-webkit-scrollbar { display: none; }
  .demo-chip { flex: none; }
  .console { width: calc(100% - var(--gutter) * 2); border-radius: 20px; }
  .window-bar { border-radius: 20px 20px 0 0; }
  .console-feed { height: 520px; padding: 16px 12px 4px; }
  .message-context { margin-left: 42px; font-size: 12px; }
  .context-line { left: -26px; width: 20px; }
  .message-main { grid-template-columns: 32px minmax(0, 1fr); gap: 10px; }
  .message-avatar { width: 32px; height: 32px; }
  .embed-fields { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .embed-body { font-size: 12px; }
  .composer-wrap { padding: 6px 12px 14px; }
  .console-composer { height: 46px; }
  .composer-input { font-size: 16px; }
  .command-picker { left: 12px; right: 12px; }
  .picker-bot { display: none; }
  .picker-item { grid-template-columns: 28px minmax(0, 1fr); gap: 10px; }
  .picker-item img { width: 28px; height: 28px; }
  .demo-note { padding-inline: var(--gutter); }

  .section-heading { margin-bottom: 28px; }
  .section-heading h2 { font-size: clamp(34px, 10vw, 44px); }
  .section-heading > p:not(.eyebrow) { font-size: 17px; }

  .coverage { padding-bottom: 80px; }
  .coverage-grid { grid-template-columns: 1fr; gap: 14px; }
  .coverage-card { min-height: 320px; padding: 28px; }
  .coverage-code { font-size: 108px; }

  .commands { padding-block: 72px; }
  .filters { flex-wrap: nowrap; overflow-x: auto; margin-inline: calc(var(--gutter) * -1); padding-inline: var(--gutter); scrollbar-width: none; }
  .filters::-webkit-scrollbar { display: none; }
  .filter-button { flex: none; }
  .command-row { grid-template-columns: 1fr; padding: 16px 0; gap: 6px; }
  .command-row code { font-size: 14px; }
  .command-summary { font-size: 15px; }

  .access { padding-block: 80px 64px; }
  .step { padding: 24px; column-gap: 16px; }
  .step h3 { font-size: 20px; }
  .mail-card { padding: 24px; flex-direction: column; align-items: flex-start; }
  .mail-card > span, .mail-card strong { font-size: 19px; }

  .rules { padding-bottom: 64px; }
  .rules-card { padding: 28px 24px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
}
`;

import { css } from "../../build/css.ts";

/** Digital ATIS coverage tiles. */
export default css`
.coverage { padding-bottom: 120px; }
.coverage-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.coverage-card { position: relative; min-height: 420px; overflow: hidden; padding: 40px; border-radius: var(--radius-tile); box-shadow: var(--tile-shadow); }
.coverage-card > :not(.coverage-code) { position: relative; z-index: 1; }
.coverage-card h3 { margin: 0; font-size: clamp(30px, 3.4vw, 40px); font-weight: 700; line-height: 1.08; letter-spacing: -.02em; }
.coverage-card > p:not(.card-kicker) { max-width: 380px; margin: 12px 0 0; font-size: 17px; line-height: 1.45; }
.card-kicker { display: flex; align-items: center; gap: 8px; }
.coverage-code { position: absolute; right: -.06em; bottom: -.18em; font: 700 clamp(96px, 13vw, 168px)/1 var(--mono); letter-spacing: -.06em; opacity: .9; pointer-events: none; }
.coverage-us { color: #1d1d1f; background: linear-gradient(160deg, #eef6ff 0%, #d9ebff 100%); }
.coverage-us .card-kicker, .coverage-us > p:not(.card-kicker) { color: #515154; }
.coverage-us .coverage-code { color: rgba(0,113,227,.16); }
.coverage-jp { color: #fff; background: radial-gradient(80% 70% at 100% 100%, rgba(255,69,58,.55), transparent 65%), radial-gradient(70% 60% at 0% 0%, rgba(130,87,230,.45), transparent 60%), #111113; }
.coverage-jp .card-kicker, .coverage-jp > p:not(.card-kicker) { color: rgba(255,255,255,.7); }
.coverage-jp .new-badge { background: rgba(255,255,255,.16); color: #fff; }
.coverage-jp .coverage-code { color: rgba(255,255,255,.12); }
[data-theme="dark"] .coverage-us { color: #f5f5f7; background: linear-gradient(160deg, #0f2236 0%, #0a1726 100%); }
[data-theme="dark"] .coverage-us .card-kicker, [data-theme="dark"] .coverage-us > p:not(.card-kicker) { color: #a1a1a6; }
[data-theme="dark"] .coverage-us .coverage-code { color: rgba(41,151,255,.18); }
`;

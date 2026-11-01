import { css } from "../../build/css.ts";

/** The Discord-style command playground. */
export default css`
.demo { padding-bottom: 112px; }
.demo-chips { margin-bottom: 20px; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; }
.demo-chips-label { margin-right: 4px; color: var(--muted); font-size: 13px; font-weight: 600; }
.demo-chip { height: 34px; padding: 0 14px; border: 0; border-radius: 999px; display: inline-flex; align-items: center; gap: 8px; background: var(--surface); color: var(--ink); box-shadow: var(--tile-shadow); font: inherit; cursor: pointer; transition: background-color .2s ease, transform .2s var(--ease-out); }
.demo-chip code { font-size: 13px; }
.demo-chip:hover { background: color-mix(in srgb, var(--surface) 80%, var(--line)); }
.demo-chip:active { transform: scale(.97); }

/* Discord-style window; dark in both themes. */
.console { position: relative; width: min(860px, 100%); margin-inline: auto; border-radius: var(--radius-tile); background: #313338; color: #dbdee1; box-shadow: 0 40px 90px rgba(0,0,0,.18); }
[data-theme="dark"] .console { box-shadow: 0 0 0 1px rgba(255,255,255,.08), 0 40px 90px rgba(0,0,0,.6); }
.window-bar { height: 44px; padding-inline: 18px; border-radius: var(--radius-tile) var(--radius-tile) 0 0; display: flex; align-items: center; gap: 8px; background: #2b2d31; box-shadow: 0 1px 0 rgba(0,0,0,.25); }
.window-bar span { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.window-bar span:nth-child(2) { background: #febc2e; }
.window-bar span:nth-child(3) { background: #28c840; }
.window-bar p { flex: 1; margin: 0 0 0 12px; color: #f2f3f5; font-size: 14px; font-weight: 600; letter-spacing: 0; }
.console-clear { padding: 4px 10px; border: 0; border-radius: 6px; background: none; color: #b5bac1; font: inherit; font-size: 12px; cursor: pointer; }
.console-clear:hover { background: rgba(255,255,255,.06); color: #f2f3f5; }
.console-feed { height: 560px; padding: 24px 28px 8px; display: flex; flex-direction: column; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: #1a1b1e transparent; }
.console-feed > :first-child { margin-top: auto; }
.message { padding-block: 10px; animation: message-in .45s var(--ease-out) both; }
@keyframes message-in { from { opacity: 0; transform: translateY(8px); } }
.message-context { position: relative; margin: 0 0 4px 56px; display: flex; align-items: center; gap: 4px; color: #b5bac1; font-size: 13px; letter-spacing: 0; }
.message-context code { color: #00a8fc; font-size: 13px; }
.context-line { position: absolute; left: -36px; top: 50%; width: 28px; height: 12px; border: 2px solid #4e5058; border-right: 0; border-bottom: 0; border-radius: 6px 0 0; }
.message-main { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 16px; }
.message-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
.message-body { min-width: 0; }
.message-meta { margin: 0 0 4px; display: flex; align-items: center; gap: 8px; font-size: 15px; letter-spacing: 0; }
.message-meta strong { color: #f2f3f5; font-weight: 600; }
.bot-tag { padding: 1px 5px; border-radius: 4px; background: #5865f2; color: #fff; font-size: 10px; font-weight: 700; }
.message-meta time { color: #949ba4; font-size: 12px; }
.message-text { margin: 0 0 6px; color: #dbdee1; font-size: 15px; letter-spacing: 0; }
.message-text.is-muted { color: #b5bac1; font-size: 13px; font-style: italic; }
.message-note { margin: 6px 0 0; display: flex; align-items: center; gap: 6px; color: #949ba4; font-size: 11px; letter-spacing: 0; }
.message-note .icon { width: 13px; height: 13px; }
.link-button { margin-top: 4px; height: 32px; padding: 0 14px; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px; background: #4e5058; color: #fff; font-size: 14px; font-weight: 500; }
.link-button .icon { width: 11px; height: 11px; }
.embed { max-width: 560px; padding: 14px 16px 12px; border-left: 4px solid #5865f2; border-radius: 4px; background: #2b2d31; letter-spacing: 0; }
.embed-teal { border-left-color: #1abc9c; }
.embed-gold { border-left-color: #f0b232; }
.embed-violet { border-left-color: #9b59b6; }
.embed-orange { border-left-color: #f0802c; }
.embed-title { margin: 0; color: #b5bac1; font-size: 12px; font-weight: 700; letter-spacing: .04em; }
.embed-title.is-link { color: #00a8fc; font-size: 16px; font-weight: 600; letter-spacing: 0; }
.embed-heading { margin: 4px 0 0; color: #fff; font: 600 17px var(--font); }
.embed-lines { margin-top: 8px; color: #dbdee1; font-size: 14px; line-height: 1.4; }
.embed-line { margin: 0; overflow-wrap: anywhere; }
.embed-line strong { color: #f2f3f5; font-weight: 700; }
/* Values shown underneath their name get room above, like separate Discord fields. */
.embed-line.is-block { margin-top: 10px; }
.embed-fields { margin: 12px 0 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px 16px; }
.embed-fields dt { color: #b5bac1; font-size: 12px; font-weight: 600; }
.embed-fields dd { margin: 2px 0 0; color: #f2f3f5; font-size: 14px; }
.embed-body { margin: 12px 0 0; padding: 10px 12px; border-radius: 6px; background: #1e1f22; color: #dbdee1; font: 13px/1.55 var(--mono); white-space: pre-wrap; overflow-wrap: anywhere; }
.embed-image { width: min(300px, 100%); height: auto; margin-top: 14px; border-radius: 4px; }
.embed-source { margin: 10px 0 0; color: #dbdee1; font-size: 12px; }

/* Composer, with the slash-command picker opening above it. */
.composer-wrap { position: relative; padding: 8px 28px 24px; }
.console-composer { height: 48px; padding: 0 6px 0 14px; border-radius: 10px; display: flex; align-items: center; gap: 12px; background: #383a40; }
.console-composer:focus-within { box-shadow: 0 0 0 2px rgba(88,101,242,.5); }
.composer-plus { width: 22px; height: 22px; flex: none; border-radius: 50%; display: grid; place-items: center; background: #b5bac1; color: #383a40; font-weight: 700; line-height: 1; }
.composer-input { flex: 1; min-width: 0; height: 100%; padding: 0; border: 0; outline: 0; background: none; color: #f2f3f5; font: 15px var(--mono); letter-spacing: 0; caret-color: #f2f3f5; }
.composer-input::placeholder { color: #80848e; font-family: var(--font); }
.composer-send { width: 36px; height: 36px; flex: none; border: 0; border-radius: 8px; display: grid; place-items: center; background: none; color: #b5bac1; cursor: pointer; }
.composer-send:hover { background: rgba(255,255,255,.06); color: #f2f3f5; }
.composer-send .icon { width: 18px; height: 18px; }
.command-picker { position: absolute; z-index: 2; left: 28px; right: 28px; bottom: calc(100% - 4px); max-height: 340px; overflow-y: auto; padding: 8px; border-radius: 10px; background: #2b2d31; box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 12px 32px rgba(0,0,0,.4); letter-spacing: 0; }
.command-picker[hidden] { display: none; }
.picker-title { margin: 4px 8px 8px; display: flex; gap: 6px; color: #b5bac1; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .02em; }
.picker-title span { color: #f2f3f5; text-transform: none; font-family: var(--mono); }
.picker-item { width: 100%; padding: 8px; border: 0; border-radius: 6px; display: grid; grid-template-columns: 32px minmax(0, 1fr) auto; align-items: center; gap: 12px; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.picker-item.is-active, .picker-item:hover { background: #404249; }
.picker-item img { width: 32px; height: 32px; border-radius: 50%; }
.picker-text { min-width: 0; display: grid; }
.picker-name { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; color: #f2f3f5; font-size: 15px; font-weight: 600; }
.picker-arg { padding: 0 6px; border-radius: 4px; background: #1e1f22; color: #b5bac1; font: 12px/20px var(--mono); }
.picker-summary { overflow: hidden; color: #b5bac1; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.picker-bot { color: #949ba4; font-size: 12px; }
.picker-option { padding: 8px; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; border-radius: 6px; background: #404249; }
.picker-option code { color: #f2f3f5; font-weight: 600; }
.picker-option span { color: #b5bac1; font-size: 13px; }
.picker-option .picker-required { color: #949ba4; font-size: 11px; }
.picker-option + .picker-option { margin-top: 4px; }
.picker-empty, .picker-keys, .command-picker > .picker-summary { margin: 4px 8px; color: #949ba4; font-size: 12px; white-space: normal; }
.picker-keys { margin-top: 8px; padding-top: 8px; border-top: 1px solid #3f4147; }
.demo-note { max-width: 640px; margin: 18px auto 0; color: var(--muted); font-size: 13px; text-align: center; }
`;

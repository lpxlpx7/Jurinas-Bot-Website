import { css } from "../../build/css.ts";

/** Filterable command reference. */
export default css`
.commands { padding-block: 112px; background: var(--surface); }
.filters { margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 8px; }
.filter-button { height: 34px; padding: 0 16px; border: 1px solid var(--line); border-radius: 999px; background: none; color: var(--ink); font: inherit; font-size: 14px; cursor: pointer; transition: background-color .2s ease, color .2s ease, border-color .2s ease; }
.filter-button:hover { border-color: var(--muted); }
.filter-button.is-active { border-color: var(--ink); background: var(--ink); color: var(--surface); }
.command-table { border-top: 1px solid var(--line); }
.command-row { width: 100%; padding: 20px 8px; border: 0; border-bottom: 1px solid var(--line); display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) auto; align-items: baseline; gap: 8px 32px; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; transition: background-color .2s ease; }
.command-row:hover { background: color-mix(in srgb, var(--page) 60%, transparent); }
.command-row code { font-size: 15px; overflow-wrap: anywhere; }
.command-name { color: var(--ink); font-weight: 700; }
.command-usage { color: var(--blue); }
.command-summary { color: var(--muted); font-size: 16px; }
.command-summary .new-badge { margin-left: 8px; }
.command-try { color: var(--blue); font-size: 14px; white-space: nowrap; opacity: 0; transition: opacity .2s ease; }
.command-row:hover .command-try, .command-row:focus-visible .command-try { opacity: 1; }
.noscript { max-width: 560px; margin: 96px auto; padding-inline: var(--gutter); text-align: center; }
.noscript a { color: var(--blue); }
`;

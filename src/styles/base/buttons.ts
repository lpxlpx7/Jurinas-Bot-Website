import { css } from "../../build/css.ts";

/** Pill buttons and text links. */
export default css`
.actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px 26px; margin-top: 34px; }
.button {
  min-height: 44px; padding: 0 22px; border: 0; border-radius: 999px;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 17px; white-space: nowrap;
  transition: background-color .25s ease, transform .25s var(--ease-out);
}
.button:active { transform: scale(.97); }
.button-primary { background: var(--button); color: #fff; }
.button-primary:hover { background: var(--blue-hover); }
.button-secondary { padding: 0; background: none; color: var(--blue); }
.button-secondary:hover { text-decoration: underline; text-underline-offset: 3px; }
`;

import { css } from "../../build/css.ts";

/** Colour, radius, easing and font tokens, light and dark. */
export default css`
:root {
  color-scheme: light;
  --page: #f5f5f7;
  --surface: #fff;
  --ink: #1d1d1f;
  --muted: #6e6e73;
  --line: #d2d2d7;
  --blue: #0066cc;
  --blue-hover: #0077ed;
  --button: #0071e3;
  --glass: rgba(251,251,253,.8);
  --glass-border: rgba(0,0,0,.08);
  --tile-shadow: 0 2px 6px rgba(0,0,0,.03), 0 14px 36px rgba(0,0,0,.06);
  --name-gradient: linear-gradient(96deg, #c9b8ff 0%, #a98cf6 30%, #8257e6 64%, #5b2bbf 100%);
  --new: #8257e6;
  --radius-tile: 28px;
  --radius-media: 18px;
  --ease-out: cubic-bezier(.16,1,.3,1);
  --gutter: 24px;
  --font: "SF Pro Text Local", -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
  --display-font: "SF Pro Display Local", -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
  --mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
}
[data-theme="dark"] {
  color-scheme: dark;
  --page: #000;
  --surface: #161617;
  --ink: #f5f5f7;
  --muted: #a1a1a6;
  --line: #424245;
  --blue: #2997ff;
  --blue-hover: #64b5ff;
  --glass: rgba(22,22,23,.8);
  --glass-border: rgba(255,255,255,.1);
  --tile-shadow: 0 0 0 1px rgba(255,255,255,.06);
  --name-gradient: linear-gradient(96deg, #e6dcff 0%, #c4adff 30%, #9d74f7 64%, #7444e0 100%);
  --new: #b39bff;
}
`;

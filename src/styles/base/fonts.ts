import { css } from "../../build/css.ts";

/** The same two typefaces as japan-route-finder: SF Pro for English, GenShin Gothic for Japanese. */
export default css`
@font-face { font-family: "SF Pro Text Local"; src: url("../fonts/en/pro/SF-Pro-Text-Regular.otf") format("opentype"); font-weight: 400; font-display: swap; }
@font-face { font-family: "SF Pro Text Local"; src: url("../fonts/en/pro/SF-Pro-Text-Semibold.otf") format("opentype"); font-weight: 600; font-display: swap; }
@font-face { font-family: "SF Pro Display Local"; src: url("../fonts/en/pro/SF-Pro-Display-Regular.otf") format("opentype"); font-weight: 400; font-display: swap; }
@font-face { font-family: "SF Pro Display Local"; src: url("../fonts/en/pro/SF-Pro-Display-Semibold.otf") format("opentype"); font-weight: 600; font-display: swap; }
@font-face { font-family: "SF Pro Display Local"; src: url("../fonts/en/pro/SF-Pro-Display-Bold.otf") format("opentype"); font-weight: 700; font-display: swap; }
@font-face { font-family: "GenShin Gothic"; src: url("../fonts/jp/GenShinGothic-P-Regular.ttf") format("truetype"); font-weight: 400; font-display: swap; }
@font-face { font-family: "GenShin Gothic"; src: url("../fonts/jp/GenShinGothic-P-Bold.ttf") format("truetype"); font-weight: 700; font-display: swap; }
`;

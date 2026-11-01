import { css } from "../../build/css.ts";

/** Ionicons drawn as masks in the current text colour (MIT: public/img/icons/LICENSE-ionicons.txt). */
export default css`
.icon { display: inline-block; flex: none; width: 1em; height: 1em; vertical-align: -.125em; background-color: currentColor; -webkit-mask: var(--icon) center / contain no-repeat; mask: var(--icon) center / contain no-repeat; }
.icon-sun { --icon: url("../img/icons/sunny.svg"); }
.icon-moon { --icon: url("../img/icons/moon.svg"); }
.icon-close { --icon: url("../img/icons/close-outline.svg"); }
.icon-chevron { --icon: url("../img/icons/chevron-forward-outline.svg"); width: .7em; height: .7em; vertical-align: -.02em; }
.icon-send { --icon: url("../img/icons/send.svg"); }
.icon-eye { --icon: url("../img/icons/eye.svg"); }
.icon-external { --icon: url("../img/icons/arrow-forward-outline.svg"); transform: rotate(-45deg); }
`;

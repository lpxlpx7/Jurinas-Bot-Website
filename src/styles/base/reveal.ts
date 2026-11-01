import { css } from "../../build/css.ts";

/** Fade-up as sections scroll into view. */
export default css`
.reveal-ready .reveal { opacity: 0; transform: translateY(28px); transition: opacity 1s var(--ease-out), transform 1.1s var(--ease-out); }
.reveal-ready .reveal.is-visible { opacity: 1; transform: none; }
`;

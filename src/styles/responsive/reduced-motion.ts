import { css } from "../../build/css.ts";

/** Calmer motion when the system asks for it. */
export default css`
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  .reveal-ready .reveal { opacity: 1; transform: none; }
}
`;

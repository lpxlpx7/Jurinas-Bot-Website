import { css } from "../../build/css.ts";

/** Tablet overrides. */
export default css`
@media (max-width: 900px) {
  .command-row { grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr); }
  .command-try { display: none; }
  .steps { grid-template-columns: 1fr; gap: 12px; }
  .step { display: grid; grid-template-columns: 36px minmax(0, 1fr); column-gap: 20px; }
  .step-number { grid-row: span 2; margin-bottom: 0; }
  .rules-card { grid-template-columns: 1fr; gap: 28px; }
}
`;

/**
 * Tag for stylesheet modules. It keeps backslashes as written (like String.raw), so CSS escapes
 * survive, and it lets a module interpolate shared values.
 */
export const css = (strings: TemplateStringsArray, ...values: Array<string | number>): string =>
  String.raw({ raw: strings.raw }, ...values).trim();

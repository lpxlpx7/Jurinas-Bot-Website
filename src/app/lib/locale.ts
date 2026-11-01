export type Locale = "en" | "ja" | "zh";
export type Text = Record<Locale, string>;

// The Chinese page is fixed; the main page switches between English and Japanese.
// Read from <html lang>, which the build writes per page.
export const isChinesePage = (): boolean => document.documentElement.lang.startsWith("zh");

let current: Locale = "en";

export const locale = (): Locale => current;
export const t = (text: Text): string => text[current];

// Fills {name} placeholders after translating.
export const format = (text: Text, values: Record<string, string>): string =>
  t(text).replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

export const setLocale = (next: Locale): void => {
  current = next;
  document.documentElement.lang = next === "zh" ? "zh-CN" : next;
};

export const readSetting = (key: string, fallback: string): string => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};

export const saveSetting = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked; the setting still applies to this page view.
  }
};

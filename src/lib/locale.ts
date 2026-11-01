export type Locale = "en" | "ja" | "zh";
export type Text = Record<Locale, string>;

const root = document.documentElement;

// The Chinese page is fixed; the main page switches between English and Japanese.
export const isChinesePage = root.lang.startsWith("zh");

let current: Locale = isChinesePage ? "zh" : "en";

export const locale = (): Locale => current;
export const t = (text: Text): string => text[current];

// Fills {name} placeholders after translating.
export const format = (text: Text, values: Record<string, string>): string =>
  t(text).replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

export const setLocale = (next: Locale): void => {
  current = next;
  root.lang = next === "zh" ? "zh-CN" : next;
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

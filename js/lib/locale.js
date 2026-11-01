const root = document.documentElement;
// The Chinese page is fixed; the main page switches between English and Japanese.
export const isChinesePage = root.lang.startsWith("zh");
let current = isChinesePage ? "zh" : "en";
export const locale = () => current;
export const t = (text) => text[current];
// Fills {name} placeholders after translating.
export const format = (text, values) => t(text).replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
export const setLocale = (next) => {
    current = next;
    root.lang = next === "zh" ? "zh-CN" : next;
};
export const readSetting = (key, fallback) => {
    try {
        return localStorage.getItem(key) ?? fallback;
    }
    catch {
        return fallback;
    }
};
export const saveSetting = (key, value) => {
    try {
        localStorage.setItem(key, value);
    }
    catch {
        // Storage can be blocked; the setting still applies to this page view.
    }
};

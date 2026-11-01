"use strict";
// Loaded as a classic script before the stylesheet paints, so a saved dark theme never flashes light.
(() => {
    let preference = "system";
    try {
        preference = localStorage.getItem("theme") ?? "system";
    }
    catch {
        // Storage can be blocked; fall back to the system setting.
    }
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = preference === "dark" || (preference !== "light" && systemDark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
})();

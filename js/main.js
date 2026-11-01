import { categories, commands, demos, ui } from "./content.js";
const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
// ---------- Settings ----------
const readSetting = (key, fallback) => {
    try {
        return localStorage.getItem(key) ?? fallback;
    }
    catch {
        return fallback;
    }
};
const saveSetting = (key, value) => {
    try {
        localStorage.setItem(key, value);
    }
    catch {
        // Storage can be blocked; the setting still applies to this page view.
    }
};
const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text !== undefined)
        node.textContent = text;
    return node;
};
// ---------- Language ----------
// The Chinese page is fixed; the main page switches between English and Japanese.
let locale = root.lang.startsWith("zh") ? "zh" : root.lang === "ja" ? "ja" : "en";
const t = (text) => text[locale];
const localeListeners = [];
const setLanguage = (next) => {
    locale = next;
    root.lang = next;
    document.querySelectorAll("[data-en][data-ja]").forEach((node) => {
        node.textContent = node.dataset[next] ?? "";
    });
    document.querySelectorAll("[data-aria-en][data-aria-ja]").forEach((node) => {
        node.setAttribute("aria-label", (next === "ja" ? node.dataset.ariaJa : node.dataset.ariaEn) ?? "");
    });
    document.querySelectorAll("[data-language-button]").forEach((button) => {
        const active = button.dataset.languageButton === next;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
    });
    document.title = next === "ja" ? "Jurina's Bot | 公式紹介" : "Jurina's Bot";
    saveSetting("jurina-bot-language", next);
    localeListeners.forEach((listener) => listener());
};
const languageButtons = document.querySelectorAll("[data-language-button]");
languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.languageButton === "ja" ? "ja" : "en"));
});
if (languageButtons.length && readSetting("jurina-bot-language", "") === "ja")
    setLanguage("ja");
// ---------- Theme ----------
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeColor = document.querySelector('meta[name="theme-color"]');
const applyTheme = (preference) => {
    const resolved = preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;
    root.dataset.theme = resolved;
    if (themeColor)
        themeColor.content = resolved === "dark" ? "#000000" : "#f5f5f7";
};
applyTheme(readSetting("theme", "system"));
document.querySelector(".theme-button")?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    saveSetting("theme", next);
    applyTheme(next);
});
systemTheme.addEventListener("change", () => {
    if (readSetting("theme", "system") === "system")
        applyTheme("system");
});
// ---------- Mobile menu ----------
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const menuScrim = document.querySelector(".menu-scrim");
const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuButton?.setAttribute("aria-expanded", "false");
    mobileMenu?.setAttribute("aria-hidden", "true");
    mobileMenu?.setAttribute("inert", "");
    if (menuScrim)
        menuScrim.hidden = true;
};
const openMenu = () => {
    if (menuScrim)
        menuScrim.hidden = false;
    requestAnimationFrame(() => document.body.classList.add("menu-open"));
    menuButton?.setAttribute("aria-expanded", "true");
    mobileMenu?.setAttribute("aria-hidden", "false");
    mobileMenu?.removeAttribute("inert");
};
menuButton?.addEventListener("click", openMenu);
document.querySelector(".menu-close")?.addEventListener("click", closeMenu);
menuScrim?.addEventListener("click", closeMenu);
document.querySelectorAll(".mobile-nav a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape")
        closeMenu();
});
window.matchMedia("(min-width: 735px)").addEventListener("change", (event) => {
    if (event.matches)
        closeMenu();
});
// ---------- Demo console ----------
const consoleRoot = document.querySelector("[data-console]");
const chipList = document.querySelector("[data-demo-chips]");
// Absolute URL of img/1.png, so demo images resolve from both the root and the Chinese page.
const avatarUrl = document.querySelector(".brand-icon")?.src ?? location.href;
const renderEmbed = (demo) => {
    const message = el("div", "bot-message");
    const avatar = el("img", "bot-avatar");
    avatar.src = avatarUrl;
    avatar.alt = "";
    const content = el("div", "bot-content");
    const meta = el("p", "bot-meta");
    meta.append(el("strong", undefined, "Jurina's Bot"), el("span", "bot-tag", t(ui.botTag)), el("time", undefined, t(ui.today)));
    const embed = el("div", `embed embed-${demo.accent}`);
    embed.append(el("p", demo.titleIsLink ? "embed-title is-link" : "embed-title", t(demo.title)));
    if (demo.heading)
        embed.append(el("h3", "embed-heading", demo.heading));
    if (demo.lines) {
        const lines = el("div", "embed-lines");
        demo.lines.forEach((line) => {
            const row = el("p", line.inline ? "embed-line is-inline" : "embed-line");
            row.append(el("strong", undefined, line.name));
            if (line.value)
                row.append(line.inline ? " " : el("br"), line.value);
            lines.append(row);
        });
        embed.append(lines);
    }
    if (demo.fields) {
        const grid = el("dl", "embed-fields");
        demo.fields.forEach((field) => {
            const item = el("div");
            item.append(el("dt", undefined, t(field.label)), el("dd", undefined, field.value));
            grid.append(item);
        });
        embed.append(grid);
    }
    if (demo.body)
        embed.append(el("p", "embed-body", demo.body));
    if (demo.image) {
        const image = el("img", "embed-image");
        image.src = new URL(demo.image.src, avatarUrl).href;
        image.alt = demo.image.alt;
        image.width = demo.image.width;
        image.height = demo.image.height;
        image.loading = "lazy";
        embed.append(image);
    }
    if (demo.footer)
        embed.append(el("p", "embed-source", demo.footer));
    embed.append(el("p", "embed-footer", t(ui.exampleNote)));
    content.append(meta, embed);
    message.append(avatar, content);
    return message;
};
if (consoleRoot && chipList) {
    const feed = consoleRoot.querySelector("[data-console-feed]");
    const typed = consoleRoot.querySelector("[data-console-input]");
    let active = 0;
    let timers = [];
    let autoplay = !reducedMotion.matches;
    let visible = false;
    let cycle;
    const clearTimers = () => {
        timers.forEach((id) => window.clearTimeout(id));
        timers = [];
    };
    const renderChips = () => {
        chipList.replaceChildren(...demos.map((demo, index) => {
            const chip = el("button", "demo-chip");
            chip.type = "button";
            chip.setAttribute("role", "tab");
            chip.setAttribute("aria-selected", String(index === active));
            chip.classList.toggle("is-active", index === active);
            chip.append(el("span", undefined, t(demo.chip)));
            if (demo.isNew)
                chip.append(el("span", "new-badge", t(ui.newBadge)));
            chip.addEventListener("click", () => {
                autoplay = false;
                play(index);
            });
            return chip;
        }));
    };
    const scheduleNext = () => {
        window.clearTimeout(cycle);
        if (!autoplay || !visible)
            return;
        cycle = window.setTimeout(() => play((active + 1) % demos.length), 7000);
    };
    const play = (index, instant = reducedMotion.matches) => {
        clearTimers();
        active = index;
        renderChips();
        const demo = demos[index];
        feed.replaceChildren();
        consoleRoot.classList.remove("is-answered");
        if (instant) {
            typed.textContent = "";
            feed.append(renderEmbed(demo));
            consoleRoot.classList.add("is-answered");
            scheduleNext();
            return;
        }
        typed.textContent = "";
        [...demo.input].forEach((char, i) => {
            timers.push(window.setTimeout(() => { typed.textContent += char; }, 220 + i * 38));
        });
        const sent = 220 + demo.input.length * 38 + 380;
        timers.push(window.setTimeout(() => {
            typed.textContent = "";
            feed.append(renderEmbed(demo));
            requestAnimationFrame(() => consoleRoot.classList.add("is-answered"));
            scheduleNext();
        }, sent));
    };
    new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible)
            scheduleNext();
        else
            window.clearTimeout(cycle);
    }, { threshold: 0.3 }).observe(consoleRoot);
    localeListeners.push(() => play(active, true));
    play(0);
}
// ---------- Command reference ----------
const commandList = document.querySelector("[data-command-list]");
const filterList = document.querySelector("[data-command-filters]");
if (commandList && filterList) {
    let filter = "all";
    const render = () => {
        const options = [
            { id: "all", label: t(ui.all) },
            ...categories.map((category) => ({ id: category.id, label: t(category.label) })),
        ];
        filterList.replaceChildren(...options.map((option) => {
            const button = el("button", "filter-button", option.label);
            button.type = "button";
            button.setAttribute("aria-pressed", String(option.id === filter));
            button.classList.toggle("is-active", option.id === filter);
            button.addEventListener("click", () => {
                filter = option.id;
                render();
            });
            return button;
        }));
        commandList.replaceChildren(...commands
            .filter((command) => filter === "all" || command.category === filter)
            .map((command) => {
            const item = el("li", "command-row");
            const code = el("code");
            code.append(el("span", "command-name", command.name));
            if (command.usage)
                code.append(" ", el("span", "command-usage", command.usage));
            const text = el("p", undefined, t(command.summary));
            if (command.isNew)
                text.append(el("span", "new-badge", t(ui.newBadge)));
            const category = categories.find((entry) => entry.id === command.category);
            item.append(code, text, el("span", "command-category", category ? t(category.label) : ""));
            return item;
        }));
    };
    localeListeners.push(render);
    render();
}
// ---------- Header, reveal, year ----------
const header = document.querySelector(".site-header");
const updateHeader = () => { header?.classList.toggle("is-scrolled", window.scrollY > 12); };
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
root.classList.add("reveal-ready");
const revealer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting)
            return;
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
    });
}, { threshold: 0.1, rootMargin: "0px 0px -32px" });
document.querySelectorAll(".reveal").forEach((node) => revealer.observe(node));
const year = document.querySelector("#copyright-year");
if (year)
    year.textContent = String(new Date().getFullYear());

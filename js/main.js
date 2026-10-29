const root = document.documentElement;
const header = document.querySelector(".site-header");
const languageButtons = document.querySelectorAll("[data-language-button]");
const translatedElements = document.querySelectorAll("[data-en][data-ja]");
const translatedLabels = document.querySelectorAll("[data-aria-en][data-aria-ja]");
const themeButton = document.querySelector(".theme-button");
const themeColor = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const year = document.querySelector("#copyright-year");

const readSetting = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (error) {
    return fallback;
  }
};

const saveSetting = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Storage can be blocked; the setting still applies to this page view.
  }
};

function setLanguage(language) {
  root.dataset.language = language;
  root.lang = language;

  translatedElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  translatedLabels.forEach((element) => {
    element.setAttribute("aria-label", language === "ja" ? element.dataset.ariaJa : element.dataset.ariaEn);
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.languageButton === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.title = language === "ja" ? "Jurina's Bot | 公式紹介" : "Jurina's Bot";
  saveSetting("jurina-bot-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.languageButton));
});

if (languageButtons.length) {
  const preferredLanguage = readSetting("jurina-bot-language", "");
  if (preferredLanguage === "ja" || preferredLanguage === "en") {
    setLanguage(preferredLanguage);
  }
}

const applyTheme = (preference) => {
  const resolved = preference === "system" ? (systemTheme.matches ? "dark" : "light") : preference;
  root.dataset.theme = resolved;
  if (themeColor) themeColor.content = resolved === "dark" ? "#000000" : "#f5f5f7";
};

applyTheme(readSetting("theme", "system"));
themeButton?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  saveSetting("theme", next);
  applyTheme(next);
});
const handleSystemTheme = () => {
  if (readSetting("theme", "system") === "system") applyTheme("system");
};
if (systemTheme.addEventListener) systemTheme.addEventListener("change", handleSystemTheme);
else systemTheme.addListener(handleSystemTheme);

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const menuScrim = document.querySelector(".menu-scrim");
const closeMenu = () => {
  document.body.classList.remove("menu-open");
  menuButton?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
  mobileMenu?.setAttribute("inert", "");
  if (menuScrim) menuScrim.hidden = true;
};
const openMenu = () => {
  if (menuScrim) menuScrim.hidden = false;
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
  if (event.key === "Escape") closeMenu();
});
window.matchMedia("(min-width: 735px)").addEventListener?.("change", (event) => {
  if (event.matches) closeMenu();
});

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  root.classList.add("reveal-ready");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px" },
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const root = document.documentElement;
const header = document.querySelector(".site-header");
const languageButtons = document.querySelectorAll("[data-language-button]");
const translatedElements = document.querySelectorAll("[data-en][data-ja]");
const year = document.querySelector("#copyright-year");

function setLanguage(language) {
  root.dataset.language = language;
  root.lang = language;

  translatedElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.languageButton === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.title = language === "ja" ? "Jurina's Bot | 公式紹介" : "Jurina's Bot";
  localStorage.setItem("jurina-bot-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.languageButton));
});

const preferredLanguage = localStorage.getItem("jurina-bot-language");
if (preferredLanguage === "ja" || preferredLanguage === "en") {
  setLanguage(preferredLanguage);
}

window.addEventListener(
  "scroll",
  () => header?.classList.toggle("is-scrolled", window.scrollY > 12),
  { passive: true },
);

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

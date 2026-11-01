import { categories, commands, type CategoryId } from "../data/commands.ts";
import { copy, email } from "../data/copy.ts";
import { h, icon } from "../lib/dom.ts";
import { format, t } from "../lib/locale.ts";
import { tryCommandByName } from "./playground.ts";

const mailto = `mailto:${email}?subject=${encodeURIComponent("Jurina's Bot Access Request")}`;
const NewBadge = (): HTMLElement => h("span", { class: "new-badge" }, t(copy.newBadge));

const SectionHeading = (eyebrow: string, title: string, lead?: string): HTMLElement =>
  h(
    "div",
    { class: "section-heading reveal" },
    h("p", { class: "eyebrow" }, eyebrow),
    h("h2", null, title),
    lead && h("p", null, lead),
  );

export const Hero = (): HTMLElement =>
  h(
    "section",
    { class: "hero shell" },
    h("a", { class: "hero-pill reveal", href: "#coverage" }, NewBadge(), h("span", null, t(copy.heroPill)), icon("chevron")),
    h("h1", { class: "reveal" }, h("span", null, t(copy.heroTitle)), h("strong", null, t(copy.heroTitleAccent))),
    h("p", { class: "hero-lead reveal" }, t(copy.heroLead)),
    h(
      "div",
      { class: "actions reveal" },
      h("a", { class: "button button-primary", href: "#demo" }, t(copy.heroTry)),
      h("a", { class: "button button-secondary", href: "#access" }, t(copy.heroAccess), " ", icon("chevron")),
    ),
  );

export const Coverage = (): HTMLElement =>
  h(
    "section",
    { class: "coverage shell", id: "coverage" },
    SectionHeading(t(copy.coverageEyebrow), t(copy.coverageTitle), t(copy.coverageLead)),
    h(
      "div",
      { class: "coverage-grid" },
      h(
        "article",
        { class: "coverage-card coverage-us reveal" },
        h("p", { class: "card-kicker" }, t(copy.usKicker)),
        h("h3", null, t(copy.usTitle)),
        h("p", null, t(copy.usText)),
        h("code", { class: "coverage-code", "aria-hidden": "true" }, "KJFK"),
      ),
      h(
        "article",
        { class: "coverage-card coverage-jp reveal" },
        h("p", { class: "card-kicker" }, h("span", null, t(copy.jpKicker)), NewBadge()),
        h("h3", null, t(copy.jpTitle)),
        h("p", null, t(copy.jpText)),
        h("code", { class: "coverage-code", "aria-hidden": "true" }, "RJOA"),
      ),
    ),
  );

let commandFilter: CategoryId | "all" = "all";

export const Commands = (): HTMLElement => {
  const filters = h("div", { class: "filters reveal", role: "group", "aria-label": t(copy.filterLabel) });
  const list = h("ul", { class: "command-table reveal" });

  const render = (): void => {
    const options = [{ id: "all" as const, label: t(copy.filterAll) }, ...categories.map((category) => ({ id: category.id, label: t(category.label) }))];
    filters.replaceChildren(
      ...options.map((option) =>
        h(
          "button",
          {
            class: option.id === commandFilter ? "filter-button is-active" : "filter-button",
            type: "button",
            "aria-pressed": String(option.id === commandFilter),
            onClick: () => {
              commandFilter = option.id;
              render();
            },
          },
          option.label,
        ),
      ),
    );
    list.replaceChildren(
      ...commands
        .filter((command) => commandFilter === "all" || command.category === commandFilter)
        .map((command) =>
          h(
            "li",
            null,
            h(
              "button",
              { class: "command-row", type: "button", onClick: () => tryCommandByName(command.name) },
              h(
                "code",
                null,
                h("span", { class: "command-name" }, `/${command.name}`),
                command.options.map((option) => [" ", h("span", { class: "command-usage" }, `${option.name}:<${option.name.toUpperCase()}>`)]),
              ),
              h("span", { class: "command-summary" }, t(command.summary), command.isNew && NewBadge()),
              h("span", { class: "command-try" }, t(copy.navTry), " ", icon("chevron")),
            ),
          ),
        ),
    );
  };
  render();

  return h(
    "section",
    { class: "commands", id: "commands" },
    h(
      "div",
      { class: "shell" },
      SectionHeading(t(copy.commandsEyebrow), format(copy.commandsTitle, { count: String(commands.length) }), t(copy.commandsLead)),
      filters,
      list,
    ),
  );
};

export const Access = (): HTMLElement =>
  h(
    "section",
    { class: "access shell", id: "access" },
    SectionHeading(t(copy.accessEyebrow), t(copy.accessTitle)),
    h(
      "ol",
      { class: "steps" },
      copy.steps.map((step, index) =>
        h("li", { class: "step reveal" }, h("span", { class: "step-number" }, String(index + 1)), h("h3", null, t(step.title)), h("p", null, t(step.text))),
      ),
    ),
    h(
      "a",
      { class: "mail-card reveal", href: mailto },
      h("span", null, t(copy.mailLabel)),
      h("strong", null, email, " ", icon("external")),
    ),
  );

export const Rules = (): HTMLElement =>
  h(
    "section",
    { class: "rules shell", id: "rules" },
    h(
      "div",
      { class: "rules-card reveal" },
      h("div", { class: "rules-intro" }, h("p", { class: "eyebrow" }, t(copy.rulesEyebrow)), h("h2", null, t(copy.rulesTitle))),
      h("ul", { class: "rules-list" }, copy.rules.map((rule) => h("li", null, h("h3", null, t(rule.title)), h("p", null, t(rule.text))))),
    ),
    h("p", { class: "fine-print reveal" }, t(copy.finePrint), " ", h("a", { href: `mailto:${email}` }, email)),
  );

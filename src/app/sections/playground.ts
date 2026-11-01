import { commands, featured, findCommand, type Command, type Embed, type Example } from "../data/commands.ts";
import { copy } from "../data/copy.ts";
import { asset, h, icon } from "../lib/dom.ts";
import { format, t } from "../lib/locale.ts";

// A Discord-style channel you can type into. Nothing is fetched: every command
// answers with one of the saved examples in data/commands.ts.

type Interaction =
  | { kind: "reply"; input: string; command: Command; example: Example; missing?: { value: string; example: string }; time: string }
  | { kind: "unknown"; input: string; name: string; time: string }
  | { kind: "notCommand"; input: string; time: string };

interface ParsedInput {
  name: string;
  args: Record<string, string>;
}

const MAX_HISTORY = 6;
// Read on demand: this module also runs at build time, where there is no window.
const reducedMotion = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// State lives outside the DOM so a language switch can re-render without losing the conversation.
const state = {
  history: [] as Interaction[],
  draft: "",
  pickerIndex: 0,
  typing: 0,
};

const now = (): string => {
  const date = new Date();
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

// Accepts both "/datis icao:RJOA" and the lazier "/datis RJOA".
const parse = (input: string): ParsedInput => {
  const [head = "", ...rest] = input.trim().split(/\s+/);
  const name = head.slice(1).toLowerCase();
  const command = findCommand(name);
  const args: Record<string, string> = {};
  const unnamed: string[] = [];
  rest.forEach((token) => {
    const split = token.indexOf(":");
    if (split > 0) args[token.slice(0, split).toLowerCase()] = token.slice(split + 1);
    else unnamed.push(token);
  });
  command?.options.forEach((option) => {
    if (!args[option.name] && unnamed.length) args[option.name] = unnamed.shift()!;
  });
  return { name, args };
};

const describeArgs = (args: Record<string, string>): string => Object.values(args).filter(Boolean).join(" ");

const answer = (input: string): Interaction => {
  const time = now();
  if (!input.trim().startsWith("/")) return { kind: "notCommand", input, time };
  const { name, args } = parse(input);
  const command = findCommand(name);
  if (!command) return { kind: "unknown", input, name: `/${name}`, time };

  const given = Object.entries(args).filter(([, value]) => value);
  const match = command.examples.find((example) =>
    given.every(([key, value]) => example.args[key]?.toUpperCase() === value.toUpperCase()),
  );
  if (match) return { kind: "reply", input, command, example: match, time };

  const fallback = command.examples[0];
  return {
    kind: "reply",
    input,
    command,
    example: fallback,
    missing: { value: describeArgs(Object.fromEntries(given)).toUpperCase(), example: describeArgs(fallback.args) },
    time,
  };
};

const commandInput = (command: Command, example: Example = command.examples[0]): string =>
  [`/${command.name}`, ...command.options.map((option) => `${option.name}:${example.args[option.name] ?? ""}`)].join(" ");

// ---------- Message rendering ----------

const renderEmbed = (embed: Embed): HTMLElement =>
  h(
    "div",
    { class: `embed embed-${embed.accent}` },
    h("p", { class: embed.titleIsLink ? "embed-title is-link" : "embed-title" }, t(embed.title)),
    embed.heading && h("h3", { class: "embed-heading" }, embed.heading),
    embed.lines &&
      h(
        "div",
        { class: "embed-lines" },
        embed.lines.map((line) =>
          h(
            "p",
            { class: line.inline ? "embed-line is-inline" : line.value ? "embed-line is-block" : "embed-line" },
            h("strong", null, line.name),
            line.value && (line.inline ? ` ${line.value}` : [h("br"), line.value]),
          ),
        ),
      ),
    embed.fields &&
      h(
        "dl",
        { class: "embed-fields" },
        embed.fields.map((field) => h("div", null, h("dt", null, t(field.label)), h("dd", null, field.value))),
      ),
    embed.body && h("p", { class: "embed-body" }, embed.body),
    embed.image &&
      h("img", {
        class: "embed-image",
        src: asset(embed.image.src),
        alt: embed.image.alt,
        width: embed.image.width,
        height: embed.image.height,
        loading: "lazy",
      }),
    embed.footer && h("p", { class: "embed-source" }, embed.footer),
  );

const botMessage = (interaction: Interaction, ...body: Array<HTMLElement | string | false | undefined>): HTMLElement =>
  h(
    "article",
    { class: "message" },
    h(
      "p",
      { class: "message-context" },
      h("span", { class: "context-line", "aria-hidden": "true" }),
      format(copy.used, { user: t(copy.you), command: "\u0000" })
        .split("\u0000")
        .flatMap((part, index) => (index === 0 ? [part] : [h("code", null, interaction.input.trim().split(/\s+/)[0]), part])),
    ),
    h(
      "div",
      { class: "message-main" },
      h("img", { class: "message-avatar", src: asset("img/1.png"), alt: "" }),
      h(
        "div",
        { class: "message-body" },
        h(
          "p",
          { class: "message-meta" },
          h("strong", null, "Jurina's Bot"),
          h("span", { class: "bot-tag" }, t(copy.botTag)),
          h("time", null, format(copy.today, { time: interaction.time })),
        ),
        ...body,
      ),
    ),
  );

const renderInteraction = (interaction: Interaction): HTMLElement => {
  if (interaction.kind === "reply") {
    const { example, missing } = interaction;
    return botMessage(
      interaction,
      missing && h("p", { class: "message-text is-muted" }, format(copy.otherExample, missing)),
      example.content && h("p", { class: "message-text" }, t(example.content)),
      example.embed && renderEmbed(example.embed),
      example.button && h("span", { class: "link-button" }, t(example.button), icon("external")),
      h("p", { class: "message-note" }, t(copy.exampleNote)),
    );
  }
  const text =
    interaction.kind === "unknown" ? format(copy.unknownCommand, { command: interaction.name }) : t(copy.notCommand);
  return botMessage(
    interaction,
    h("p", { class: "message-text" }, text),
    h("p", { class: "message-note" }, icon("eye"), t(copy.onlyYou)),
  );
};

// ---------- Playground ----------

let runFromOutside: ((input: string) => void) | undefined;

// Lets the command list and hero chips type into the playground.
export const tryCommand = (input: string): void => {
  document.querySelector("#demo")?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  runFromOutside?.(input);
};

export const tryCommandByName = (name: string): void => {
  const command = findCommand(name);
  if (command) tryCommand(commandInput(command));
};

export function Playground(): HTMLElement {
  if (!state.history.length) state.history.push(answer(featured[0].input));

  const feed = h("div", { class: "console-feed", "aria-live": "polite" });
  const picker = h("div", { class: "command-picker", id: "command-picker", role: "listbox", hidden: true });
  const input = h("input", {
    class: "composer-input",
    type: "text",
    value: state.draft,
    placeholder: t(copy.placeholder),
    "aria-label": t(copy.inputLabel),
    "aria-controls": "command-picker",
    "aria-autocomplete": "list",
    autocomplete: "off",
    autocapitalize: "off",
    spellcheck: "false",
    enterkeyhint: "send",
  });

  const renderFeed = (): void => {
    feed.replaceChildren(...state.history.map(renderInteraction));
    feed.scrollTop = feed.scrollHeight;
    // Images change the height after they load.
    feed.querySelectorAll("img").forEach((image) => image.addEventListener("load", () => { feed.scrollTop = feed.scrollHeight; }, { once: true }));
  };

  // While the command name is being typed, list matches; once it's chosen, show its options.
  const matches = (): Command[] => {
    const value = input.value.trimStart();
    if (!value.startsWith("/") || /\s/.test(value)) return [];
    const query = value.slice(1).toLowerCase();
    return commands.filter((command) => command.name.startsWith(query) || (query.length > 1 && command.name.includes(query)));
  };

  const chosenCommand = (): Command | undefined => {
    const value = input.value.trimStart();
    if (!value.startsWith("/") || !/\s/.test(value)) return undefined;
    return findCommand(value.slice(1).split(/\s/)[0].toLowerCase());
  };

  const complete = (command: Command): void => {
    input.value = command.options.length ? `/${command.name} ${command.options[0].name}:` : `/${command.name}`;
    state.draft = input.value;
    renderPicker();
    input.focus();
  };

  const renderPicker = (): void => {
    const list = matches();
    const chosen = chosenCommand();
    picker.hidden = !list.length && !chosen && !input.value.trimStart().startsWith("/");

    if (chosen) {
      picker.replaceChildren(
        h("p", { class: "picker-title" }, `/${chosen.name}`),
        ...(chosen.options.length
          ? chosen.options.map((option) =>
              h(
                "div",
                { class: "picker-option" },
                h("code", null, option.name),
                h("span", null, t(option.hint)),
                h("span", { class: "picker-required" }, t(copy.required)),
              ),
            )
          : [h("p", { class: "picker-summary" }, t(chosen.summary))]),
      );
      input.removeAttribute("aria-activedescendant");
      return;
    }

    if (!list.length) {
      picker.replaceChildren(h("p", { class: "picker-empty" }, t(copy.pickerEmpty)));
      return;
    }

    state.pickerIndex = Math.min(state.pickerIndex, list.length - 1);
    picker.replaceChildren(
      h("p", { class: "picker-title" }, t(copy.pickerTitle), h("span", null, input.value.trim())),
      ...list.map((command, index) =>
        h(
          "button",
          {
            class: index === state.pickerIndex ? "picker-item is-active" : "picker-item",
            type: "button",
            role: "option",
            id: `picker-${command.name}`,
            "aria-selected": String(index === state.pickerIndex),
            onMouseDown: (event: MouseEvent) => event.preventDefault(),
            onClick: () => complete(command),
          },
          h("img", { src: asset("img/1.png"), alt: "" }),
          h(
            "span",
            { class: "picker-text" },
            h("span", { class: "picker-name" }, `/${command.name}`, command.options.map((option) => h("span", { class: "picker-arg" }, option.name))),
            h("span", { class: "picker-summary" }, t(command.summary)),
          ),
          h("span", { class: "picker-bot" }, "Jurina's Bot"),
        ),
      ),
      h("p", { class: "picker-keys" }, t(copy.pickerKeys)),
    );
    input.setAttribute("aria-activedescendant", `picker-${list[state.pickerIndex].name}`);
  };

  const send = (value: string): void => {
    if (!value.trim()) return;
    state.history = [...state.history, answer(value)].slice(-MAX_HISTORY);
    state.draft = "";
    input.value = "";
    state.pickerIndex = 0;
    renderPicker();
    renderFeed();
  };

  // Types the command out like a person would, then sends it.
  runFromOutside = (value: string): void => {
    window.clearInterval(state.typing);
    if (reducedMotion()) {
      send(value);
      return;
    }
    input.value = "";
    let index = 0;
    state.typing = window.setInterval(() => {
      index += 1;
      input.value = value.slice(0, index);
      renderPicker();
      if (index >= value.length) {
        window.clearInterval(state.typing);
        window.setTimeout(() => send(value), 260);
      }
    }, 34);
  };

  input.addEventListener("input", () => {
    window.clearInterval(state.typing);
    state.draft = input.value;
    state.pickerIndex = 0;
    renderPicker();
  });
  input.addEventListener("focus", renderPicker);
  input.addEventListener("blur", () => { window.setTimeout(() => { picker.hidden = true; }, 120); });
  input.addEventListener("keydown", (event) => {
    const list = matches();
    if (list.length && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      event.preventDefault();
      state.pickerIndex = (state.pickerIndex + (event.key === "ArrowDown" ? 1 : list.length - 1)) % list.length;
      renderPicker();
    } else if (list.length && event.key === "Tab") {
      event.preventDefault();
      complete(list[state.pickerIndex]);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const exact = list.find((command) => `/${command.name}` === input.value.trim().toLowerCase());
      if (list.length && !(exact && !exact.options.length)) complete(exact ?? list[state.pickerIndex]);
      else send(input.value);
    } else if (event.key === "Escape") {
      picker.hidden = true;
    }
  });

  const composer = h(
    "form",
    {
      class: "console-composer",
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        send(input.value);
      },
    },
    h("span", { class: "composer-plus", "aria-hidden": "true" }, "+"),
    input,
    h("button", { class: "composer-send", type: "submit", "aria-label": t(copy.send) }, icon("send")),
  );

  renderFeed();

  return h(
    "section",
    { class: "demo shell", id: "demo", "aria-label": t(copy.playgroundLabel) },
    h(
      "div",
      { class: "demo-chips reveal" },
      h("span", { class: "demo-chips-label" }, t(copy.playgroundTry)),
      featured.map((item) =>
        h(
          "button",
          { class: "demo-chip", type: "button", onClick: () => runFromOutside?.(item.input) },
          h("code", null, item.input),
          item.isNew && h("span", { class: "new-badge" }, t(copy.newBadge)),
        ),
      ),
    ),
    h(
      "div",
      { class: "console reveal" },
      h(
        "div",
        { class: "window-bar" },
        h("span"), h("span"), h("span"),
        h("p", null, `# ${t(copy.channel)}`),
        h(
          "button",
          {
            class: "console-clear",
            type: "button",
            onClick: () => {
              state.history = [];
              renderFeed();
              input.focus();
            },
          },
          t(copy.clear),
        ),
      ),
      feed,
      h("div", { class: "composer-wrap" }, picker, composer),
    ),
    h("p", { class: "demo-note reveal" }, t(copy.demoNote)),
  );
}

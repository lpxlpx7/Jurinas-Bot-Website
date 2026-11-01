// A tiny element builder so every page section can be written as plain TypeScript.

export type Child = Node | string | number | null | undefined | false | Child[];

type AttrValue = string | number | boolean | null | undefined;
type Handler = (event: never) => void;
export type Attrs = { [name: string]: AttrValue | Handler };

const append = (parent: Node, child: Child): void => {
  if (child === null || child === undefined || child === false) return;
  if (Array.isArray(child)) {
    child.forEach((item) => append(parent, item));
    return;
  }
  parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
};

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Attrs | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs ?? {})) {
    if (typeof value === "function") {
      // onClick -> click, onKeyDown -> keydown
      node.addEventListener(name.slice(2).toLowerCase(), value as EventListener);
    } else if (name === "class") {
      if (value) node.className = String(value);
    } else if (value === true) {
      node.setAttribute(name, "");
    } else if (value !== false && value !== null && value !== undefined) {
      node.setAttribute(name, String(value));
    }
  }
  append(node, children);
  return node;
}

export const icon = (name: string): HTMLSpanElement => h("span", { class: `icon icon-${name}`, "aria-hidden": "true" });

// The site is served from the domain root, so root-relative paths work from every page.
export const asset = (path: string): string => `/${path}`;

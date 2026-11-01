// A tiny element builder so every page section can be written as plain TypeScript.
const append = (parent, child) => {
    if (child === null || child === undefined || child === false)
        return;
    if (Array.isArray(child)) {
        child.forEach((item) => append(parent, item));
        return;
    }
    parent.appendChild(child instanceof Node ? child : document.createTextNode(String(child)));
};
export function h(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs ?? {})) {
        if (typeof value === "function") {
            // onClick -> click, onKeyDown -> keydown
            node.addEventListener(name.slice(2).toLowerCase(), value);
        }
        else if (name === "class") {
            if (value)
                node.className = String(value);
        }
        else if (value === true) {
            node.setAttribute(name, "");
        }
        else if (value !== false && value !== null && value !== undefined) {
            node.setAttribute(name, String(value));
        }
    }
    append(node, children);
    return node;
}
export const icon = (name) => h("span", { class: `icon icon-${name}`, "aria-hidden": "true" });
// This file compiles to js/lib/dom.js; assets sit two levels up, for both the root and the Chinese page.
export const asset = (path) => new URL(`../../${path}`, import.meta.url).href;

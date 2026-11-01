import type { Locale } from "../app/lib/locale.ts";

export const origin = "https://bot.jurina.org";
const ogImage = `${origin}/assets/og-card.svg`;

export type PageMeta = {
  /** Output path inside dist/. */
  file: string;
  /** Path the page is served at, for canonical and share links. */
  path: string;
  kind: "home" | "not-found";
  htmlLang: string;
  locale: Locale;
  title: string;
  description: string;
  shareDescription: string;
  /** Other language versions, as hreflang → path. */
  alternates?: Record<string, string>;
  index: boolean;
};

export const pages: PageMeta[] = [
  {
    file: "index.html",
    path: "/",
    kind: "home",
    htmlLang: "en",
    locale: "en",
    title: "Jurina's Bot",
    description: "Jurina's Bot brings VATSIM member lookups, METAR and TAF, Digital ATIS for the US and Japan, and Haneda operations to approved Discord servers.",
    shareDescription: "Flight-sim answers, one slash away.",
    // The Chinese page is unlisted, so nothing here links to it.
    index: true,
  },
  {
    file: "cn/index.html",
    path: "/cn/",
    kind: "home",
    htmlLang: "zh-CN",
    locale: "zh",
    title: "Jurina's Bot | 中文介绍",
    description: "Jurina's Bot 为获批的 Discord 服务器提供 VATSIM 成员查询、METAR 与 TAF、美国与日本的 Digital ATIS，以及羽田运行信息。",
    shareDescription: "模拟飞行的答案，只差一个斜杠。",
    alternates: { en: "/" },
    index: true,
  },
  {
    file: "404.html",
    path: "/404.html",
    kind: "not-found",
    htmlLang: "en",
    locale: "en",
    title: "Page not found | Jurina's Bot",
    description: "This page is not available.",
    shareDescription: "This page is not available.",
    index: false,
  },
];

const attr = (value: string): string => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export type Assets = {
  /** Built URL (with cache-busting hash) for a css/ or js/ path. */
  url: (path: string) => string;
  /** The theme bootstrap, inlined so nothing paints in the wrong theme. */
  themeInit: string;
};

/** Wraps prerendered body markup in the shared document head. */
export const document = (page: PageMeta, body: string, assets: Assets): string => {
  const url = `${origin}${page.path}`;
  const share = page.index
    ? [
        `<meta property="og:type" content="website">`,
        `<meta property="og:title" content="${attr(page.title)}">`,
        `<meta property="og:description" content="${attr(page.shareDescription)}">`,
        `<meta property="og:url" content="${url}">`,
        `<meta property="og:image" content="${ogImage}">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${attr(page.title)}">`,
        `<meta name="twitter:description" content="${attr(page.shareDescription)}">`,
        `<meta name="twitter:image" content="${ogImage}">`,
        `<link rel="canonical" href="${url}">`,
        ...Object.entries(page.alternates ?? {}).map(([lang, path]) => `<link rel="alternate" hreflang="${lang}" href="${origin}${path}">`),
      ]
    : [];
  const head = [
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`,
    `<meta name="description" content="${attr(page.description)}">`,
    `<meta name="theme-color" content="#f5f5f7">`,
    `<meta name="robots" content="${page.index ? "index, follow" : "noindex"}">`,
    ...share,
    `<title>${attr(page.title)}</title>`,
    `<link rel="icon" href="/img/1.png" type="image/png">`,
    `<link rel="apple-touch-icon" href="/img/1.png">`,
    `<link rel="manifest" href="/site.webmanifest">`,
    `<script>${assets.themeInit}</script>`,
    `<link rel="stylesheet" href="${assets.url("css/style.css")}">`,
    `<script src="${assets.url("js/main.js")}" defer></script>`,
  ];
  return `<!doctype html>
<html lang="${page.htmlLang}">
<head>
${head.map((line) => `  ${line}`).join("\n")}
</head>
<body>
${body}
</body>
</html>
`;
};

# Jurina's Bot Website

The English and Japanese website for Jurina's Bot, a private Discord bot for flight simulation communities.

**Live website:** https://bot.jurina.org/

## Features

- Discord-style command playground: type `/` to pick a command and see an example reply
- Digital ATIS coverage for the United States and Japan
- Filterable reference for every bot command
- Access request steps, ground rules and disclaimer
- English and Japanese, light and dark themes, phone layout with a full-screen menu

The playground only shows saved examples. It never fetches live data.

## Development

Everything is TypeScript: the pages, the styles and the browser code. Node 24 or newer runs the build directly from the `.ts` sources.

```bash
npm install
npm run build   # writes the site to dist/
npm run check   # type-checks everything
npm run dev     # rebuilds on every change in src/
```

To preview, serve `dist/` with any static server, for example:

```bash
python -m http.server 5174 --directory dist
```

The build renders each page with the same components the browser uses, so the HTML in `dist/` already contains the full page. The browser then renders it again to attach the interactive parts.

### Layout

| Path | Contents |
| --- | --- |
| `src/app/data/copy.ts` | All page text, in every language |
| `src/app/data/commands.ts` | Commands, their options and the example replies the playground shows |
| `src/app/sections/` | Page sections; `playground.ts` is the command input |
| `src/app/app.ts` | The page tree shared by the build and the browser |
| `src/client/` | Browser entry points: theme, language, menu |
| `src/styles/` | Stylesheet modules, joined into `css/style.css` |
| `src/site/pages.ts` | Page list and the document `<head>` |
| `src/build/` | The build: bundles scripts, minifies styles, prerenders pages |
| `public/` | Copied as-is: images, `CNAME`, `robots.txt`, sitemap |

To change a command or its example reply, edit `src/app/data/commands.ts`.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which type-checks, builds and publishes `dist/` to GitHub Pages at `bot.jurina.org`. The repository's Pages source must be set to **GitHub Actions**.

## Contact

For access requests or questions, email `dev@jurina.org`.

## License

Copyright (C) 2026 Jurina.

The website source code is licensed under the [GNU General Public License v2.0 only](LICENSE). Third-party names, trademarks, services, and data referenced by the website remain the property of their respective owners. Icons in `public/img/icons/` from Ionicons are MIT-licensed; see `public/img/icons/LICENSE-ionicons.txt`.

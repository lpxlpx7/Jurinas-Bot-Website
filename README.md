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

The whole site is written in TypeScript and rendered in the browser. The HTML files only hold the page metadata and an empty container.

```bash
npm install
npm run build
```

`npm run build` compiles `src/` into `js/`. GitHub Pages serves the repository as it is, with no build step, so commit the compiled `js/` folder together with your changes in `src/`. Use `npm run watch` to rebuild on every save.

To preview, serve the folder with any static server, for example:

```bash
python -m http.server 5174
```

ES modules don't load from `file://` URLs, so opening `index.html` directly won't work.

### Layout

| Path | Contents |
| --- | --- |
| `src/data/copy.ts` | All page text, in every language |
| `src/data/commands.ts` | Commands, their options and the example replies the playground shows |
| `src/sections/` | Page sections; `playground.ts` is the command input |
| `src/lib/` | Element builder and language helpers |
| `src/main.ts` | Entry point: theme, language, menu and rendering |
| `css/style.css` | Styles |

To change a command or its example reply, edit `src/data/commands.ts` and run `npm run build`.

## Deployment

The site is deployed from the `main` branch with GitHub Pages at `bot.jurina.org` (see `CNAME`).

## Contact

For access requests or questions, email `dev@jurina.org`.

## License

Copyright (C) 2026 Jurina.

The website source code is licensed under the [GNU General Public License v2.0 only](LICENSE). Third-party names, trademarks, services, and data referenced by the website remain the property of their respective owners. Icons in `img/icons/` from Ionicons are MIT-licensed; see `img/icons/LICENSE-ionicons.txt`.

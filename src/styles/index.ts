/* Stylesheets the build writes, and the modules each one is made of, in cascade order. */
import fonts from "./base/fonts.ts";
import tokens from "./base/tokens.ts";
import reset from "./base/reset.ts";
import header from "./layout/header.ts";
import mobileMenu from "./layout/mobile-menu.ts";
import buttons from "./base/buttons.ts";
import hero from "./sections/hero.ts";
import playground from "./sections/playground.ts";
import sectionHeading from "./base/section-heading.ts";
import coverage from "./sections/coverage.ts";
import commands from "./sections/commands.ts";
import access from "./sections/access.ts";
import rules from "./sections/rules.ts";
import footer from "./layout/footer.ts";
import notFound from "./pages/not-found.ts";
import reveal from "./base/reveal.ts";
import icons from "./base/icons.ts";
import tablet from "./responsive/tablet.ts";
import phone from "./responsive/phone.ts";
import reducedMotion from "./responsive/reduced-motion.ts";

export const stylesheets = {
  /** Every page. Breakpoint overrides come last so they win over the sections above them. */
  "css/style.css": [
    fonts, tokens, reset, header, mobileMenu, buttons, hero, playground, sectionHeading, coverage, commands, access, rules, footer, notFound, reveal, icons, tablet, phone, reducedMotion,
  ],
} satisfies Record<string, string[]>;

# MyWorkouts — project conventions

Personal fitness tracker: **Angular 21** frontend (in `frontend/`) + **Spring Boot** backend (root `pom.xml`).

## Frontend styling — Tailwind first

The frontend uses **Tailwind CSS** (`frontend/tailwind.config.js`, `@tailwind` directives in `src/styles.scss`). **Prefer Tailwind utility classes over custom component SCSS** whenever possible.

- **Use Tailwind for:** layout, spacing, sizing, flex/grid, typography, borders, simple colors, and **responsive breakpoints** — including arbitrary ones like `max-[420px]:p-4` or `sm:flex`. **Do not hand-write `@media`** queries for elements you author; use Tailwind variants instead.
- **Arbitrary values** (e.g. `max-w-[400px]`, `bg-[var(--brand-primary)]`) are fine when they read cleanly.
- **Reserve component SCSS only for what Tailwind can't cleanly express:**
  - multi-stop radial/linear gradients, `@keyframes` animations;
  - Angular Material MDC token overrides (`--mdc-*`) and theming (`:host-context(.dark-theme)`);
  - `::ng-deep` tweaks to **Material-internal** DOM you don't author (e.g. `.mat-button-toggle-label-content`) — a `@media` is acceptable there since there's no element to put a class on.

## Theme colors

- Global theme lives in `src/themes.scss` (Angular Material M2): **orange** brand — deep-orange primary (light), orange primary (dark), blue-grey accent.
- For custom (non-Material) markup that needs the brand color, use the CSS tokens defined in `src/styles.scss` so it tracks light/dark automatically:
  `var(--brand-primary)`, `--brand-primary-strong`, `--brand-on-primary`, `--brand-primary-soft`, `--brand-primary-softer`.
- Global rounding/type polish (MDC shape tokens, card radius, headings) also lives in `src/styles.scss`. Don't re-hardcode radii per component.

## Build / verify

- Frontend build: `cd frontend && npm run build`. Dev server: `npm start` (`ng serve`).
- Backend compile (needs JDK 21): `./mvnw -q -DskipTests -Pdev compile`.

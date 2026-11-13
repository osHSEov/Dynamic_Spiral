# Spiral Dynamics in Organizations

An educational single-page website. It introduces Clare W. Graves's theory of value systems and Beck and Cowan's Spiral Dynamics, then offers an interactive spiral that explores one business-oriented reading (Sergey Litti / Litti Pro) of how the eight levels show up in organizations.

Built with React 19, TypeScript and Vite 7, using SVG and plain CSS. No backend, API key or network service is needed at runtime. The fonts are bundled locally through `@fontsource`.

## Requirements

- Node.js 20.19+ or 22.12+ (tested with Node 22.23.4 and npm 10.9.9)

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:5173
npm run build      # type-check (tsc -b) and build into dist/
npm run preview    # serve the built dist/ at http://localhost:4173
npm run typecheck  # type-check only
```

The build sets `base: './'`, so every URL in `dist/` is relative. You can open `dist/` from any static host or sub-path. Opening `dist/index.html` straight from the file system (`file://`) is not supported, because browsers block ES modules there. Use `npm run preview` or any static server instead.

## Project layout

```
index.html
vite.config.ts
public/assets/            images served as-is (relative paths)
  portrait/clare-graves.png
  levels/01-beige.png … 08-turquoise.png
  figures/graves-1970-figure-1.png   (extracted from the research PDF, page 2)
source-materials/         original supplied files with original names (not deployed)
src/
  content/                all text and asset mappings, no UI code
    types.ts              shared content model (Level, SourcedPoint, Screenshot, …)
    levels.ts             the eight levels: Graves / Dinan / Litti Pro layers,
                          per-dimension notes, screenshot transcription + translation
    site.ts               section copy, dimensions, portrait and figure assets
    sources.ts            source records, source-tag labels, screenshot credit
  lib/                    spiral geometry, color helpers, asset URL, media query hook
  components/             UI components (read content, never hard-code level facts)
  styles/global.css
```

### One shared level model

`src/content/levels.ts` drives the opening diagram, the transition section and the spiral explorer. Each `Level` holds:

- `graves`: letter pair, Graves's name and a paraphrase
- `spiralDynamics`: Dinan's theme and a paraphrase
- `organization`: principle, emphasis, leadership, practices, strengths and tensions. Every bullet carries a `source` tag (`slide`, `table`, `dinan`, `editor`).
- `dimensions`: one sourced line each for `authority`, `rules`, `incentives` and `cooperation`. These are the four questions in the transition section, and they are meant as the axes for a later company-assessment module (not built in this milestone).
- `screenshot`: path, original filename, pixel size, the Russian slide text with English meanings, a diagram description, and any cropped or illegible parts.

To change wording, edit the content files only.

### Missing images

Images load from `public/assets` by relative path. If a file is missing or can't be read, `SafeImage` shows a labelled placeholder with the expected filename. It never substitutes a different picture.

## Accessibility notes

- Every level can be selected with ordinary `<button>`s (Tab plus Enter or Space). Arrow keys, Home and End also move between them.
- The SVG spiral works with mouse and touch. It is exposed to assistive technology as one labelled image, so the buttons are the accessible control.
- Focus is shown with a 3px outline. Levels are identified by name and number, never by color alone.
- The enlarged-image view uses the native `<dialog>`: it traps focus, closes on Escape or a backdrop click, and returns focus to the control that opened it.
- `prefers-reduced-motion` turns off transitions and the panel fade. Nothing animates continuously, and page scrolling is never intercepted.

## Credits

See `CREDITS.md` and the "Sources, credits and caveats" section of the site. Reuse permissions for the supplied images have **not** been independently verified.

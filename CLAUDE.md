# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, single-page educational site (React 19 + TypeScript + Vite 7, SVG and plain CSS, no backend) about Clare W. Graves's value-systems theory, Beck & Cowan's Spiral Dynamics, and one business-oriented reading of it (Sergey Litti / Litti Pro). `HANDOFF.md` describes what milestone 1 built, the design decisions, the open questions about content and permissions, and which checks were and weren't run. Read it before making substantive changes.

## Commands

```bash
npm run dev        # dev server, http://localhost:5173
npm run build      # tsc -b && vite build -> dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run typecheck  # tsc -b only
```

There is no test suite or linter. `npm run typecheck` / `npm run build` is the verification step; earlier browser checks were done by hand with headless Playwright against `npm run preview`. Node 20.19+ or 22.12+.

`vite.config.ts` sets `base: './'`, so every built URL is relative. Resolve asset paths through `assetUrl()` in `src/lib/assetUrl.ts` and never hard-code absolute `/assets/...` paths. `dist/` does not work over `file://` (ES modules), so use `npm run preview`.

## Architecture

**Content is separate from UI.** Every text string and level fact lives in `src/content/`. Components only read from it and must never hard-code level facts. To change wording, edit the content files.

- `types.ts`: the shared content model. A single `Level` record (keyed by `LevelId`: beige to turquoise) drives every view: the hero diagram, the transition section and the spiral explorer. Its `dimensions` field (authority / rules / incentives / cooperation) is meant to seed a future company-assessment module.
- `levels.ts`: the eight levels, plus `DEFAULT_LEVEL` (Blue).
- `site.ts`: section copy, dimension definitions, portrait and figure assets. `sources.ts`: source records and tag labels.

**Three source layers stay visibly separate.** Graves (`graves`), Beck & Cowan via Dinan (`dinan`) and Litti Pro (`table` = the notes table, `slide` = text on the screenshot), plus `editor` for connecting sentences that add no new facts. Each organizational bullet is a `SourcedPoint` with a `source` field. The field is no longer shown on the page (the owner removed the visible tags), but it is kept as a provenance record, so tag new content honestly. Content rules from the handoff: paraphrase Graves (no direct quotes), leave out Dinan's population and "power" percentages, never invent limitations a source doesn't state, and record cropped or illegible screenshot text in `screenshot.limitations` instead of reconstructing it.

**State flow.** `App.tsx` holds the single `selected: LevelId`. `Transition` calls `openInExplorer`, which selects the level, scrolls to `#explorer` and focuses `#level-panel h3`. `Explorer` passes `selected` and `onSelect` to `Spiral` (SVG, mouse and touch), `LevelSelector` (the accessible `<button>` controls, with arrow, Home and End keys) and `LevelPanel`.

**Spiral rendering.** `src/lib/spiralGeometry.ts` is a pure function (`buildSpiral`) that cuts a widening helical ribbon into quads, projects them with a perspective camera, applies Lambert shading and sorts them back to front (painter's algorithm). `Spiral.tsx` holds `FULL` and `COMPACT` option presets and handles coloring (`src/lib/color.ts`: `mix` and `shade`) for the selected, hovered and muted states. The SVG is exposed to assistive tech as one labelled image. The buttons are the accessible control.

**Responsive breakpoints.** Explorer switches to compact mode below 900px (`useMediaQuery('(max-width: 899px)')`). Below 720px the hero SVG (`ValueSystemsDiagram`) is replaced by an ordered list built from the same data, and that list is also the screen-reader version on desktop.

**Images.** Served from `public/assets/` with normalized names (`levels/01-beige.png` …). The original supplied files, with their original (sometimes misspelled) names, are in `source-materials/` and are not deployed. `SafeImage` shows a labelled placeholder with the expected filename when an image fails to load. It must never substitute a different image. `ImageDialog` uses the native `<dialog>` and returns focus to the control that opened it.

## Accessibility invariants to preserve

Levels are identified by name and number, never by color alone. Keep the 3px focus outline. `prefers-reduced-motion` must disable transitions and the panel fade. Nothing animates continuously, and page scroll is never intercepted (wheel scrolling over the spiral scrolls the page).

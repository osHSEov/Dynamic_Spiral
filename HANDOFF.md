# Handoff note: Spiral Dynamics in Organizations (milestone 1)

## What was built

A single-page React + TypeScript + Vite site with four sections:

- **A. Opening:** a portrait column on the left (photo, credit, short introduction, and a "model, not a law" note) next to a large SVG of eight open rings. Each ring shows Graves's letter pair, Graves's name for the system, and the later color label. The rings widen upward, with dashed open rings above the top and an arrow on the axis, so the figure is open-ended rather than a closed pyramid. A dashed line marks G–T as Graves's first "being" level and Beck & Cowan's "second tier". Below that there is a short theory section (six paraphrased claims, Graves's own Figure 1 from the PDF, how to read the letter pairs, and the three source layers).
- **B. Transition:** four questions (authority, rules, incentives, cooperation). Each one compares four contrasting levels, and clicking a level opens it in the explorer.
- **C. Explorer:** a helical SVG ribbon with one full turn per level, widening upward. It has per-slice Lambert shading, front and back faces, and depth sorting. The selected level stays at full color and is pushed slightly outward, while the others are muted. Labels sit outside the geometry with leader lines. Eight ordinary HTML buttons always sit below the spiral. On desktop the spiral is sticky on the left and the panel is on the right. Below 900 px the layout switches to a compact spiral with numbered badges, then the buttons, then the panel. The panel shows the name and principle, leadership, practices, strengths, tensions, the screenshot with its Russian text transcribed and translated, the caption and source, an enlarge control, and the same level in Graves's and Dinan's terms.
- **D. References:** six caveats and the source and credit list.

## Design choices

- **Look:** warm paper (#F6F1E7), near-black ink, Fraunces for display, Source Serif 4 for body text and Inter for UI. All three are bundled. Color appears only in the diagrams, swatches and selected-state accents.
- **Source tags:** every organizational statement carries a small tag (Slide / Notes table / Dinan / Editor's note) to keep the three layers (Graves, Beck & Cowan via Dinan, Litti Pro) visibly separate. The explorer header has a key that explains the tags.
- **Content handling:** text is paraphrased, with no direct quotations from Graves, because the excerpt in the notes could not be checked against the paper. Dinan's population and "power" percentages and his example lists are left out. Where the sources name no limitation (Yellow), the panel says so instead of inventing one. Teal and Turquoise are explicitly distinguished, both in the Turquoise panel and in the references.
- **Default selection:** Blue (level 4), a middle level that is easy to recognize. You can change it with `DEFAULT_LEVEL` in `src/content/levels.ts`.
- **Hero diagram on phones:** below 720 px the SVG becomes a color-coded ordered list built from the same data. That list is also what screen readers get on desktop.
- **Assets:** all assets live in `public/assets` with normalized names (`01-beige.png` …), and their original names are recorded in the content model and in `CREDITS.md`. The original files are kept in `source-materials/`.

## Missing or uncertain inputs

- **No separate asset or source notes file** was supplied.
- **No URL, date or timestamps** for the Litti Pro video, and **no URL or date** for Dinan's summary.
- **Portrait:** it reached me as Clare Graves, but I couldn't confirm who it shows, and the photographer, date and source are unknown.
- **Reuse permissions** for the portrait, Figure 1 and the screenshots are **not verified**.
- **Cropped or illegible screenshot details** were not transcribed:
  - the last line of the Purple slide;
  - the second deputy-director label and one lower label on Blue (right edge);
  - a red shape at the edge of Beige;
  - a red overlay label in Turquoise's corner.
- **Added bibliographic details:** the journal, volume and issue for Graves (1970) came from general knowledge, as did the attribution of "Teal" to Laloux. Check them before publishing.
- **Filename misspellings:** `biege.png` and `torquoise.png` are misspelled in the supplied files. They were renamed in the project, and the original names are recorded.

## Checks executed

All browser checks ran in headless Chromium (Playwright) against `npm run preview`, i.e. the production build, unless noted otherwise.

1. `npm run build` (that is `tsc -b` plus `vite build`): passes with no TypeScript errors.
2. **Fresh-install build from the archive:** I unzipped the archive into an empty folder, ran `npm install` and `npm run build`, and it passed (see the bottom of this note).
3. **Level mapping, all 8 levels via the buttons:** for each level, the panel title, principle, image file (`0N-<level>.png`), slide heading in the translation table (for example СИЛА for Red), image actually loaded (naturalWidth > 0), pressed button and highlighted spiral segment all match.
4. **Spiral mouse click** on a visible segment for Turquoise, Beige and Orange selects that level. Clicking an outside label (Purple) also selects it.
5. **Keyboard:** Enter and Space activate a button. ArrowRight moves both the selection and the focus. End jumps to Turquoise. The focused button has a 3px solid outline.
6. **Image dialog:**
   - it opens from the button and from the image;
   - focus moves to Close;
   - six Tab presses stay inside the dialog;
   - Escape closes it and focus returns to "Enlarge image";
   - a backdrop click closes it;
   - the Graves Figure 1 dialog opens and closes with Escape.
7. **Transition links:** clicking "Green" selects Green, scrolls the explorer into view and focuses the panel heading.
8. **Sticky spiral:** it stays in view (top at 16 px) while scrolling to the end of the panel at 1440×900.
9. **No horizontal page scroll** at 1920, 1280, 1024, 820, 390 and 320 px widths. Desktop layout is used at ≥ 900 px, the compact spiral below that, and the hero list ≤ 720 px. I viewed screenshots at 1440, 1280, 820 and 390 px.
10. **Missing images:** with all image requests blocked, labelled fallbacks appear for the portrait, Figure 1 and the screenshot. They stay in place after a level change and inside the dialog, and there is no overflow.
11. **Long text:** long sentences and 100+ character unbroken words were injected into the panel bullets, translation table, panel title, buttons and transition rows. No page or panel overflow at 1280 or 390 px.
12. **Reduced motion:** with `prefers-reduced-motion: reduce` emulated, spiral transitions and the panel animation compute to about 0 s. No infinite animations exist on the page.
13. **Scrolling:** wheel-scrolling over the spiral scrolls the page, so scroll is not hijacked.
14. **Console:** no errors on the desktop run.
15. **Contrast:** I computed WCAG ratios for the palette. Body ink is 15.4:1, secondary 8.7:1 and muted text 4.9–5.7:1. All eight level "deep" accent colors are at least 5.2:1 on the panel background.
16. **Dev server:** `npm run dev` starts and serves the page (HTTP 200).

## Not verified

- **Other browsers:** Safari, Firefox and Edge were not tested. Native `<dialog>` and container queries need reasonably recent versions.
- **Real hardware:** no tests on real phones or tablets, and no real touch input beyond emulated viewport sizes.
- **Screen readers:** none were used (VoiceOver, NVDA, JAWS). The ARIA structure has not been checked by a person or by axe or Lighthouse.
- **Contrast inside the SVG:** not measured, for example the muted colors of unselected segments. Those segments are decorative, and every one has a text label.
- **Print stylesheet:** only written, never tested.
- **Hosting:** performance on slow networks and deployment to an actual host were not tested. The site was not published, as requested.
- **Facts beyond the supplied notes:** the added bibliographic details and the Laloux attribution are unverified (see above). So is any reuse permission.
- **Translations:** the Russian-to-English translations are my own and have not been reviewed by a second reader.

import type { Source } from './types';

/**
 * Source and credit records.
 *
 * Bibliographic details marked "added" did not appear in the supplied research
 * notes; they were added from general bibliographic knowledge and should be
 * checked before publication. Nothing here claims that reuse permissions for
 * any image have been verified.
 */
export const sources: Source[] = [
  {
    key: 'graves',
    label: 'Graves (1970)',
    citation:
      'Clare W. Graves, “Levels of Existence: An Open System Theory of Values,” Journal of Humanistic Psychology 10(2), 1970.',
    role: 'The original framework: the eight levels, their letter pairs, and Graves’s account of how values change.',
    notes:
      'Title and year are from the research notes. Journal name, volume and issue were added and should be checked against the original. The site paraphrases the excerpt in the notes rather than quoting the paper.',
  },
  {
    key: 'figure',
    label: 'Graves, Figure 1',
    citation:
      '“Emergence of the Existential States from the interaction of Components…”, Figure 1 in Graves (1970), as reproduced on page 2 of the research notes.',
    role: 'Shown in the theory section to illustrate the letter pairs.',
    notes: 'Extracted from the supplied PDF. Reuse permission not independently verified.',
  },
  {
    key: 'dinan',
    label: 'Beck & Cowan, via Dinan',
    citation:
      'Steve Dinan (Esalen Institute), summary of Don Beck and Christopher Cowan, Spiral Dynamics: Mastering Values, Leadership, and Change.',
    role: 'Represents Spiral Dynamics, including the color labels Beige through Turquoise and the “second tier.”',
    notes:
      'No URL or date for Dinan’s summary was supplied. The summary attaches population and “power” percentages to each level; they are historical estimates from that source, not current statistics, and this site does not reproduce them.',
  },
  {
    key: 'table',
    label: 'Litti Pro video (notes)',
    citation:
      'Sergey Litti / Litti Pro, “Spiral Dynamics. Teal Organizations. Change Management” (video), as summarized in the research notes’ table.',
    role: 'The business-oriented reading: organizational emphasis, leadership and coordination, strengths and limitations.',
    notes: 'No URL, publication date or timestamps were supplied.',
  },
  {
    key: 'slide',
    label: 'Litti Pro video (slide)',
    citation:
      'Slides adapted from Sergey Litti / Litti Pro, “Spiral Dynamics. Teal Organizations. Change Management” (video), translated into English.',
    role: 'The eight organizational diagrams shown in the explorer.',
    notes:
      'English versions of the original Russian slides, with a slightly redrawn layout, supplied by the project owner. Timestamps were not recorded. Reuse permission not independently verified.',
  },
  {
    key: 'portrait',
    label: 'Portrait',
    citation: 'Black-and-white photograph supplied as a portrait of Clare W. Graves (file “Clare_Graves.png”).',
    role: 'Opening section.',
    notes:
      'Photographer, date and original source are not recorded in the supplied materials. The identification comes from the filename; it was not independently verified. Reuse permission not verified.',
  },
];

export const screenshotSource =
  'Adapted from a slide in Sergey Litti / Litti Pro, “Spiral Dynamics. Teal Organizations. Change Management” (video), translated into English. Timestamp not recorded. Reuse permission not independently verified.';

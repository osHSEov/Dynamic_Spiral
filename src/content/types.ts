/**
 * Shared content model.
 *
 * One `Level` record drives every view on the site: the opening diagram of
 * Graves's eight value systems, the interactive organizational spiral, the
 * "organizations" transition section, and (later) an assessment module.
 *
 * Content is deliberately kept apart from presentation. Components only read
 * from these structures; they never hard-code level facts.
 */

/** Stable identifiers, named after the later Spiral Dynamics color labels. */
export type LevelId =
  | 'beige'
  | 'purple'
  | 'red'
  | 'blue'
  | 'orange'
  | 'green'
  | 'yellow'
  | 'turquoise';

/**
 * Where a statement comes from. Every organizational bullet carries one, so
 * the three source layers the site distinguishes stay visible to readers.
 *
 * - `graves`  Clare W. Graves (1970), as excerpted in the research notes.
 * - `dinan`   Steve Dinan's summary of Beck & Cowan's *Spiral Dynamics*.
 * - `table`   The research notes' summary table of the Litti Pro video.
 * - `slide`   Text visible on the supplied Litti Pro screenshot itself.
 * - `editor`  A connecting sentence written for this site (no new facts).
 */
export type SourceKey = 'graves' | 'dinan' | 'table' | 'slide' | 'editor';

export interface SourcedPoint {
  text: string;
  source: SourceKey;
}

/**
 * The four organizational questions the transition section introduces.
 * Also the natural axes for a future assessment module.
 */
export type DimensionId = 'authority' | 'rules' | 'incentives' | 'cooperation';

export interface Dimension {
  id: DimensionId;
  title: string;
  question: string;
  summary: string;
}

/** One line of Russian text visible on a screenshot, with its English meaning. */
export interface SlideLine {
  ru: string;
  en: string;
  /** Optional clarification of an idiom, pun, or abbreviation. */
  note?: string;
}

export interface Screenshot {
  /** Path relative to the site root (resolved against Vite's BASE_URL). */
  src: string;
  /** The filename as originally supplied, kept for traceability. */
  originalFilename: string;
  width: number;
  height: number;
  /** Slide heading, exactly as shown (Russian). */
  headingRu: string;
  headingEn: string;
  /** Every other legible text line on the slide, in reading order. */
  lines: SlideLine[];
  /** Labels inside the slide's org chart, if any. */
  chartLabels?: SlideLine[];
  /** Plain description of the diagram, for the caption and the alt text. */
  diagram: string;
  /** Anything cropped, cut off, or illegible. Never reconstructed. */
  limitations?: string;
}

export interface GravesSystem {
  /** Graves's letter pair, e.g. "A–N". */
  code: string;
  /** Graves's own descriptive name for the system. */
  name: string;
  /** Short paraphrase of the notes' description. */
  gist: string;
}

export interface LevelColors {
  /** Main hue used in diagrams. */
  base: string;
  /** Pale tint for backgrounds and subtle accents. */
  tint: string;
  /** Deep tone that passes contrast on the off-white page for text accents. */
  deep: string;
  /** Text color to use on top of `base`. */
  onBase: string;
}

export interface Level {
  id: LevelId;
  /** 1–8, the order in which the systems emerge in the model. */
  order: number;
  /** Later Spiral Dynamics color label (not Graves's own terminology). */
  colorLabel: string;
  colors: LevelColors;

  /** Layer 1: Graves's original framework. */
  graves: GravesSystem;

  /** Layer 2: Beck & Cowan's Spiral Dynamics, as summarized by Dinan. */
  spiralDynamics: {
    /** One-word theme Dinan's summary uses ("Tribal", "Entrepreneurial", ...). */
    theme: string;
    paraphrase: string;
  };

  /** Layer 3: the business-oriented reading from the Litti Pro video. */
  organization: {
    /** Short organizing principle, taken from the slide heading and table. */
    principle: string;
    /** "Organizational emphasis" column of the notes table. */
    emphasis: string;
    leadership: SourcedPoint[];
    practices: SourcedPoint[];
    strengths: SourcedPoint[];
    tensions: SourcedPoint[];
    /** Optional caveat specific to this level (e.g. Teal vs Turquoise). */
    caveat?: string;
  };

  /**
   * One short line per organizational dimension. Used by the transition
   * section now and intended as the seed for a later assessment module.
   */
  dimensions: Record<DimensionId, SourcedPoint>;

  screenshot: Screenshot;
}

export interface Source {
  key: SourceKey | 'figure' | 'portrait';
  label: string;
  citation: string;
  role: string;
  /** Honest notes about what is and is not known about this source. */
  notes?: string;
}

/** One answer in the self-assessment. Each option points to a single level. */
export interface AssessmentOption {
  level: Exclude<LevelId, 'beige'>;
  text: string;
}

export interface AssessmentQuestion {
  id: string;
  dimension: DimensionId;
  prompt: string;
  options: AssessmentOption[];
}

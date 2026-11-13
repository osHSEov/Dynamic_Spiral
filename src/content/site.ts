import type { Dimension } from './types';

/**
 * Editorial copy for the page sections, kept out of the components.
 * Paraphrased from the research notes; no quotations from Graves are used
 * because the notes' excerpt could not be checked against the original text.
 */

export const assets = {
  portrait: {
    src: 'assets/portrait/clare-graves.png',
    originalFilename: 'Clare_Graves.png',
    width: 544,
    height: 853,
    alt: 'Black-and-white photograph of an older man in dark-rimmed glasses, a dark jacket and a polka-dot tie, supplied as a portrait of Clare W. Graves.',
    credit:
      'American psychologist (1914–1986). He taught psychology at Union College in Schenectady, New York, from 1948 until he retired in 1978, and built his research on years of written accounts from his own students.',
  },
  gravesFigure: {
    src: 'assets/figures/graves-1970-figure-1.png',
    originalFilename: 'Spiral Dynamics.pdf, page 2',
    width: 1200,
    height: 1353,
    alt: 'Graves’s Figure 1: two interweaving wave-like curves rising in steps from the lower left to the upper right. The steps are numbered 1 to 7 and labelled A–N, B–O, C–P, D–Q, E–R, F–S, G–T, with H–U at the top. The vertical axis lists neurological systems A to H; the horizontal axis lists existential problems N to U.',
    caption:
      'Graves’s own diagram from the 1970 paper. A dashed curve (the environment adjusting to the organism) and a solid curve (the organism adjusting to the environment) interweave as they rise; the numbered regions between them are the existential states that emerge from that interaction.',
  },
} as const;

export const hero = {
  kicker: 'An illustrated introduction',
  title: 'Spiral Dynamics and the culture of organizations',
  lede: 'How Clare W. Graves’s theory of value systems became Spiral Dynamics, and how one business-oriented reading uses it to talk about leadership, rules, incentives and cooperation.',
  intro: [
    'In a 1970 paper, Graves proposed that adult values are not fixed. In his account, they develop through a sequence of distinct “levels of existence,” each of which is a relatively stable way of thinking, feeling, and deciding that corresponds to the conditions a person faces.',
    'Graves named each level with a pair of letters. Don Beck and Christopher Cowan later popularized the theory as Spiral Dynamics and gave the levels color labels, which are the names most readers meet today.',
  ],
  modelNoteLead: 'A model, not a law.',
  modelNote:
    'This is a framework for interpreting values, not a universal law. Graves himself stressed that people and societies can be mixed across levels, can settle or regress, and can show any level in a positive or a negative form.',
  diagramTitle: 'Eight value systems',
  diagramSubtitle: 'Graves’s letter pairs and names, with the color labels introduced later by Spiral Dynamics',
  openEnded: 'Open-ended: Graves saw human nature as an emergent, open system',
  tierNote: {
    graves: 'Graves: G–T is the first “being” level',
    sd: 'Beck & Cowan: the start of the “second tier”',
  },
};

export const theory = {
  title: 'The theory in brief',
  intro:
    'The research notes cover Graves’s 1970 paper. Paraphrased, its core claims are as follows.',
  ideas: [
    {
      title: 'Human nature is not fixed',
      text: 'Graves rejected the view that people are "beasts at heart" and thus need good values imposed from outside or revealed from above. Instead, he proposed that human nature is emergent: an open system in which values and capacities/capabilities develop through person–environment interaction.',
    },
    {
      title: 'Values change in jumps',
      text: 'People\'s movement is governed by sudden, quantum-like jumps from one steady state to another. Each state is an equilibrium with its own feelings, motivations, ethics, ways of thinking and preferences about management.',
    },
    {
      title: 'Open in principle, settled in practice',
      text: 'An adult man lives in a potentially open system of needs and values but often settles into something close to a closed one. At any level, a person has only the freedom of behavior that this particular level affords.',
    },
    {
      title: 'Mixed, reversible and two-sided',
      text: 'People may stabilize at a level, regress, or express a level in a positive or a negative form. Individuals and societies can be mixed across several levels at once.',
    },
    {
      title: 'Change looks like disorder first',
      text: 'When old values no longer fit new conditions, people may regress, become disorganized and confront the establishment before they consolidate a new system. Graves named three conditions for change: insight, removal of barriers, and consolidating factors.',
    },
    {
      title: '“Decline” reconsidered',
      text: 'What looks like moral decline may be better understood as holding on to values that no longer fit the "new world", rather than as old values simply breaking down.',
    },
  ],
  lettersTitle: 'Reading the letter pairs',
  letters:
    'In Graves’s Figure 1, the first letter (A to H) refers to a neurological system or configuration in the person, and the second (N to U) to the existential problems the person faces. A level such as D–Q is the meeting of the two.',
  layersTitle: 'Three layers of source material',
  layers: [
    {
      numeral: 'I',
      title: 'Graves’s original framework',
      text: 'The foundational theory of shifting values. Organized by letter pairs and descriptive names, it was originally conceived without colors—the color spectrum was a later addition.',
    },
    {
      numeral: 'II',
      title: 'Beck & Cowan’s Spiral Dynamics',
      text: 'As the theory evolved, it was systematized by Beck and Cowan into Spiral Dynamics. Building upon Graves’s original architecture, this phase introduced the now-iconic color spectrum—from Beige to Turquoise—and defined the structural leap of a "second tier."',
    },
    {
      numeral: 'III',
      title: 'Business integration',
      text: 'The abstract model is translated into pragmatic, organizational reality through a business-oriented reading by Sergey Litti',
    },
  ],
};

export const dimensions: Dimension[] = [
  {
    id: 'authority',
    title: 'Authority and decision-making',
    question: 'Who decides, and on what grounds?',
    summary: 'From a paternal figure, to a single boss, to roles and procedures, to shared or distributed leadership.',
  },
  {
    id: 'rules',
    title: 'Rules and coordination',
    question: 'What holds the work together?',
    summary: 'Unwritten custom, a powerful person, explicit procedure, goals and projects, agreement, or self-coordination.',
  },
  {
    id: 'incentives',
    title: 'Incentives and success',
    question: 'What counts as success, and what gets rewarded?',
    summary: 'Belonging, results for the boss, doing one’s role properly, winning against targets, mission, or meaningful contribution.',
  },
  {
    id: 'cooperation',
    title: 'Cooperation and conflict',
    question: 'How do people work together, and where does friction come from?',
    summary: 'Each pattern has its own form of cohesion and its own typical friction: dependence, overload, bureaucracy, burnout, slowness.',
  },
];

export const transition = {
  title: 'From value systems to organizations',
  intro: [
    'Graves described each level as carrying its own preferences about management. That makes the framework a vocabulary for discussing organizational culture: not what a company says it values, but how it actually decides, coordinates, rewards and handles friction.',
    'Four questions below are used to explore the sharpest contrasts between different levels.',
    'Note that beige does not appear. It describes bare survival, before any lasting group forms, so it is treated as pre-organizational: there is no management for it to shape.',
  ],
  sampleLevels: {
    authority: ['purple', 'red', 'blue', 'turquoise'],
    rules: ['purple', 'blue', 'orange', 'turquoise'],
    incentives: ['red', 'orange', 'green', 'turquoise'],
    cooperation: ['red', 'orange', 'green', 'yellow'],
  },
} as const;

export const explorer = {
  title: 'The organizational spiral',
  intro:
    'Select a level on the spiral or use the buttons. The panel provides a concise, business-oriented reading of every level, detailing its organizational structure and key traits.',
};

export const references = {
  title: 'Sources, credits and caveats',
  caveats: [
    {
      title: 'Organizations are mixed',
      text: 'A real organization rarely sits on one level. Different teams, functions, regions and moments of crisis can show different patterns at the same time, just as Graves said individuals and societies can be mixed.',
    },
    {
      title: 'An interpretive framework, not a diagnosis',
      text: 'Nothing on this site is a validated method for diagnosing a company. The levels are a vocabulary for discussion and reflection.',
    },
    {
      title: 'Order is not rank',
      text: 'The levels are numbered in the order the model says they emerge. That sequence is not a ranking of people’s worth, and some source descriptions use evaluative or dated language that this site does not adopt.',
    },
    {
      title: 'No current statistics',
      text: 'Dinan’s summary gives population and “power” percentages for each level. They are historical estimates from that source, not current data, and are deliberately left out here.',
    },
    {
      title: 'Teal is not Turquoise',
      text: 'The video’s title mentions Frederic Laloux’s “Teal organizations.” Teal is a separate model. This site does not equate it with Spiral Dynamics’ Turquoise.',
    },
    {
      title: 'Colors are later labels',
      text: 'Graves used letter pairs. The color names come from Beck and Cowan’s Spiral Dynamics and are shown beside Graves’s terms only for orientation.',
    },
  ],
};

import type { AssessmentQuestion } from './types';

/**
 * Copy and questions for the self-assessment section.
 *
 * Each answer option points to exactly one organizational level, so the
 * result is a simple count of which level the answers lean toward. Beige is
 * left out because it is treated as pre-organizational.
 *
 * Options are listed in a deliberately mixed order (not Purple → Turquoise)
 * and are shown without colors, so the order does not hint at a "right"
 * answer. The scoring runs entirely in the browser; nothing is sent anywhere.
 */

export const assessment = {
  title: 'Assess your organization',
  intro: [
    'Answer eight short questions about how your company actually works day to day, not how it describes itself. Each answer leans toward one of the organizational patterns described above, and the result shows which pattern your answers point to most.',
    'Pick the answer that fits most of the time. If parts of the company differ, answer for the part you know best.',
  ],

  companyTitle: 'About your company',
  nameLabel: 'Company or team name',
  nameHint: 'Optional. Used only to label your result.',
  industryLabel: 'Industry',
  industries: [
    'Technology and software',
    'Manufacturing and industry',
    'Retail and consumer goods',
    'Finance and insurance',
    'Healthcare',
    'Education',
    'Public sector',
    'Non-profit',
    'Professional services',
    'Other',
  ],
  sizeLabel: 'Number of people',
  sizes: ['1–10', '11–50', '51–250', '251–1,000', 'More than 1,000'],
  descriptionLabel: 'Describe your company in your own words',
  descriptionHint:
    'How decisions get made, how work is organized, what people are rewarded for, where friction shows up. Optional.',
  descriptionMax: 2000,

  questionsTitle: 'Eight questions',

  asideTitle: 'Your progress',
  asideNote:
    'Your answers stay in this browser tab. Nothing is stored or sent anywhere.',
  submit: 'See my result',
  missing: (n: number) =>
    n === 1 ? 'One question is still unanswered.' : `${n} questions are still unanswered.`,

  result: {
    kicker: 'Your answers point mostly to',
    mixed: (a: string, b: string) =>
      `Your answers are split almost evenly between ${a} and ${b}. That is common: most organizations mix several patterns.`,
    profileTitle: 'Profile across the levels',
    answersOf: (n: number, total: number) => `${n} of ${total}`,
    byDimensionTitle: 'By question area',
    strengthsTitle: 'Strengths to build on',
    tensionsTitle: 'Tensions to watch',
    descriptionTitle: 'About your description',
    descriptionNote:
      'This version classifies your company from the eight questions only. Your written description is not analyzed yet; text analysis is planned for a later version.',
    caveat:
      'This is a prompt for reflection and discussion, not a validated diagnosis. Real organizations mix several patterns, and different teams can sit in different places.',
    explore: (level: string) => `Explore ${level} in the spiral`,
    edit: 'Edit answers',
    restart: 'Start over',
  },
};

export const assessmentQuestions: AssessmentQuestion[] = [
  // ------------------------------------------------------------- authority
  {
    id: 'decide',
    dimension: 'authority',
    prompt: 'When an important decision has to be made, who usually makes it?',
    options: [
      { level: 'blue', text: 'Whoever the hierarchy assigns it to, following the approved procedure.' },
      { level: 'green', text: 'The team, after discussion, aiming for agreement.' },
      { level: 'red', text: 'The boss decides alone, and the decision is final.' },
      { level: 'yellow', text: 'Whoever has the most relevant expertise for this particular situation.' },
      { level: 'purple', text: 'The founder or elder figure everyone looks up to, much like the head of a family.' },
      { level: 'turquoise', text: 'Anyone affected can decide after seeking advice; there are no managers.' },
      { level: 'orange', text: 'Whoever owns the target, based on data and the expected return.' },
    ],
  },
  {
    id: 'standing',
    dimension: 'authority',
    prompt: 'What gives a leader authority in your company?',
    options: [
      { level: 'orange', text: 'Their track record of results.' },
      { level: 'purple', text: 'Seniority, loyalty and belonging to the inner circle.' },
      { level: 'turquoise', text: 'Authority is not held by individuals; it is spread across the organization.' },
      { level: 'blue', text: 'Their position and title in the official structure.' },
      { level: 'yellow', text: 'Competence that fits the current problem; leadership shifts as needs change.' },
      { level: 'red', text: 'Strength of personality and control over resources.' },
      { level: 'green', text: 'The trust and support of the people they work with.' },
    ],
  },

  // ----------------------------------------------------------------- rules
  {
    id: 'coordinate',
    dimension: 'rules',
    prompt: 'How is everyday work coordinated?',
    options: [
      { level: 'red', text: 'Through direct orders from the person in charge.' },
      { level: 'yellow', text: 'Through whatever structure fits the task, changed when the task changes.' },
      { level: 'orange', text: 'Through goals, projects and deadlines; how you get there is up to you.' },
      { level: 'purple', text: 'Through habits and traditions that everyone simply knows.' },
      { level: 'green', text: 'Through rules the team agreed on together.' },
      { level: 'turquoise', text: 'People coordinate directly with one another, without a central plan.' },
      { level: 'blue', text: 'Through written procedures, job descriptions and a clear chain of command.' },
    ],
  },
  {
    id: 'broken-rule',
    dimension: 'rules',
    prompt: 'What usually happens when someone breaks an established rule?',
    options: [
      { level: 'green', text: 'The team talks it through to understand why it happened.' },
      { level: 'blue', text: 'The standard procedure applies, the same for everyone.' },
      { level: 'purple', text: 'It is seen as disloyalty to the group, which matters more than the rule itself.' },
      { level: 'orange', text: 'If it got results, nobody minds much.' },
      { level: 'turquoise', text: 'Colleagues raise it directly with each other, guided by the shared purpose.' },
      { level: 'red', text: 'It depends on the boss’s mood and on who broke it.' },
      { level: 'yellow', text: 'The rule itself is questioned: maybe it no longer fits.' },
    ],
  },

  // ------------------------------------------------------------ incentives
  {
    id: 'reward',
    dimension: 'incentives',
    prompt: 'What does your company reward most?',
    options: [
      { level: 'purple', text: 'Loyalty and long service.' },
      { level: 'orange', text: 'Hitting targets and KPIs, through bonuses, commission or promotion.' },
      { level: 'yellow', text: 'Learning, mastery and solving hard problems.' },
      { level: 'red', text: 'Getting the boss’s orders done, whatever it takes.' },
      { level: 'turquoise', text: 'Contributing to the purpose of the whole, beyond any single role.' },
      { level: 'blue', text: 'Doing your job correctly and reliably, by the book.' },
      { level: 'green', text: 'Contributing to the team and to the mission.' },
    ],
  },
  {
    id: 'success',
    dimension: 'incentives',
    prompt: 'How does your company define success?',
    options: [
      { level: 'yellow', text: 'Staying adaptable and effective as conditions change.' },
      { level: 'red', text: 'We beat the competition and the boss gets what they want.' },
      { level: 'green', text: 'A positive impact on people, the community and society.' },
      { level: 'blue', text: 'Stable, predictable operations without disruptions.' },
      { level: 'purple', text: 'The group stays together and looks after its own.' },
      { level: 'orange', text: 'Growth, market share and profit.' },
      { level: 'turquoise', text: 'Serving a purpose larger than the company itself.' },
    ],
  },

  // ----------------------------------------------------------- cooperation
  {
    id: 'together',
    dimension: 'cooperation',
    prompt: 'How do people typically work together?',
    options: [
      { level: 'turquoise', text: 'Small self-organizing teams connected into a larger whole.' },
      { level: 'blue', text: 'Each department handles its own function and passes work along the chain.' },
      { level: 'purple', text: 'Like a family: everyone pitches in wherever they are needed.' },
      { level: 'yellow', text: 'Specialists with very different skills combine around a shared problem.' },
      { level: 'orange', text: 'Individuals and teams compete for results and resources.' },
      { level: 'green', text: 'In close-knit teams that value harmony and inclusion.' },
      { level: 'red', text: 'Those at the top command; everyone else carries out instructions.' },
    ],
  },
  {
    id: 'friction',
    dimension: 'cooperation',
    prompt: 'Where does friction most often come from?',
    options: [
      { level: 'orange', text: 'Internal rivalry and pressure to hit the numbers at any cost.' },
      { level: 'turquoise', text: 'Unclear responsibility when nobody is formally in charge.' },
      { level: 'red', text: 'Fear of the boss, burnout and people leaving.' },
      { level: 'green', text: 'Long discussions and slow decisions while everyone seeks consensus.' },
      { level: 'purple', text: 'Newcomers struggle to be accepted by the insiders.' },
      { level: 'yellow', text: 'Constant restructuring that others find hard to follow.' },
      { level: 'blue', text: 'Bureaucracy and slow approvals.' },
    ],
  },
];

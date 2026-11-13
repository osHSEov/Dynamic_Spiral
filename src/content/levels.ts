import type { Level, LevelId } from './types';
import { screenshotSource } from './sources';

/**
 * The eight levels, Beige through Turquoise.
 *
 * Content rules followed here:
 * - Paraphrases, not quotations, unless text is copied from a slide.
 * - Every organizational bullet names its source (see `SourceKey`).
 * - Historical population / "power" percentages from Dinan's summary are
 *   deliberately NOT included (they are 1990s-era estimates, not data).
 * - Dinan's lists of example people, groups and countries are omitted:
 *   several are evaluative, and none are needed to explain the levels.
 * - Slide wording follows the English versions of the slides
 *   (source-materials/levels_modified).
 */
export const levels: Level[] = [
  {
    id: 'beige',
    order: 1,
    colorLabel: 'Beige',
    colors: { base: '#CDB68C', tint: '#F3EBDA', deep: '#755F35', onBase: '#1D1A16' },
    graves: {
      code: 'A–N',
      name: 'Automatic / Reactive',
      gist: 'Physiological survival. Values are purely reactive, with no conscious moral “ought.”',
    },
    spiralDynamics: {
      theme: 'Survival',
      paraphrase:
        'A mode dominated by basic survival instincts that produces loose, clan-based survival groups. Dinan’s summary notes that it is not generally active as a way of organizing life today, but that extreme conditions such as famine can push people into it.',
    },
    organization: {
      principle: 'Survival',
      emphasis: 'Immediate survival',
      leadership: [
        { text: 'Behavior is reactive and focused on basic needs.', source: 'table' },
        {
          text: 'The slide states that there is no organization. Its diagram shows individuals with no connecting lines.',
          source: 'slide',
        },
      ],
      practices: [
        { text: 'Self-preservation and safety are the only concerns the slide names.', source: 'slide' },
        { text: 'The one grouping it mentions is a “community”, not an organization.', source: 'slide' },
      ],
      strengths: [
        {
          text: 'The notes treat Beige mainly as background to the model rather than as a developed corporate arrangement, so no organizational strengths are listed.',
          source: 'table',
        },
      ],
      tensions: [
        {
          text: 'Not described as a workplace pattern. Dinan’s summary links this mode to crises such as famine rather than to organizational choices.',
          source: 'dinan',
        },
      ],
    },
    dimensions: {
      authority: { text: 'No stable authority; behavior is reactive.', source: 'table' },
      rules: { text: 'No organization, so no shared rules.', source: 'slide' },
      incentives: { text: 'Immediate survival and safety.', source: 'slide' },
      cooperation: { text: 'A loose community of individuals.', source: 'slide' },
    },
    screenshot: {
      src: 'assets/levels/01-beige.png',
      originalFilename: 'levels_modified/biege.png',
      width: 1448,
      height: 1086,
      heading: 'Survival',
      labels: [
        'Self-preservation',
        'Safety',
        'No organization',
        'Community',
      ],
      diagram: 'Five unconnected person icons in a loose cluster, with no lines between them.',
    },
  },

  {
    id: 'purple',
    order: 2,
    colorLabel: 'Purple',
    colors: { base: '#7B4FA6', tint: '#EFE6F6', deep: '#5E3487', onBase: '#FFFFFF' },
    graves: {
      code: 'B–O',
      name: 'Tribalistic / Traditionalistic',
      gist: 'Safety through tradition, elders, ritual and myth. Values are concrete and rigid.',
    },
    spiralDynamics: {
      theme: 'Tribal',
      paraphrase:
        'Tribal, animistic and cyclical in outlook, with strong blood bonds and rituals that honor ancestral spirits. In Dinan’s summary, managing this system means respecting clan rules, allegiances and leaders, and carrying any change through rituals, traditions and symbols.',
    },
    organization: {
      principle: 'Belonging',
      emphasis: 'Belonging and loyalty',
      leadership: [
        { text: 'Paternal leadership: the slide describes the leader as a father.', source: 'slide' },
        { text: 'The leader sits at the center of the group, connected to everyone.', source: 'slide' },
      ],
      practices: [
        { text: 'Traditions and informal relationships hold the group together.', source: 'table' },
        { text: 'Rituals and unwritten rules take the place of written procedures.', source: 'slide' },
        { text: '“Everyone does everything”: roles are not divided.', source: 'slide' },
        { text: 'Rewarding one person too visibly can break the group bond.', source: 'dinan' },
      ],
      strengths: [
        { text: 'Cohesion and mutual care.', source: 'table' },
        { text: 'Group cohesion.', source: 'slide' },
      ],
      tensions: [
        { text: 'Dependence on the leader.', source: 'table' },
        { text: 'Unclear responsibility.', source: 'table' },
      ],
    },
    dimensions: {
      authority: { text: 'A paternal leader at the center of the group.', source: 'slide' },
      rules: { text: 'Rituals, traditions and unwritten rules.', source: 'slide' },
      incentives: { text: 'Belonging; visible individual rewards can damage the bond.', source: 'dinan' },
      cooperation: { text: 'Strong cohesion; everyone does everything.', source: 'slide' },
    },
    screenshot: {
      src: 'assets/levels/02-purple.png',
      originalFilename: 'levels_modified/purple.png',
      width: 1448,
      height: 1086,
      heading: 'Belonging',
      labels: [
        'Tribe',
        'Group cohesion',
        'Rituals and unwritten rules',
        'Leader as father',
        'Everyone does everything',
      ],
      diagram: 'A highlighted leader in the center, linked by two-way arrows to four others, who are also linked to one another in a circle.',
    },
  },

  {
    id: 'red',
    order: 3,
    colorLabel: 'Red',
    colors: { base: '#D33A2C', tint: '#F9E3DF', deep: '#A3271C', onBase: '#FFFFFF' },
    graves: {
      code: 'C–P',
      name: 'Egocentric / Exploitive',
      gist: 'Self-awareness and survival through power and heroism; “might is right.”',
    },
    spiralDynamics: {
      theme: 'Exploitative',
      paraphrase:
        'Rugged, authoritarian power, typically run by a top boss and a chain of proxies, with a sharp line between those who have and those who do not. Dinan’s summary says this mode assumes people must be forced to work, and that it is motivated by heroes and conquest.',
    },
    organization: {
      principle: 'Power',
      emphasis: 'Power and personal authority',
      leadership: [
        { text: 'Decisions are centralized and power is concentrated in one person.', source: 'table' },
        { text: 'The slide casts the leader as the “ultimate decision-maker.”', source: 'slide' },
        { text: 'Employees are executors who carry out orders.', source: 'slide' },
      ],
      practices: [
        { text: 'Direct control by the leader, exercised through loyal executors.', source: 'table' },
        {
          text: 'The organizational structure is built around the leader rather than around functions.',
          source: 'slide',
        },
        { text: '“Whoever has more power is right”, and “results matter most.”', source: 'slide' },
      ],
      strengths: [{ text: 'Energy and speed.', source: 'table' }],
      tensions: [
        { text: 'Initiative is suppressed.', source: 'table' },
        { text: 'The leader becomes overloaded.', source: 'table' },
      ],
    },
    dimensions: {
      authority: { text: 'Concentrated in one leader; whoever has more power is right.', source: 'slide' },
      rules: { text: 'Structure is built around the person in charge.', source: 'slide' },
      incentives: { text: 'Results above all, delivered by loyal executors.', source: 'table' },
      cooperation: { text: 'Top-down command; employees execute.', source: 'slide' },
    },
    screenshot: {
      src: 'assets/levels/03-red.png',
      originalFilename: 'levels_modified/red.png',
      width: 1448,
      height: 1086,
      heading: 'Power',
      labels: [
        'Concentration of power',
        'Results matter most',
        'Whoever has more power is right',
        'Leader as ultimate decision-maker',
        'Organizational structure built around the leader',
        'Employee as executor',
        'CEO',
        'Manager',
        'Sales',
        'Production',
        'Supply',
      ],
      diagram: 'A top-down chart: the CEO at the top, two managers below, and four people at the bottom, three of them labelled Sales, Production and Supply.',
    },
  },

  {
    id: 'blue',
    order: 4,
    colorLabel: 'Blue',
    colors: { base: '#2F7EC7', tint: '#E2EDF8', deep: '#1E5E9A', onBase: '#FFFFFF' },
    graves: {
      code: 'D–Q',
      name: 'Saintly / Sacrificial',
      gist: 'Security through sacrifice and prescribed rules: salvation, denial, piety, self-discipline.',
    },
    spiralDynamics: {
      theme: 'Authoritarian',
      paraphrase:
        'Loyal to a Truth defined by the social group: purposeful, obedient to authority, and ready to sacrifice for the greater good. Dinan’s summary associates it with strict but usually fair discipline, moralistic-prescriptive management and pyramid-shaped organizations, and says it works well in industrial economies.',
    },
    organization: {
      principle: 'Rules',
      emphasis: 'Order and stability',
      leadership: [
        { text: 'The leader acts as a “system architect” who designs the structure.', source: 'slide' },
        { text: 'Accountability runs through clearly defined roles.', source: 'table' },
      ],
      practices: [
        { text: 'Defined roles, procedures and accountability.', source: 'table' },
        {
          text: 'Structure is based on a division of functions; the chart shows units such as sales, marketing and operations.',
          source: 'slide',
        },
        { text: 'Transparency is named as a feature.', source: 'slide' },
      ],
      strengths: [
        { text: 'Predictability and coordination.', source: 'table' },
        { text: 'Rules and stability.', source: 'slide' },
      ],
      tensions: [
        { text: 'Bureaucracy, and rules becoming ends in themselves.', source: 'table' },
        { text: 'Slow decision-making and “overbearing bureaucracy.”', source: 'slide' },
      ],
    },
    dimensions: {
      authority: { text: 'Anchored in roles; the leader designs the system.', source: 'slide' },
      rules: { text: 'Explicit firm rules, strictly defined functions, transparency.', source: 'slide' },
      incentives: { text: 'Order and stability; doing one’s role properly.', source: 'table' },
      cooperation: { text: 'Coordinated through procedure; decisions can be slow.', source: 'slide' },
    },
    screenshot: {
      src: 'assets/levels/04-blue.png',
      originalFilename: 'levels_modified/blue.png',
      width: 1448,
      height: 1086,
      heading: 'Rules',
      labels: [
        'Rules and stability',
        'Organizational structure based on division of functions',
        'Leader as system architect',
        'Transparency',
        'Slow decision-making',
        'Overbearing bureaucracy',
        'CEO',
        'Deputy CEO',
        'Sales',
        'Marketing',
        'Workshop / Operations',
      ],
      diagram: 'A functional hierarchy: the CEO, two deputy CEOs, and units below them labelled Sales, Marketing and Workshop / Operations.',
    },
  },

  {
    id: 'orange',
    order: 5,
    colorLabel: 'Orange',
    colors: { base: '#E8872A', tint: '#FBECDA', deep: '#9E5010', onBase: '#1D1A16' },
    graves: {
      code: 'E–R',
      name: 'Materialistic',
      gist: 'Independence through rational control of the physical world: scientism, achievement, materialism.',
    },
    spiralDynamics: {
      theme: 'Entrepreneurial',
      paraphrase:
        'Oriented to personal success, with each person rationally weighing their own advantage. People respond to perks, bonuses and money more than to loyalty, belonging or lifelong employment, and competition is seen as driving productivity and growth.',
    },
    organization: {
      principle: 'Success',
      emphasis: 'Achievement and competition',
      leadership: [
        { text: 'Strategic leadership: the slide calls the leader a strategist and motivator.', source: 'slide' },
        { text: 'Goals cascade through the hierarchy; in the chart every position carries a KPI.', source: 'slide' },
      ],
      practices: [
        { text: 'Performance goals and project-based coordination.', source: 'table' },
        { text: 'Competition and winning are explicit values.', source: 'slide' },
        { text: '“All methods are fair game.”', source: 'slide' },
      ],
      strengths: [
        { text: 'Initiative, flexibility and growth.', source: 'table' },
        { text: 'Competition is credited with improving productivity.', source: 'dinan' },
      ],
      tensions: [
        { text: 'Burnout.', source: 'slide' },
        { text: 'Destructive internal competition.', source: 'table' },
      ],
    },
    dimensions: {
      authority: { text: 'Strategic leadership through performance goals.', source: 'table' },
      rules: { text: 'Flexible means, measured ends: all methods are fair game.', source: 'slide' },
      incentives: { text: 'KPIs at every level and at every whim; winning.', source: 'slide' },
      cooperation: { text: 'Internal competition, which can turn destructive.', source: 'table' },
    },
    screenshot: {
      src: 'assets/levels/05-orange.png',
      originalFilename: 'levels_modified/orange.png',
      width: 1448,
      height: 1086,
      heading: 'Success',
      labels: [
        'Victory',
        'Competition',
        'All methods are fair game',
        'Leader as strategist and motivator',
        'Burnout',
        'KPI',
      ],
      diagram: 'A hierarchy in which every position, from the CEO down, is tagged with a KPI.',
    },
  },

  {
    id: 'green',
    order: 6,
    colorLabel: 'Green',
    colors: { base: '#4FA04B', tint: '#E4F1E1', deep: '#2E7030', onBase: '#1D1A16' },
    graves: {
      code: 'F–S',
      name: 'Sociocentric / Sociocratic',
      gist: 'Belonging and community with valued others: sensitivity, communication, social approval.',
    },
    spiralDynamics: {
      theme: 'Communitarian',
      paraphrase:
        'Humanistic and community-minded, focused on personal growth, equality and environmental concern. Dinan’s summary says leaders become facilitators and hierarchies blur, which can bring inefficiency, and that groups which bog down may swing back to Orange-style individualism.',
    },
    organization: {
      principle: 'Consensus',
      emphasis: 'Consensus and shared concern',
      leadership: [
        { text: 'Participatory leadership: the slide calls the leader a servant.', source: 'slide' },
        { text: 'Work is organized in teams beneath the leader.', source: 'slide' },
      ],
      practices: [
        { text: 'A collective culture of consensus.', source: 'slide' },
        { text: 'Mission matters more than money.', source: 'slide' },
        { text: 'The business is framed as mission + business model + employees.', source: 'slide' },
        { text: 'Equality and collaboration.', source: 'table' },
      ],
      strengths: [{ text: 'Loyalty and mutual development.', source: 'table' }],
      tensions: [
        { text: 'Slow decisions and difficulty resolving trade-offs.', source: 'table' },
        { text: 'An unhurried pace and reduced discipline.', source: 'slide' },
      ],
    },
    dimensions: {
      authority: { text: 'Participatory; the leader serves the team.', source: 'slide' },
      rules: { text: 'Agreed collectively rather than imposed.', source: 'slide' },
      incentives: { text: 'Mission and impact over money.', source: 'slide' },
      cooperation: { text: 'Consensus and teamwork, at the cost of speed.', source: 'table' },
    },
    screenshot: {
      src: 'assets/levels/06-green.png',
      originalFilename: 'levels_modified/green.png',
      width: 1448,
      height: 1086,
      heading: 'Consensus',
      labels: [
        'Collective culture of consensus',
        'Mission matters more than money',
        'Leader as servant',
        'Unhurried pace',
        'Mission + business model + employees',
        'Reduced discipline',
        'Leader',
        'Team',
      ],
      diagram: 'A leader above two boxed teams, each with its own small internal hierarchy.',
    },
  },

  {
    id: 'yellow',
    order: 7,
    colorLabel: 'Yellow',
    colors: { base: '#E6C42A', tint: '#FAF3D3', deep: '#7D6706', onBase: '#1D1A16' },
    graves: {
      code: 'G–T',
      name: 'Cognitive / Existential',
      gist: 'Graves’s first “being” level: accepting reality and existence, pluralism, deep democracy.',
    },
    spiralDynamics: {
      theme: 'Systemic',
      paraphrase:
        'The first level of what Beck and Cowan call the second tier, marked in Dinan’s summary by a jump in the capacity to hold multiple perspectives. Motivated by learning for its own sake, it thinks in systems, welcomes change, and values distinct talents as contributions to the whole.',
    },
    organization: {
      principle: 'Creativity',
      emphasis: 'Integration and contextual flexibility',
      leadership: [
        { text: 'The slide describes the leader as a “player and creator.”', source: 'slide' },
        { text: 'Leadership is spread out: in the chart, three people are highlighted rather than one.', source: 'slide' },
      ],
      practices: [
        { text: 'Approaches from earlier levels are combined according to circumstances.', source: 'table' },
        { text: 'An “integral” approach.', source: 'slide' },
        { text: 'Self-actualization for everyone.', source: 'slide' },
      ],
      strengths: [{ text: 'Alignment of goals, rules, strategies and relationships.', source: 'table' }],
      tensions: [
        { text: 'The notes table names no specific limitation for this level.', source: 'editor' },
        {
          text: 'Yellow-minded people often work at an organization’s periphery, quietly fine-tuning things in ways others find baffling.',
          source: 'dinan',
        },
      ],
    },
    dimensions: {
      authority: { text: 'Several leaders; leadership follows the situation.', source: 'slide' },
      rules: { text: 'Chosen to fit the context, drawing on earlier levels.', source: 'table' },
      incentives: { text: 'Learning and self-actualization.', source: 'slide' },
      cooperation: { text: 'Distinct talents integrated into a whole.', source: 'dinan' },
    },
    screenshot: {
      src: 'assets/levels/07-yellow.png',
      originalFilename: 'levels_modified/yellow.png',
      width: 1448,
      height: 1086,
      heading: 'Creativity',
      labels: [
        'Integral',
        'Self-actualization for everyone',
        'Leader as player and creator',
      ],
      diagram: 'A network of people linked by two-way arrows, with no single person at the top. Three of them are highlighted in yellow.',
    },
  },

  {
    id: 'turquoise',
    order: 8,
    colorLabel: 'Turquoise',
    colors: { base: '#2AA8A0', tint: '#DDF2F0', deep: '#13706A', onBase: '#1D1A16' },
    graves: {
      code: 'H–U',
      name: 'Experientialistic',
      gist: 'Graves’s second “being” level: experience, communion, wonder, awe, receptive perception, enlarged consciousness.',
    },
    spiralDynamics: {
      theme: 'Holistic',
      paraphrase:
        'Oriented to global holism and the balance of interlocking life forces. Work must be meaningful to the overall health of life, and Dinan’s summary describes an urge to use collective intelligence on large problems without sacrificing individuality.',
    },
    organization: {
      principle: 'Self-organization',
      emphasis: 'Self-organization and responsibility',
      leadership: [
        { text: 'No managers.', source: 'slide' },
        { text: '“Distributed leadership”: leadership is shared rather than held by one role.', source: 'slide' },
      ],
      practices: [
        { text: 'Employees take responsibility for processes and coordinate their own contributions.', source: 'table' },
        { text: 'A “holistic” approach.', source: 'slide' },
        {
          text: 'The diagram shows three circles of people inside one larger circle, with no reporting lines.',
          source: 'slide',
        },
      ],
      strengths: [{ text: 'Emphasis on distributed responsibility.', source: 'table' }],
      tensions: [
        {
          text: 'The notes say the detailed mechanisms require further study; the video summary does not spell them out.',
          source: 'table',
        },
      ],
      caveat:
        'The video’s title refers to “Teal organizations,” a term from Frederic Laloux’s book Reinventing Organizations. Laloux’s Teal is a separate model with its own definitions. This site does not treat it as identical to Spiral Dynamics’ Turquoise, and the supplied notes do not record how the video relates the two.',
    },
    dimensions: {
      authority: { text: 'No managers; leadership is distributed.', source: 'slide' },
      rules: { text: 'Harmonic self-coordination.', source: 'table' },
      incentives: { text: 'Aligning individual purpose with the evolution of the whole system.', source: 'dinan' },
      cooperation: { text: 'Self-organizing circles within a larger whole.', source: 'slide' },
    },
    screenshot: {
      src: 'assets/levels/08-turquoise.png',
      originalFilename: 'levels_modified/turquoise.png',
      width: 1448,
      height: 1086,
      heading: 'Self-organization',
      labels: [
        'Holistic',
        'No managers',
        'Distributed leadership',
      ],
      diagram: 'One large circle containing three smaller circles, outlined in yellow, green and orange, each holding three people. There are no reporting lines.',
    },
  },
];

export const levelById = Object.fromEntries(levels.map((l) => [l.id, l])) as Record<LevelId, Level>;

export const DEFAULT_LEVEL: LevelId = 'blue';

/** Caption source line shared by every screenshot. */
export const screenshotCredit = screenshotSource;

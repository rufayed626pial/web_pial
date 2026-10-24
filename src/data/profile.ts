/** Skills, experience, education, research and certifications. Edit freely. */

export type SkillLevel = 'Using' | 'Learning' | 'Studying';

export interface Skill {
  name: string;
  level: SkillLevel;
  note: string;
  usedIn?: string[]; // project slugs
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    blurb: 'Languages I write.',
    skills: [
      { name: 'JavaScript', level: 'Using', note: 'Front-end logic and Firebase-backed apps.', usedIn: ['blitzmed', 'diu-transport-system'] },
      { name: 'Python', level: 'Using', note: 'AI lab and machine learning coursework.', usedIn: ['ai-tic-tac-toe', 'spam-classification'] },
      { name: 'PHP', level: 'Using', note: 'Server-side web development.' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces people can use.',
    skills: [
      { name: 'HTML', level: 'Using', note: 'Semantic page structure.' },
      { name: 'CSS', level: 'Using', note: 'Layout, responsive design and theming.' },
      { name: 'JavaScript', level: 'Using', note: 'Interactivity and application logic.' },
      { name: 'Leaflet', level: 'Using', note: 'Interactive maps.', usedIn: ['diu-transport-system'] },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & databases',
    blurb: 'Where data lives.',
    skills: [
      { name: 'Firebase', level: 'Using', note: 'Authentication and Realtime Database.', usedIn: ['diu-transport-system', 'blitzmed', 'budget-tracker'] },
      { name: 'PHP', level: 'Using', note: 'Server-side scripting.' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    blurb: 'Where I am heading.',
    skills: [{ name: 'Flutter', level: 'Learning', note: 'Building cross-platform apps. Actively learning.' }],
  },
  {
    id: 'ai',
    title: 'AI & machine learning',
    blurb: 'Teaching software to decide.',
    skills: [
      { name: 'Python', level: 'Using', note: 'Used in both AI projects.', usedIn: ['ai-tic-tac-toe', 'spam-classification'] },
      { name: 'Pygame', level: 'Using', note: 'Interface for the Minimax game.', usedIn: ['ai-tic-tac-toe'] },
      { name: 'Minimax search', level: 'Using', note: 'Adversarial game-tree search.', usedIn: ['ai-tic-tac-toe'] },
      { name: 'Text classification', level: 'Using', note: 'Naive Bayes vs Logistic Regression.', usedIn: ['spam-classification'] },
    ],
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    blurb: 'My academic specialization.',
    skills: [
      { name: 'Cybersecurity', level: 'Studying', note: 'Major at Daffodil International University.' },
      { name: 'Digital forensics', level: 'Studying', note: 'Research interest.', usedIn: ['cybersecurity-research'] },
      { name: 'ML intrusion detection', level: 'Studying', note: 'Research direction in progress.', usedIn: ['cybersecurity-research'] },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    blurb: 'Daily drivers.',
    skills: [
      { name: 'Git', level: 'Using', note: 'Version control.' },
      { name: 'GitHub', level: 'Using', note: 'Hosting and collaboration.' },
      { name: 'VS Code', level: 'Using', note: 'Primary editor.' },
      { name: 'Canva', level: 'Using', note: 'Quick visual design.' },
    ],
  },
];

export interface ExperienceEntry {
  organization: string;
  role: string;
  period?: string; // leave empty until verified
  overview: string;
  responsibilities?: string[];
  contributions?: string[];
  image?: { src: string; alt: string };
}

export const experience: ExperienceEntry[] = [
  {
    organization: 'DIUSEC · Daffodil International University',
    role: 'Programme Organisation Secretary',
    overview:
      'Serving as Programme Organisation Secretary in the Programme Organisation Wing of DIUSEC at Daffodil International University.',
    // TODO(Pial): add period, event names and verified responsibilities.
  },
  {
    organization: 'DIUSEC · Daffodil International University',
    role: 'Office & Organisation (earlier role)',
    overview:
      'Earlier involvement with DIUSEC through Office & Organisation responsibilities, before moving into the Programme Organisation Wing.',
  },
];

export const education = {
  degree: 'Bachelor of Science in Software Engineering',
  institution: 'Daffodil International University',
  location: 'Bangladesh',
  major: 'Cybersecurity',
  status: 'Undergraduate student',
  /** TODO(Pial): e.g. '2023 – 2027 (expected)'. Empty hides the line. */
  period: '',
  /** TODO(Pial): e.g. 'Semester 7'. Empty hides the line. */
  semester: '',
  coursework: ['Artificial Intelligence (lab)', 'Machine Learning', 'Cybersecurity'],
  academicProjects: ['ai-tic-tac-toe', 'spam-classification'],
  researchInterests: ['ML-based intrusion detection', 'Explainable AI for network security', 'Digital forensics'],
  achievements: [] as string[],
};

export type ResearchStatus = 'Idea' | 'In progress' | 'Submitted' | 'Accepted' | 'Published';
export const researchStatuses: { status: ResearchStatus; text: string }[] = [
  { status: 'Idea', text: 'A direction worth exploring' },
  { status: 'In progress', text: 'Actively working on it' },
  { status: 'Submitted', text: 'Sent to a venue, awaiting decision' },
  { status: 'Accepted', text: 'Accepted for publication' },
  { status: 'Published', text: 'Publicly available' },
];

export interface ResearchEntry {
  title: string;
  status: ResearchStatus;
  summary: string;
  question?: string;
  motivation?: string;
  methodology?: string;
  dataset?: string;
  references?: { label: string; href: string }[];
}

export const research: ResearchEntry[] = [
  {
    title: 'Machine learning for intrusion detection, with explanations',
    status: 'In progress',
    summary:
      'Exploring how machine learning can detect network intrusions, and how explainable AI can make those detections understandable to analysts.',
    question:
      'How can intrusion detection models be both accurate and explainable enough for security analysts to trust?',
    motivation:
      'Security teams need to understand why an alert fired, not just that it did. This ties directly to my Cybersecurity specialization.',
    // methodology and dataset intentionally omitted until decided; nothing is fabricated.
  },
  {
    title: 'Digital forensics',
    status: 'Idea',
    summary: 'A secondary area of interest: how digital evidence is collected, preserved and analyzed.',
  },
];

export type AchievementKind = 'Certification' | 'Workshop' | 'Course' | 'Award' | 'Academic';

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  kind: AchievementKind;
  link?: string;
  expires?: string;
  image?: { src: string; alt: string };
  description?: string;
}

/** Add only verified items. Items without a link simply show no link. */
export const achievements: Achievement[] = [];

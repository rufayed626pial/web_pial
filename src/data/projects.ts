/**
 * All project content lives here. Add, edit or reorder projects in this file only.
 *
 * Honesty rules baked into the schema:
 *  - `features.implemented` vs `features.planned` are always separate.
 *  - Optional sections (problem, challenges, lessons...) only render when filled in.
 *  - No `images` entry => a clearly labelled placeholder visual is shown (never a fake screenshot).
 *  - `updated` is used only for the "Recently updated" sort. Edit to real dates.
 */

export type CategoryId = 'web' | 'mobile' | 'ai' | 'security' | 'academic';

export const categories: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Applications' },
  { id: 'ai', label: 'AI / Machine Learning' },
  { id: 'security', label: 'Cybersecurity' },
  { id: 'academic', label: 'Academic Projects' },
];

export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;

export type ProjectStatus = 'Live' | 'In development' | 'Completed' | 'Concept' | 'Research in Progress';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  kind: string;
  short: string;
  overview: string;
  problem?: string;
  goals?: string[];
  role: string;
  responsibilities?: string[];
  stack: string[];
  features: { implemented: string[]; planned: string[] };
  decisions?: string[];
  challenges?: { challenge: string; solution: string }[];
  testing?: string;
  lessons?: string[];
  images: ProjectImage[];
  github?: string;
  live?: string;
  categories: CategoryId[];
  status: ProjectStatus;
  featured: boolean;
  updated: string; // ISO date, used for sorting
  /** Shown on pages that still need richer detail from the author. */
  detailsPending?: boolean;
}

const GITHUB_PROFILE = 'https://github.com/rufayed626pial';

export const projects: Project[] = [
  {
    slug: 'diu-transport-system',
    title: 'DIU Transport System',
    kind: 'University transport management',
    short:
      'A university transport management project that makes transport information and related workflows easier to access.',
    overview:
      'A web project built around the transport needs of a university campus. It uses Firebase for authentication and data, and Leaflet to bring map-based information into the interface.',
    problem:
      'Transport information on a large campus is easy to lose in notices and chat groups. This project explores putting it in one searchable, map-aware place.',
    role: 'Developer.',
    stack: ['Firebase Authentication', 'Firebase Realtime Database', 'Leaflet', 'JavaScript'],
    features: {
      implemented: [
        'Account sign-in handled with Firebase Authentication.',
        'Transport data stored and read through Firebase Realtime Database.',
        'Map-based views powered by Leaflet.',
      ],
      planned: [],
    },
    images: [],
    categories: ['web'],
    status: 'In development',
    featured: true,
    updated: '2026-09-01',
    detailsPending: true,
  },
  {
    slug: 'blitzmed',
    title: 'BlitzMed',
    kind: 'Emergency medical transport booking',
    short:
      'An emergency medical transport booking concept intended to help people reach emergency transport services quickly.',
    overview:
      'BlitzMed is a concept for booking emergency medical transport. The deployed version is built with Vanilla JavaScript and Firebase; a Flask and PostgreSQL backend has been considered for later development.',
    problem:
      'In an emergency, finding and booking medical transport should take as few steps as possible.',
    role: 'Developer.',
    stack: ['Vanilla JavaScript', 'Firebase', 'HTML', 'CSS'],
    features: {
      implemented: ['Deployed web front end built with Vanilla JavaScript.', 'Firebase used for the application back end.'],
      planned: ['Flask and PostgreSQL back end (under consideration).'],
    },
    images: [],
    live: 'https://blitzmed-brown.vercel.app/',
    github: GITHUB_PROFILE,
    categories: ['web'],
    status: 'Concept',
    featured: true,
    updated: '2026-08-15',
    detailsPending: true,
  },
  {
    slug: 'personal-portfolio',
    title: 'Personal Portfolio',
    kind: 'Personal website',
    short:
      'A personal website showcasing my background, technical interests, projects and professional journey.',
    overview:
      'This site. A data-driven React and TypeScript portfolio: every project, skill and timeline entry comes from typed data files, with a filterable project gallery, case study pages, light and dark themes and an honest contact form.',
    role: 'Designer and developer.',
    stack: ['React', 'TypeScript', 'Vite', 'CSS'],
    features: {
      implemented: [
        'Project search, category filter and sorting driven by the real project data.',
        'Case study pages for every project.',
        'Persistent light and dark theme.',
        'Accessible contact form with validation and honest delivery states.',
      ],
      planned: [],
    },
    images: [],
    github: GITHUB_PROFILE,
    categories: ['web'],
    status: 'Live',
    featured: false,
    updated: '2026-10-24',
  },
  {
    slug: 'budget-tracker',
    title: 'Budget Tracker',
    kind: 'Personal finance tracking',
    short:
      'A personal finance tracking application intended to help people organize expenses and monitor budgets.',
    overview:
      'A budgeting tool for recording expenses and keeping an eye on spending. It has been built with web technologies and Firebase.',
    role: 'Developer.',
    stack: ['Web technologies', 'Firebase'],
    features: { implemented: ['Built as a web application with Firebase.'], planned: [] },
    images: [],
    github: GITHUB_PROFILE,
    categories: ['web'],
    status: 'In development',
    featured: false,
    updated: '2026-06-01',
    detailsPending: true,
  },
  {
    slug: 'ai-tic-tac-toe',
    title: 'AI Tic-Tac-Toe',
    kind: 'AI lab project',
    short:
      'An AI lab project where a Minimax-powered player chooses strategic moves in a Tic-Tac-Toe game.',
    overview:
      'A playable Tic-Tac-Toe game written in Python with Pygame, where the computer opponent uses the Minimax algorithm. Minimax searches the tree of possible future moves, assuming both players play optimally: it picks moves that maximise its own outcome while assuming the opponent minimises it.',
    problem:
      'Adversarial search: how can a program choose the best move when an opponent is actively working against it?',
    role: 'Developer. Implemented the game and the AI as part of an AI lab.',
    stack: ['Python', 'Pygame'],
    features: {
      implemented: [
        'Playable Tic-Tac-Toe interface built with Pygame.',
        'Computer player that selects moves using the Minimax algorithm.',
      ],
      planned: [],
    },
    lessons: [
      'Game trees make adversarial decision-making concrete: every move is evaluated by what the opponent can do next.',
    ],
    images: [],
    github: GITHUB_PROFILE,
    categories: ['ai', 'academic'],
    status: 'Completed',
    featured: false,
    updated: '2026-04-01',
  },
  {
    slug: 'spam-classification',
    title: 'Spam Classification',
    kind: 'Machine learning coursework',
    short:
      'A coursework project comparing Multinomial Naive Bayes and Logistic Regression for spam classification.',
    overview:
      'A machine learning coursework project that compares two classic text-classification models, Multinomial Naive Bayes and Logistic Regression, on the task of separating spam from legitimate messages.',
    problem: 'Which of two standard classifiers does a better job of detecting spam, and why?',
    role: 'Student researcher. Compared the two models as coursework.',
    stack: ['Python', 'Multinomial Naive Bayes', 'Logistic Regression'],
    features: {
      implemented: ['Side-by-side comparison of Multinomial Naive Bayes and Logistic Regression.'],
      planned: [],
    },
    testing:
      'Evaluation metrics will be published here once they are confirmed from the project source or report.',
    images: [],
    github: GITHUB_PROFILE,
    categories: ['ai', 'academic'],
    status: 'Completed',
    featured: false,
    updated: '2026-05-01',
    detailsPending: true,
  },
  {
    slug: 'cybersecurity-research',
    title: 'Cybersecurity Research',
    kind: 'Research in progress',
    short:
      'A research direction around machine learning, intrusion detection, explainable AI and digital forensics.',
    overview:
      'An ongoing research interest that connects my Cybersecurity specialization with machine learning. Directions under consideration include ML-based intrusion detection, explainable AI for network security and digital forensics. No results or findings have been produced or published yet.',
    problem:
      'How can machine learning help detect intrusions, and how can its decisions be explained to the people who have to trust them?',
    role: 'Student researcher exploring the area.',
    stack: ['Machine learning', 'Intrusion detection', 'Explainable AI', 'Digital forensics'],
    features: { implemented: [], planned: ['Define a focused research question and dataset.', 'Draft a methodology.'] },
    images: [],
    categories: ['security', 'ai'],
    status: 'Research in Progress',
    featured: false,
    updated: '2026-10-01',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

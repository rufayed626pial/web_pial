/**
 * Central site configuration. Edit values here; the UI adapts automatically.
 * Any link left as an empty string ('') is hidden from the site rather than shown as a dead link.
 */
export const site = {
  name: 'Md. Rufayed Islam',
  brand: 'Pial',
  wordmark: 'pial.',
  tagline: 'Design-minded software engineer in the making.',
  role: 'Software Engineering student · Cybersecurity',

  /** Short status chip in the hero/footer. Keep it factual. */
  status: { text: 'BSc Software Engineering · DIU', open: false },

  /** TODO(Pial): add your public email address, e.g. 'you@example.com'. */
  email: '',

  /** Path (inside /public) of your CV, e.g. '/Rufayed-Islam-CV.pdf'. Empty hides the CV buttons. */
  cv: '',

  socials: {
    github: 'https://github.com/rufayed626pial',
    /** TODO(Pial): e.g. 'https://www.linkedin.com/in/your-handle' */
    linkedin: '',
  },

  /** Contact form endpoint comes from VITE_FORM_ENDPOINT (see .env.example). */
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '',
  siteUrl: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? '').replace(/\/+$/, ''),
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'research', label: 'Research' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
] as const;

export type SectionId = (typeof navItems)[number]['id'];

/** Technologies shown in the hero ticker. Only things actually used or being learned. */
export const marqueeTech = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Firebase', 'Python', 'Git', 'Flutter'];

export const exploring = [
  { title: 'Software engineering fundamentals', note: 'Structure, testing and maintainable code.' },
  { title: 'Flutter and mobile development', note: 'Learning to build cross-platform apps.' },
  { title: 'Cybersecurity and digital forensics', note: 'My academic specialization at DIU.' },
  { title: 'AI and machine learning', note: 'From coursework to security-focused research ideas.' },
  { title: 'UI/UX and frontend implementation', note: 'Making interfaces clear, fast and accessible.' },
];

export const workflow = [
  { n: '01', title: 'Discover', text: 'Understand the problem and the people it affects.' },
  { n: '02', title: 'Plan', text: 'Define requirements, scope and technical direction.' },
  { n: '03', title: 'Design', text: 'Structure the interface and the user experience.' },
  { n: '04', title: 'Build & Test', text: 'Implement, test the functionality, refine the experience.' },
  { n: '05', title: 'Deliver & Improve', text: 'Deploy, document, maintain and keep improving.' },
];

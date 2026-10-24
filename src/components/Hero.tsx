import { ArrowDown, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { GithubIcon, LinkedinIcon } from './Icons';
import { TechMarquee } from './TechMarquee';

function HeroVisual() {
  return (
    <svg className="hero__visual" viewBox="0 0 480 520" role="img" aria-label="Abstract composition of layered interface panels and code lines">
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="var(--line-strong)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="480" height="520" fill="url(#dots)" opacity="0.7" />
      {/* back panel */}
      <rect x="150" y="30" width="300" height="360" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)" />
      <rect x="170" y="56" width="120" height="10" rx="2" fill="var(--violet)" opacity="0.9" />
      <rect x="170" y="80" width="200" height="6" rx="2" fill="var(--line-strong)" />
      <rect x="170" y="96" width="160" height="6" rx="2" fill="var(--line-strong)" />
      <rect x="170" y="112" width="220" height="6" rx="2" fill="var(--line-strong)" />
      {/* front panel */}
      <rect x="40" y="150" width="300" height="320" rx="6" fill="var(--bg)" stroke="var(--text)" strokeWidth="1.5" />
      <rect x="40" y="150" width="300" height="34" rx="6" fill="var(--surface)" />
      <circle cx="62" cy="167" r="4" fill="var(--accent)" />
      <circle cx="78" cy="167" r="4" fill="var(--line-strong)" />
      <circle cx="94" cy="167" r="4" fill="var(--line-strong)" />
      <g fontFamily="var(--font-mono)" fontSize="13" fill="var(--text-dim)">
        <text x="62" y="224"><tspan fill="var(--violet)">const</tspan> idea = <tspan fill="var(--accent)">&apos;useful&apos;</tspan>;</text>
        <text x="62" y="250"><tspan fill="var(--violet)">function</tspan> build(idea) {'{'}</text>
        <text x="80" y="276">design(idea);</text>
        <text x="80" y="302">test();</text>
        <text x="80" y="328">ship();</text>
        <text x="62" y="354">{'}'}</text>
      </g>
      <rect x="62" y="392" width="140" height="36" rx="3" fill="var(--accent)" />
      <rect x="214" y="392" width="84" height="36" rx="3" fill="none" stroke="var(--line-strong)" />
      {/* accents */}
      <circle cx="400" cy="440" r="44" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx="400" cy="440" r="22" fill="var(--accent)" />
      <path d="M392 440l6 6 12-13" fill="none" stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="chip reveal">
            <span className={`dot${site.status.open ? ' dot--open' : ''}`} aria-hidden="true" />
            {site.status.text}
          </p>

          <h1 id="hero-title" className="hero__title reveal">
            <span className="hero__line">Design-minded</span>
            <span className="hero__line hero__line--accent">software engineer,</span>
            <span className="hero__sub">still in school and already building real-world solutions.</span>
          </h1>

          <p className="hero__lead reveal">
            I&apos;m {site.brand}, a Software Engineering student specializing in Cybersecurity. I build practical web
            experiences, explore mobile development, and enjoy turning ideas into useful software.
          </p>

          <div className="hero__cta reveal">
            <a className="btn btn--accent" href="#projects" onClick={(e) => scrollTo(e, 'projects')}>
              Explore My Work <ArrowDown size={16} aria-hidden="true" />
            </a>
            {site.cv && (
              <a className="btn btn--ghost" href={site.cv} download>
                <Download size={16} aria-hidden="true" /> Download CV
              </a>
            )}
            <ul className="hero__social" aria-label="Social links">
              {site.socials.github && (
                <li>
                  <a className="icon-btn" href={site.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
                    <GithubIcon />
                  </a>
                </li>
              )}
              {site.socials.linkedin && (
                <li>
                  <a className="icon-btn" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
                    <LinkedinIcon />
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a className="icon-btn" href={`mailto:${site.email}`} aria-label="Send an email">
                    <Mail size={18} aria-hidden="true" />
                  </a>
                </li>
              )}
              {!site.email && (
                <li>
                  <Link className="icon-btn" to={{ pathname: '/', hash: '#contact' }} aria-label="Go to contact form">
                    <Mail size={18} aria-hidden="true" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="hero__art reveal">
          <HeroVisual />
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}

function scrollTo(e: React.MouseEvent, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView();
  history.replaceState(null, '', `#${id}`);
}

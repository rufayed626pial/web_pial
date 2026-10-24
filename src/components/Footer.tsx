import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { navItems, site } from '../data/site';
import { GithubIcon, LinkedinIcon } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link to="/" className="wordmark wordmark--xl" aria-label={`${site.brand} — home`}>
              {site.wordmark}
            </Link>
            <p className="footer__tag">{site.tagline}</p>
            <p className="chip">
              <span className={`dot${site.status.open ? ' dot--open' : ''}`} aria-hidden="true" />
              {site.status.text}
            </p>
          </div>

          <nav aria-label="Footer" className="footer__nav">
            {navItems.map((n) => (
              <Link key={n.id} to={{ pathname: '/', hash: n.id === 'home' ? '' : `#${n.id}` }}>
                {n.label}
              </Link>
            ))}
          </nav>

          <ul className="footer__social" aria-label="Social links">
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
          </ul>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

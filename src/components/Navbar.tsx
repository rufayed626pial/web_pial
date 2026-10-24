import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from 'lucide-react';
import { navItems, site } from '../data/site';
import { useActiveSection, useScrollProgress, useTheme } from '../hooks/hooks';

const ids = navItems.map((n) => n.id);

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const active = useActiveSection(ids, isHome);
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('no-scroll');
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleBtn.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1180 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const linkTo = (id: string) => ({ pathname: '/', hash: id === 'home' ? '' : `#${id}` });

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__progress" aria-hidden="true">
        <div ref={progress} className="nav__progress-bar" />
      </div>
      <div className="container nav__inner">
        <Link to="/" className="wordmark" aria-label={`${site.brand} — home`}>
          {site.wordmark}
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navItems.map((n) => (
            <Link
              key={n.id}
              to={linkTo(n.id)}
              className="nav__link"
              aria-current={isHome && active === n.id ? 'true' : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          {site.cv && (
            <a className="btn btn--ghost btn--sm nav__cv" href={site.cv} download>
              <Download size={15} aria-hidden="true" /> CV
            </a>
          )}
          <Link className="btn btn--accent btn--sm nav__talk" to={linkTo('contact')}>
            Let&apos;s Talk <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <button
            ref={toggleBtn}
            type="button"
            className="icon-btn nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navItems.map((n, i) => (
              <li key={n.id}>
                <Link
                  ref={i === 0 ? firstLink : undefined}
                  to={linkTo(n.id)}
                  className="mobile-menu__link"
                  aria-current={isHome && active === n.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__cta">
            <Link className="btn btn--accent" to={linkTo('contact')} onClick={() => setOpen(false)}>
              Let&apos;s Talk <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            {site.cv && (
              <a className="btn btn--ghost" href={site.cv} download>
                <Download size={16} aria-hidden="true" /> Download CV
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

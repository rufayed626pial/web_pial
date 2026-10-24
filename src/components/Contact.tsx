import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { site } from '../data/site';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ContactForm } from './ContactForm';

export function Contact() {
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied('ok');
    } catch {
      setCopied('fail');
    }
    window.setTimeout(() => setCopied('idle'), 2200);
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro reveal">
          <p className="eyebrow mono">
            <span>09</span> / Contact
          </p>
          <h2 id="contact-title" className="contact__title">
            Have an idea?
            <br />
            <span>Let&apos;s build something meaningful.</span>
          </h2>
          <p className="contact__lead">
            I&apos;m always interested in learning, collaborating, and discussing useful software ideas.
          </p>

          <ul className="contact__links">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="contact__email">
                  {site.email}
                </a>
                <button type="button" className="btn btn--ghost btn--sm" onClick={copyEmail}>
                  {copied === 'ok' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  {copied === 'ok' ? 'Copied' : 'Copy email'}
                </button>
                <span className="visually-hidden" role="status">
                  {copied === 'ok' ? 'Email address copied to clipboard' : copied === 'fail' ? 'Could not copy automatically' : ''}
                </span>
                {copied === 'fail' && <span className="mono contact__hint">Copy it manually from the link.</span>}
              </li>
            )}
            {site.socials.github && (
              <li>
                <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="contact__social">
                  <GithubIcon /> GitHub <span className="visually-hidden">(opens in a new tab)</span>
                </a>
              </li>
            )}
            {site.socials.linkedin && (
              <li>
                <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social">
                  <LinkedinIcon /> LinkedIn <span className="visually-hidden">(opens in a new tab)</span>
                </a>
              </li>
            )}
            {site.cv && (
              <li>
                <a href={site.cv} download className="contact__social">
                  <Download size={18} aria-hidden="true" /> Download CV
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="contact__form reveal">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

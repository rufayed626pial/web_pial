import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { research, researchStatuses } from '../data/profile';
import { SectionHead } from './SectionHead';

export function Research() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="container">
        <SectionHead
          index="06"
          label="Research & cybersecurity"
          id="research-title"
          title="Questions I want to answer."
          lead="My Cybersecurity specialization is steering me toward research. Everything here is labelled by how far along it really is."
        />

        <ol className="statuses reveal" aria-label="Research status stages">
          {researchStatuses.map((s) => (
            <li key={s.status}>
              <strong className="mono">{s.status}</strong>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>

        <div className="accordion">
          {research.map((r, i) => {
            const open = openIdx === i;
            const hasDetails = r.question || r.motivation || r.methodology || r.dataset || (r.references && r.references.length);
            return (
              <div className="acc reveal" key={r.title}>
                <h3>
                  <button
                    type="button"
                    className="acc__btn"
                    aria-expanded={open}
                    aria-controls={`research-panel-${i}`}
                    id={`research-btn-${i}`}
                    onClick={() => setOpenIdx(open ? null : i)}
                  >
                    <span className="acc__title">{r.title}</span>
                    <span className={`tag tag--${r.status === 'In progress' ? 'learning' : 'studying'}`}>
                      {r.status === 'In progress' ? 'Research in Progress' : r.status}
                    </span>
                    <ChevronDown size={20} aria-hidden="true" className="acc__chev" />
                  </button>
                </h3>
                <div id={`research-panel-${i}`} role="region" aria-labelledby={`research-btn-${i}`} className="acc__panel" hidden={!open}>
                  <p>{r.summary}</p>
                  {hasDetails && (
                    <dl className="acc__details">
                      {r.question && (
                        <div>
                          <dt className="mono">Research question</dt>
                          <dd>{r.question}</dd>
                        </div>
                      )}
                      {r.motivation && (
                        <div>
                          <dt className="mono">Motivation</dt>
                          <dd>{r.motivation}</dd>
                        </div>
                      )}
                      {r.methodology && (
                        <div>
                          <dt className="mono">Methodology</dt>
                          <dd>{r.methodology}</dd>
                        </div>
                      )}
                      {r.dataset && (
                        <div>
                          <dt className="mono">Dataset</dt>
                          <dd>{r.dataset}</dd>
                        </div>
                      )}
                      {r.references && r.references.length > 0 && (
                        <div>
                          <dt className="mono">References</dt>
                          <dd>
                            <ul className="bullets">
                              {r.references.map((ref) => (
                                <li key={ref.href}>
                                  <a href={ref.href} target="_blank" rel="noopener noreferrer">
                                    {ref.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="note reveal">
          No papers, posters or publications yet. This space is reserved for them as they happen, and no findings are
          claimed before they exist.
        </p>
      </div>
    </section>
  );
}

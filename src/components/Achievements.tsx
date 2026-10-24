import { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { achievements, type AchievementKind } from '../data/profile';
import { SectionHead } from './SectionHead';

export function Achievements() {
  const kinds = useMemo(() => Array.from(new Set(achievements.map((a) => a.kind))) as AchievementKind[], []);
  const [kind, setKind] = useState<AchievementKind | 'All'>('All');
  const list = achievements.filter((a) => kind === 'All' || a.kind === kind);

  return (
    <section id="achievements" className="section section--alt" aria-labelledby="ach-title">
      <div className="container">
        <SectionHead
          index="07"
          label="Certifications & achievements"
          id="ach-title"
          title="Credentials, verified."
          lead="Only items I can back up with a link or document appear here."
        />

        {achievements.length === 0 ? (
          <div className="empty reveal">
            <p className="empty__title">Nothing listed yet.</p>
            <p>Verified certifications, workshops, courses and awards will appear here as I earn and document them.</p>
          </div>
        ) : (
          <>
            {kinds.length > 1 && (
              <div className="filters__chips reveal" role="group" aria-label="Filter achievements by type">
                {(['All', ...kinds] as const).map((k) => (
                  <button key={k} type="button" className="chipbtn" aria-pressed={kind === k} onClick={() => setKind(k)}>
                    {k}
                  </button>
                ))}
              </div>
            )}
            <ul className="agrid">
              {list.map((a) => (
                <li className="acard reveal" key={`${a.title}-${a.date}`}>
                  <p className="mono acard__kind">{a.kind}</p>
                  <h3>{a.title}</h3>
                  <p className="acard__issuer">
                    {a.issuer} · <span className="mono">{a.date}</span>
                    {a.expires && <span className="mono"> · expires {a.expires}</span>}
                  </p>
                  {a.description && <p>{a.description}</p>}
                  {a.image && <img src={a.image.src} alt={a.image.alt} loading="lazy" className="acard__img" />}
                  {a.link && (
                    <a href={a.link} target="_blank" rel="noopener noreferrer" className="acard__link">
                      View credential <ExternalLink size={14} aria-hidden="true" />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

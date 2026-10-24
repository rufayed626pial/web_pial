import { experience } from '../data/profile';
import { SectionHead } from './SectionHead';

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          index="04"
          label="Experience & leadership"
          id="experience-title"
          title="Beyond the code."
          lead="Student leadership and organizing work at Daffodil International University."
        />

        <ol className="timeline">
          {experience.map((e) => (
            <li className="timeline__item reveal" key={`${e.organization}-${e.role}`}>
              <span className="timeline__node" aria-hidden="true" />
              <div className="timeline__card">
                <p className="mono timeline__org">{e.organization}</p>
                <h3>{e.role}</h3>
                {e.period && <p className="mono timeline__period">{e.period}</p>}
                <p>{e.overview}</p>
                {e.responsibilities && e.responsibilities.length > 0 && (
                  <ul className="bullets">
                    {e.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}
                {e.contributions && e.contributions.length > 0 && (
                  <>
                    <h4 className="mono feat-label">Notable contributions</h4>
                    <ul className="bullets">
                      {e.contributions.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}
                {e.image && <img src={e.image.src} alt={e.image.alt} loading="lazy" className="timeline__img" />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

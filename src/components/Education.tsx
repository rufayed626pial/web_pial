import { Link } from 'react-router-dom';
import { education } from '../data/profile';
import { getProject } from '../data/projects';
import { SectionHead } from './SectionHead';

export function Education() {
  const e = education;
  return (
    <section id="education" className="section section--alt" aria-labelledby="education-title">
      <div className="container">
        <SectionHead index="05" label="Education" id="education-title" title="Where I'm studying." />

        <div className="edu reveal">
          <div className="edu__main">
            <p className="mono edu__status">{e.status}</p>
            <h3 className="edu__degree">{e.degree}</h3>
            <p className="edu__inst">
              {e.institution}, {e.location}
            </p>
            <p className="edu__major">
              <span className="tag tag--using">Major</span> {e.major}
            </p>
            {(e.period || e.semester) && (
              <p className="mono edu__period">{[e.period, e.semester].filter(Boolean).join(' · ')}</p>
            )}
          </div>

          <div className="edu__cols">
            <div>
              <h4 className="mono feat-label">Relevant coursework</h4>
              <ul className="bullets">
                {e.coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mono feat-label">Academic projects</h4>
              <ul className="bullets">
                {e.academicProjects.map((slug) => {
                  const p = getProject(slug);
                  return p ? (
                    <li key={slug}>
                      <Link to={`/projects/${slug}`}>{p.title}</Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
            <div>
              <h4 className="mono feat-label">Research interests</h4>
              <ul className="bullets">
                {e.researchInterests.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            {e.achievements.length > 0 && (
              <div>
                <h4 className="mono feat-label">Academic achievements</h4>
                <ul className="bullets">
                  {e.achievements.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

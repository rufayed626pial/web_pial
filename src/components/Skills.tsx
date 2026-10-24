import { Link } from 'react-router-dom';
import { skillGroups } from '../data/profile';
import { getProject } from '../data/projects';
import { SectionHead } from './SectionHead';

export function Skills() {
  return (
    <section id="skills" className="section section--alt" aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          index="02"
          label="Skills"
          id="skills-title"
          title="What I work with."
          lead="Grouped by what I use them for. Labels show whether I'm using, learning or studying each one; no made-up percentages."
        />

        <div className="skills">
          {skillGroups.map((g) => (
            <div className="skill-group reveal" key={g.id}>
              <div className="skill-group__head">
                <h3>{g.title}</h3>
                <p>{g.blurb}</p>
              </div>
              <ul className="skill-group__list">
                {g.skills.map((s) => (
                  <li className="skill" key={s.name}>
                    <div className="skill__top">
                      <span className="skill__name">{s.name}</span>
                      <span className={`tag tag--${s.level.toLowerCase()}`}>{s.level}</span>
                    </div>
                    <p className="skill__note">{s.note}</p>
                    {s.usedIn && s.usedIn.length > 0 && (
                      <p className="skill__used mono">
                        {s.usedIn.map((slug) => {
                          const p = getProject(slug);
                          return p ? (
                            <Link key={slug} to={`/projects/${slug}`}>
                              {p.title}
                            </Link>
                          ) : null;
                        })}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

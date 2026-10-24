import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { categoryLabel, getProject, projects } from '../data/projects';
import { usePageMeta, useReveal } from '../hooks/hooks';
import { GithubIcon } from '../components/Icons';
import { ProjectVisual } from '../components/ProjectVisual';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  usePageMeta(
    project ? `${project.title} — Case study · Pial` : 'Project not found · Pial',
    project ? project.short : 'This project could not be found.',
    `/projects/${slug}`,
  );
  useReveal([slug]);

  if (!project) return <NotFound />;

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const { implemented, planned } = project.features;

  return (
    <main id="main" className="case">
      <div className="container">
        <Link to={{ pathname: '/', hash: '#projects' }} className="back">
          <ArrowLeft size={16} aria-hidden="true" /> All projects
        </Link>

        <header className="case__head">
          <p className="eyebrow mono">
            {project.categories.map(categoryLabel).join(' · ')} · <span className="case__status">{project.status}</span>
          </p>
          <h1 className="case__title">{project.title}</h1>
          <p className="case__lead">{project.short}</p>
          <div className="case__links">
            {project.live && (
              <a className="btn btn--accent" href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} aria-hidden="true" /> Live demo<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            )}
            {project.github && (
              <a className="btn btn--ghost" href={project.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon /> {project.github.endsWith('rufayed626pial') ? 'GitHub profile' : 'Source code'}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </header>

        <div className="case__hero reveal">
          <ProjectVisual project={project} eager />
        </div>

        <div className="case__grid">
          <aside className="case__aside">
            <dl className="meta">
              <div>
                <dt className="mono">Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt className="mono">Status</dt>
                <dd>{project.status}</dd>
              </div>
              <div>
                <dt className="mono">Type</dt>
                <dd>{project.kind}</dd>
              </div>
              <div>
                <dt className="mono">Stack</dt>
                <dd>
                  <ul className="tags">
                    {project.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>

          <div className="case__content">
            <section className="reveal">
              <h2>Overview</h2>
              <p>{project.overview}</p>
            </section>

            {project.problem && (
              <section className="reveal">
                <h2>The problem</h2>
                <p>{project.problem}</p>
              </section>
            )}

            {project.goals && project.goals.length > 0 && (
              <section className="reveal">
                <h2>Goals and requirements</h2>
                <ul className="bullets">
                  {project.goals.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.responsibilities && project.responsibilities.length > 0 && (
              <section className="reveal">
                <h2>My responsibilities</h2>
                <ul className="bullets">
                  {project.responsibilities.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </section>
            )}

            {(implemented.length > 0 || planned.length > 0) && (
              <section className="reveal">
                <h2>Features</h2>
                {implemented.length > 0 && (
                  <>
                    <h3 className="mono feat-label feat-label--done">Implemented</h3>
                    <ul className="bullets">
                      {implemented.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
                {planned.length > 0 && (
                  <>
                    <h3 className="mono feat-label feat-label--planned">Planned</h3>
                    <ul className="bullets bullets--planned">
                      {planned.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </section>
            )}

            {project.decisions && project.decisions.length > 0 && (
              <section className="reveal">
                <h2>Implementation decisions</h2>
                <ul className="bullets">
                  {project.decisions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.challenges && project.challenges.length > 0 && (
              <section className="reveal">
                <h2>Challenges and solutions</h2>
                <ul className="challenges">
                  {project.challenges.map((c) => (
                    <li key={c.challenge}>
                      <strong>{c.challenge}</strong>
                      <span>{c.solution}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.testing && (
              <section className="reveal">
                <h2>Testing and results</h2>
                <p>{project.testing}</p>
              </section>
            )}

            {project.lessons && project.lessons.length > 0 && (
              <section className="reveal">
                <h2>Lessons learned</h2>
                <ul className="bullets">
                  {project.lessons.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </section>
            )}

            {project.detailsPending && (
              <p className="note reveal">
                This case study is still growing. Screenshots, challenges and lessons will be added as they are written up.
              </p>
            )}
          </div>
        </div>

        <nav className="case__nav" aria-label="More projects">
          <Link to={`/projects/${prev.slug}`} className="case__nav-link">
            <span className="mono">
              <ArrowLeft size={14} aria-hidden="true" /> Previous
            </span>
            <strong>{prev.title}</strong>
          </Link>
          <Link to={`/projects/${next.slug}`} className="case__nav-link case__nav-link--next">
            <span className="mono">
              Next <ArrowRight size={14} aria-hidden="true" />
            </span>
            <strong>{next.title}</strong>
          </Link>
        </nav>
      </div>
    </main>
  );
}

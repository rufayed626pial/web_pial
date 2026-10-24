import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { categoryLabel, type Project } from '../data/projects';
import { GithubIcon } from './Icons';
import { ProjectVisual } from './ProjectVisual';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`pcard reveal${project.featured ? ' pcard--wide' : ''}`}>
      <div className="pcard__media">
        <ProjectVisual project={project} />
        <span className="pcard__status mono">{project.status}</span>
      </div>
      <div className="pcard__body">
        <p className="pcard__meta mono">
          <span>{String(index + 1).padStart(2, '0')}</span>
          {project.categories.map((c) => categoryLabel(c)).join(' · ')}
        </p>
        <h3 className="pcard__title">
          <Link to={`/projects/${project.slug}`} className="pcard__link">
            {project.title}
            <ArrowUpRight size={22} aria-hidden="true" />
          </Link>
        </h3>
        <p className="pcard__kind">{project.kind}</p>
        <p className="pcard__short">{project.short}</p>
        <ul className="tags" aria-label="Technologies">
          {project.stack.slice(0, 5).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {(project.live || project.github) && (
          <div className="pcard__links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo (opens in a new tab)`}>
                <ExternalLink size={15} aria-hidden="true" /> Live
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub (opens in a new tab)`}>
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

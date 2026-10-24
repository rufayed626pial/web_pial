import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { categories, categoryLabel, projects, type CategoryId } from '../data/projects';
import { useReveal } from '../hooks/hooks';
import { ProjectCard } from './ProjectCard';
import { SectionHead } from './SectionHead';

type Sort = 'featured' | 'updated';

export function Projects() {
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('featured');

  const counts = useMemo(() => {
    const q = normalize(query);
    const matchesQuery = (p: (typeof projects)[number]) => !q || haystack(p).includes(q);
    const result: Record<string, number> = {};
    for (const c of categories) {
      result[c.id] = projects.filter((p) => (c.id === 'all' || p.categories.includes(c.id)) && matchesQuery(p)).length;
    }
    return result;
  }, [query]);

  const visible = useMemo(() => {
    const q = normalize(query);
    const list = projects.filter(
      (p) => (category === 'all' || p.categories.includes(category)) && (!q || haystack(p).includes(q)),
    );
    return [...list].sort((a, b) => {
      if (sort === 'featured' && a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.updated.localeCompare(a.updated);
    });
  }, [category, query, sort]);

  useReveal([visible.map((p) => p.slug).join(',')]);

  const filtered = category !== 'all' || query.trim() !== '' || sort !== 'featured';
  const clear = () => {
    setCategory('all');
    setQuery('');
    setSort('featured');
  };

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Projects"
          id="projects-title"
          title="Selected work."
          lead="Real projects from coursework and personal builds. Open any of them for the full case study."
        />

        <div className="filters reveal">
          <div className="filters__chips" role="group" aria-label="Filter projects by category">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className="chipbtn"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.label} <span className="chipbtn__count mono">{counts[c.id]}</span>
              </button>
            ))}
          </div>

          <div className="filters__row">
            <div className="field field--search">
              <label htmlFor="project-search" className="visually-hidden">
                Search projects by title, description or technology
              </label>
              <Search size={16} aria-hidden="true" />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, description or tech…"
                autoComplete="off"
              />
            </div>

            <div className="field field--select">
              <label htmlFor="project-sort">Sort</label>
              <select id="project-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="featured">Featured first</option>
                <option value="updated">Recently updated</option>
              </select>
            </div>

            <button type="button" className="btn btn--ghost btn--sm" onClick={clear} disabled={!filtered}>
              <X size={14} aria-hidden="true" /> Clear filters
            </button>
          </div>

          <p className="filters__count mono" role="status" aria-live="polite">
            {visible.length} {visible.length === 1 ? 'project' : 'projects'}
            {category !== 'all' && <> in {categoryLabel(category)}</>}
            {query.trim() && <> matching “{query.trim()}”</>}
          </p>
        </div>

        {visible.length > 0 ? (
          <div className="pgrid">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty" role="status">
            <p className="empty__title">No projects match those filters.</p>
            <p>
              {category === 'mobile'
                ? 'I haven’t shipped a mobile project yet. Flutter is what I’m learning right now.'
                : 'Try a different keyword or category, or clear the filters.'}
            </p>
            <button type="button" className="btn btn--accent btn--sm" onClick={clear}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

const normalize = (s: string) => s.trim().toLowerCase();

function haystack(p: (typeof projects)[number]) {
  return normalize(
    [p.title, p.kind, p.short, p.overview, p.stack.join(' '), p.categories.map(categoryLabel).join(' ')].join(' '),
  );
}

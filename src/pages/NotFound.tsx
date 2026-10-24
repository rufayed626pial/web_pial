import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/hooks';

export default function NotFound() {
  usePageMeta('Page not found · Pial', 'The page you were looking for does not exist.');
  return (
    <main id="main" className="notfound">
      <div className="container">
        <p className="eyebrow mono">404</p>
        <h1 className="notfound__title">
          This page <span>doesn&apos;t exist.</span>
        </h1>
        <p className="notfound__text">The link may be broken, or the project may have moved.</p>
        <div className="notfound__cta">
          <Link className="btn btn--accent" to="/">
            Back to home
          </Link>
          <Link className="btn btn--ghost" to={{ pathname: '/', hash: '#projects' }}>
            See projects
          </Link>
        </div>
      </div>
    </main>
  );
}

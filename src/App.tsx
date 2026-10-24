import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Research } from './components/Research';
import { Achievements } from './components/Achievements';
import { Workflow } from './components/Workflow';
import { Contact } from './components/Contact';
import { usePageMeta, useReveal } from './hooks/hooks';

const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Home() {
  usePageMeta(
    'Pial — Software Engineer · Cybersecurity · Flutter',
    'Pial (Md. Rufayed Islam) is a Software Engineering student at Daffodil International University specializing in Cybersecurity. Web development, Flutter, machine learning and practical software.',
    '/',
  );
  useReveal();
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Research />
      <Achievements />
      <Workflow />
      <Contact />
    </main>
  );
}

/** Scrolls to the hash target (or top) on navigation. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame so lazily rendered sections exist.
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 30);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <ScrollManager />
      <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

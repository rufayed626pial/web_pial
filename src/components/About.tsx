import { education } from '../data/profile';
import { exploring } from '../data/site';
import { SectionHead } from './SectionHead';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHead index="01" label="About" id="about-title" title="A student who builds." />

        <div className="about">
          <div className="about__main reveal">
            <p className="about__statement">
              I&apos;m a Software Engineering student who enjoys building digital products, exploring new technologies, and
              solving practical problems through code.
            </p>
            <p className="about__body">
              My interests span web development, mobile applications, cybersecurity, and AI-driven solutions. Alongside my
              academic work, I participate in university activities and collaborative projects that help me grow as an
              engineer.
            </p>

            <h3 className="about__sub">The short journey</h3>
            <p className="about__body">
              I&apos;m studying {education.degree.replace('Bachelor of Science in ', 'BSc ')} at {education.institution},
              specializing in {education.major}. Along the way I&apos;ve built web projects with Firebase, written AI
              coursework in Python, and taken on a leadership role in DIUSEC&apos;s Programme Organisation Wing.
            </p>

            <dl className="facts">
              <div>
                <dt className="mono">Studying</dt>
                <dd>Software Engineering</dd>
              </div>
              <div>
                <dt className="mono">Specialization</dt>
                <dd>{education.major}</dd>
              </div>
              <div>
                <dt className="mono">Learning</dt>
                <dd>Flutter</dd>
              </div>
              <div>
                <dt className="mono">From</dt>
                <dd>Bangladesh</dd>
              </div>
            </dl>
          </div>

          <aside className="exploring reveal" aria-labelledby="exploring-title">
            <h3 id="exploring-title" className="exploring__title">
              What I&apos;m exploring
            </h3>
            <ol className="exploring__list">
              {exploring.map((e, i) => (
                <li key={e.title}>
                  <span className="mono exploring__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{e.title}</strong>
                    <span>{e.note}</span>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}

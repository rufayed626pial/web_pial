import { workflow } from '../data/site';
import { SectionHead } from './SectionHead';

export function Workflow() {
  return (
    <section id="workflow" className="section" aria-labelledby="workflow-title">
      <div className="container">
        <SectionHead
          index="08"
          label="Workflow"
          id="workflow-title"
          title="How I build."
          lead="A simple five-stage loop I apply to every project, big or small."
        />
        <ol className="flow">
          {workflow.map((s, i) => (
            <li className="flow__step reveal" key={s.n} style={{ ['--i' as string]: i }}>
              <span className="flow__node mono" aria-hidden="true">
                {s.n}
              </span>
              <h3>
                <span className="visually-hidden">Step {s.n}: </span>
                {s.title}
              </h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { marqueeTech } from '../data/site';

export function TechMarquee() {
  return (
    <div className="marquee" role="group" aria-label="Technologies I use or am learning">
      <ul className="visually-hidden">
        {marqueeTech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="marquee__track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {marqueeTech.map((t) => (
              <span className="marquee__item" key={`${copy}-${t}`}>
                {t}
                <i className="marquee__sep" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

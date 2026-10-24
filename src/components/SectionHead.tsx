interface Props {
  index: string;
  label: string;
  title: string;
  id: string;
  lead?: string;
}

export function SectionHead({ index, label, title, id, lead }: Props) {
  return (
    <header className="section-head reveal">
      <p className="eyebrow mono">
        <span>{index}</span> / {label}
      </p>
      <h2 id={id} className="section-head__title">
        {title}
      </h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </header>
  );
}

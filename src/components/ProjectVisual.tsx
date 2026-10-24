import type { Project } from '../data/projects';

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Shows the project's real screenshot if one exists in `images`.
 * Otherwise renders a clearly labelled placeholder (never a stock photo posing as a screenshot).
 */
export function ProjectVisual({ project, index = 0, eager = false }: { project: Project; index?: number; eager?: boolean }) {
  const img = project.images[index];
  if (img) {
    return <img className="pvisual__img" src={img.src} alt={img.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  }

  const h = hash(project.slug);
  const variant = h % 3;
  const blocks = [
    { x: 56, w: 120 + (h % 40) },
    { x: 56, w: 90 + ((h >> 3) % 60) },
    { x: 56, w: 150 + ((h >> 5) % 30) },
  ];

  return (
    <svg
      className="pvisual__svg"
      viewBox="0 0 640 400"
      role="img"
      aria-label={`Placeholder preview for ${project.title}. A real screenshot has not been added yet.`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="640" height="400" fill="var(--surface)" />
      <g stroke="var(--line)" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="400" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 80} x2="640" y2={i * 80} />
        ))}
      </g>
      <rect x="56" y="48" width="528" height="304" rx="6" fill="var(--bg)" stroke="var(--line-strong)" />
      <rect x="56" y="48" width="528" height="30" rx="6" fill="var(--surface-2)" />
      <circle cx="76" cy="63" r="4" fill="var(--accent)" />
      <circle cx="92" cy="63" r="4" fill="var(--line-strong)" />
      <circle cx="108" cy="63" r="4" fill="var(--line-strong)" />
      {variant === 0 && (
        <>
          <rect x="80" y="104" width="200" height="12" rx="2" fill="var(--text)" opacity="0.85" />
          {blocks.map((b, i) => (
            <rect key={i} x="80" y={132 + i * 18} width={b.w} height="7" rx="2" fill="var(--line-strong)" />
          ))}
          <rect x="80" y="206" width="110" height="32" rx="3" fill="var(--accent)" />
          <rect x="330" y="104" width="230" height="220" rx="4" fill="var(--surface-2)" stroke="var(--line)" />
          <circle cx="445" cy="214" r="46" fill="none" stroke="var(--violet)" strokeWidth="2" />
          <circle cx="445" cy="214" r="18" fill="var(--violet)" opacity="0.8" />
        </>
      )}
      {variant === 1 && (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={80 + i * 166} y="104" width="150" height="120" rx="4" fill="var(--surface-2)" stroke="var(--line)" />
              <rect x={94 + i * 166} y="118" width="70" height="8" rx="2" fill={i === 0 ? 'var(--accent)' : 'var(--line-strong)'} />
              <rect x={94 + i * 166} y="136" width="110" height="6" rx="2" fill="var(--line-strong)" />
              <rect x={94 + i * 166} y="150" width="90" height="6" rx="2" fill="var(--line-strong)" />
            </g>
          ))}
          <rect x="80" y="244" width="480" height="84" rx="4" fill="var(--surface-2)" stroke="var(--line)" />
          <path d="M96 306 L180 280 L260 296 L350 262 L450 288 L544 258" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
        </>
      )}
      {variant === 2 && (
        <>
          <rect x="80" y="104" width="150" height="224" rx="4" fill="var(--surface-2)" stroke="var(--line)" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="94" y={120 + i * 24} width={i === 0 ? 90 : 110} height="8" rx="2" fill={i === 0 ? 'var(--accent)' : 'var(--line-strong)'} />
          ))}
          <rect x="250" y="104" width="310" height="224" rx="4" fill="var(--surface-2)" stroke="var(--line)" />
          <path d="M270 300 C 330 220, 380 330, 440 240 S 520 200, 540 150" fill="none" stroke="var(--violet)" strokeWidth="2.5" />
          <circle cx="440" cy="240" r="7" fill="var(--accent)" />
        </>
      )}
      <text x="584" y="378" textAnchor="end" fontFamily="var(--font-mono)" fontSize="12" fill="var(--text-dim)">
        screenshot placeholder
      </text>
    </svg>
  );
}

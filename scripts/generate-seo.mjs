// Generates public/sitemap.xml and public/robots.txt from VITE_SITE_URL.
// Runs automatically before `npm run build`.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function readEnvFile() {
  const file = resolve(root, '.env');
  if (!existsSync(file)) return {};
  const out = {};
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return out;
}

const env = { ...readEnvFile(), ...process.env };
const site = (env.VITE_SITE_URL || 'https://your-site.example.com').replace(/\/+$/, '');

// Keep in sync with src/data/projects.ts (slugs).
const dataFile = readFileSync(resolve(root, 'src/data/projects.ts'), 'utf8');
const slugs = [...dataFile.matchAll(/^\s*slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);

const urls = ['/', ...slugs.map((s) => `/projects/${s}`)];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n') +
  `\n</urlset>\n`;

writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log(`SEO files generated for ${site} (${urls.length} URLs)`);
if (site.includes('your-site.example.com')) {
  console.warn('  ! VITE_SITE_URL is still the placeholder. Set it in .env (or your host env vars) before deploying.');
}

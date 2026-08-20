import config from '../../config';
import { loadAllPages } from '$lib/get-pages';

export const prerender = true;

export async function GET() {
  const pages = await loadAllPages();

  const urls = Object.entries(pages)
    .filter(([file]) => file !== '404.md')
    .map(([file, page]) => {
      const slug = file === 'index.md' ? '' : file.replace(/\.md$/, '');
      const loc = new URL(slug, config.baseUrl).toString();
      const publishedAt = page.attributes?.published_at;
      const lastmod = publishedAt instanceof Date ? `<lastmod>${publishedAt.toISOString().slice(0, 10)}</lastmod>` : '';

      return `<url><loc>${loc}</loc>${lastmod}</url>`;
    })
    .join('');

  const contents = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`.trim();

  return new Response(contents, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

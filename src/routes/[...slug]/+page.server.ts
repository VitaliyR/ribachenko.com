import { error } from '@sveltejs/kit';
import { deepMap } from '$lib/code-utils';
import { loadAllPages } from '$lib/get-pages';
import type { EntryGenerator, PageServerLoad } from './$types';

export const prerender = true;

const parseDates = (obj: Record<string, unknown>) =>
  deepMap(obj, (value) => {
    if (typeof value === 'string' && value.endsWith('Z') && value.match(/^\d/)) {
      return new Date(value);
    } else if (typeof value === 'string' && value.match(/^\d{4}[-/]\d{2}[-/]\d{2}$/)) {
      return new Date(`${value.replaceAll('/', '-')}T00:00:00.000Z`);
    }
    return value;
  });

const slugToFile = (slug: string) => {
  if (slug === '') {
    return 'index.md';
  }
  return slug.endsWith('/') ? `${slug}index.md` : `${slug}.md`;
};

export const entries: EntryGenerator = async () => {
  const pages = await loadAllPages();
  return Object.keys(pages).map((file) => ({
    slug: file === 'index.md' ? '' : file.replace(/\.md$/, '')
  }));
};

export const load: PageServerLoad = async ({ params }) => {
  const pages = await loadAllPages();
  const slug = params.slug ?? '';
  const page = pages[slugToFile(slug)];

  if (!page?.attributes) {
    throw error(404, 'Not found');
  }

  return {
    data: parseDates(page.attributes),
    body: page.body,
    meta: {
      pages: parseDates(pages)
    },
    slug
  };
};

import { error } from '@sveltejs/kit';
import { deepMap } from '$lib/code-utils';
import { loadAllPages } from '$lib/get-pages';
import { getWishlistGroups } from '$lib/server/wishlist';
import type { PageServerLoad } from './$types';

export const prerender = false;

const parseDates = (obj: Record<string, unknown>) =>
  deepMap(obj, (value) => {
    if (typeof value === 'string' && value.endsWith('Z') && value.match(/^\d/)) {
      return new Date(value);
    } else if (typeof value === 'string' && value.match(/^\d{4}[-/]\d{2}[-/]\d{2}$/)) {
      return new Date(`${value.replaceAll('/', '-')}T00:00:00.000Z`);
    }
    return value;
  });

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'Netlify-CDN-Cache-Control': 'public, durable, max-age=120, stale-while-revalidate=3600',
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'Netlify-Cache-Tag': 'wishlist'
  });

  const [pages, items] = await Promise.all([loadAllPages(), getWishlistGroups()]);
  const page = pages['wishlist.md'];

  if (!page?.attributes) {
    throw error(404, 'Not found');
  }

  return {
    data: {
      ...parseDates(page.attributes),
      components: [
        ...(page.attributes.components ?? []),
        {
          type: 'ItemsListSection',
          items
        }
      ]
    },
    body: page.body,
    meta: {
      pages: parseDates(pages)
    },
    slug: 'wishlist'
  };
};

import type { RequestEvent } from '@sveltejs/kit';
import { loadAllPages } from '$lib/get-pages';

export async function GET({ url }: RequestEvent) {
  let slug = url.searchParams.get('slug');

  if (slug === '') {
    slug = 'index';
  } else if (slug?.endsWith('/')) {
    slug += 'index';
  }

  try {
    const pages = await loadAllPages();
    const page = pages[`${slug}.md`];

    const result = {
      ...page,
      __meta: {
        pages
      }
    };

    return {
      body: result
    };
  } catch (e) {
    console.log(e);
  }

  return {
    status: 404
  };
}

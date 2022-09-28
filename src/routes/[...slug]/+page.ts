import { redirect, type LoadEvent } from '@sveltejs/kit';
import { deepMap } from '$lib/code-utils';

const parseDates = (obj: any) =>
  deepMap(obj, (value) => {
    if (typeof value === 'string' && value.endsWith('Z') && value.match(/^\d/)) {
      return new Date(value);
    }
    return value;
  });

export async function load({ fetch, params }: LoadEvent) {
  const { slug } = params;

  const response = await fetch(`/data?slug=${encodeURIComponent(slug ?? '')}`);
  const data = await response.json();

  if (!data.attributes && data.__meta.pages['404.md']) {
    // means no page
    throw redirect(302, '/404');
  }

  return {
    data: parseDates(data.attributes),
    body: data.body,
    meta: {
      pages: parseDates(data.__meta.pages)
    },
    slug
  };

  return {};
}

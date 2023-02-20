import { redirect, type LoadEvent } from '@sveltejs/kit';
import { deepForEach, deepMap } from '$lib/code-utils';
import type { MastodonRequestEntry } from '../api/mastodon/types';

const parseDates = (obj: any) =>
  deepMap(obj, (value) => {
    if (typeof value === 'string' && value.endsWith('Z') && value.match(/^\d/)) {
      return new Date(value);
    } else if (typeof value === 'string' && value.match(/^\d{4}[-/]\d{2}[-/]\d{2}$/)) {
      return new Date(value.replace(/-/g, '/'));
    }
    return value;
  });

export async function load({ fetch, params }: LoadEvent) {
  const { slug } = params;

  const response = await fetch(`/api/page?slug=${encodeURIComponent(slug ?? '')}`);
  const data = await response.json();

  if (!data.attributes && data.__meta.pages['404.md']) {
    // means no page
    throw redirect(302, '/404');
  }

  let hasMastodonFeed = false;
  deepForEach(data.attributes, (value, key) => {
    if (key === 'type' && value === 'MastodonFeedSection') {
      hasMastodonFeed = true;
      return false;
    }
  });

  let mastodonData;
  if (hasMastodonFeed) {
    mastodonData = (await (await fetch(`/api/mastodon`)).json()) as MastodonRequestEntry[];
  }

  return {
    data: parseDates(data.attributes),
    body: data.body,
    meta: {
      pages: parseDates(data.__meta.pages)
    },
    mastodonData,
    slug
  };
}

import { redirect, type LoadEvent } from '@sveltejs/kit';
import { deepForEach, deepMap } from '$lib/code-utils';
import type { MastodonRequestEntry } from '../api/mastodon/types';
import config from '../../data/config.json';

const parseDates = (obj: Record<string, unknown>) =>
  deepMap(obj, (value) => {
    if (typeof value === 'string' && value.endsWith('Z') && value.match(/^\d/)) {
      return new Date(value);
    } else if (typeof value === 'string' && value.match(/^\d{4}[-/]\d{2}[-/]\d{2}$/)) {
      return new Date(value.replace(/-/g, '/'));
    }
    return value;
  });

export async function load({ fetch, params, url }: LoadEvent) {
  const { slug } = params;

  const redirectUrl = config.quickLinks[slug as keyof typeof config.quickLinks];
  if (redirectUrl) {
    throw redirect(302, redirectUrl);
  }

  const response = await fetch(`/api/page?slug=${encodeURIComponent(slug ?? '')}`);
  const data = await response.json();

  if (!data.attributes && data.__meta.pages['404.md']) {
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
      pages: parseDates(data.__meta.pages),
      searchParams: url.searchParams
    },
    mastodonData,
    slug
  };
}

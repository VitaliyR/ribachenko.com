import { json, type RequestEvent } from '@sveltejs/kit';
import { parse } from 'node-html-parser';
import type { MastodonApiEntry, MastodonRequestEntry } from './types';

const FEED_URL = 'https://mastodon.social/api/v1/accounts/000498519/statuses?exclude_replies=1';
const CACHE_TIME = 1000 * 60;

let feedCache: MastodonRequestEntry[] = [];
let feedUpdateDate: Date | undefined;

const parseType = (type: string) => {
  if (type === 'gifv') {
    return 'media';
  }
  return 'image';
};

const transformEntry = (entry: MastodonApiEntry): MastodonRequestEntry => {
  const content = parse(entry.content);
  content.querySelectorAll('a').forEach((node) => {
    node.classList.add('link');
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noreferrer noopener');
  });
  return {
    content: content.toString(),
    id: entry.id,
    createdAt: entry.created_at,
    url: entry.url,
    username: entry.account.username,
    displayName: entry.account.display_name,
    avatar: entry.account.avatar,
    media: entry.media_attachments
      .filter((media) => media.type === 'image' || media.type === 'gifv')
      .map((media) => ({ type: parseType(media.type), url: media.url })),
    reblog: entry.reblog ? transformEntry(entry.reblog) : undefined
  };
};

export async function GET({ fetch }: RequestEvent) {
  if (!feedUpdateDate || Date.now() - feedUpdateDate.getTime() >= CACHE_TIME) {
    try {
      const newFeed = await (await fetch(FEED_URL)).json();
      feedCache = newFeed.map(transformEntry);
      feedUpdateDate = new Date();
    } catch (e) {
      /* empty */
    }
  }

  return json(feedCache);
}

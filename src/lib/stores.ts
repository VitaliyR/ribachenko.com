import { writable } from 'svelte/store';
import type { Page } from '../models/types';
import type { MastodonRequestEntry } from '../routes/api/mastodon/types';

export type MetaStore = {
  pages: Record<string, Page>;
  searchParams: URLSearchParams;
};

export const metaStore = writable<MetaStore>({
  pages: {},
  searchParams: new URLSearchParams()
});

export type MastodonStore = {
  feed?: MastodonRequestEntry[];
};

export const mastodonStore = writable<MastodonStore>({});

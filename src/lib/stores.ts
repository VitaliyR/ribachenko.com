import { writable } from 'svelte/store';
import type { Page } from '../models/types';
import type { MastodonRequestEntry } from '../routes/api/mastodon/types';

export type MetaStore = {
  pages: Record<string, Page>;
};

export const metaStore = writable<MetaStore>({
  pages: {}
});

export type MastodonStore = {
  feed?: MastodonRequestEntry[];
};

export const mastodonStore = writable<MastodonStore>({});

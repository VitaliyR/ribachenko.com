import type { Page } from '../models/types';
import type { MastodonRequestEntry } from '../routes/api/mastodon/types';

export const META_CONTEXT = 'meta';

export type MetaContext = {
  pages: Record<string, Page>;
};

export const MASTODON_CONTEXT = 'mastodon';

export type MastodonContext = {
  feed: MastodonRequestEntry[] | undefined;
};

export type MastodonApiEntry = {
  id: string;
  created_at: string;
  in_reply_to_id: string | null;
  in_reply_to_account_id: string | null;
  sensitive: boolean;
  spoiler_text: string;
  visibility: string;
  language: string;
  uri: string;
  url: string;
  replies_count: number;
  reblogs_count: number;
  favourites_count: number;
  edited_at: null | string;
  favourited: boolean;
  reblogged: boolean;
  muted: boolean;
  bookmarked: boolean;
  pinned: boolean;
  content: string;
  reblog: null | MastodonApiEntry;
  application: {
    name: string;
    website: string | null;
  };
  account: {
    id: string;
    username: string;
    acct: string;
    display_name: string;
    locked: boolean;
    bot: boolean;
    discoverable: boolean;
    group: boolean;
    created_at: string;
    note: string;
    url: string;
    avatar: string;
    avatar_static: string;
    header: string;
    header_static: string;
    followers_count: number;
    following_count: number;
    statuses_count: number;
    last_status_at: string;
    noindex: boolean;
    emojis: string[];
    roles: string[];
    fields: Array<{
      name: string;
      value: string;
      verified_at: string | null;
    }>;
  };
  media_attachments: {
    id: string;
    type: 'image';
    url: string;
    preview_url: string;
    remote_url: null;
    preview_remote_url: null;
    text_url: null;
    meta: {
      original: {
        width: number;
        height: number;
        size: string;
        aspect: number;
      };
      small: {
        width: number;
        height: number;
        size: string;
        aspect: number;
      };
    };
    description: null;
    blurhash: string;
  }[];
  mentions: Array<{
    id: string;
    username: string;
    url: string;
    acct: string;
  }>;
  tags: string[];
  emojis: string[];
  card: null | {
    url: string;
    title: string;
    description: string;
    type: string;
    author_name: string;
    author_url: string;
    provider_name: string;
    provider_url: string;
    html: string;
    width: number;
    height: number;
    image: string;
    embed_url: string;
    blurhash: string;
  };
  poll: null;
};

export type MastodonRequestEntry = {
  content: string;
  id: string;
  createdAt: string;
  url: string;
  username: string;
  displayName: string;
  avatar: string;
  media: Array<{
    url: string;
    type: 'image' | 'media';
  }>;
  reblog?: MastodonRequestEntry;
};

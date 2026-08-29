export type Page = {
  body: string;
  attributes: Record<string, any>;
  frontmatter?: string;
};

export type Slug = {
  name: string;
  slug: string;
};

export type Post = {
  title: string;
  image: string;
  featured: boolean;
  published: boolean;
  published_at: Date;
  updated_at: Date;
  tags: Slug[];
};

export type LayoutData = {
  layout?: string;
};

export type ComponentData = {
  type: 'TextSection' | 'CardsListSection' | 'PostsFeedSection' | 'MastodonFeedSection' | 'ItemsListSection' | 'Link';
  [key: string]: any;
};

export type PageLayoutData = LayoutData & {
  components: ComponentData[];
};

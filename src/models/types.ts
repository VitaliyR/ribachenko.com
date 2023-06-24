export type Page = Record<string, any> & {
  body: string;
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
  layout: string;
};

export type ComponentData = {
  type: string;
};

export type PageLayoutData = LayoutData & {
  components: ComponentData[];
};

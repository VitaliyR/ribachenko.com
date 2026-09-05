import { env } from '$env/dynamic/private';
import { getDatabase } from '@netlify/database';

export type WishlistItem = {
  id: number;
  category: string;
  categoryPosition: number;
  icon: string;
  title: string;
  url: string;
  hidden: boolean;
  status: 'purchased' | 'presented' | null;
  position: number;
};

export type WishlistGroup = {
  title: string;
  items: Array<{
    icon: string;
    title: string;
    url: string;
    hidden?: boolean;
    isDone?: 'purchased' | 'presented';
  }>;
};

export const getWishlistGroups = async (): Promise<WishlistGroup[]> => {
  const { sql } = getDatabase({ connectionString: env.NETLIFY_DB_URL });
  const rows = await sql<WishlistItem>`
    SELECT
      id,
      category,
      category_position AS "categoryPosition",
      icon,
      title,
      url,
      hidden,
      status,
      position
    FROM wishlist_items
    ORDER BY category_position, category, position, id
  `;

  const groups = new Map<string, WishlistGroup>();

  for (const row of rows) {
    const group = groups.get(row.category) ?? { title: row.category, items: [] };
    group.items.push({
      icon: row.icon,
      title: row.title,
      url: row.url,
      ...(row.hidden ? { hidden: true } : {}),
      ...(row.status ? { isDone: row.status } : {})
    });
    groups.set(row.category, group);
  }

  return [...groups.values()];
};

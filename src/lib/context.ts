import type { Page } from '../models/types';
export const META_CONTEXT = 'meta';

export type MetaContext = {
  pages: Record<string, Page>;
};

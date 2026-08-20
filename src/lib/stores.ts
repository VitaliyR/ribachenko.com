import { writable } from 'svelte/store';
import type { Page } from '../models/types';

export type MetaStore = {
  pages: Record<string, Page>;
  searchParams: URLSearchParams;
};

export const metaStore = writable<MetaStore>({
  pages: {},
  searchParams: new URLSearchParams()
});

import { createContext } from 'svelte';
import type { Page } from '../models/types';

export interface MetaContext {
  readonly pages: Record<string, Page>;
  readonly searchParams: URLSearchParams;
}

export const [getMetaContext, setMetaContext] = createContext<MetaContext>();

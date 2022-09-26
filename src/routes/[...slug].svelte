<script context="module" lang="ts">
  import type { LoadEvent } from '@sveltejs/kit';
  import { deepMap } from '$lib/code-utils';

  type Meta = {
    pages: string[];
  };

  const parseDates = (obj: any) =>
    deepMap(obj, (value) => {
      if (typeof value === 'string' && value.endsWith('Z') && value.match(/^\d/)) {
        return new Date(value);
      }
      return value;
    });

  export async function load({ fetch, params }: LoadEvent) {
    const { slug } = params;

    try {
      const response = await fetch(`/data?slug=${encodeURIComponent(slug)}`);
      const data = await response.json();

      if (!data.attributes && data.__meta.pages['404.md']) {
        // means no page
        return {
          status: 302,
          redirect: '/404'
        };
      }

      return {
        props: {
          data: parseDates(data.attributes),
          body: data.body,
          meta: {
            pages: parseDates(data.__meta.pages)
          },
          slug
        }
      };
    } catch (e) {
      console.log(e);
    }

    return {};
  }
</script>

<script lang="ts">
  import { setContext } from 'svelte';
  import { META_CONTEXT } from '$lib/context';
  import Layout from '../components/layouts/index.svelte';

  export let data: any;
  export let body: string;
  export let slug: string;
  export let meta: Meta;

  $: layout = data?.layout || 'PageLayout';

  setContext(META_CONTEXT, meta);
</script>

<Layout {layout} {data} {body} {slug} />

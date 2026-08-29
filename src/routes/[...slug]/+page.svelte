<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import Layout from '../../components/layouts/index.svelte';
  import type { PageData } from './$types';
  import { setMetaContext } from '../../lib/meta-context';
  import type { Page } from '../../models/types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let layout = $derived((data.data?.layout as string | undefined) || 'PageLayout');

  setMetaContext({
    get pages() {
      return data.meta.pages as Record<string, Page>;
    },
    get searchParams() {
      return browser ? page.url.searchParams : new URLSearchParams();
    }
  });
</script>

<Layout {layout} data={data.data} body={data.body as string} slug={(data.slug as string) ?? ''} />

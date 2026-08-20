<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import Layout from '../../components/layouts/index.svelte';
  import type { PageData } from './$types';
  import { metaStore } from '../../lib/stores';

  export let data: PageData;

  $: layout = data.data?.layout || 'PageLayout';

  $: metaStore.set({
    pages: data.meta.pages,
    searchParams: browser ? $page.url.searchParams : new URLSearchParams()
  });
</script>

<Layout {layout} data={data.data} body={data.body} slug={data.slug ?? ''} />

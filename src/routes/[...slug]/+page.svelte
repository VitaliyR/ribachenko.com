<script lang="ts">
  import Layout from '../../components/layouts/index.svelte';
  import type { PageData } from './$types';
  import { mastodonStore, metaStore } from '../../lib/stores';

  export let data: PageData;

  $: layout = data.data?.layout || 'PageLayout';

  $: {
    metaStore.set(data.meta);
    mastodonStore.set({ feed: data.mastodonData });
  }
</script>

<Layout {layout} data={data.data} body={data.body} slug={data.slug ?? ''} />

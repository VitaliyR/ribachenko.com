<script lang="ts">
  import { setContext } from 'svelte';
  import { META_CONTEXT, MASTODON_CONTEXT } from '$lib/context';
  import Layout from '../../components/layouts/index.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: layout = data.data?.layout || 'PageLayout';

  setContext(META_CONTEXT, data.meta);
  setContext(MASTODON_CONTEXT, { feed: data.mastodonData });
</script>

<Layout {layout} data={data.data} body={data.body} slug={data.slug ?? ''} />

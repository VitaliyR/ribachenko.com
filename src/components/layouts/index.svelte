<script lang="ts">
  import PageLayout from './PageLayout.svelte';
  import PostLayout from './PostLayout.svelte';
  import CVLayout from './CVLayout.svelte';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LAYOUTS: { [K: string]: any } = {
    PageLayout,
    PostLayout,
    CVLayout
  };

  export let slug: string;
  export let layout: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let data: any;
  export let body: string;
</script>

<svelte:component this={LAYOUTS[layout]} {data} {body} {slug} />

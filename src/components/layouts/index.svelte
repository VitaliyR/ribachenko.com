<script lang="ts">
  import PageLayout from './PageLayout.svelte';
  import PostLayout from './PostLayout.svelte';
  import CVLayout from './CVLayout.svelte';

  const LAYOUTS: { [K: string]: any } = {
    PageLayout,
    PostLayout,
    CVLayout
  };

  export let slug: string;
  export let layout: string;
  export let data: any;
  export let body: string;
</script>

<svelte:component this={LAYOUTS[layout]} {data} {body} {slug} />

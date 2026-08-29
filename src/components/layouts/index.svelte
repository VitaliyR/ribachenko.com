<script lang="ts">
  import PageLayout from './PageLayout.svelte';
  import PostLayout from './PostLayout.svelte';
  import CVLayout from './CVLayout.svelte';

  const LAYOUTS: { [K: string]: any } = {
    PageLayout,
    PostLayout,
    CVLayout
  };

  interface Props {
    slug: string;
    layout: string;

    data: any;
    body: string;
  }

  let {
    slug,
    layout,
    data,
    body
  }: Props = $props();

  const SvelteComponent = $derived(LAYOUTS[layout]);
</script>

<SvelteComponent {data} {body} {slug} />

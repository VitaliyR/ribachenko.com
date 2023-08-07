<script lang="ts" context="module">
  import { omitBy } from 'lodash-es';
  import TextSection from '../molecules/TextSection.svelte';
  import CardsListSection from '../molecules/CardsListSection.svelte';
  import PostsFeedSection from '../molecules/PostsFeedSection.svelte';
  import MastodonFeedSection from '../molecules/MastodonFeedSection.svelte';
  import ItemsListSection from '../molecules/ItemsListSection.svelte';
  import Link from '../atoms/Link.svelte';

  const MAP = {
    TextSection,
    CardsListSection,
    PostsFeedSection,
    MastodonFeedSection,
    ItemsListSection,
    Link
  } as const;

  export type ComponentType = keyof typeof MAP;

  export type BaseComponent = {
    type: ComponentType;
  };
</script>

<script lang="ts">
  export let type: ComponentType;
  let componentProps: Record<string, unknown>;
  let component: any;
  $: {
    component = MAP[type] as any;
    componentProps = omitBy($$props, (value, key) => key === 'type' || typeof value === 'undefined');
  }
</script>

<svelte:component this={component} {...componentProps} />

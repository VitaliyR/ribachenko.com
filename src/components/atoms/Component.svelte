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
  $: componentProps = omitBy($$props, (value, key) => key === 'type' || typeof value === 'undefined');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $: component = MAP[type] as any;
</script>

<svelte:component this={component} {...componentProps} />

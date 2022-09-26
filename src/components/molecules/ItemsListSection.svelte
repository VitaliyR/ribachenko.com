<script lang="ts" context="module">
  type Group = {
    title: string;
    items: Item[];
  };

  type Item = {
    icon: string;
    title: string;
    url: string;
    isDone?: 'purchased' | 'presented';
  };
</script>

<script lang="ts">
  import type { BaseComponent } from '../atoms/Component.svelte';
  import Link from '../atoms/Link.svelte';
  import Section from './Section.svelte';

  export let hasBorder = false;
  export let title = '';
  export let titleSlot: BaseComponent | undefined = undefined;

  export let items: Group[];

  const getDoneTitle = (isDone: Item['isDone']): string => (isDone === 'purchased' ? 'Purchased' : 'Presented');
</script>

<Section {hasBorder} {title} {titleSlot}>
  {#each items as group}
    <h2>{group.title}</h2>
    <ul>
      {#each group.items as item}
        <li>
          <span>{item.icon}</span>
          <Link
            newTab
            title={[item.title, item.isDone && `(${getDoneTitle(item.isDone)})`].filter(Boolean).join(' ')}
            url={item.url}
            class={item.isDone ? 'crossed' : undefined}
          />
        </li>
      {/each}
    </ul>
  {/each}
</Section>

<style lang="scss">
  ul {
    :global(.crossed) {
      text-decoration: line-through;
    }
  }
</style>

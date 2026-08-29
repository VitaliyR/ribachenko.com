<script lang="ts">
  import type { Snippet } from 'svelte';
  import Component, { type BaseComponent } from '../atoms/Component.svelte';


  interface Props {
    class?: string | undefined;
    hasBorder?: boolean;
    title?: string | undefined;
    titleSlot?: BaseComponent | undefined;
    children?: Snippet;
  }

  let {
    class: className = undefined,
    hasBorder = false,
    title = undefined,
    titleSlot = undefined,
    children
  }: Props = $props();
</script>

<div class:has-border={hasBorder} class={className}>
  {#if title}
    <header class="header">
      <h2 class="title">{title}</h2>
      {#if titleSlot}<Component {...titleSlot} />{/if}
    </header>
  {/if}
  {@render children?.()}
</div>

<style lang="scss">
  div {
    padding: calc(var(--space) * 2) 0 calc(var(--space) * 4);
  }

  .has-border {
    border-bottom: 2px solid var(--color-tint);
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .title {
    font: var(--typography-title-s);
    margin-bottom: var(--space);
    flex: 1 0;
    color: var(--color-header);
  }
</style>

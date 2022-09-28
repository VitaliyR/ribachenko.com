<script lang="ts">
  import Component, { type BaseComponent } from '../atoms/Component.svelte';

  let className: string | undefined = undefined;

  export { className as class };

  export let hasBorder = false;
  export let title: string | undefined = undefined;
  export let titleSlot: BaseComponent | undefined = undefined;
</script>

<div class:has-border={hasBorder} class={className}>
  {#if title}
    <header class="header">
      <h2 class="title">{title}</h2>
      {#if titleSlot}<Component {...titleSlot} />{/if}
    </header>
  {/if}
  <slot />
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

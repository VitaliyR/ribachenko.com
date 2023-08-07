<script lang="ts">
  import Tooltip from '../atoms/Tooltip.svelte';

  export let targetElement: HTMLElement;
  export let title: string;
</script>

<Tooltip placement="top" {targetElement}>
  <div>
    {title}
  </div>
</Tooltip>

<style>
  div {
    padding: 0 var(--space);
    box-shadow: var(--shadow-level-1);
    background: white;
    border-radius: var(--border-radius);
    color: var(--color-accent-dark);
    font: var(--typography-body-small);
  }
</style>

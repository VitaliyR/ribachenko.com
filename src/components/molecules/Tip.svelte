<script lang="ts">
  import Tooltip from '../atoms/Tooltip.svelte';

  interface Props {
    targetElement: HTMLElement;
    title: string;
  }

  let { targetElement, title }: Props = $props();
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

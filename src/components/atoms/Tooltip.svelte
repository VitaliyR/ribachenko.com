<script lang="ts">
  import { autoUpdate, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom';
  import { onDestroy, onMount, type Snippet } from 'svelte';

  interface Props {
    targetElement: HTMLElement;
    placement?: Placement;
    sameWidth?: boolean;
    children?: Snippet;
  }

  let {
    targetElement,
    placement = 'top',
    sameWidth = false,
    children
  }: Props = $props();

  let tooltipEl: HTMLElement | undefined = $state();
  let left = $state(0);
  let top = $state(0);
  let width: number | undefined = $state();
  let cleanup: () => void | undefined;

  onMount(() => {
    cleanup = autoUpdate(targetElement, tooltipEl!, () => {
      computePosition(targetElement, tooltipEl!, {
        placement,
        middleware: [offset(8), flip(), shift({ padding: 8 })]
      }).then((opts) => {
        left = opts.x;
        top = opts.y;
        if (sameWidth) {
          width = targetElement.getBoundingClientRect().width;
        } else {
          width = undefined;
        }
      });
    });
  });

  onDestroy(() => {
    cleanup?.();
  });
</script>

<div style={`left: ${left}px; top: ${top}px; ${width ? `width: ${width}px` : ''}`} bind:this={tooltipEl}>
  {@render children?.()}
</div>

<style>
  div {
    position: absolute;
  }
</style>

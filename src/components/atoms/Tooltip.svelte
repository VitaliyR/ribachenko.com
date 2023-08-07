<script lang="ts">
  import { autoUpdate, computePosition, flip, offset, shift, type Placement } from '@floating-ui/dom';
  import { onDestroy, onMount } from 'svelte';

  export let targetElement: HTMLElement;
  export let placement: Placement = 'top';
  export let sameWidth = false;

  let tooltipEl: HTMLElement;
  let left: number;
  let top: number;
  let width: number | undefined;
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
  <slot />
</div>

<style>
  div {
    position: absolute;
  }
</style>

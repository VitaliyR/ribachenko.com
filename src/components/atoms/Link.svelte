<script lang="ts">
  import classNames from 'classnames';
  import Icon, { type IconName } from './Icon.svelte';
  import { tip as actionTip } from '../../actions/tip';

  let className = '';

  export { className as class };

  export let tip: string | undefined = undefined;
  export let url: string;
  export let title: string | undefined = undefined;
  export let icon: IconName | undefined = undefined;
  export let download: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let isPlain = false;
  export let isHiddenPrint = false;
  export let newTab = false;
</script>

<a
  href={url}
  class={classNames('link', { 'link--ic link--plain': isPlain, 'print-hidden': isHiddenPrint }, className)}
  target={newTab ? '_blank' : undefined}
  rel={rel ?? (url.startsWith('/') ? undefined : 'noreferrer noopener')}
  {download}
  use:actionTip={tip ?? ''}
  on:click
>
  {#if icon}
    <Icon {icon} class="icon" />
  {/if}
  {#if title}<span>{title}</span>{/if}
</a>

<style lang="scss">
  a {
    :global(.icon) {
      width: 24px;
      height: 24px;
    }

    &.print-hidden {
      @media print {
        display: none;
      }
    }
  }
</style>

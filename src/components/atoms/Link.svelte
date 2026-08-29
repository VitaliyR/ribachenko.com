<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import classNames from 'classnames';
  import Icon, { type IconName } from './Icon.svelte';
  import { tip as actionTip } from '../../actions/tip';


  interface Props {
    class?: string;
    tip?: string | undefined;
    url: string;
    title?: string | undefined;
    icon?: IconName | undefined;
    download?: string | undefined;
    rel?: string | undefined;
    isPlain?: boolean;
    isHiddenPrint?: boolean;
    newTab?: boolean;
    onclick?: MouseEventHandler<HTMLAnchorElement>;
  }

  let {
    class: className = '',
    tip = undefined,
    url,
    title = undefined,
    icon = undefined,
    download = undefined,
    rel = undefined,
    isPlain = false,
    isHiddenPrint = false,
    newTab = false,
    onclick
  }: Props = $props();
</script>

<a
  href={url}
  class={classNames('link', { 'link--ic link--plain': isPlain, 'print-hidden': isHiddenPrint }, className)}
  target={newTab ? '_blank' : undefined}
  rel={rel ?? (url.startsWith('/') ? undefined : 'noreferrer noopener')}
  {download}
  use:actionTip={tip ?? ''}
  {onclick}
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

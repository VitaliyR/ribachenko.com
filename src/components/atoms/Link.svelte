<script lang="ts">
  import classNames from 'classnames';
  import Icon, { type IconName } from './Icon.svelte';

  let className = '';

  export { className as class };

  export let url: string;
  export let title: string | undefined = undefined;
  export let icon: IconName | undefined = undefined;
  export let download: string | undefined = undefined;
  export let isPlain = false;
  export let newTab = false;
</script>

<a
  href={url}
  class={classNames('link', { 'link--ic link--plain': isPlain }, className)}
  target={newTab ? '_blank' : undefined}
  rel={url.startsWith('/') ? undefined : 'noreferrer noopener'}
  {download}
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
  }
</style>

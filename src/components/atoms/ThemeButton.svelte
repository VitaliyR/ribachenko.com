<script lang="ts">
  import { browser } from '$app/environment';
  import { isEnabledDarkScheme, toggleDarkScheme } from '$lib/scheme';
  import classNames from 'classnames';
  import Icon from './Icon.svelte';

  interface Props {
    class?: string | undefined;
  }

  let { class: className = '' }: Props = $props();


  let isDarkScheme = $state(false);
  if (browser) {
    isDarkScheme = isEnabledDarkScheme();
  }

  const toggleTheme = () => {
    isDarkScheme = !isDarkScheme;
    toggleDarkScheme(isDarkScheme);
  };
</script>

<button class={classNames('button', className)} role="switch" aria-label="Switch day/night mode" aria-checked={isDarkScheme} onclick={toggleTheme}>
  <Icon icon="daynight-stroke" />
</button>

<style lang="scss">
  button {
    @media print {
      display: none;
    }
  }
</style>

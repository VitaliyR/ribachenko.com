<script lang="ts">
  import { browser } from '$app/environment';
  import { isEnabledDarkScheme, toggleDarkScheme } from '$lib/scheme';
  import classNames from 'classnames';
  import Icon from './Icon.svelte';

  let className: string | undefined = '';

  export { className as class };

  let isDarkScheme = false;
  if (browser) {
    isDarkScheme = isEnabledDarkScheme();
  }

  const toggleTheme = () => {
    isDarkScheme = !isDarkScheme;
    toggleDarkScheme(isDarkScheme);
  };
</script>

<button class={classNames('button', className)} role="switch" aria-label="Switch day/night mode" aria-checked={isDarkScheme} on:click={toggleTheme}>
  <Icon icon="daynight-stroke" />
</button>

<style lang="scss">
  button {
    @media print {
      display: none;
    }
  }
</style>

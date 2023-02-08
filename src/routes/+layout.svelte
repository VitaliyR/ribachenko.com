<script lang="ts">
  import { browser } from '$app/environment';
  import { onDestroy } from 'svelte';
  import { EventSchemeChangedName, isEnabledDarkScheme, type EventSchemeChanged } from '../lib/scheme';
  import { isSupportWebP } from '../lib/utils';

  let isDarkScheme = false;

  const onSchemeChanged = (e: EventSchemeChanged) => {
    isDarkScheme = e.detail.isDark;
  };

  if (browser) {
    isDarkScheme = isEnabledDarkScheme();
    document.documentElement.addEventListener(EventSchemeChangedName, onSchemeChanged);
  }

  if (browser) {
    isSupportWebP().then((result) => {
      document.body.classList.toggle('supports-web-p', result);
    });
  }

  onDestroy(() => {
    if (browser) {
      document.documentElement.removeEventListener(EventSchemeChangedName, onSchemeChanged);
    }
  });
</script>

<svelte:head>
  <meta name="theme-color" content={isDarkScheme ? '#2f2f31' : '#ffffff'} />
</svelte:head>

<slot />

<style lang="scss" global>
  @import '../styles/base';
</style>

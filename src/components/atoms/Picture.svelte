<script lang="ts">
  import { browser } from '$app/environment';
  import { Mime } from '$lib/mime';
  import { EventSchemeChangedName, type EventSchemeChanged, isEnabledDarkScheme } from '$lib/scheme';
  import { onDestroy } from 'svelte';

  export let url: string;
  export let urlDark: string | undefined = undefined;
  export let alt: string | undefined = undefined;
  export let hasRetina = false;
  export let hasWebp = true;

  let className = '';
  export { className as class };

  // if urlDark is provided, wait for the client to determine which picture to load
  let isVisible = !urlDark;
  let isDarkMode = false;

  const onSchemeChanged = (e: EventSchemeChanged) => {
    isDarkMode = e.detail.isDark;
  };

  if (browser) {
    isDarkMode = isEnabledDarkScheme();
    document.documentElement.addEventListener(EventSchemeChangedName, onSchemeChanged);
    isVisible = true;
  }

  onDestroy(() => {
    if (browser) {
      document.documentElement.removeEventListener(EventSchemeChangedName, onSchemeChanged);
    }
  });

  const REPLACE_REGEXP = /^\/assets\//;
  let srcSets: Array<{
    srcSet: string;
    isDark: boolean;
    type: string;
  }> = [];
  let imgBaseUrl: string;
  let imgBaseUrlExt: string;
  let isPrint = false;

  $: {
    const [[baseUrl, baseUrlExt], [baseDarkUrl, baseDarkUrlExt]] = [url, urlDark].map((curUrl) => {
      const parts = curUrl?.replace(REPLACE_REGEXP, '/g/').split('.') ?? [];
      return [parts.slice(0, -1).join('.'), parts[parts.length - 1]];
    });

    isPrint = browser ? window.matchMedia('print').matches : false;
    imgBaseUrl = isDarkMode && !isPrint ? baseDarkUrl || baseUrl : baseUrl;
    imgBaseUrlExt = isDarkMode && !isPrint ? baseDarkUrlExt || baseUrlExt : baseUrlExt;

    srcSets = [
      [baseUrl, baseUrlExt, false],
      hasWebp && baseUrlExt !== 'webp' && [baseUrl, 'webp', false],
      baseDarkUrl && [baseDarkUrl, baseDarkUrlExt, true],
      hasWebp && baseDarkUrl && baseDarkUrlExt !== 'webp' && [baseDarkUrl, 'webp', true]
    ]
      .filter(Boolean)
      .map((opts) => {
        const [url, ext, isDark] = opts as [string, string, boolean];
        const srcSet = hasRetina ? `${url}@2x.${ext} 2x, ${url}.${ext} 1x` : `${url}.${ext}`;
        return {
          srcSet,
          isDark,
          type: Mime[ext]
        };
      });
  }
</script>

{#if isVisible}
  <picture>
    {#each srcSets as srcSetObj}
      {@const isMode = srcSetObj.isDark === isDarkMode}
      {@const media = srcSetObj.isDark ? 'min-width: Infinity' : 'print'}
      <source srcset={srcSetObj.srcSet} type={srcSetObj.type} media={isMode ? undefined : media} />
    {/each}
    <img class={className} src={`${imgBaseUrl}.${imgBaseUrlExt}`} {alt} itemprop="image" />
  </picture>
{/if}

<style lang="scss">
  picture {
    display: flex;
  }
</style>

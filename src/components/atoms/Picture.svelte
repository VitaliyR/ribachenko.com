<script lang="ts">
  import { browser } from '$app/environment';
  import { Mime } from '$lib/mime';
  import { EventSchemeChangedName, type EventSchemeChanged, isEnabledDarkScheme } from '$lib/scheme';
  import { onDestroy } from 'svelte';


  interface Props {
    url: string;
    urlDark?: string | undefined;
    alt?: string | undefined;
    hasRetina?: boolean;
    hasWebp?: boolean;
    class?: string;
  }

  let {
    url,
    urlDark = undefined,
    alt = undefined,
    hasRetina = false,
    hasWebp = true,
    class: className = ''
  }: Props = $props();


  // if has darkUrl - wait for client to determinate which picture to load
  let clientReady = $state(false);
  let isVisible = $derived(!urlDark || clientReady);
  let isDarkMode = $state(false);

  const onSchemeChanged = (e: EventSchemeChanged) => {
    isDarkMode = e.detail.isDark;
  };

  if (browser) {
    isDarkMode = isEnabledDarkScheme();
    document.documentElement.addEventListener(EventSchemeChangedName, onSchemeChanged);
    clientReady = true;
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
  }> = $derived.by(() => {
    const [[baseUrl, baseUrlExt], [baseDarkUrl, baseDarkUrlExt]] = [url, urlDark].map((curUrl) => {
      const parts = curUrl?.replace(REPLACE_REGEXP, '/g/').split('.') ?? [];
      return [parts.slice(0, -1).join('.'), parts[parts.length - 1]];
    });

    return [
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
  });

  let isPrint = $derived(browser ? window.matchMedia('print').matches : false);
  let imgBaseUrl = $derived.by(() => {
    const [baseUrl, baseDarkUrl] = [url, urlDark].map((curUrl) => curUrl?.replace(REPLACE_REGEXP, '/g/').split('.').slice(0, -1).join('.') ?? '');
    return isDarkMode && !isPrint ? baseDarkUrl || baseUrl : baseUrl;
  });
  let imgBaseUrlExt = $derived.by(() => {
    const [baseUrlExt, baseDarkUrlExt] = [url, urlDark].map((curUrl) => curUrl?.split('.').at(-1) ?? '');
    return isDarkMode && !isPrint ? baseDarkUrlExt || baseUrlExt : baseUrlExt;
  });
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

<script lang="ts">
  import config from '../../config';
  import siteConfig from '../../data/config.json';

  export let pageTitle = '';
  export let isPageTitleFull = false;
  export let slug: string;
  export let pageType = 'WebSite';
  export let pageDescription = siteConfig.description;
  export let logoSrc: string = siteConfig.logo;
  export let pageAdditionalData: Record<string, string | number | boolean> | undefined = undefined;

  const defaultPageTitle = pageTitle ? `${pageTitle} - ${siteConfig.siteName}` : siteConfig.siteName;

  $: pageTitle = isPageTitleFull ? pageTitle : defaultPageTitle;
  $: url = new URL(slug, config.baseUrl).toString();
  $: logoUrl = new URL(logoSrc, config.baseUrl).toString();

  const getLdJson = () => ({
    '@context': 'https://schema.org',
    '@type': pageType,
    author: {
      '@type': 'Person',
      name: siteConfig.siteName,
      url: config.baseUrl,
      logo: new URL(siteConfig.logo, config.baseUrl).toString()
    },
    url,
    image: logoUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': config.baseUrl
    },
    description: pageDescription,
    ...pageAdditionalData
  });

  // eslint-disable-next-line no-useless-escape
  const getLdJsonString = () => `<script type="application/ld+json">${JSON.stringify(getLdJson())}<\/script>`;
</script>

<svelte:head>
  <link rel="canonical" href={config.baseUrl} />

  <meta name="og:site_name" content={siteConfig.siteName} />
  <meta name="og:type" content="website" />
  <meta name="og:title" content={pageTitle} />
  <meta name="og:description" content={pageDescription} />
  <meta name="og:url" content={url} />
  <meta name="og:image" content={logoSrc} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:image" content={logoSrc} />
  <meta name="twitter:site" content={siteConfig.twitterAccount} />

  {@html getLdJsonString()}

  <title>{pageTitle}</title>
  <link rel="alternate" type="application/rss+xml" title={siteConfig.siteName} href={`${config.baseUrl}/rss/`} />
</svelte:head>

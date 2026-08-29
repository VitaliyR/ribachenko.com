<script lang="ts">
  import config from '../../config';
  import siteConfig from '../../data/config.json';

  interface Props {
    pageTitle?: string;
    isPageTitleFull?: boolean;
    slug: string;
    pageType?: string;
    pageDescription?: any;
    logoSrc?: string;
    pageAdditionalData?: Record<string, string | number | boolean> | undefined;
  }

  let {
    pageTitle = '',
    isPageTitleFull = false,
    slug,
    pageType = 'WebSite',
    pageDescription = siteConfig.description,
    logoSrc = siteConfig.logo,
    pageAdditionalData = undefined
  }: Props = $props();

  let finalPageTitle = $derived.by(() => {
    if (isPageTitleFull) return pageTitle;
    return pageTitle ? `${pageTitle} - ${siteConfig.siteName}` : siteConfig.siteName;
  });
  let url = $derived(new URL(slug, config.baseUrl).toString());
  let logoUrl = $derived(new URL(logoSrc, config.baseUrl).toString());

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
      '@id': url
    },
    description: pageDescription,
    ...pageAdditionalData
  });

  // eslint-disable-next-line no-useless-escape
  const getLdJsonString = () => `<script type="application/ld+json">${JSON.stringify(getLdJson())}<\/script>`;
</script>

<svelte:head>
  <link rel="canonical" href={url} />

  <meta name="og:site_name" content={siteConfig.siteName} />
  <meta name="og:type" content="website" />
  <meta name="og:title" content={finalPageTitle} />
  <meta name="og:description" content={pageDescription} />
  <meta name="og:url" content={url} />
  <meta name="og:image" content={logoSrc} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={finalPageTitle} />
  <meta name="twitter:description" content={pageDescription} />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:image" content={logoSrc} />
  <meta name="twitter:site" content={siteConfig.twitterAccount} />

  {@html getLdJsonString()}

  <title>{finalPageTitle}</title>
  <link rel="alternate" type="application/rss+xml" title={siteConfig.siteName} href={`${config.baseUrl}/rss/`} />
</svelte:head>

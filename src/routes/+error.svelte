<script lang="ts">
  import frontmatter from 'front-matter';
  import { page } from '$app/state';
  import Layout from '../components/layouts/index.svelte';
  import { parseMarkdown } from '$lib/md-utils';
  import notFoundSource from '../data/404.md?raw';
  import type { PageLayoutData } from '../models/types';

  const notFound = frontmatter<PageLayoutData>(notFoundSource);

  let isNotFound = $derived(page.status === 404);

  let data = $derived(isNotFound
    ? notFound.attributes
    : {
        layout: 'PageLayout',
        components: [{ type: 'TextSection' as const, text: `${page.status}. ${page.error?.message ?? 'Something went wrong'}.` }]
      });

  let body = $derived(isNotFound ? parseMarkdown(notFound.body) : '');
</script>

<Layout layout={data.layout ?? 'PageLayout'} {data} {body} slug={page.url.pathname} />

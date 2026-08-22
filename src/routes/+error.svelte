<script lang="ts">
  import frontmatter from 'front-matter';
  import { page } from '$app/stores';
  import Layout from '../components/layouts/index.svelte';
  import { parseMarkdown } from '$lib/md-utils';
  import notFoundSource from '../data/404.md?raw';
  import type { PageLayoutData } from '../models/types';

  const notFound = frontmatter<PageLayoutData>(notFoundSource);

  $: isNotFound = $page.status === 404;

  $: data = isNotFound
    ? notFound.attributes
    : {
        layout: 'PageLayout',
        components: [{ type: 'TextSection', text: `${$page.status}. ${$page.error?.message ?? 'Something went wrong'}.` }]
      };

  $: body = isNotFound ? parseMarkdown(notFound.body) : '';
</script>

<Layout layout={data.layout} {data} {body} slug={$page.url.pathname} />

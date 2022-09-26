<script lang="ts">
  import { getContext } from 'svelte';
  import { META_CONTEXT, type MetaContext } from '$lib/context';
  import CardsListSection from './CardsListSection.svelte';
  import type { BaseComponent } from '../atoms/Component.svelte';

  export let hasBorder = false;
  export let title: string;
  export let titleSlot: BaseComponent | undefined = undefined;

  const meta = getContext(META_CONTEXT) as MetaContext;
  const cards = Object.keys(meta.pages)
    .filter((pagePath) => meta.pages[pagePath].attributes.published)
    .map((pagePath) => {
      const page = meta.pages[pagePath];
      const slug = pagePath.split('.').slice(0, -1).join('.');
      const cleanContent = page.body.replace(/<\/?.+?>/gm, '').trim();
      return {
        title: page.attributes.title,
        description: `${cleanContent.slice(0, 120)}...`,
        href: `/${slug}`,
        image: page.attributes.image,
        date: page.attributes.published_at
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
</script>

<CardsListSection {hasBorder} {title} {cards} {titleSlot} />

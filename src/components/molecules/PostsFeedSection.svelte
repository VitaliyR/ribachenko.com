<script lang="ts">
  import CardsListSection from './CardsListSection.svelte';
  import type { BaseComponent } from '../atoms/Component.svelte';
  import { metaStore } from '../../lib/stores';

  export let hasBorder = false;
  export let title: string;
  export let titleSlot: BaseComponent | undefined = undefined;

  const pages = $metaStore.pages;
  const cards = Object.keys(pages)
    .filter((pagePath) => pages[pagePath].attributes.published)
    .map((pagePath) => {
      const page = pages[pagePath];
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

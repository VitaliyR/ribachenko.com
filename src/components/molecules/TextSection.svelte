<script lang="ts">
  import { parseMarkdown } from '../../lib/md-utils';
  import type { BaseComponent } from '../atoms/Component.svelte';
  import Section from '../molecules/Section.svelte';

  interface Props {
    text: string;
    hasBorder?: boolean;
    title?: string | undefined;
    titleSlot?: BaseComponent | undefined;
  }

  let {
    text,
    hasBorder = false,
    title = undefined,
    titleSlot = undefined
  }: Props = $props();
</script>

<Section {hasBorder} {title} {titleSlot} class="links-print-url">
  {@html parseMarkdown(text)}
</Section>

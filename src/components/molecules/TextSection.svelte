<script lang="ts">
  import { parseMarkdown } from '../../lib/md-utils';
  import type { BaseComponent } from '../atoms/Component.svelte';
  import Section from '../molecules/Section.svelte';

  export let text: string;
  export let hasBorder = false;
  export let title: string | undefined = undefined;
  export let titleSlot: BaseComponent | undefined = undefined;
</script>

<Section {hasBorder} {title} {titleSlot} class="links-print-url">
  {@html parseMarkdown(text)}
</Section>

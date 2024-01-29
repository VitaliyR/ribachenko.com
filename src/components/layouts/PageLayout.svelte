<script lang="ts">
  import classNames from 'classnames';
  import LandingHeader from '../molecules/LandingHeader.svelte';
  import Component from '../atoms/Component.svelte';
  import SEO from '../atoms/SEO.svelte';
  import type { PageLayoutData } from '../../models/types';
  import { rehighlightCode } from '$lib/md-utils';
  import { afterUpdate } from 'svelte';

  let className = '';

  export { className as class };
  export let slug: string;
  export let data: PageLayoutData;
  export let body: string;
  export let addBodyPadding = false;

  afterUpdate(() => {
    rehighlightCode();
  });
</script>

<SEO {slug} />
<div class={classNames('page', className)}>
  <LandingHeader />
  <main class="main-container">
    {#each data.components ?? [] as component}
      <Component {...component} />
    {/each}
    <slot name="header" />
    <div class="content" class:content--padding={addBodyPadding}>
      {@html body}
    </div>
    <slot name="footer" />
    <div class="u-show-tablet footer">
      © {new Date().getFullYear()}
    </div>
  </main>
</div>

<style lang="scss">
  .main-container {
    margin-left: 35%;
    max-width: 1000px;
    padding: calc(var(--space) * 6);

    @media (--tablet), print {
      margin: 0;
      max-width: none;
      padding: calc(var(--space) * 3);
    }

    @media print {
      padding: 0 calc(var(--space) * 6);
    }
  }

  .content {
    &--padding {
      padding: 0 calc(var(--space) * 4);

      @media (--phone) {
        padding: 0;
      }
    }
  }

  .footer {
    text-align: center;
    font: var(--typography-body-xsmall);

    @media print {
      display: none;
    }
  }
</style>

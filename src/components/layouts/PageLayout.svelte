<script lang="ts">
  import classNames from 'classnames';
  import LandingHeader from '../molecules/LandingHeader.svelte';
  import Component from '../atoms/Component.svelte';
  import SEO from '../atoms/SEO.svelte';
  import { rehighlightCode } from '$lib/utils';
  import { afterUpdate } from 'svelte';

  let className = '';

  export { className as class };
  export let slug: string;
  export let data: any;
  export let body: string;
  export let addBodyPadding = false;

  afterUpdate(() => {
    rehighlightCode();
  });
</script>

<SEO {slug} />
<div class={classNames('page', className)}>
  <LandingHeader />
  <div class="main-container">
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
  </div>
</div>

<style lang="scss">
  .main-container {
    margin-left: 35%;
    max-width: 1000px;
    padding: calc(var(--space) * 6);

    @media (--tablet) {
      margin: 0;
      max-width: none;
      padding: calc(var(--space) * 3);
    }
  }

  .content {
    &--padding {
      padding: 0 calc(var(--space) * 4);
    }
  }

  .footer {
    text-align: center;
    font: var(--typography-body-xsmall);
  }
</style>

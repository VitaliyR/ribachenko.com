<script lang="ts">
  import { toPairs } from 'lodash-es';
  import { browser } from '$app/environment';
  import { getContext } from 'svelte';
  import dayjs from 'dayjs';
  import { META_CONTEXT, type MetaContext } from '$lib/context';
  import { getPostDescription } from '$lib/utils';
  import type { Page, Post } from '../../models/types';
  import PageLayout from './PageLayout.svelte';
  import Icon from '../atoms/Icon.svelte';
  import config from '../../config';
  import Picture from '../atoms/Picture.svelte';

  export let slug: string;
  export let data: Post;
  export let body: string;

  const modifiedData = {
    ...data,
    components: []
  };

  let nextPrevPosts: Array<[string, Page]> = [];
  let shareText: string;
  let postUrl: string;

  const meta = getContext(META_CONTEXT) as MetaContext;

  $: {
    const posts = toPairs(meta.pages)
      .filter((obj) => obj[0].startsWith('posts/'))
      .sort((a, b) => b[1].attributes.published_at.getTime() - a[1].attributes.published_at.getTime());
    const postIndex = posts.findIndex((obj) => obj[0] === `${slug}.md`);
    const nextPost = posts[postIndex + 1];
    const prevPost = posts[postIndex - 1];
    nextPrevPosts = [nextPost, prevPost].filter(Boolean);
    shareText = encodeURIComponent(data.title);
    postUrl = new URL(`/${slug}`, config.baseUrl).toString();
  }

  const shareArticle = () => {
    navigator.share({
      title: document.title,
      url: window.location.href
    });
  };
</script>

<PageLayout {slug} {body} data={modifiedData} class="post-page" addBodyPadding>
  <div slot="header">
    <div class="header-container">
      <h2 class="title">{data.title}</h2>
      <section class="meta-container">
        <time datetime={data.published_at.toString()}>
          {dayjs(data.published_at).format('DD MMMM YYYY')}
        </time>
        on
        <div class="tags-container">
          {#each data.tags as tag}
            <span>{tag.name}</span>
          {/each}
        </div>
      </section>
    </div>
    {#if data.image}
      <a href={data.image} target="_blank">
        <Picture url={data.image} alt={`Feature image of ${data.title}`} class="post-image" />
      </a>
    {/if}
  </div>
  <div slot="footer">
    <footer class="footer">
      <section>
        {#if browser && typeof navigator.share === 'function'}
          <button class="link link--plain button share-button" on:click={shareArticle}>
            <Icon icon="share" />
          </button>
        {:else}
          <a
            class="link link--plain"
            target="_blank"
            href={`https://twitter.com/share?text=${shareText}&url=${postUrl}`}
            rel="noreferrer noopener"
            aria-label="Share this article via Twitter"
          >
            <Icon icon="twitter" />
          </a>
          <a
            class="link link--plain"
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
            rel="noreferrer noopener"
            aria-label="Share this article via Facebook"
          >
            <Icon icon="facebook" />
          </a>
        {/if}
      </section>
    </footer>
    <aside class="next-prev-container">
      {#each nextPrevPosts as post, index}
        <a class="next-prev-card link link--plain" class:next-prev-card--right={index === 1} href={`/${post[0].replace(/\.md$/, '')}`}>
          {#if post[1].attributes.image}
            <Picture class="next-prev-card-image" url={post[1].attributes.image} alt={`Feature image of ${post[1].attributes.title}`} />
            <span class="next-prev-card-direction">{index === 0 ? 'Older' : 'Newer'}</span>
            <h3 class="next-prev-card-title">{post[1].attributes.title}</h3>
            <p class="next-prev-card-description">{getPostDescription(post[1].body)}</p>
            <time class="next-prev-card-time" datetime={post[1].attributes.published_at}>{dayjs(post[1].attributes.published_at).format('DD MMM YY')}</time>
          {/if}
        </a>
      {/each}
    </aside>
  </div>
</PageLayout>

<style lang="scss">
  .header-container {
    padding: 0 calc(var(--space) * 4);

    @media (--tablet) {
      padding: 0;
    }
  }

  .title {
    font: var(--typography-title);
    color: var(--color-header);
    margin: 0 0 var(--space) 0;
  }

  .meta-container {
    font: var(--typography-body-small);
    margin-bottom: calc(var(--space) * 4);
  }

  .tags-container {
    display: inline-block;
    > *:not(:last-child)::after {
      content: ',';
      margin-right: calc(var(--space) / 2);
    }
  }

  :global(.post-page .content img) {
    margin: 0 auto;
    display: block;
  }

  :global(.post-image) {
    max-width: 100%;
  }

  .footer {
    display: flex;
    justify-content: center;
    border-top: 1px solid var(--color-tint);
    position: relative;
    margin: calc(var(--space) * 6) 0 0;

    section {
      --share-icon-size: 32px;

      background: var(--color-background);
      margin-top: calc(var(--share-icon-size) / -2);
    }

    a {
      margin: 0 var(--space);

      &:not(:hover) {
        color: var(--color-text-primary);
      }
    }

    :global(svg) {
      width: var(--share-icon-size);
      height: var(--share-icon-size);
    }

    .share-button {
      &:not(:hover) {
        color: var(--color-text-primary);
      }
    }
  }

  .next-prev-container {
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    margin: calc(var(--space) * 6) 0;

    @media (--phone) {
      flex-wrap: wrap;
    }
  }

  .next-prev-card {
    flex: 1 50%;
    max-width: 50%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border: 1px solid var(--color-tint);
    height: 250px;
    border-radius: var(--border-radius);
    position: relative;
    margin: 0 var(--space);
    background-size: cover;
    background-position: center 0;
    padding: calc(var(--space) * 2) calc(var(--space) * 3);
    text-decoration: none;

    @media (--big-phone) {
      height: auto;
    }

    @media (--phone) {
      max-width: none;
      margin: 0 0 calc(var(--space) * 2) 0;
      flex-basis: auto;
    }

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    :global(.next-prev-card-image) {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0.15;
    }

    &-direction {
      font: var(--typography-body-xsmall);
    }

    &-time {
      font: var(--typography-body-xsmall);
    }

    &--right &-direction,
    &--right &-time {
      text-align: right;
    }

    &-title {
      margin: 0;
      transition: color 0.2s ease;
    }

    &-description {
      font: var(--typography-body-small-tight);
    }

    &:not(:hover) {
      color: inherit;

      .next-prev-card-title {
        color: var(--color-header);
      }
    }
  }
</style>

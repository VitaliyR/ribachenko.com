<script lang="ts">
  import dayjs from 'dayjs';
  import { getContext } from 'svelte';
  import { MASTODON_CONTEXT, type MastodonContext } from '$lib/context';
  import Section from './Section.svelte';
  import type { BaseComponent } from '../atoms/Component.svelte';

  export let hasBorder = false;
  export let title: string;
  export let titleSlot: BaseComponent | undefined = undefined;
  export let limit: number | undefined = undefined;

  const mastodonContext = getContext(MASTODON_CONTEXT) as MastodonContext;
  const posts = limit ? mastodonContext.feed?.slice(0, limit) : mastodonContext.feed;
</script>

{#if posts}
<Section {hasBorder} {title} {titleSlot}>
  <div class="container">
  {#each posts as post}
    <div class="item" class:entire-line={post.reblog?.images.length ?? post.images.length}>
      <a href={post.reblog?.url ?? post.url} target="_blank" rel="noreferrer noopener" class="item-link">
        <div class="item-header">
          <div class="item-image-container" class:reblog={post.reblog}>
            {#if post.reblog}
            <img class="reblog-image" src={post.reblog.avatar} alt="Avatar of reblogged author" />
            {/if}
            <img class="item-image" class:reblog={post.reblog} src={post.avatar} alt="Avatar" />
          </div>
          <div class="item-name-container">
            <div class="item-name">{post.reblog?.displayName ?? post.displayName}</div>
            <div>@{post.reblog?.username ?? post.username}</div>
          </div>
          <div class="item-date">
            {dayjs(post.createdAt).format('DD MMM YY')}
          </div>
        </div>
      </a>
      <div class="item-contents-container" class:entire-line={post.reblog?.images.length ?? post.images.length}>
        <div class="item-content">
          {@html post.reblog?.content ?? post.content}
        </div>
        {#if post.reblog?.images ?? post.images}
        <div class="item-attachment-container">
          {#each post.reblog?.images ?? post.images as url}
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img class="item-attachment-image" src={url} alt="Post" />
          </a>
          {/each}
        </div>
        {/if}
      </div>
    </div>
  {/each}
  </div>
</Section>
{/if}

<style lang="scss">
  .container {
    margin: calc(var(--space) * 3) 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: calc(var(--space) * 8) calc(var(--space) * 5);

    @media (--phone) {
      grid-template-columns: 1fr;
    }
  }

  .item {
    display: flex;
    flex-flow: column nowrap;

    &.entire-line {
      grid-column: 1 / -1;
    }
  }

  .item-link {
    text-decoration: none;
    color: unset;
  }

  .item-header {
    display: flex;
    text-decoration: none;
    gap: var(--space);
  }

  .item-image-container {
    display: flex;
    position: relative;

    &.reblog {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }

  .item-image {
    width: 45px;
    height: 45px;
    border-radius: var(--border-radius);

    &.reblog {
      width: 24px;
      height: 24px;
      position: absolute;
      right: -8px;
      bottom: -8px;
    }
  }

  .reblog-image {
    width: 36px;
    height: 36px;
    border-radius: var(--border-radius);
  }

  .item-name-container {
    display: flex;
    flex-flow: column nowrap;
    line-height: 1;
    justify-content: center;
  }

  .item-name {
    margin-bottom: var(--space);
    color: var(--color-text-accent);
  }

  .item-date {
    margin-left: auto;
    line-height: 1;
    margin-top: calc(var(--space) / 2);
    white-space: nowrap;
  }

  .item-contents-container {
    display: flex;
    flex-flow: column nowrap;

    &.entire-line {
      flex-flow: row nowrap;
      justify-content: space-between;
    }
  }

  .item-content {
    margin-top: var(--space);

    :global(p) {
      margin: 0;
    }

    :global(a) {
      color: unset;
      line-break: anywhere;
    }
  }

  .item-attachment-container {
    margin-top: var(--space);
    display: flex;
    gap: calc(var(--space) * 4);
  }

  .item-attachment-image {
    width: 128px;
    height: 128px;
    object-fit: cover;
  }
</style>

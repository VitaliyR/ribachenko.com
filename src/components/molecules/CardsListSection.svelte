<script context="module" lang="ts">
  export type Card = {
    title: string;
    description: string;
    href: string;
    image: string;
    imageDark?: string;
    date?: Date;
    hidden?: boolean;
  };
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import type { BaseComponent } from '../atoms/Component.svelte';
  import Picture from '../atoms/Picture.svelte';
  import Section from './Section.svelte';

  export let hasBorder = false;
  export let title: string;
  export let cards: Card[];
  export let titleSlot: BaseComponent | undefined = undefined;
</script>

<Section {hasBorder} {title} {titleSlot}>
  <ul class="items">
    {#each cards as card}
      {#if !card.hidden}
      <li class="item">
        <a
          target={card.href.startsWith('/') ? undefined : '_blank'}
          rel={card.href.startsWith('/') ? undefined : 'noreferrer noopener'}
          href={card.href}
          class="wrapper"
        >
          <article class="item-container">
            <div class="image-container" data-text="View">
              <Picture alt={card.title} url={card.image} urlDark={card.imageDark} class="image" />
            </div>
            <div class="header">
              <h3>{card.title}</h3>
              {#if card.date}
                <span class="date">{dayjs(card.date).format('DD MMM YY')}</span>
              {/if}
            </div>
            <p class="description">{card.description}</p>
          </article>
        </a>
      </li>
      {/if}
    {/each}
  </ul>
</Section>

<style lang="scss">
  .items {
    padding: 0;
    gap: calc(var(--space) * 5);
    display: grid;
    grid-template-columns: 1fr 1fr;

    @media (--phone) {
      grid-template-columns: 1fr;
      margin-bottom: var(--space);
    }

    @media print {
      display: block;
      margin-bottom: var(--space);
    }
  }

  .item-container {
    @media print {
      display: grid;
      grid-template:
        'title title'
        'image description';
      grid-template-columns: 1fr 1fr;
      margin-bottom: calc(var(--space) * 2);
    }
  }

  .item {
    display: block;
    vertical-align: top;

    :global(.image) {
      width: 100%;
      object-fit: cover;
    }
  }

  .wrapper {
    position: relative;
    text-decoration: none;
    color: inherit;
    display: inline-block;
    width: 100%;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    grid-area: title;

    h3 {
      margin: 0;
    }

    @media print {
      text-align: center;
      margin-bottom: calc(var(--space) * 2);
    }
  }

  .date {
    flex-shrink: 0;
    margin-left: var(--space);
  }

  .image-container {
    position: relative;
    border-radius: var(--border-radius);
    overflow: hidden;
    font-size: 0;
    justify-content: center;
    margin-bottom: var(--space);
    min-height: 170px;
    display: flex;
    flex-flow: column;
    grid-area: image;

    @media print {
      min-height: unset;
    }

    &::before {
      content: '';
      border-radius: var(--border-radius);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);

      @media print {
        display: none;
      }
    }

    &::after {
      content: attr(data-text);
      position: absolute;
      display: block;
      align-self: center;
      font: var(--typography-body-xsmall);
      color: var(--color-white);
      border: 3px solid hsla(0, 0%, 100%, 0.5);
      border-radius: var(--border-radius);
      padding: 0.25rem 1rem;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);

      @media print {
        display: none;
      }
    }

    &::before,
    &::after {
      opacity: 0;
      will-change: opacity;
      transition: opacity 0.2s ease-in-out;
    }
  }

  .wrapper:hover .image-container {
    &::before,
    &::after {
      opacity: 1;
    }
  }

  .description {
    font: var(--typography-body-small);
    grid-area: description;

    @media print {
      margin-left: calc(var(--space) * 2);
      align-self: center;
    }
  }
</style>

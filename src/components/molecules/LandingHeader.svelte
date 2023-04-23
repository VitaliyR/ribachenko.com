<script lang="ts">
  import Icon from '../atoms/Icon.svelte';
  import Picture from '../atoms/Picture.svelte';
  import ThemeButton from '../atoms/ThemeButton.svelte';
  import siteConfig from '../../data/config.json';

  let isMapShown = false;

  const hideMap = () => {
    isMapShown = false;
  };
</script>

<svelte:window on:scroll={hideMap} />

<header class="header" class:header--show-map={isMapShown} on:mouseleave={hideMap}>
  <div class="header__top">
    <div>
      <a class="header__avatar-container link link--plain" href={siteConfig.logo} target="_blank" rel="noreferrer">
        <Picture class="header__avatar" url={siteConfig.logo} alt={siteConfig.siteName} />
      </a>
    </div>
    <h1 class="header__title">
      <a class="header__title-link link link--plain" href="/">{siteConfig.siteName}</a>
    </h1>
    <p class="header__description">{siteConfig.about}</p>
  </div>
  <div class="header__middle">
    <div class="header__place">
      <button
        class="header__place-button button link link--plain"
        type="button"
        on:click={() => {
          isMapShown = !isMapShown;
        }}
        on:blur={hideMap}
      >
        <span class="header__place-icon">
          <Icon icon="pin" />
        </span>
        <span>{siteConfig.currentPlace.city}, {siteConfig.currentPlace.country}</span>
      </button>
    </div>
  </div>
  <div class="header__bottom">
    <ul class="header__links">
      {#each siteConfig.socials as social}
        <li class="header__links-item">
          <a class="link link--plain link--ic" href={social.url} target="_blank" aria-label={`${social.name} logo`} rel={social.rel ?? 'noreferrer noopener'}>
            <Icon class="header__link-icon" icon={social.icon} />
          </a>
        </li>
      {/each}
    </ul>
    <div class="u-hide-tablet">
      <div class="header__footer">
        <p class="header__footer-legal">© {new Date().getFullYear()}</p>
      </div>
    </div>
    <div class="header__day-night link link--plain link--ic">
      <ThemeButton />
    </div>
  </div>
</header>

<style lang="scss">
  .header {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    padding: calc(var(--space) * 6);
    min-height: 100vh;
    overflow: hidden;
    position: fixed;
    width: 35%;
    text-align: right;
    height: 100%;

    @media (--laptop) {
      padding: calc(var(--space) * 6) calc(var(--space) * 4);
    }

    @media (--tablet) {
      position: relative;
      width: auto;
      align-items: center;
      text-align: center;
      min-height: auto;
    }

    @media print {
      padding: 0;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      z-index: -1;
      right: 0;
      top: 0;
      bottom: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      transition: 0.2s filter ease-in-out, 0.2s opacity ease-in-out;
      will-change: filter, opacity;
      opacity: 0.2;
      background-image: url(/g/lightMap.png);

      @supports (filter: blur(1px)) {
        filter: blur(8px);
        opacity: 1;
      }

      :global(.scheme-dark) & {
        background-image: url(/g/darkMap.png);
      }
    }

    &__top {
      display: flex;
      flex-flow: column nowrap;
    }

    &__top,
    &__middle,
    &__bottom {
      transition: 0.2s opacity ease-in-out;
      will-change: transition;
    }

    &__bottom {
      @media (--tablet) {
        margin-top: calc(var(--space) * 2);
      }

      @media print {
        display: none;
      }
    }

    &__avatar-container {
      margin-bottom: calc(var(--space) * 2);
      display: inline-block;
    }

    :global(.header__avatar) {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      align-self: flex-end;
      transition: box-shadow 0.2s ease-in-out;
      will-change: box-shadow;
      display: inline-block;

      &:hover {
        box-shadow: 0 0 0 7px var(--color-accent-light);
      }
    }

    &__title {
      font: var(--typography-title-l);
      color: var(--color-text-accent);
      margin: 0;

      @media (--laptop) {
        font: var(--typography-title);
      }
    }

    &__title-link {
      &:not(:hover) {
        color: inherit;
      }
    }

    &__description {
      margin: 0;
      font: var(--typography-title-thin);

      @media (--laptop) {
        font: var(--typography-title-thin-s);
      }
    }

    &__middle {
      flex: 1;
    }

    &__place {
      margin: calc(var(--space) * 2) 0 var(--space);

      @media (--tablet) {
        margin-left: 0;
      }
    }

    &__place-icon {
      width: 24px;
      height: 24px;
      margin-left: auto;
      vertical-align: middle;
      display: inline-block;
      margin-right: calc(var(--space) / 2);
    }

    &__place-button {
      background: none;
      font: inherit;
      vertical-align: middle;
      display: inline-flex;
      align-items: center;

      &:not(:hover) {
        color: var(--color-text-primary);
      }
    }

    &__links {
      list-style: none;
      margin: 0 0 var(--space);
      padding: 0;
      align-self: flex-end;
      pointer-events: auto;

      @media (--tablet) {
        margin-bottom: 0;
      }

      &-item {
        display: inline-block;
        margin: 0 var(--space);
      }

      :global(.header__link-icon) {
        width: 24px;
        height: 24px;
      }
    }

    &__footer-legal {
      text-align: right;
      font: var(--typography-body-small);
    }

    &__day-night {
      position: absolute;
      left: calc(var(--space) * 2);
      bottom: calc(var(--space) * 2);
      opacity: 0.5;
      will-change: opacity, fill;
      transition: opacity 0.5s ease-in-out, fill 0.2s ease-in-out;

      :global(.button) {
        width: 24px;
        height: 24px;
        color: var(--color-text-accent);
      }

      &:hover {
        opacity: 1;
      }

      @media (--tablet) {
        right: calc(var(--space) * 2);
        top: calc(var(--space) * 2);
        left: auto;
        bottom: auto;
      }
    }

    &--show-map {
      > * {
        opacity: 0;
      }

      &::before {
        filter: none;
        opacity: 1;
      }
    }
  }

  :global(.supports-web-p .header::before) {
    background-image: url(/g/lightMap.webp);

    :global(.scheme-dark) & {
      background-image: url(/g/darkMap.webp);
    }
  }
</style>

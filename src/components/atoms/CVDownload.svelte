<script lang="ts">
  import Icon from './Icon.svelte';
  import Link from './Link.svelte';

  export let pdfUrl: string | undefined = undefined;
  export let isVertical = false;
  export let name: string | undefined = undefined;

  let printIframe: HTMLIFrameElement | undefined;

  const printPdf = () => {
    try {
      setTimeout(() => {
        printIframe?.focus();
        printIframe?.contentWindow?.print();
      }, 1);
    } catch (e) {
      window.open(pdfUrl, '_blank');
    }
  };

  const print = () => {
    if (printIframe) {
      printPdf();
    } else if (pdfUrl) {
      printIframe = document.createElement('iframe');
      printIframe.setAttribute('src', pdfUrl);
      printIframe.setAttribute('class', 'u-hidden');
      printIframe.onload = printPdf;
      printIframe.onerror = printPdf;
      document.body.appendChild(printIframe);
    }
  };
</script>

<div class="container" class:container--vertical={isVertical}>
  <button type="button" class="button" on:click={print}>
    <Icon icon="print" />
    Print
  </button>
  {#if pdfUrl}
    <Link url={pdfUrl} class="button" icon="download" title="Download" download={[name || '', 'CV.pdf'].join(' ')} />
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: row nowrap;

    @media print {
      display: none;
    }

    :global(.button) {
      background: var(--color-accent);
      color: var(--color-white);
      padding: 0.5rem;
      text-align: center;
      will-change: background;
      transition: background 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      font: var(--typography-body-cv);
      min-width: 160px;
      border: 0;
      margin-right: var(--space);

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background: var(--color-accent-light);
      }
    }

    :global(.button svg) {
      width: 24px;
      height: 24px;
      margin-right: var(--space);
    }

    &--vertical {
      flex-flow: column nowrap;
    }

    &--vertical :global(.button) {
      margin-right: 0;
      margin-bottom: var(--space);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>

<script lang="ts">
  import { closable } from '../../actions/closable';
  import { tip } from '../../actions/tip';
  import Icon from './Icon.svelte';
  import Link from './Link.svelte';
  import Tooltip from './Tooltip.svelte';

  export let pdf: {
    label: string;
    url: string;
    description?: string;
  }[] = [];
  export let isVertical = false;
  export let name: string | undefined = undefined;

  let printButton: HTMLButtonElement;
  let downloadButton: HTMLButtonElement;
  let isPrintDropdownVisible = false;
  let isDownloadDropdownVisible = false;
  let printIframe: HTMLIFrameElement | undefined;

  const printPdf = (pdfUrl: string) => {
    try {
      setTimeout(() => {
        printIframe?.focus();
        printIframe?.contentWindow?.print();
      }, 1);
    } catch (e) {
      window.open(pdfUrl, '_blank');
    }
  };

  const print = (pdfUrl: string) => {
    isPrintDropdownVisible = false;

    if (!printIframe) {
      printIframe = document.createElement('iframe');
      printIframe.setAttribute('class', 'u-hidden');
      document.body.appendChild(printIframe);
    }

    printIframe.setAttribute('src', pdfUrl);
    printIframe.onload = () => printPdf(pdfUrl);
    printIframe.onerror = () => printPdf(pdfUrl);
  };

  const onPrintClicked = () => {
    if (pdf.length === 1) {
      print(pdf[0].url);
    } else if (pdf.length > 0) {
      isPrintDropdownVisible = !isPrintDropdownVisible;
    }
  };
</script>

<div class="container" class:container--vertical={isVertical}>
  {#if pdf.length > 0}
    <button type="button" class="button" on:click={onPrintClicked} bind:this={printButton}>
      <Icon icon="print" />
      Print
    </button>
  {/if}
  {#if isPrintDropdownVisible && pdf.length > 0}
    <Tooltip targetElement={printButton} placement="bottom" sameWidth>
      <div class="buttons-tooltip" use:closable={{ skip: [printButton] }} on:close={() => (isPrintDropdownVisible = false)}>
        {#each pdf as file}
          <button type="button" class="button button-secondary" on:click={() => print(file.url)} use:tip={file.description ?? ''}>
            {file.label}
          </button>
        {/each}
      </div>
    </Tooltip>
  {/if}

  {#if pdf.length === 1}
    <Link url={pdf[0].url} class="button" icon="download" title="Download" download={[name || '', 'CV.pdf'].join(' ')} />
  {:else if pdf.length > 1}
    <button type="button" class="button" on:click={() => (isDownloadDropdownVisible = !isDownloadDropdownVisible)} bind:this={downloadButton}>
      <Icon icon="download" />
      Download
    </button>
    {#if isDownloadDropdownVisible}
      <Tooltip targetElement={downloadButton} placement="bottom" sameWidth>
        <div class="buttons-tooltip" use:closable={{ skip: [downloadButton] }} on:close={() => (isDownloadDropdownVisible = false)}>
          {#each pdf as file}
            <Link
              url={file.url}
              class="button button-secondary"
              title={file.label}
              download={[name || '', 'CV.pdf'].join(' ')}
              tip={file.description ?? ''}
              on:click={() => (isDownloadDropdownVisible = !isDownloadDropdownVisible)}
            />
          {/each}
        </div>
      </Tooltip>
    {/if}
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-flow: row nowrap;
    gap: var(--space);

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
      gap: var(--space);

      &:hover {
        background: var(--color-accent-light);
      }
    }

    :global(.button svg) {
      width: 24px;
      height: 24px;
    }

    &--vertical {
      flex-flow: column nowrap;
    }

    :global(.button-secondary) {
      background: transparent;
      border: 1px solid var(--color-text-accent);
      color: var(--color-text-primary);
    }
  }

  .buttons-tooltip {
    background: var(--color-background);
    padding: var(--space);
    display: flex;
    flex-flow: column nowrap;
    gap: var(--space);
  }
</style>

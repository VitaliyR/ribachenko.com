export function closable(element: HTMLElement, { skip }: { skip?: HTMLElement[] } = {}) {
  const onClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!element.contains(target)) {
      const shouldSkip = skip?.some((el) => el.contains(target));
      if (shouldSkip) {
        return;
      }
      const event = new CustomEvent('close');
      element.dispatchEvent(event);
    }
  };

  element.getRootNode().addEventListener('click', onClick, true);

  return {
    destroy() {
      element.getRootNode().removeEventListener('click', onClick, true);
    }
  };
}

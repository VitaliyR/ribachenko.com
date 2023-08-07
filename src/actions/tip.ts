import Tip from '../components/molecules/Tip.svelte';

export function tip(element: HTMLElement, title: string) {
  let tipComponent: Tip | undefined;

  const show = () => {
    if (title) {
      if (tipComponent) {
        tipComponent.$$set({
          targetElement: element,
          title: title
        });
      } else {
        tipComponent = new Tip({
          props: {
            targetElement: element,
            title: title
          },
          target: document.body
        });
      }
    } else {
      hide();
    }
  };

  const hide = () => {
    tipComponent?.$destroy();
    tipComponent = undefined;
  };

  element.addEventListener('mouseenter', show);
  element.addEventListener('mouseleave', hide);

  return {
    destroy() {
      element.removeEventListener('mouseenter', show);
      element.removeEventListener('mouseleave', hide);
      tipComponent?.$destroy();
    }
  };
}

import Tip from '../components/molecules/Tip.svelte';
import { mount, unmount } from 'svelte';

export function tip(element: HTMLElement, title: string) {
  let tipComponent: ReturnType<typeof mount> | undefined;
  let currentTitle = title;
  let destroyed = false;

  const show = () => {
    if (destroyed) return;

    if (currentTitle) {
      if (!tipComponent) {
        tipComponent = mount(Tip, {
          props: {
            targetElement: element,
            title: currentTitle
          },
          target: document.body
        });
      }
    } else {
      hide();
    }
  };

  const hide = () => {
    const component = tipComponent;
    tipComponent = undefined;
    if (component) void unmount(component);
  };

  element.addEventListener('mouseenter', show);
  element.addEventListener('mouseleave', hide);

  return {
    update(nextTitle: string) {
      if (nextTitle === currentTitle) return;
      currentTitle = nextTitle;
      if (tipComponent) {
        hide();
        show();
      }
    },
    destroy() {
      destroyed = true;
      element.removeEventListener('mouseenter', show);
      element.removeEventListener('mouseleave', hide);
      hide();
    }
  };
}

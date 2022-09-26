export const EventSchemeChangedName = 'schemeChanged';

export type EventSchemeChangedDetail = {
  isDark: boolean;
};

export type EventSchemeChanged = CustomEvent<EventSchemeChangedDetail>;

declare global {
  interface HTMLElementEventMap {
    [EventSchemeChangedName]: EventSchemeChanged;
  }
}

export const isEnabledDarkScheme = () => {
  const prefersDarkScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const switchValue = window.localStorage.getItem('isDarkScheme');
  return switchValue ? switchValue === 'true' : prefersDarkScheme;
};

export const toggleDarkScheme = (state: boolean) => {
  document.documentElement.classList.toggle('scheme-dark', state);
  localStorage.setItem('isDarkScheme', state.toString());

  const event = new CustomEvent(EventSchemeChangedName, {
    detail: {
      isDark: state
    }
  });
  document.documentElement.dispatchEvent(event);
};

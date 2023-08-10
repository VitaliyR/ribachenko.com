export const isSupportWebP = async () => {
  if (!window.createImageBitmap) return false;

  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then((r) => r.blob());

  return createImageBitmap(blob).then(
    () => true,
    () => false
  );
};

export const decodeHtmlCharacters = (str: string) => str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));

export const getPostDescription = (body: string, length = 80) =>
  `${body
    .replace(/<\/?.+?>/gm, '')
    .trim()
    .slice(0, length)}...`;

export const iOS = () =>
  ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
  // iPad on iOS 13 detection
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

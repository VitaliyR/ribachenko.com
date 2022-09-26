import { marked } from 'marked';
import Prism from 'prismjs';
import xss from 'xss';

import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-bash';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-language/prism-show-language';

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

const markedRenderer = new marked.Renderer();

markedRenderer.link = function (href, title, text) {
  const link = marked.Renderer.prototype.link.call(this, href, title, text);
  if (href?.startsWith('http')) {
    return link.replace('<a', `<a target="_blank" rel="noreferrer noopener"`);
  }
  return link;
};

marked.setOptions({
  renderer: markedRenderer,

  highlight(code, lang) {
    const finalLang = Prism.languages[lang] ? lang : 'js';
    const langDef = Prism.languages[finalLang];
    return Prism.highlight(code, langDef, finalLang);
  }
});

Prism.manual = true;

export const parseMarkdown = (markdown: string): string =>
  decodeHtmlCharacters(
    xss(marked(markdown, { breaks: true }), {
      whiteList: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore not defined in types but there
        ...xss.whiteList,
        a: ['rel', 'href', 'title', 'target'],
        code: ['class'],
        pre: ['class'],
        span: ['class']
      }
    })
      .replace(/<a/g, '<a class="link"')
      .replace(/<pre><code class="(language-(.+?))"/g, '<pre class="$1" data-language="$2"><code class="$1 line-numbers"')
  );

export const rehighlightCode = () => Prism.highlightAll();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toArray = async (asyncIterator: AsyncIterableIterator<any>): Promise<Array<any>> => {
  const arr = [];
  for await (const i of asyncIterator) {
    arr.push(i);
  }
  return arr;
};

export const getPostDescription = (body: string, length = 80) =>
  `${body
    .replace(/<\/?.+?>/gm, '')
    .trim()
    .slice(0, length)}...`;

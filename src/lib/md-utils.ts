import { marked } from 'marked';
import Prism from 'prismjs';
import xss from 'xss';
import { decodeHtmlCharacters } from './utils';

import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-bash';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-language/prism-show-language';

const markedRenderer = new marked.Renderer();

markedRenderer.link = function (token) {
  const link = marked.Renderer.prototype.link.call(this, token);
  if (token.href.startsWith('http') || token.href.match(/\.\w+$/)) {
    return link.replace('<a', `<a target="_blank" rel="noreferrer noopener"`);
  }
  return link;
};

marked.setOptions({
  renderer: markedRenderer
});

markedRenderer.code = function ({ text, lang }) {
  const finalLang = lang && Prism.languages[lang] ? lang : 'js';
  return `<pre><code class="language-${finalLang}">${Prism.highlight(text, Prism.languages[finalLang], finalLang)}</code></pre>`;
};

Prism.manual = true;

export const parseMarkdown = (markdown: string): string =>
  decodeHtmlCharacters(
    xss(marked.parse(markdown, { breaks: true, async: false }), {
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

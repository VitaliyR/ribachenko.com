import { pickBy, toPairs } from 'lodash-es';
import siteConfig from '../../data/config.json';
import config from '../../config';
import { getPostDescription } from '$lib/utils';
import { loadAllPages } from '$lib/get-pages';

export async function GET() {
  const pages = await loadAllPages();
  const posts = toPairs(pickBy(pages, (page, slug) => slug.startsWith('posts/')));
  posts.sort((a, b) => b[1].attributes.published_at.getTime() - a[1].attributes.published_at.getTime());

  const postsContent = posts
    .map(([slug, post]) =>
      `
    <item>
      <title><![CDATA[${post.attributes.title}]]></title>
      <description><![CDATA[${getPostDescription(post.body)}]]></description>
      <link>${new URL(slug, config.baseUrl).toString()}</link>
      <dc:creator><![CDATA[${siteConfig.siteName}]]></dc:creator>
      <pubDate>${post.attributes.published_at.toGMTString()}</pubDate>
      <content:encoded><![CDATA[${getPostDescription(post.body, 500)}]]></content:encoded>
    </item>
    `.trim()
    )
    .join('');

  const contents = `
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
    <channel>
      <title><![CDATA[${siteConfig.siteName}]]></title>
      <description><![CDATA[${siteConfig.description}]]></description>
      <link>${config.baseUrl}</link>
      <image>
        <url>${new URL(siteConfig.logo, config.baseUrl).toString()}</url>
        <title>${siteConfig.siteName}</title>
        <link>${config.baseUrl}</link>
      </image>
      <generator>${siteConfig.siteName}</generator>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${new URL('rss', config.baseUrl).toString()}" rel="self" type="application/rss+xml" />
      <ttl>60</ttl>
      ${postsContent}
    </channel>
  </rss>
  `.trim();

  return new Response(contents, {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
}

import nodeAdapter from '@sveltejs/adapter-node';
import netlifyAdapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';
import customMedia from 'postcss-custom-media';
import images from './src/build/images.mjs';

const filePath = dirname(fileURLToPath(import.meta.url));
const stylePath = `${filePath}/src/styles`;

const adapter = process.env.NETLIFY
  ? netlifyAdapter()
  : nodeAdapter({ precompress: true });

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      css: {
        prependData: `@import '${stylePath}/theme.scss';`
      },
      scss: {
        prependData: `@import '${stylePath}/theme.scss';`
      },
      preserve: ['ld+json'],
      postcss: {
        plugins: [customMedia(), autoprefixer()]
      }
    }),
    images()
  ],

  kit: {
    adapter
  }
};

export default config;

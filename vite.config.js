import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';

/** @type {import('vite').UserConfig} */
export default {
  include: ['./src/data/**/*'],
  plugins: [
    sveltekit(),
    svg({
      svgoOptions: {
        plugins: [
          {
            name: 'preset-default',
            // by default svgo removes the viewBox which prevents svg icons from scaling
            // not a good idea! https://github.com/svg/svgo/pull/1461
            params: {
              overrides: {
                removeViewBox: false,
                removeUselessStrokeAndFill: false,
                removeUnknownsAndDefaults: false
              }
            }
          }
        ]
      }
    })
  ],
  ssr: {
    noExternal: []
  }
};

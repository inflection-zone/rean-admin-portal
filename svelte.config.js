// import adapter from '@sveltejs/adapter-node';
// import { vitePreprocess } from '@sveltejs/kit/vite';
// import path from 'path';
// /** @type {import('@sveltejs/kit').Config} */
// const config = {
//   // Consult https://kit.svelte.dev/docs/integrations#preprocessors
//   // for more information about preprocessors
//   preprocess: vitePreprocess(),
//   kit: {
//     adapter: adapter({ out: 'build' }),
//   },
//   csrf: {
//     checkOrigin: false,
//     },
//   alias: {
//     $routes: path.resolve('./src/routes'),
//     $lib: path.resolve('./src/lib')
//   },
  
// };
// export default config;

import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import path from 'path';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		//adapter: adapter(),
		adapter: adapter({ out: 'build' }),
		// Only for using ngrok
		csrf: {
			checkOrigin: false,
		  },
	  alias: {
      $routes: path.resolve('./src/routes'),
      $lib: path.resolve('./src/lib')
    },
	}
};

export default config;
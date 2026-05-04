import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'hash',
			directives: {
				'script-src': ["'self'"],
				'style-src': ["'self'", "'unsafe-inline'"],
				'img-src': ["'self'", 'https:', 'data:', 'blob:'], // Consider that I might embed some other stuff in here
				'frame-ancestors': ["'self'", `${process.env.PUBLIC_DIRECTUS_URL}`],
				'font-src': ["'self'", 'https:'],
				'connect-src': ["'self'"],
				'object-src': ["'none'"]
			}
		}
	}
};

export default config;

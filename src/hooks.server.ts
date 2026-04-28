// https://directus.io/docs/tutorials/getting-started/fetch-data-from-directus-with-sveltekit

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return await resolve(event, {
		filterSerializedResponseHeaders: (key, value) => {
			return key.toLowerCase() === 'content-type';
		}
	});
};

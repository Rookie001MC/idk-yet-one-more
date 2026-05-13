import { getDirectusClient } from '$lib/server/directus';
import { readSingleton } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	try {
		const client = getDirectusClient(fetch);
		const data = await client.request(
			readSingleton('privacyPolicy', {
				fields: ['*'],
				limit: 1
			})
		);

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

		return {
			content: data
		};
	} catch (error) {
		console.error('Privacy policy load error:', error);
		return {
			content: null
		};
	}
};

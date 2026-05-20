import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getDirectusClient } from '$lib/server/directus';
import { readSingleton } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {
	const preview = url.searchParams.get('preview') === 'true';
	const version = url.searchParams.get('version') ?? undefined;
	const token = url.searchParams.get('token');

	if (preview) {
		if (!token || token !== env.PREVIEW_SECRET) {
			throw error(401, 'Unauthorized');
		}
	}

	try {
		const client = getDirectusClient(fetch);
		const content = await client.request(
			readSingleton('privacyPolicy', {
				fields: ['*'],
				...(version && { version })
			})
		);

		if (!preview) {
			setHeaders({
				'cache-control': 'public, s-maxage=3600, max-age=60'
			});
		}

		return { content, preview, version: version ?? null };
	} catch (err) {
		console.error('Privacy policy load error:', err);
		return { content: null, preview: false, version: null };
	}
};

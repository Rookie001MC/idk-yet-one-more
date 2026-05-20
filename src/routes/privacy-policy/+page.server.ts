import { error } from '@sveltejs/kit';
import { getDirectusClient } from '$lib/server/directus';
import { readSingleton } from '@directus/sdk';
import type { PageServerLoad } from './$types';
import type { PageMeta } from '$lib/types/pageMeta';

export const load: PageServerLoad = async ({ url, cookies, fetch, setHeaders }) => {
	const preview = url.searchParams.get('preview') === 'true';
	const version = url.searchParams.get('version') ?? undefined;

	if (preview && cookies.get('preview_session') !== '1') {
		throw error(401, 'Unauthorized');
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

		const meta: PageMeta = {
			title: 'Privacy Policy',
			description: "Privacy policy for Rookie's Blog. I don't collect your personal info."
		};

		return { content, preview, version: version ?? null, meta };
	} catch (err) {
		console.error('Privacy policy load error:', err);
		return { content: null, preview: false, version: null, meta: null };
	}
};

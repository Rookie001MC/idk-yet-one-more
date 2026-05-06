import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getDirectusClient } from '$lib/server/directus.js';
import { readItem } from '@directus/sdk';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const preview = url.searchParams.get('preview') === 'true';
	const version = url.searchParams.get('version') ?? undefined;
	const token = url.searchParams.get('token');

	if (preview) {
		if (!token || token !== env.PREVIEW_SECRET) {
			throw error(401, 'Unauthorized');
		}
	}

	const client = getDirectusClient(fetch);

	const post = await client.request(
		readItem('blogPosts', params.id, {
			fields: [
				'id',
				'title',
				'content',
				'slug',
				'status',
				'excerpt',
				'featuredImage.*',
				'category.*',
				'tags.tagsId.*'
			] as string[],
			...(version && { version })
		})
	);

	if (!post) throw error(404, 'Post Not Found');

	return { post, preview, version: version ?? null };
};

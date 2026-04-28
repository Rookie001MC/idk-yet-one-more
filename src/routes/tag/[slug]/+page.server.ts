import { fetchPostsByTag } from '$lib/data/blogPosts';
import { fetchTagBySlug } from '$lib/data/tags';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const tag = await fetchTagBySlug(params.slug, fetch);
		if (!tag) {
			throw error(404, 'Tag not found');
		}

		const posts = await fetchPostsByTag(
			params.slug,
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		return {
			tag,
			posts
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err && err.status === 404) throw err;
		console.error('Tag page load error:', err);
		throw error(500, 'Internal Server Error');
	}
};

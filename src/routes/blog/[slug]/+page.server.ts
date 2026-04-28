import { fetchPostBySlug } from '$lib/data/blogPosts';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const post = await fetchPostBySlug(
			params.slug,
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);
		if (!post) {
			throw error(404, 'Post not found');
		}
		return {
			post
		};
	} catch (err) {
		if (err instanceof Error && 'status' in err && err.status === 404) throw err;
		console.error('Single post load error:', err);
		throw error(500, 'Internal Server Error');
	}
};

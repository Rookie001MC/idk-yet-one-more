import { fetchPostBySlug } from '$lib/server/directus';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await fetchPostBySlug(params.slug);
		if (!post) {
			throw error(404, 'Post not found');
		}
		return {
			post
		};
	} catch (err: any) {
		if (err.status === 404) throw err;
		console.error('Single post load error:', err);
		throw error(500, 'Internal Server Error');
	}
}

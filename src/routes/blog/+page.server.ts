import { fetchAllPosts } from '$lib/data/blogPosts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const posts = await fetchAllPosts(
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		return {
			posts
		};
	} catch (error) {
		console.error('Blog index load error:', error);
		return {
			posts: []
		};
	}
};

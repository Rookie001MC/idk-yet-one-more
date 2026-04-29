import { fetchAllPosts } from '$lib/data/blogPosts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	try {
		const posts = await fetchAllPosts(
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

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

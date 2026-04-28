import { fetchLatestPosts } from '$lib/data/blogPosts';

export async function load() {
	try {
		const latestPosts = await fetchLatestPosts(6, fetch, [
			'*',
			'category.*',
			'tags.tagsId.*',
			'featuredImage.*'
		]);
		return {
			latestPosts
		};
	} catch (error) {
		console.error('Home page load error:', error);
		return {
			latestPosts: []
		};
	}
}

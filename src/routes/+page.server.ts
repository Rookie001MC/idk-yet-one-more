import { fetchLatestPosts } from '$lib/data/blogPosts';

export async function load({ fetch, setHeaders }) {
	try {
		const latestPosts = await fetchLatestPosts(
			6,
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

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

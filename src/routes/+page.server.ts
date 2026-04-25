import { fetchLatestPosts } from '$lib/server/directus';

export async function load() {
	try {
		const latestPosts = await fetchLatestPosts(6);
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

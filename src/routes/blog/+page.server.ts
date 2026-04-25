import { fetchAllPosts } from '$lib/server/directus';

export async function load() {
	try {
		const posts = await fetchAllPosts();
		return {
			posts
		};
	} catch (error) {
		console.error('Blog index load error:', error);
		return {
			posts: []
		};
	}
}

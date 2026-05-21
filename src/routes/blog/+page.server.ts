import { fetchAllPosts } from '$lib/data/blogPosts';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';

const pageTags = definePageMetaTags({ title: 'Blog' });

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	try {
		const posts = await fetchAllPosts(
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

		return { posts, ...pageTags };
	} catch (error) {
		console.error('Blog index load error:', error);
		return { posts: [], ...pageTags };
	}
};

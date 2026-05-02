import { fetchAllPosts } from '$lib/data/blogPosts';
import type { PageServerLoad } from './$types';
import { getAssetUrl } from '$lib/data/directusFile';

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	try {
		const posts = await fetchAllPosts(
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

		const resolvedPosts = posts.map((post) => {
			let featuredImageUrl = null;
			if (post.featuredImage && typeof post.featuredImage !== 'string') {
				featuredImageUrl = getAssetUrl(post.featuredImage, {
					width: 1200,
					height: 600,
					fit: 'cover'
				});
			}
			return {
				...post,
				featuredImageUrl
			};
		});

		return {
			posts: resolvedPosts
		};
	} catch (error) {
		console.error('Blog index load error:', error);
		return {
			posts: []
		};
	}
};

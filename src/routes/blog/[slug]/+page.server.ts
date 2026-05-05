import { fetchPostBySlug } from '$lib/data/blogPosts';
import { getAssetUrl } from '$lib/data/directusFile';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	try {
		const post = await fetchPostBySlug(
			params.slug,
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		if (!post) {
			return { post: null, featuredImageUrl: null };
		}

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

		let featuredImageUrl = null;
		if (post.featuredImage && typeof post.featuredImage !== 'string') {
			featuredImageUrl = getAssetUrl(post.featuredImage);
		}

		return { post, featuredImageUrl };
	} catch (error) {
		console.error('Single post load error:', error);
		return { post: null, featuredImageUrl: null };
	}
};

import { fetchPostBySlug } from '$lib/data/blogPosts';
import { getAssetUrl } from '$lib/data/directusFile';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	try {
		const post = await fetchPostBySlug(
			params.slug,
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);
		if (!post) {
			throw error(404, 'Post not found');
		}

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

		let featuredImageUrl = null;
		if (post.featuredImage && typeof post.featuredImage !== 'string') {
			featuredImageUrl = getAssetUrl(post.featuredImage);
		}
		return {
			post,
			featuredImageUrl
		};
	} catch (err) {
		if (err instanceof Error && 'status' in err && err.status === 404) throw err;
		console.error('Single post load error:', err);
		throw error(500, 'Internal Server Error');
	}
};

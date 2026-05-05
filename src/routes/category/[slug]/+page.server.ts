import { fetchPostsByCategory } from '$lib/data/blogPosts';
import { fetchCategoryBySlug } from '$lib/data/categories';
import { getAssetUrl } from '$lib/data/directusFile';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	try {
		const [category, posts] = await Promise.all([
			fetchCategoryBySlug(params.slug, fetch),
			fetchPostsByCategory(
				params.slug,
				['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
				fetch
			)
		]);

		if (!category) {
			return { category: null, posts: [] };
		}

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
			return { ...post, featuredImageUrl };
		});

		return { category, posts: resolvedPosts };
	} catch (error) {
		console.error('Category page load error:', error);
		return { category: null, posts: [] };
	}
};

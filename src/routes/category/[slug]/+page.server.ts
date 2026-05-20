import { fetchPostsByCategory } from '$lib/data/blogPosts';
import { fetchCategoryBySlug } from '$lib/data/categories';
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

		return { category, posts };
	} catch (error) {
		console.error('Category page load error:', error);
		return { category: null, posts: [] };
	}
};

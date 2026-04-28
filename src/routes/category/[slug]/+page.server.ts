import { fetchPostsByCategory } from '$lib/data/blogPosts';
import { fetchCategoryBySlug } from '$lib/data/categories';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const category = await fetchCategoryBySlug(params.slug);
		if (!category) {
			throw error(404, 'Category not found');
		}

		const posts = await fetchPostsByCategory(
			params.slug,
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		return {
			category,
			posts
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err && err.status === 404) throw err;
		console.error('Category page load error:', err);
		throw error(500, 'Internal Server Error');
	}
}


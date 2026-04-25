import { fetchCategoryBySlug, fetchPostsByCategory } from '$lib/server/directus';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const category = await fetchCategoryBySlug(params.slug);
		if (!category) {
			throw error(404, 'Category not found');
		}

		const posts = await fetchPostsByCategory(params.slug);
		
		return {
			category,
			posts
		};
	} catch (err: any) {
		if (err.status === 404) throw err;
		console.error('Category page load error:', err);
		throw error(500, 'Internal Server Error');
	}
}

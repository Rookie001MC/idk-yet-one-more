import { fetchCategories } from '$lib/data/categories';

export async function load({ fetch }) {
	try {
		const categories = await fetchCategories(fetch);
		return {
			categories,
			cmsError: false
		};
	} catch (error) {
		console.error('Layout load error:', error);
		return {
			categories: [],
			cmsError: true
		};
	}
}

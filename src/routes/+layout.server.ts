import { fetchCategories } from '$lib/server/directus';

export async function load() {
	try {
		const categories = await fetchCategories();
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

import { fetchCategories } from '$lib/server/directus';

export async function load() {
	try {
		const categories = await fetchCategories();
		return {
			categories,
			cmsError: categories.length === 0
		};
	} catch (error) {
		return {
			categories: [],
			cmsError: true,
			error
		};
	}
}

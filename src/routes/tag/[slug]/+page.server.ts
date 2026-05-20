import { fetchPostsByTag } from '$lib/data/blogPosts';
import { fetchTagBySlug } from '$lib/data/tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const [tag, posts] = await Promise.all([
			fetchTagBySlug(params.slug, fetch),
			fetchPostsByTag(params.slug, ['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'], fetch)
		]);

		if (!tag) {
			return { tag: null, posts: [] };
		}

		return { tag, posts };
	} catch (error) {
		console.error('Tag page load error:', error);
		return { tag: null, posts: [] };
	}
};

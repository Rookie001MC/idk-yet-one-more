import { fetchPostsByTag } from '$lib/data/blogPosts';
import { fetchTagBySlug } from '$lib/data/tags';
import { getAssetUrl } from '$lib/data/directusFile';
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

		return { tag, posts: resolvedPosts };
	} catch (error) {
		console.error('Tag page load error:', error);
		return { tag: null, posts: [] };
	}
};

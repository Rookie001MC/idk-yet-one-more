import { error } from '@sveltejs/kit';
import { fetchPostBySlug, fetchPostBySlugPreview } from '$lib/data/blogPosts';
import { getAssetUrl } from '$lib/data/directusFile';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, cookies, fetch, setHeaders }) => {
	const preview = url.searchParams.get('preview') === 'true';
	const version = url.searchParams.get('version') ?? undefined;

	if (preview && cookies.get('preview_session') !== '1') {
		throw error(401, 'Unauthorized');
	}

	try {
		const post = preview
			? await fetchPostBySlugPreview(
					params.slug,
					version,
					['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
					fetch
				)
			: await fetchPostBySlug(
					params.slug,
					['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
					fetch
				);

		if (!post) {
			return { post: null, featuredImageUrl: null, preview: false, version: null };
		}

		if (!preview) {
			setHeaders({
				'cache-control': 'public, s-maxage=3600, max-age=60'
			});
		}

		let featuredImageUrl = null;
		if (post.featuredImage) {
			featuredImageUrl = getAssetUrl(post.featuredImage);
		}

		return { post, featuredImageUrl, preview, version: version ?? null };
	} catch (err) {
		console.error('Single post load error:', err);
		return { post: null, featuredImageUrl: null, preview: false, version: null };
	}
};

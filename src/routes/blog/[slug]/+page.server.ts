import { error } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { fetchPostBySlug, fetchPostBySlugPreview } from '$lib/data/blogPosts';
import { getAssetUrl } from '$lib/data/directusFile';
import type { PageServerLoad } from './$types';
import type { PageMeta } from '$lib/types/pageMeta';

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
			return { post: null, featuredImageUrl: null, preview: false, version: null, meta: null };
		}

		if (!preview) {
			setHeaders({
				'cache-control': 'public, s-maxage=3600, max-age=60'
			});
		}

		// Relative path — used by BlogPostLayout's hero <img src>
		let featuredImageUrl: string | null = null;
		if (post.featuredImage && typeof post.featuredImage !== 'string') {
			featuredImageUrl = getAssetUrl(post.featuredImage);
		}

		// Absolute URL for og:image — computed server-side so SSR always has the correct value.
		// Previously this was a client-side $derived which never ran during SSR.
		let ogImageUrl: string;
		if (featuredImageUrl) {
			ogImageUrl = `${PUBLIC_BASE_URL}${featuredImageUrl}`;
		} else {
			const ogParams = new URLSearchParams();
			ogParams.set('title', post.title || '');
			if (post.excerpt) ogParams.set('description', post.excerpt);
			if (post.category && typeof post.category === 'object' && 'name' in post.category) {
				ogParams.set('category', String(post.category.name));
			}
			ogImageUrl = `${PUBLIC_BASE_URL}/opengraph?${ogParams.toString()}`;
		}

		const meta: PageMeta = {
			title: post.title,
			description: post.excerpt ?? undefined,
			imageUrl: ogImageUrl,
			type: 'article',
			publishedTime: post.datePublished ?? undefined,
			authors: ['Rookie Nguyen']
		};

		return { post, featuredImageUrl, preview, version: version ?? null, meta };
	} catch (err) {
		console.error('Single post load error:', err);
		return { post: null, featuredImageUrl: null, preview: false, version: null, meta: null };
	}
};

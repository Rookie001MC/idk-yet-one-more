import { error } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { fetchPostBySlug, fetchPostBySlugPreview } from '$lib/data/blogPosts';
import { resolveBlogPostExcerpt } from '$lib/utils/blogPostExcerpt';
import { definePageMetaTags } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';
import siteConfig from '$lib/config';

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
			return { post: null, preview: false, version: null };
		}

		if (!preview) {
			setHeaders({
				'cache-control': 'public, s-maxage=3600, max-age=60'
			});
		}

		// Absolute URL for og:image — computed server-side so SSR always has the correct value.
		// When the post has a featured image, request a crawler-safe JPEG at exactly
		// 1200×630 through our asset proxy (which adds Directus auth + image transforms).
		// This keeps file sizes well under the 5 MB limit that most crawlers enforce.
		let ogImageUrl: string;
		let ogImageType: string;
		if (post.featuredImage && typeof post.featuredImage !== 'string') {
			const ogAssetParams = new URLSearchParams({
				width: '1200',
				height: '630',
				format: 'jpg',
				quality: '80',
				fit: 'cover'
			});
			ogImageUrl = `${PUBLIC_BASE_URL}/api/assets/${post.featuredImage.id}?${ogAssetParams.toString()}`;
			ogImageType = 'image/jpeg';
		} else {
			const ogParams = new URLSearchParams();
			ogParams.set('title', post.title || '');
			const ogDescription = resolveBlogPostExcerpt(post);
			if (ogDescription) ogParams.set('description', ogDescription);
			if (post.category && typeof post.category === 'object' && 'name' in post.category) {
				ogParams.set('category', String(post.category.name));
			}
			ogImageUrl = `${PUBLIC_BASE_URL}/opengraph?${ogParams.toString()}`;
			ogImageType = 'image/png';
		}

		const description = resolveBlogPostExcerpt(post) || undefined;

		return {
			post,
			preview,
			version: version ?? null,
			...definePageMetaTags({
				title: post.title,
				description,
				openGraph: {
					type: 'article',
					title: post.title,
					description,
					images: [
						{
							url: ogImageUrl,
							width: 1200,
							height: 630,
							alt: post.title,
							type: ogImageType
						}
					],
					article: {
						publishedTime: post.datePublished ?? undefined,
						authors: [siteConfig.social.facebook.url],
					}
				},
				twitter: {
					title: post.title,
					description,
					image: ogImageUrl,
					imageAlt: post.title
				}
			})
		};
	} catch (err) {
		console.error('Single post load error:', err);
		return { post: null, preview: false, version: null };
	}
};

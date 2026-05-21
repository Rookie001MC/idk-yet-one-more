import { fetchPostsByTag } from '$lib/data/blogPosts';
import { fetchTagBySlug } from '$lib/data/tags';
import { definePageMetaTags } from 'svelte-meta-tags';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const [tag, posts] = await Promise.all([
			fetchTagBySlug(params.slug, fetch),
			fetchPostsByTag(params.slug, ['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'], fetch)
		]);

		if (!tag) {
			return {
				tag: null,
				posts: [],
				...definePageMetaTags({ title: 'Tag Not Found', robots: 'noindex,follow' })
			};
		}

		const description = `Posts tagged with ${tag.name}`;
		const ogImageUrl = `${PUBLIC_BASE_URL}/opengraph?title=${encodeURIComponent(`#${tag.name}`)}&description=${encodeURIComponent(description)}&category=Tag`;

		return {
			tag,
			posts,
			...definePageMetaTags({
				title: tag.name,
				description,
				openGraph: {
					title: `#${tag.name}`,
					description,
					images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `#${tag.name}`, type: 'image/png' }]
				},
				twitter: {
					title: `#${tag.name}`,
					description,
					image: ogImageUrl,
					imageAlt: `#${tag.name}`
				}
			})
		};
	} catch (error) {
		console.error('Tag page load error:', error);
		return { tag: null, posts: [] };
	}
};

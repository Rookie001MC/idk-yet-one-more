import { fetchPostsByCategory } from '$lib/data/blogPosts';
import { fetchCategoryBySlug } from '$lib/data/categories';
import { definePageMetaTags } from 'svelte-meta-tags';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch, setHeaders }) => {
	try {
		const [category, posts] = await Promise.all([
			fetchCategoryBySlug(params.slug, fetch),
			fetchPostsByCategory(
				params.slug,
				['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
				fetch
			)
		]);

		if (!category) {
			return {
				category: null,
				posts: [],
				...definePageMetaTags({ title: 'Category Not Found', robots: 'noindex,follow' })
			};
		}

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

		const description = category.description ?? `Posts in the ${category.name} category`;
		const ogImageUrl = `${PUBLIC_BASE_URL}/opengraph?title=${encodeURIComponent(category.name)}&description=${encodeURIComponent(description)}&category=Category`;

		return {
			category,
			posts,
			...definePageMetaTags({
				title: category.name,
				description,
				openGraph: {
					title: category.name,
					description,
					images: [{ url: ogImageUrl, width: 1200, height: 630, alt: category.name, type: 'image/png' }]
				},
				twitter: {
					title: category.name,
					description,
					image: ogImageUrl,
					imageAlt: category.name
				}
			})
		};
	} catch (error) {
		console.error('Category page load error:', error);
		return { category: null, posts: [] };
	}
};

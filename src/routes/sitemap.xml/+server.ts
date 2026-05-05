import type { RequestHandler } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';
import { fetchAllPosts } from '$lib/data/blogPosts';
import { fetchCategories } from '$lib/data/categories';
import { fetchTags } from '$lib/data/tags';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const GET: RequestHandler = async ({ fetch }) => {
	// Data functions already handle their own errors and return [] on failure,
	// so the sitemap will still build with whatever is available.
	const [posts, categories, tags] = await Promise.all([
		fetchAllPosts(['slug'], fetch),
		fetchCategories(fetch),
		fetchTags(fetch)
	]);

	return await sitemap.response({
		origin: PUBLIC_BASE_URL,
		paramValues: {
			'/blog/[slug]': posts.map((p) => p.slug),
			'/category/[slug]': categories.map((c) => c.slug),
			'/tag/[slug]': tags.map((t) => t.slug)
		}
	});
};

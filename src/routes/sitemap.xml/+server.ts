import type { RequestHandler } from '@sveltejs/kit';
import * as sitemap from 'super-sitemap';
import { fetchAllPosts } from '$lib/data/blogPosts';
import { fetchCategories } from '$lib/data/categories';
import { fetchTags } from '$lib/data/tags';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
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

import { getDirectusClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type Category from '$lib/types/category';

export async function fetchCategories(fetch?: typeof globalThis.fetch): Promise<Category[]> {
	try {
		const client = getDirectusClient(fetch);
		const categories = await client.request(
			readItems('categories', {
				fields: ['*'],
				sort: ['name']
			})
		);
		return categories as Category[];
	} catch (error) {
		console.error('fetchCategories error:', error);
		return [];
	}
}

export async function fetchCategoryBySlug(
	slug: string,
	fetch?: typeof globalThis.fetch
): Promise<Category | null> {
	try {
		const client = getDirectusClient(fetch);
		const categories = await client.request(
			readItems('categories', {
				fields: ['*'],
				filter: {
					slug: {
						_eq: slug
					}
				},
				limit: 1
			})
		);
		return categories.length > 0 ? (categories[0] as Category) : null;
	} catch (error) {
		console.error(`fetchCategoryBySlug error (slug: ${slug}):`, error);
		return null;
	}
}

export async function fetchCategoryById(
	id: number,
	fetch?: typeof globalThis.fetch
): Promise<Category | null> {
	try {
		const client = getDirectusClient(fetch);
		const categories = await client.request(
			readItems('categories', {
				fields: ['*'],
				filter: {
					id: {
						_eq: id
					}
				},
				limit: 1
			})
		);
		return categories.length > 0 ? (categories[0] as Category) : null;
	} catch (error) {
		console.error(`fetchCategoryById error (id: ${id}):`, error);
		return null;
	}
}

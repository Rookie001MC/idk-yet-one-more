import { getDirectusClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type Category from '$lib/types/category';

export async function fetchCategories(fetch?: typeof globalThis.fetch): Promise<Category[]> {
	const client = getDirectusClient(fetch);
	const categories = await client.request(
		readItems('categories', {
			fields: ['*'],
			sort: ['name']
		})
	);
	return categories as Category[];
}

export async function fetchCategoryBySlug(
	slug: string,
	fetch?: typeof globalThis.fetch
): Promise<Category | null> {
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
}

export async function fetchCategoryById(
	id: number,
	fetch?: typeof globalThis.fetch
): Promise<Category | null> {
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
}

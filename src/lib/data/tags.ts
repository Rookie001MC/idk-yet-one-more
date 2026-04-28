import { getDirectusClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type Tag from '$lib/types/tag';

export async function fetchTags(fetch: typeof globalThis.fetch): Promise<Tag[]> {
	const client = getDirectusClient(fetch);
	const tags = await client.request(
		readItems('tags', {
			fields: ['*'],
			sort: ['name']
		})
	);
	return tags as Tag[];
}

export async function fetchTagBySlug(
	slug: string,
	fetch: typeof globalThis.fetch
): Promise<Tag | null> {
	const client = getDirectusClient(fetch);
	const tags = await client.request(
		readItems('tags', {
			fields: ['*'],
			filter: {
				slug: {
					_eq: slug
				}
			},
			limit: 1
		})
	);
	return tags.length > 0 ? (tags[0] as Tag) : null;
}

// Tags are usually are multiple, and the data type is usually an array of int[]
export async function fetchTagsByIds(id: number[], fetch: typeof globalThis.fetch): Promise<Tag[]> {
	const client = getDirectusClient(fetch);
	const tags = await client.request(
		readItems('tags', {
			fields: ['*'],
			filter: {
				id: {
					in: id
				}
			},
			limit: 20
		})
	);
	return tags as Tag[];
}

import { getDirectusClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type BlogPost from '$lib/types/blogPost';

export async function fetchLatestPosts(
	limit: number = 3,
	fetch: typeof globalThis.fetch,
	fields: any[] = ['*']
): Promise<BlogPost[]> {
	const client = getDirectusClient(fetch);
	const posts = await client.request(
		readItems('blogPosts', {
			fields,
			limit,
			sort: ['-datePublished'],
			filter: {
				status: {
					_eq: 'published'
				}
			}
		})
	);
	return posts as unknown as BlogPost[];
}

export async function fetchAllPosts(
	fetch: typeof globalThis.fetch,
	fields: any[] = ['*']
): Promise<BlogPost[]> {
	const client = getDirectusClient(fetch);
	const posts = await client.request(
		readItems('blogPosts', {
			fields,
			sort: ['-datePublished'],
			filter: {
				status: {
					_eq: 'published'
				}
			}
		})
	);
	return posts as unknown as BlogPost[];
}

export async function fetchPostBySlug(
	slug: string,
	fetch: typeof globalThis.fetch,
	fields: any[] = ['*']
): Promise<BlogPost | null> {
	const client = getDirectusClient(fetch);
	const posts = await client.request(
		readItems('blogPosts', {
			fields,
			filter: {
				slug: {
					_eq: slug
				},
				status: {
					_eq: 'published'
				}
			},
			limit: 1
		})
	);
	return posts.length > 0 ? (posts[0] as unknown as BlogPost) : null;
}

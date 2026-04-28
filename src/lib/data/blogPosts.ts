import { getDirectusClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type BlogPost from '$lib/types/blogPost';

export async function fetchLatestPosts(
	limit: number = 3,
	fields: any[] = ['*'],
	fetch?: typeof globalThis.fetch
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
	fields: any[] = ['*'],
	fetch?: typeof globalThis.fetch
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
	fields: any[] = ['*'],
	fetch: typeof globalThis.fetch
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

export async function fetchPostsByCategory(
	slug: string,
	fields: any[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	const client = getDirectusClient(fetch);
	const posts = await client.request(
		readItems('blogPosts', {
			fields,
			sort: ['-datePublished'],
			filter: {
				status: {
					_eq: 'published'
				},
				category: {
					slug: {
						_eq: slug
					}
				}
			}
		})
	);
	return posts as unknown as BlogPost[];
}

export async function fetchPostsByTag(
	slug: string,
	fields: any[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	const client = getDirectusClient(fetch);
	const posts = await client.request(
		readItems('blogPosts', {
			fields,
			sort: ['-datePublished'],
			filter: {
				status: {
					_eq: 'published'
				},
				tags: {
					// @ts-ignore - Directus SDK types can be tricky with M2M filtering
					tagsId: {
						slug: {
							_eq: slug
						}
					}
				}
			} as any
		})
	);
	return posts as unknown as BlogPost[];
}

export async function fetchPostsByTagId(
	id: number,
	fields: any[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	const client = getDirectusClient(fetch);
	const posts = await client.request(
		readItems('blogPosts', {
			fields,
			sort: ['-datePublished'],
			filter: {
				status: {
					_eq: 'published'
				},
				tags: {
					// @ts-ignore
					tagsId: {
						id: {
							_eq: id
						}
					}
				}
			} as any
		})
	);
	return posts as unknown as BlogPost[];
}

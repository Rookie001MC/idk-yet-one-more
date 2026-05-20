import { getDirectusClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type BlogPost from '$lib/types/blogPost';

export async function fetchLatestPosts(
	limit: number = 3,
	fields: string[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	try {
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
	} catch (error) {
		console.error('fetchLatestPosts error:', error);
		return [];
	}
}

export async function fetchAllPosts(
	fields: string[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	try {
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
	} catch (error) {
		console.error('fetchAllPosts error:', error);
		return [];
	}
}

export async function fetchPostBySlug(
	slug: string,
	fields: string[] = ['*'],
	fetch: typeof globalThis.fetch
): Promise<BlogPost | null> {
	try {
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
	} catch (error) {
		console.error(`fetchPostBySlug error (slug: ${slug}):`, error);
		return null;
	}
}

export async function fetchPostsByCategory(
	slug: string,
	fields: string[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	try {
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
	} catch (error) {
		console.error(`fetchPostsByCategory error (slug: ${slug}):`, error);
		return [];
	}
}

export async function fetchPostBySlugPreview(
	slug: string,
	version: string | undefined,
	fields: string[] = ['*'],
	fetch: typeof globalThis.fetch
): Promise<BlogPost | null> {
	try {
		const client = getDirectusClient(fetch);
		const posts = await client.request(
			readItems('blogPosts', {
				fields,
				filter: {
					slug: {
						_eq: slug
					}
				},
				limit: 1,
				...(version && { version })
			})
		);
		return posts.length > 0 ? (posts[0] as unknown as BlogPost) : null;
	} catch (error) {
		console.error(`fetchPostBySlugPreview error (slug: ${slug}):`, error);
		return null;
	}
}

export async function fetchPostsByTag(
	slug: string,
	fields: string[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	try {
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
						// @ts-expect-error - Directus SDK types can be tricky with M2M filtering
						tagsId: {
							slug: {
								_eq: slug
							}
						}
					}
				} as Record<string, unknown>
			})
		);
		return posts as unknown as BlogPost[];
	} catch (error) {
		console.error(`fetchPostsByTag error (slug: ${slug}):`, error);
		return [];
	}
}

export async function fetchPostsByTagId(
	id: number,
	fields: string[] = ['*'],
	fetch?: typeof globalThis.fetch
): Promise<BlogPost[]> {
	try {
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
						// @ts-expect-error - Directus SDK types can be tricky with M2M filtering
						tagsId: {
							id: {
								_eq: id
							}
						}
					}
				} as Record<string, unknown>
			})
		);
		return posts as unknown as BlogPost[];
	} catch (error) {
		console.error(`fetchPostsByTagId error (id: ${id}):`, error);
		return [];
	}
}

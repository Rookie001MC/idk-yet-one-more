import { DIRECTUS_TOKEN } from '$env/static/private';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

export interface Category {
	id: number;
	name: string;
	slug: string;
	description: string | null;
}

export interface Tag {
	id: number;
	name: string;
	slug: string;
}

export interface DirectusFile {
	id: string;
	title: string;
}

export interface BlogPost {
	id: number;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	datePublished: string | null;
	featuredImage: DirectusFile | null;
	category: Category | null;
	tags: { tagsId: Tag }[];
}

async function fetchDirectus<T>(path: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${PUBLIC_DIRECTUS_URL}${path}`, {
		...options,
		headers: {
			Authorization: `Bearer ${DIRECTUS_TOKEN}`,
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	if (!response.ok) {
		console.error(`Directus error: ${response.status} - ${await response.text()}`);
		throw new Error(`Directus API error: ${response.status}`);
	}

	const json = (await response.json()) as any;
	return json.data as T;
}

export async function fetchLatestPosts(limit: number = 5): Promise<BlogPost[]> {
	const params = new URLSearchParams({
		limit: limit.toString(),
		sort: '-datePublished',
		filter: JSON.stringify({ status: { _eq: 'published' } }),
		fields: 'id,title,slug,excerpt,datePublished,featuredImage.*,category.*,tags.tagsId.*'
	});
	return fetchDirectus<BlogPost[]>(`/items/blogPosts?${params}`);
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
	const params = new URLSearchParams({
		sort: '-datePublished',
		filter: JSON.stringify({ status: { _eq: 'published' } }),
		fields: 'id,title,slug,excerpt,datePublished,featuredImage.*,category.*,tags.tagsId.*'
	});
	return fetchDirectus<BlogPost[]>(`/items/blogPosts?${params}`);
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
	const params = new URLSearchParams({
		limit: '1',
		filter: JSON.stringify({ slug: { _eq: slug }, status: { _eq: 'published' } }),
		fields: 'id,title,slug,excerpt,content,datePublished,featuredImage.*,category.*,tags.tagsId.*'
	});
	const posts = await fetchDirectus<BlogPost[]>(`/items/blogPosts?${params}`);
	return posts.length > 0 ? posts[0] : null;
}

export async function fetchCategories(): Promise<Category[]> {
	const params = new URLSearchParams({
		sort: 'name',
		fields: 'id,name,slug,description'
	});
	return fetchDirectus<Category[]>(`/items/categories?${params}`);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
	const params = new URLSearchParams({
		limit: '1',
		filter: JSON.stringify({ slug: { _eq: slug } }),
		fields: 'id,name,slug,description'
	});
	const categories = await fetchDirectus<Category[]>(`/items/categories?${params}`);
	return categories.length > 0 ? categories[0] : null;
}

export async function fetchPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
	const params = new URLSearchParams({
		sort: '-datePublished',
		filter: JSON.stringify({
			status: { _eq: 'published' },
			category: { slug: { _eq: categorySlug } }
		}),
		fields: 'id,title,slug,excerpt,datePublished,featuredImage.*,category.*,tags.tagsId.*'
	});
	return fetchDirectus<BlogPost[]>(`/items/blogPosts?${params}`);
}

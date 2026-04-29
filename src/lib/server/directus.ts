import { DIRECTUS_TOKEN } from '$env/dynamic/private';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { Schema } from '$lib/types/schema';

/**
 * Legacy fetch wrapper for raw API calls.
 * @deprecated Use getDirectusClient(fetch).request(...) instead for full type safety.
 */
export async function fetchDirectus<T>(path: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${PUBLIC_DIRECTUS_URL}${path}`, {
		...options,
		headers: {
			Authorization: `Bearer ${DIRECTUS_TOKEN}`,
			'Content-Type': 'application/json',
			...options.headers
		}
	});

	if (!response.ok) {
		const errorText = await response.text();
		console.error(`Directus error: ${response.status} - ${errorText}`);
		throw new Error(`Directus API error: ${response.status}`);
	}

	const json = (await response.json()) as any;
	return json.data as T;
}

/**
 * Returns a type-safe Directus client.
 * @param customFetch Optional SvelteKit fetch (highly recommended in load functions)
 */
export function getDirectusClient(customFetch?: typeof fetch) {
	return createDirectus<Schema>(PUBLIC_DIRECTUS_URL, {
		globals: {
			fetch: customFetch || fetch
		}
	})
		.with(staticToken(DIRECTUS_TOKEN))
		.with(rest());
}

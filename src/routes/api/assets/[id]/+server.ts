import { env } from '$env/dynamic/private';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export async function GET({ params, url, fetch }) {
	const { id } = params;

	if (!id) {
		throw error(400, 'Missing asset ID');
	}

	const directusUrl = new URL(`${PUBLIC_DIRECTUS_URL}/assets/${id}`);

	// Forward search params for transformations (width, height, fit, etc.)
	url.searchParams.forEach((value, key) => {
		directusUrl.searchParams.set(key, value);
	});

	try {
		const response = await fetch(directusUrl.toString(), {
			headers: {
				Authorization: `Bearer ${env.DIRECTUS_TOKEN}`
			}
		});

		if (!response.ok) {
			console.error(`Directus asset proxy error: ${response.status} for ${id}`);
			// Return a 404 or the original error if appropriate
			return new Response(null, { status: response.status });
		}

		const contentType = response.headers.get('Content-Type');
		const cacheControl = response.headers.get('Cache-Control') || 'public, max-age=31536000, immutable';

		return new Response(response.body, {
			headers: {
				'Content-Type': contentType || 'application/octet-stream',
				'Cache-Control': cacheControl
			}
		});
	} catch (e) {
		console.error(`Directus asset proxy fetch failure for ${id}:`, e);
		throw error(500, 'Internal Server Error');
	}
}

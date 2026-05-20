import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

const COOKIE_NAME = 'preview_session';
const COOKIE_MAX_AGE = 60 * 60; // 1 hour

// Whether the frontend is served over HTTPS (determines cookie flags).
// SameSite=None requires Secure, which requires HTTPS.
const isHttps = PUBLIC_BASE_URL.startsWith('https://');

export const GET: RequestHandler = ({ url, cookies }) => {
	const token = url.searchParams.get('token');
	const redirectTo = url.searchParams.get('redirect');
	const version = url.searchParams.get('version');

	// Validate token
	if (!token || token !== env.PREVIEW_SECRET) {
		throw error(401, 'Unauthorized');
	}

	// Only allow relative redirects — prevents open-redirect attacks
	if (!redirectTo || !redirectTo.startsWith('/')) {
		throw error(400, 'Invalid redirect');
	}

	// Set the preview session cookie (HttpOnly — JS cannot read it)
	cookies.set(COOKIE_NAME, '1', {
		httpOnly: true,
		secure: isHttps,
		// SameSite=None is required for cross-origin iframes (Directus embeds the preview).
		// Falls back to Lax in dev (HTTP) where None+Secure isn't possible;
		// in dev you open the URL directly rather than through the Directus iframe anyway.
		sameSite: isHttps ? 'none' : 'lax',
		maxAge: COOKIE_MAX_AGE,
		path: '/'
	});

	// Build the clean content URL — token stays out of it
	const dest = new URL(redirectTo, PUBLIC_BASE_URL);
	dest.searchParams.set('preview', 'true');
	if (version) dest.searchParams.set('version', version);

	throw redirect(307, dest.pathname + dest.search);
};

// Allow Directus (or the editor) to explicitly end the preview session
export const DELETE: RequestHandler = ({ cookies }) => {
	cookies.delete(COOKIE_NAME, { path: '/' });
	return new Response(null, { status: 204 });
};

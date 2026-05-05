import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
// https://directus.io/docs/tutorials/getting-started/fetch-data-from-directus-with-sveltekit

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = sequence(
	Sentry.initCloudflareSentryHandle({
		dsn: 'https://b688f6130eb83a15bf3feb4698e2eaa3@o4508445764550656.ingest.de.sentry.io/4508445766385744',
		sendDefaultPii: false
	}),
	Sentry.sentryHandle(),
	async ({ event, resolve }) => {
		const response = await resolve(event, {
			filterSerializedResponseHeaders: (key, value) => {
				return key.toLowerCase() === 'content-type';
			}
		});

		response.headers.set('Permission-Policy', 'interest-cohort=()');
		response.headers.set('X-Content-Type-Options', 'nosniff');
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
		response.headers.set(
			'Strict-Transport-Security',
			'max-age=31536000; includeSubDomains; preload'
		);

		return response;
	}
);
export const handleError = Sentry.handleErrorWithSentry();

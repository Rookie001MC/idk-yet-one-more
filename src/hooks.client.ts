import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://b688f6130eb83a15bf3feb4698e2eaa3@o4508445764550656.ingest.de.sentry.io/4508445766385744',

	tracesSampleRate: 1.0,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/sveltekit/configuration/options/#sendDefaultPii
	sendDefaultPii: false,
	tracesSampleRate: 1.0,
	integrations: [
  	Sentry.feedbackIntegration()
	]
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();

import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://b688f6130eb83a15bf3feb4698e2eaa3@o4508445764550656.ingest.de.sentry.io/4508445766385744',

  tracesSampleRate: 1.0,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: import.meta.env.DEV,
});
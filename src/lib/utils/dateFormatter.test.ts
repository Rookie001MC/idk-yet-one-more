import { Temporal } from '@js-temporal/polyfill';
import { afterEach, describe, expect, test, vi } from 'vitest';

import toLocalizedLongDate from './dateFormatter';

describe('toLocalizedLongDate', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	test('falls back to UTC when the runtime timezone is not recognized', () => {
		vi.spyOn(Temporal.Now, 'timeZoneId').mockReturnValue('Etc/Unknown');

		expect(
			toLocalizedLongDate('2024-01-02T03:04:05Z', {
				dateStyle: 'medium',
				timeStyle: 'short'
			})
		).toBe('Jan 2, 2024, 3:04 AM');
	});
});

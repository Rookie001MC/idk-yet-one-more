import { Temporal } from '@js-temporal/polyfill';

const fallbackTimeZone = 'UTC';

function toRuntimeZonedDateTime(instant: Temporal.Instant) {
	try {
		return instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());
	} catch (error) {
		if (error instanceof RangeError) {
			return instant.toZonedDateTimeISO(fallbackTimeZone);
		}

		throw error;
	}
}

function toLocalizedLongDate(
	date: string,
	settingOverrides: Intl.DateTimeFormatOptions = { dateStyle: 'long' }
) {
	const instant = Temporal.Instant.from(date);
	const zonedDateTime = toRuntimeZonedDateTime(instant);
	return zonedDateTime.toLocaleString('en-US', {
		...settingOverrides
	});
}

export default toLocalizedLongDate;

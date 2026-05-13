import { Temporal } from '@js-temporal/polyfill';

function toLocalizedLongDate(
	date: string,
	settingOverrides: Intl.DateTimeFormatOptions = { dateStyle: 'long' }
) {
	const instant = Temporal.Instant.from(date);
	const tz = Temporal.Now.timeZoneId();
	const zonedDateTime = instant.toZonedDateTimeISO(tz);
	return zonedDateTime.toLocaleString('en-US', {
		...settingOverrides
	});
}

export default toLocalizedLongDate;

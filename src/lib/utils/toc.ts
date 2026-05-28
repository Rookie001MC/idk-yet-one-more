export interface TocHeading {
	id: string;
	text: string;
	level: number;
}

export interface TocCollectContext {
	add: (heading: TocHeading) => void;
}

/**
 * Replicates marked's default slug function so heading IDs produced here
 * match the `id` attributes rendered by @humanspeak/svelte-markdown.
 */
function slugifyHeading(raw: string): string {
	return raw
		.toLowerCase()
		.trim()
		.replace(/<[!/a-z].*?>/gi, '')
		.replace(/[ -⁯⸀-⹿\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
		.replace(/\s/g, '-');
}

/**
 * Parse h2–h6 headings from a CommonMark string.
 * Produces the same `id` values that marked (and therefore svelte-markdown) generates,
 * including duplicate-slug disambiguation (-1, -2, …).
 */
export function parseHeadings(markdown: string): TocHeading[] {
	const headings: TocHeading[] = [];
	const seen: Record<string, number> = Object.create(null);
	const atxRe = /^(#{2,6})\s+(.+?)(?:\s+#+)?$/gm;
	let m: RegExpExecArray | null;

	while ((m = atxRe.exec(markdown)) !== null) {
		const level = m[1].length;
		const rawText = m[2].trim();

		let id = slugifyHeading(rawText);
		if (id in seen) {
			seen[id]++;
			id = `${id}-${seen[id]}`;
		}
		seen[id] = 0;

		// Strip inline markdown for display text
		const text = rawText
			.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
			.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
			.replace(/[*_~]{1,2}([^*_~]+)[*_~]{1,2}/g, '$1')
			.replace(/`([^`]+)`/g, '$1')
			.trim();

		headings.push({ id, text, level });
	}

	return headings;
}

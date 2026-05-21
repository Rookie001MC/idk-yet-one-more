/**
 * Strips basic Markdown syntax and returns plain text.
 * Not a full parser — handles the common CMS patterns:
 * fenced/inline code, headings, bold/italic, links, images,
 * blockquotes, horizontal rules, HTML <br>, and extra whitespace.
 */
function stripMarkdown(md: string): string {
	return (
		md
			// Remove fenced code blocks (including their content)
			.replace(/```[\s\S]*?```/g, '')
			// Remove inline code
			.replace(/`[^`]*`/g, '')
			// Remove images ![alt](url) — must come before link rule
			.replace(/!\[[^\]]*\]\([^)]+\)/g, '')
			// Extract link text from [text](url)
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
			// Remove heading markers (# H1 … ###### H6)
			.replace(/^#{1,6}\s+/gm, '')
			// Remove bold/italic (**bold** __bold__ *italic* _italic_)
			.replace(/(\*\*|__)(.*?)\1/gs, '$2')
			.replace(/(\*|_)(.*?)\1/gs, '$2')
			// Remove blockquote markers
			.replace(/^>\s*/gm, '')
			// Remove horizontal rules (--- *** ___)
			.replace(/^[-*_]{3,}\s*$/gm, '')
			// Replace HTML <br> with a space
			.replace(/<br\s*\/?>/gi, ' ')
			// Collapse consecutive newlines to a single space
			.replace(/\n{2,}/g, ' ')
			.replace(/\n/g, ' ')
			// Collapse any run of whitespace
			.replace(/\s+/g, ' ')
			.trim()
	);
}

/** Target length for SEO meta descriptions. */
const SEO_MAX_LENGTH = 155;

/**
 * Generates a short excerpt from Markdown content for use in SEO
 * meta descriptions and post previews.
 *
 * Strategy:
 * 1. Strip Markdown to plain text.
 * 2. Return as-is if already within {@link SEO_MAX_LENGTH} characters.
 * 3. Try to cut at the last sentence boundary (. ! ?) at or before the limit.
 * 4. Fall back to a word-boundary cut followed by an ellipsis.
 *
 * @param content - Raw Markdown string (typically `post.content`).
 * @returns Plain-text excerpt, never longer than ~{@link SEO_MAX_LENGTH} chars.
 */
export function generateExcerpt(content: string): string {
	if (!content) return '';

	const plain = stripMarkdown(content);

	if (plain.length <= SEO_MAX_LENGTH) return plain;

	// Search for the last sentence end within the limit (+1 lets us catch a
	// period/exclamation/question mark that lands exactly at SEO_MAX_LENGTH).
	const searchWindow = plain.slice(0, SEO_MAX_LENGTH + 1);
	const sentenceEnd = Math.max(
		searchWindow.lastIndexOf('. '),
		searchWindow.lastIndexOf('! '),
		searchWindow.lastIndexOf('? ')
	);

	if (sentenceEnd > 0) {
		// +1 to include the punctuation itself
		return plain.slice(0, sentenceEnd + 1);
	}

	// No sentence boundary — cut at the last word boundary and add an ellipsis.
	const wordBoundary = searchWindow.lastIndexOf(' ');
	return plain.slice(0, wordBoundary > 0 ? wordBoundary : SEO_MAX_LENGTH) + '…';
}

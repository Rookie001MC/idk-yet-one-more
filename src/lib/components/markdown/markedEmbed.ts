import type { MarkedExtension, Tokens } from 'marked';

export interface EmbedToken extends Tokens.Generic {
	type: 'embed';
	provider: string;
	href: string;
	title?: string;
}

const EMBED_PATTERN =
	/^::embed\[([^\]\n]+)\]\(\s*(<[^>\n]+>|[^\s)]+)(?:\s+(?:"([^"\n]*)"|'([^'\n]*)'))?\s*\)[ \t]*(?:\n|$)/;

export function markedEmbed(): MarkedExtension {
	return {
		extensions: [
			{
				name: 'embed',
				level: 'block',
				start(src) {
					return src.match(/^::embed\[/m)?.index;
				},
				tokenizer(src) {
					const match = src.match(EMBED_PATTERN);

					if (!match) return;

					return {
						type: 'embed',
						raw: match[0],
						provider: match[1].trim(),
						href: match[2].trim(),
						title: (match[3] ?? match[4])?.trim()
					} satisfies EmbedToken;
				}
			}
		]
	};
}

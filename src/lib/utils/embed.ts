export type EmbedProvider = 'spotify' | 'youtube';

export type EmbedLayout = 'audio-compact' | 'audio-large' | 'video';

export interface EmbedDefinition {
	allow: string;
	embedUrl: string;
	externalUrl: string;
	layout: EmbedLayout;
	provider: EmbedProvider;
	providerLabel: string;
	title: string;
}

const SPOTIFY_TYPES = new Set(['album', 'artist', 'episode', 'playlist', 'show', 'track']);
const SPOTIFY_COMPACT_TYPES = new Set(['episode', 'track']);
const YOUTUBE_HOSTS = new Set([
	'm.youtube.com',
	'music.youtube.com',
	'www.youtube.com',
	'www.youtube-nocookie.com',
	'youtu.be',
	'youtube.com',
	'youtube-nocookie.com'
]);

const SPOTIFY_ID_PATTERN = /^[A-Za-z0-9]{10,32}$/;
const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_LIST_PATTERN = /^[A-Za-z0-9_-]{6,128}$/;

export function resolveEmbed(
	providerInput: string | undefined,
	urlInput: string | undefined,
	titleInput?: string
): EmbedDefinition | null {
	const provider = normalizeProvider(providerInput);
	const url = parseHttpUrl(urlInput);

	if (!provider || !url) return null;

	if (provider === 'spotify') {
		return resolveSpotifyEmbed(url, titleInput);
	}

	return resolveYoutubeEmbed(url, titleInput);
}

function normalizeProvider(providerInput: string | undefined): EmbedProvider | null {
	const provider = providerInput?.trim().toLowerCase();

	if (provider === 'spotify') return 'spotify';
	if (provider === 'youtube' || provider === 'yt') return 'youtube';

	return null;
}

function parseHttpUrl(urlInput: string | undefined): URL | null {
	if (!urlInput) return null;

	try {
		const url = new URL(stripWrappingAngles(urlInput.trim()));
		return url.protocol === 'https:' || url.protocol === 'http:' ? url : null;
	} catch {
		return null;
	}
}

function stripWrappingAngles(value: string): string {
	return value.startsWith('<') && value.endsWith('>') ? value.slice(1, -1) : value;
}

function resolveSpotifyEmbed(url: URL, titleInput?: string): EmbedDefinition | null {
	if (url.hostname.toLowerCase() !== 'open.spotify.com') return null;

	const segments = url.pathname.split('/').filter(Boolean);
	const [type, id] = segments[0]?.startsWith('intl-') ? segments.slice(1) : segments;

	if (!type || !id || !SPOTIFY_TYPES.has(type) || !SPOTIFY_ID_PATTERN.test(id)) return null;

	return {
		allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
		embedUrl: `https://open.spotify.com/embed/${type}/${id}`,
		externalUrl: url.toString(),
		layout: SPOTIFY_COMPACT_TYPES.has(type) ? 'audio-compact' : 'audio-large',
		provider: 'spotify',
		providerLabel: 'Spotify',
		title: normalizeTitle(titleInput, `Spotify ${type}`)
	};
}

function resolveYoutubeEmbed(url: URL, titleInput?: string): EmbedDefinition | null {
	const hostname = url.hostname.toLowerCase();

	if (!YOUTUBE_HOSTS.has(hostname)) return null;

	const segments = url.pathname.split('/').filter(Boolean);
	const id = getYoutubeVideoId(url, segments);
	const list = url.searchParams.get('list');

	if (id) {
		const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
		const start = parseYoutubeStart(url.searchParams.get('start') ?? url.searchParams.get('t'));

		if (start) {
			embedUrl.searchParams.set('start', String(start));
		}

		return {
			allow:
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
			embedUrl: embedUrl.toString(),
			externalUrl: url.toString(),
			layout: 'video',
			provider: 'youtube',
			providerLabel: 'YouTube',
			title: normalizeTitle(titleInput, 'YouTube video')
		};
	}

	if (list && segments[0] === 'playlist' && YOUTUBE_LIST_PATTERN.test(list)) {
		const embedUrl = new URL('https://www.youtube-nocookie.com/embed/videoseries');
		embedUrl.searchParams.set('list', list);

		return {
			allow:
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
			embedUrl: embedUrl.toString(),
			externalUrl: url.toString(),
			layout: 'video',
			provider: 'youtube',
			providerLabel: 'YouTube',
			title: normalizeTitle(titleInput, 'YouTube playlist')
		};
	}

	return null;
}

function getYoutubeVideoId(url: URL, segments: string[]): string | null {
	const hostname = url.hostname.toLowerCase();
	const candidates = [
		hostname === 'youtu.be' ? segments[0] : null,
		url.searchParams.get('v'),
		['embed', 'shorts', 'live', 'v'].includes(segments[0]) ? segments[1] : null
	];

	return candidates.find((candidate) => !!candidate && YOUTUBE_ID_PATTERN.test(candidate)) ?? null;
}

function parseYoutubeStart(value: string | null): number | null {
	if (!value) return null;

	if (/^\d+$/.test(value)) return Number(value);

	let seconds = 0;
	for (const [, amount, unit] of value.matchAll(/(\d+)(h|m|s)/g)) {
		const numericAmount = Number(amount);

		if (unit === 'h') seconds += numericAmount * 60 * 60;
		if (unit === 'm') seconds += numericAmount * 60;
		if (unit === 's') seconds += numericAmount;
	}

	return seconds || null;
}

function normalizeTitle(titleInput: string | undefined, fallback: string): string {
	const title = titleInput?.trim();
	return title ? title : fallback;
}

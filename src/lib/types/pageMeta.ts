export interface PageMeta {
	title?: string;
	description?: string;
	/** Absolute URL for og:image / twitter:image */
	imageUrl?: string;
	/**
	 * MIME type of the OG image.
	 * Defaults to 'image/png' (Satori fallback).
	 * Pass 'image/jpeg' when serving a Directus asset with format=jpg.
	 */
	imageType?: string;
	type?: 'website' | 'article';
	publishedTime?: string;
	authors?: string[];
}

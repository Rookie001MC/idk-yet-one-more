export interface PageMeta {
	title?: string;
	description?: string;
	/** Absolute URL for og:image / twitter:image */
	imageUrl?: string;
	type?: 'website' | 'article';
	publishedTime?: string;
	authors?: string[];
}

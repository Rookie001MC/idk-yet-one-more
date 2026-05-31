import type Category from './category';
import type Tag from './tag';
import type DirectusFile from './directusFile';

export default interface BlogPost {
	id: number;
	status: 'published' | 'draft' | 'archived';
	title: string;
	slug: string;
	excerpt: string | null;
	disableAutoExcerpt: boolean;
	content: string | null;
	datePublished: string | null;
	featuredImage: DirectusFile | string | null;
	category: Category | number | null;
	tags: { tagsId: Tag | number }[];
	user_created: string | null;
	date_created: string;
	user_updated: string | null;
	date_updated: string | null;
}

import type Category from './category';
import type Tag from './tag';

export default interface BlogPost {
	id: number;
	status: 'published' | 'draft' | 'archived';
	title: string;
	slug: string;
	excerpt: string | null;
	content: string | null;
	datePublished: string | null;
	featuredImage: string | null; // UUID
	category: Category | number | null;
	tags: { tagsId: Tag | number }[];
	user_created: string | null;
	date_created: string;
	user_updated: string | null;
	date_updated: string | null;
}

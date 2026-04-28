export default interface Page {
	id: number;
	status: 'published' | 'draft' | 'archived';
	title: string;
	slug: string;
	content: string | null;
	user_created: string | null;
	date_created: string;
	user_updated: string | null;
	date_updated: string | null;
}

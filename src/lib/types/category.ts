export default interface Category {
	id: number;
	name: string;
	slug: string;
	description: string | null;
	parent: Category | number | null;
}

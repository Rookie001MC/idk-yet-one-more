import type BlogPost from './blogPost';
import type Category from './category';
import type Tag from './tag';
import type Page from './page';

export interface Schema {
	blogPosts: BlogPost[];
	categories: Category[];
	tags: Tag[];
	pages: Page[];
	blogPostsTags: { id: number; blogPostsId: number; tagsId: number }[];
}

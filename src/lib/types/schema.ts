import type BlogPost from './blogPost';
import type Category from './category';
import type Tag from './tag';
import type Page from './page';
import type PrivacyPolicy from './privacyPolicy';

export interface Schema {
	blogPosts: BlogPost[];
	categories: Category[];
	tags: Tag[];
	pages: Page[];
	blogPostsTags: { id: number; blogPostsId: number; tagsId: number }[];
	// Singleton
	privacyPolicy: PrivacyPolicy;
}

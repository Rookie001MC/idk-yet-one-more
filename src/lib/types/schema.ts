import type BlogPost from './blogPost';
import type Category from './category';
import type Tag from './tag';
import type Page from './page';
import type AiPrompt from './aiPrompt';

export interface Schema {
	blogPosts: BlogPost[];
	categories: Category[];
	tags: Tag[];
	pages: Page[];
	ai_prompts: AiPrompt[];
	blogPostsTags: { id: number; blogPostsId: number; tagsId: number }[];
}

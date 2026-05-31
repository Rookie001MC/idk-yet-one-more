import type BlogPost from '$lib/types/blogPost';
import { generateExcerpt } from '$lib/utils/generateExcerpt';

type ExcerptSource = Pick<BlogPost, 'content' | 'disableAutoExcerpt' | 'excerpt'>;

export function resolveBlogPostExcerpt(post: ExcerptSource): string {
	return post.excerpt || (post.disableAutoExcerpt ? '' : generateExcerpt(post.content ?? ''));
}

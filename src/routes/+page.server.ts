import { fetchLatestPosts } from '$lib/data/blogPosts';
import { getAssetUrl } from '$lib/data/directusFile';

export async function load({ fetch, setHeaders }) {
	try {
		const latestPosts = await fetchLatestPosts(
			6,
			['*', 'category.*', 'tags.tagsId.*', 'featuredImage.*'],
			fetch
		);

		const resolvedPosts = latestPosts.map((post) => {
			let featuredImageUrl = null;
			if (post.featuredImage && typeof post.featuredImage !== 'string') {
				featuredImageUrl = getAssetUrl(post.featuredImage, {
					width: 1200,
					height: 600,
					fit: 'cover'
				});
			}
			return {
				...post,
				featuredImageUrl
			};
		});

		setHeaders({
			'cache-control': 'public, s-maxage=3600, max-age=60'
		});

		return {
			latestPosts: resolvedPosts
		};
	} catch (error) {
		console.error('Home page load error:', error);
		return {
			latestPosts: []
		};
	}
}

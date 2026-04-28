import type { Meta, StoryObj } from '@storybook/sveltekit';
import PostCard from '../PostCard.svelte';
import type BlogPost from '$lib/types/blogPost';

const meta = {
	title: 'Components/PostCard',
	component: PostCard,
	tags: ['autodocs'],
	argTypes: {
		featured: { control: 'boolean' },
		compact: { control: 'boolean' }
	}
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockBlogPost: BlogPost = {
	id: 1,
	status: 'published',
	title: 'Sample Blog Post Title',
	slug: 'sample-blog-post',
	excerpt:
		'This is a sample excerpt for the blog post. It should be a few sentences long to demonstrate the excerpt functionality.',
	datePublished: '2026-04-26T10:00:00Z',
	featuredImage: {
		id: 'img-123',
		storage: 'local',
		filename_disk: 'img-123.jpg',
		filename_download: 'sample.jpg',
		title: 'Sample Featured Image',
		type: 'image/jpeg',
		folder: null,
		uploaded_by: null,
		uploaded_on: '2026-04-26T10:00:00Z',
		modified_by: null,
		modified_on: '2026-04-26T10:00:00Z',
		charset: null,
		filesize: 1024,
		width: 1920,
		height: 1080,
		duration: null,
		embed: null,
		description: null,
		location: null,
		tags: null,
		metadata: null
	},
	category: {
		id: 1,
		name: 'Technology',
		slug: 'technology',
		description: 'Posts about technology and programming',
		parent: null
	},
	tags: [{ tagsId: { id: 1, name: 'Svelte', slug: 'svelte' } }],
	content: '<p>This is the content of the blog post.</p>',
	user_created: 'user-123',
	date_created: '2026-04-26T10:00:00Z',
	user_updated: null,
	date_updated: null
};

export const Default: Story = {
	args: {
		post: mockBlogPost,
		featured: false,
		compact: false
	}
};

export const Featured: Story = {
	args: {
		post: mockBlogPost,
		featured: true,
		compact: false
	}
};

export const Compact: Story = {
	args: {
		post: mockBlogPost,
		featured: false,
		compact: true
	}
};

export const FeaturedAndCompact: Story = {
	args: {
		post: mockBlogPost,
		featured: true,
		compact: true
	}
};

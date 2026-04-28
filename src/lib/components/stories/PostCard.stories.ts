import type { Meta, StoryObj } from '@storybook/sveltekit';
import PostCard from '../PostCard.svelte';
import type { BlogPost } from '$lib/server/directus';

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
	title: 'Sample Blog Post Title',
	slug: 'sample-blog-post',
	excerpt:
		'This is a sample excerpt for the blog post. It should be a few sentences long to demonstrate the excerpt functionality.',
	datePublished: '2026-04-26T10:00:00Z',
	featuredImage: {
		id: 'img-123',
		title: 'Sample Featured Image'
	},
	category: {
		id: 1,
		name: 'Technology',
		slug: 'technology',
		description: 'Posts about technology and programming'
	},
	tags: [{ tagsId: { id: 1, name: 'Svelte', slug: 'svelte' } }],
	content: '<p>This is the content of the blog post.</p>'
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

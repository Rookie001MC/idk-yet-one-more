import type { Meta, StoryObj } from '@storybook/sveltekit';
import PageLayout from '../layouts/PageLayout.svelte';

const meta = {
	title: 'Layouts/PageLayout',
	component: PageLayout,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		description: { control: 'text' },
		featuredImage: { control: 'object' }
	}
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Sample Page Title',
		description: 'This is a description of the page, providing context for the content below.',
		// @ts-ignore
		children: 'This is the main content area of the page layout.'
	}
};

export const WithFeaturedImage: Story = {
	args: {
		title: 'Article with Image',
		description: 'An example of a page layout featuring a large banner image.',
		featuredImage: {
			src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200&h=400',
			alt: 'Tech background'
		},
		// @ts-ignore
		children: 'The content follows the header section.'
	}
};

export const Minimal: Story = {
	args: {
		// @ts-ignore
		children: 'A minimal page layout with only content and no header section.'
	}
};

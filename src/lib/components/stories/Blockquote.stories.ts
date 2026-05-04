import type { Meta, StoryObj } from '@storybook/sveltekit';
import BlockquoteDemo from './BlockquoteDemo.svelte';

const meta = {
	title: 'UI/Blockquote',
	component: BlockquoteDemo,
	tags: ['autodocs'],
	argTypes: {
		cite: { control: 'text' },
		children: { control: 'text' }
	}
} satisfies Meta<typeof BlockquoteDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		cite: 'Albert Einstein',
		children:
			"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."
	}
};

export const WithoutCite: Story = {
	args: {
		children: 'This is a blockquote without a citation footer.'
	}
};

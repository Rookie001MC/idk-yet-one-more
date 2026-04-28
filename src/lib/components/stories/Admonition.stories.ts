import type { Meta, StoryObj } from '@storybook/sveltekit';
import AdmonitionDemo from './AdmonitionDemo.svelte';

const meta = {
	title: 'UI/Admonition',
	component: AdmonitionDemo,
	tags: ['autodocs']
} satisfies Meta<typeof AdmonitionDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'note',
		title: 'Note',
		content:
			'This is a note admonition. It highlights information that users should take into account.'
	}
};

export const Tip: Story = {
	args: {
		variant: 'tip',
		title: 'Tip',
		content: 'This is a tip admonition. It provides useful advice or shortcuts.'
	}
};

export const Important: Story = {
	args: {
		variant: 'important',
		title: 'Important',
		content: 'This is an important admonition. It highlights crucial information.'
	}
};

export const Warning: Story = {
	args: {
		variant: 'warning',
		title: 'Warning',
		content: 'This is a warning admonition. It warns users about potential pitfalls.'
	}
};

export const Caution: Story = {
	args: {
		variant: 'caution',
		title: 'Caution',
		content: 'This is a caution admonition. It advises caution for dangerous operations.'
	}
};

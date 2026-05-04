import type { Meta, StoryObj } from '@storybook/sveltekit';
import MarkdownParser from '../markdown/MarkdownParser.svelte';

const meta = {
	title: 'Components/MarkdownParser',
	component: MarkdownParser,
	tags: ['autodocs'],
	argTypes: {
		content: { control: 'text' },
		inline: { control: 'boolean' }
	}
} satisfies Meta<typeof MarkdownParser>;

export default meta;
type Story = StoryObj<typeof meta>;

const markdownExample = `
# Markdown Parser Demo

This component parses markdown and uses custom Svelte components for certain elements.

## Admonitions (Alerts)

> [!NOTE]
> This is a note admonition rendered via the custom Admonition component.

> [!WARNING]
> This is a warning admonition.

## Blockquotes

> This is a standard blockquote. It also uses the custom Blockquote component.

## Inline Formatting

You can have **bold**, *italic*, and [links](https://google.com).
`;

export const Default: Story = {
	args: {
		content: markdownExample
	}
};

export const Simple: Story = {
	args: {
		content: 'Just some **bold** text and a [link](https://svelte.dev).'
	}
};

export const Inline: Story = {
	args: {
		content: 'This is **inline** markdown.',
		inline: true
	}
};

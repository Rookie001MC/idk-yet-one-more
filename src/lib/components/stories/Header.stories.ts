import type { Meta, StoryObj } from '@storybook/sveltekit';
import Header from '../Header.svelte';

const meta = {
	title: 'Components/Header',
	component: Header,
	tags: ['autodocs']
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

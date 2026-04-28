import type { Meta, StoryObj } from '@storybook/sveltekit';
import Footer from '../Footer.svelte';

const meta = {
	title: 'Components/Footer',
	component: Footer,
	tags: ['autodocs']
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

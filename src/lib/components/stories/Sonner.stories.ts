import type { Meta, StoryObj } from '@storybook/sveltekit';
import SonnerDemo from './SonnerDemo.svelte';

const meta = {
	title: 'UI/Sonner',
	component: SonnerDemo,
	tags: ['autodocs']
} satisfies Meta<typeof SonnerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

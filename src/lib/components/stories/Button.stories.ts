import type { Meta, StoryObj } from '@storybook/sveltekit';
import { Button } from '../ui/button';

const meta = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link']
		},
		size: {
			control: { type: 'select' },
			options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg']
		},
		href: { control: 'text' },
		label: { control: 'text' },
		disabled: { control: 'boolean' }
	},
	args: {
		variant: 'default',
		size: 'default',
		label: 'Button'
	}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: 'default',
		label: 'Default Button'
	}
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		label: 'Outline Button'
	}
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		label: 'Secondary Button'
	}
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		label: 'Ghost Button'
	}
};

export const Small: Story = {
	args: {
		size: 'sm',
		label: 'Small Button'
	}
};

export const Large: Story = {
	args: {
		size: 'lg',
		label: 'Large Button'
	}
};

export const AsLink: Story = {
	args: {
		href: 'https://google.com',
		label: 'Link Button'
	}
};

export const Disabled: Story = {
	args: {
		disabled: true,
		label: 'Disabled Button'
	}
};

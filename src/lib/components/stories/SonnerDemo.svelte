<script lang="ts">
	import { toast } from 'svelte-sonner';
	import Button from '$lib/components/ui/button/button.svelte';
	import Sonner from '$lib/components/ui/sonner/sonner.svelte';

	function showToast() {
		toast('Hello from Sonner!', {
			description: 'This is a toast message triggered from SvelteKit.'
		});
	}

	function showSuccess() {
		toast.success('Operation successful', {
			description: 'Everything went according to plan.'
		});
	}

	function showError() {
		toast.error('An error occurred', {
			description: 'Something went wrong. Please try again.'
		});
	}

	function showPromise() {
		const promise = new Promise<{ name: string }>((resolve) =>
			setTimeout(() => resolve({ name: 'SvelteKit' }), 2000)
		);

		toast.promise(promise, {
			loading: 'Loading...',
			success: (data) => {
				return `Successfully loaded ${data.name}`;
			},
			error: 'Error'
		});
	}
</script>

<div class="sonner-demo">
	<div class="flex flex-wrap gap-2">
		<Button onclick={showToast}>Default Toast</Button>
		<Button onclick={showSuccess} variant="secondary">Success Toast</Button>
		<Button onclick={showError} variant="secondary">Error Toast</Button>
		<Button onclick={showPromise} variant="outline">Promise Toast</Button>
	</div>

	<Sonner />
</div>

<style lang="scss">
	.sonner-demo {
		padding: var(--space-md);
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
	}

	.flex {
		display: flex;
	}

	.flex-wrap {
		flex-wrap: wrap;
	}

	.gap-2 {
		gap: 0.5rem;
	}
</style>

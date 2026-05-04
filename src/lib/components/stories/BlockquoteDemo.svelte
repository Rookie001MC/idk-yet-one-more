<script lang="ts">
	import Blockquote from '../ui/Blockquote.svelte';

	type Props = {
		cite?: string;
		children: string;
	};

	let { cite, children }: Props = $props();
</script>

<Blockquote {cite}>
	{children}
</Blockquote>

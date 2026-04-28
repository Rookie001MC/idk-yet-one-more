<script lang="ts">
	import { Admonition } from '../ui/admonition';
	
	interface Props {
		variant?: 'note' | 'tip' | 'warning' | 'caution';
		title?: string;
		content?: string;
	}

	let { variant = 'note', title, content }: Props = $props();
</script>

<Admonition {variant}>
	{#if title}
		<Admonition.Title>{title}</Admonition.Title>
	{/if}
	<Admonition.Description>
		<p>{content}</p>
	</Admonition.Description>
</Admonition>

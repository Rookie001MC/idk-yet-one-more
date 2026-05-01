<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { markedAlert } from '@humanspeak/svelte-markdown/extensions';

	// Custom UI components to wire into Svelte-Markdown
	import Admonition from '$lib/components/ui/admonition/index';
	import type { AdmonitionVariant } from '$lib/components/ui/admonition/index';
	import Blockquote from '$lib/components/ui/Blockquote.svelte';

	let {
		content,
		inline = false
	}: {
		content: string;
		inline?: boolean;
	} = $props();

	/**
	 * Custom renderers — add Svelte components here per token type, e.g.:
	 *   code: CodeBlockRenderer,
	 *   link: LinkRenderer,
	 */
	const renderers = {};
</script>

<SvelteMarkdown source={content ?? ''} {renderers} extensions={[markedAlert()]} isInline={inline}>
	{#snippet alert(props: { alertType: string; text: string })}
		<Admonition variant={props.alertType.toLowerCase() as AdmonitionVariant}>
			<Admonition.Title />
			<Admonition.Description>
				<!-- Content comes from trusted CMS, not user input -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html props.text}
			</Admonition.Description>
		</Admonition>
	{/snippet}

	{#snippet blockquote(props)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<Blockquote>{@html props.text}</Blockquote>
	{/snippet}
</SvelteMarkdown>

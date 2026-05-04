<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { markedAlert } from '@humanspeak/svelte-markdown/extensions';

	// Custom UI components to wire into Svelte-Markdown
	import Admonition from '$lib/components/ui/admonition/index';
	import type { AdmonitionVariant } from '$lib/components/ui/admonition/index';
	import Blockquote from '$lib/components/ui/Blockquote.svelte';
	import ImageRenderer from './ImageRenderer.svelte';

	// Self-import for recursive rendering of blockquote / alert inner content.
	// props.text is raw markdown, not HTML — so it must be parsed again to get
	// proper paragraph breaks, inline formatting, etc.
	import MarkdownParser from './MarkdownParser.svelte';

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
	const renderers = {
		image: ImageRenderer
	};
</script>

<SvelteMarkdown source={content ?? ''} {renderers} extensions={[markedAlert()]} isInline={inline}>
	{#snippet alert(props: { alertType: string; text: string })}
		<Admonition variant={props.alertType.toLowerCase() as AdmonitionVariant}>
			<Admonition.Title />
			<Admonition.Description>
				<MarkdownParser content={props.text ?? ''} />
			</Admonition.Description>
		</Admonition>
	{/snippet}

	{#snippet blockquote(props: { text?: string })}
		<Blockquote>
			<MarkdownParser content={props.text ?? ''} />
		</Blockquote>
	{/snippet}
</SvelteMarkdown>

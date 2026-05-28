<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import { markedAlert } from '@humanspeak/svelte-markdown/extensions';
	import type { HeadingSnippetProps } from '@humanspeak/svelte-markdown';

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

	{#snippet heading(props: HeadingSnippetProps)}
		{@const id = props.options.headerIds
			? (props.options.headerPrefix ?? '') + props.slug(props.text)
			: undefined}
		<svelte:element this={`h${props.depth}`} {id}>
			{@render props.children?.()}
		</svelte:element>
	{/snippet}
</SvelteMarkdown>

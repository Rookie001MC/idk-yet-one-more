<script lang="ts">
	import { Image } from '$lib/components/ui/image';

	// Props passed by @humanspeak/svelte-markdown for the `image` token.
	let { href, text, title }: { href: string; text: string; title?: string } = $props();
</script>

<!--
	`href` → the image src (external URL or static path)
	`text` → the alt text (markdown: ![alt text](url))
	`title` → optional title attribute (markdown: ![alt](url "title"))

	Images inside markdown are never above-the-fold, so lazy=true is always correct.
	Figcaption is wired to `title` if present, matching common markdown conventions.
-->
<Image src={href} alt={text} figcaption={title} />

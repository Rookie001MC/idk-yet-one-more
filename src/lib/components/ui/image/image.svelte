<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type DirectusFile from '$lib/types/directusFile';
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLImgAttributes } from 'svelte/elements';

	const isDev = import.meta.env.DEV;

	// -------------------------------------------------------------------------
	// Configuration
	// Change these to match your image-transmutation sourceFolder / targetFolder.
	// SvelteKit strips /static from public paths, so these are the URL paths.
	// -------------------------------------------------------------------------
	const STATIC_SOURCE_PREFIX = '/images';
	const STATIC_OPTIMIZED_PREFIX = '/optimized-images';

	const DEFAULT_WIDTHS = [400, 800, 1200, 1600];
	const DEFAULT_SIZES = '100vw';

	/** MIME types that Directus can transform and image-transmutation can optimise. */
	const SRCSET_SUPPORTED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

	/** Matches a bare Directus asset UUID (v4 format). */
	const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

	/**
	 * Matches the /assets/<uuid> segment inside any URL or path.
	 * Captures the UUID so we can re-route the request through the local proxy.
	 * Handles both full Directus URLs (https://cms.../assets/<id>) and proxy paths (/api/assets/<id>).
	 */
	const DIRECTUS_ASSET_URL_RE =
		/\/assets\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(?:[/?#]|$)/i;

	// -------------------------------------------------------------------------
	// Props
	// -------------------------------------------------------------------------
	interface Props extends Omit<HTMLImgAttributes, 'src' | 'srcset' | 'sizes'> {
		/**
		 * Accepts:
		 *  - A Directus `DirectusFile` object (fetched with `featuredImage.*`)
		 *  - A bare Directus asset UUID string (e.g. `"a1b2c3d4-e5f6-..."`) — srcset built via Directus transforms
		 *  - A static path string starting with `/` (e.g. `/images/hero.jpg`)
		 *  - An external URL string (https://...) — passed through, no srcset
		 */
		src: string | DirectusFile;
		alt: string;
		/** Optional caption — wraps the image in a <figure> element. Supports raw HTML. */
		figcaption?: string;
		/** Defaults to true (lazy). Pass false for above-the-fold images. */
		lazy?: boolean;
		/**
		 * Responsive widths used to build the srcset.
		 * Defaults to [400, 800, 1200, 1600].
		 */
		widths?: number[];
		/**
		 * The `sizes` attribute tells the browser how wide the image will be rendered.
		 * Defaults to '100vw'. Override for constrained layouts, e.g.:
		 *   '(min-width: 1200px) 740px, 100vw'
		 */
		sizes?: string;
		/**
		 * JPEG/WebP/AVIF quality passed to Directus. 1–100, default 80.
		 * Has no effect on static/external images.
		 */
		quality?: number;
		/**
		 * Directus resize fit mode. Defaults to 'cover'.
		 * Has no effect on static/external images.
		 */
		fit?: 'cover' | 'contain' | 'inside' | 'outside';
		/**
		 * Skip generating Source sets
		 */
		skipSrcset?: boolean;
		/** Show a loading placeholder until the image finishes loading. */
		skeleton?: boolean;
		/** Override the reserved image ratio, e.g. "16 / 9". */
		aspectRatio?: string;
		/** Extra classes for the loading placeholder. */
		skeletonClass?: string;
		class?: string;
	}

	let {
		src,
		alt,
		figcaption,
		lazy = true,
		widths = DEFAULT_WIDTHS,
		sizes = DEFAULT_SIZES,
		quality = 80,
		fit = 'cover',
		class: className = '',
		skipSrcset = false,
		skeleton = true,
		aspectRatio,
		skeletonClass = '',
		width = undefined,
		height = undefined,
		onload = undefined,
		onerror = undefined,
		...imgProps
	}: Props = $props();

	let isLoaded = $state(false);
	let hasError = $state(false);

	// -------------------------------------------------------------------------
	// Source type detection
	// -------------------------------------------------------------------------
	function isDirectusFile(s: string | DirectusFile): s is DirectusFile {
		return typeof s === 'object' && s !== null && 'id' in s;
	}

	/** True when `s` is a bare Directus asset UUID (no leading slash, no protocol). */
	function isDirectusUuid(s: string | DirectusFile): s is string {
		return typeof s === 'string' && UUID_RE.test(s);
	}

	/**
	 * Returns the Directus asset ID from any of:
	 *  - A DirectusFile object               → s.id
	 *  - A bare UUID string                   → s
	 *  - A URL/path containing /assets/<uuid> → the captured UUID
	 *    (handles https://cms.host/assets/<id>, /api/assets/<id>, etc.)
	 */
	function getDirectusId(s: string | DirectusFile): string | null {
		if (isDirectusFile(s)) return s.id;
		if (isDirectusUuid(s)) return s;
		if (typeof s === 'string') {
			const m = DIRECTUS_ASSET_URL_RE.exec(s);
			if (m) return m[1];
		}
		return null;
	}

	function isExternalUrl(s: string): boolean {
		return /^https?:\/\//.test(s);
	}

	function isStaticPath(s: string): boolean {
		return s.startsWith('/') && !isExternalUrl(s);
	}

	/**
	 * Returns true only for image types that benefit from srcset + format conversion.
	 * SVGs are resolution-independent and need no variants.
	 * GIFs may be animated — format conversion would break them.
	 * For Directus files we use the MIME type; for static paths we fall back to extension.
	 * For bare UUIDs we assume Directus can handle the transform (optimistic).
	 */
	function supportsSrcset(): boolean {
		if (isDirectusFile(src)) return SRCSET_SUPPORTED_MIME.has(src.type);
		if (isDirectusUuid(src)) return true; // bare UUID — Directus handles format conversion
		if (typeof src === 'string' && DIRECTUS_ASSET_URL_RE.test(src)) return true; // full/partial Directus URL
		if (isDev || skipSrcset) return false;
		if (typeof src === 'string' && isStaticPath(src)) {
			return /\.(png|jpe?g|webp|avif)$/i.test(src);
		}
		return false; // other external URLs pass through as-is
	}

	const canUseSrcset = $derived(supportsSrcset());

	// -------------------------------------------------------------------------
	// URL builders
	// -------------------------------------------------------------------------

	/**
	 * Builds a Directus asset URL through the same-origin proxy at /api/assets/[id].
	 * Using the proxy keeps Directus off-limits to the browser (no CORS / ORB issues),
	 * injects the bearer token server-side, and forwards the correct Content-Type.
	 */
	function directusUrl(id: string, width: number, format: string): string {
		const params = new URLSearchParams({
			width: String(width),
			format,
			quality: String(quality),
			fit,
			withoutEnlargement: 'true'
		});
		return `/api/assets/${id}?${params.toString()}`;
	}

	/**
	 * Builds a static optimized-image URL following image-transmutation's convention:
	 *   /images/hero.png  →  /optimized-images/hero-{width}.{format}
	 *
	 * Handles jpeg → png normalisation the same way image-transmutation does when
	 * you include 'png' as an output format.
	 */
	function staticUrl(path: string, width: number, format: string): string {
		const optimized = path.replace(STATIC_SOURCE_PREFIX, STATIC_OPTIMIZED_PREFIX);
		// Strip original extension; image-transmutation always names outputs by stem.
		const stem = optimized.replace(/\.[^./]+$/, '');
		return `${stem}-${width}w.${format}`;
	}

	// -------------------------------------------------------------------------
	// Srcset builders — returns undefined for external URLs (no srcset possible)
	// -------------------------------------------------------------------------
	function buildSrcset(format: string): string | undefined {
		const id = getDirectusId(src);
		if (id) {
			return widths.map((w) => `${directusUrl(id, w, format)} ${w}w`).join(', ');
		}
		if (typeof src === 'string' && isStaticPath(src)) {
			return widths.map((w) => `${staticUrl(src, w, format)} ${w}w`).join(', ');
		}
		return undefined; // external URL — pass through
	}

	// -------------------------------------------------------------------------
	// Derived values
	// -------------------------------------------------------------------------

	/** The <img src> fallback. For Directus (object or UUID): largest width as JPEG. For everything else: original. */
	const fallbackSrc = $derived(
		(() => {
			const id = getDirectusId(src);
			return id ? directusUrl(id, widths[widths.length - 1], 'jpg') : (src as string);
		})()
	);

	const avifSrcset = $derived(canUseSrcset ? buildSrcset('avif') : undefined);
	const webpSrcset = $derived(canUseSrcset ? buildSrcset('webp') : undefined);

	/**
	 * Fallback srcset on <img> itself (png for static, jpg for Directus/UUID).
	 * For external URLs this stays undefined so the browser just uses `src`.
	 */
	const fallbackSrcset = $derived(
		canUseSrcset
			? getDirectusId(src) !== null
				? buildSrcset('jpg') // any Directus source → jpg fallback
				: typeof src === 'string' && isStaticPath(src)
					? buildSrcset('png')
					: undefined
			: undefined
	);

	const loading = $derived(lazy ? 'lazy' : 'eager');
	const imageClasses = $derived(['cms-image', className].filter(Boolean).join(' '));
	const skeletonClasses = $derived(['cms-image-skeleton', skeletonClass].filter(Boolean).join(' '));
	const classTokens = $derived(className.split(/\s+/).filter(Boolean));
	const shouldUseAbsoluteShell = $derived(classTokens.includes('hero-bg'));
	const shouldUseContentSpacing = $derived(classTokens.includes('content-image'));

	function toPositiveNumber(value: string | number | null | undefined): number | null {
		if (typeof value === 'number') return value > 0 ? value : null;
		if (typeof value === 'string') {
			const parsed = Number(value);
			return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
		}
		return null;
	}

	function getIntrinsicAspectRatio(): string | undefined {
		if (aspectRatio) return aspectRatio;
		if (isDirectusFile(src) && src.width && src.height) return `${src.width} / ${src.height}`;

		const imageWidth = toPositiveNumber(width);
		const imageHeight = toPositiveNumber(height);
		return imageWidth && imageHeight ? `${imageWidth} / ${imageHeight}` : undefined;
	}

	const resolvedAspectRatio = $derived(getIntrinsicAspectRatio());
	const shellClasses = $derived(
		[
			'cms-image-shell',
			shouldUseAbsoluteShell && 'cms-image-shell--absolute',
			shouldUseContentSpacing && 'cms-image-shell--content',
			resolvedAspectRatio && 'cms-image-shell--has-ratio',
			isLoaded && 'cms-image-shell--loaded',
			hasError && 'cms-image-shell--error'
		]
			.filter(Boolean)
			.join(' ')
	);
	const shellStyle = $derived(
		resolvedAspectRatio ? `aspect-ratio: ${resolvedAspectRatio}` : undefined
	);
	const showSkeleton = $derived(skeleton && !isLoaded);
	type ImageEvent = Event & { currentTarget: EventTarget & HTMLImageElement };

	function handleLoad(event: Event) {
		isLoaded = true;
		hasError = false;
		onload?.(event as ImageEvent);
	}

	function handleError(event: Event) {
		isLoaded = true;
		hasError = true;
		onerror?.(event as ImageEvent);
	}

	function trackImageState(source: string): Attachment<HTMLImageElement> {
		return (node) => {
			isLoaded = false;
			hasError = false;
			if (!source) return;

			queueMicrotask(() => {
				if (!node.complete) return;

				isLoaded = true;
				hasError = node.naturalWidth === 0;
			});
		};
	}
</script>

<!--
	Renders a responsive <picture> element with avif/webp sources and a
	fallback <img>. Wraps in <figure> when a figcaption is provided.

	Usage — Directus asset object:
	  <Image src={post.featuredImage} alt="..." sizes="(min-width:1200px) 740px, 100vw" />

	Usage — bare Directus UUID (e.g. when relation not expanded):
	  <Image src="a1b2c3d4-e5f6-7890-abcd-ef1234567890" alt="..." />

	Usage — static asset (requires image-transmutation to have processed /images → /optimized-images):
	  <Image src="/images/hero.jpg" alt="..." />

	Usage — external URL (no srcset, pass-through):
	  <Image src="https://example.com/photo.jpg" alt="..." />
-->

{#snippet img()}
	<div class={shellClasses} style={shellStyle}>
		{#if showSkeleton}
			<Skeleton class={skeletonClasses} />
		{/if}

		<picture class="cms-image-picture">
			{#if avifSrcset}
				<source srcset={avifSrcset} {sizes} type="image/avif" />
			{/if}
			{#if webpSrcset}
				<source srcset={webpSrcset} {sizes} type="image/webp" />
			{/if}
			<img
				{@attach trackImageState(fallbackSrc)}
				src={fallbackSrc}
				srcset={fallbackSrcset || undefined}
				{sizes}
				{alt}
				{loading}
				{width}
				{height}
				decoding="async"
				class={imageClasses}
				onload={handleLoad}
				onerror={handleError}
				{...imgProps}
			/>
		</picture>
	</div>
{/snippet}

{#if figcaption}
	<figure class="cms-image-figure">
		{@render img()}
		<figcaption class="cms-image-caption">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html figcaption}
		</figcaption>
	</figure>
{:else}
	{@render img()}
{/if}

<style lang="scss">
	.cms-image-shell {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.cms-image-shell--absolute {
		position: absolute;
		inset: 0;
	}

	.cms-image-shell--content {
		margin: var(--space-lg) 0;
		border-radius: var(--radius-md);
	}

	.cms-image-picture,
	.cms-image {
		display: block;
		width: 100%;
	}

	.cms-image-shell--has-ratio .cms-image-picture,
	.cms-image-shell--has-ratio .cms-image {
		height: 100%;
	}

	.cms-image-shell--has-ratio .cms-image {
		object-fit: cover;
	}

	.cms-image-shell--content .cms-image {
		margin: 0;
	}

	.cms-image-skeleton {
		position: absolute;
		inset: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		pointer-events: none;
	}

	.cms-image-shell--loaded .cms-image {
		animation: cms-image-fade-in 0.2s ease-out both;
	}

	@keyframes cms-image-fade-in {
		from {
			opacity: 0;
		}
	}

	.cms-image-figure {
		margin: 0;
	}

	.cms-image-caption {
		display: block;
		margin-top: 0.5em;
		font-size: var(--font-size-sm, 0.875rem);
		color: var(--color-text-muted);
		text-align: center;
		font-style: italic;
	}
</style>

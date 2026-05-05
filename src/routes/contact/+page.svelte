<script lang="ts">
	import PageLayout from '$lib/components/layouts/PageLayout.svelte';
	import { SiInstagram } from '@icons-pack/svelte-simple-icons';
	import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="Contact" description="Drop me a hello! I'd love to hear from you." />

<PageLayout
	title="Contact"
	description="Drop me a hello!"
	featuredImage={{
		src: 'https://itsrookienguyen.me/wp-content/uploads/2026/04/the-film-cam-1024x700.jpg',
		alt: 'Contact Hero'
	}}
>
	<div class="contact-content">
		<p>
			Feel free to write for any reason! No matter what's on your mind, I'm happy to listen. (Rest
			assured, no spam here!)
		</p>

		<hr />

		<div class="contact-links">
			<p>
				Email: <a href="mailto:nhqthang@itsrookienguyen.me" class="accent-link"
					>nhqthang@itsrookienguyen.me</a
				>
			</p>
			<p>
				Instagram: <a
					href="https://instagram.com/realrookie001"
					target="_blank"
					rel="noopener noreferrer"
					class="accent-link inline-flex"
				>
					<SiInstagram size={18} /> @realrookie001
				</a>
			</p>
		</div>

		<div class="signature-section">
			<img
				src="https://itsrookienguyen.me/wp-content/uploads/2026/04/qthang_signature.png"
				alt="Signature"
				class="signature-image"
			/>
		</div>
	</div>
</PageLayout>

<style lang="scss">
	.contact-content {
		p {
			margin-bottom: var(--space-md);
		}
	}

	.contact-links {
		margin: var(--space-lg) 0;

		p {
			margin-bottom: var(--space-xs);
		}
	}

	.accent-link {
		color: var(--color-accent);
		text-decoration: underline;

		&:hover {
			opacity: 0.8;
		}

		&.inline-flex {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	.signature-section {
		margin-top: var(--space-xl);

		.signature-image {
			max-width: 200px;
			filter: invert(1); // Since our theme is dark and the signature is likely dark on light
			opacity: 0.8;
		}
	}
</style>

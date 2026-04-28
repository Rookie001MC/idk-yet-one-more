<script lang="ts">
	import PageLayout from '$lib/components/layouts/PageLayout.svelte';
</script>

<PageLayout title="Privacy Policy">
	<div class="prose">
		<p class="lead">TL;DR: I don't collect your personal info.</p>
		<hr />
		<p class="footer-note">Last updated: April 2026</p>

		<section>
			<h2>Why this exists</h2>
			<p>
				Privacy is a fundamental right. In an era where data is often harvested without consent, I
				want to be transparent about how this blog operates. I aim to keep this space as private and
				secure as possible for both of us.
			</p>
		</section>

		<section>
			<h2>Analytics</h2>
			<p>
				I use <strong>Umami Analytics</strong> to understand how people use my blog. Umami is a privacy-focused,
				self-hosted analytics tool.
			</p>
			<ul>
				<li>It does <strong>not</strong> use cookies.</li>
				<li>It does <strong>not</strong> track you across websites.</li>
				<li>It does <strong>not</strong> collect any personally identifiable information (PII).</li>
				<li>All data is anonymized.</li>
			</ul>
		</section>

		<section>
			<h2>Infrastructure</h2>
			<p>
				This website is hosted on <strong>Cloudflare Pages</strong>. Cloudflare acts as a reverse
				proxy and may collect some technical data (like your IP address) for security purposes, such
				as DDoS protection. This data is handled according to Cloudflare's privacy policy.
			</p>
		</section>

		<section>
			<h2>Embedded Content</h2>
			<p>
				Posts on this site may include embedded content (e.g. videos, images, articles, etc.).
				Embedded content from other websites behaves in the exact same way as if the visitor has
				visited the other website.
			</p>
			<p>
				These websites may collect data about you, use cookies, embed additional third-party
				tracking, and monitor your interaction with that embedded content.
			</p>
		</section>

		<section>
			<h2>Cookies</h2>
			<p>
				Since I do not have a login system or comments (handled externally if any), I do not set any
				first-party tracking cookies.
			</p>
		</section>
	</div>
</PageLayout>

<style lang="scss">
	.prose {
		.lead {
			font-size: 1.25em;
			font-weight: 500;
			margin-bottom: var(--space-md);
		}

		section {
			margin-bottom: var(--space-lg);
		}

		h2 {
			font-family: var(--font-heading);
			font-size: var(--font-size-h2);
			margin-bottom: var(--space-sm);
		}

		ul {
			margin: var(--space-md) 0;
			padding-left: var(--space-md);

			li {
				margin-bottom: var(--space-xs);
			}
		}

		.footer-note {
			font-size: var(--font-size-md);
			color: var(--color-text-muted);
		}
	}
</style>

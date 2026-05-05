<script lang="ts">
	import siteConfig from '$lib/config';
	import Logo from '$lib/assets/qthang_signature.png?inline';
	let { title, description, category }: { title: string; description: string; category?: string } =
		$props();
</script>

<div
	style="display: flex; flex-direction: column; width: 100%; height: 100%; background: linear-gradient(135deg, #100d2e 0%, #1a1640 100%); padding: 80px; font-family: 'EB Garamond', system-ui, -apple-system, sans-serif;"
>
	<div style="display: flex; flex-direction: column; flex: 1; justify-content: space-between;">
		<div style="display: flex; flex-direction: column; gap: 20px;">
			<img src={Logo} alt="" />
			{#if category}
				<div
					style="color: #a78bfa; font-size: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;"
				>
					{category}
				</div>
			{/if}
			<h1
				style="color: #ffffff; font-size: 64px; font-weight: 700; line-height: 1.1; max-width: 900px; margin: 0; font-family: 'Instrument Serif', system-ui, -apple-system, serif;"
			>
				{title}
			</h1>
			<p style="color: #9ca3af; font-size: 28px; line-height: 1.5; max-width: 800px; margin: 0;">
				{description}
			</p>
		</div>
		<div style="display: flex; align-items: center; justify-content: space-between;">
			<div style="color: #6b7280; font-size: 24px;">{siteConfig.name}</div>
			<div style="color: #6b7280; font-size: 24px;">itsrookienguyen.me</div>
		</div>
	</div>
</div>

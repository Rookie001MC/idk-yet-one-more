import { defineBaseMetaTags } from 'svelte-meta-tags';
import { PUBLIC_BASE_URL } from '$env/static/public';
import siteConfig from '$lib/config';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	const canonical = `${PUBLIC_BASE_URL}${url.pathname}`;

	return defineBaseMetaTags({
		titleTemplate: `%s | ${siteConfig.name}`,
		description: siteConfig.description,
		canonical,
		openGraph: {
			type: 'website',
			url: canonical,
			siteName: siteConfig.name,
			description: siteConfig.description,
			images: [
				{
					url: `${PUBLIC_BASE_URL}/opengraph`,
					width: 1200,
					height: 630,
					type: 'image/png'
				}
			]
		},
		twitter: {
			cardType: 'summary_large_image',
			description: siteConfig.description
		}
	});
};

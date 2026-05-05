import { type RequestHandler } from '@sveltejs/kit';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import { read } from '$app/server';
import { CustomFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import siteConfig from '$lib/config';
import OGCard from '$lib/components/opengraph/OGCard.svelte';

import HeadingFontPath from '$lib/components/opengraph/fonts/InstrumentSerif-Regular.ttf?url';
import BodyFontPath from '$lib/components/opengraph/fonts/EBGaramond-Medium.ttf?url';

const CustomHeading = new CustomFont(
	'Instrument Serif',
	() => read(HeadingFontPath).arrayBuffer(),
	{ weight: 400 }
);

const CustomBody = new CustomFont('EB Garamond', () => read(BodyFontPath).arrayBuffer(), {
	weight: 500
});

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') || siteConfig.name;
	const description = url.searchParams.get('description') || siteConfig.description;
	const category = url.searchParams.get('category') || undefined;

	const resolvedFonts = await resolveFonts([CustomHeading, CustomBody]);

	return new ImageResponse(
		OGCard,
		{
			width: 1200,
			height: 630,
			headers: {
				'Cache-Control': 'public, max-age=31536000, immutable'
			},
			fonts: resolvedFonts
		},
		{
			title,
			description,
			category
		}
	);
};

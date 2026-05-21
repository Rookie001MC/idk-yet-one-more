import { definePageMetaTags } from 'svelte-meta-tags';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';

const description = 'A bit about myself - Rookie Nguyen, broadcast engineer, photographer, and web developer.';

export const load: PageLoad = () =>
	definePageMetaTags({
		title: 'About',
		description,
		openGraph: {
			title: 'About',
			description,
			images: [
				{
					url: `${PUBLIC_BASE_URL}/opengraph?title=About&description=A+bit+about+myself+%E2%80%94+Rookie+Nguyen`,
					width: 1200,
					height: 630,
					type: 'image/png'
				}
			]
		},
		twitter: {
			title: 'About',
			description,
			image: `${PUBLIC_BASE_URL}/opengraph?title=About&description=A+bit+about+myself+%E2%80%94+Rookie+Nguyen`
		}
	});

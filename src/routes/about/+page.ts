import { PUBLIC_BASE_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	meta: {
		title: 'About',
		description:
			'A bit about myself - Rookie Nguyen, broadcast engineer, photographer, and web developer.',
		imageUrl: `${PUBLIC_BASE_URL}/opengraph?title=About&description=A+bit+about+myself+%E2%80%94+Rookie+Nguyen`
	}
});

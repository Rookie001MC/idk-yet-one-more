import { definePageMetaTags } from 'svelte-meta-tags';
import type { PageLoad } from './$types';

export const load: PageLoad = () =>
	definePageMetaTags({
		title: 'Contact',
		description: "Drop me a hello! I'd love to hear from you."
	});

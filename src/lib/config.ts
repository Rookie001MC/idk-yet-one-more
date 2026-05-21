import { SiFacebook, SiInstagram, SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';
import { Mail } from '@lucide/svelte';
import { PUBLIC_BASE_URL } from '$env/static/public';

const siteConfig = {
	name: "Rookie's Blog",
	description: 'A blog about my life, my thoughts, my experiences, and many more.',
	baseUrl: PUBLIC_BASE_URL || 'https://itsrookienguyen.me',
	social: {
		facebook:  { name: 'Facebook',  url: 'https://facebook.com/realrookie001',            icon: SiFacebook  },
		instagram: { name: 'Instagram', url: 'https://instagram.com/realrookie001',            icon: SiInstagram },
		bluesky:   { name: 'Bluesky',   url: 'https://bsky.app/profile/itsrookienguyen.me',   icon: SiBluesky   },
		email:     { name: 'Email',     url: 'mailto:nhqthang@itsrookienguyen.me',             icon: Mail        },
		github:    { name: 'GitHub',    url: 'https://github.com/rookie001mc',                 icon: SiGithub    },
	},
	mainMenu: [
		{ label: 'Home', path: '/' },
		{ label: 'About', path: '/about' },
		{ label: 'Blog', path: '/blog' },
		{ label: 'Contact', path: '/contact' }
	],
	leftFooterMenu: [
		{ label: 'Home', path: '/' },
		{ label: 'About', path: '/about' },
		{ label: 'Blog', path: '/blog' }
	],
	rightFooterMenu: [
		{ label: 'Contact', path: '/contact' },
		{ label: 'Privacy Policy', path: '/privacy-policy' }
	]
} as const;

export default siteConfig;

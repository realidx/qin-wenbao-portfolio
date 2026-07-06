import type { AstroInstance } from 'astro';
import { ExternalLink } from 'lucide-astro';

export interface SocialLink {
	name: string;
	url: string;
	icon: AstroInstance;
}

export default {
	title: 'Qin Wenbao',
	favicon: 'favicon.ico',
	owner: 'Qin Wenbao',
	profileImage: 'profile.webp',
	email: '',
	wechat: '',
	tagline: 'Stage Design and Theatre Costume Portfolio',
	socialLinks: [
		{
			name: 'NACTA Faculty Profile',
			url: 'https://www.nacta.edu.cn/jsdw/wtmsx/js_e940563983434c40b9d2b90b4159b329/9f7849e8ee0b41c284debca0c1bd46fe.htm',
			icon: ExternalLink,
		} as SocialLink,
	],
};

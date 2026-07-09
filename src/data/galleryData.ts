export interface WorkImage {
	src: string;
	title: string;
	caption?: string;
	type?: string;
}

export interface Work {
	id: string;
	title: string;
	subtitle?: string;
	year: string;
	category: string;
	type: string;
	role: string;
	cover: string;
	description: string;
	images: WorkImage[];
	featured?: boolean;
	order?: number;
}

export interface Exhibition {
	id: string;
	title: string;
	subtitle?: string;
	year: string;
	location: string;
	role: string;
	cover: string;
	description: string;
	document?: string;
	images: WorkImage[];
	featured?: boolean;
	order?: number;
}

export interface Image {
	src: string;
	title: string;
	description: string;
	type?: string;
}

import type { ImageMetadata } from 'astro';
import path from 'path';
import { promises as fs } from 'fs';
import * as yaml from 'js-yaml';

export interface GalleryData {
	albums: WorkAlbum[];
}

export interface WorkAlbum {
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

export interface WorkImage {
	src: string;
	title: string;
	caption?: string;
	type?: string;
}

export interface Image {
	src: ImageMetadata;
	title: string;
	description: string;
	type?: string;
}

export interface Work extends WorkAlbum {
	coverImage: ImageMetadata;
	galleryImages: Image[];
}

export type ImageModule = { default: ImageMetadata };

export const loadGallery = async (galleryPath: string): Promise<GalleryData> => {
	const yamlPath = path.resolve(process.cwd(), galleryPath);
	const content = await fs.readFile(yamlPath, 'utf8');
	return yaml.load(content) as GalleryData;
};

export const NullGalleryData: GalleryData = {
	albums: [],
};

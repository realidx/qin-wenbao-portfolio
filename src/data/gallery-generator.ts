import { program } from 'commander';
import * as fs from 'node:fs';
import yaml from 'js-yaml';
import path from 'path';
import fg from 'fast-glob';
import { type GalleryData, type WorkAlbum, loadGallery, NullGalleryData } from './galleryData.ts';

const defaultGalleryFileName = 'gallery.yaml';
const supportedImageExtensions = '{jpg,jpeg,png,webp}';

async function generateGalleryFile(galleryDir: string): Promise<void> {
	try {
		const existingGallery = await loadExistingGallery(galleryDir);
		const generatedGallery = await createGalleryObjFrom(galleryDir);
		const mergedGallery = mergeGalleriesObj(existingGallery, generatedGallery);
		await writeGalleryYaml(galleryDir, mergedGallery);
	} catch (error) {
		console.error('Failed to create gallery file:', error);
		process.exit(1);
	}
}

async function loadExistingGallery(galleryDir: string) {
	const existingGalleryFile = path.join(galleryDir, defaultGalleryFileName);
	if (fs.existsSync(existingGalleryFile)) {
		return await loadGallery(existingGalleryFile);
	}
	return NullGalleryData;
}

function mergeGalleriesObj(targetGalleryObj: GalleryData, sourceGalleryObj: GalleryData): GalleryData {
	const albumsMap = new Map(targetGalleryObj.albums.map((album) => [album.id, album]));

	sourceGalleryObj.albums.forEach((album) => {
		const existingAlbum = albumsMap.get(album.id);
		albumsMap.set(album.id, existingAlbum ? mergeAlbum(existingAlbum, album) : album);
	});

	return {
		albums: Array.from(albumsMap.values()).sort((a, b) => {
			const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
			const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
			return orderA - orderB;
		}),
	};
}

function mergeAlbum(existingAlbum: WorkAlbum, generatedAlbum: WorkAlbum): WorkAlbum {
	const existingImages = new Map(existingAlbum.images.map((image) => [image.src, image]));

	generatedAlbum.images.forEach((image) => {
		if (!existingImages.has(image.src)) {
			existingImages.set(image.src, image);
		}
	});

	return {
		...generatedAlbum,
		...existingAlbum,
		images: Array.from(existingImages.values()),
	};
}

async function createGalleryObjFrom(galleryDir: string): Promise<GalleryData> {
	const coverFiles = await fg(`${galleryDir}/*/cover.${supportedImageExtensions}`, {
		dot: false,
	});

	return {
		albums: await Promise.all(coverFiles.map((coverFile) => createAlbum(galleryDir, coverFile))),
	};
}

async function createAlbum(galleryDir: string, coverFile: string): Promise<WorkAlbum> {
	const albumDir = path.dirname(coverFile);
	const id = path.basename(albumDir);
	const files = await fg(`${albumDir}/*.${supportedImageExtensions}`, {
		dot: false,
	});
	const imageFiles = files
		.filter((file) => path.basename(file) !== path.basename(coverFile))
		.sort((a, b) => a.localeCompare(b));

	return {
		id,
		title: toReadableTitle(id),
		subtitle: '',
		year: new Date().getFullYear().toString(),
		category: 'Uncategorized',
		type: 'Stage Costume Design',
		role: 'Role / Theme',
		cover: path.posix.join(id, path.basename(coverFile)),
		description: 'Add a work description.',
		images: imageFiles.map((file) => ({
			src: path.posix.join(id, path.basename(file)),
			title: toReadableTitle(path.basename(file, path.extname(file))),
			caption: '',
			type: 'stage_photo',
		})),
		featured: false,
		order: Number.MAX_SAFE_INTEGER,
	};
}

function toReadableTitle(input: string): string {
	return input
		.replace(/[-_]+/g, ' ')
		.split(' ')
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

async function writeGalleryYaml(galleryDir: string, galleryObj: GalleryData) {
	const filePath = path.join(galleryDir, defaultGalleryFileName);
	await fs.promises.writeFile(filePath, yaml.dump(galleryObj, { lineWidth: 100 }), 'utf8');
	console.log('Gallery file created/updated successfully at:', filePath);
}

program.argument('<path to images directory>');
program.parse();

const directoryPath = program.args[0];
if (!directoryPath || !fs.existsSync(directoryPath)) {
	console.error('Invalid directory path provided.');
	process.exit(1);
}

(async () => {
	await generateGalleryFile(directoryPath);
})().catch((error) => {
	console.error('Unhandled error:', error);
	process.exit(1);
});

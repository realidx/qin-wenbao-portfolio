import path from 'path';
import {
	type GalleryData,
	type Image,
	type ImageModule,
	type Work,
	type WorkAlbum,
	type WorkImage,
	loadGallery,
} from './galleryData.ts';

export class ImageStoreError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ImageStoreError';
	}
}

const imageModules = import.meta.glob('/src/**/*.{jpg,jpeg,png,gif,webp}', {
	eager: true,
});

const defaultGalleryPath = 'src/gallery/gallery.yaml';

export const getWorks = async (galleryPath: string = defaultGalleryPath): Promise<Work[]> => {
	const gallery = await loadGalleryData(galleryPath);
	return gallery.albums.map((album) => processWork(album, galleryPath)).sort(sortWorks);
};

export const getFeaturedWorks = async (
	galleryPath: string = defaultGalleryPath,
): Promise<Work[]> => {
	return (await getWorks(galleryPath)).filter((work) => work.featured);
};

export const getWork = async (
	id: string | undefined,
	galleryPath: string = defaultGalleryPath,
): Promise<Work | undefined> => {
	if (!id) return undefined;
	return (await getWorks(galleryPath)).find((work) => work.id === id);
};

export const getImagesForWork = async (
	id: string | undefined,
	galleryPath: string = defaultGalleryPath,
): Promise<Image[]> => {
	const work = await getWork(id, galleryPath);
	return work?.galleryImages ?? [];
};

export const getHeroWork = async (galleryPath: string = defaultGalleryPath): Promise<Work> => {
	const [firstFeatured] = await getFeaturedWorks(galleryPath);
	const [firstWork] = await getWorks(galleryPath);
	const heroWork = firstFeatured ?? firstWork;

	if (!heroWork) {
		throw new ImageStoreError('No works found in gallery data.');
	}

	return heroWork;
};

const loadGalleryData = async (galleryPath: string): Promise<GalleryData> => {
	try {
		const gallery = await loadGallery(galleryPath);
		validateGalleryData(gallery);
		return gallery;
	} catch (error) {
		throw new ImageStoreError(
			`Failed to load gallery data from ${galleryPath}: ${getErrorMsgFrom(error)}`,
		);
	}
};

function validateGalleryData(gallery: GalleryData) {
	if (!Array.isArray(gallery.albums)) {
		throw new ImageStoreError('gallery.yaml must contain an albums array.');
	}

	const ids = new Set<string>();
	for (const album of gallery.albums) {
		if (ids.has(album.id)) {
			throw new ImageStoreError(`Duplicate album id: ${album.id}`);
		}
		ids.add(album.id);

		if (!album.cover) {
			throw new ImageStoreError(`Album ${album.id} is missing a cover image.`);
		}

		if (!Array.isArray(album.images) || album.images.length === 0) {
			throw new ImageStoreError(`Album ${album.id} must contain at least one image.`);
		}
	}
}

function processWork(album: WorkAlbum, galleryPath: string): Work {
	return {
		...album,
		coverImage: resolveImage(album.cover, galleryPath),
		galleryImages: album.images.map((image) => processGalleryImage(image, galleryPath)),
	};
}

function processGalleryImage(image: WorkImage, galleryPath: string): Image {
	return {
		src: resolveImage(image.src, galleryPath),
		title: image.title,
		description: image.caption ?? '',
		type: image.type,
	};
}

function resolveImage(relativeImagePath: string, galleryPath: string) {
	const imagePath = path.posix.join('/', path.parse(galleryPath).dir, relativeImagePath);
	const imageModule = imageModules[imagePath] as ImageModule | undefined;

	if (!imageModule) {
		throw new ImageStoreError(`Image not found: ${imagePath}`);
	}

	return imageModule.default;
}

function sortWorks(a: Work, b: Work) {
	const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
	const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

	if (orderA !== orderB) {
		return orderA - orderB;
	}

	return b.year.localeCompare(a.year);
}

function getErrorMsgFrom(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}

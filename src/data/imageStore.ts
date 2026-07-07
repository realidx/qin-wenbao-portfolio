import type { Image, Work, WorkImage } from './galleryData.ts';

export class ImageStoreError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ImageStoreError';
	}
}

type WorkModule = {
	frontmatter: Work;
};

const workModules = import.meta.glob<WorkModule>('/src/content/works/*.md', {
	eager: true,
});

export const getWorks = async (): Promise<Work[]> => {
	const works = Object.values(workModules).map((module) => validateWork(module.frontmatter));
	return works.sort(sortWorks);
};

export const getFeaturedWorks = async (): Promise<Work[]> => {
	return (await getWorks()).filter((work) => work.featured);
};

export const getWork = async (id: string | undefined): Promise<Work | undefined> => {
	if (!id) return undefined;
	return (await getWorks()).find((work) => work.id === id);
};

export const getImagesForWork = async (id: string | undefined): Promise<Image[]> => {
	const work = await getWork(id);
	return work?.images.map(processGalleryImage) ?? [];
};

export const getHeroWork = async (): Promise<Work> => {
	const [firstFeatured] = await getFeaturedWorks();
	const [firstWork] = await getWorks();
	const heroWork = firstFeatured ?? firstWork;

	if (!heroWork) {
		throw new ImageStoreError('No works found in src/content/works.');
	}

	return heroWork;
};

function validateWork(work: Work): Work {
	const requiredFields: Array<keyof Work> = [
		'id',
		'title',
		'year',
		'category',
		'type',
		'role',
		'cover',
		'description',
		'images',
	];

	for (const field of requiredFields) {
		if (!work[field]) {
			throw new ImageStoreError(`Work ${work.id ?? 'unknown'} is missing ${field}.`);
		}
	}

	if (!Array.isArray(work.images) || work.images.length === 0) {
		throw new ImageStoreError(`Work ${work.id} must contain at least one image.`);
	}

	return work;
}

function processGalleryImage(image: WorkImage): Image {
	return {
		src: image.src,
		title: image.title,
		description: image.caption ?? '',
		type: image.type,
	};
}

function sortWorks(a: Work, b: Work) {
	const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
	const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

	if (orderA !== orderB) {
		return orderA - orderB;
	}

	return b.year.localeCompare(a.year);
}

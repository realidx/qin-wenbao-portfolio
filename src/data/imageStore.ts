import type { Exhibition, Image, Work, WorkImage } from './galleryData.ts';

export class ImageStoreError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ImageStoreError';
	}
}

type WorkModule = {
	frontmatter: Work;
};

type ExhibitionModule = {
	frontmatter: Exhibition;
};

const workModules = import.meta.glob<WorkModule>('/src/content/works/*.md', {
	eager: true,
});

const exhibitionModules = import.meta.glob<ExhibitionModule>('/src/content/exhibitions/*.md', {
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

export const getExhibitions = async (): Promise<Exhibition[]> => {
	const exhibitions = Object.values(exhibitionModules).map((module) =>
		validateExhibition(module.frontmatter),
	);
	return exhibitions.sort(sortItems);
};

export const getFeaturedExhibitions = async (): Promise<Exhibition[]> => {
	return (await getExhibitions()).filter((exhibition) => exhibition.featured);
};

export const getExhibition = async (id: string | undefined): Promise<Exhibition | undefined> => {
	if (!id) return undefined;
	return (await getExhibitions()).find((exhibition) => exhibition.id === id);
};

export const getImagesForExhibition = async (id: string | undefined): Promise<Image[]> => {
	const exhibition = await getExhibition(id);
	return exhibition?.images.map(processGalleryImage) ?? [];
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

function validateExhibition(exhibition: Exhibition): Exhibition {
	const requiredFields: Array<keyof Exhibition> = [
		'id',
		'title',
		'year',
		'location',
		'role',
		'cover',
		'description',
		'images',
	];

	for (const field of requiredFields) {
		if (!exhibition[field]) {
			throw new ImageStoreError(`Exhibition ${exhibition.id ?? 'unknown'} is missing ${field}.`);
		}
	}

	if (!Array.isArray(exhibition.images) || exhibition.images.length === 0) {
		throw new ImageStoreError(`Exhibition ${exhibition.id} must contain at least one image.`);
	}

	return exhibition;
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
	return sortItems(a, b);
}

function sortItems(a: { order?: number; year: string }, b: { order?: number; year: string }) {
	const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
	const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

	if (orderA !== orderB) {
		return orderA - orderB;
	}

	return b.year.localeCompare(a.year);
}

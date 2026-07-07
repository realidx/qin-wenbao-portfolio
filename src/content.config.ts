import { defineCollection, z } from 'astro:content';

const works = defineCollection({
	schema: z.object({
		id: z.string(),
		title: z.string(),
		subtitle: z.string().optional(),
		year: z.string(),
		category: z.string(),
		type: z.string(),
		role: z.string(),
		cover: z.string(),
		description: z.string(),
		images: z
			.array(
				z.object({
					src: z.string(),
					title: z.string(),
					caption: z.string().optional(),
					type: z.string().optional(),
				}),
			)
			.min(1),
		featured: z.boolean().optional(),
		order: z.number().optional(),
	}),
});

export const collections = { works };

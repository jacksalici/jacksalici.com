import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		// Transform string to Date object
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		summary: z.string().optional()
	}),
});

const projects = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		date: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		cover: z.string().optional(),
		tags: z.string().array().optional(),
		categories: z.string().array().optional(),
		link: z.string().optional(),
		summary: z.string().optional()
	}),
});


export const collections = { blog, projects};

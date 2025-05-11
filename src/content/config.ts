import { date } from 'astro/zod';
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders'; 

const notes = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		longDescription: z.string().optional(),

		// Transform string to Date object
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		summary: z.string().optional()
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		longDescription: z.string().optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		cover: z.string().optional(),
		tags: z.string().array().optional(),
		categories: z.string().array().optional(),
		link: z.string().optional(),
		summary: z.string().optional(),
		draft: z.boolean().optional(),
		featured: z.boolean().optional().default(false),
		trending: z.boolean().optional().default(false),
		type: z.enum(['work', 'project']).optional().default("project"),
		hidden: z.boolean().optional().default(false),
		langs: z.string().array().optional(),
		cta_text: z.string().array().optional(),
		cta_link: z.string().array().optional()

	}),
});



export const collections = { notes, projects };

import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
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
	type: 'content',
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		cover: z.string().optional(),
		tags: z.string().array().optional(),
		categories: z.string().array().optional(),
		link: z.string().optional(),
		summary: z.string().optional(),
		draft: z.boolean().optional()
	}),
});

const works = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		cover: z.string().optional(),
		tags: z.string().array().optional(),
		categories: z.string().array().optional(),
		link: z.string().optional(),
		summary: z.string().optional(),
		draft: z.boolean().optional()
	}),
});


export const collections = { posts, projects, works};

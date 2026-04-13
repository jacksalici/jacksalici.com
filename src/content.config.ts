import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Shared schema for common fields
const baseSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(), // Short description for cards and SEO
	news: z.string().optional(), // Highlighted news or updates
	summary: z.string().optional(), // Extended description shown on the detail page
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	cover: z.string().optional(),
	gallery: z
		.array(
			z.object({
				src: z.string(),
				alt: z.string().optional(),
				href: z.string().optional(),
				caption: z.string().optional(),
			}),
		)
		.optional(),
	tags: z.string().array().optional(), // For SEO
	categories: z.string().array().optional(), // For display grouping
	draft: z.boolean().optional().default(false),
	hidden: z.boolean().optional().default(false),
});

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		featured: z.boolean().optional().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		featured: z.boolean().optional().default(false),
		trending: z.boolean().optional().default(false),
		stack: z.string().array().optional(), // Tech stack: languages, frameworks, tools
		cta: z.array(z.object({ url: z.string(), label: z.string() })).optional(), // Call-to-action buttons
	}),
});

const activities = defineCollection({
	loader: glob({ base: './src/content/activities', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		featured: z.boolean().optional().default(false),
	}),
});

const papers = defineCollection({
	loader: glob({ base: './src/content/papers', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		authors: z.string().optional(),
		venue: z.string().optional(), // Conference/journal name
		acronym: z.string().optional(), // e.g., "ICSR 2025"
		location: z.string().optional(), // Conference location
		featured: z.boolean().optional().default(false),
		trending: z.boolean().optional().default(false),
		cta: z.array(z.object({ url: z.string(), label: z.string() })).optional(), // Call-to-action buttons
		activities: z.string().array().optional(), // Link to activities
	}),
});

const market = defineCollection({
	loader: glob({ base: './src/content/market', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.pick({
		title: true,
		description: true,
		pubDate: true,
		updatedDate: true,
		cover: true,
		draft: true,
		hidden: true,
		gallery: true,
	}).extend({
		status: z.enum(['available', 'sold']).optional().default('available'),
	}),
});

export const collections = { notes, projects, papers, activities, market };

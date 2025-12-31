import { defineCollection, z } from 'astro:content';

// Shared schema for common fields
const baseSchema = z.object({
	title: z.string().optional(),
	slug: z.string().optional(), // Custom URL slug (defaults to filename if not set)
	description: z.string().optional(), // Short description for cards and SEO
	summary: z.string().optional(), // Extended description shown on the detail page
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	cover: z.string().optional(),
	gallery: z
		.array(
			z.object({
				src: z.string(),
				alt: z.string(),
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
	type: 'content',
	schema: baseSchema.extend({
		featured: z.boolean().optional().default(false),
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		featured: z.boolean().optional().default(false),
		trending: z.boolean().optional().default(false),
		stack: z.string().array().optional(), // Tech stack: languages, frameworks, tools
		cta: z.array(z.object({ url: z.string(), label: z.string() })).optional(), // Call-to-action buttons
	}),
});

const activities = defineCollection({
	type: 'content',
	schema: baseSchema.extend({
		featured: z.boolean().optional().default(false),
	}),
});

const papers = defineCollection({
	type: 'content',
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
	type: 'content',
	schema: baseSchema.pick({
		title: true,
		description: true,
		pubDate: true,
		updatedDate: true,
		cover: true,
		draft: true,
		hidden: true,
	}).extend({
		status: z.enum(['available', 'sold']).optional().default('available'),
	}),
});

export const collections = { notes, projects, papers, activities, market };

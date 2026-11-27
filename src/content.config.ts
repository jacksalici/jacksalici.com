import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';
import { kinds } from './consts';

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

// Kind of work, shown as a chip and used to filter lists. Values in consts.ts.
const kind = z.enum(kinds);

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		kind,
		featured: z.boolean().optional().default(false),
	}),
});

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		kind,
		featured: z.boolean().optional().default(false),
		trending: z.boolean().optional().default(false),
		stack: z.string().array().optional(), // Tech stack: languages, frameworks, tools
		cta: z.array(z.object({ url: z.string(), label: z.string() })).optional(), // Call-to-action buttons
		activities: z.string().array().optional(), // Link to related activities
    playground: z.object({
          title: z.string().optional(),
					link: z.string(),
					tagline: z.string().optional(), // Playful one-liner used on the card
					emoji: z.string().optional(), // Card glyph, falls back to a dice
					how: z.string().optional(),
					howLabel: z.string().optional(),
					dead: z.coerce.date().optional(), // When set, the toy moves to the graveyard instead of the live grid
					pinned: z.boolean().optional().default(false), // Shown first on /apps
				}).optional()
		}),
});

const activities = defineCollection({
	loader: glob({ base: './src/content/activities', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		featured: z.boolean().optional().default(false),
		shown: z.boolean().optional().default(true), // Whether to show it on the homepage
		order: z.number().optional().default(99), // Display order on the homepage, ascending
		kicker: z.string().optional().default('Research activity'), // Overline naming the kind of work it holds
	}),
});

const research = defineCollection({
	loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
	schema: baseSchema.extend({
		kind,
		authors: z.string().optional(),
		venue: z.string().optional(), // Conference/journal name
		acronym: z.string().optional(), // e.g., "ICSR 2025"
		location: z.string().optional(), // Conference location
		coordinates: z.array(z.number()).optional(),
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

// Versions of this website, read from the changelog (see its `scheme` for the
// numbering rules) and rendered as a timeline on /notes/website.
const versions = defineCollection({
	loader: file('src/data/changelog.json', {
		parser: (text) => JSON.parse(text).versions.map((v: { version: string }) => ({ id: v.version, ...v })),
	}),
	schema: z.object({
		// Majors and minors only: patches are not listed.
		version: z.string().regex(/^\d+\.\d+\.0$/, 'Only x.y.0 versions are listed; patches are left out.'),
		date: z.coerce.date(), // Day the version reached the main branch
		title: z.string(),
		summary: z.string(),
		changes: z.string().array().min(1),
		stack: z.string().array().optional(),
		commit: z.string().regex(/^[0-9a-f]{7,40}$/), // Commit the screenshot was built from
		screenshot: z.object({ src: z.string(), alt: z.string() }).optional(),
	}),
});

export const collections = { notes, projects, research, activities, market, versions };

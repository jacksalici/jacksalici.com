import type { ImageMetadata } from 'astro';

// Covers and gallery items are plain strings in frontmatter, so they cannot be
// ESM imports. Every upload lives in `src/assets/uploads` and is globbed here
// once, which gives `astro:assets` the metadata it needs to emit resized,
// modern-format derivatives. Anything missing from the map — remote URLs, the
// few files still served from `public/` — passes straight through.
const uploads = import.meta.glob<{ default: ImageMetadata }>(
	'/src/assets/uploads/**/*.{jpeg,jpg,png,webp,avif,gif,svg}',
	{ eager: true },
);

/**
 * Resolve a frontmatter image reference to either `ImageMetadata`
 * (optimisable) or the original string (served as-is).
 */
export function resolveImage(src: string): ImageMetadata | string;
export function resolveImage(src?: string): ImageMetadata | string | undefined;
export function resolveImage(src?: string) {
	if (!src) return undefined;
	return uploads[`/src/assets${src}`]?.default ?? src;
}

/** The URL to render a resolved source at, whatever kind it turned out to be. */
export function imageUrl(source: ImageMetadata | string): string {
	return typeof source === 'string' ? source : source.src;
}

/**
 * Whether a resolved source can go through the image service. SVGs have no
 * business being rasterised, and re-encoding a GIF would drop its animation:
 * both are emitted untouched and rendered with a plain `<img>`.
 */
export function isOptimizable(source: ImageMetadata | string | undefined): source is ImageMetadata {
	return typeof source === 'object' && source.format !== 'svg' && source.format !== 'gif';
}

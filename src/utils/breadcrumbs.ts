/** One step of the trail. Without `href` it is plain text (a section with no page of its own). */
export interface Crumb {
  label: string;
  href?: string;
  /** The page itself: never linked. */
  current?: boolean;
}

/** Steps shown at most, counted from the root. */
const MAX_DEPTH = 2;

/** The root of every trail: the homepage is the "About" page. */
const ROOT: Crumb = { label: "About", href: "/" };

const research: Crumb = { label: "Research", href: "/research" };

/** Trail between the root and a detail page, keyed by the first URL segment. */
const SECTIONS: Record<string, Crumb[]> = {
  research: [research],
  activities: [{ label: "Activities", href: "/activities" }],
  projects: [{ label: "Projects", href: "/projects" }],
  notes: [{ label: "Notes", href: "/notes" }],
  market: [{ label: "Garage sales", href: "/market" }],
};

/** Trail between the root and a top-level page that belongs to a section. */
const PAGES: Record<string, Crumb[]> = {
  map: [research],
};

/**
 * Trail from the homepage to `pathname`, ending with the page itself (not
 * linked): its short name `current` when it has one, else its URL slug, as
 * titles are long and already the heading below. The homepage has no trail;
 * longer trails keep only their first MAX_DEPTH steps, so a detail page shows
 * the section it belongs to and not itself.
 */
export function getBreadcrumbs(pathname: string, current?: string): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const [first] = segments;
  const parents = (segments.length > 1 ? SECTIONS[first] : PAGES[first]) ?? [];
  const page: Crumb = { label: current ?? segments[segments.length - 1], current: true };
  return [ROOT, ...parents, page].slice(0, MAX_DEPTH);
}

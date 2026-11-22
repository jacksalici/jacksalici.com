// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Giacomo Salici';
export const SITE_TAGLINE = 'Digital craftsman, creative AI engineer.';
export const SITE_DESCRIPTION = 'Computer and AI engineer based in Modena, Italy. PhD candidate building AI, robotics, web, and research projects.';
export const SITE_URL = 'https://jacksalici.com';
export const DEFAULT_OG_IMAGE = '/website.jpg';

export const categories: Record<string, string> = {
  "ai-ml":      "AI & ML",
  "robotics":   "Robotics",
  "iot-and-v2x": "IoT & V2X",
  "web":        "Web",
  "coding":     "Coding",
  "games":      "Games",
  "making":     "Making",
  "design":     "Design",
  "updates":    "Updates",
  "thoughts":   "Thoughts",
};

// Kind of a paper, project or note, set by the `kind` field of its frontmatter.
// It is the chip on each row of the news list and what the lists filter by.
export const kinds = ["research", "engineering", "development", "design", "notes"] as const;

export type Kind = (typeof kinds)[number];

export const kindLabels: Record<Kind, string> = {
  research:    "Research",
  engineering: "Engineering",
  development: "Development",
  design:      "Design",
  notes:       "Notes",
};

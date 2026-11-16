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

// Chip shown on each row of the news list: papers are "research", notes are
// "notes", and a project takes one of the middle three from its first category.
export type NewsKind = "research" | "engineering" | "development" | "design" | "notes";

export const newsKindLabels: Record<NewsKind, string> = {
  research:    "Research",
  engineering: "Engineering",
  development: "Development",
  design:      "Design",
  notes:       "Notes",
};

export const projectKinds: Record<string, NewsKind> = {
  "ai-ml":       "engineering",
  "robotics":    "engineering",
  "iot-and-v2x": "engineering",
  "making":      "engineering",
  "web":         "development",
  "coding":      "development",
  "games":       "development",
  "design":      "design",
};

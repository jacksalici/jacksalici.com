import { getCollection } from "astro:content";
import type { Kind } from "../consts";

/** One row of the news list: a paper, a project or a note. */
export interface NewsItem {
  collection: "research" | "projects" | "notes";
  kind: Kind;
  href: string;
  title: string;
  date: Date;
  activities?: string[];
}

const isPublic = (entry: { data: { draft?: boolean; hidden?: boolean } }) =>
  entry.data.draft !== true && entry.data.hidden !== true;

/** Papers, projects and notes in one list, newest first. */
export async function getNews(): Promise<NewsItem[]> {
  const [papers, projects, notes] = await Promise.all([
    getCollection("research", isPublic),
    getCollection("projects", isPublic),
    getCollection("notes", isPublic),
  ]);

  const items: NewsItem[] = [
    ...papers.map((paper) => ({
      collection: "research" as const,
      kind: paper.data.kind,
      href: "/research/" + paper.id,
      title: paper.data.news ?? paper.data.title ?? paper.id,
      date: paper.data.pubDate,
      activities: paper.data.activities,
    })),
    ...projects.map((project) => {
      return {
        collection: "projects" as const,
        kind: project.data.kind,
        href: "/projects/" + project.id,
        title: project.data.news ?? project.data.title ?? project.id,
        date: project.data.pubDate,
        activities: project.data.activities,
      };
    }),
    ...notes.map((note) => ({
      collection: "notes" as const,
      kind: note.data.kind,
      href: "/notes/" + note.id,
      title: note.data.news ?? note.data.title ?? note.id,
      date: note.data.pubDate,
    })),
  ];

  return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

/** Activities by their `order` field, ascending. Each one has a page at /activities/<id>. */
export async function getActivities() {
  return (await getCollection("activities", (a) => a.data.draft !== true)).sort(
    (a, b) => a.data.order - b.data.order
  );
}

import { getCollection } from "astro:content";
import { projectKinds, type NewsKind } from "../consts";

/** One row of the news list: a paper, a project or a note. */
export interface NewsItem {
  collection: "papers" | "projects" | "notes";
  kind: NewsKind;
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
    getCollection("papers", isPublic),
    getCollection("projects", isPublic),
    getCollection("notes", isPublic),
  ]);

  const items: NewsItem[] = [
    ...papers.map((paper) => ({
      collection: "papers" as const,
      kind: "research" as const,
      href: "/papers/" + paper.id,
      title: paper.data.news ?? paper.data.title ?? paper.id,
      date: paper.data.pubDate,
      activities: paper.data.activities,
    })),
    ...projects.map((project) => {
      const category = project.data.categories?.[0];
      return {
        collection: "projects" as const,
        kind: (category && projectKinds[category]) || "development",
        href: "/projects/" + project.id,
        title: project.data.news ?? project.data.title ?? project.id,
        date: project.data.pubDate,
        activities: project.data.activities,
      };
    }),
    ...notes.map((note) => ({
      collection: "notes" as const,
      kind: "notes" as const,
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

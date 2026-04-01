import { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface FeedFiltersProps {
  allCategories: string[];
  categoryLabels: Record<string, string>;
}

export default function FeedFilters({ allCategories, categoryLabels }: FeedFiltersProps) {
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [query, setQuery] = useState("");
  const initialised = useRef(false);

  // Read URL params on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setType(p.get("type") ?? "all");
    setCategory(p.get("category") ?? "all");
    setSort(p.get("sort") ?? "newest");
    setQuery(p.get("q") ?? "");
    initialised.current = true;
  }, []);

  const pushParams = useCallback(() => {
    const p = new URLSearchParams();
    if (type !== "all") p.set("type", type);
    if (category !== "all") p.set("category", category);
    if (sort !== "newest") p.set("sort", sort);
    if (query.trim()) p.set("q", query.trim());
    const qs = p.toString();
    history.replaceState(null, "", qs ? "?" + qs : window.location.pathname);
  }, [type, category, sort, query]);

  // Apply filter + sort whenever state changes
  useEffect(() => {
    if (!initialised.current) return;

    const feedList = document.getElementById("feed-list");
    const feedEmpty = document.getElementById("feed-empty");
    const titleEl = document.getElementById("feed-title");
    if (!feedList) return;

    // Filter
    const items = feedList.querySelectorAll<HTMLElement>(".feed-item");
    const q = query.toLowerCase().trim();
    let visibleCount = 0;
    items.forEach((item) => {
      const typeMatch = type === "all" || item.dataset.type === type;
      const cats = item.dataset.categories ? item.dataset.categories.split(",") : [];
      const categoryMatch = category === "all" || cats.includes(category);
      const text = item.dataset.text ?? "";
      const searchMatch = !q || text.includes(q);
      const visible = typeMatch && categoryMatch && searchMatch;
      item.style.display = visible ? "" : "none";
      if (visible) visibleCount++;
    });
    feedEmpty?.classList.toggle("hidden", visibleCount > 0);

    // Sort
    const sortedItems = Array.from(feedList.querySelectorAll<HTMLElement>(".feed-item"));
    sortedItems.sort((a, b) => {
      if (sort === "featured") {
        const fa = Number(a.dataset.featured);
        const fb = Number(b.dataset.featured);
        if (fb !== fa) return fb - fa;
      }
      return Number(b.dataset.date) - Number(a.dataset.date);
    });
    sortedItems.forEach((item) => feedList.appendChild(item));

    // Update title
    const typeLabels: Record<string, string> = { notes: "Notes", projects: "Projects", papers: "Papers" };
    const catLabel = category !== "all" ? (categoryLabels[category] ?? category) : "";
    const base = type !== "all" ? (typeLabels[type] ?? type) : "Notes, papers, & projects";
    const about = catLabel || q;
    if (titleEl) {
      titleEl.innerHTML = about ? `${base} about ${about}.` : `${base}.`;
    }

    pushParams();

    // Scroll into view if URL had params on initial load
    if (window.location.search.length > 0) {
      document.getElementById("feed")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [type, category, sort, query, pushParams, categoryLabels]);

  const anyActive = category !== "all" || type !== "all" || sort !== "newest" || query.trim() !== "";

  const activeSelectClass = "!text-accent-3 !border-accent-3";

  function reset() {
    setType("all");
    setCategory("all");
    setSort("newest");
    setQuery("");
  }

  return (
    <div className="flex mt-3 mb-4 flex-wrap gap-2 items-center w-full justify-stretch">
      <Input
        type="search"
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn("w-36", query.trim() && "!text-accent-3 !border-accent-3")}
      />
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={cn(category !== "all" && activeSelectClass)}
      >
        <option value="all">All categories</option>
        {allCategories.map((c) => (
          <option key={c} value={c}>
            {categoryLabels[c] ?? c}
          </option>
        ))}
      </Select>
      <Select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className={cn(type !== "all" && activeSelectClass)}
      >
        <option value="all">All types</option>
        <option value="notes">Notes</option>
        <option value="projects">Projects</option>
        <option value="papers">Papers</option>
      </Select>
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={cn(sort !== "newest" && activeSelectClass)}
      >
        <option value="newest">Newest first</option>
        <option value="featured">Featured first</option>
      </Select>
      {anyActive && (
        <Button variant="link" size="sm" onClick={reset}>
          Clear
        </Button>
      )}
    </div>
  );
}

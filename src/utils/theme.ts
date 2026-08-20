const STORAGE_KEY = "theme";

export type Theme = "auto" | "light" | "dark";

const ORDER: Theme[] = ["auto", "light", "dark"];

export function getStoredTheme(): Theme {
  const value = localStorage.getItem(STORAGE_KEY);
  return value === "light" || value === "dark" ? value : "auto";
}

export function applyTheme(theme: Theme) {
  if (theme === "auto") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", theme);
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
}

export function cycleTheme(): Theme {
  const next = ORDER[(ORDER.indexOf(getStoredTheme()) + 1) % ORDER.length];
  setTheme(next);
  return next;
}

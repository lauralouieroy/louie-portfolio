import { useCallback, useEffect, useState } from "react";

/* Keep in sync with the inline script in public/index.html. */
const OVERRIDE_KEY = "theme-override";

/* AM (00:00–11:59) is light, PM (12:00–23:59) is dark. */
export const themeForTime = (date = new Date()) =>
  date.getHours() < 12 ? "light" : "dark";

/* Timestamp of the next noon or midnight, when the time-based theme flips. */
const nextBoundary = (date = new Date()) => {
  const boundary = new Date(date);
  boundary.setHours(date.getHours() < 12 ? 12 : 24, 0, 0, 0);
  return boundary.getTime();
};

const readOverride = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(OVERRIDE_KEY));
    if (saved && saved.until > Date.now() && ["light", "dark"].includes(saved.theme)) {
      return saved.theme;
    }
  } catch (error) {
    /* Ignore unreadable storage and fall back to the time rule. */
  }
  return null;
};

const resolveTheme = () => readOverride() || themeForTime();

export const useTheme = () => {
  const [theme, setTheme] = useState(resolveTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    let timer;
    const scheduleFlip = () => {
      timer = setTimeout(() => {
        setTheme(resolveTheme());
        scheduleFlip();
      }, nextBoundary() - Date.now() + 1000);
    };

    scheduleFlip();
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";

    try {
      if (next === themeForTime()) {
        localStorage.removeItem(OVERRIDE_KEY);
      } else {
        localStorage.setItem(
          OVERRIDE_KEY,
          JSON.stringify({ theme: next, until: nextBoundary() })
        );
      }
    } catch (error) {
      /* Storage may be unavailable (private mode); the toggle still works for this visit. */
    }

    setTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
};

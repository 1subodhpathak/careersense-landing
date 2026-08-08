import { useEffect, useState } from "react";

const HERO_THEME_OVERRIDE_KEY = "careersense-hero-theme-override";

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getAutoTheme(date) {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();

  return totalMinutes >= 21 * 60 || totalMinutes <= 7 * 60 ? "dark" : "light";
}

function getThemeWindowKey(date) {
  const totalMinutes = date.getHours() * 60 + date.getMinutes();

  if (totalMinutes >= 21 * 60) {
    return `night-${formatDateKey(date)}`;
  }

  if (totalMinutes <= 7 * 60) {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);

    return `night-${formatDateKey(previousDate)}`;
  }

  return `day-${formatDateKey(date)}`;
}

function getNextThemeChangeTime(date) {
  const nextChange = new Date(date);
  const totalMinutes = date.getHours() * 60 + date.getMinutes();

  if (totalMinutes >= 21 * 60) {
    nextChange.setDate(nextChange.getDate() + 1);
    nextChange.setHours(7, 1, 0, 0);
    return nextChange;
  }

  if (totalMinutes <= 7 * 60) {
    nextChange.setHours(7, 1, 0, 0);
    return nextChange;
  }

  nextChange.setHours(21, 0, 0, 0);
  return nextChange;
}

function getInitialTheme() {
  try {
    const now = new Date();
    const currentWindowKey = getThemeWindowKey(now);
    const savedOverride = window.localStorage.getItem(HERO_THEME_OVERRIDE_KEY);
    if (savedOverride) {
      const parsedOverride = JSON.parse(savedOverride);
      if (parsedOverride?.theme && parsedOverride?.windowKey === currentWindowKey) {
        return parsedOverride.theme;
      }
    }
  } catch (e) {}
  return "light";
}

export default function useHeroTheme() {
  const [heroTheme, setHeroTheme] = useState(getInitialTheme);
  const [themeWindowKey, setThemeWindowKey] = useState(() =>
    getThemeWindowKey(new Date())
  );

  useEffect(() => {
    const now = new Date();
    const currentWindowKey = getThemeWindowKey(now);
    const savedOverride = window.localStorage.getItem(HERO_THEME_OVERRIDE_KEY);

    setThemeWindowKey(currentWindowKey);

    if (savedOverride) {
      try {
        const parsedOverride = JSON.parse(savedOverride);

        if (
          parsedOverride?.theme &&
          parsedOverride?.windowKey === currentWindowKey
        ) {
          setHeroTheme(parsedOverride.theme);
          return;
        }
      } catch {
        window.localStorage.removeItem(HERO_THEME_OVERRIDE_KEY);
      }
    }

    window.localStorage.removeItem(HERO_THEME_OVERRIDE_KEY);
    setHeroTheme("light");
  }, []);

  useEffect(() => {
    const syncThemeWindow = () => {
      const now = new Date();
      const nextWindowKey = getThemeWindowKey(now);
      const autoTheme = getAutoTheme(now);

      setThemeWindowKey(nextWindowKey);
      setHeroTheme(autoTheme);
      window.localStorage.removeItem(HERO_THEME_OVERRIDE_KEY);
    };

    const nextChangeTime = getNextThemeChangeTime(new Date());
    const timeoutMs = Math.max(nextChangeTime.getTime() - Date.now(), 1000);
    const timeoutId = window.setTimeout(syncThemeWindow, timeoutMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [themeWindowKey]);

  const toggleHeroTheme = () => {
    setHeroTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      window.localStorage.setItem(
        HERO_THEME_OVERRIDE_KEY,
        JSON.stringify({
          theme: nextTheme,
          windowKey: themeWindowKey,
        })
      );

      return nextTheme;
    });
  };

  return {
    heroTheme,
    toggleHeroTheme,
  };
}

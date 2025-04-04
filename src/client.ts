"use client";

import Cookies from "js-cookie";

import type { Theme } from "./config";
import { COOKIE_SETTINGS } from "./config";

const getColorSchemeCookie = () => {
  return Cookies.get(COOKIE_SETTINGS.name);
};

export const setClientColorSchemeCookie = (theme: Theme) => {
  return Cookies.set(COOKIE_SETTINGS.name, theme, { secure: false });
};

type ClientColorScheme = {
  systemTheme: "dark" | "light";
  theme: Theme;
};
export const getDefaultClientColorScheme = (): ClientColorScheme => {
  if (typeof window === "undefined") {
    return { theme: "system", systemTheme: "light" };
  }

  const colorSchemeCookie = getColorSchemeCookie();
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const systemTheme = prefersDarkMode ? "dark" : "light";

  if (
    colorSchemeCookie &&
    (colorSchemeCookie in COOKIE_SETTINGS.types ||
      colorSchemeCookie === "system")
  ) {
    return { theme: colorSchemeCookie as Theme, systemTheme };
  }

  return { theme: "system", systemTheme };
};

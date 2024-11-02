"use client";

import Cookies from "js-cookie";

import { COOKIE_SETTINGS } from "./config";


const getColorSchemeCookie = () => {
  return Cookies.get(COOKIE_SETTINGS.name);
}

export const getDefaultColorScheme = (): "dark" | "light" => {
  const colorSchemeCookie = getColorSchemeCookie();

  if (colorSchemeCookie && colorSchemeCookie in COOKIE_SETTINGS.types) {
    return colorSchemeCookie as "dark" | "light";
  }

  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // oh so you think you're cool and clever huh?
  return COOKIE_SETTINGS.types[+!prefersDarkMode] as "dark" | "light";
}

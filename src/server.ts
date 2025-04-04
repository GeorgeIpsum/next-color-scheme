import "server-only";

import { cookies, headers } from "next/headers";

import type { Theme } from "./config";
import { COOKIE_SETTINGS } from "./config";

export const resolveTheme = async (): Promise<Theme> => {
  const cookieStore = await cookies();

  const themeCookie = cookieStore.get(COOKIE_SETTINGS.name);
  if (
    themeCookie &&
    (themeCookie.value in COOKIE_SETTINGS.types ||
      themeCookie.value === "system")
  ) {
    return themeCookie.value as Theme;
  }

  const headerStore = await headers();
  const theme = headerStore.get("sec-ch-prefers-color-scheme");
  if (theme && theme in COOKIE_SETTINGS.types) {
    return theme as Theme;
  }

  return COOKIE_SETTINGS.defaultTheme ?? "system";
};

"use server";

import { cookies } from "next/headers";

import type { Theme } from "./config";
import { COOKIE_SETTINGS } from "./config";

export const setColorScheme = async (theme: Theme) => {
  const cookieStore = await cookies();
  if (theme === "system") {
    cookieStore.delete(COOKIE_SETTINGS.name);
  } else {
    cookieStore.set(COOKIE_SETTINGS.name, theme, { secure: false });
  }
};

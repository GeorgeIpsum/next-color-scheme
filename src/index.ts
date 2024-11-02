import { cookies, headers } from "next/headers";

import "server-only";

import { COOKIE_SETTINGS } from "./config";

const getDefaultColorScheme = async () => {
  const colorSchemeCookie = await (await cookies()).get(COOKIE_SETTINGS.name);

  if (colorSchemeCookie && colorSchemeCookie.value in COOKIE_SETTINGS.types) {
    return colorSchemeCookie.value as "dark" | "light";
  }

  const colorSchemeHeader = (await headers()).get("Sec-CH-Prefers-Color-Scheme");

  return (colorSchemeHeader ?? "light") as "dark" | "light";
};


export const setColorSchemeAction = async (scheme: "dark" | "light") => {
  await (await cookies()).set(COOKIE_SETTINGS.name, scheme);
}

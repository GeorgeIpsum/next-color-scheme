export type ThemeType<DarkType extends string, LightType extends string> =
  | DarkType
  | LightType
  | "system";

export interface ThemeSettings<
  DarkType extends string,
  LightType extends string,
> {
  name: string;
  types: [DarkType, LightType];
  defaultTheme?: ThemeType<DarkType, LightType>;
}

export const COOKIE_SETTINGS: ThemeSettings<"dark", "light"> = {
  name: "__next__color_scheme",
  types: ["dark", "light"],
  defaultTheme: "system",
};

export type inferCookieTypes<T> =
  T extends ThemeSettings<infer Dark, infer Light>
    ? ThemeType<Dark, Light>
    : never;

export type Theme = inferCookieTypes<typeof COOKIE_SETTINGS>;

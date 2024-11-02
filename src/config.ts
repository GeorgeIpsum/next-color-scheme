interface CookieSettings<
  DefaultType extends string,
  InvertType extends string,
> {
  name: string;
  types: [DefaultType, InvertType];
  defaultTheme?: DefaultType;
}

export const COOKIE_SETTINGS: CookieSettings<"dark", "light"> = {
  name: "__next__color_scheme",
  types: ["dark", "light"],
  defaultTheme: "dark",
};

# Next Color Scheme

Next.js SSR support for your typical `(prefers-color-scheme: dark)` theming shenanigans.

## Requirements

- [x] Next.js 15

## Setup

1. Install `next-color-scheme`

```bash
pnpm install next-color-scheme
```

2. Set up headers in your Next Config

```typescript
// next.config.ts
import type { NextConfig } from "next";

// 1. Import
import { withNextHeaders } from "next-color-scheme/headers";

const nextConfig: NextConfig = {
  // ...your other settings...
  //
  // 2. Wrap your current headers function in `withNextHeaders`
  //    (OR if you don't have one, just don't pass anything)
  headers: withNextHeaders(async () => [])
}

export default nextConfig;
```

3. Set up your provider in your root layout

```tsx
// `src/app/layout.tsx` or `src/layout.tsx`
// ...other imports

// 1. Add both of these
import { ThemeProvider } from "next-color-scheme/react";
import { resolveTheme } from "next-color-scheme/server";

// 2. Make sure your RootLayout is an async function
export default async function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  // ...
  // 3. get the theme, will resolve to either "system", "dark", or "light"
  const theme = await resolveTheme();
  
  //...
  
  // 4. Wrap your content with the ThemeProvider
  return (
    <html lang="en">
      <body>
        <ThemeProvider initialTheme={theme}>
          { children }
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Usage with Tailwind

This library is most beneficial when combining the app directory with Tailwind, where you need to set some selector somewhere in your root layout so that Tailwind classes can pick up your color-scheme as Next streams HTML to the client.

1. If you haven't already, set up a dark mode selector in either your `globals.css` (Tailwind 4) or your `tailwind.config.ts` (Tailwind <=3)

> Using `tailwind.config.ts` ([Tailwind 3](https://v3.tailwindcss.com/docs/dark-mode))
```ts
// tailwind.config.{js|ts}
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector', // insert your selector here
  // ...
}
```

> Using `globals.css` ([Tailwind 4](https://tailwindcss.com/docs/dark-mode))
```css
/* globals.css */
                       /* insert your selector here */
@custom-variant dark (&:where(.selector .selector *));
```

2. Create a wrapper around `ThemeProvider` in order to use the `onThemeChange` prop to handle changing the HTML document attribute controlling Tailwind theme behavior.

```tsx
// MyThemeProvider.tsx
"use client";

import { ThemeProvider, type Theme, type ThemeHelpers } from "next-color-scheme/react";

const MyThemeProvider: React.FC<
  React.PropsWithChildren<{ initialTheme: Theme }>
> = ({ initialTheme, children }) => {
  const onThemeChange = (
    // if you need to do something with the changed theme
    theme: Theme,
    // some helpers we can use to automatically manage tailwind changes
    // the first parameter is always an element selector, the 2nd is the relevant property
    { tailwindDataSelector, tailwindClassSelector }: ThemeHelpers
  ) => {
    // if you're using a data-* attribute for Tailwind theming
    // we pass data-theme here, but if we just passed "theme" the library will resolve this to data-theme
    // this resolves to the "data-theme" attribute on the html tag
    tailwindDataSelector("html", "data-theme");
    
    // or if you're using a class
    // this resolves to the ".dark" CSS class on the html tag
    // tailwindDataSelector("html", "dark");
  }
  
  return (
    <ThemeProvider initialTheme={initialTheme} onThemeChange={onThemeChange}>
      {children}
    </ThemeProvider>
  );
}
```

3. Use the new provider in your root layout

```tsx
export default async function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  const theme = await resolveTheme();

  // this assumes we're using a darkmode selector of [data-theme="dark"]
  return (
    <html lang="en" data-theme={theme}>
      <body>
        <MyThemeProvider initialTheme={theme}>
          { children }
        </MyThemeProvider>
      </body>
    </html>
  );
}
```

## Changing Selected Theme

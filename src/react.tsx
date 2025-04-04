"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import type { Theme } from "./config";
// import { setColorScheme } from "./action";
import {
  getDefaultClientColorScheme,
  setClientColorSchemeCookie,
} from "./client";

interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<IThemeContext | null>(null);

export { type Theme };

export type ThemeHelpers = {
  tailwindDataSelector: (selector: string, dataModeKey: string) => void;
  tailwindClassSelector: (selector: string, className: string) => void;
};

type ThemeProviderProps = {
  initialTheme: Theme;
  onThemeChange?: (theme: Theme, helpers: ThemeHelpers) => void;
  listener?: (
    currentTheme: Theme,
    setTheme: (theme: Theme) => void,
  ) => VoidFunction;
  ErrorComponent?: React.FC<{ error: Error; reset?: () => void }>;
};
export const ThemeProvider: React.FC<
  React.PropsWithChildren<ThemeProviderProps>
> = ({ initialTheme, children, onThemeChange, ErrorComponent, listener }) => {
  const defaults = getDefaultClientColorScheme();
  const [theme, _setTheme] = useState<Theme>(initialTheme || defaults.theme);

  useEffect(() => {
    const unsub = listener?.(theme, _setTheme);

    return () => {
      unsub?.();
    };
  }, [theme]);

  const handleTailwindChange =
    (type: "data" | "class", theme: Theme) =>
    (selector: string, key: string) => {
      const element = document.querySelector(selector);
      if (!element) return;
      if (type === "data") {
        element.setAttribute(
          key.startsWith("data-") ? key : `data-${key}`,
          theme,
        );
      } else {
        if (theme === "dark" && !element.classList.contains(key)) {
          element.classList.add(key);
        } else if (theme === "light" && element.classList.contains(key)) {
          element.classList.remove(key);
        } else if (theme === "system") {
          if (defaults.systemTheme === "dark") {
            element.classList.add(key);
          } else {
            element.classList.remove(key);
          }
        }
      }
    };

  const setTheme = (theme: Theme) => {
    // we use cookiejs here instead of a server action because server actions cause a page refresh. We shouldn't need to do this since we're also updating via react state as well
    // void setColorScheme(theme);
    setClientColorSchemeCookie(theme);
    onThemeChange?.(theme, {
      tailwindDataSelector: handleTailwindChange("data", theme),
      tailwindClassSelector: handleTailwindChange("class", theme),
    });
  };

  return (
    <ErrorBoundary
      errorComponent={ErrorComponent ?? (() => <div>WHOOPSIE!!!!!</div>)}
    >
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
};

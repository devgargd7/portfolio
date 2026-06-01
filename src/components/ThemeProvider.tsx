// src/components/ThemeProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import ThemeToggle from "./ThemeToggle";
type ThemeContextType = {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Set initial theme from the document
    const currentTheme = (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
    setTheme(currentTheme);

    // Listen for changes in the document's data-theme attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}><ThemeToggle/>{children}</ThemeContext.Provider>;
}
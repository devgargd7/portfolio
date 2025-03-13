"use client";

import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark"); // Default to dark mode
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  if (!isMounted) return null; 

  return (
    <DarkModeSwitch
      style={{ position: "fixed", bottom: "1rem", right: "1rem", cursor: "pointer", zIndex: "1000" }}
      checked={theme === "dark"}
      onChange={toggleDarkMode}
      size={32}
    />
  );
}

"use client";

import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
    }
    return "light";
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme as "dark" | "light");
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, isMounted]);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => setIsVisible(false), 3000);
    };

    window.addEventListener('scroll', handleScroll);

    hideTimeout = setTimeout(() => setIsVisible(false), 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(hideTimeout);
    };
  }, []);

  const toggleDarkMode = (checked: boolean) => {
    const newTheme: "dark" | "light" = checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!isMounted) return null; 

  return (
    <DarkModeSwitch
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        cursor: 'pointer',
        zIndex: '1000',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
      className="hover:opacity-100"
      checked={theme === "dark"}
      onChange={toggleDarkMode}
      size={32}
    />
  );
}

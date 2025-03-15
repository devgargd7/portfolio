"use client";

import ThemeProvider from "@/components/ThemeProvider";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
} 
import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: "Dev Garg",
  description: "Dev Garg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <GoogleAnalytics gaId="G-SBGST8STT0" />
      <body className="leading-relaxed antialiased">
        {children}
      </body>
    </html>
  );
}
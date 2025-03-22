import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liyyy | Portofolio",
  description: "Personal portfolio website of Ghazam Al Aliy Ravandy",
  generator: "Next.js",
  icons: {
    icon: "/images/my personal web logo.jpg",
    shortcut: "/images/my personal web logo.jpg",
    apple: "/images/my personal web logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";

import "./globals.css";

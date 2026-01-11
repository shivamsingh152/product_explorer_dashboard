import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "a web app that displays a list of products with filtering, detailed views, and a simple client-side state feature",
};

import { FavoritesProvider } from "@/components/providers/FavoritesProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-gray-50 via-gray-100 to-gray-200 min-h-screen text-gray-900 transition-colors duration-300`}
      >
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}

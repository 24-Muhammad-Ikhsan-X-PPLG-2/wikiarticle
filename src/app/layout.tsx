import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import appName from "../constants/appName";
import QueryProvider from "@/providers/QueryProvider";

const InterFont = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: appName,
  description: "Article Community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${InterFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

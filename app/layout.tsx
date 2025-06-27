import type { Metadata } from "next";
import { Lato, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  variable: "--font-lato",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generative Strategies — Lateral Thinking Prompts for LLMs",
  description: "Generative Strategies are prompts for lateral thinking with LLM's. Copy and paste these on codebases, research datasets, or against your own prompts to challenge models and produce unexpected, often entertaining results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${lato.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

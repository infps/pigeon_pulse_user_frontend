import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "./query-client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pigeon Racing Platform",
    template: "%s | Pigeon Racing Platform"
  },
  description: "Experience the thrill of pigeon racing with real-time tracking and live results from competitions around the world. Join races, manage your loft, and track your pigeons.",
  keywords: ["pigeon racing", "live tracking", "competitions", "loft management", "bird racing", "racing pigeons"],
  authors: [{ name: "Pigeon Racing Platform" }],
  creator: "Pigeon Racing Platform",
  publisher: "Pigeon Racing Platform",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pigeonracing.com",
    title: "Pigeon Racing Platform",
    description: "Experience the thrill of pigeon racing with real-time tracking and live results.",
    siteName: "Pigeon Racing Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pigeon Racing Platform",
    description: "Experience the thrill of pigeon racing with real-time tracking and live results.",
    creator: "@pigeonracing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Toaster />
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}

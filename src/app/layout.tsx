import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chemico Innovations Bangladesh Ltd. | Industrial B2B Chemical Showcase",
  description: "Leading manufacturer and supplier of textile chemicals, pigment pastes, rubber pastes, and industrial auxiliaries in Bangladesh. High-performance chemical solutions with technical precision.",
  keywords: ["textile chemicals", "pigment paste", "rubber paste", "Bangladesh chemicals", "industrial auxiliaries", "Chemico Innovations"],
  openGraph: {
    title: "Chemico Innovations Bangladesh Ltd.",
    description: "Niche textile chemical solutions with technical precision.",
    type: "website",
    locale: "en_BD",
    siteName: "Chemico Innovations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ fontFamily: "var(--font-inter)" }}>
        {children}
      </body>
    </html>
  );
}

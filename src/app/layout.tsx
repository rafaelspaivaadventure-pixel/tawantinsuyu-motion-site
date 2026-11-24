import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { SiteBackground } from "@/components/art/SiteBackground";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { siteMeta } from "@/data/content";
import "@/styles/globals.css";

/* As fontes são hospedadas pelo próprio site (next/font), sem pedidos a terceiros. */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
};

export const viewport: Viewport = {
  themeColor: "#121116",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteMeta.lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteBackground />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

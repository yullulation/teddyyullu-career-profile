import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteNav from "@/components/SiteNav";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Teddy Yullu — Physical Planner & Graphic Designer",
  description:
    "A professional career profile for Teddy Yullu, presenting qualifications, experience, projects, and supporting evidence in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="fabric" />
        <div className="grain" />
        <SiteNav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

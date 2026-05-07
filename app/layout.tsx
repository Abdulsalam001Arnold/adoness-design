import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Adoness — Crafting Modern Tradition",
  description:
    "Adoness is a premium fashion atelier exploring the intersection of architectural form and textile fluidity.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

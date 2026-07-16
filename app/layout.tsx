import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Chatbot } from "@/components/chatbot/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Set the theme before first paint so dark mode never flashes the
          // light background. Runs synchronously in <head>; falls back to light.
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('adoness-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();",
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col text-foreground font-sans">
        <AnimatedBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Chatbot />
      </body>
    </html>
  );
}

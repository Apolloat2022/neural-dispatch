import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neuraldispatch.com"),
  title: {
    default: "The Neural Dispatch — AI Tools, Research & What's Actually Being Built",
    template: "%s | The Neural Dispatch",
  },
  description:
    "The frontline report on AI tools, breakthroughs, and what's actually being built. Premium tech journalism at the intersection of AI and engineering.",
  keywords: ["AI", "artificial intelligence", "machine learning", "LLMs", "tech", "engineering", "tools"],
  authors: [{ name: "The Neural Dispatch" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neuraldispatch.com",
    siteName: "The Neural Dispatch",
    title: "The Neural Dispatch",
    description: "The frontline report on AI tools, breakthroughs, and what's actually being built.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Neural Dispatch",
    description: "The frontline report on AI tools, breakthroughs, and what's actually being built.",
  },
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

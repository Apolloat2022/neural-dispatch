import Link from "next/link";
import { Zap, Twitter, Github, Rss } from "lucide-react";

const footerLinks = {
  Topics: [
    { href: "/category/tools", label: "AI Tools" },
    { href: "/category/research", label: "Research" },
    { href: "/category/use-cases", label: "Use Cases" },
    { href: "/category/industry", label: "Industry" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/privacy", label: "Privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#00d4ff]" />
              </div>
              <span className="font-heading font-bold text-lg">
                <span className="text-foreground">Neural</span>
                <span className="text-[#00d4ff]">Dispatch</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-xs">
              The frontline report on AI tools, breakthroughs, and what&apos;s
              actually being built. For engineers, builders, and the AI-curious.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="/rss.xml"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading font-semibold text-sm text-foreground/80 mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-[#00d4ff] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} The Neural Dispatch. All rights reserved.
          </p>
          <p className="text-xs text-foreground/30">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}

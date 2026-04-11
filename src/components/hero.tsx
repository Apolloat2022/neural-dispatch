"use client";

import { motion } from "framer-motion";
import { ArrowDown, Radio } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-60 pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00d4ff]/5 via-transparent to-transparent pointer-events-none" />

      {/* Animated orbs */}
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-10 left-1/4 w-96 h-96 bg-violet-500/4 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/8 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-medium mb-8"
        >
          <Radio className="w-3 h-3 animate-pulse" />
          AI Intelligence · Updated Weekly
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
        >
          <span className="text-foreground">The</span>{" "}
          <span className="text-gradient">Neural</span>{" "}
          <span className="text-foreground">Dispatch</span>
        </motion.h1>

        {/* Animated tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto leading-relaxed mb-10"
        >
          The frontline report on{" "}
          <span className="text-foreground/90 font-medium">AI tools</span>,{" "}
          <span className="text-foreground/90 font-medium">breakthroughs</span>,{" "}
          and{" "}
          <span className="text-[#00d4ff] font-medium">what&apos;s actually being built.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#featured"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#00d4ff] text-[#0a0f1e] font-semibold hover:bg-[#00d4ff]/90 active:scale-95 transition-all duration-200 shadow-lg shadow-[#00d4ff]/20"
          >
            Start Reading
            <ArrowDown className="w-4 h-4" />
          </Link>
          <Link
            href="#newsletter"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl glass border border-white/15 text-foreground/80 font-medium hover:text-foreground hover:border-white/25 hover:bg-white/8 transition-all duration-200"
          >
            Subscribe Free
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-8 mt-14 text-foreground/30 text-sm"
        >
          {[
            ["Weekly", "Updates"],
            ["In-depth", "Analysis"],
            ["Zero", "Hype"],
          ].map(([num, label]) => (
            <div key={num} className="text-center">
              <div className="font-heading font-bold text-lg text-foreground/60">{num}</div>
              <div className="text-xs uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

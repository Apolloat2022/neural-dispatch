"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-10 flex items-end justify-between gap-4"
    >
      <div>
        {eyebrow && (
          <p className="text-[#00d4ff] text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-5 h-px bg-[#00d4ff]/40" />
            {eyebrow}
          </p>
        )}
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-foreground/50 max-w-2xl">{description}</p>
        )}
      </div>
      <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-border to-transparent" />
    </motion.div>
  );
}

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
      className="mb-8"
    >
      {eyebrow && (
        <p className="text-[#00d4ff] text-xs font-semibold uppercase tracking-widest mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-foreground/50 max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}

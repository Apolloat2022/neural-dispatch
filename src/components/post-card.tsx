"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { type Post } from "@/lib/posts";
import { CategoryBadge } from "./category-badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format-date";

interface PostCardProps {
  post: Post;
  className?: string;
  featured?: boolean;
  index?: number;
}

export function PostCard({ post, className, featured = false, index = 0 }: PostCardProps) {
  const { frontmatter, slug } = post;

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(
          "group relative glass-card gradient-border overflow-hidden",
          "hover:shadow-2xl hover:shadow-[#00d4ff]/10 transition-all duration-500",
          className
        )}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent" />
        </div>

        <div className="p-8 md:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <CategoryBadge category={frontmatter.category} />
            <span className="text-xs text-foreground/40 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="text-xs text-foreground/40 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {frontmatter.readTime}
            </span>
          </div>

          <Link href={`/posts/${slug}`} className="block group/title">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-foreground group-hover/title:text-[#00d4ff] transition-colors duration-300">
              {frontmatter.title}
            </h2>
          </Link>

          <p className="text-foreground/60 text-lg leading-relaxed mb-8 max-w-3xl">
            {frontmatter.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {frontmatter.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs text-foreground/40 font-mono"
              >
                #{tag}
              </span>
            ))}
            <Link
              href={`/posts/${slug}`}
              className="ml-auto flex items-center gap-2 text-[#00d4ff] text-sm font-medium hover:gap-3 transition-all duration-200"
            >
              Read full story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "group glass-card gradient-border overflow-hidden",
        "hover:shadow-xl hover:shadow-[#00d4ff]/5 hover:-translate-y-1 transition-all duration-300",
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <CategoryBadge category={frontmatter.category} size="sm" />
          <span className="text-xs text-foreground/35 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {frontmatter.readTime}
          </span>
        </div>

        <Link href={`/posts/${slug}`} className="block group/title mb-3">
          <h3 className="font-heading font-bold text-lg leading-snug text-foreground group-hover/title:text-[#00d4ff] transition-colors duration-200 line-clamp-2">
            {frontmatter.title}
          </h3>
        </Link>

        <p className="text-sm text-foreground/50 leading-relaxed mb-5 line-clamp-3">
          {frontmatter.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/35 flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {formatDate(frontmatter.date)}
          </span>
          <Link
            href={`/posts/${slug}`}
            className="flex items-center gap-1.5 text-[#00d4ff]/80 text-xs font-medium hover:text-[#00d4ff] hover:gap-2 transition-all duration-200"
          >
            Read more <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

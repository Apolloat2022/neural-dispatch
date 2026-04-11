"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Twitter,
  Linkedin,
  Link2,
  User,
} from "lucide-react";
import { type Post } from "@/lib/posts";
import { CategoryBadge } from "./category-badge";
import { PostCard } from "./post-card";
import { SectionHeader } from "./section-header";
import { formatDate } from "@/lib/format-date";

interface PostContentProps {
  post: Post;
  related: Post[];
  children: React.ReactNode;
}

export function PostContent({ post, related, children }: PostContentProps) {
  const { frontmatter, slug } = post;

  const shareUrl = `https://neuraldispatch.com/posts/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <article className="pt-28 pb-20">
      {/* Back button */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground mb-5">
            {frontmatter.title}
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed mb-8">
            {frontmatter.excerpt}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#00d4ff]/40 via-[#00d4ff]/10 to-transparent mb-8" />

          {/* Meta row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/25 flex items-center justify-center">
                <User className="w-4 h-4 text-[#00d4ff]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {frontmatter.author ?? "The Neural Dispatch"}
                </p>
                <p className="text-xs text-foreground/40">
                  {frontmatter.authorRole ?? "Staff Writer"}
                </p>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/35 mr-1">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(frontmatter.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={copyLink}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="Copy link"
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* MDX Content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="prose-neural">
          {children}
        </div>

        {/* Tags */}
        {frontmatter.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/40">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-foreground/50 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author section */}
        <div className="mt-12 p-6 glass-card gradient-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/25 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground">
                {frontmatter.author ?? "The Neural Dispatch"}
              </p>
              <p className="text-sm text-foreground/40">
                {frontmatter.authorRole ?? "Staff Writer"} · The Neural Dispatch
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-foreground/55 leading-relaxed">
            Covering the intersection of AI, engineering, and the future of building.
            We dig into what the tools actually do, how builders are using them, and
            what it means for the industry.
          </p>
        </div>
      </motion.div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <SectionHeader eyebrow="Keep reading" title="Related dispatches" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rp, i) => (
              <PostCard key={rp.slug} post={rp} index={i} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

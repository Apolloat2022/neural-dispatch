import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, categorySlug, getCategory } from "@/lib/categories";
import { PostCard } from "@/components/post-card";
import { CategoryBadge } from "@/components/category-badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.label} — The Neural Dispatch`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  // Match on the slugified frontmatter value so "Enterprise AI" resolves to
  // "enterprise-ai" without a second lookup table to keep in sync.
  const posts = getAllPosts().filter(
    (p) => categorySlug(p.frontmatter.category) === category.slug
  );

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <CategoryBadge category={category.label} className="mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            {category.label}
          </h1>
          <p className="text-foreground/55 max-w-lg mx-auto">
            {category.description}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-foreground/40">
            <p className="text-lg">No posts in this category yet.</p>
            <p className="text-sm mt-2">Check back soon — the dispatch is always filing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

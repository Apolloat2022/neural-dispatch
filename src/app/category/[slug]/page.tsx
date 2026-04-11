import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { CategoryBadge } from "@/components/category-badge";

const VALID_CATEGORIES = ["tools", "research", "use-cases", "industry"];

const categoryLabels: Record<string, string> = {
  tools: "Tools",
  research: "Research",
  "use-cases": "Use Cases",
  industry: "Industry",
};

const categoryDescriptions: Record<string, string> = {
  tools: "Reviews, comparisons, and deep-dives into the AI tools shaping how we build.",
  research: "Breaking down the papers, benchmarks, and breakthroughs that matter.",
  "use-cases": "Real-world applications of AI across industries and workflows.",
  industry: "Business, funding, strategy, and the people building the AI economy.",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabels[slug];
  if (!label) return {};
  return {
    title: `${label} — The Neural Dispatch`,
    description: categoryDescriptions[slug],
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  if (!VALID_CATEGORIES.includes(slug)) notFound();

  const label = categoryLabels[slug];

  // Map URL slug to frontmatter category
  const categoryMap: Record<string, string> = {
    tools: "tools",
    research: "research",
    "use-cases": "use cases",
    industry: "industry",
  };

  const allPosts = getAllPosts();
  const posts = allPosts.filter(
    (p) =>
      p.frontmatter.category.toLowerCase() ===
      (categoryMap[slug] ?? slug)
  );

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <CategoryBadge category={label} className="mb-4" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            {label}
          </h1>
          <p className="text-foreground/55 max-w-lg mx-auto">
            {categoryDescriptions[slug]}
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

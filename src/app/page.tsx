import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import { NewsletterSection } from "@/components/newsletter-section";
import { SectionHeader } from "@/components/section-header";

export default function HomePage() {
  const featuredPost = getFeaturedPost();
  const allPosts = getAllPosts();
  const regularPosts = allPosts.filter(
    (p) => p.slug !== featuredPost?.slug
  );

  return (
    <>
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Featured post */}
        {featuredPost && (
          <section id="featured" className="mb-20">
            <SectionHeader
              eyebrow="Featured Story"
              title="Top of the dispatch"
            />
            <PostCard post={featuredPost} featured />
          </section>
        )}

        {/* Post grid */}
        {regularPosts.length > 0 && (
          <section className="mb-8">
            <SectionHeader eyebrow="Latest" title="Recent dispatches" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      <NewsletterSection />
    </>
  );
}

/**
 * Single source of truth for post categories.
 *
 * Every category listed here routes at /category/<slug>, appears in the sitemap,
 * and gets its own badge colour. Frontmatter in content/posts/*.mdx uses `label`
 * verbatim; the URL uses `slug`. Adding a category here is all that is required
 * to make it work everywhere — do not hardcode category lists elsewhere.
 */

export interface Category {
  /** URL segment, e.g. "use-cases" */
  slug: string;
  /** Frontmatter value and display name, e.g. "Use Cases" */
  label: string;
  /** Shown under the heading on the category page */
  description: string;
  /** Tailwind classes for CategoryBadge */
  badgeClass: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "tools",
    label: "Tools",
    description:
      "Reviews, comparisons, and deep-dives into the AI tools shaping how we build.",
    badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  {
    slug: "research",
    label: "Research",
    description:
      "Breaking down the papers, benchmarks, and breakthroughs that matter.",
    badgeClass: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    slug: "use-cases",
    label: "Use Cases",
    description:
      "Real-world applications of AI across industries and workflows.",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    slug: "industry",
    label: "Industry",
    description:
      "Business, funding, strategy, and the people building the AI economy.",
    badgeClass: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    slug: "technology",
    label: "Technology",
    description:
      "Chips, datacenters, energy, security, and the policy shaping the stack underneath AI.",
    badgeClass: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  {
    slug: "enterprise-ai",
    label: "Enterprise AI",
    description:
      "How large organizations actually deploy AI — rollouts, adoption data, and what breaks.",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
  {
    slug: "future-of-work",
    label: "Future of Work",
    description:
      "Jobs, skills, and org change as AI moves from pilot to payroll.",
    badgeClass: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  },
  {
    slug: "education",
    label: "Education",
    description:
      "Teaching, learning, and training in a world where the tools keep moving.",
    badgeClass: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  },
];

/** "Enterprise AI" -> "enterprise-ai". Also tolerates a slug passed back in. */
export function categorySlug(category: string): string {
  return category.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Frontmatter label for a slug, falling back to the raw slug. */
export function categoryLabel(slug: string): string {
  return getCategory(slug)?.label ?? slug;
}

export const CATEGORY_SLUGS: string[] = CATEGORIES.map((c) => c.slug);

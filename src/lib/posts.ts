import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  author?: string;
  authorRole?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export function getFeaturedPost(): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.frontmatter.featured) ?? posts[0] ?? null;
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (p) => p.frontmatter.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRelatedPosts(currentSlug: string, count = 3): Post[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.slug !== currentSlug);

  // Prefer same category
  const sameCategory = all.filter(
    (p) =>
      p.frontmatter.category.toLowerCase() ===
      current.frontmatter.category.toLowerCase()
  );

  const others = all.filter(
    (p) =>
      p.frontmatter.category.toLowerCase() !==
      current.frontmatter.category.toLowerCase()
  );

  return [...sameCategory, ...others].slice(0, count);
}

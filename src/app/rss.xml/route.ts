import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://apollotechnologiesus.com/neural-dispatch";
const FEED_TITLE = "The Neural Dispatch";
const FEED_DESCRIPTION =
  "The frontline report on AI tools, breakthroughs, and what's actually being built.";

// Posts are read from disk at build time, like the rest of the site, so the feed
// is generated once per deploy rather than on every request.
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = (
    posts[0] ? new Date(posts[0].frontmatter.date) : new Date()
  ).toUTCString();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/posts/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.frontmatter.excerpt)}</description>
      <category>${escapeXml(post.frontmatter.category)}</category>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}

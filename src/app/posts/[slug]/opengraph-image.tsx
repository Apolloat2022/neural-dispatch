import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: { slug: string };
}

export default function Image({ params }: Props) {
  const post = getPostBySlug(params.slug);
  const title = post?.frontmatter.title ?? "The Neural Dispatch";
  const category = post?.frontmatter.category ?? "";
  const excerpt = post?.frontmatter.excerpt ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "auto",
            }}
          >
            <span style={{ fontSize: "18px", color: "#f0f4ff", fontWeight: 700 }}>
              Neural<span style={{ color: "#00d4ff" }}>Dispatch</span>
            </span>
            {category && (
              <>
                <span style={{ color: "rgba(240,244,255,0.2)" }}>·</span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#00d4ff",
                    background: "rgba(0,212,255,0.1)",
                    border: "1px solid rgba(0,212,255,0.3)",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {category}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: title.length > 50 ? "42px" : "52px",
              fontWeight: 800,
              color: "#f0f4ff",
              lineHeight: 1.15,
              margin: "40px 0 20px",
            }}
          >
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p
              style={{
                fontSize: "20px",
                color: "rgba(240,244,255,0.5)",
                lineHeight: 1.5,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {excerpt}
            </p>
          )}

          {/* Bottom bar */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "14px", color: "rgba(240,244,255,0.3)" }}>
              neuraldispatch.com
            </span>
          </div>
        </div>

        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

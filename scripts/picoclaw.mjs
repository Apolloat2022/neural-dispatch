#!/usr/bin/env node
/**
 * PicoClaw — Quick AI blog post generator
 *
 * Supports two providers (set PICOCLAW_PROVIDER in .env.local):
 *   google  → Gemini 2.0 Flash (fast, free tier at aistudio.google.com)
 *   groq    → Llama 3.3 70B via Groq (fastest inference, free tier at console.groq.com)
 *
 * Usage:
 *   node scripts/picoclaw.mjs "Your Post Topic"
 *   node scripts/picoclaw.mjs "Your Post Topic" --commit
 *
 * Or via npm:
 *   npm run picoclaw -- "Your Post Topic" --commit
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Load .env.local ───────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 60);
}

function today() {
  return new Date().toISOString().split("T")[0];
}

// ── Providers ─────────────────────────────────────────────────────────────────

async function callGoogle(apiKey, systemPrompt, userPrompt) {
  const model = "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: { maxOutputTokens: 4096, temperature: 0.7 },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const usage = data.usageMetadata ?? {};

  return {
    text,
    usage: {
      input_tokens: usage.promptTokenCount ?? 0,
      output_tokens: usage.candidatesTokenCount ?? 0,
    },
  };
}

async function callGroq(apiKey, systemPrompt, userPrompt) {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const body = {
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 4096,
    temperature: 0.7,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  const usage = data.usage ?? {};

  return {
    text,
    usage: {
      input_tokens: usage.prompt_tokens ?? 0,
      output_tokens: usage.completion_tokens ?? 0,
    },
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const topic = args.filter((a) => !a.startsWith("--")).join(" ").trim();
  const shouldCommit = args.includes("--commit");

  if (!topic) {
    console.error('Usage: node scripts/picoclaw.mjs "Your Post Topic" [--commit]');
    process.exit(1);
  }

  const provider = (process.env.PICOCLAW_PROVIDER || "google").toLowerCase();

  const apiKey =
    provider === "groq"
      ? process.env.GROQ_API_KEY
      : process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error(`Error: ${provider === "groq" ? "GROQ_API_KEY" : "GOOGLE_API_KEY"} is not set.`);
    console.error("Add it to .env.local — see .env.local.example for details.");
    process.exit(1);
  }

  const modelLabel =
    provider === "groq" ? "Llama 3.3 70B (Groq)" : "Gemini 2.0 Flash (Google)";

  console.log(`\n⚡ PicoClaw generating: "${topic}"`);
  console.log(`   Model: ${modelLabel}\n`);

  const systemPrompt = `You are a senior tech journalist writing for The Neural Dispatch — a premium AI publication by Apollo Technologies US.

Writing style: precise, authoritative, zero hype. Think Wired meets a dev-focused Substack.
- Use concrete examples, real tool names, actual numbers where possible
- Structure with clear H2/H3 headings
- Include code blocks and tables where relevant
- Write for technical professionals — don't over-explain basics
- Body length: 600–900 words`;

  const userPrompt = `Write a complete blog post about: "${topic}"

Return ONLY a JSON object — no markdown wrapper, no extra text before or after the JSON:
{
  "title": "Post title",
  "category": "Tools",
  "excerpt": "One compelling sentence, max 160 chars",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "readTime": "X min read",
  "author": "The Neural Dispatch",
  "authorRole": "Staff Writer",
  "content": "Full MDX content using ## headings, **bold**, \`code\`, tables, blockquotes. Do NOT include an H1 — start directly with an intro paragraph."
}

Category must be exactly one of: Tools, Research, Use Cases, Industry`;

  let result;
  if (provider === "groq") {
    result = await callGroq(apiKey, systemPrompt, userPrompt);
  } else {
    result = await callGoogle(apiKey, systemPrompt, userPrompt);
  }

  // Extract JSON (handle possible stray markdown fences from the model)
  const jsonMatch = result.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("Error: Could not parse JSON from model response.");
    console.error("Raw response:\n", result.text);
    process.exit(1);
  }

  let post;
  try {
    post = JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error("Error: Invalid JSON in model response.", e.message);
    process.exit(1);
  }

  // Write MDX
  const slug = slugify(post.title || topic);
  const date = today();

  const mdxContent = `---
title: "${post.title}"
date: "${date}"
category: "${post.category}"
excerpt: "${post.excerpt}"
tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]
readTime: "${post.readTime}"
featured: false
author: "${post.author}"
authorRole: "${post.authorRole}"
---

${post.content}
`;

  const outputPath = path.join(ROOT, "content", "posts", `${slug}.mdx`);
  const finalSlug = fs.existsSync(outputPath) ? `${slug}-${Date.now()}` : slug;
  const finalPath = path.join(ROOT, "content", "posts", `${finalSlug}.mdx`);

  if (finalSlug !== slug) {
    console.warn(`⚠️  ${slug}.mdx already exists — saving as ${finalSlug}.mdx`);
  }

  fs.writeFileSync(finalPath, mdxContent, "utf8");

  console.log(`✅ Post saved: content/posts/${finalSlug}.mdx`);
  console.log(`   Title:    ${post.title}`);
  console.log(`   Category: ${post.category}`);
  console.log(`   Tags:     ${post.tags.join(", ")}`);
  console.log(`   Read:     ${post.readTime}`);
  console.log(`   Tokens:   ${result.usage.input_tokens} in / ${result.usage.output_tokens} out`);

  if (shouldCommit) {
    console.log("\n📦 Committing and pushing...");
    try {
      execSync(`git -C "${ROOT}" add "content/posts/${finalSlug}.mdx"`, { stdio: "inherit" });
      execSync(`git -C "${ROOT}" commit -m "Post: ${post.title} [PicoClaw/${provider}]"`, { stdio: "inherit" });
      execSync(`git -C "${ROOT}" push`, { stdio: "inherit" });
      console.log("🚀 Pushed — Vercel will deploy automatically.");
    } catch (err) {
      console.error("Git error:", err.message);
    }
  } else {
    console.log("\nTip: Add --commit to auto-push and trigger a Vercel deploy.");
  }
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});

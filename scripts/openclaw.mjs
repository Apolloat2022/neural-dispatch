#!/usr/bin/env node
/**
 * OpenClaw — Deep-research AI blog post generator using local Ollama
 *
 * Runs entirely on your machine — no API costs, no data leaving your network.
 * Uses the Ollama OpenAI-compatible endpoint with streaming output.
 *
 * Prerequisites:
 *   1. Install Ollama: https://ollama.com
 *   2. Pull a model:   ollama pull llama3.2
 *                  or: ollama pull mistral
 *                  or: ollama pull deepseek-r1:8b
 *   3. Ollama must be running (it starts automatically on most systems)
 *
 * Usage:
 *   node scripts/openclaw.mjs "Your Post Topic"
 *   node scripts/openclaw.mjs "Your Post Topic" --commit
 *   OLLAMA_MODEL=mistral node scripts/openclaw.mjs "Your Topic"
 *
 * Or via npm:
 *   npm run openclaw -- "Your Post Topic" --commit
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Load .env.local ────────────────────────────────────────────────────────────

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

// ── Helpers ────────────────────────────────────────────────────────────────────

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

// ── Ollama streaming call ──────────────────────────────────────────────────────

async function callOllama(baseUrl, model, systemPrompt, userPrompt) {
  const url = `${baseUrl}/api/chat`;

  const body = {
    model,
    stream: true,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    options: {
      temperature: 0.7,
      num_predict: 6000,
    },
  };

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    if (err.code === "ECONNREFUSED" || err.message.includes("fetch failed")) {
      throw new Error(
        `Cannot connect to Ollama at ${baseUrl}.\n` +
        `  → Make sure Ollama is running: https://ollama.com\n` +
        `  → Then pull a model: ollama pull ${model}`
      );
    }
    throw err;
  }

  if (!res.ok) {
    const errText = await res.text();
    if (errText.includes("model") && errText.includes("not found")) {
      throw new Error(
        `Model "${model}" not found in Ollama.\n` +
        `  → Pull it first: ollama pull ${model}\n` +
        `  → Or set OLLAMA_MODEL= in .env.local to a model you have.`
      );
    }
    throw new Error(`Ollama error ${res.status}: ${errText}`);
  }

  // Stream NDJSON response
  let fullText = "";
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  process.stdout.write("   Generating");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split("\n").filter(Boolean);

    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        const token = parsed?.message?.content ?? "";
        fullText += token;

        // Show progress dots instead of raw JSON
        if (token && !token.includes("{") && fullText.length % 100 < token.length) {
          process.stdout.write(".");
        }

        if (parsed.done) {
          process.stdout.write(" done\n");
        }
      } catch {
        // Skip malformed lines
      }
    }
  }

  return fullText;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const topic = args.filter((a) => !a.startsWith("--")).join(" ").trim();
  const shouldCommit = args.includes("--commit");

  if (!topic) {
    console.error('Usage: node scripts/openclaw.mjs "Your Post Topic" [--commit]');
    process.exit(1);
  }

  const baseUrl = (process.env.OLLAMA_BASE_URL || "http://localhost:11434").replace(/\/$/, "");
  const model = process.env.OLLAMA_MODEL || "llama3.2";

  console.log(`\n🦅 OpenClaw generating: "${topic}"`);
  console.log(`   Engine: Ollama (${baseUrl})`);
  console.log(`   Model:  ${model}`);
  console.log(`   Mode:   Local — no data leaves your machine\n`);

  // Check Ollama is reachable before starting
  try {
    const ping = await fetch(`${baseUrl}/api/tags`);
    if (!ping.ok) throw new Error("Ollama not responding");
  } catch {
    console.error(`Error: Cannot reach Ollama at ${baseUrl}`);
    console.error(`  → Start Ollama: open the Ollama app or run 'ollama serve'`);
    console.error(`  → Pull the model: ollama pull ${model}`);
    process.exit(1);
  }

  const systemPrompt = `You are a senior tech journalist and researcher for The Neural Dispatch — a premium AI publication by Apollo Technologies US.

Your writing standards:
- Authoritative, precise tone — zero marketing hype
- Real names, real numbers, specific examples
- Structured with clear ## and ### headings
- 800–1100 words of body content
- Include a comparison table where it adds value
- Code blocks where useful
- Write for technical professionals who already understand the domain

CRITICAL: You must respond with ONLY a valid JSON object. No markdown code fences. No text before the opening brace. No text after the closing brace. Just the raw JSON.

JSON structure:
{
  "title": "Post title",
  "category": "Tools",
  "excerpt": "One compelling sentence under 160 characters",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "readTime": "X min read",
  "author": "The Neural Dispatch",
  "authorRole": "Staff Writer",
  "content": "Full MDX body — use ## headings, **bold**, \`inline code\`, fenced code blocks, tables, > blockquotes. No H1 at the top. Start with a strong intro paragraph."
}

Category must be exactly one of: Tools, Research, Use Cases, Industry`;

  const userPrompt = `Write a deep, well-structured blog post about: "${topic}"

Use your training knowledge to produce an accurate, specific, and genuinely useful post for technical readers.
Remember: return ONLY the JSON object. Nothing else.`;

  console.log("─".repeat(60));

  let rawText;
  try {
    rawText = await callOllama(baseUrl, model, systemPrompt, userPrompt);
  } catch (err) {
    console.error("\nError:", err.message);
    process.exit(1);
  }

  console.log("─".repeat(60));

  // Extract JSON — some models wrap in markdown fences despite instructions
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    console.error("\nError: No JSON found in model output.");
    const debugPath = path.join(ROOT, "openclaw-debug.txt");
    fs.writeFileSync(debugPath, rawText, "utf8");
    console.error(`Raw output saved to: openclaw-debug.txt`);
    console.error("Try a different model with: OLLAMA_MODEL=mistral node scripts/openclaw.mjs ...");
    process.exit(1);
  }

  let post;
  try {
    post = JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error("\nError: Model returned malformed JSON.", e.message);
    const debugPath = path.join(ROOT, "openclaw-debug.txt");
    fs.writeFileSync(debugPath, rawText, "utf8");
    console.error(`Raw output saved to: openclaw-debug.txt`);
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
    console.warn(`\n⚠️  ${slug}.mdx exists — saving as ${finalSlug}.mdx`);
  }

  fs.writeFileSync(finalPath, mdxContent, "utf8");

  console.log(`\n✅ Post saved: content/posts/${finalSlug}.mdx`);
  console.log(`   Title:    ${post.title}`);
  console.log(`   Category: ${post.category}`);
  console.log(`   Tags:     ${post.tags.join(", ")}`);
  console.log(`   Read:     ${post.readTime}`);

  if (shouldCommit) {
    console.log("\n📦 Committing and pushing...");
    try {
      execSync(`git -C "${ROOT}" add "content/posts/${finalSlug}.mdx"`, { stdio: "inherit" });
      execSync(`git -C "${ROOT}" commit -m "Post: ${post.title} [OpenClaw/ollama:${model}]"`, { stdio: "inherit" });
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

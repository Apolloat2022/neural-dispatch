# Neural Dispatch — Content Update Instructions

Last updated: 2026-04-20

## How to Add New Posts

The blog uses two AI generation scripts. Both write MDX files to `content/posts/` and optionally auto-commit + deploy.

---

## Option 1: PicoClaw (Gemini or Groq — fast, cloud)

**Setup (one-time):**
1. Get a free Gemini key at https://aistudio.google.com or Groq key at https://console.groq.com
2. Add to `.env.local`:
   ```
   PICOCLAW_PROVIDER=google        # or: groq
   GEMINI_API_KEY=your_key_here    # if using google
   GROQ_API_KEY=your_key_here      # if using groq
   ```

**Generate and publish a post:**
```bash
npm run picoclaw -- "Your Post Topic Here" --commit
```

The `--commit` flag auto-pushes to GitHub and triggers a Vercel deploy.

---

## Option 2: OpenClaw (Ollama — free, fully offline)

**Setup (one-time):**
1. Install Ollama: https://ollama.com
2. Pull a model: `ollama pull llama3.2`

**Generate and publish a post:**
```bash
npm run openclaw -- "Your Post Topic Here" --commit
```

---

## Suggested AI Agent Topics to Cover

Run any of these to keep the blog current:

```bash
npm run picoclaw -- "AI agents replacing knowledge workers in 2026" --commit
npm run picoclaw -- "McKinsey Lilli platform 20000 AI agents" --commit
npm run picoclaw -- "OpenAI operator agents enterprise deployment" --commit
npm run picoclaw -- "Anthropic Claude multi-agent orchestration" --commit
npm run picoclaw -- "AI agent security risks enterprise 2026" --commit
npm run picoclaw -- "Google Agentspace workforce automation" --commit
```

---

## Manual Post (no API key needed)

Create a file in `content/posts/your-slug.mdx` with this frontmatter:

```mdx
---
title: "Your Title"
date: "2026-04-20"
category: "Industry"        # Tools | Research | Use-Cases | Industry
excerpt: "One sentence summary shown on the card."
tags: ["tag1", "tag2"]
readTime: "5 min read"
featured: true
author: "Jordan Matthews"
authorRole: "Senior Tech Correspondent"
---

Post content in markdown here.
```

Then push:
```bash
git add content/posts/your-slug.mdx
git commit -m "Add: your post title"
git push
```

---

## Deploy

Vercel auto-deploys on every push to `main`. No manual deploy step needed once you push.

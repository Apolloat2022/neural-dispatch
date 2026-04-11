# The Neural Dispatch

> The frontline report on AI tools, breakthroughs, and what's actually being built.

A production-ready static blog built for **Apollo Technologies US**, featuring automated content generation via two AI writing agents: **PicoClaw** and **OpenClaw**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS + custom design tokens |
| Content | MDX files via `next-mdx-remote` |
| Animations | Framer Motion |
| Theming | next-themes (dark / light) |
| Email | Resend API (newsletter subscriptions) |
| Deployment | Vercel (auto-deploy on push) |
| Automation | PicoClaw + OpenClaw (Claude API) |

---

## Design System

| Token | Value |
|---|---|
| Background | `#0a0f1e` (deep navy) |
| Accent | `#00d4ff` (electric cyan) |
| Text | `#f0f4ff` (warm white) |
| Heading font | Space Grotesk |
| Body font | Inter |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.local.example .env.local
# Fill in RESEND_API_KEY and NOTIFY_EMAIL

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
neural-dispatch/
├── content/
│   └── posts/              # MDX blog posts — add new posts here
│       ├── top-5-ai-coding-tools-2025.mdx
│       ├── claude-content-automation-businesses.mdx
│       └── picoclaw-ai-agent-10-dollar-hardware.mdx
│
├── scripts/
│   ├── picoclaw.mjs        # Quick AI post generator (cheap, fast)
│   └── openclaw.mjs        # Researched AI post generator (web search)
│
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── posts/[slug]/      # Blog post page + OG image
│   │   ├── category/[slug]/   # Category filtered view
│   │   ├── about/             # About page
│   │   ├── newsletter/        # Newsletter page
│   │   ├── api/subscribe/     # Newsletter subscription API
│   │   ├── sitemap.ts         # Auto-generated sitemap
│   │   └── robots.ts          # robots.txt
│   │
│   ├── components/         # React components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── post-card.tsx
│   │   ├── post-content.tsx
│   │   ├── newsletter-section.tsx
│   │   ├── category-badge.tsx
│   │   ├── section-header.tsx
│   │   ├── theme-toggle.tsx
│   │   └── theme-provider.tsx
│   │
│   └── lib/
│       ├── posts.ts           # Post reading utilities (fs-based)
│       ├── utils.ts           # cn() helper
│       └── format-date.ts     # Date formatter
│
├── .env.local.example      # Environment variable template
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## Writing Posts Manually

Create a new `.mdx` file in `content/posts/` with this frontmatter:

```mdx
---
title: "Your Post Title"
date: "2025-04-15"
category: "Tools"           # Tools | Research | Use Cases | Industry
excerpt: "One-sentence description shown in post cards and SEO."
tags: ["tag1", "tag2", "tag3"]
readTime: "5 min read"
featured: false             # Set true on ONE post — shown large at top of homepage
author: "Your Name"
authorRole: "Staff Writer"
---

Your MDX content here. Supports **bold**, _italic_, `code`, tables,
blockquotes, and syntax-highlighted code blocks.
```

Save the file. Next.js picks it up immediately in dev, and it's pre-rendered at build time for production.

**Slug is derived from the filename** — `my-new-post.mdx` becomes `/posts/my-new-post`.

---

## Automation: PicoClaw

**PicoClaw** is a fast post generator using cloud AI. Supports two providers — switch with `PICOCLAW_PROVIDER` in `.env.local`.

### Setup

```bash
# In .env.local — choose your provider:

# Option A: Google Gemini (default)
PICOCLAW_PROVIDER=google
GOOGLE_API_KEY=AIzaSyxxxxxxxx   # free at aistudio.google.com

# Option B: Groq (fastest inference)
PICOCLAW_PROVIDER=groq
GROQ_API_KEY=gsk_xxxxxxxx       # free tier at console.groq.com
```

### Usage

```bash
node scripts/picoclaw.mjs "Top 10 Open Source LLMs in 2025"
node scripts/picoclaw.mjs "Why RAG is Replacing Fine-tuning"

# Switch provider on the fly
PICOCLAW_PROVIDER=groq node scripts/picoclaw.mjs "Getting Started with LangGraph"

# Auto-commit after generating
node scripts/picoclaw.mjs "The Rise of Agentic AI" --commit

# Or via npm shortcut
npm run picoclaw -- "Your Topic" --commit
```

### What It Does

1. Calls Gemini 2.0 Flash (Google) or Llama 3.3 70B (Groq) with a detailed blog-writing prompt
2. Receives structured JSON with frontmatter + body content
3. Writes an `.mdx` file to `content/posts/`
4. Optionally `git commit` + `git push` → triggers Vercel deploy

---

## Automation: OpenClaw

**OpenClaw** runs entirely on your machine using **local Ollama**. No API costs, no data leaving your network.

### Setup

```bash
# 1. Install Ollama: https://ollama.com
# 2. Pull a model:
ollama pull llama3.2       # good balance (2GB)
# or
ollama pull mistral        # strong instruction-following (4GB)
# or
ollama pull deepseek-r1:8b # reasoning model (5GB)

# 3. In .env.local:
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2
```

### Usage

```bash
node scripts/openclaw.mjs "GPT-5 vs Claude 4: The Real Comparison"
node scripts/openclaw.mjs "State of AI Agents in 2025"

# Override model on the fly
OLLAMA_MODEL=mistral node scripts/openclaw.mjs "How Cursor Beat GitHub Copilot"

# Auto-commit and push
node scripts/openclaw.mjs "The Robotics AI Boom" --commit

# Or via npm shortcut
npm run openclaw -- "Your Topic" --commit
```

### What It Does

1. Connects to your local Ollama instance (checks it's running first)
2. Streams the response with progress dots — no raw JSON in your terminal
3. Extracts structured frontmatter + MDX content from the model output
4. Writes the `.mdx` file to `content/posts/`
5. Optionally commits and pushes to GitHub → Vercel auto-deploys

---

## Comparison: PicoClaw vs OpenClaw

| | PicoClaw | OpenClaw |
|---|---|---|
| Provider | Google Gemini or Groq | Local Ollama |
| API cost | Free tier / cents | Zero — runs locally |
| Privacy | Cloud API | 100% on your machine |
| Speed | ~5 seconds | ~30–120s (depends on hardware) |
| Internet required | Yes | No (after model pull) |
| Best for | Fast drafts, high volume | Privacy, offline, no cost |

---

## Deployment

The site deploys automatically to **Vercel** on every `git push` to `main`.

```
git push → GitHub → Vercel webhook → build → live
```

### Environment Variables (Vercel)

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for newsletter emails |
| `NOTIFY_EMAIL` | Email that receives new subscriber notifications |
| `ANTHROPIC_API_KEY` | Only needed if running scripts on a server |

### Manual Deploy Trigger

```bash
# Any change pushed to main triggers a deploy
git add content/posts/my-new-post.mdx
git commit -m "Add: My New Post"
git push
```

---

## Newsletter

Subscribers submit their email via the form on the homepage or `/newsletter`. The `/api/subscribe` serverless function forwards a notification to your `NOTIFY_EMAIL` via Resend.

To activate:
1. Sign up at **resend.com** (free — 3,000 emails/month)
2. Create an API key with **Sending access** (not full access)
3. Add `RESEND_API_KEY` and `NOTIFY_EMAIL` in Vercel env vars
4. Redeploy

---

## Adding a New Category

Categories are defined in `src/app/category/[slug]/page.tsx`. To add a new one:

1. Add the slug to `VALID_CATEGORIES`
2. Add a label in `categoryLabels`
3. Add a description in `categoryDescriptions`
4. Add a color in `src/components/category-badge.tsx`
5. Add a nav link in `src/components/navbar.tsx`

---

## Built By

**Apollo Technologies US** — [neuraldispatch.com](https://neuraldispatch.com)

---
name: daily-ai-top10
description: Research the day's top 10 AI news with a research swarm, publish it as a Neural Dispatch MDX post, and push to git. Use when the user says "daily AI news", "top 10 AI news", "run the daily dispatch", or invokes /daily-ai-top10. Takes an optional date (defaults to today).
---

# Daily Top 10 AI News

Publishes one post per day to `content/posts/` and pushes to `origin/main` (Vercel deploys).

Date = today unless the user gives one. Use it everywhere: `YYYY-MM-DD` in frontmatter,
`Month D, YYYY` in the title, `top-10-ai-news-<month>-<d>-<yyyy>` as the slug.

## 1. Swarm the research

Spawn **6 `general-purpose` agents in one message** (parallel), one beat each. The beats map to the
site's categories on purpose — the brief must span the whole publication, not just deal news.
Give every agent the date, and tell it to use the `firecrawl-search` skill
(`firecrawl search "<query>" --limit 8`) and `firecrawl-scrape` for any story worth quoting:

| Beat | Covers | Maps to |
|---|---|---|
| 1. Frontier labs | model releases, benchmarks, papers — OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, xAI, Qwen | Research |
| 2. Tools & platforms | coding agents, IDEs, dev platforms, agent frameworks, MCP, open source releases | Tools |
| 3. Enterprise & deployment | enterprise rollouts, adoption data, vendor moves (Microsoft, Salesforce, AWS, Databricks, SAP), outages and rollbacks | Enterprise AI |
| 4. Money | funding, M&A, earnings, AI revenue numbers, valuations, IPOs | Industry |
| 5. Infra, policy & security | chips, datacenters, energy, regulation, lawsuits, CVEs, safety incidents | Technology |
| 6. Work & practice | hiring and job-market data, skills, org change, real deployments with named outcomes, research on how teams actually use AI | Future of Work / Use Cases / Education |

Each returns 5–8 candidates as: headline, one-sentence what-happened, why-it-matters, source URL,
publication date, **and which category above it belongs to**. **Reject anything not published within
the last 48 hours** and anything without a real, working source URL. No source URL, no story.
The URL is for your verification only — it never appears in the published post (see step 4).

## 2. Rank for consequence *and* spread

Dedupe across agents, then pick 10 ordered by consequence — a shipped thing or a hard number beats
an announcement, an announcement beats a rumor. Then enforce breadth:

- **At most 3 stories from any one category.** A list that is 7 funding rounds is a failure.
- **At least 5 of the 8 categories represented.** If a beat came back thin, take its best story anyway
  over a fourth story from a crowded beat.
- Beat 6 is the one that silently goes missing. Check it landed before you start writing.

Note in-house angles: link to related `content/posts/*.mdx` where genuinely relevant.

## 3. Pick the post's category — rotate it

Set frontmatter `category` to the category that most of the day's stories fall under. **If that
category matches any of the last 3 daily briefs, use the runner-up instead.** Check with:

```
grep -l '"ai-news"' content/posts/*.mdx | xargs grep -h '^category:' | tail -3
```

The point is that daily briefs accumulate across the category pages instead of piling into Industry.
Valid values, exactly as spelled elsewhere in `content/posts/`: `Industry`, `Research`, `Tools`,
`Technology`, `Enterprise AI`, `Future of Work`, `Education`, `Use Cases`.

## 4. Write the post

`content/posts/top-10-ai-news-<month>-<d>-<yyyy>.mdx`:

```
---
title: "Top 10 AI News — <Month D, YYYY>"
date: "<YYYY-MM-DD>"
category: "<from step 3>"
excerpt: "<one sentence naming the 2-3 biggest stories>"
tags: ["ai-news", "daily-brief", ...5-8 story-specific tags]
readTime: "<N> min read"
featured: false
author: "Neural Dispatch"
authorRole: "Editorial Desk"
---
```

Keep the `ai-news` and `daily-brief` tags exactly — step 3's rotation check depends on them.

Body: two-sentence intro, then `## 1. <Headline>` … `## 10. <Headline>`, each 2–4 paragraphs —
what happened, the number that matters, why it matters. Do not publish source links or a sources
section — the source URL is used for verification in step 2 only, never printed in the post. Attribute
in prose instead ("Fortune reported…", "Gartner released…").
Close with a short "What to watch" paragraph. House voice: declarative, specific, no hype adjectives,
no bullet-point soup, no "in the ever-evolving landscape". Never invent a number or a quote.

Internal links are written `/posts/<slug>` — the post renderer adds the `/neural-dispatch` basePath.
Do not hardcode the basePath, and do not add an MDX components override for it; one already exists.

## 5. Verify, commit, push

```
npm run build        # must pass — MDX/frontmatter errors surface here
git add content/posts/<slug>.mdx
git commit -m "feat: top 10 AI news for <Month D, YYYY>"
git push origin main
```

Run git commands bare (no `cd` prefix) — the permission classifier blocks prefixed ones.
If the push is rejected, `git pull --rebase origin main` and check whether the remote already
changed what you were about to change before re-pushing.
If a story turns out to be unverifiable, drop it and backfill from the ranked spares rather than
shipping nine.

---
name: daily-ai-top10
description: Research the day's top 10 AI news with a research swarm, publish it as a Neural Dispatch MDX post, and push to git. Use when the user says "daily AI news", "top 10 AI news", "run the daily dispatch", or invokes /daily-ai-top10. Takes an optional date (defaults to today).
---

# Daily Top 10 AI News

Publishes one post per day to `content/posts/` and pushes to `origin/main` (Vercel deploys).

Date = today unless the user gives one. Use it everywhere: `YYYY-MM-DD` in frontmatter,
`Month D, YYYY` in the title, `top-10-ai-news-<month>-<d>-<yyyy>` as the slug.

## 1. Swarm the research

Spawn **4 `general-purpose` agents in one message** (parallel), one beat each. Give every agent
the date, and tell it to use the `firecrawl-search` skill (`firecrawl search "<query>" --limit 8`)
and `firecrawl-scrape` for any story worth quoting:

1. **Frontier labs** — model releases, benchmarks, research from OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, xAI.
2. **Enterprise & agents** — agent platforms, deployments, MCP, adoption data, notable outages/failures.
3. **Money** — funding rounds, M&A, earnings, valuations, layoffs, AI revenue numbers.
4. **Infra & policy** — chips, datacenters, energy, regulation, lawsuits, safety/security incidents.

Each returns 5–8 candidates as: headline, one-sentence what-happened, why-it-matters, source URL,
publication date. **Reject anything not published within the last 48 hours** and anything without
a real, working source URL. No source URL, no story.

## 2. Rank

Dedupe across agents, then pick 10 ordered by consequence — a shipped thing or a hard number beats
an announcement, an announcement beats a rumor. Cap it at 3 stories from any one beat so the list
isn't all funding. Note in-house angles: link to related `content/posts/*.mdx` where genuinely relevant.

## 3. Write the post

`content/posts/top-10-ai-news-<month>-<d>-<yyyy>.mdx`, frontmatter matching the existing posts:

```
---
title: "Top 10 AI News — <Month D, YYYY>"
date: "<YYYY-MM-DD>"
category: "Industry"
excerpt: "<one sentence naming the 2-3 biggest stories>"
tags: ["ai-news", "daily-brief", ...5-8 story-specific tags]
readTime: "<N> min read"
featured: false
author: "Neural Dispatch"
authorRole: "Editorial Desk"
---
```

Body: two-sentence intro, then `## 1. <Headline>` … `## 10. <Headline>`, each 2–4 paragraphs —
what happened, the number that matters, why it matters — ending with a `[Source](url)` link.
Close with a short "What to watch" paragraph. House voice: declarative, specific, no hype adjectives,
no bullet-point soup, no "in the ever-evolving landscape". Never invent a number or a quote.

## 4. Verify, commit, push

```
npm run build        # must pass — MDX/frontmatter errors surface here
git add content/posts/<slug>.mdx
git commit -m "feat: top 10 AI news for <Month D, YYYY>"
git push origin main
```

Run git commands bare (no `cd` prefix) — the permission classifier blocks prefixed ones.
If a story turns out to be unverifiable, drop it and backfill from the ranked spares rather than
shipping nine.

## Scheduling

Not self-triggering. Either invoke `/daily-ai-top10` each morning, or wire a cron once with the
`schedule` skill / `CronCreate` pointing at this skill.

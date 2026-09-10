# To Do — Neural Dispatch Daily AI Brief

Status as of September 9, 2026.

## 1. Finish the scheduled task (blocked — needs you, elevated)

The task `Neural Dispatch Daily AI Top 10` is registered but its action is malformed. It was
created from an elevated prompt, so this session gets `Access is denied` trying to change it.

The argument came out as `/c \"<repo>\scripts\daily-dispatch.cmd\"` — the `\"` was escaping meant
for a `! powershell -Command "..."` wrapper, and running the command directly baked the
backslashes in literally. cmd.exe cannot resolve that path, so **the task fails immediately and
publishes nothing.**

Open an **elevated PowerShell**, `cd` to this repo, then run:

```powershell
$r = $PWD.Path
Set-ScheduledTask -TaskName 'Neural Dispatch Daily AI Top 10' -Action (New-ScheduledTaskAction -Execute "$r\scripts\daily-dispatch.cmd" -WorkingDirectory $r)
Disable-ScheduledTask -TaskName 'Neural Dispatch Daily AI Top 10'
```

A scheduled task needs a fully-qualified path, so `$PWD` supplies it at run time rather than this
file hardcoding it. Confirm you are in the right directory first — `Test-Path .\scripts\daily-dispatch.cmd`
should return `True`.

This points the task straight at the `.cmd` (no `cmd.exe /c`, nothing to quote wrong) and
disables it until tomorrow, so a catch-up run does not publish a second September 9 post.

Verify:

```powershell
(Get-ScheduledTask -TaskName 'Neural Dispatch Daily AI Top 10').Actions[0] | Format-List Execute, Arguments, WorkingDirectory
```

`Execute` = full `.cmd` path, `Arguments` = empty.

## 2. Re-enable tomorrow morning

```powershell
Enable-ScheduledTask -TaskName 'Neural Dispatch Daily AI Top 10'
```

Runs daily at 7:12am. After the first real run, read `logs\daily-dispatch-<date>.log` and confirm
it published — do not assume it worked.

## 3. Watch on the first unattended run

- **Did it publish at all?** The headless run is `claude -p "/daily-ai-top10" --permission-mode acceptEdits`.
  If it stalled on a permission prompt, add the offending command to `.claude/settings.local.json`.
- **Did the category rotate?** Sept 9 was `Industry`. Sept 10 must not be. Check:
  `grep -l '"ai-news"' content/posts/*.mdx | xargs grep -h '^category:' | tail -3`
- **Did all six beats land?** Beat 6 (Work & practice) is the one that silently goes missing.
- **Did the push succeed?** The remote moves independently; the skill rebases on rejection.

## 4. Known gaps / not done

- **Machine must be on at 7:12am.** `-StartWhenAvailable` catches up a missed run, but a laptop
  that is off overnight publishes late. If that becomes routine, move the run to a server or a
  cloud schedule.
- **Never test-run end to end.** Deliberate — a test run would have published a duplicate
  September 9 post. First true validation is the first real morning run.
- **No dedupe guard.** Two runs on the same date overwrite the same slug, which is harmless, but
  nothing stops a same-day rerun from rewriting a post you already published.
- **Firecrawl rate limits** killed a couple of searches during the Sept 9 run (EU regulatory
  coverage was the gap). If beats come back thin, that is the first thing to check.

## 5. Unrelated, still open from earlier work

- `/admin` has no Remove button for subscribers — would double as unsubscribe handling.
- `RESEND_API_KEY` was flagged "Needs Attention" in Vercel; newsletter notifications may not be
  sending.

## Reference

- Skill: `.claude/skills/daily-ai-top10/SKILL.md` — run by hand any time with `/daily-ai-top10`
  (takes an optional date).
- Runner: `scripts/daily-dispatch.cmd` — safe to execute directly to test.
- Logs: `logs/daily-dispatch-<date>.log` (git-ignored).
- Today's post: `content/posts/top-10-ai-news-september-9-2026.mdx`.

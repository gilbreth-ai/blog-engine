---
name: blog-schedule
description: Set up automatic blog post writing on a recurring schedule. Creates a remote trigger that writes and publishes posts automatically. Use when the user wants regular blog content without manual effort.
user-invocable: true
allowed-tools: Read, Bash, RemoteTrigger
argument-hint: [frequency, e.g. "every Monday" or "twice a week"]
---

You are setting up automatic recurring blog post writing.

## Step 1: Ask Schedule Preferences

Ask the user conversationally (not as a form):

1. **Frequency** — "How often should I write a new post?" (e.g., "every Monday", "twice a week", "every day", "every 2 weeks")
2. **Topic source** — "Should I pick topics automatically based on your brand-voice.md, or do you have a list of topics?"
   - If they have a list: ask them to put it in `content/topics.md` (one topic per line)
   - If automatic: confirm you'll choose SEO-relevant topics based on their brand and reader persona

If `$ARGUMENTS` already specifies frequency (e.g., `/blog-schedule every Monday`), skip question 1.

## Step 2: Read Brand Context

Read `brand-voice.md` from the project root to understand the brand, reader persona, and tone. This context is passed to the trigger prompt so every auto-generated post matches the brand.

## Step 3: Build the Trigger Prompt

Construct a prompt that will be executed by the remote trigger. The prompt must be self-contained because the trigger runs in a fresh session with no conversation history.

The prompt should:
1. Read `brand-voice.md` for brand context
2. Check `content/topics.md` — if it exists and has unchecked topics, pick the next one. If not, auto-select a topic based on the brand.
3. Read existing posts in `content/posts/` to avoid duplicate topics and to add internal links
4. Execute the full blog-writer workflow: research → write → validate → thumbnail
5. Save the post and thumbnail
6. If using topics.md, mark the topic as done (change `- [ ]` to `- [x]`)
7. Commit the new post to git: `git add content/ public/ && git commit -m "post: {title}"`

## Step 4: Create the Remote Trigger

Use the RemoteTrigger tool to create a scheduled trigger.

Convert the user's frequency to a cron expression. Avoid :00 and :30 minutes to reduce API congestion:

| User says | Cron | Note |
|-----------|------|------|
| "every day" | `17 9 * * *` | 9:17am daily |
| "every Monday" | `23 9 * * 1` | Monday 9:23am |
| "every weekday" | `13 9 * * 1-5` | Weekdays 9:13am |
| "twice a week" | `43 9 * * 1,4` | Monday + Thursday 9:43am |
| "every 2 weeks" | `37 9 1,15 * *` | 1st and 15th of month |
| "3 times a week" | `7 9 * * 1,3,5` | Mon/Wed/Fri 9:07am |

Use the RemoteTrigger create action with:
- `prompt`: the self-contained prompt from Step 3
- The schedule/cron as appropriate for the API

## Step 5: Confirm

Tell the user:

```
Automatic posting is set up.

Schedule: {human-readable schedule}
Topic source: {automatic / from topics.md}
Next post: {next scheduled time}

Each post will be auto-committed to git. If you have Vercel connected to GitHub, it deploys automatically.

To stop: /blog-schedule-stop
To check status: /blog-schedule-status

Note: Remote triggers require a Claude Max or Team plan.
```

## Important Notes

- The trigger runs in a NEW Claude Code session each time — it has no memory of previous runs. That's why the prompt must read brand-voice.md and check existing posts every time.
- If the user's project is connected to GitHub + Vercel, the git commit + push will auto-deploy the new post.
- Remote triggers survive session restarts — they run on Anthropic's servers.

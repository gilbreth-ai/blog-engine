---
name: blog-setup
description: Scaffold a new Next.js blog with 21 MDX components, Tailwind styling, and Vercel deployment. Use when starting a blog project from scratch.
user-invocable: true
allowed-tools: Bash, Write, Read, Glob
argument-hint: [project-name]
---

You are setting up a new blog project from scratch. Follow these steps exactly.

## Step 1: Onboarding Interview

Before creating any files, ask the user these questions to personalize the blog. Ask them conversationally, not as a form. If they skip or say "later", use the defaults shown.

1. **Brand name** — "What's your company or brand name?" (default: "Blog")
2. **Blog title** — "What should the blog be called? This appears in the header and browser tab." (default: brand name)
3. **One-line description** — "Describe your blog in one sentence. This is used for SEO." (default: "Thoughts, guides, and deep dives.")
4. **Language** — "What language will you write in? English, Korean, Japanese, or something else?" (default: "en")
5. **Reader persona** — "Who reads this blog? Be specific about their role and what they already know." (default: skip)
6. **Tone** — "How should the writing feel? Pick 3-4 adjectives, or paste a paragraph you love." (default: "Direct, specific, conversational.")
7. **Primary color** — "What's your brand color? Give a hex code." (default: #e8590c)
8. **Author name** — "Who should be credited as the author?" (default: brand name + " Team")

Why ask these: A blog that says "Blog" in the header and uses generic descriptions feels like a template. Five minutes of personalization makes the first `pnpm dev` feel like THEIR blog, not a starter kit.

Collect the answers, then proceed. Use the answers to customize every file below.

## Step 2: Create Project Directory

If `$ARGUMENTS` is provided, create a directory with that name in the current working directory. If no argument is given, use the current directory as the project root.

```
PROJECT_DIR="./$ARGUMENTS"  # or "." if no argument
mkdir -p "$PROJECT_DIR"
```

## Step 3: Copy Template Files

Copy every file from `${CLAUDE_PLUGIN_ROOT}/skills/blog-setup/templates/` into the project directory, preserving the full directory structure. This includes:

- `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/blog/[slug]/page.tsx`
- `components/mdx/` (21 MDX components)
- `lib/mdx.ts`, `lib/palette.ts`
- `content/posts/.gitkeep`, `public/blog/thumbnails/.gitkeep`

Read each template file and write it to the corresponding path in the project directory. Preserve exact contents.

**Critical: do NOT modify these patterns in the template files:**
- `"use client"` directives — components with event handlers or React hooks MUST keep this. Removing it causes "Event handlers cannot be passed to Client Component props" at runtime.
- `React.JSX.IntrinsicElements` — this is the React 19 syntax. Do NOT change it to `JSX.IntrinsicElements` (which was removed in `@types/react` 19).
- `Record<string, React.ComponentType<any>>` in `lib/mdx.ts` — the `any` is intentional. MDX passes props dynamically; strict typing causes build failures under `strict: true`.
- Unicode ranges in `slugify()` and `extractHeadings()` — these support Korean headings for TOC anchor links. Do NOT simplify the regex to ASCII-only.
- `scroll-behavior: smooth` and `scroll-padding-top` in `globals.css` — these make TOC anchor links scroll smoothly and prevent headings from hiding behind the header.

## Step 4: Personalize Template Files

Using the answers from Step 1, modify the copied files:

**`app/layout.tsx`:**
- Replace the blog title `"Blog"` in the header link with the user's blog title
- Replace `metadata.title.default` with the blog title
- Replace `metadata.title.template` with `"%s — {blog title}"`
- Replace `metadata.description` with the user's one-line description
- Set `<html lang="...">` to the user's language code (en, ko, ja, etc.)

**`app/globals.css`:**
- Replace `--color-brand: #e8590c` with the user's primary color

**`app/page.tsx`:**
- Replace the empty-state heading "Welcome" with something personalized using the brand name (e.g., "Welcome to {brand name}'s Blog")

## Step 5: Install Dependencies

```bash
cd "$PROJECT_DIR" && pnpm install
```

If pnpm is not available, fall back to `npm install`.

## Step 6: Create brand-voice.md

Create a REAL `brand-voice.md` (not just an example template) using the user's answers:

```markdown
# Brand Voice — {brand name}

## Reader
{user's reader persona answer, or "General audience interested in {brand name}'s domain."}

## Tone
{user's tone answer, or "Direct, specific, conversational."}

## Language
{user's language answer}

## Forbidden Terms
leverage, utilize, comprehensive, cutting-edge, game-changer, deep dive, let's dive in

## Brand
- Primary color: {user's color}
- Blog URL pattern: /blog/[slug]
- Author name: {user's author name}
```

Why brand-voice.md instead of brand-voice.example.md: The user just answered these questions. Creating the active file immediately means their first blog post already uses their voice. No extra "copy the example file" step.

Also create `brand-voice.example.md` with the full template (including explanations for each section) in case they want to add more detail later.

## Step 7: Create CLAUDE.md

Write a `CLAUDE.md` file in the project root:

```markdown
# {blog title}

{one-line description}

## Structure

- `content/posts/` — MDX blog posts (frontmatter + components)
- `components/mdx/` — 21 reusable MDX components (charts, callouts, accordions, etc.)
- `lib/mdx.ts` — MDX rendering pipeline and component registry
- `lib/palette.ts` — Chart color palette
- `app/page.tsx` — Post listing (reads from content/posts/)
- `app/blog/[slug]/page.tsx` — Post detail with TOC sidebar and JSON-LD
- `public/blog/thumbnails/` — Post thumbnail SVGs
- `brand-voice.md` — Brand voice and tone configuration

## Writing Posts

Use the blog-engine plugin skills:

- `/blog-engine:blog-writer "Your topic"` — Write a complete MDX post with research, SEO, and rich components. Automatically generates a thumbnail too.
- `/blog-engine:blog-thumbnail "Your title"` — Regenerate or create a thumbnail separately

Posts are saved to `content/posts/{slug}.mdx`. Thumbnails go to `public/blog/thumbnails/{slug}.svg`.

## Customization

### Brand Voice
Edit `brand-voice.md` to change tone, reader persona, forbidden terms, and brand details. The blog-writer skill reads this file before every post.

### Colors
Edit `--color-brand` in `app/globals.css` to change the accent color. All components use this CSS variable.

### Typography
Fonts are configured in `app/layout.tsx` (Instrument Serif, Source Serif 4, JetBrains Mono). Change them there.

### Deployment
Run `vercel deploy` to deploy. No special configuration needed.

## Commands

```bash
pnpm dev    # Start dev server at localhost:3000
pnpm build  # Production build
pnpm start  # Start production server
```
```

## Step 8: Initialize Git

```bash
cd "$PROJECT_DIR" && git init && git add -A && git commit -m "init: blog scaffolded with blog-engine plugin"
```

## Step 9: Write the First Post Automatically

Do NOT ask the user for a topic. Based on the brand name, reader persona, and tone from the onboarding answers, choose a topic that is:
1. Broadly relevant to the brand's domain
2. Genuinely useful to their reader persona
3. A "first post" that establishes the blog's authority

Examples of good first-post topics by domain:
- Tech company → "How [technology] Actually Works (And Why It Matters)"
- Fashion brand → "How to Build a Wardrobe That Lasts"
- Food/restaurant → "The One Ingredient That Changes Everything"
- SaaS → "The Real Cost of Not Solving [problem]"
- General/unknown → "How to Get Started with [brand's domain]"

Then execute the full blog-writer workflow on this topic:
1. Research (SERP, PAA, competitor gaps, real data)
2. Write the complete MDX post following editorial-voice.md, component-registry.md, and language-rules.md
3. Validate (structure gate, quality gate, language gate)
4. Generate SVG thumbnail following blog-thumbnail design-system.md
5. Save post to `content/posts/{slug}.mdx` and thumbnail to `public/blog/thumbnails/{slug}.svg`

This ensures the user sees a fully rendered blog with real content on their first `pnpm dev`.

## Step 10: Print Success Message

Output this message (replace placeholders with actual values):

```
{blog title} is ready at ./$ARGUMENTS

Your first post "{post title}" is live with thumbnail.

Preview:
  cd $ARGUMENTS && pnpm dev → localhost:3000

Write more:
  /blog-writer "Your next topic"

Deploy:
  vercel deploy --prod

Your brand voice is configured in brand-voice.md.
```

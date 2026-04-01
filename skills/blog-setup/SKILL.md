---
name: blog-setup
description: Scaffold a new Next.js blog with 21 MDX components, Tailwind styling, and Vercel deployment. Use when starting a blog project from scratch.
user-invocable: true
allowed-tools: Bash, Write, Read, Glob
argument-hint: [project-name]
---

You are setting up a new blog project from scratch. Follow these steps exactly.

## Step 1: Create Project Directory

If `$ARGUMENTS` is provided, create a directory with that name in the current working directory. If no argument is given, use the current directory as the project root.

```
PROJECT_DIR="./$ARGUMENTS"  # or "." if no argument
mkdir -p "$PROJECT_DIR"
```

## Step 2: Copy Template Files

Copy every file from `${CLAUDE_PLUGIN_ROOT}/skills/blog-setup/templates/` into the project directory, preserving the full directory structure. This includes:

- `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `app/blog/[slug]/page.tsx`
- `components/mdx/` (21 MDX components)
- `lib/mdx.ts`, `lib/palette.ts`
- `content/posts/.gitkeep`, `public/blog/thumbnails/.gitkeep`

Read each template file and write it to the corresponding path in the project directory. Preserve exact contents.

## Step 3: Install Dependencies

```bash
cd "$PROJECT_DIR" && pnpm install
```

If pnpm is not available, fall back to `npm install`.

## Step 4: Create CLAUDE.md

Write a `CLAUDE.md` file in the project root with:

```markdown
# Blog

Next.js 15 + MDX blog with 21 rich components, Tailwind styling, and Vercel deployment.

## Structure

- `content/posts/` — MDX blog posts (frontmatter + components)
- `components/mdx/` — 21 reusable MDX components (charts, callouts, accordions, etc.)
- `lib/mdx.ts` — MDX rendering pipeline and component registry
- `lib/palette.ts` — Chart color palette
- `app/page.tsx` — Post listing (reads from content/posts/)
- `app/blog/[slug]/page.tsx` — Post detail with TOC sidebar and JSON-LD
- `public/blog/thumbnails/` — Post thumbnail SVGs

## Writing Posts

Use the blog-engine plugin skills:

- `/blog-engine:blog-writer "Your topic"` — Write a complete MDX post with research, SEO, and rich components
- `/blog-engine:blog-thumbnail "Your title"` — Generate an SVG thumbnail for a post

Posts are saved to `content/posts/{slug}.mdx` with frontmatter (title, description, slug, tags, publishedAt, readingTime).

## Customization

### Brand Voice
Copy `brand-voice.example.md` to `brand-voice.md` and edit it. The blog-writer skill reads this file to match your voice and tone.

### Colors
Edit `--color-brand` in `app/globals.css` to change the accent color. All components use this CSS variable.

### Typography
Fonts are configured in `app/layout.tsx` (Instrument Serif, Source Serif 4, JetBrains Mono). Change them there.

### Deployment
Run `vercel deploy` to deploy. No special configuration needed.

## Commands

```bash
pnpm dev    # Start dev server → localhost:3000
pnpm build  # Production build
pnpm start  # Start production server
```
```

## Step 5: Create brand-voice.example.md

Write a `brand-voice.example.md` file in the project root:

```markdown
# Brand Voice

## Reader
Who reads this blog? What do they already know? What are they trying to accomplish?
Example: "Mid-career developers evaluating tools for their team. They've built production apps and don't need basics explained."

## Tone
How should the writing feel? Pick 3-4 adjectives.
Example: "Direct, confident, occasionally witty. Never condescending."

## Language
What language conventions to follow?
Example: "Write in American English. Use contractions. Prefer short sentences."

## Forbidden Terms
Words and phrases to never use.
Example: "leverage, utilize, comprehensive, cutting-edge, game-changer, deep dive, let's dive in"

## Brand
- **Primary color**: #e8590c (change --color-brand in globals.css to match)
- **Blog URL pattern**: /blog/[slug]
- **Author name**: Your Name
```

## Step 6: Print Success Message

Output this message (replace $ARGUMENTS with the actual project name):

```
Blog ready at ./$ARGUMENTS

Next steps:
1. cd $ARGUMENTS && pnpm dev → localhost:3000
2. /blog-engine:blog-writer "Your topic here" → write your first post
3. /blog-engine:blog-thumbnail "Your title" → generate thumbnail

Customize: copy brand-voice.example.md → brand-voice.md and edit
Deploy: vercel deploy
```

# Blog Engine

> Write publish-ready blog posts with rich MDX components and SVG thumbnails.
> Research-first. SEO-optimized. Native-quality in any language.

A Claude Code plugin that turns a topic into a complete blog post with structured data (FAQ schema, HowTo schema), 22 rich MDX components (animated SVG diagrams, comparison tables, interactive checklists), and hover-animated SVG thumbnails.

## Quick Start

### 1. Install

```bash
claude plugin install blog-engine@github:storehaus/blog-engine
```

### 2. Scaffold your blog

```
/blog-engine:blog-setup my-blog
```

Creates a Next.js 15 project with 22 MDX components, Tailwind CSS, and Vercel deployment — ready in one command.

### 3. Write your first post

```
/blog-engine:blog-writer "How to choose the right fabric for your clothing line"
```

The skill auto-detects language, researches the topic (SERP analysis, competitor gaps, data collection), and produces a 2000+ word MDX post with rich components and structured data.

### 4. Generate a thumbnail

```
/blog-engine:blog-thumbnail "How to choose the right fabric"
```

Creates a hover-animated SVG thumbnail that matches your brand colors.

### 5. Preview and deploy

```bash
cd my-blog && pnpm dev    # Preview at localhost:3000
vercel deploy              # Deploy to production
```

## What You Get

Each blog post includes:

- **Rich MDX components** — comparison tables, animated SVG diagrams, interactive checklists, stat cards, process flows, and more
- **SEO structured data** — FAQ schema (5-6 items), HowTo schema for tutorials, citation references
- **Research-backed content** — every claim backed by real data, not AI speculation
- **Native-quality language** — writes like a native speaker in English, Korean, Japanese, and more
- **SVG thumbnails** — hover-animated, brand-colored, vector-perfect at any size

## Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| `blog-setup` | `/blog-engine:blog-setup [name]` | Scaffold a Next.js blog project |
| `blog-writer` | `/blog-engine:blog-writer [topic]` | Write a complete MDX blog post |
| `blog-thumbnail` | `/blog-engine:blog-thumbnail [title]` | Generate an SVG thumbnail |

## Customization

### Brand Voice (Easy)

Create `brand-voice.md` in your project root:

```markdown
## Reader
Sustainable fashion designers who source ethical fabrics.

## Tone
Warm but authoritative. Like a mentor, not a textbook.

## Forbidden Terms
fast fashion, cheap, budget, discount

## Brand
- Primary color: #2b8a3e
- Author name: FabricLab Team
```

The next post automatically uses your voice. Without this file, the built-in universal voice works for any domain.

### Visual Styling (Easy)

Edit `tailwind.config.ts` to change brand colors. All 22 components use CSS variables — change one value, change everything.

### Component Design (Medium)

Edit any component in `components/mdx/`. All use Tailwind CSS — a designer can freely change colors, spacing, typography.

## Components (22)

| Required | Recommended | Situational |
|----------|-------------|-------------|
| LeadParagraph | ComparisonTable | PriceBreakdown |
| Highlight | SVGDiagram | Timeline |
| References | Callout | AccordionGroup |
| | KeyTakeaway | DefinitionCard |
| | ProcessFlow | |
| | StatCard | |
| | Checklist | |
| | Chart | |
| | ProConCard | |
| | QuoteBlock | |

Plus layout components: TwoColumn, FullBleed, SectionDivider, ImageWithCaption.

## How It Works

1. **Auto-detect** — Language from your message, topic type (informational/technical/opinion), brand voice from optional file
2. **Research** — SERP analysis, competitor gaps, real data collection (adapted by topic type)
3. **Write** — MDX with components, structured data, native-quality language
4. **Validate** — Three quality gates: structure, quality, language

## Credits

Built by [Storehaus](https://storehaus.ai). Refined across 50+ published posts ranking on Google.

## License

MIT

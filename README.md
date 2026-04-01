# Blog Engine

> Turn a topic into a publish-ready blog post — with rich components, SVG thumbnails, and SEO/GEO structured data.
> Just say what you want to write about. The rest is automatic.

> 주제만 말하면 블로그 글이 완성됩니다 — 리서치, 컴포넌트, 썸네일, SEO/GEO까지 전부 자동.

---

## What is this? / 이게 뭐야?

A [Claude Code](https://claude.ai/code) plugin that writes professional blog posts for you.

You say a topic. It researches, writes a 2000+ word article with interactive components (comparison tables, animated diagrams, checklists), generates an SVG thumbnail, and saves everything ready to publish. All pages are 100% server-rendered (SSR) for maximum SEO performance.

Claude Code 플러그인입니다. 주제를 말하면 자동으로 리서치하고, 2000자 이상의 글을 인터랙티브 컴포넌트와 함께 작성하고, SVG 썸네일까지 만들어서 바로 배포할 수 있는 상태로 저장합니다. 모든 페이지가 100% 서버 렌더링(SSR)이라 SEO 성능이 최대입니다.

**No database. No CMS. No API keys.** Just MDX files in a Next.js project, deployed on Vercel.

---

## Prerequisites / 필요한 것

- [Claude Code](https://claude.ai/code) installed (CLI, desktop app, or IDE extension)
- [Node.js](https://nodejs.org/) 18+ and [pnpm](https://pnpm.io/)
- A [Vercel](https://vercel.com) account (free tier works)

---

## Getting Started / 시작하기

### Step 1: Install the plugin / 플러그인 설치

```bash
claude plugin install blog-engine@github:storehaus/blog-engine
```

That's it. Three skills are added to your Claude Code.

이 한 줄이면 됩니다. 세 가지 skill이 Claude Code에 추가됩니다.

### Step 2: Create your blog / 블로그 만들기

Open Claude Code anywhere and run:

```
/blog-engine:blog-setup my-blog
```

Claude asks a few questions to personalize your blog:
- Brand/company name (브랜드 이름)
- Blog title (블로그 제목)
- One-line description for SEO (한 줄 설명)
- Language (언어 — English, Korean, Japanese, etc.)
- Who reads your blog (독자는 누구인지)
- Writing tone (어떤 말투인지)
- Brand color as hex code (브랜드 색상)
- Author name (저자 이름)

Your answers are saved directly to `brand-voice.md` — the writer skill uses this on every post. No extra setup needed.

답변이 `brand-voice.md`에 바로 저장됩니다. 추가 설정 없이 첫 글부터 내 브랜드 톤으로 작성됩니다.

### Step 3: Write your first post / 첫 글 쓰기

```
/blog-engine:blog-writer "How to choose the right mechanical keyboard"
```

Or in Korean:
```
/blog-engine:blog-writer "기계식 키보드 고르는 법"
```

The skill will:
1. **Auto-detect** — Language, topic type, brand voice (zero questions asked)
2. **Research** — SERP analysis, competitor gaps, People Also Ask, 4-6 real statistics
3. **Write** — 2000+ word MDX with rich components, FAQ schema, citations
4. **Validate** — Structure gate, quality gate, native language gate
5. **Thumbnail** — Hover-animated SVG, auto-generated

Everything is saved automatically:
- Post → `content/posts/how-to-choose-the-right-mechanical-keyboard.mdx`
- Thumbnail → `public/blog/thumbnails/how-to-choose-the-right-mechanical-keyboard.svg`

### Step 4: Preview / 미리보기

```bash
cd my-blog
pnpm dev
```

Open `http://localhost:3000` — your blog with featured post, category filter, and 3-column grid.

### Step 5: Deploy / 배포

```bash
# Option A: Vercel CLI (one command)
vercel deploy --prod

# Option B: Connect to GitHub (auto-deploy on push — recommended)
gh repo create my-company/blog --private --source=. --push
# Then connect the repo at vercel.com/new
```

**After deploying, set this environment variable:**

```bash
vercel env add NEXT_PUBLIC_SITE_URL
# Value: https://your-blog.vercel.app (or your custom domain)
```

This is required for sitemap, canonical URLs, og:image, and all JSON-LD structured data to use the correct domain.

이 환경변수가 있어야 sitemap, canonical URL, og:image, JSON-LD가 올바른 도메인을 가리킵니다.

After connecting to GitHub, every `git push` automatically deploys.

---

## Skills / 사용할 수 있는 명령

### `/blog-engine:blog-setup [name]`

Scaffolds a new blog project. Asks personalization questions, creates Next.js project with 21 components, configures `brand-voice.md` from your answers.

### `/blog-engine:blog-writer [topic]`

Writes a complete blog post with thumbnail. Researches the topic, writes MDX with rich components, generates SVG thumbnail. Zero questions — language auto-detected.

**Examples:**
```
/blog-engine:blog-writer "How API rate limiting actually works"
/blog-engine:blog-writer "집에서 커피 로스팅 시작하는 법"
/blog-engine:blog-writer "When to hire your first employee"
```

### `/blog-engine:blog-thumbnail [title]`

Regenerates an SVG thumbnail for a post. Use when you want a different visual.

---

## SEO / GEO / SEO/GEO 최적화

The blog's primary purpose is search ranking. Every detail is optimized:

### Server-Side Rendering (SSR)

All pages are React Server Components — zero `"use client"` at page level. Search engines and AI engines receive fully rendered HTML with all content, structured data, and meta tags.

모든 페이지가 서버 컴포넌트입니다. 검색엔진과 AI 엔진이 완전히 렌더링된 HTML을 받습니다.

### Structured Data (JSON-LD)

Every blog post generates a comprehensive `@graph` with:

| Schema | Purpose |
|--------|---------|
| `WebSite` | Site-level identity for AI engine trust signals |
| `BlogPosting` | Full article metadata with `dateModified`, `wordCount`, `inLanguage`, `articleSection` |
| `BreadcrumbList` | SERP navigation (Home > Blog > Post Title) |
| `FAQPage` | Google featured snippets from FAQ export (5-6 Q&A) |
| `HowTo` | Google rich results for tutorial posts |
| `citation` | Source verification for GEO — AI engines check these |
| `speakable` | Marks LeadParagraph, KeyTakeaway, Highlight for voice assistants |
| `isPartOf` | Links posts to blog entity for topical authority |

### SEO Infrastructure

| Feature | File |
|---------|------|
| Dynamic sitemap | `app/sitemap.ts` — auto-discovers all posts |
| robots.txt | `app/robots.ts` — allows all crawlers, points to sitemap |
| Canonical URLs | Set on every page via `alternates.canonical` |
| OpenGraph | title, description, type=article, publishedTime, image |
| Twitter Cards | summary_large_image with title, description, image |
| Meta keywords | 10 SEO keywords per post |
| `<time datetime>` | Machine-readable publication dates |
| Image alt text | Post title on every thumbnail |
| Internal linking | Writer skill auto-links between existing posts |

### Content SEO

| Feature | How |
|---------|-----|
| SERP gap analysis | Every post researches top 5 competitors before writing |
| People Also Ask | FAQ schema sourced from real PAA queries |
| Keyword optimization | 10 targeted keywords in frontmatter |
| Fresh content signal | `updatedAt` field in frontmatter → `dateModified` in schema |
| E-E-A-T | Author schema, real citations, verifiable statistics |

---

## What's in a blog post? / 블로그 글에 뭐가 들어가나요?

| Feature | Description |
|---------|-------------|
| **Rich MDX components** | Comparison tables, animated SVG diagrams, interactive checklists, stat cards, process flows, callouts, and more (21 types) |
| **SEO structured data** | BlogPosting + FAQPage + HowTo + BreadcrumbList + citations + speakable |
| **Research-backed content** | Every claim backed by real statistics and named sources |
| **Native-quality language** | Writes like a native speaker. AI patterns explicitly blocked per language (EN/KR/JP) |
| **SVG thumbnail** | Hover-animated, brand-colored, 2-5KB vector |
| **Internal links** | Auto-links to existing posts for SEO authority distribution |

### Components / 포함된 컴포넌트

**Required** (every post): LeadParagraph, Highlight, References

**Recommended** (use when content calls for it):
ComparisonTable, SVGDiagram, Callout, KeyTakeaway, ProcessFlow, StatCard, Checklist, Chart, ProConCard, QuoteBlock

**Situational**: PriceBreakdown, Timeline, AccordionGroup, DefinitionCard

**Layout**: TwoColumn, FullBleed, SectionDivider, ImageWithCaption

---

## Blog Home Layout / 블로그 홈 레이아웃

The home page follows a proven blog layout:
- **Category filter** at the top (auto-generated from post tags)
- **Featured/pinned post** — full-width hero card
- **3-column grid** for remaining posts (responsive: 2 on tablet, 1 on mobile)
- Each card shows: thumbnail, category, title, description, date, reading time

---

## Customization / 커스터마이징

### Brand Voice / 브랜드 톤 (Easy)

Edit `brand-voice.md` in your project root (created during setup):

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

### Colors / 색상 (Easy)

Change one CSS variable in `app/globals.css`:

```css
:root {
  --color-brand: #2b8a3e; /* change this */
}
```

All 21 components and thumbnails automatically follow the new color.

### Typography / 타이포그래피 (Easy)

Fonts are in `app/layout.tsx`. Default: Instrument Serif (headings), Source Serif 4 (body), JetBrains Mono (code).

### Component Design / 컴포넌트 디자인 (Medium)

Edit any component in `components/mdx/`. All use Tailwind CSS.

---

## How it works / 작동 원리

```
You: "How to choose a mechanical keyboard"
                    │
                    ▼
         ┌─── AUTO-DETECT ───┐
         │ Language: English  │
         │ Type: Informational│
         │ Voice: brand-voice │
         └────────┬───────────┘
                  │
         ┌────────▼───────────┐
         │     RESEARCH       │
         │ SERP top 5 results │
         │ People Also Ask    │
         │ Competitor gaps    │
         │ 4-6 real stats     │
         └────────┬───────────┘
                  │
         ┌────────▼───────────┐
         │      WRITE         │
         │ 2000+ word MDX     │
         │ Rich components    │
         │ FAQ + citations    │
         │ Internal links     │
         └────────┬───────────┘
                  │
         ┌────────▼───────────┐
         │     VALIDATE       │
         │ Structure gate     │
         │ Quality gate       │
         │ Language gate      │
         └────────┬───────────┘
                  │
         ┌────────▼───────────┐
         │    THUMBNAIL       │
         │ SVG with hover     │
         │ Brand colors       │
         └────────┬───────────┘
                  │
                  ▼
    content/posts/slug.mdx ✓
    public/blog/thumbnails/slug.svg ✓
    JSON-LD: BlogPosting + FAQ + HowTo + BreadcrumbList ✓
```

---

## Project Structure / 프로젝트 구조

```
my-blog/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, colors, header/footer)
│   ├── page.tsx                ← Home (featured post + category filter + 3-col grid)
│   ├── blog/[slug]/page.tsx    ← Post detail (MDX + TOC + JSON-LD @graph)
│   ├── sitemap.ts              ← Dynamic sitemap for search engines
│   ├── robots.ts               ← Crawl directives + sitemap location
│   └── globals.css             ← Design tokens (brand color, fonts)
├── components/mdx/             ← 21 interactive components
├── lib/
│   ├── mdx.ts                  ← MDX renderer + component registry + heading IDs
│   └── palette.ts              ← Chart color palette
├── content/posts/              ← Your blog posts (MDX files)
├── public/blog/thumbnails/     ← Your thumbnails (SVG files)
├── brand-voice.md              ← Your brand voice config (auto-generated at setup)
├── package.json
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## Deployment / 배포 방법

### Vercel (Recommended / 추천)

```bash
# One-time setup
npm i -g vercel
vercel login

# Deploy
vercel deploy --prod

# Set your domain for SEO (required)
vercel env add NEXT_PUBLIC_SITE_URL
# Value: https://your-domain.com
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deploys on every `git push`.

### Other platforms

Standard Next.js project — works on Netlify, Cloudflare Pages, or self-hosted with `pnpm build && pnpm start`.

---

## FAQ

**Do I need a database?**
No. Posts are MDX files, thumbnails are SVGs. Everything lives in your git repo.

**Does it cost money?**
The plugin is free (MIT). You need a Claude Code subscription. Vercel free tier handles most blogs.

**What languages are supported?**
English, Korean, and Japanese have deep native-quality rules with AI pattern blocking. Other languages work with universal rules. Language auto-detected from your message.

**Is everything server-rendered?**
Yes. All pages are React Server Components. No `"use client"` at page level. Search engines receive complete HTML with all structured data.

**Can I use my own components?**
Yes. Add to `components/mdx/`, register in `lib/mdx.ts`, describe in `brand-voice.md`.

**Can I edit generated posts?**
Of course. They're MDX files — edit in any editor or Claude Code.

**How does GEO work?**
Every post generates comprehensive JSON-LD (`@graph` with BlogPosting, FAQPage, HowTo, citations, speakable). AI engines like Google SGE, Perplexity, and ChatGPT Search use this structured data to cite your content.

---

## Credits

Built by [Storehaus](https://storehaus.ai). Refined across 50+ published posts ranking on Google.

## License

MIT — use it however you want.

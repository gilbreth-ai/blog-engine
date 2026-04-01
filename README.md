# Blog Engine

> Turn a topic into a publish-ready blog post — with rich components, SVG thumbnails, and SEO structured data.
> Just say what you want to write about. The rest is automatic.

> 주제만 말하면 블로그 글이 완성됩니다 — 리서치, 컴포넌트, 썸네일, SEO까지 전부 자동.

---

## What is this? / 이게 뭐야?

A [Claude Code](https://claude.ai/code) plugin that writes professional blog posts for you.

You say a topic. It researches, writes a 2000+ word article with interactive components (comparison tables, animated diagrams, checklists), generates an SVG thumbnail, and saves everything ready to publish.

Claude Code 플러그인입니다. 주제를 말하면 자동으로 리서치하고, 2000자 이상의 글을 인터랙티브 컴포넌트(비교표, 애니메이션 다이어그램, 체크리스트)와 함께 작성하고, SVG 썸네일까지 만들어서 바로 배포할 수 있는 상태로 저장합니다.

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

That's it. The plugin adds three skills to your Claude Code.

이 한 줄이면 됩니다. 세 가지 skill이 Claude Code에 추가됩니다.

### Step 2: Create your blog / 블로그 만들기

Open Claude Code anywhere and run:

```
/blog-engine:blog-setup my-blog
```

Claude will ask you a few questions to personalize your blog:
- Brand/company name (브랜드 이름)
- Blog title (블로그 제목)
- One-line description (한 줄 설명)
- Language (언어 — English, Korean, Japanese, etc.)
- Who reads your blog (독자는 누구인지)
- Writing tone (어떤 말투인지)
- Brand color (브랜드 색상)
- Author name (저자 이름)

Then it scaffolds a complete Next.js blog with 21 interactive components, your brand colors, and your voice configured.

그러면 21개 인터랙티브 컴포넌트가 포함된 Next.js 블로그가 만들어지고, 브랜드 색상과 톤이 적용됩니다.

### Step 3: Write your first post / 첫 글 쓰기

```
/blog-engine:blog-writer "How to choose the right mechanical keyboard"
```

Or in Korean:
```
/blog-engine:blog-writer "기계식 키보드 고르는 법"
```

The skill will:
1. **Research** — Search Google, analyze competitors, collect real data
2. **Write** — 2000+ word MDX with rich components and structured data
3. **Thumbnail** — Generate a hover-animated SVG thumbnail
4. **Validate** — Check structure, quality, and native language quality

Everything is saved automatically:
- Post → `content/posts/how-to-choose-the-right-mechanical-keyboard.mdx`
- Thumbnail → `public/blog/thumbnails/how-to-choose-the-right-mechanical-keyboard.svg`

### Step 4: Preview / 미리보기

```bash
cd my-blog
pnpm dev
```

Open `http://localhost:3000` — your blog is live locally with the post rendered.

`http://localhost:3000`을 열면 글이 렌더링된 블로그를 볼 수 있습니다.

### Step 5: Deploy / 배포

```bash
# Option A: Vercel CLI (one command)
vercel deploy --prod

# Option B: Connect to GitHub (auto-deploy on push)
git remote add origin git@github.com:you/your-blog.git
git push -u origin main
# Then connect the repo on vercel.com/new
```

After connecting to GitHub, every `git push` automatically deploys.

GitHub에 연결하면 `git push`할 때마다 자동으로 배포됩니다.

---

## Skills / 사용할 수 있는 명령

### `/blog-engine:blog-setup [name]`

Scaffolds a new blog project. Asks personalization questions, creates Next.js project with components, configures your brand voice.

새 블로그 프로젝트를 만듭니다. 브랜드 관련 질문을 하고, Next.js 프로젝트를 생성합니다.

### `/blog-engine:blog-writer [topic]`

Writes a complete blog post. Researches the topic, writes MDX with rich components, generates a thumbnail. Zero questions asked — language is auto-detected from your message.

블로그 글을 작성합니다. 주제를 리서치하고, 컴포넌트가 포함된 MDX를 작성하고, 썸네일까지 생성합니다. 질문 없이 바로 시작 — 언어는 메시지에서 자동 감지합니다.

**Examples:**
```
/blog-engine:blog-writer "How API rate limiting actually works"
/blog-engine:blog-writer "집에서 커피 로스팅 시작하는 법"
/blog-engine:blog-writer "When to hire your first employee"
```

### `/blog-engine:blog-thumbnail [title]`

Generates (or regenerates) an SVG thumbnail for a post. Hover-animated, brand-colored, vector-perfect at any size.

SVG 썸네일을 생성합니다. 호버 애니메이션, 브랜드 색상, 벡터라서 어떤 크기에서도 선명합니다.

---

## What's in a blog post? / 블로그 글에 뭐가 들어가나요?

Every post includes:

| Feature | Description |
|---------|-------------|
| **Rich MDX components** | Comparison tables, animated SVG diagrams, interactive checklists, stat cards, process flows, callouts, and more (21 types) |
| **SEO structured data** | FAQ schema (5-6 Q&A for Google snippets), HowTo schema for tutorials, Article schema |
| **Research-backed content** | Every claim backed by real statistics and named sources — not AI speculation |
| **Native-quality language** | Writes like a native speaker. AI-specific patterns are explicitly blocked per language |
| **SVG thumbnail** | Hover-animated, brand-colored, 2-5KB (vs 200KB+ for raster images) |

### Components included / 포함된 컴포넌트

**Required** (every post): LeadParagraph, Highlight, References

**Recommended** (use when content calls for it):
ComparisonTable, SVGDiagram, Callout, KeyTakeaway, ProcessFlow, StatCard, Checklist, Chart, ProConCard, QuoteBlock

**Situational**: PriceBreakdown, Timeline, AccordionGroup, DefinitionCard

**Layout**: TwoColumn, FullBleed, SectionDivider, ImageWithCaption

---

## Customization / 커스터마이징

### Brand Voice / 브랜드 톤 (Easy)

Edit `brand-voice.md` in your project root. This file is created during setup with your answers, but you can edit it anytime:

`brand-voice.md`를 수정하세요. 설치 때 답변으로 자동 생성되지만, 언제든 수정할 수 있습니다:

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
  --color-brand: #2b8a3e; /* ← change this */
}
```

All 21 components and thumbnails automatically follow the new color.

모든 21개 컴포넌트와 썸네일이 자동으로 새 색상을 따릅니다.

### Typography / 타이포그래피 (Easy)

Fonts are in `app/layout.tsx`. Default: Instrument Serif (headings), Source Serif 4 (body), JetBrains Mono (code). Change them to any Google Font.

### Component Design / 컴포넌트 디자인 (Medium)

Edit any component in `components/mdx/`. All use Tailwind CSS — a designer can freely change colors, spacing, borders, shadows.

`components/mdx/` 안의 컴포넌트를 수정하세요. 전부 Tailwind CSS라서 디자이너가 자유롭게 바꿀 수 있습니다.

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
         │ 8-12 components    │
         │ FAQ + citations    │
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
```

---

## Project Structure / 프로젝트 구조

After setup, your blog looks like this:

```
my-blog/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, colors, header/footer)
│   ├── page.tsx                ← Home (post listing grid)
│   ├── blog/[slug]/page.tsx    ← Post detail (MDX + TOC + JSON-LD)
│   └── globals.css             ← Design tokens (brand color, fonts)
├── components/mdx/             ← 21 interactive components
├── lib/
│   ├── mdx.ts                  ← MDX renderer + component registry
│   └── palette.ts              ← Chart color palette
├── content/posts/              ← Your blog posts (MDX files)
├── public/blog/thumbnails/     ← Your thumbnails (SVG files)
├── brand-voice.md              ← Your brand voice config
├── package.json
└── tailwind.config.ts
```

---

## Deployment Options / 배포 방법

### Vercel (Recommended / 추천)

```bash
# One-time: install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy --prod
```

Or connect your GitHub repo at [vercel.com/new](https://vercel.com/new) for automatic deploys on every push.

### Other platforms

The blog is a standard Next.js project. It works on any platform that supports Next.js:
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- Self-hosted with `pnpm build && pnpm start`

---

## FAQ

**Do I need a database?**
No. Posts are MDX files, thumbnails are SVGs. Everything lives in your git repo. No Supabase, no Postgres, no CMS.

데이터베이스가 필요한가요? 아닙니다. 글은 MDX 파일, 썸네일은 SVG 파일입니다. 전부 git repo에 저장됩니다.

**Does it cost money?**
The plugin is free (MIT license). You need a Claude Code subscription to run it. Vercel free tier handles most blogs.

비용이 드나요? 플러그인은 무료입니다 (MIT). Claude Code 구독이 필요하고, Vercel 무료 플랜이면 대부분의 블로그에 충분합니다.

**What languages are supported?**
English, Korean, and Japanese have deep native-quality rules. Other languages work with universal quality rules. The skill auto-detects language from your message.

어떤 언어를 지원하나요? 영어, 한국어, 일본어는 깊은 네이티브 규칙이 있습니다. 다른 언어도 범용 규칙으로 동작합니다. 언어는 메시지에서 자동 감지합니다.

**Can I use my own components?**
Yes. Add new components to `components/mdx/`, register them in `lib/mdx.ts`, and describe them in a custom component-registry section in `brand-voice.md`. The writer skill will use them.

나만의 컴포넌트를 쓸 수 있나요? 네. `components/mdx/`에 추가하고 `lib/mdx.ts`에 등록하면 됩니다.

**Can I edit the generated posts?**
Of course. They're MDX files — edit them in any text editor or in Claude Code. The components are just React JSX.

생성된 글을 수정할 수 있나요? 당연합니다. MDX 파일이라 아무 에디터에서나 수정 가능합니다.

---

## Credits

Built by [Storehaus](https://storehaus.ai). Refined across 50+ published posts ranking on Google.

## License

MIT — use it however you want.

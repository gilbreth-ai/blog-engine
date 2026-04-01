import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  MDX_COMPONENTS,
  extractHeadings,
  calculateReadingTime,
  getMDXContent,
} from "@/lib/mdx";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/* ─── Helpers ───────────────────────────────────────────── */

function getPostPath(slug: string): string {
  return path.join(process.cwd(), "content/posts", `${slug}.mdx`);
}

function getAllSlugs(): string[] {
  const postsDir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

/* ─── Static params ─────────────────────────────────────── */

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ─── Metadata ──────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filePath = getPostPath(slug);
  if (!fs.existsSync(filePath)) return {};

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  const thumbnailPath = `/blog/thumbnails/${slug}.svg`;
  const hasThumbnail = fs.existsSync(
    path.join(process.cwd(), "public", thumbnailPath)
  );

  return {
    title: data.seoTitle ?? data.title,
    description: data.seoDescription ?? data.description,
    keywords: data.seoKeywords,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: data.seoTitle ?? data.title,
      description: data.seoDescription ?? data.description,
      type: "article",
      publishedTime: data.publishedAt,
      ...(hasThumbnail && {
        images: [{ url: `${SITE_URL}${thumbnailPath}`, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: data.seoTitle ?? data.title,
      description: data.seoDescription ?? data.description,
      ...(hasThumbnail && {
        images: [`${SITE_URL}${thumbnailPath}`],
      }),
    },
  };
}

/* ─── Page ──────────────────────────────────────────────── */

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const filePath = getPostPath(slug);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl">
          Post not found
        </h1>
        <p className="mt-4 text-[var(--color-muted)]">
          <a href="/" className="underline">
            Back to posts
          </a>
        </p>
      </div>
    );
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const headings = extractHeadings(content);
  const readingTime = data.readingTime ?? calculateReadingTime(content);

  // Evaluate MDX
  const { content: MDXContent, faq, howToSteps, citations } = await getMDXContent(filePath);

  // ─── JSON-LD Structured Data (GEO-optimized) ─────────────
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const hasThumbnail = fs.existsSync(
    path.join(process.cwd(), "public", `/blog/thumbnails/${slug}.svg`)
  );
  const thumbnailUrl = hasThumbnail
    ? `${SITE_URL}/blog/thumbnails/${slug}.svg`
    : undefined;

  // Word count for schema
  const wordCount = content
    .replace(/<[^>]*>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/).length;

  // 1. WebSite schema (tells AI engines about the site)
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: data.author ?? "Blog",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: data.author ?? "Blog",
    },
  };

  // 2. BlogPosting schema (more specific than Article for blog content)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: data.title,
    description: data.description,
    datePublished: data.publishedAt,
    dateModified: data.updatedAt ?? data.publishedAt,
    wordCount,
    inLanguage: data.language ?? "en",
    author: data.author
      ? {
          "@type": "Person",
          name: data.author,
          url: SITE_URL,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: data.author ?? "Blog",
    },
    image: thumbnailUrl,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_URL}/blog/#blog`,
      name: data.author ?? "Blog",
      url: `${SITE_URL}/blog`,
    },
    keywords: data.seoKeywords?.join(", "),
    articleSection: data.tags?.[0],
    // Citation references for GEO — AI engines use these to verify claims
    ...(citations && citations.length > 0 && {
      citation: citations.map((c) => ({
        "@type": "CreativeWork",
        name: c.name,
        author: c.author ? { "@type": "Organization", name: c.author } : undefined,
        url: c.url,
      })),
    }),
    // Speakable — tells AI voice assistants which sections to read aloud
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".lead-paragraph", ".key-takeaway", ".highlight"],
    },
  };

  // 3. BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: postUrl,
      },
    ],
  };

  // 4. FAQPage schema (Google featured snippets + AI Q&A extraction)
  const faqSchema =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${postUrl}/#faq`,
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
          isPartOf: { "@id": `${postUrl}/#article` },
        }
      : null;

  // 5. HowTo schema (Google rich results + AI step extraction)
  const howToSchema =
    howToSteps && howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "@id": `${postUrl}/#howto`,
          name: data.title,
          description: data.description,
          step: howToSteps.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.name,
            text: step.text,
            url: `${postUrl}#step-${i + 1}`,
          })),
          isPartOf: { "@id": `${postUrl}/#article` },
        }
      : null;

  // Combine all schemas into a single @graph for cleaner output
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webSiteSchema,
      articleSchema,
      breadcrumbSchema,
      ...(faqSchema ? [faqSchema] : []),
      ...(howToSchema ? [howToSchema] : []),
    ],
  };

  return (
    <>
      {/* JSON-LD — single @graph with all schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-8">
        {/* Header */}
        <header className="mb-12">
          {data.tags && data.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-[family-name:var(--font-heading)] text-4xl leading-[1.15] tracking-tight md:text-5xl">
            {data.title}
          </h1>
          {data.description && (
            <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
              {data.description}
            </p>
          )}
          <div className="mt-6 flex items-center gap-3 text-sm text-[var(--color-muted)]">
            {data.author && <span>{data.author}</span>}
            {data.publishedAt && (
              <>
                {data.author && (
                  <span className="text-[var(--color-border)]">&middot;</span>
                )}
                <time dateTime={data.publishedAt}>
                  {new Date(data.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
            {readingTime && (
              <>
                <span className="text-[var(--color-border)]">&middot;</span>
                <span>{readingTime}</span>
              </>
            )}
          </div>
        </header>

        {/* Mobile TOC (collapsed above content) */}
        {headings.length > 0 && (
          <details className="mb-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:hidden">
            <summary className="cursor-pointer text-sm font-medium text-[var(--color-muted)]">
              Table of Contents
            </summary>
            <ul className="mt-3 space-y-1.5 text-sm">
              {headings.map((h) => (
                <li
                  key={h.id}
                  style={{
                    paddingLeft: h.level === 3 ? "1rem" : "0",
                  }}
                >
                  <a
                    href={`#${h.id}`}
                    className="text-[var(--color-muted)] no-underline hover:text-[var(--color-text)]"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}

        {/* Content + TOC */}
        <div className="relative lg:grid lg:grid-cols-[1fr_220px] lg:gap-16">
          {/* Main content */}
          <div className="prose prose-lg max-w-none">
            <MDXContent />
          </div>

          {/* TOC sidebar (desktop) */}
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <nav className="sticky top-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                  Contents
                </p>
                <ul className="space-y-2 border-l border-[var(--color-border)] text-sm">
                  {headings.map((h) => (
                    <li
                      key={h.id}
                      style={{
                        paddingLeft: h.level === 3 ? "1.5rem" : "0.75rem",
                      }}
                    >
                      <a
                        href={`#${h.id}`}
                        className="block text-[var(--color-muted)] no-underline transition-colors hover:text-[var(--color-text)]"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </article>
    </>
  );
}

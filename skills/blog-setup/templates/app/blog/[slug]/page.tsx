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
    openGraph: {
      title: data.seoTitle ?? data.title,
      description: data.seoDescription ?? data.description,
      type: "article",
      publishedTime: data.publishedAt,
      ...(hasThumbnail && {
        images: [{ url: thumbnailPath, width: 1200, height: 630 }],
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
  const { content: MDXContent, faq, howToSteps } = await getMDXContent(filePath);

  // JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    datePublished: data.publishedAt,
    author: data.author
      ? { "@type": "Person", name: data.author }
      : undefined,
  };

  const faqSchema =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  const howToSchema =
    howToSteps && howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: data.title,
          step: howToSteps.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.name,
            text: step.text,
          })),
        }
      : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

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
                <time>
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
        <div className="relative lg:grid lg:grid-cols-[1fr_200px] lg:gap-12">
          {/* Main content */}
          <div className="prose prose-lg max-w-[680px]">
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

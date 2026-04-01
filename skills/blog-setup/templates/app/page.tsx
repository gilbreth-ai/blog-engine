import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface PostMeta {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
  category?: string;
  featured?: boolean;
}

function getAllPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), "content/posts");

  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx"));

  if (files.length === 0) return [];

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        title: data.title ?? filename.replace(".mdx", ""),
        description: data.description ?? "",
        slug: data.slug ?? filename.replace(".mdx", ""),
        publishedAt: data.publishedAt ?? "",
        readingTime: data.readingTime ?? "",
        tags: data.tags ?? [],
        category: data.tags?.[0] ?? undefined,
        featured: data.featured ?? false,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

function thumbnailExists(slug: string): boolean {
  return fs.existsSync(
    path.join(process.cwd(), `public/blog/thumbnails/${slug}.svg`)
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getCategories(posts: PostMeta[]): string[] {
  const cats = new Set<string>();
  for (const p of posts) {
    if (p.category) cats.add(p.category);
  }
  return Array.from(cats);
}

export default function HomePage() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight">
          Welcome
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          No posts yet. Run{" "}
          <code className="rounded bg-[var(--color-surface)] px-2 py-0.5 text-sm font-medium">
            /blog-engine:blog-writer
          </code>{" "}
          to create your first post.
        </p>
      </div>
    );
  }

  const categories = getCategories(posts);
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const regularPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <div className="py-8">
      {/* Category filter */}
      {categories.length > 1 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <span className="rounded-full border border-[var(--color-text)] bg-[var(--color-text)] px-4 py-1.5 text-xs font-medium text-white">
            All
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-xs font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Featured / pinned post */}
      {featuredPost && (
        <a
          href={`/blog/${featuredPost.slug}`}
          className="group mb-14 block overflow-hidden rounded-xl border border-[var(--color-border)] no-underline transition-all duration-200 hover:shadow-lg hover:shadow-black/5 md:grid md:grid-cols-2"
        >
          {thumbnailExists(featuredPost.slug) && (
            <div className="aspect-[16/10] overflow-hidden border-b border-[var(--color-border)] md:border-b-0 md:border-r">
              <img
                src={`/blog/thumbnails/${featuredPost.slug}.svg`}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          )}
          <div className="flex flex-col justify-center p-6 md:p-8">
            {featuredPost.category && (
              <span className="mb-3 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-brand)" }}>
                {featuredPost.category}
              </span>
            )}
            <h2 className="font-[family-name:var(--font-heading)] text-2xl leading-snug text-[var(--color-text)] md:text-3xl">
              {featuredPost.title}
            </h2>
            {featuredPost.description && (
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {featuredPost.description}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-muted)]">
              {featuredPost.publishedAt && <time>{formatDate(featuredPost.publishedAt)}</time>}
              {featuredPost.readingTime && (
                <>
                  <span className="text-[var(--color-border)]">&middot;</span>
                  <span>{featuredPost.readingTime}</span>
                </>
              )}
            </div>
          </div>
        </a>
      )}

      {/* 3-column post grid */}
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-lg border border-[var(--color-border)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
            >
              {thumbnailExists(post.slug) && (
                <div className="aspect-[16/10] overflow-hidden border-b border-[var(--color-border)]">
                  <img
                    src={`/blog/thumbnails/${post.slug}.svg`}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="p-4">
                {post.category && (
                  <span className="mb-2 block text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-brand)" }}>
                    {post.category}
                  </span>
                )}
                <h2 className="font-[family-name:var(--font-heading)] text-lg leading-snug text-[var(--color-text)]">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {post.description}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-muted)]">
                  {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
                  {post.readingTime && (
                    <>
                      <span className="text-[var(--color-border)]">&middot;</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

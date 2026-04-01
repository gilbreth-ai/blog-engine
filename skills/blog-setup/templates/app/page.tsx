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

  return (
    <div className="py-8">
      <h1 className="mb-12 font-[family-name:var(--font-heading)] text-4xl tracking-tight">
        Posts
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block overflow-hidden rounded-lg border border-[var(--color-border)] bg-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
          >
            {thumbnailExists(post.slug) && (
              <div className="aspect-[16/9] overflow-hidden border-b border-[var(--color-border)]">
                <img
                  src={`/blog/thumbnails/${post.slug}.svg`}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            )}
            <div className="p-5">
              <h2 className="font-[family-name:var(--font-heading)] text-xl leading-snug text-[var(--color-text)]">
                {post.title}
              </h2>
              {post.description && (
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {post.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-3 text-xs text-[var(--color-muted)]">
                {post.publishedAt && <time>{formatDate(post.publishedAt)}</time>}
                {post.readingTime && (
                  <>
                    <span className="text-[var(--color-border)]">&middot;</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-surface)] px-2.5 py-0.5 text-xs text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

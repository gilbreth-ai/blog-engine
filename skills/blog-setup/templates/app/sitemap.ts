import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const postsDir = path.join(process.cwd(), "content/posts");
  const postEntries: MetadataRoute.Sitemap = [];

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data } = matter(raw);
      const slug = data.slug ?? file.replace(".mdx", "");

      postEntries.push({
        url: `${SITE_URL}/blog/${slug}`,
        lastModified: data.updatedAt ?? data.publishedAt ?? new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postEntries,
  ];
}

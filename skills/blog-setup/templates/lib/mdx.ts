import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { AccordionGroup } from "@/components/mdx/accordion-group";
import { Callout } from "@/components/mdx/callout";
import { Chart } from "@/components/mdx/chart";
import { Checklist } from "@/components/mdx/checklist";
import { ComparisonTable } from "@/components/mdx/comparison-table";
import { DefinitionCard } from "@/components/mdx/definition-card";
import { FullBleed } from "@/components/mdx/full-bleed";
import { Highlight } from "@/components/mdx/highlight";
import { ImageWithCaption } from "@/components/mdx/image-with-caption";
import { KeyTakeaway } from "@/components/mdx/key-takeaway";
import { LeadParagraph } from "@/components/mdx/lead-paragraph";
import { PriceBreakdown } from "@/components/mdx/price-breakdown";
import { ProConCard } from "@/components/mdx/pro-con-card";
import { ProcessFlow } from "@/components/mdx/process-flow";
import { QuoteBlock } from "@/components/mdx/quote-block";
import { References } from "@/components/mdx/references";
import { SectionDivider } from "@/components/mdx/section-divider";
import { StatCard } from "@/components/mdx/stat-card";
import { SVGDiagram } from "@/components/mdx/svg-diagram";
import { Timeline } from "@/components/mdx/timeline";
import { TwoColumn } from "@/components/mdx/two-column";

/* ─── Auto-ID headings for TOC anchor links ───────────── */

import React from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u3131-\u318e\uac00-\ud7a3]+/g, "-")
    .replace(/(^-|-$)/g, "") || "heading";
}

function createHeading(level: number) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return function HeadingWithId(props: { children?: React.ReactNode }) {
    const text = typeof props.children === "string"
      ? props.children
      : String(props.children ?? "");
    const id = slugify(text);
    return React.createElement(Tag, { id, ...props });
  };
}

/**
 * MDX component registry — maps component names used in MDX files
 * to their React implementations. Includes auto-ID headings for TOC.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MDX_COMPONENTS: Record<string, React.ComponentType<any>> = {
  h2: createHeading(2),
  h3: createHeading(3),
  AccordionGroup,
  Callout,
  Chart,
  Checklist,
  ComparisonTable,
  DefinitionCard,
  FullBleed,
  Highlight,
  ImageWithCaption,
  KeyTakeaway,
  LeadParagraph,
  PriceBreakdown,
  ProConCard,
  ProcessFlow,
  QuoteBlock,
  References,
  SectionDivider,
  StatCard,
  SVGDiagram,
  Timeline,
  TwoColumn,
};

/* ─── Types ─────────────────────────────────────────────── */

export interface Heading {
  level: number;
  text: string;
  id: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface Citation {
  name: string;
  author?: string;
  url: string;
}

/* ─── Helpers ───────────────────────────────────────────── */

export function extractHeadings(source: string): Heading[] {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();
  const lines = source.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      let id = text
        .toLowerCase()
        .replace(/[^a-z0-9\u3131-\u318e\uac00-\ud7a3]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (!id) id = "heading";
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      headings.push({ level, text, id });
    }
  }
  return headings;
}

export function calculateReadingTime(source: string): string {
  const words = source
    .replace(/<[^>]*>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 230));
  return `${minutes} min read`;
}

/**
 * Read an MDX file, strip frontmatter, evaluate with @mdx-js/mdx,
 * and return the rendered content plus any exported structured data.
 */
export async function getMDXContent(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await (evaluate as any)(content, {
    ...runtime,
    useMDXComponents: () => MDX_COMPONENTS,
  });

  return {
    content: result.default as React.ComponentType,
    faq: (result.faq as FaqItem[] | undefined) ?? null,
    howToSteps: (result.howToSteps as HowToStep[] | undefined) ?? null,
    citations: (result.citations as Citation[] | undefined) ?? null,
  };
}

import React from "react";

interface QuoteBlockProps {
  quote: string;
  author: string;
  role?: string;
  source?: string;
}

export function QuoteBlock({ quote, author, role, source }: QuoteBlockProps) {
  return (
    <figure className="not-prose my-10 border-l-2 pl-5" style={{ borderLeftColor: "var(--color-brand, #e8590c)" }}>
      <blockquote>
        <p className="text-base italic leading-relaxed text-gray-600">
          {quote}
        </p>
      </blockquote>
      <figcaption className="mt-3 text-sm">
        <span className="font-semibold text-gray-900">{author}</span>
        {role && <span className="text-gray-400"> &middot; {role}</span>}
        {source && <span className="text-gray-400 italic"> &middot; {source}</span>}
      </figcaption>
    </figure>
  );
}

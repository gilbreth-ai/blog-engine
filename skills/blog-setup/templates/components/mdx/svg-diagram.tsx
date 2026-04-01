"use client";

import React from "react";

interface SVGDiagramProps {
  svg: string;
  caption?: string;
  alt: string;
}

export function SVGDiagram({ svg, caption, alt }: SVGDiagramProps) {
  return (
    <figure className="not-prose my-6">
      <div
        className="rounded-lg border border-gray-200 bg-white p-4 [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
        role="img"
        aria-label={alt}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

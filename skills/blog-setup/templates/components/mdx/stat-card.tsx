"use client";

import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  source?: string;
  sourceUrl?: string;
}

export function StatCard({ value, label, source, sourceUrl }: StatCardProps) {
  return (
    <figure className="not-prose my-10 rounded-lg border border-gray-200 bg-white px-6 py-5 text-center">
      <p className="text-2xl font-bold" style={{ color: "var(--color-brand, #e8590c)" }}>{value}</p>
      <figcaption>
        <p className="mt-1 text-sm text-gray-600">{label}</p>
        {source && (
          <p className="mt-1.5 text-xs text-gray-400">
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gray-300 underline-offset-2 transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brand, #e8590c)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {source}
              </a>
            ) : (
              <span>{source}</span>
            )}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

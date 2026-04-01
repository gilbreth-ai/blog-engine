import React from "react";

interface Reference {
  label: string;
  url: string;
  accessed?: string;
}

interface ReferencesProps {
  items: Reference[];
}

export function References({ items }: ReferencesProps) {
  if (!items.length) return null;

  return (
    <section className="mt-16 border-t border-gray-200 pt-8">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-400">
        References
      </h2>
      <ol className="list-none space-y-2 pl-0">
        {items.map((ref, idx) => (
          <li key={idx} className="flex gap-2 text-sm leading-relaxed">
            <span className="shrink-0 text-gray-300">[{idx + 1}]</span>
            <span>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 underline decoration-gray-300 underline-offset-2 transition-colors"
                style={{ textDecorationColor: undefined }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-brand, #e8590c)";
                  e.currentTarget.style.textDecorationColor = "var(--color-brand, #e8590c)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.textDecorationColor = "";
                }}
              >
                {ref.label}
              </a>
              {ref.accessed && (
                <span className="ml-1 text-xs text-gray-400">
                  (accessed {ref.accessed})
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

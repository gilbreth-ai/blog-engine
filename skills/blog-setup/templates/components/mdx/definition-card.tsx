import React from "react";

interface DefinitionCardProps {
  term: string;
  children: React.ReactNode;
}

export function DefinitionCard({ term, children }: DefinitionCardProps) {
  return (
    <dl className="not-prose my-10 rounded-lg border-l-2 border-gray-300 bg-gray-50 px-5 py-4">
      <dt className="text-sm font-bold text-gray-900">{term}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-gray-600">{children}</dd>
    </dl>
  );
}

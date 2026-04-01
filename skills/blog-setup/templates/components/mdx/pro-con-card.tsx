import React from "react";

interface ProConCardProps {
  title: string;
  pros: string[];
  cons: string[];
}

export function ProConCard({ title, pros, cons }: ProConCardProps) {
  return (
    <div className="not-prose my-10 overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-green-600">
            Pros
          </p>
          <ul className="space-y-2">
            {pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-red-600">
            Cons
          </p>
          <ul className="space-y-2">
            {cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

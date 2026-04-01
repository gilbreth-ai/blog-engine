import React from "react";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  title?: string;
}

export function Timeline({ events, title }: TimelineProps) {
  return (
    <div className="my-10">
      {title && (
        <h3 className="mb-6 text-lg font-bold text-gray-900">{title}</h3>
      )}
      <div className="relative pl-8">
        <div
          className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-gray-200"
          aria-hidden="true"
        />

        <ol className="list-none space-y-8 pl-0">
          {events.map((event, idx) => (
            <li key={idx} className="relative">
              <div
                className="absolute -left-8 flex h-6 w-6 items-center justify-center"
                style={{ top: 5 }}
                aria-hidden="true"
              >
                <div className="h-3 w-3 rounded-full border-2 bg-white" style={{ borderColor: "var(--color-brand, #e8590c)" }} />
              </div>

              <div>
                <time
                  className="text-xs font-semibold uppercase tracking-wide leading-4"
                  style={{ color: "var(--color-brand, #e8590c)" }}
                >
                  {event.date}
                </time>
                <p className="mt-1 text-sm font-bold text-gray-900">
                  {event.title}
                </p>
                {event.description && (
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {event.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

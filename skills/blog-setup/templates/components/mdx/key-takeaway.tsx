import React from "react";

interface KeyTakeawayProps {
  title?: string;
  children: React.ReactNode;
}

export function KeyTakeaway({
  title = "Key Takeaway",
  children,
}: KeyTakeawayProps) {
  return (
    <aside
      className="not-prose my-10 rounded-r-lg border-l-[3px] px-5 py-4"
      style={{ borderLeftColor: "var(--color-brand, #e8590c)", backgroundColor: "#fff7ed" }}
    >
      <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--color-brand, #e8590c)" }}>
        {title}
      </p>
      <div className="mt-1 text-sm leading-relaxed text-gray-700">{children}</div>
    </aside>
  );
}

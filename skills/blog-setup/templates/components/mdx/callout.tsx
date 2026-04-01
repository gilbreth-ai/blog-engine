import React from "react";

type CalloutVariant = "tip" | "warning" | "info" | "success";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const variantConfig: Record<
  CalloutVariant,
  { border: string; bg: string; label: string; labelColor: string }
> = {
  tip: {
    border: "var(--color-brand, #e8590c)",
    bg: "#fff7ed",
    label: "Tip",
    labelColor: "#c2410c",
  },
  warning: {
    border: "#f59e0b",
    bg: "#fffbeb",
    label: "Warning",
    labelColor: "#b45309",
  },
  info: {
    border: "#3b82f6",
    bg: "#eff6ff",
    label: "Note",
    labelColor: "#1d4ed8",
  },
  success: {
    border: "#22c55e",
    bg: "#f0fdf4",
    label: "Success",
    labelColor: "#15803d",
  },
};

export function Callout({ variant = "info", title, children }: CalloutProps) {
  const config = variantConfig[variant];

  return (
    <aside
      className="not-prose my-10 flex flex-col gap-3 rounded-r-lg border-l-[3px] px-5 py-4"
      style={{ borderLeftColor: config.border, backgroundColor: config.bg }}
      role="note"
    >
      {title && (
        <p className="text-base font-semibold text-gray-900">{title}</p>
      )}
      <div className="text-base leading-relaxed text-gray-600 [&>ul]:mt-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1 [&>ol]:mt-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1 [&>p]:my-0 [&_strong]:font-semibold [&_strong]:text-gray-800">{children}</div>
    </aside>
  );
}

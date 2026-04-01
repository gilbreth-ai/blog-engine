import React from "react";

export function SectionDivider() {
  return (
    <div className="my-14 flex items-center justify-center" role="separator">
      <div className="h-px flex-1 bg-gray-200" />
      <div className="mx-4 h-2 w-2 rotate-45" style={{ backgroundColor: "var(--color-brand, #e8590c)" }} aria-hidden="true" />
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

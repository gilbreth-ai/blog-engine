import React from "react";

interface LeadParagraphProps {
  children: React.ReactNode;
}

export function LeadParagraph({ children }: LeadParagraphProps) {
  return (
    <div className="my-6 text-lg leading-relaxed text-gray-600 md:text-xl [&>p]:my-0">
      {children}
    </div>
  );
}

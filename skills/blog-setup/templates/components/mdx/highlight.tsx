import React from "react";

interface HighlightProps {
  children: React.ReactNode;
}

export function Highlight({ children }: HighlightProps) {
  return (
    <mark
      className="font-semibold text-inherit"
      style={{
        background:
          "linear-gradient(104deg, rgba(232,89,12,0) 0.9%, rgba(232,89,12,0.18) 2.4%, rgba(232,89,12,0.25) 5.8%, rgba(232,89,12,0.25) 93%, rgba(232,89,12,0.18) 96%, rgba(232,89,12,0) 98%)",
        borderRadius: "3px 8px 5px 6px",
        padding: "0.15em 0.4em",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </mark>
  );
}

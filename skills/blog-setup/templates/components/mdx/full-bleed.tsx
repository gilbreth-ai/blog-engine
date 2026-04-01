import React from "react";

interface FullBleedProps {
  children: React.ReactNode;
}

export function FullBleed({ children }: FullBleedProps) {
  return (
    <div className="relative my-8 w-[min(960px,100vw)] -translate-x-1/2 left-1/2">
      {children}
    </div>
  );
}

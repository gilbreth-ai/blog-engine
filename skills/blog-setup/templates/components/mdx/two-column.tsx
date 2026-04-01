import React from "react";

interface TwoColumnProps {
  children: React.ReactNode;
}

export function TwoColumn({ children }: TwoColumnProps) {
  const childArray = React.Children.toArray(children);
  const midpoint = Math.ceil(childArray.length / 2);
  const leftChildren = childArray.slice(0, midpoint);
  const rightChildren = childArray.slice(midpoint);

  return (
    <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>{leftChildren}</div>
      <div>{rightChildren}</div>
    </div>
  );
}

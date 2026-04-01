"use client";

import React, { useState } from "react";

interface ChecklistItem {
  text: string;
  checked?: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  title?: string;
}

export function Checklist({ items: initialItems, title }: ChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(
    initialItems.map((item) => ({ ...item, checked: item.checked ?? false }))
  );

  function toggleItem(index: number) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <div className="not-prose my-10 rounded-lg border border-gray-200 bg-white p-5">
      {title && (
        <h3 className="mb-4 text-sm font-bold text-gray-900">{title}</h3>
      )}
      <ul className="space-y-2.5">
        {items.map((item, idx) => (
          <li key={idx}>
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(idx)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300"
                style={{ accentColor: "var(--color-brand, #e8590c)" }}
              />
              <span
                className={`text-sm transition-colors ${
                  item.checked
                    ? "text-gray-400 line-through"
                    : "text-gray-700"
                }`}
              >
                {item.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-gray-400">
        {items.filter((i) => i.checked).length} of {items.length} completed
      </p>
    </div>
  );
}

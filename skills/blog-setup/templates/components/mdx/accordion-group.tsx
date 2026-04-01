"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionGroupProps {
  items: AccordionItem[];
  title?: string;
}

export function AccordionGroup({ items, title }: AccordionGroupProps) {
  return (
    <div className="not-prose my-10">
      {title && (
        <h3 className="mb-4 text-lg font-bold text-gray-900">{title}</h3>
      )}
      <Accordion.Root type="multiple" className="divide-y divide-gray-200 rounded-lg border border-gray-200 overflow-hidden">
        {items.map((item, idx) => (
          <Accordion.Item key={idx} value={`item-${idx}`}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between bg-white px-5 py-3.5 text-left text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                {item.question}
                <svg
                  className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="bg-white px-5 pb-4 text-sm leading-relaxed text-gray-600">
                {item.answer}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

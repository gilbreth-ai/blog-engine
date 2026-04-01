import React from "react";

interface ProcessStep {
  title: string;
  description?: string;
  icon?: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  title?: string;
}

export function ProcessFlow({ steps, title }: ProcessFlowProps) {
  return (
    <div className="not-prose my-10 text-left">
      {title && (
        <h3 className="mb-5 text-lg font-bold text-gray-900">{title}</h3>
      )}
      <div className="relative flex flex-col gap-0">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--color-brand, #e8590c)" }}
                >
                  {idx + 1}
                </div>
                {!isLast && (
                  <div className="w-px flex-1" style={{ backgroundColor: "rgba(232, 89, 12, 0.2)" }} />
                )}
              </div>
              <div className={isLast ? "pb-0" : "pb-5"}>
                <p className="text-[15px] font-semibold leading-snug text-gray-900 pt-1">
                  {step.title}
                </p>
                {step.description && (
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

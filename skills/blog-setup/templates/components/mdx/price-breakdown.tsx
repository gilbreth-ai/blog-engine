import React from "react";

interface CostItem {
  label: string;
  amount: number;
}

interface PriceBreakdownProps {
  items: CostItem[];
  sellingPrice: number;
}

export function PriceBreakdown({ items, sellingPrice }: PriceBreakdownProps) {
  const totalCost = items.reduce((sum, item) => sum + item.amount, 0);
  const margin = sellingPrice - totalCost;
  const marginPercent = Math.round((margin / sellingPrice) * 100);

  return (
    <figure className="not-prose my-10 flex flex-col gap-0 text-sm">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between py-2">
          <span className="text-gray-500">{item.label}</span>
          <span className="tabular-nums text-gray-700">${item.amount.toFixed(2)}</span>
        </div>
      ))}

      <div className="mt-1 flex items-center justify-between border-t border-dashed border-gray-300 pt-3">
        <span className="font-medium text-gray-700">Total cost</span>
        <span className="tabular-nums font-medium text-gray-900">${totalCost.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="font-medium" style={{ color: "var(--color-brand, #e8590c)" }}>Your margin</span>
        <span className="tabular-nums font-medium" style={{ color: "var(--color-brand, #e8590c)" }}>
          ${margin.toFixed(2)} ({marginPercent}%)
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-gray-900 pt-3">
        <span className="font-semibold text-gray-900">Selling price</span>
        <span className="tabular-nums text-base font-bold text-gray-900">${sellingPrice.toFixed(2)}</span>
      </div>
    </figure>
  );
}

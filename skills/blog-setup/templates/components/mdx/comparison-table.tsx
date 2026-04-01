import React from "react";

interface ComparisonTableProps {
  headers: string[];
  rows: { label: string; values: string[] }[];
  highlightColumn?: number;
}

export function ComparisonTable({
  headers,
  rows,
  highlightColumn,
}: ComparisonTableProps) {
  const labelHeader = headers[0];
  const valueHeaders = headers.slice(1);

  return (
    <div className="not-prose overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {labelHeader}
            </th>
            {valueHeaders.map((header, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
                  highlightColumn === idx ? "bg-orange-50" : ""
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-gray-100 last:border-b-0 ${
                rowIdx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
              }`}
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {row.label}
              </td>
              {row.values.map((value, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-4 py-3 text-gray-600 ${
                    highlightColumn === colIdx ? "bg-orange-50" : ""
                  }`}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

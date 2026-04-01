"use client";

import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getSeriesColor } from "@/lib/palette";

/* ─── Shared types ──────────────────────────── */

type ChartType = "bar" | "line" | "pie" | "area";

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  type: ChartType;
  data: ChartDataPoint[];
  title?: string;
  source?: string;
  height?: number;
}

/* ─── Shared tooltip ──────────────────────── */

interface TooltipPayloadItem {
  value: number;
  name?: string;
  color?: string;
  fill?: string;
  payload?: Record<string, unknown>;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const color = (item.payload as Record<string, unknown>)?._fill as string
    || item.fill || item.color || "var(--color-brand, #e8590c)";

  return (
    <div className="not-prose rounded-lg border border-gray-100 bg-white px-2.5 py-1.5 text-xs text-left shadow-sm">
      {label && (
        <p className="m-0 flex items-center gap-1.5 text-gray-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </p>
      )}
      <p className="m-0 mt-0.5 font-semibold tabular-nums text-gray-900">
        {item.value.toLocaleString()}
      </p>
    </div>
  );
}

function PieTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  total: number;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const color = item.fill || item.color || "#FFB0BC";
  const pct = total > 0 ? Math.round(((item.value as number) / total) * 100) : 0;

  return (
    <div className="not-prose rounded-lg border border-gray-100 bg-white px-2.5 py-1.5 text-xs text-left shadow-sm">
      <p className="m-0 flex items-center gap-1.5 text-gray-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
        {item.name}
      </p>
      <p className="m-0 mt-0.5 font-semibold tabular-nums text-gray-900">
        {(item.value as number).toLocaleString()}
        <span className="ml-1 text-xs font-normal text-gray-400">{pct}%</span>
      </p>
    </div>
  );
}

/* ─── Bar chart ─────────────────────────────── */

function CleanBarChart({ data, height }: { data: ChartDataPoint[]; height: number }) {
  const enriched = data.map((d, i) => ({ ...d, _fill: getSeriesColor(i, d.color).solid }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={enriched} margin={{ top: 16, right: 4, bottom: 0, left: -8 }} barCategoryGap="25%">
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 10, fill: "#d1d5db" }}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <Tooltip content={<ChartTooltip />} cursor={false} />
        <Bar dataKey="value" radius={[3, 3, 0, 0]} isAnimationActive={false}>
          {enriched.map((d, i) => (
            <Cell key={i} fill={d._fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ─── Pie chart ─────────────────────────────── */

function CleanPieChart({ data, height }: { data: ChartDataPoint[]; height: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const outerR = Math.min(height / 2 - 20, 90);

  return (
    <div className="flex items-center justify-center gap-8">
      <div style={{ width: outerR * 2 + 20, height: outerR * 2 + 20, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={outerR}
              innerRadius={outerR * 0.58}
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
              label={false}
              labelLine={false}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={getSeriesColor(i, d.color).solid} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip total={total} />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: getSeriesColor(i, d.color).solid }}
            />
            <span className="flex-1 text-xs text-gray-500 mr-4">{d.label}</span>
            <span className="text-xs font-medium tabular-nums text-gray-700">
              {total > 0 ? Math.round((d.value / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Line chart ────────────────────────────── */

function CleanLineChart({ data, height }: { data: ChartDataPoint[]; height: number }) {
  const color = "#e8590c";
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 16, right: 12, bottom: 0, left: 0 }}>
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={{ stroke: "transparent" }} tickSize={20} axisLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#d1d5db" }} tickLine={false} axisLine={false} width={36} tickSize={20}/>
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ r: 3, fill: "white", stroke: color, strokeWidth: 1.5 }}
          activeDot={{ r: 5, fill: color }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ─── Area chart ────────────────────────────── */

function CleanAreaChart({ data, height }: { data: ChartDataPoint[]; height: number }) {
  const color = "#e8590c";
  const gradientId = React.useId() + "areaFill";
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 16, right: 12, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
            <stop offset="100%" stopColor={color} stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={{ stroke: "transparent" }} tickSize={20} axisLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "#d1d5db" }} tickLine={false} axisLine={false} width={36} tickSize={20}/>
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          dot={{ r: 3, fill: "white", stroke: color, strokeWidth: 1.5 }}
          activeDot={{ r: 5, fill: color }}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ─── Main export ───────────────────────────── */

export function Chart({ type, data, title, source, height = 280 }: ChartProps) {
  return (
    <figure className="not-prose my-10 text-left">
      {title && (
        <figcaption className="mb-3">
          <p className="text-sm font-semibold text-gray-800">{title}</p>
        </figcaption>
      )}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-4">
        {type === "bar" && <CleanBarChart data={data} height={height} />}
        {type === "pie" && <CleanPieChart data={data} height={height} />}
        {type === "line" && <CleanLineChart data={data} height={height} />}
        {type === "area" && <CleanAreaChart data={data} height={height} />}
      </div>
      {source && (
        <p className="mt-2 text-[11px] text-gray-400">{source}</p>
      )}
    </figure>
  );
}

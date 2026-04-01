import { AccordionGroup } from "@/components/mdx/accordion-group";
import { Callout } from "@/components/mdx/callout";
import { Chart } from "@/components/mdx/chart";
import { Checklist } from "@/components/mdx/checklist";
import { ComparisonTable } from "@/components/mdx/comparison-table";
import { DefinitionCard } from "@/components/mdx/definition-card";
import { FullBleed } from "@/components/mdx/full-bleed";
import { Highlight } from "@/components/mdx/highlight";
import { ImageWithCaption } from "@/components/mdx/image-with-caption";
import { KeyTakeaway } from "@/components/mdx/key-takeaway";
import { LeadParagraph } from "@/components/mdx/lead-paragraph";
import { PriceBreakdown } from "@/components/mdx/price-breakdown";
import { ProConCard } from "@/components/mdx/pro-con-card";
import { ProcessFlow } from "@/components/mdx/process-flow";
import { QuoteBlock } from "@/components/mdx/quote-block";
import { References } from "@/components/mdx/references";
import { SectionDivider } from "@/components/mdx/section-divider";
import { StatCard } from "@/components/mdx/stat-card";
import { SVGDiagram } from "@/components/mdx/svg-diagram";
import { Timeline } from "@/components/mdx/timeline";
import { TwoColumn } from "@/components/mdx/two-column";

/**
 * MDX component registry — maps component names used in MDX files
 * to their React implementations.
 */
export const MDX_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  AccordionGroup: AccordionGroup as React.ComponentType<Record<string, unknown>>,
  Callout: Callout as React.ComponentType<Record<string, unknown>>,
  Chart: Chart as React.ComponentType<Record<string, unknown>>,
  Checklist: Checklist as React.ComponentType<Record<string, unknown>>,
  ComparisonTable: ComparisonTable as React.ComponentType<Record<string, unknown>>,
  DefinitionCard: DefinitionCard as React.ComponentType<Record<string, unknown>>,
  FullBleed: FullBleed as React.ComponentType<Record<string, unknown>>,
  Highlight: Highlight as React.ComponentType<Record<string, unknown>>,
  ImageWithCaption: ImageWithCaption as React.ComponentType<Record<string, unknown>>,
  KeyTakeaway: KeyTakeaway as React.ComponentType<Record<string, unknown>>,
  LeadParagraph: LeadParagraph as React.ComponentType<Record<string, unknown>>,
  PriceBreakdown: PriceBreakdown as React.ComponentType<Record<string, unknown>>,
  ProConCard: ProConCard as React.ComponentType<Record<string, unknown>>,
  ProcessFlow: ProcessFlow as React.ComponentType<Record<string, unknown>>,
  QuoteBlock: QuoteBlock as React.ComponentType<Record<string, unknown>>,
  References: References as React.ComponentType<Record<string, unknown>>,
  SectionDivider: SectionDivider as React.ComponentType<Record<string, unknown>>,
  StatCard: StatCard as React.ComponentType<Record<string, unknown>>,
  SVGDiagram: SVGDiagram as React.ComponentType<Record<string, unknown>>,
  Timeline: Timeline as React.ComponentType<Record<string, unknown>>,
  TwoColumn: TwoColumn as React.ComponentType<Record<string, unknown>>,
};

# Component Registry

Each component must earn its place. Use a component when it communicates information more clearly than prose alone. If you can say it in a sentence, say it in a sentence.

## Required Components

These appear in every post. They solve structural problems that prose cannot.

### LeadParagraph

Hooks the reader in the opening. Required because the first paragraph must stand visually apart from body text to signal "start here."

```mdx
<LeadParagraph>
Your API is getting 1,000 requests per second. Your server can handle 200.
Without rate limiting, you're not just slow - you're down.
</LeadParagraph>
```

### Highlight

Anchor sentences for skimmers. Use for the 2-4 most important claims in the post - the ones you'd want a reader to see even if they scroll past everything else. Test: would this sentence work as a standalone screenshot shared on social media?

```mdx
<Highlight>
Rate limiting isn't about slowing users down. It's about keeping your service up
for everyone.
</Highlight>
```

### References

Citations at the end of the post. Required for verifiability - every factual claim should trace back to a source listed here.

```mdx
<References items={citations} />
```

The `citations` export in frontmatter provides the data:
```js
export const citations = [
  { name: "Source Title", author: "Author or Org", url: "https://..." },
]
```

## Recommended Components

Use these when the content calls for them. Each entry includes: what it does, exact syntax, when to use it, and when not to.

### ComparisonTable

Side-by-side comparison of 2-3 options across multiple dimensions.

```mdx
<ComparisonTable
  headers={["Feature", "Token Bucket", "Sliding Window"]}
  rows={[
    { label: "Burst handling", values: ["Allows short bursts", "Smooth distribution"] },
    { label: "Memory usage", values: ["O(1)", "O(n)"] },
    { label: "Implementation", values: ["Simple", "Moderate"] },
  ]}
  highlightColumn={1}
/>
```

**Use when**: comparing two or more alternatives across the same criteria. Tables communicate trade-offs faster than paragraphs.
**Not when**: you only have one dimension of comparison. Use prose instead.

### SVGDiagram

Inline SVG illustration for flows, architectures, or visual explanations.

```mdx
<SVGDiagram
  alt="Request flow through a token bucket rate limiter: client sends request, bucket checks token count, either passes to server or returns 429"
  svg="<svg viewBox='0 0 680 300' xmlns='http://www.w3.org/2000/svg'>...</svg>"
  caption="Token bucket rate limiting flow"
/>
```

**SVG authoring guidelines:**
- **viewBox**: Always `0 0 680 [height]`. 680px wide fits content containers without scaling issues.
- **Colors**: Use `var(--color-brand, #f97316)` for the primary accent. Use `#374151` for text, `#e5e7eb` for borders, `#f9fafb` for fills. This ensures diagrams adapt to any brand theme.
- **Typography**: `font-family: system-ui, sans-serif`. Size 14px for labels, 12px for annotations.
- **Animation**: Use CSS `@keyframes` inside a `<style>` tag, not SMIL attributes (`animate`, `animateTransform`). SMIL has inconsistent browser support. Cascade delays at 0.3s, 0.7s, 1.1s for sequential reveals.
- **Accessibility**: The `alt` prop must be 2-3 sentences describing the full diagram for screen readers. Not just "diagram" - describe what it shows and what the reader should take away.
- **Simplicity**: Diagrams should have 3-6 elements. More than that and the SVG becomes unreadable at mobile widths.

**Use when**: a concept has spatial relationships (flows, hierarchies, cycles) that prose cannot convey.
**Not when**: the information is sequential (use ProcessFlow) or comparative (use ComparisonTable).

### Callout

Highlighted aside for tips, warnings, or contextual information.

```mdx
<Callout variant="tip" title="Start with token bucket">
It's the simplest to implement and handles 90% of use cases. Switch to sliding
window only if you need smooth rate distribution.
</Callout>
```

```mdx
<Callout variant="warning" title="Don't rate limit health checks">
Load balancers and monitoring tools hit health endpoints constantly. Rate limiting
them can trigger false downtime alerts.
</Callout>
```

```mdx
<Callout variant="info" title="Why 429?">
HTTP 429 "Too Many Requests" was standardized in RFC 6585 specifically for rate
limiting. Always include a Retry-After header.
</Callout>
```

**Use when**: information is important but tangential to the main flow. The reader needs to know it, but it would break the paragraph's momentum.
**Not when**: the information is central to your argument. If it belongs in the main flow, put it in the main flow.

### KeyTakeaway

Summarizes a section's core insight. The `title` prop is always required.

```mdx
<KeyTakeaway title="The real cost of no rate limiting">
A single unprotected endpoint can take down your entire service. Rate limiting is
not a performance optimization - it's an availability requirement.
</KeyTakeaway>
```

**Use when**: a section builds to a non-obvious conclusion that deserves emphasis.
**Not when**: the takeaway is obvious from the text. Don't restate what you just said.

### ProcessFlow

Sequential steps in a process. Use for workflows, setup procedures, or any ordered sequence.

```mdx
<ProcessFlow
  title="Setting up rate limiting"
  steps={[
    { title: "Identify critical endpoints", description: "List every endpoint that hits a database, calls an external API, or triggers computation." },
    { title: "Set baseline limits", description: "Monitor traffic for one week. Set limits at 2x the 95th percentile." },
    { title: "Add 429 responses", description: "Return HTTP 429 with a Retry-After header. Include a human-readable error message." },
  ]}
/>
```

**Use when**: order matters. Steps must happen in sequence and each depends on the previous.
**Not when**: items are independent (use Checklist) or there are only 2 steps (use prose).

### StatCard

Single statistic with source attribution. Verifiable data point that anchors an argument.

```mdx
<StatCard
  value="67%"
  label="of API outages stem from missing rate limits"
  source="Cloudflare 2024 API Security Report"
  sourceUrl="https://..."
/>
```

**Use when**: a statistic is central to your argument and deserves visual weight.
**Not when**: you're citing a stat inline as part of a sentence. Just write the sentence.

### Checklist

Actionable list of items to complete. Unlike ProcessFlow, order doesn't matter.

```mdx
<Checklist
  title="Rate limiting implementation checklist"
  items={[
    { text: "Token bucket or sliding window algorithm chosen" },
    { text: "Limits set per endpoint based on traffic data" },
    { text: "429 response includes Retry-After header" },
    { text: "Rate limit headers added (X-RateLimit-Limit, X-RateLimit-Remaining)" },
    { text: "Monitoring alerts configured for limit breaches" },
  ]}
/>
```

**Use when**: the reader needs to verify they've covered everything. Checklists work for audits, setup requirements, and pre-launch reviews.
**Not when**: items have a required sequence. Use ProcessFlow instead.

### Chart

Data visualization. Bar, line, pie, or area charts for quantitative data.

```mdx
<Chart
  type="bar"
  title="API response time by rate limiting strategy"
  data={[
    { label: "No limiting", value: 2400 },
    { label: "Token bucket", value: 180 },
    { label: "Sliding window", value: 165 },
    { label: "Fixed window", value: 195 },
  ]}
  source="Internal benchmark, 10K req/s, 2024"
/>
```

**Use when**: the relationship between numbers is the point. Trends, comparisons, distributions.
**Not when**: you have fewer than 3 data points (use StatCard) or the data is qualitative.

### ProConCard

Balanced evaluation of trade-offs.

```mdx
<ProConCard
  title="Employee vs. contractor"
  pros={[
    "Full-time dedication to your business",
    "Easier to build company culture",
    "You control the schedule and priorities",
  ]}
  cons={[
    "Payroll taxes, benefits, insurance costs",
    "Harder to end the relationship",
    "Fixed cost regardless of workload",
  ]}
/>
```

**Use when**: the reader is making a decision between two options and needs to weigh trade-offs.
**Not when**: one option is clearly better. Just recommend it.

### QuoteBlock

Direct quote from a person with attribution.

```mdx
<QuoteBlock
  quote="The best rate limiter is the one you set up before your first outage."
  author="Jaana Dogan"
  role="Principal Engineer, AWS"
  source="QCon 2023"
/>
```

**Use when**: the exact words matter - the person said it better than you could paraphrase.
**Not when**: you're paraphrasing someone's idea. Just cite them inline.

## Situational Components

Use these only when the content domain specifically calls for them.

### PriceBreakdown

Financial analysis only. Don't force this into non-financial posts.

```mdx
<PriceBreakdown
  items={[
    { label: "Raw materials", amount: 12 },
    { label: "Labor (2 hours)", amount: 30 },
    { label: "Kiln firing", amount: 8 },
    { label: "Packaging", amount: 3 },
  ]}
  sellingPrice={38}
/>
```

### Timeline

Chronological events. Use for historical context, project milestones, or evolution of a concept.

```mdx
<Timeline
  title="The evolution of API rate limiting"
  events={[
    { date: "2008", title: "Twitter introduces rate limits", description: "First major API to publicly document request limits after repeated outages." },
    { date: "2015", title: "RFC 6585 standardizes 429", description: "HTTP 429 Too Many Requests becomes the official status code." },
  ]}
/>
```

### AccordionGroup

Expandable FAQ-style content. Use when you have many short Q&A pairs that would overwhelm the page if all visible.

```mdx
<AccordionGroup
  title="Common rate limiting questions"
  items={[
    { question: "Should I rate limit internal APIs?", answer: "Yes. Internal services can produce runaway traffic from bugs or retry storms." },
  ]}
/>
```

### DefinitionCard

Term definition. Use sparingly - only when introducing jargon that the reader genuinely might not know.

```mdx
<DefinitionCard term="Token bucket">
A rate limiting algorithm that adds tokens at a fixed rate. Each request consumes
one token. When the bucket is empty, requests are rejected until new tokens arrive.
</DefinitionCard>
```

## Spacing Rule

Never place two components back-to-back. Write 1-3 paragraphs of prose between components. WHY: Components are visual anchors. Stacking them creates a wall of boxes that readers skip entirely. Prose between components provides context and narrative flow.

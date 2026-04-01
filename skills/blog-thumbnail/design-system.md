# Thumbnail Design System

Rules for generating SVG blog thumbnails. Every rule includes WHY it exists.

---

## 1. Canvas

- **viewBox**: always `"0 0 680 425"` (16:10 aspect ratio, matches blog card dimensions). WHY: consistency across all thumbnails — every card renders at the same proportions.
- **No background rect** — the blog card provides its own background. WHY: backgrounds create double-layering artifacts when the card already has one.
- **Padding**: leave at least 40px from all edges. WHY: content touching edges looks cropped and unintentional.

---

## 2. Composition (CRITICAL)

**Centering**: the visual center of the illustration must sit at approximately (340, 212). If content drifts more than 15px from y=212, wrap in `<g transform="translate(0, offset)">` to correct it. WHY: visual weight should sit centered in the card, not drift toward top or bottom.

**Size targets**: content must span at least 50% of width (≥340px) and 60% of height (≥255px). WHY: anything smaller looks like a tiny icon floating in empty space.

**Aspect ratio matching**: the card is 16:10 LANDSCAPE. Portrait-oriented objects (bottles, pens, standing figures) need rotation, tilting, or flanking elements to fill the horizontal space. WHY: a portrait shape in a landscape frame leaves wide empty strips on both sides.

**Nested objects**: any object inside another must be at least 30% of the outer's area. WHY: small inner objects become invisible at card size (300px wide in listings).

---

## 3. Color Palette (STRICT)

| Token | Default Hex | Use |
|-------|-------------|-----|
| brand accent | `#e8590c` | Primary accent, key elements |
| brand-light | lighten 30% | Hover warm transitions |
| brand-bg | lighten 90% | Hover fill backgrounds |
| slate-300 | `#cbd5e1` | Structure lines, borders |
| gray-200 | `#e5e7eb` | Secondary lines, faint details |
| gray-50 | `#f9fafb` | Subtle fills |
| gray-700 | `#374151` | Solid dark fills |
| white | `#ffffff` | Backgrounds, panels |

If `brand-voice.md` specifies a `primaryColor`, use it instead of the default `#e8590c`. Derive light and background variants from it by lightening 30% and 90% respectively.

**Max 3-4 colors per thumbnail.** WHY: restraint creates coherence. More colors create visual noise that competes with post titles.

---

## 4. Design Principles

1. **Unique visual metaphor per post.** WHY: instant communication of the topic without needing to read the title. Two posts with the same metaphor lose meaning.

2. **Recognizable at 300px wide.** WHY: thumbnails appear small in blog listings, social cards, and mobile views. If you squint and can't tell what it is, simplify.

3. **No text in SVG.** WHY: text doesn't scale, breaks at small sizes, and creates localization issues. To suggest text (on a page, screen, or sign), use short horizontal lines with `stroke-linecap: round`.

4. **Simple shapes only** — `rect`, `circle`, `ellipse`, `line`, `path`, `polygon`. WHY: complex illustrations look busy at card size and don't render consistently across browsers.

5. **Physical objects over abstract shapes.** WHY: a lightbulb communicates "idea" instantly; floating circles communicate nothing. Viewers connect with recognizable objects.

6. **One central object + 1-2 supporting details.** WHY: generous white space makes the object iconic. A busy scene becomes mud at small sizes.

---

## 5. Static State (CRITICAL)

- **NEVER** set `opacity: 0` on structural elements in the default state.
- All main shapes must be fully visible at rest.
- Must pass the "fast scroll test": instantly recognizable without hovering.

WHY: hover enhances, never creates. The thumbnail must work in contexts where hover doesn't exist — mobile, social shares, RSS readers, search results.

---

## 6. Hover Animations

**Trigger**: `svg:hover .className` selectors. CSS transitions and `@keyframes` only. No SMIL (`<animate>`). No JavaScript.

### Animation Patterns

| Pattern | How | Good for |
|---------|-----|----------|
| Lift + shadow | `translateY(-4px)`, shadow opacity increase | Cards, solid objects |
| Color warm-up | stroke/fill transitions to brand-light or brand-bg | Lines, panels, outlines |
| Subtle tilt/rotate | `rotate(-5deg)` with explicit `transform-origin` | Signs, tools, objects with a pivot |
| Solidify | `stroke-dasharray` from dashed to solid | Dashed outlines, suggestion lines |
| Opacity reveal | `opacity: 0` → `0.5-1` for **accent-only** elements | Sparkles, glows, decorative rings |
| Scale pop | `scale(1.1-1.2)` with ease | Small dots, key accent elements |
| Staggered cascade | `animation-delay: 0s, 0.18s, 0.36s` | Lists, rows, sequential elements |
| Pulse/breathe | `@keyframes` with oscillation | Rings, glows, living elements |

### Rules

- Total animation duration under 3 seconds. WHY: longer animations feel sluggish and won't complete during a quick hover.
- **NEVER** put two `animation:` properties on the same element — comma-separate them into one declaration. WHY: the second property overwrites the first in CSS.
- Group related elements in `<g>` for coordinated transforms. WHY: individual transforms on many elements create jittery, uncoordinated movement.
- Always set `transform-origin` explicitly on transformed elements. WHY: browser defaults vary; without explicit origin, rotations and scales pivot from unexpected points.
- Transitions: `0.3-0.5s` for color/opacity changes, `0.4-0.7s` for transform movements. WHY: color changes are perceived faster than spatial movement; slower transforms feel more physical.
- Opacity-reveal is for **accent elements only** (sparkles, glows, decorative rings). Structural elements must be visible in static state. WHY: see Section 5.

---

## 7. Common Mistakes

1. **Portrait object in landscape card** — rotate the object, tilt it, or add flanking elements to fill horizontal space.
2. **Composition too small** — content must span at least 340px wide AND 255px tall. Check the bounding box.
3. **Off-center** — visual center must land within 15px of (340, 212). Eyeball it, then verify coordinates.
4. **Nested object too small** — inner elements must be at least 30% of the outer's area. A tiny wrench inside a huge toolbox disappears.
5. **All thumbnails look the same** — every post needs a unique metaphor. Never reuse the same object.
6. **Abstract shapes** — circles and triangles floating in space mean nothing. Use physical objects people recognize.
7. **Elements starting invisible** — `opacity: 0` on core structural elements means an empty-looking static state. Only accent decorations can start hidden.
8. **Random animations** — every hover effect should connect to the object's meaning. A lightbulb glows; a compass needle swings. Don't add bounce to something that doesn't bounce.
9. **Too many elements** — one main object plus 1-2 supporting details. More than that creates clutter.
10. **Using text** — no text, no labels, no numbers in the SVG. Suggest text with short rounded-cap lines.

---

## 8. SVG Structure Template

```svg
<svg viewBox="0 0 680 425" xmlns="http://www.w3.org/2000/svg">
  <style>
    /* Static styles */
    .main { fill: white; stroke: #cbd5e1; stroke-width: 2; transition: all 0.4s ease; }
    .accent { fill: #e8590c; transition: fill 0.3s ease; }
    .shadow { fill: #e5e7eb; opacity: 0.5; transition: opacity 0.4s ease; }

    /* Hover animations */
    svg:hover .main { stroke: #f4a67a; }
    svg:hover .accent { fill: #f4a67a; }
    svg:hover .shadow { opacity: 0.8; }

    /* Keyframes for complex animations */
    @keyframes example {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    svg:hover .animated {
      animation: example 1.5s ease-in-out infinite;
    }
  </style>

  <!-- Optional: ground shadow for depth -->
  <ellipse class="shadow" cx="340" cy="370" rx="80" ry="5"/>

  <!-- Main composition centered at approximately (340, 212) -->
  <!-- ... shapes here ... -->
</svg>
```

Use this as a starting skeleton. Replace the styles and shapes with your specific metaphor.

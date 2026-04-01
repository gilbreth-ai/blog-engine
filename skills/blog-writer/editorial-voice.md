# Editorial Voice

Universal default voice for blog content. Domain-agnostic - works for tech, lifestyle, business, and everything else.

## Core Voice Principles

**1. Open with the reader's world, not the topic definition.**
Start with a scenario they recognize, a stat that reframes what they thought they knew, or a concrete moment. WHY: The reader already knows the topic (they searched for it). Defining it wastes the one sentence where you earn their attention.

**2. Write to "you", not about "one" or "readers".**
Second person creates direct connection. The reader feels spoken to, not lectured at. WHY: Third person ("one should consider...") reads as academic. First person plural ("we all know...") reads as presumptuous. "You" is the only pronoun that creates a conversation.

**3. Be specific. Names, numbers, sources.**
Never say "studies show" - say "a 2024 Cloudflare report found that 67% of API outages stem from missing rate limits." WHY: Specificity is the single strongest signal of expertise. Vagueness is the single strongest signal of AI-generated content.

**4. Keep paragraphs short. 2-4 sentences.**
One idea per paragraph. Let whitespace do the work. WHY: Readers scan vertically on mobile. A 6-sentence wall of text gets skipped entirely. Short paragraphs create rhythm and let key points breathe.

**5. Make headings claim something or reveal something.**
A heading should teach even if the reader never reads the section below it. WHY: Most readers skim headings first to decide if the post is worth their time. Generic question headings ("What Is X?") teach nothing. Declarative headings ("X costs less than Y") give value immediately.

**6. End with one action, not a summary.**
The final section should give the reader exactly one thing to do next. WHY: Readers who reach the end want momentum. "In conclusion, we covered A, B, and C" kills that momentum. One clear next step converts readers into doers.

## Voice Examples

### Opening Paragraphs

**Good** (tech):
"Your API is getting 1,000 requests per second. Your server can handle 200. Without rate limiting, you're not just slow - you're down."

**Bad** (tech):
"API rate limiting is an important concept in modern web development that helps manage server resources."

WHY: The good version puts you in a specific scenario with real numbers. The bad version defines a concept you already Googled.

---

**Good** (lifestyle):
"The first time you roast coffee at home, you'll burn it. The second time, you'll under-roast it. The third time, you'll wonder why you ever bought pre-roasted."

**Bad** (lifestyle):
"In this article, we'll explore the fascinating world of home coffee roasting."

WHY: The good version tells a story you'll live through. The bad version describes what the article does instead of doing it.

---

**Good** (business):
"You just declined a project because you literally don't have the hours. That's not a capacity problem - that's a hiring signal."

**Bad** (business):
"As your business grows, it becomes important to consider when the right time is to hire your first employee."

WHY: The good version names a moment the reader has experienced. The bad version talks about growth in the abstract.

### Headings

**Good**: "Rate limiting costs you less than downtime" / "Your first roast will be terrible (and that's the point)" / "The moment most founders hire too late"

**Bad**: "What Is API Rate Limiting?" / "Understanding the Basics of Home Coffee Roasting" / "When Should You Hire Your First Employee?"

WHY: Good headings make claims. Bad headings ask questions the reader already has. A heading that claims something gives the reader a reason to keep reading (to see if you can back it up).

### Closings

**Good**: "Pick one of these five automations. Set it up today. Time yourself next week."

**Bad**: "In conclusion, automation is an essential aspect of running a modern online business."

WHY: The good version gives a concrete action with a timeline. The bad version restates the thesis without adding anything.

## Convergence Warnings

These patterns appear constantly in AI-generated content. Their presence signals "a machine wrote this" to experienced readers. Avoid them - not because they're grammatically wrong, but because they've been overused to the point of being a tell.

- **"In this article, we'll explore..."** - Throat-clearing. The reader already knows the topic. Start doing, not describing what you'll do.
- **Generic question headings** ("What Is X?", "How Does Y Work?") - They teach nothing on their own. Replace with a claim the reader can evaluate.
- **"In conclusion..."** - Redundant framing. If you need to signal the ending, your structure has a problem. Just deliver the final action.
- **"comprehensive", "unlock", "leverage", "utilize", "delve", "landscape"** - Corporate jargon that no human uses in conversation. These words exist to sound impressive. They communicate nothing.
- **"Whether you're a beginner or an expert..."** - Trying to include everyone includes no one. Pick your reader and write to them.
- **"In today's fast-paced/digital/ever-changing world..."** - Filler that could open literally any article about anything. Cut it entirely.

## Override Mechanism

If `brand-voice.md` exists in the project root, read it first. Apply its directives as primary voice. Where `brand-voice.md` is silent on a topic (paragraph length, heading style, etc.), fall back to the defaults in this file. Where it contradicts this file, `brand-voice.md` wins.

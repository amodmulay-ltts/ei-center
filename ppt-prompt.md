# PowerPoint Conversion Prompt
## Engineering Intelligence Center — Design & Content Guide

**Use this prompt with Microsoft Copilot for PowerPoint to generate presentations that match the EI Center design language, layout patterns, and color palette.**

---

## 🎨 Design System

### Color Palette
Use these exact colors throughout:

| Purpose | Color | Hex |
|---------|-------|-----|
| **Dark Background** | Navy/Charcoal | `#070b14` |
| **Raised Surface** | Slate | `#0c1220` |
| **Card Surface** | Dark Blue | `#111a2c` |
| **Primary Text** | Off-White | `#f2f5fa` |
| **Secondary Text** | Muted Blue | `#97a3b9` |
| **Tertiary Text** | Faint Blue | `#5d6a82` |
| **Primary Accent** | Bright Blue | `#3d8bff` |
| **Accent Soft** | Blue (14% opacity) | rgba(61, 139, 255, 0.14) |
| **Secondary Accent** | Teal | `#3fd0c9` |
| **Status: Live** | Green | `#3ddc97` |
| **Status: Remote** | Amber | `#f5b94a` |
| **Status: Coming Soon** | Gray | `#8a96ad` |

**Lens-specific colors** (for solution cards):
- Engineering AI: `#3d8bff` (bright blue)
- Agentic AI: `#a78bfa` (purple)
- Physical AI: `#3fd0c9` (teal)
- Industrial AI: `#f59e4a` (orange)
- Sustainable AI: `#6ad46a` (green)

### Typography
- **Font Family**: Segoe UI, Inter, or system UI font (no serif fonts)
- **Headlines** (Section titles): Bold, 52pt, Off-White (#f2f5fa), tight line height (1.05)
- **Sub-headlines** (Card titles): Semi-bold, 32pt, Off-White
- **Body text**: Regular, 18pt, Muted Blue (#97a3b9), line height 1.55
- **Eyebrows** (Section labels): All-caps, 14pt, Bright Blue (#3d8bff), letter-spacing 0.18em
- **KPI numbers**: Bold, 72pt, Off-White (#f2f5fa)
- **Small labels**: Regular, 15pt, Tertiary Text (#5d6a82)
- **Monospace** (for IDs, codes, technical terms): Cascadia Code or Courier New

### Layout & Spacing
- **Slide margins**: 60px left/right, 45px top/bottom
- **Card padding**: 40px horizontal, 30px vertical
- **Gap between cards**: 16px
- **Section break spacing**: 48px vertical
- **Line thickness**: 1px for borders, 2px for emphasis lines
- **Border radius**: 8px for cards, 12px for larger elements
- **Top accent bar** on cards: 3px solid (use lens color)

### Visual Elements
- **No drop shadows** — use borders instead
- **Subtle background grid** (optional): 5% opacity dots, 16px spacing
- **Borders**: 1px solid rgba(255,255,255,0.08) on cards
- **Emphasis borders**: 1px solid rgba(255,255,255,0.16) on hover/focus
- **Background boxes** (info callouts): rgba(61, 139, 255, 0.08) with 1px border rgba(61, 139, 255, 0.2)

---

## 📐 Slide Layout Patterns

### Pattern 1: Title + Lead Text Slide
- **Eyebrow** (top): Section label in bright blue, all-caps
- **Headline** (48pt, bold): Main slide title (max 10 words)
- **Lead text** (18pt, muted): Description paragraph (2-3 sentences)
- **Bottom element**: Optional status badge or stat
- **Layout**: Center-aligned, plenty of white space, dark background

### Pattern 2: Four-Card Grid (Lenses/Disciplines)
- **Eyebrow + headline** at top
- **4 equal-width cards** in a row
- **Each card**:
  - Colored top bar (3px) matching lens color
  - Number (01, 02, 03, 04) in monospace, bright blue
  - Card title (semi-bold, 24pt)
  - Description text (body, muted blue, 2-3 lines)
  - Optional: Demo count link in bright blue
- **Hover state** (if interactive): Card border brightens, subtle background lift

### Pattern 3: Vertical Stack (Journey, Process, or Hierarchy)
- **Numbered steps** (01, 02, 03, 04 in monospace on the left)
- **Vertical connecting line** between numbers (bright blue, 2px)
- **Step title** (24pt, semi-bold) aligned to right
- **Step description** (18pt, muted blue)
- **First step**: Top border in bright blue instead of connecting line
- **Full width**: Cards span the slide width

### Pattern 4: Two-Column Comparison
- **Left column**: Icon or label + content
- **Right column**: Icon or label + content
- **Dividing line**: 1px bright blue vertical line between columns
- **Headers** (semi-bold, 20pt) above each column
- **Body text** (18pt, muted blue) below

### Pattern 5: KPI/Stat Tile
- **Large number** (72pt, bold, off-white)
- **Label** (14pt, muted blue, all-caps)
- **Optional context** (12pt, faint blue, smaller text below label)
- **Background**: Subtle gradient from #0c1220 to #111a2c
- **Border**: 1px rgba(255,255,255,0.08)
- **Arrangement**: 2–4 tiles per slide in a grid

### Pattern 6: Quote Block
- **Large serif or italicized text** (28pt, teal #3fd0c9)
- **Quote marks** (") at start, rendered in bright blue
- **Attribution** (14pt, faint blue, below quote)
- **Background box** (optional): rgba(61, 139, 255, 0.08) with teal left border (4px)
- **Padding**: 40px all sides

---

## 📋 Content Structure & Sections

### Cover Slide
**Title**: "Engineering Intelligence Center"  
**Subtitle**: "Europe's first. | L&T Technology Services · Munich"  
**Thesis line**: "An air-gapped space where your engineers and ours build, test and explore applied AI across the product lifecycle, without your data ever leaving the room."  
**Style**: Centered, dark background, teal accent text

### Section 1: Overview (Hero)
- **Eyebrow**: "L&T Technology Services · Munich"
- **Title**: "Engineering Intelligence Center"
- **Subtitle**: "Europe's first."
- **Lead**: "An air-gapped space where your engineers and ours build, test and explore applied AI across the product lifecycle, without your data ever leaving the room."
- **Stats** (4 tiles):
  - 60+ clients served across Europe
  - 1,500+ engineers in the region
  - #1 largest LTTS design center in Europe
  - 20+ AI solutions on show
- **Pattern**: KPI tile grid at bottom

### Section 2: The Discipline (Four Lenses)
- **Eyebrow**: "What is Engineering Intelligence"
- **Title**: "Intelligence engineered in, not bolted on."
- **Lead**: "The discipline of building intelligence into everything we engineer, and everything we engineer with. One discipline, applied through four lenses."
- **4 lens cards**:
  1. **Engineering AI** (blue #3d8bff): Products designed with intelligence
  2. **Agentic AI** (purple #a78bfa): Work that runs itself, under governance
  3. **Physical AI** (teal #3fd0c9): Products that sense, think and learn
  4. **Industrial AI** (orange #f59e4a): Factories that improve themselves
- **Pattern**: Four-card grid

### Section 3: The Stack (6 Layers)
- **Eyebrow**: "The Engineering Intelligence Stack"
- **Title**: "Six layers, from complexity to outcomes."
- **Lead**: "AI is only as good as what lies beneath it."
- **6 layer cards** (vertical stack, top to bottom):
  - Layer 6: Intelligent Outcomes | What changes in the world
  - Layer 5: EI Assets | How intelligence is put to work
  - Layer 4: Intelligence Layer | How systems learn, reason and act (highlight with bright blue accent)
  - Layer 3: Digital Foundations | How complex systems become AI-ready
  - Layer 2: Engineering Data | How knowledge is captured and governed
  - Layer 1: Environments | Where the complexity lives
- **Pattern**: Vertical stack with emphasised middle layer

### Section 4: AI Café
- **Eyebrow**: "The AI Café"
- **Title**: "No gatekeepers. No friction."
- **Lead**: "Where corporate red tape disappears. Explore fearlessly, experiment without approval loops, iterate quickly, and build something awesome — together, on your terms."
- **4 pillar cards**:
  - Local LLMs: State-of-the-art open models running on hardware inside the center
  - Air-gapped: No external API calls. Nothing leaves the network
  - No lock-in: Your models, your environment. Around 90% pre-built, 10% tailored to you
  - Explore. Fail. Build: Your playground for AI. Where you experiment freely
- **Pattern**: Four-card grid

### Section 5: Lifecycle
- **Eyebrow**: "Across the lifecycle"
- **Title**: "AI at every stage of engineering."
- **Lead**: "From the first RFQ to the service bay."
- **7 stage nodes** in horizontal process flow:
  1. Concept & RFQ
  2. Requirements
  3. Design & CAD
  4. Software
  5. Test & Safety
  6. Manufacturing
  7. Operations & Service
- **Pattern**: Horizontal timeline with connecting rail, 1px bright blue line between nodes

### Section 6: Solutions Gallery
- **Eyebrow**: "Solutions"
- **Title**: "Explore the demos."
- **Lead**: "Every solution runs on the customer's own data, models and environment."
- **Filters** (optional): All, Engineering AI, Agentic AI, Physical AI, Industrial AI, Sustainable AI
- **Content**: Grid of demo cards (each with lens color indicator, title, description)
- **Pattern**: Multi-column card grid (3–4 columns per row)

### Section 7: Proven Results
- **Eyebrow**: "Proven in production"
- **Title**: "Documents in. Certified work out."
- **Lead**: "One pipeline, three standards: ingest the customer's own documents, let AI do the reading, and keep the engineer as the approver."
- **3 proof cards** (3-column layout):
  1. **HARA from 2 weeks to 2 days** | ISO 12100 | Industrial machinery OEM
     - 85% faster per HARA
     - 40% lower labour cost
     - 95% completeness accuracy
  2. **Verification at scale** | AiTest | BMW
     - +72% test throughput
     - 86% faster defect triage
     - 390 new assets in 12 weeks
  3. **FMEA authoring under audit** | ISO 26262 | CARIAD · Volkswagen Group
     - 85% faster FMEA authoring
     - <90s to index the full corpus
     - 100% rows traced to source
- **Pattern**: Three-card proof grid with KPI tiles

### Section 8: How We Work Together
- **Eyebrow**: "How we work together"
- **Title**: "From first conversation to production."
- **Lead**: (optional, space for context)
- **4 journey steps** (vertical stack or timeline):
  1. Experience: Live demos on your engineering problems, not ours
  2. Co-create: Design-thinking and discovery workshops to frame use cases
  3. Build: Innovation Garage: a working MVP in 2 to 6 weeks
  4. Scale: Pilot-to-program in your environment, on your models
- **CTA (Call-to-action)**: "Start with a 2-day Engineering Intelligence workshop, here in Munich."
- **Pattern**: Vertical step stack or journey timeline

### Section 9: AI Models Portfolio
- **Eyebrow**: "AI Model Strategy"
- **Title**: "Match the model to the task."
- **Lead**: "Intelligence is a portfolio, not a single model. Choose by task complexity, cost, capability and governance needs. Prices reflect October 2026 market rates."
- **Thesis quote** (italicized, teal, 28pt): "Do not use a Formula 1 car to deliver a pizza."
- **5 model level cards** (vertical stack):
  - **Level 0: No AI** | Lowest cost | EUR 0 (rule-based)
    - Examples: Transformation, validation, formatting, static analysis
    - When: Deterministic tasks with clear rules
  - **Level 1: Local & Small Models** | Efficient & private | USD 0.0002–0.40/M tokens
    - Examples: Llama, Mistral, DeepSeek V4-Flash
    - Routine work, runs on your hardware
  - **Level 2: Enterprise Models** | Balanced | USD 1.20–10/M tokens
    - Examples: Claude 3.5 Sonnet, GPT-4o, Gemini 2.5
    - Core engineering tasks, accuracy matters
  - **Level 3: Hybrid & Multi-Model** | Flexible | USD 2–6/M tokens
    - Examples: Route by task, combine small + frontier models
    - Intelligence as a portfolio, optimal cost allocation
  - **Level 4: Frontier Models** | Highest capability | USD 3–30/M tokens
    - Examples: Claude 4 Opus, GPT-5 Turbo, Gemini 3.6
    - Novel problems, creativity, safety-critical decisions
- **Each level card**:
  - Top accent bar (3px gradient from blue to teal across all 5)
  - Level number on left (monospace, bright blue, 14pt)
  - Capability label (teal, semi-bold, 18pt)
  - Cost range (monospace, faint blue, 16pt)
  - Examples, use case, and pricing
- **Insight box** (bottom):
  - Background: rgba(61, 139, 255, 0.08) with bright blue border
  - Text: "DeepSeek V3.5 offers frontier-class capability at just USD 0.40/M tokens input. At scale, routing between cost tiers creates the largest margin. Context window penalties (2× for >64K tokens) reshape RAG pipeline ROI."
  - Footer: "Strategy → Capability → Cost. In that order."
- **Pattern**: Vertical level stack with gradient accent bar

### Closing Slide
- **Large text** (44pt, semi-bold, off-white): "Thank you."
- **Quote** (28pt, teal, italicized): "The question of whether machines can think is about as relevant as the question of whether submarines can swim." — Edsger W. Dijkstra, 1984
- **Footer tagline** (18pt, muted blue): "Germany leads · BCC scales · AI accelerates."
- **Style**: Centered, dark background, plenty of white space

---

## 🎬 Animation & Transitions
- **Slide transitions**: Fade (500ms)
- **Content entrance**: Fade in (300ms) for text, cards fade in with slight 50ms stagger between elements
- **No excessive motion**: Keep it minimal and professional
- **Emphasis**: Use color highlights (bright blue background on hover) rather than motion

---

## ✅ Design Checklist
Before finalizing each slide:
- [ ] Dark background (#070b14 or #0c1220) used consistently
- [ ] All text is off-white (#f2f5fa) or muted blue (#97a3b9)
- [ ] Headers are bold and 48pt+ (depending on hierarchy level)
- [ ] Cards have colored top bar (3px) or left border matching accent
- [ ] Monospace font used for labels, IDs, and technical terms
- [ ] Line thickness consistent (1px borders, 2px emphasis)
- [ ] Spacing follows the 16px grid (multiples of 16px)
- [ ] No drop shadows — use borders and background colors instead
- [ ] Bright blue (#3d8bff) used as primary accent for interactive elements and emphasis
- [ ] Teal (#3fd0c9) used for secondary accent and quotes
- [ ] Status colors used correctly (green for live, amber for remote, gray for coming soon)

---

## 📝 Content Notes
- **Tone**: Executive and advisory, professional but approachable
- **Audience**: Engineering leaders, automotive OEMs, decision-makers
- **Length**: Plan for 15–20 slides (cover + 13 sections + closing)
- **Emphasis**: Focus on outcomes over features; "AI as leverage, not capacity"
- **Evidence**: Use customer names and metrics (KPIs) to build credibility

---

## 🔄 Version History & Updates

### v1.0 – October 9, 2026
**Initial PowerPoint prompt creation**
- Design tokens and color palette defined
- 6 slide layout patterns documented
- 9 content sections mapped (Hero, Discipline, Stack, AI Café, Lifecycle, Gallery, Proofs, Engagement, AI Models)
- Cover and closing slides specified
- Animation guidelines and design checklist provided

### v1.1 – October 9, 2026
**Added AI Models section**
- Section 9: AI Models Portfolio with 5 levels and pricing tiers
- Updated model costs to October 2026 market rates
- Added insights about frontier-class capability and context window penalties
- Detailed card layout with gradient accent bars

---

## 📋 How to Use This Prompt

1. **Copy this entire document** (or sections as needed)
2. **Paste into Microsoft Copilot for PowerPoint** with a request like:
   ```
   "Create a PowerPoint presentation for the Engineering Intelligence Center 
   using the design system, layout patterns, and content structure in this prompt. 
   Use dark theme with bright blue and teal accents. Include all 9 sections."
   ```
3. **Refine as needed**: Ask Copilot to adjust specific slides, add more content, or change layouts
4. **Update this file** whenever content changes (add entry to version history)
5. **Keep the design tokens consistent** across all presentations

---

**Last Updated**: October 9, 2026  
**Status**: Ready for PowerPoint generation

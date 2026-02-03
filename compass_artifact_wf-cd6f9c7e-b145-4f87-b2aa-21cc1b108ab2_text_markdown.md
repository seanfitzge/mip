# Metabolic Intelligence Platform: Evidence-Based UI/UX Design Protocol

This document provides unambiguous specifications for building a biometric-integrated fitness and nutrition application targeting competitive athletes, coaches, and serious fitness enthusiasts. Every recommendation is grounded in peer-reviewed research, cognitive science principles, and established accessibility standards.

---

## Design philosophy prioritizes data density and scientific credibility

The Metabolic Intelligence Platform serves users who value evidence over aesthetics and depth over simplicity. Research on Self-Determination Theory confirms that competitive athletes exhibit high self-control and respond best to **autonomy-supportive features** that provide detailed analytics, progressive challenge systems, and transparent methodologies. Unlike casual fitness apps that rely heavily on gamification, this platform must project scientific authority through clean data presentation, explicit research citations, and professional visual design.

Three psychological needs drive sustained engagement: **autonomy** (user control over goals and methods), **competence** (clear progress feedback and mastery indicators), and **relatedness** (optional community features). A 2024 Lancet meta-analysis of 36 trials found gamification produces modest but significant outcomes (+489 steps/day, -0.28 BMI), but research indicates expert users may find excessive gamification trivializing. The platform should implement **progressive gamification**—skill-based advancement and content unlocking—rather than badges and points.

---

## Color system specifications

### Primary application palette (colorblind-safe, Okabe-Ito derived)

| Token | Hex Value | RGB | Usage |
|-------|-----------|-----|-------|
| `--color-primary` | `#0072B2` | rgb(0, 114, 178) | Primary actions, trust indicators, navigation |
| `--color-success` | `#009E73` | rgb(0, 158, 115) | Positive outcomes, recovery ready, goals met |
| `--color-warning` | `#E69F00` | rgb(230, 159, 0) | Caution states, attention needed |
| `--color-critical` | `#D55E00` | rgb(213, 94, 0) | Urgent alerts, overtraining risk |
| `--color-info` | `#56B4E9` | rgb(86, 180, 233) | Informational, baseline references |
| `--color-neutral-700` | `#333333` | rgb(51, 51, 51) | Primary text |
| `--color-neutral-500` | `#767676` | rgb(118, 118, 118) | Secondary text (meets 4.5:1 on white) |
| `--color-neutral-200` | `#E5E5E5` | rgb(229, 229, 229) | Borders, dividers |
| `--color-surface` | `#FFFFFF` | rgb(255, 255, 255) | Card backgrounds |
| `--color-background` | `#F5F5F5` | rgb(245, 245, 245) | Page background |

### Dark mode palette

| Token | Hex Value | Usage |
|-------|-----------|-------|
| `--color-dm-surface` | `#1A1A1A` | Card backgrounds |
| `--color-dm-background` | `#121212` | Page background |
| `--color-dm-text-primary` | `#E5E5E5` | Primary text (12.8:1 contrast) |
| `--color-dm-text-secondary` | `#A0A0A0` | Secondary text |

### Health status color encoding

Never use color as the sole indicator. Every status must combine **color + shape + text label**.

| Status | Color | Shape | Icon | Label |
|--------|-------|-------|------|-------|
| Optimal/Ready | `--color-success` | Filled circle | ✓ | "Optimal" |
| Good | `--color-primary` | Filled circle | — | "Good" |
| Moderate | `--color-warning` | Triangle | ⚠ | "Moderate" |
| Poor/At Risk | `--color-critical` | Diamond | ! | "At Risk" |
| Insufficient Data | `--color-neutral-500` | Circle outline | ? | "Needs Data" |

### Data visualization palettes

**Sequential (magnitude scales):** `#F7FBFF` → `#DEEBF7` → `#C6DBEF` → `#9ECAE1` → `#6BAED6` → `#3182BD` → `#08519C`

**Diverging (deviation from baseline):** `#762A83` → `#AF8DC3` → `#E7D4E8` → `#F7F7F7` → `#D9F0D3` → `#7FBF7B` → `#1B7837`

---

## Typography system

### Font stack specification

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
```

### Type scale (mobile-first, rem-based)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `--text-xs` | 0.75rem (12px) | 400 | 1.5 | Captions, timestamps |
| `--text-sm` | 0.875rem (14px) | 400 | 1.5 | Secondary labels, metadata |
| `--text-base` | 1.0625rem (17px) | 400 | 1.6 | Body text (mobile golden standard) |
| `--text-lg` | 1.25rem (20px) | 500 | 1.5 | Subheadings, card titles |
| `--text-xl` | 1.5rem (24px) | 600 | 1.3 | Section headers |
| `--text-2xl` | 2rem (32px) | 700 | 1.2 | Page titles |
| `--text-metric` | 2.5rem (40px) | 700 | 1.0 | Primary KPI values |
| `--text-score` | 4rem (64px) | 800 | 1.0 | Hero metrics (recovery score) |

### Readability specifications

- **Maximum line length:** 75 characters for body text
- **Paragraph spacing:** 1.5× line height (24-32px)
- **Letter spacing for metrics:** +0.02em for improved numeric legibility
- **Minimum body text:** 17px on mobile, 16px on desktop
- **Accessible font size for older users:** Support scaling to 24px without layout breakage

---

## Accessibility compliance requirements

### WCAG 2.1 AA mandatory requirements

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| 1.4.3 Contrast | 4.5:1 normal text, 3:1 large text | All text combinations verified |
| 1.4.11 Non-text Contrast | 3:1 for UI components | Buttons, form controls, chart elements |
| 1.4.1 Use of Color | Color not sole indicator | Shape + text + color for all status |
| 1.4.4 Resize Text | 200% zoom without loss | Relative units, responsive layout |
| 2.4.7 Focus Visible | Visible focus indicator | 2px outline, offset for all interactive elements |
| 1.3.4 Orientation | No single-orientation lock | Support portrait and landscape |

### Touch target specifications

| Element | Minimum Size | Recommended | Spacing |
|---------|--------------|-------------|---------|
| Primary buttons | 44×44px | 48×48px | 12px between targets |
| Secondary buttons | 44×44px | 44×44px | 8px between targets |
| Icon buttons | 44×44px | 48×48px | 8px minimum |
| Form inputs | 44px height | 48-56px height | — |
| Links in content | 27×27px tap area | 44×44px | 12px from other links |

### Screen reader requirements

- All images require descriptive `alt` text
- Charts require `aria-label` with summary of data trend
- Status indicators require `aria-live="polite"` for dynamic updates
- Form fields require associated `<label>` elements
- Error messages linked via `aria-describedby`

---

## Dashboard layout architecture

### Information hierarchy (Stephen Few principles)

The dashboard follows a **Z-pattern reading flow** with most critical information in the upper-left quadrant.

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Date context, sync status, user greeting           │
├─────────────────────────────────────────────────────────────┤
│                    │                                        │
│  PRIMARY METRIC    │  SECONDARY METRICS                     │
│  (Recovery Score)  │  (HRV, RHR, Sleep Score)               │
│  Upper-left        │  Upper-right                           │
│  prominence        │                                        │
│                    │                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  TREND SECTION: Time-series visualization (full width)      │
│  7-day HRV trend with today highlighted                     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    │                                        │
│  INSIGHTS PANEL    │  ACTION RECOMMENDATIONS                │
│  Contributing      │  "Train hard today" or                 │
│  factors           │  "Prioritize recovery"                 │
│                    │                                        │
└─────────────────────────────────────────────────────────────┘
```

### Cognitive load constraints

- **Maximum 5-7 key metrics visible** without scrolling (Miller's Law)
- **Progressive disclosure:** Summary → Detail on demand
- **Chunking:** Group related metrics visually with subtle containers
- **Recognition over recall:** Show all needed context, no memorization required

### Grid system

- **Mobile:** 4-column grid, 16px gutters, 16px margins
- **Tablet:** 8-column grid, 24px gutters, 24px margins
- **Desktop:** 12-column grid, 24px gutters, maximum content width 1280px

---

## Data visualization standards

### Chart type selection matrix

| Data Type | Primary Chart | Alternative | Avoid |
|-----------|---------------|-------------|-------|
| Single metric over time | Line chart with area fill | Sparkline for compact view | Bar charts for continuous data |
| HRV daily readings | Line chart + 7-day rolling average | Poincaré plot for deep analysis | Pie charts |
| Sleep duration (weekly) | Vertical bar chart | Horizontal bars for comparison | 3D charts |
| Sleep stages (single night) | Horizontal stacked bar (timeline) | Area chart | Pie charts |
| Body composition trend | Dual-axis line (weight + body fat %) | Small multiples | Combined bar+line |
| Recovery score | Single large number + radial gauge | Horizontal progress bar | Complex charts |
| Macro distribution | Donut chart (max 4 segments) | Horizontal stacked bar | Pie with >5 segments |
| Goal progress | Horizontal progress bar | Bullet chart | Vertical gauges |

### Time-series visualization specifications

**HRV Display Requirements:**
- Show daily readings as points connected by line
- Overlay **7-day rolling average** as thicker, slightly transparent line
- Display personal baseline with **deviation bands** (±1 standard deviation) as shaded region
- Color code points: green within normal, yellow at ±1 SD, red beyond ±2 SD
- Include recovery status interpretation label ("Ready to train" / "Recovery recommended")

**Sleep Visualization Requirements:**
- Previous night: Horizontal timeline showing stage transitions (Wake, REM, Light, Deep)
- Weekly view: Vertical bars showing total duration with horizontal line for 8-hour target
- Display **sleep efficiency percentage** prominently
- Show bedtime consistency indicator

**Weight/Body Composition Requirements:**
- Primary: 7-day rolling average line (smooths daily fluctuations)
- Secondary: Individual data points as subtle dots
- Goal line as dashed horizontal reference
- Annotate significant events (protocol changes, illness)

### Predictive data display

- Use **dashed lines** for predictions, solid for historical data
- Show **confidence intervals** as shaded bands around forecast
- Clearly label transition point between actual and projected
- Express uncertainty: "Based on current trends, 70% likely to reach goal by [date]"

### Anomaly highlighting

- Mark anomalies with **distinct colored markers** on time series
- Show ±1.5 SD as "mild anomaly" zone, ±3 SD as "significant anomaly"
- Provide contextual tooltip explaining possible causes

---

## Component pattern library

### Primary button

```
Specifications:
- Height: 48px
- Padding: 16px 24px
- Border-radius: 8px
- Background: var(--color-primary)
- Text: #FFFFFF, 16px, font-weight 600
- Hover: darken 10%
- Active: darken 15%
- Focus: 2px outline offset 2px var(--color-primary)
- Disabled: opacity 0.5, cursor not-allowed
```

### Metric card component

```
Structure:
┌─────────────────────────────────┐
│ [Icon] METRIC LABEL             │  ← 12px, uppercase, --color-neutral-500
│                                 │
│ 72                              │  ← --text-metric, --color-neutral-700
│ ▲ 3 from yesterday              │  ← 14px, --color-success (or warning/critical)
│                                 │
│ [──────────────] Sparkline      │  ← 7-day trend, 40px height
└─────────────────────────────────┘

Specifications:
- Container: 16px padding, 8px border-radius
- Background: var(--color-surface)
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Min-width: 160px
- Status indicator: colored left border 4px
```

### Form input component

```
Specifications:
- Height: 48px (mobile), 44px (desktop)
- Padding: 12px 16px
- Border: 1px solid var(--color-neutral-200)
- Border-radius: 8px
- Focus border: 2px solid var(--color-primary)
- Error border: 2px solid var(--color-critical)
- Label: 14px, positioned above, 4px margin-bottom
- Helper text: 12px, --color-neutral-500, 4px margin-top
- Error text: 12px, --color-critical, 4px margin-top
```

### Alert/notification component

```
Critical Alert:
┌─────────────────────────────────────────────┐
│ [!] Critical: Resting heart rate elevated   │
│     Your RHR is 15 BPM above baseline.      │
│     Consider rest day or reduced intensity. │
│                          [Dismiss] [Details]│
└─────────────────────────────────────────────┘

Specifications by severity:
- Critical: --color-critical background at 10% opacity, 4px left border
- Warning: --color-warning background at 10% opacity, 4px left border
- Info: --color-info background at 10% opacity, 4px left border
- Success: --color-success background at 10% opacity, 4px left border
- Padding: 16px
- Border-radius: 8px
- Icon: 24×24px, aligned left
- Title: 16px, font-weight 600
- Body: 14px, font-weight 400
```

---

## Form design and data entry optimization

### Nutrition logging interface

Minimize taps through multiple input modalities:

1. **Image capture** (primary): Camera button prominently positioned; AI processes photo and suggests food items for confirmation
2. **Barcode scan**: Single-tap access from logging screen
3. **Voice input**: Microphone button; natural language processing ("Had a chicken salad with olive oil dressing")
4. **Quick favorites**: Horizontal scroll of 6 most-logged items
5. **Recent meals**: Copy previous day's meals with one tap
6. **Text search**: Predictive search against verified nutritional database

### Form field optimization specifications

- **Maximum fields per screen:** 6 (research shows 3-6 optimal completion)
- **Layout:** Single column, vertically stacked
- **Progress indicator:** For multi-step forms, show step X of Y with visual bar
- **Smart defaults:** Pre-fill based on user history and time of day
- **Inline validation:** Validate on blur, show errors immediately
- **Numeric inputs:** Trigger numeric keyboard on mobile
- **Date/time:** Native pickers, smart defaults (today, current time)

### Macro entry interface

```
┌─────────────────────────────────────────────┐
│ Quick Log: Chicken Breast (100g)            │
│                                             │
│ Protein  ████████████████░░░░  31g          │
│ Carbs    ░░░░░░░░░░░░░░░░░░░░   0g          │
│ Fat      ███░░░░░░░░░░░░░░░░░   4g          │
│                                             │
│ Serving: [100] g  [+] [-]                   │
│                                             │
│        [Cancel]        [Log This]           │
└─────────────────────────────────────────────┘
```

---

## Research citation integration

### Progressive disclosure for scientific content

**Level 1 - Claim with indicator (default view):**
```
Your protein target of 2.2g/kg supports muscle protein synthesis 
during your reverse diet phase. [📚]
```

**Level 2 - Source preview (tap citation icon):**
```
Based on: Phillips & Van Loon (2011), Journal of Sports Sciences
"Dietary protein for athletes: From requirements to optimum adaptation"
[Read more →]
```

**Level 3 - Full context (secondary tap):**
```
Full citation with abstract summary, key findings relevant to user's 
context, and link to full paper in Research Library.
```

### Citation badge component

```
Specifications:
- Badge: 20×20px circle, --color-primary at 15% opacity
- Icon: Book/paper icon, 12px, --color-primary
- Position: Inline after claim, baseline aligned
- Tap target: 44×44px (accessibility)
- Tooltip on hover (desktop): "View research source"
```

### Research library interface

For the 200+ paper collection:

- **Categorization:** Taxonomy by topic (protein synthesis, sleep, HRV, metabolism)
- **Search:** Full-text search with highlighted results
- **Relevance tags:** Connect papers to features that cite them
- **Reading level indicator:** Technical / Accessible summary available
- **Card format:** Title, authors, year, journal, relevance score, "Why this matters" summary

---

## Notification and alert system

### Notification frequency constraints

Research indicates **1-3 targeted notifications per day** maximizes engagement without fatigue. Implement user-configurable limits with intelligent defaults.

| Category | Default Frequency | Timing |
|----------|-------------------|--------|
| Critical health alerts | Immediate | Any time |
| Training recommendations | 1/day maximum | Morning (6-8 AM) or pre-scheduled workout |
| Progress updates | 1/day maximum | Evening (6-8 PM) |
| Weekly summaries | 1/week | Sunday evening |
| Research highlights | 2/week maximum | User-selected time |

### Alert severity framework

**Tier 1 - Critical (immediate action):**
- Conditions: Heart rate significantly outside safe range, dangerous patterns detected
- Delivery: Immediate push, audio, haptic feedback
- Visual: Full-screen interstitial with red accent
- Cannot be silenced; requires acknowledgment

**Tier 2 - Warning (action needed soon):**
- Conditions: Metrics outside recommended ranges, overtraining indicators
- Delivery: Standard push notification, no audio
- Visual: Banner notification, yellow/orange accent
- Batched if multiple within 1 hour

**Tier 3 - Informational (awareness):**
- Conditions: Goal progress, achievements, insights
- Delivery: Badge update, in-app notification center
- Visual: Subtle in-app indicator
- Can be disabled entirely

### Alarm fatigue prevention

Research shows 72-99% of clinical alarms are false positives. Implement:

- **Customizable thresholds:** Allow users to set personal baseline ranges
- **Delay windows:** Brief delay before alerting on single anomalous readings
- **Trend-based alerts:** Require sustained pattern, not single data point
- **Smart aggregation:** Combine related alerts into single notification
- **Never repeat:** Same alert not sent twice; update existing notification

---

## Performance requirements

### Core Web Vitals targets

| Metric | Target | Maximum Acceptable |
|--------|--------|-------------------|
| Largest Contentful Paint (LCP) | ≤ 2.0 seconds | ≤ 2.5 seconds |
| Interaction to Next Paint (INP) | ≤ 150 milliseconds | ≤ 200 milliseconds |
| Cumulative Layout Shift (CLS) | ≤ 0.05 | ≤ 0.1 |
| First Contentful Paint (FCP) | ≤ 1.5 seconds | ≤ 2.0 seconds |
| Time to Interactive (TTI) | ≤ 3.0 seconds | ≤ 4.0 seconds |

### Real-time data update specifications

| Data Type | Update Interval | Method |
|-----------|-----------------|--------|
| Active workout metrics | 1 second | WebSocket |
| Live HRV during session | 1-5 seconds | WebSocket |
| Dashboard KPIs | 10 seconds | Polling with delta updates |
| Passive tracking | 30-60 seconds | Background sync |
| Batch analytics | 5 minutes | REST API |

### Loading state patterns

- **Skeleton UI:** Show greyed animated placeholders matching content structure
- **Cached snapshots:** Display last known data with timestamp ("Updated 2 min ago")
- **Progressive loading:** Load critical metrics first, then secondary data
- **Auto-retry:** Exponential backoff on connection failures (1s, 2s, 4s, max 30s)

### Offline-first architecture

- Store all user data to IndexedDB before network calls
- Cache static assets with service worker (cache-first strategy)
- Network-first for navigation requests
- Queue writes for background sync when connection restored
- Show clear offline indicator with "Will sync when online" messaging

---

## Trust and credibility design patterns

### Visual trust signals

- **Professional color palette:** Blues and greens convey trust and health
- **Clean typography:** Error-free, consistent hierarchy
- **Generous whitespace:** Communicates organization and clarity
- **No visual clutter:** Remove decorative elements that don't encode data

### Credibility indicators

- **Regulatory compliance badges:** Display HIPAA compliance where applicable
- **Data source transparency:** Show "Data from [Wearable Device]" on metrics
- **Calculation methodology:** "How is this calculated?" expandable for every derived metric
- **Professional affiliations:** If reviewed by sports scientists or nutritionists, display credentials
- **Privacy indicators:** Visible padlock icons, clear data handling explanations

### Transparency requirements

- Every recommendation shows "Why this recommendation" expandable
- Every calculated metric shows formula/methodology on demand
- Clear escalation paths: "When to consult a healthcare provider"
- No dark patterns: Every interaction should feel collaborative

---

## Interface specifications by screen

### Recovery dashboard (primary view)

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back    Today's Recovery    [Sync: 2m ago]                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                         ┌─────────┐                              │
│                         │   78    │  ← Recovery Score (0-100)    │
│                         │  Good   │                              │
│                         └─────────┘                              │
│                    "Ready for moderate training"                 │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │ HRV          │ │ RHR          │ │ Sleep        │              │
│  │ 58 ms        │ │ 52 bpm       │ │ 7h 23m       │              │
│  │ ▲ +4 vs avg  │ │ ▼ -2 vs avg │ │ ▲ +18m       │              │
│  │ [sparkline]  │ │ [sparkline]  │ │ [sparkline]  │              │
│  └──────────────┘ └──────────────┘ └──────────────┘              │
├──────────────────────────────────────────────────────────────────┤
│  7-Day HRV Trend                                    [Full view →]│
│  ┌────────────────────────────────────────────────────────────┐  │
│  │         ╱╲                                                 │  │
│  │    ╱╲  ╱  ╲    ╱╲                              ●           │  │
│  │   ╱  ╲╱    ╲  ╱  ╲╱╲                         ╱             │  │
│  │  ╱         ╲╱      ╲╱                       ╱              │  │
│  │ M   T   W   Th   F   S   Su                               │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ───── Personal baseline  ● Today                                │
├──────────────────────────────────────────────────────────────────┤
│  Today's Insight                                                 │
│  Your HRV is 8% above your 30-day average, indicating good       │
│  parasympathetic recovery. Combined with quality sleep, you're   │
│  well-positioned for higher intensity work. [📚]                 │
│                                                                  │
│  [View Full Analysis]                                            │
└──────────────────────────────────────────────────────────────────┘
```

### Nutrition logging screen

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back         Log Food                              [History]  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🔍 Search foods...                              [📷] [🎤]  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Quick Add                                                       │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│  │Eggs│ │Oats│ │Chkn│ │Rice│ │Salm│ │ +  │                       │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘                       │
│                                                                  │
│  Recent                                         [Copy Yesterday] │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Breakfast • 8:12 AM                           524 kcal     │  │
│  │ 3 eggs, 2 toast, avocado                   P:28 C:42 F:31  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  Today's Progress                                                │
│                                                                  │
│  Calories   ████████████░░░░░░░░  1,847 / 2,650                  │
│  Protein    ████████████████░░░░    156 / 195g                   │
│  Carbs      ██████████░░░░░░░░░░    198 / 320g                   │
│  Fat        █████████████░░░░░░░     68 / 88g                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Reverse diet protocol tracker

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back      Reverse Diet Protocol                    [Settings] │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 3 of 5: Moderate Build                                    │
│  ████████████████████████░░░░░░░░  Week 8 of 12                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Current Targets (adjusted weekly based on response)        │  │
│  │                                                            │  │
│  │ Calories:  2,650 kcal (+100 from last week)               │  │
│  │ Protein:   195g (2.2g/kg) [📚]                            │  │
│  │ Carbs:     320g                                           │  │
│  │ Fat:       88g                                            │  │
│  │                                                            │  │
│  │ [Why these targets?]                                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Metabolic Response Indicators                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │ Weight Trend │ │ Avg Energy   │ │ Sleep Quality│              │
│  │ +0.2 kg/wk   │ │ 7.8 / 10     │ │ 8.2 / 10     │              │
│  │ ✓ On target  │ │ ✓ Improving  │ │ ✓ Stable     │              │
│  └──────────────┘ └──────────────┘ └──────────────┘              │
│                                                                  │
│  Protocol Insight                                                │
│  Your metabolic markers suggest positive adaptation. Weight      │
│  gain rate of 0.2 kg/week is within the 0.1-0.3 kg target       │
│  range. Energy levels improving indicates calories are           │
│  supporting training demands. [📚]                               │
│                                                                  │
│  [View Full Protocol Details]     [Adjust Protocol]              │
└──────────────────────────────────────────────────────────────────┘
```

### Research library interface

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back         Research Library                      [Filters]  │
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🔍 Search 247 papers...                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Categories                                                      │
│  [All] [Protein ▼] [Sleep] [HRV] [Metabolism] [Training]         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Dietary protein for athletes: From requirements to         │  │
│  │ optimum adaptation                                         │  │
│  │                                                            │  │
│  │ Phillips SM, Van Loon LJ • J Sports Sciences • 2011        │  │
│  │                                                            │  │
│  │ Why this matters:                                          │  │
│  │ Establishes 1.6-2.2g/kg protein recommendation for        │  │
│  │ athletes, informing your daily protein targets.           │  │
│  │                                                            │  │
│  │ [Read Summary]  [Full Paper →]  [Used in: Protein Calc]   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Heart rate variability: An old metric with new meaning... │  │
│  │ ...                                                        │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Gamification guidelines for serious athletes

### Recommended approaches (evidence-based)

- **Progressive content unlocking:** Advanced analytics features unlock as users demonstrate consistency
- **Skill-based advancement:** Master fundamentals before accessing complex protocol customization
- **Achievement system:** Focus on mastery ("Logged 30 consecutive days") not competition
- **No leaderboards by default:** Offer opt-in team-based challenges only

### Avoid for this user segment

- Points and badges as primary motivation
- Streaks that punish legitimate rest days
- Social comparison notifications
- Playful/childish visual language
- Excessive celebration animations

### Optional competitive features

- **Team challenges:** Group-based goals for coaching contexts
- **Personal records:** Historical comparisons to own performance
- **Benchmark percentiles:** "Your HRV is in the 75th percentile for your age group"

---

## Implementation checklist

### Phase 1: Foundation
- [ ] Implement color system with CSS custom properties
- [ ] Configure typography scale with responsive sizing
- [ ] Build component library (buttons, cards, inputs, alerts)
- [ ] Establish 4/8/12 column responsive grid
- [ ] Implement dark mode toggle

### Phase 2: Core interfaces
- [ ] Recovery dashboard with metric cards and sparklines
- [ ] HRV/sleep/RHR time-series visualizations
- [ ] Nutrition logging with multi-modal input
- [ ] Form validation with inline error handling
- [ ] Progressive disclosure for scientific content

### Phase 3: Advanced features
- [ ] Reverse diet protocol tracker
- [ ] Predictive metabolic modeling displays
- [ ] Research library with search and categorization
- [ ] Notification system with severity framework
- [ ] Offline-first data synchronization

### Phase 4: Accessibility audit
- [ ] WCAG 2.1 AA compliance verification
- [ ] Screen reader testing (VoiceOver, TalkBack)
- [ ] Color contrast validation (all combinations)
- [ ] Touch target size verification
- [ ] Keyboard navigation testing

### Phase 5: Performance optimization
- [ ] Core Web Vitals measurement and optimization
- [ ] Image optimization and lazy loading
- [ ] Code splitting for route-based bundles
- [ ] Service worker implementation
- [ ] Real-time data WebSocket connections

---

This protocol provides the foundation for building a scientifically credible, highly usable, and fully accessible metabolic intelligence platform. Every specification is grounded in peer-reviewed research on behavior change, cognitive science, data visualization, and accessibility standards. The design prioritizes the needs of evidence-focused athletes who value data density, scientific transparency, and professional presentation over gamified engagement mechanics.